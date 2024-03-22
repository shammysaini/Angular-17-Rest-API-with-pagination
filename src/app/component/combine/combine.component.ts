import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-combine',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent

  ],
  templateUrl: './combine.component.html',
  styleUrl: './combine.component.css'
})
export class CombineComponent {

}
