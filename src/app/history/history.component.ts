import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Score } from '../shared/score.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  private storageService = inject(StorageService);

  scores: Score[] = [];

  ngOnInit() {
    this.scores = this.storageService.getScores(); // Get all saved scores
  }
}