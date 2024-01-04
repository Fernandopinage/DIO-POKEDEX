import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BodyService } from '../../body.service';

type Pokemon = {
  name: string, profile: string, img: string
}



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule,CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})



export class CardComponent {
  constructor(private bodyService: BodyService) {}

  @Input() id: number | any;
  pokemon: Pokemon = { name: '', profile: '', img: '' };
  specifics:any
  ngOnInit() {
    this.getPokemon(this.id);
    this.getPokemonAbilities(this.id)
  }

   getPokemon(id: number) {
       this.bodyService.getPokemon(id+1).subscribe({
        next:(result)=>{
          if (result) {
            this.pokemon.name = result?.name || 'luiz';
            this.pokemon.profile = result?.sprites.front_default;
            this.pokemon.img = result?.sprites.other.home.front_default;
          } 
        },
        error:(error)=>{
          console.error('Erro ao obter dados do Pokémon:', error);
        }
      });
    
  }

  getPokemonAbilities(id: number){
   this.bodyService.getPokemonSpecific(id+1).subscribe({
      next:(result)=>{
        this.specifics = result?.types.map(e=> e.type.name?e.type.name:'')
      }
    });
  }
}
