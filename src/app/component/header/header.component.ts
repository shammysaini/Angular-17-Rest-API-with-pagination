import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatIconModule} from "@angular/material/icon"
import {MatMenuModule} from "@angular/material/menu"
import {MatListModule} from "@angular/material/list"
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatBadgeModule} from "@angular/material/badge"
import {MatButtonModule} from "@angular/material/button"
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [

    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatBadgeModule,
    MatButtonModule,
    FooterComponent,
    RouterOutlet,
    RouterLink
    
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  badgevisible:boolean = false;
  badgevisibility() {
    this.badgevisible = true;

  }

}
