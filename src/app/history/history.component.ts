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
httpClient = inject(HttpClient);
public data: Array<any> = [];

ngOnInit() {
  this.httpClient.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy').subscribe({
    next: (data: any) => {
      console.log(data);
      this.data = data;
    }, error: (err) => console.log(err)
  });
}
}