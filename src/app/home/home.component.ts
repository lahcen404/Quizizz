import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);

  categories: Category[] = [];
  selectedCategory: number = 9; // Default: General Knowledge
  selectedDifficulty: string = 'medium';
  numQuestions: number = 10; 

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (res: { trivia_categories: Category[] }) => {
        this.categories = res.trivia_categories;
        console.log("resultaaaat",res.trivia_categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  startQuiz(): void {
    // Check if all inputs are valid
    if (this.selectedCategory && this.selectedDifficulty && this.numQuestions >= 1 && this.numQuestions <= 50) {
      // Navigate to the Quiz page with the selected settings
      this.router.navigate(['/quiz'], {
        queryParams: {
          category: this.selectedCategory,
          difficulty: this.selectedDifficulty,
          numQuestions: this.numQuestions
          
        }
        
      });
    } else {
      console.error('Please select a category, difficulty, and a valid number of questions (1-50).');
    }
    
  }
}