import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BasicService } from '../../services/basic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit{
  title = 'app';
  levelatual = 0;
  currentSong = ""
  isLoaded = false;
  isVideoFinished = false; // Tracks if the video has finished playing
  introVideoSrc = '../../../../../assets/imagens/intro.mp4'; // Path to the intro video
  @ViewChild('introVideo') introVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('backGroundVideo') backGroundVideo!: ElementRef<HTMLVideoElement>;

  
  
  constructor(
    private errorService: BasicService,
  ) {
  }

  ngAfterViewInit(): void {
    // Ensure the video plays after the view initializes
    const video = this.introVideo.nativeElement;
    const back = this.backGroundVideo.nativeElement;

    // Force autoplay programmatically
    video.load()
    video.muted = true; // Ensure it's muted to comply with autoplay policies
    video.playsInline = true; // Recommended for mobile devices
    video.play().catch((error) => {
      console.error('Autoplay failed:', error);
    });

    back.load();
    back.muted = true;
    back.playsInline = true;
    back.autoplay = true;
    back.loop = true;
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

  onVideoEnded(): void {
    this.isVideoFinished = true; // Hide the video overlay when finished
  }


  preloadImages() {
    const staticImages = [
      '../../../../../assets/imagens/background.jpeg',
      '../../../../../assets/imagens/level1.jpeg',
      '../../../../../assets/imagens/level2.jpeg',
      '../../../../../assets/imagens/level3.jpeg',
      '../../../../../assets/imagens/level4.jpeg',
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
  
    // Dynamically generate the image URLs for even numbers from 14 to 68
    const dynamicImages = [];
    for (let i = 14; i <= 68; i += 2) {
      dynamicImages.push(`../../../../../assets/imagens/teste/${i}.png`);
    }
  
    const allImages = [...staticImages, ...dynamicImages];
    let loadedImages = 0;
  
    const checkIfAllImagesLoaded = () => {
      loadedImages++;
      if (loadedImages === allImages.length) {
        this.isLoaded = true;
      }
    };
  
    allImages.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
      img.addEventListener('load', checkIfAllImagesLoaded);
      img.addEventListener('error', () => {
        console.error(`Failed to load image: ${imageUrl}`);
        checkIfAllImagesLoaded(); // Count even failed loads to prevent hanging
      });
    });
  }
  

  getImage(): any {
    if (this.levelatual === 0) {
      // Return styles for video background for level 0
      return {
        'background-image': 'none', 
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100%',
        'z-index': '1'
      };
    } else {
      // Return the image background for other levels
      return {
        'background-image': this.levelatual === 1 ? 'url("../../../../../assets/imagens/level1.jpeg")' :
          this.levelatual === 2 ? 'url("../../../../../assets/imagens/level2.jpeg")' :
            this.levelatual === 3 ? 'url("../../../../../assets/imagens/level3.jpeg")' :
              this.levelatual === 4 ? 'url("../../../../../assets/imagens/level4.jpeg")' : 'url("../../../../../assets/imagens/background.jpeg")',
        'transition': 'background-image 0.5s ease-in-out',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
      };
    }
  }

}
