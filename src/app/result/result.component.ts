import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Score } from '../shared/score.model';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  categoryMap: { [key: string]: string } = {
    '9': 'General Knowledge',
    '10': 'Entertainment: Books',
    '11': 'Entertainment: Film',
    '12': 'Entertainment: Music',
    '13': 'Entertainment: Musicals & Theatres',
    '14': 'Entertainment: Television',
    '15': 'Entertainment: Video Games',
    '16': 'Entertainment: Board Games',
    '17': 'Science & Nature',
    '18': 'Science: Computers',
    '19': 'Science: Mathematics',
    '20': 'Mythology',
    '21': 'Sports',
    '22': 'Geography',
    '23': 'History',
    '24': 'Politics',
    '25': 'Art',
    '26': 'Celebrities',
    '27': 'Animals',
    '28': 'Vehicles',
    '29': 'Entertainment: Comics',
    '30': 'Science: Gadgets',
    '31': 'Entertainment: Japanese Anime & Manga',
    '32': 'Entertainment: Cartoon & Animations'
  };
  

  private route = inject(ActivatedRoute);
  private router = inject(Router);
   private storageService = inject(StorageService);

  score: number = 0;
  totalQuestions: number = 10;
  category: string = '';
  difficulty: string = '';
  timed: boolean = false;
  username: string = '';

  ngOnInit() {
    // Get the results from the URL (sent by QuizComponent)
    this.route.queryParams.subscribe(params => {
      this.score = +params['score'] || 0;
      this.totalQuestions = +params['totalQuestions'] ;
       const categoryId = params['category'];
      this.category = this.categoryMap[categoryId] || 'Unknown';
      this.difficulty = params['difficulty'] || 'Unknown';
      this.timed = params['timed'] === 'true';
    });
  }

  saveScore() {
    // Create a score object
    const score: Score = {
      username: this.username || 'Anonymous', // Use "Anonymous" if no username
      score: this.score,
      category: this.category,
      difficulty: this.difficulty,
      date: new Date().toISOString(), // Save the current date
      timed: this.timed
    };
     this.storageService.saveScore(score); // Save the score
    this.router.navigate(['/history']); // Go to the History page
  }

  playAgain() {
    this.router.navigate(['/']); // Go back to the Home page
  }
}