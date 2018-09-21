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

}
