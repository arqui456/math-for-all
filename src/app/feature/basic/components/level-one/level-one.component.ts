import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Requisicao } from '../../interfaces/requisicao.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasicService } from '../../services/basic.service';
import { Erro } from '../../interfaces/error.interface';
import { ScreenReaderService } from '../../services/screen-reader.service';

@Component({
  selector: 'app-level-one',
  templateUrl: './level-one.component.html',
  styleUrls: ['./level-one.component.scss'],
})
export class LevelOneComponent implements OnInit {

  numero1 = 0;
  numero2 = 0;
  resposta?: number;
  contador = 1;
  operatorarray: number[] = this.generateOperatorArray();
  levelatual = 1;
  @Output() levelEmitter = new EventEmitter<number>();
  resultadoesperado?: number;
  erros: Erro[] = [];
  personagemUrl = "";
  nomeCrianca = "";
  pontuacao = 0;
  end = false;
  resultsArrived = true;
  reviewNumbers: number[] = [];
  requestInfo: any;
  icons = [
    '../assets/imagens/icon1.png',
    '../assets/imagens/icon2.png',
    '../assets/imagens/icon3.png',
    '../assets/imagens/icon4.png',
    '../assets/imagens/icon5.png'
  ];
  currentIcons: string[] = [];

  constructor(
    private errorService: BasicService,
    private http: HttpClient,
    private screenReaderService: ScreenReaderService
  ) { }

  ngOnInit(): void {
    this.currentIcons = [this.icons[Math.floor(Math.random() * 4)], this.icons[Math.floor(Math.random() * 4)]];
    [this.personagemUrl, this.nomeCrianca] = this.errorService.passPersonagem();
    this.levelEmitter.emit(this.levelatual);
    [this.numero1, this.numero2] = this.generateRandomNumbers(this.levelatual);
    this.readerScreen(this.numero1.toString(), this.numero2.toString(), this.operatorarray[this.contador-1] ? 'mais' : 'menos');
  }

  calculo(): void {
    if (this.resposta && !isNaN(+this.resposta)) {
      //console.log('OK button clicked! Entered text: ', this.resposta);
      if (this.operatorarray[this.contador - 1]) {
        this.resultadoesperado = this.numero1 + this.numero2;
        if (this.resultadoesperado == this.resposta) {
          console.log("acertou");
          this.pontuacao += 1;
        }
        else {
          console.log("errou");
        }
        this.erros.push({
          numero1: this.numero1,
          numero2: this.numero2,
          operator: "+",
          resultado: this.resposta,
          resultadoesperado: this.resultadoesperado,
          margemdeerro: Math.abs(this.resultadoesperado - this.resposta),
          levelatual: this.levelatual
        })
      }
      else {
        this.resultadoesperado = this.numero1 - this.numero2;
        if (this.resultadoesperado == this.resposta) {
          console.log("acertou");
          this.pontuacao += 1;
        }
        else {
          console.log("errou");
          this.erros.push({
            numero1: this.numero1,
            numero2: this.numero2,
            operator: "-",
            resultado: this.resposta,
            resultadoesperado: this.resultadoesperado,
            margemdeerro: Math.abs(this.resultadoesperado - this.resposta),
            levelatual: this.levelatual
          })
        }
      }
      this.contador += 1;
    }
    else {
      alert('Por favor digite um número válido');
    }
    //console.log(this.erros);
    this.resposta = undefined;
    if (this.contador > 10 && this.levelatual < 5) {
      console.log("proximo level")
      this.contador = 1;
      this.levelatual += 1;
      this.levelEmitter.emit(this.levelatual);
      if (this.levelatual == 5) {
        this.levelEmitter.emit(-1);
        this.end = true;
        this.resultsArrived = false;
      }
      else {
        this.operatorarray = this.generateOperatorArray();
      }
    }
    else if (this.contador > 5 && this.levelatual == 5) {
      console.log("fim");
      this.levelatual += 1;
      this.end = true;
      this.levelEmitter.emit(-1);
    }
    this.currentIcons = [this.icons[Math.floor(Math.random() * 4)], this.icons[Math.floor(Math.random() * 4)]];
    [this.numero1, this.numero2] = this.generateRandomNumbers(this.levelatual);
    this.readerScreen(this.numero1.toString(), this.numero2.toString(), this.operatorarray[this.contador-1] ? 'mais' : 'menos');
  }

  generateRandomNumbers(type: number): [number, number] {
    if (type == 1) {
      const primeiroNumero = Math.floor(Math.random() * 9) + 1
      if (!this.operatorarray[this.contador - 1]) {
        return [primeiroNumero, Math.floor(Math.random() * primeiroNumero) + 1]
      }
      return [primeiroNumero, Math.floor(Math.random() * 9) + 1]
    }
    else if (type == 2) {
      return [Math.floor(Math.random() * 80) + 10, Math.floor(Math.random() * 9) + 1]
    }
    else if (type == 3) {
      const primeiroNumero = Math.floor(Math.random() * 40) + 10
      if (!this.operatorarray[this.contador - 1]) {
        return [primeiroNumero, Math.floor(Math.random() * primeiroNumero) + 1]
      }
      return [primeiroNumero, Math.floor(Math.random() * 39) + 10]
    }
    else if (type == 4) {
      const primeiroNumero = Math.floor(Math.random() * 50) + 1
      if (!this.operatorarray[this.contador - 1]) {
        return [primeiroNumero, Math.floor(Math.random() * primeiroNumero) + 1]
      }
      return [primeiroNumero, Math.floor(Math.random() * 49) + 1]
    }
    this.readerScreen(this.numero1.toString(), this.numero2.toString(), this.operatorarray[this.contador-1] ? 'mais' : 'menos');
    //console.log(this.erros);
    return this.generateReviewQuestion()
  }

  generateReviewQuestion(): [number, number] {

    let reviewQuestion: [number, number];
    let a, b = 0;
    let temp = 0;

    a = Math.abs(this.reviewNumbers.pop() || 0);
    b = Math.abs(this.reviewNumbers.pop() || 0);
    if (a < b) {
      temp = a;
      a = b;
      b = temp;
    }
    reviewQuestion = [a, b];
    return reviewQuestion;
  }

  analizeResults() {
    this.getPrediction();
  }

  getPrediction() {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Accept-Encoding', 'gzip, deflate, br');
    headers.append('Connection', 'keep-alive')

    try {
      this.http.post<Requisicao>('http://localhost:8081/api/predict', this.erros, { headers: headers }).subscribe((response) => {
        this.reviewNumbers = [...response.numeros];
        console.log(response);
        console.log(this.reviewNumbers);
        for (let i = 9; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.reviewNumbers[i], this.reviewNumbers[j]] = [this.reviewNumbers[j], this.reviewNumbers[i]]; // Swap elements
        }
        console.log(this.reviewNumbers);
        [this.numero1, this.numero2] = this.generateRandomNumbers(5);
        this.resultsArrived = true;
      })
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  generateOperatorArray(): number[] {
    const array: number[] = [];

    for (let i = 0; i < 5; i++) {
      array.push(0);
      array.push(1);
    }

    for (let i = 9; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    //console.log(array);
    return array;
  }

  changePreview(): string {
    return this.levelatual == 1 ? '../assets/imagens/level1p.png' :
      this.levelatual == 2 ? '../assets/imagens/level2p.png' :
        this.levelatual == 3 ? '../assets/imagens/level3p.png' :
          this.levelatual >= 4 ? '../assets/imagens/level4p.png' : ""
  }

  getIcons(index: number): string {
    return this.currentIcons[index]
  }

  reload(): void {
    window.location.reload();
  }

  public readerScreen(n1: string, n2: string, operator: string) {
    this.screenReaderService.readerScreen(n1);
    this.screenReaderService.readerScreen(operator);
    this.screenReaderService.readerScreen(n2);

  }

  public addListener() {
    this.screenReaderService.addListener();
  }

  public repeat() {
    this.readerScreen(this.numero1.toString(),
    this.numero2.toString(),
    this.operatorarray[this.contador-1] ? 'mais' : 'menos');
  }


}
