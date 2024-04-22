import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor() { }

  personagem = "";
  nome = "";
  songUrl: Subject<string> = new Subject<string>();


  getPersonagem(url: string, name :string): void{
    this.personagem = url;
    this.nome = name;
  }

  passPersonagem(): [string, string]{
    return [this.personagem, this.nome];
  }

  passCurrentSong(value: string): void{
    this.songUrl.next(value);
  }

  getCurrentSong(): Observable<string>{
    return  this.songUrl.asObservable();
  }
}
