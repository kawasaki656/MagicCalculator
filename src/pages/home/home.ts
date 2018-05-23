import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  calculating: string;
  newOne: string;
  result: string;
  booferResult: string;
  counter: number;

  numbers: Array<number>;
  operations: Array<string>;
  constructor(public navCtrl: NavController) {
    this.calculating = "0";
    this.newOne = "";

    this.numbers = [];
    this.operations = [];

    this.counter = 0;
  }

  addNumber(value) {
    if(this.calculating === "0") {
      this.calculating = value;
    } else {
      this.calculating = this.calculating + value.toString();
    }

    this.newOne = this.newOne + value.toString();
  }

  addOperation(value) {
    if(this.newOne !== "") {
      this.calculating = this.calculating + " " + value.toString() + " ";
      this.numbers.push(Number.parseFloat(this.newOne));
      this.operations.push(value);
      this.newOne = "";
    } else {
      this.operations[this.operations.length - 1] = value;
      this.calculating = this.calculating.slice(0, this.calculating.length - 2 ) + " " + value + " ";
    }
  }

  getResult() {
    this.numbers.push(Number.parseFloat(this.newOne));
    this.newOne = "";
    let index = 0;
    let result = this.numbers[index];
    index++;
    for(let operation of this.operations) {
      switch(operation) {
        case '+': result += this.numbers[index]; break;
        case '-': result -= this.numbers[index]; break;
        case '÷': result /= this.numbers[index]; break;
        case '×': result *= this.numbers[index]; break;
      }
      index++;
    }

    this.result = "" + result;

  }

  clear() {
    this.booferResult = this.result;
    this.result = "0";
  }

  back() {
    if(this.newOne) {
      this.calculating = this.calculating.slice(0, -1);
    }
    this.newOne = this.newOne.slice(0, -1);
  }

  getHint() {
    this.counter++;
    if (this.counter === 2) {
      this.result = "" + this.numbers[0];
      setTimeout(() => {
        this.result = "0";
      }, 1000);

      this.counter = 0;
    }
  }

}
