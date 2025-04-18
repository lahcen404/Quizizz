import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../shared/category.model";
import { Question } from "../shared/question.model";

@Injectable({

    providedIn: 'root'
})
export class ApiService {
    baseURL = 'https://opentdb.com';

    constructor(private http: HttpClient) { }

    getCategories(){
        return this.http.get<{trivia_categories: Category[]}>(`${this.baseURL}/api_category.php`);
    }

    getQuestions(categoryId: number, difficulty: string, numQuestions: number){
        return this.http.get<{results: Question[]}>(
            `${this.baseURL}/api.php?amount=${numQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`);
            
    }
    
}