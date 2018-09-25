import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'swartemp';

  public toggleclass() {
    const array = document.getElementsByClassName('dropdownmenu');
    for (let i = 0; i < array.length; i++) {
      array[i].classList.toggle('dropped');
    }
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    }
  }

  public timerclass() {

    const ticker = setInterval(function() {
      // set variables
      const timerfinish = new Date('Dec 25, 2018').getTime();
      const currenttime = new Date().getTime();
      const difference = timerfinish - currenttime;
      const daysleft = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hoursleft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesleft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secondsleft = Math.floor((difference % (1000 * 60)) / 1000);

      // render
      document.getElementById('timerdisplay').innerHTML =
      'Submit by: ' + daysleft + 'd ' + hoursleft + 'h ' + minutesleft + 'm ' + secondsleft + 's ';

      // display expiration
      if (difference < 0) {
        clearInterval(ticker);
        document.getElementById('timerdisplay').innerHTML = 'Times up!';
      }
    }, 1000);
  }

}
