import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasicService } from '../../services/basic.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
  providers: []
})
export class InitialComponent {

  constructor(
    private errorService: BasicService
  ) {
  }

  data = [
    {
      url: '../assets/imagens/teste/14.png',
      name: "Criança indígena"
    },
    {
      url: '../assets/imagens/teste/16.png',
      name: "Criança indígena"
    },
    {
      url: '../assets/imagens/teste/18.png',
      name: "Criança quilombola"
    },
    {
      url: '../assets/imagens/teste/20.png',
      name: "Criança quilombola"
    },
    {
      url: '../assets/imagens/teste/22.png',
      name: "Criança ribeirinha"
    },
    {
      url: '../assets/imagens/teste/24.png',
      name: "Criança ribeirinha"
    },
    {
      url: '../assets/imagens/teste/28.png',
      name: "Criança guerreira"
    },
    {
      url: '../assets/imagens/teste/30.png',
      name: "Criança guerreira"
    },
  ];
  

  data2 = [
    {
      url: '../assets/imagens/teste/34.png',
      name: "Criança cadeirante"
    },
    {
      url: '../assets/imagens/teste/36.png',
      name: "Criança cadeirante"
    },
    {
      url: '../assets/imagens/teste/38.png',
      name: "Criança TEA"
    },
    {
      url: '../assets/imagens/teste/40.png',
      name: "Criança TEA"
    },
    {
      url: '../assets/imagens/teste/42.png',
      name: "Criança TDAH"
    },
    {
      url: '../assets/imagens/teste/44.png',
      name: "Criança TDAH"
    },
    {
      url: '../assets/imagens/teste/46.png',
      name: "Criança cega"
    },
    {
      url: '../assets/imagens/teste/48.png',
      name: "Criança cega"
    },
    {
      url: '../assets/imagens/teste/50.png',
      name: "Criança com prótese"
    },
    {
      url: '../assets/imagens/teste/52.png',
      name: "Criança com prótese"
    },
    {
      url: '../assets/imagens/teste/54.png',
      name: "Criança baixa visão"
    },
    {
      url: '../assets/imagens/teste/56.png',
      name: "Criança baixa visão"
    },
    {
      url: '../assets/imagens/teste/58.png',
      name: "Criança auditiva"
    },
    {
      url: '../assets/imagens/teste/60.png',
      name: "Criança auditiva"
    },
    {
      url: '../assets/imagens/teste/62.png',
      name: "Criança albina"
    },
    {
      url: '../assets/imagens/teste/64.png',
      name: "Criança albina"
    },
    {
      url: '../assets/imagens/teste/66.png',
      name: "Criança oculta"
    },
    {
      url: '../assets/imagens/teste/68.png',
      name: "Criança oculta"
    }
  ];
  

  public trigger = 0;
  public displayUrl = '../assets/imagens/teste/14.png';
  public displayName = "Criança indígena";
  public currentSong = "../assets/imagens/musica1.mp3"
  public settings = false;
  @Output() levelEmitter = new EventEmitter<number>();

  checkPlay(): void {
    this.errorService.passCurrentSong(this.currentSong);
    this.trigger += 1;
    if (this.trigger == 2) {
      this.errorService.getPersonagem(this.displayUrl, this.displayName);
      this.levelEmitter.emit(this.trigger);
    }
  }

  passCurrentSong(song: string): void {
    this.currentSong = song;
    this.errorService.passCurrentSong(song);
  }

}
