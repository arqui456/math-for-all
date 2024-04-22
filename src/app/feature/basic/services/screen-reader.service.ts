import { Injectable } from '@angular/core';
import { ScreenReader } from '@capacitor/screen-reader';

@Injectable({
  providedIn: 'root'
})
export class ScreenReaderService {
  constructor() { }

  public async readerScreen(value: string) {
    await ScreenReader.speak({ value: value, language: 'pt-BR' }).then(async res => {
      console.log('res: ', res);
    await ScreenReader.removeAllListeners();

    }).catch(error => {
      console.log('error: ', error);

    });
  }

  public addListener() {
    ScreenReader.addListener('stateChange', ({ value }) => {
      console.log(`Screen reader is now ${value ? 'on' : 'off'}`);
    });
  }
}
