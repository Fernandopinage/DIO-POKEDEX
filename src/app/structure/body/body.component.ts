import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BodyService } from '../body.service';
import { SeachComponent } from '../seach/seach.component';
import { CardComponent } from './card/card.component';



@Component({
  selector: 'app-body',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, HttpClientModule, CardComponent,SeachComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  providers:[BodyService]
})
export class BodyComponent {

  pokemons: any[] = []
  
  constructor(private bodyService: BodyService) {}


  ngOnInit() {
    this.bodyService.getPokemons().subscribe(
      {
        next:(data)=> {
          
            this.pokemons = data.results;
        },
        error(err) {
            console.error('Erro ao obter dados da API:', err);
       
        },
      }
    );
  }
  

}
