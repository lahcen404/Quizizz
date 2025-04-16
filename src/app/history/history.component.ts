import { HttpClient, HttpClientModule } from '@angular/common/http';  
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

}