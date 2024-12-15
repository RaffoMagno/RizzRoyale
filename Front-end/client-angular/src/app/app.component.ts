// app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carte } from './carte.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client-angular';
  carte: Carte[] = [];
  currentIndex: number = 0; // Indice della carta mostrata

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ carte: Carte[] }>('https://3000-raffomagno-rizzroyale-2hhtca9qbor.ws-eu117.gitpod.io/carte')
      .subscribe({
        next: (response) => {
          this.carte = response.carte;
          console.log('Received data:', this.carte);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

  // Mostra la carta precedente
  showPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Mostra la carta successiva
  showNext(): void {
    if (this.currentIndex < this.carte.length - 1) {
      this.currentIndex++;
    }
  }

  // Mostra una carta a caso
  randomizeCard(): void {
    const randomIndex = Math.floor(Math.random() * this.carte.length);
    this.currentIndex = randomIndex;
  }
}
