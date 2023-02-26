import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserFileService } from './services/user-file.service'; 
import { ApiParams } from './interfaces/params';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('userInput', {static: true})
  myFile!: ElementRef;
  public title = '';
  public userData: any;
  public recipe: any;
  public imageUrl: string = '';
  public apiParams!: ApiParams;
  public received: boolean = true;
  public enabled: boolean = false;
  public recipeExists: boolean = true;
  public chart: any;
  public pieChart: any;
  public errorMessage: string = '';
  fileVal: any;
  invalid: string = '';
  flag: boolean = false;
  constructor(private fileService: UserFileService, private elementRef: ElementRef) {}

  getRecipe() {
    this.recipe = '';
    this.received = false;
    this.enabled = false;
    this.myFile.nativeElement.value = "";
    this.fileService.getRecipe(this.apiParams).subscribe(data => {
      this.received = true;
      this.enabled = false;
      this.recipeExists = true;
      this.recipe = data;
      this.imageUrl = this.recipe.image;
      this.title = this.recipe.title;
      if(this.apiParams.nutrition) {
        this.createPieChart();
        this.createChart();
      }
    },
    error => {
      this.received = true;
      this.recipeExists = false;
      this.flag = true;
      this.errorMessage = 'Recipe not found!!';
    }
    )
  }

  fileDetails(event: any) {
    let selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    if(selectedFile) fileReader.readAsText(selectedFile, "UTF-8");
    // event.target.files[0] = '';
  fileReader.onload = () => {
    if(fileReader.result as string !== '') {
      this.enabled = true;
      this.invalid = ''
    }
    else {
      this.invalid = 'Invalid file';
      this.myFile.nativeElement.value = "";
    }
    this.apiParams = fileReader.result as string !== ''? JSON.parse(fileReader.result as string): {}
  }
  fileReader.onerror = (error) => {
    console.log(error);
  }
  }

  createPieChart() {
    let labels = Object.keys(this.recipe.nutrition.caloricBreakdown);
    let data = Object.values(this.recipe.nutrition.caloricBreakdown);
    let htmlRef = this.elementRef.nativeElement.querySelector(`#MyPieChart`);
    this.pieChart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Caloric breakdown',
          data: data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    })
  }

  createChart(){
    let labels = [];
    let data = [];
    labels = this.recipe.nutrition.nutrients.map((elt: any) => {
      return elt.name
    })
    data = this.recipe.nutrition.nutrients.map((elt: any) => {
      return elt.percentOfDailyNeeds;
    })
    let htmlRef = this.elementRef.nativeElement.querySelector(`#MyChart`);
    this.chart = new Chart(htmlRef, {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								//  '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
        labels: labels,
	       datasets: [
          {
            label: "Percent of daily needs",
            data: data,
            backgroundColor: 'blue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
