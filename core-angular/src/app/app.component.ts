import { Component } from '@angular/core';
import arrayWords from '../util/words'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'core-angular';

  words = '';
  limit = 15;

  handleSlideChange(newLimit:number){
    this.limit = newLimit;
  }

  generate(){
    this.words = arrayWords.slice(0,this.limit).join('')
  }

}
