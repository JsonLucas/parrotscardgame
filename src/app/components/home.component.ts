import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: '../templates/home.component.html',
  styleUrls: ['../styles/home.component.sass']
})
export class HomeComponent implements OnInit {

	qtdCards: number = 8;
	cardUrl: Array<string> = [];
	ngOnInit() {}

}
