import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { StorageService } from '../services/storage.service';
import { Score } from '../shared/score.model';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent  {

 
}