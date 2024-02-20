import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  darkMode: boolean = false;
  imgMode: string = '../assets/moon.svg';

  changeDarkMode = () => {
    const mode=document.documentElement.classList.toggle("dark");
    if (mode) {
      this.imgMode = '../assets/sun.svg'; // Dark mode is enabled
    } else {
      this.imgMode = '../assets/moon.svg'; // Dark mode is disabled
    }
  }
}
