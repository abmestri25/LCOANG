import { Component } from '@angular/core';
import arrayWords from '../util/words'
import arrayCountries from '../util/countries'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'core-angular';

  words = '';
  countries = '';

  randomCountry = '';
  limit = 15;

  handleSlideChange = (newLimit:number) => {
    this.limit = newLimit;
  }

  generateWords = () => {
    this.words = arrayWords.slice(0,this.limit).join('')
    // this.countries = arrayCountries.slice(0,this.limit).join('')
  }



  generateRandomCountry = () => {
    this.randomCountry = arrayCountries[Math.floor(Math.random() * arrayCountries.length)];
    console.log(this.randomCountry);
    
  }
}
