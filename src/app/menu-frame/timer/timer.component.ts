import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() {
    const ticker = setInterval(function() {

      // set variables
      const timerfinish = new Date('August 29, 2020').getTime();
      const currenttime = new Date().getTime();
      const difference = timerfinish - currenttime;
      const daysleft = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursleft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesleft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secondsleft = Math.floor((difference % (1000 * 60)) / 1000);

      // render
      document.getElementById('timerdisplay').innerHTML =
      'Submit by: ' + daysleft + 'd ' + hoursleft + 'h ' + minutesleft + 'm ';

      // display expiration
      if (difference < 0) {
        clearInterval(ticker);
        document.getElementById('timerdisplay').innerHTML = 'Times up!';
      }
    }, 1000);
   }

  ngOnInit() {

  }

}
