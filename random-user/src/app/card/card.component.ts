import { Component, OnInit, Input } from '@angular/core';
import {
  faEnvelope,
  faMapMarkedAlt,
  faPhone,
  faRegistered
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() user;

  faEnvelope = faEnvelope
  faMapMarkedAlt = faMapMarkedAlt
  faPhone=faPhone
  faRegistered = faRegistered

  constructor() {}

  ngOnInit(): void {}

  reload(){
    location.reload()
  }
}
