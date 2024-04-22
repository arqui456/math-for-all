import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasicService } from '../../services/basic.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent {

  constructor(private errorService: BasicService) { }

  data = [
    {
      url: '../assets/imagens/crianca1.jpeg',
      name: "Criança indígena"
    },
    {
      url: '../assets/imagens/crianca2.jpeg',
      name: "Criança indígena"
    },
    {
      url: '../assets/imagens/crianca3.jpeg',
      name: "Criança quilombola"
    },
    {
      url: '../assets/imagens/crianca4.jpeg',
      name: "Criança quilombola"
    },
    {
      url: '../assets/imagens/crianca5.jpeg',
      name: "Criança ribeirinha"
    },
    {
      url: '../assets/imagens/crianca6.jpeg',
      name: "Criança ribeirinha"
    },
    {
      url: '../assets/imagens/crianca7.jpeg',
      name: "Criança guerreira"
    },
    {
      url: '../assets/imagens/crianca8.png',
      name: "Criança guerreira"
    },
  ];

  public trigger = 0;
  public displayUrl = '../assets/imagens/crianca1.jpeg';
  public displayName = "Criança indígena";
  public currentSong = "../assets/imagens/musica1.mp3"
  public settings = false;
  @Output() levelEmitter = new EventEmitter<number>();

  checkPlay(): void{
    this.errorService.passCurrentSong(this.currentSong);
    this.trigger += 1;
    if (this.trigger == 2){
      this.errorService.getPersonagem(this.displayUrl, this.displayName);
      this.levelEmitter.emit(this.trigger);
    }
  }

  passCurrentSong(song: string) : void{
    this.currentSong = song;
    this.errorService.passCurrentSong(song);
  }

}
