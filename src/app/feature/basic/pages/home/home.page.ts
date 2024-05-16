import { Component, OnInit } from '@angular/core';
import { BasicService } from '../../services/basic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  title = 'app';
  levelatual = 0;
  currentSong = ""
  isLoaded = false;

  constructor(
    private errorService: BasicService,
  ) {
  }

  ngOnInit(): void {
    this.preloadImages();
    this.errorService.getCurrentSong().subscribe((value) => {
      this.currentSong = value;
    });
    var audio = <HTMLAudioElement>document.getElementById("bgm");
    if (audio != null) {
      audio.volume = 0.1;
    }
  }


  preloadImages() {
    const images = [
      '../../../../../assets/imagens/background.jpeg',
      '../../../../../assets/imagens/level1.jpeg',
      '../../../../../assets/imagens/level2.jpeg',
      '../../../../../assets/imagens/level3.jpeg',
      '../../../../../assets/imagens/level4.jpeg',
      '../../../../../assets/imagens/crianca1.jpeg',
      '../../../../../assets/imagens/crianca2.jpeg',
      '../../../../../assets/imagens/crianca3.jpeg',
      '../../../../../assets/imagens/crianca4.jpeg',
      '../../../../../assets/imagens/crianca5.jpeg',
      '../../../../../assets/imagens/crianca6.jpeg',
      '../../../../../assets/imagens/crianca7.jpeg',
      '../../../../../assets/imagens/crianca8.png',
      '../../../../../assets/imagens/level1p.png',
      '../../../../../assets/imagens/level2p.png',
      '../../../../../assets/imagens/level3p.png',
      '../../../../../assets/imagens/level4p.png',
      '../../../../../assets/imagens/icon1.png',
      '../../../../../assets/imagens/icon2.png',
      '../../../../../assets/imagens/icon3.png',
      '../../../../../assets/imagens/icon4.png',
      '../../../../../assets/imagens/icon5.png'
    ];

    let loadedImages = 0;

    const checkIfAllImagesLoaded = () => {
      loadedImages++;

      if (loadedImages === images.length) {
        this.isLoaded = true;
      }
    };

    images.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
      img.addEventListener('load', checkIfAllImagesLoaded);
    });
  }

  getImage(): any {

    return {
      'background-image': this.levelatual === 0 ? 'url("../../../../../assets/imagens/background.jpeg")' :
        this.levelatual === 1 ? 'url("../../../../../assets/imagens/level1.jpeg")' :
          this.levelatual === 2 ? 'url("../../../../../assets/imagens/level2.jpeg")' :
            this.levelatual === 3 ? 'url("../../../../../assets/imagens/level3.jpeg")' :
              this.levelatual === 4 ? 'url("../../../../../assets/imagens/level4.jpeg")' : 'url("../../../../../assets/imagens/background.jpeg")',
      'transition': 'background-image 0.5s ease-in-out',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    };
  }


}
