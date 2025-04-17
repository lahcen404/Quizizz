import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);

  categories: Array<any> = [];
  // par default 
  selectedCategory: number = 9; 
  selectedDifficulty: string = 'medium';
  numQuestions: number = 10;
  httpClient: any;
  quizData: any;

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.http.get('https://opentdb.com/api_category.php').subscribe({
      next: (res: any) => {
        this.categories = res.trivia_categories;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  startQuiz(): void {
    console.log('Quiz settings:', {
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
      numQuestions: this.numQuestions
    });

    const url = `https://opentdb.com/api.php?amount=${this.numQuestions}&category=${this.selectedCategory}&difficulty=${this.selectedDifficulty}&type=multiple`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('api url:', url);
        console.log('quiiz Data:', res);
        console.log('res.results:', res.results);
        this.quizData = res.results;
      },
      error: (err) => {
        console.error('api eerror:', err);
      }
    });
  }



  
}
