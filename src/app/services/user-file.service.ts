import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiParams } from '../interfaces/params';

@Injectable({
  providedIn: 'root'
})
export class UserFileService {

  url_recipe: string = 'https://api.apilayer.com/spoonacular/recipes/';
  url_weather: string = 'http://api.weatherstack.com/'
  // recipe endpoint header
  headers_recipe = new HttpHeaders({
    'apikey': 'fefWX6RzTkYJBj4qJXkJi9gi5fpUsIqJ'
  })
  // weather endpoint header
  headers_weather = new HttpHeaders({
    'access_key': '246d6f5232a501c1da9bf255376e9f07'
  })
  requestOptions = {headers: this.headers_recipe}
  queryParams = new HttpParams();
  options: any;

  constructor(private http: HttpClient) { }


  getRecipe(apiParams: ApiParams) {
    const id = apiParams.id && apiParams.id !== ''? apiParams.id: '';
    const nutrition = apiParams.nutrition ? apiParams.nutrition: null;
    this.options = {
      // params: this.queryParams,
      headers: this.headers_recipe
    }
    return this.http.get(`${this.url_recipe}/${id}/information?includeNutrition=${nutrition}`,this.options);
  }

  postRecipe(nutrition: boolean, list: string, serves: number) {
    let body = {
      includeNutrition: nutrition,
      ingredientList: list,
      servings: serves,
      language: 'en'
    }
    // return this.http.post(`${this.url}parseIngredients`, body, this.requestOptions)
  }

  getCurrentWeather(city: string) {
    this.queryParams.append('query', city)
    this.options = {
      headers: this.headers_weather,
      params: this.queryParams
    }
    return this.http.get(`${this.url_weather}current`,this.options)
  }
}
