import { Injectable } from '@angular/core';
import { Score } from '../shared/score.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private scoresKey = 'quiz_scores'; // Key for saving scores
  private settingsKey = 'quiz_settings'; // Key for saving settings

  // Save a score to the browser
  saveScore(score: Score) {
    const scores = this.getScores(); // Get existing scores
    scores.push(score); // Add the new score
    localStorage.setItem(this.scoresKey, JSON.stringify(scores)); // Save to browser
  }

  // Get all saved scores
  getScores(): Score[] {
    const scores = localStorage.getItem(this.scoresKey);
    return scores ? JSON.parse(scores) : []; // Return saved scores, or an empty array if none
  }

  // Save settings (like timed mode)
  saveSettings(settings: { timedMode: boolean }) {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }

  // Get saved settings
  getSettings(): { timedMode: boolean } | null {
    const settings = localStorage.getItem(this.settingsKey);
    return settings ? JSON.parse(settings) : null;
  }
}