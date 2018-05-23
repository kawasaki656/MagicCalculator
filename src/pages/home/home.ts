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
  counterHint: number;
  counterRefresh: number;
  counterYear: number;

  numbers: Array<number>;
  operations: Array<string>;
  constructor(public navCtrl: NavController) {
    this.calculating = "0";
    this.newOne = "";

    this.numbers = [];
    this.operations = [];

    this.counterHint = 0;
    this.counterRefresh = 0;
    this.counterYear = 0;
  }

  addNumber(value) {
    if(this.calculating === "0") {
      this.calculating = "" + value;
    } else {
      this.calculating = this.calculating + value.toString();
    }

    this.newOne = this.newOne + value.toString();

    if(value === 0) {
      this.getYearHint();
    }
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
    if(this.newOne) {
      this.numbers.push(Number.parseFloat(this.newOne));
      this.newOne = "";
      let index = 0;
      let result = this.numbers[index];
      index++;
      for (let operation of this.operations) {
        switch (operation) {
          case '+':
            result += this.numbers[index];
            break;
          case '-':
            result -= this.numbers[index];
            break;
          case '÷':
            result /= this.numbers[index];
            break;
          case '×':
            result *= this.numbers[index];
            break;
        }
        index++;
      }

      this.result = "" + result;
    }

    this.refresh();

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

    if(this.calculating === "") {
      this.calculating = "0";
    }
  }

  refresh() {
    this.counterRefresh++;
    if (this.counterRefresh === 5) {
      this.calculating = "0";
      this.newOne = "";

      this.numbers = [];
      this.operations = [];

      this.counterRefresh = 0;
      this.result = undefined;
    }
  }

  getHint() {
    this.counterHint++;
    if (this.counterHint === 2 && this.numbers[0]) {
      this.result = "" + this.numbers[0];
      setTimeout(() => {
        this.result = "0";
      }, 1000);

      this.counterHint = 0;
    }
  }

  getYearHint() {
    this.counterYear++;
    if (this.counterYear === 10 && this.numbers[1]) {
      this.result = "" + this.numbers[1];
      this.counterYear = 0;
    }
  }

}
