import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type PokemonResult = {
  id: number;
  name: string;
  sprites: {
    front_default: string,
    other: {
      home: {
        front_default: string
      }
    }
  }
}

export type PokemonSpecific = {
  types: Array<{
    type: {
      name: string
    }
  }>
}


@Injectable({
  providedIn: 'root'
})
export class BodyService {
  private apiUrlPokemons = 'https://pokeapi.co/api/v2/pokemon';
  private apiUrlPokemon = 'https://pokeapi.co/api/v2/pokemon/'
  private apiUrlPokemonSpecific = 'https://pokeapi.co/api/v2/pokemon-form/'

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrlPokemons}`);
  }

  getPokemon(id: number): Observable<PokemonResult> {
    return this.http.get<PokemonResult>(`${this.apiUrlPokemon}${id}`);
  }

  getPokemonSpecific(id: number): Observable<PokemonSpecific>{
    return this.http.get<PokemonSpecific>(`${this.apiUrlPokemonSpecific}${id}`);
  }
}
