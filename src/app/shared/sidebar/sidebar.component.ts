import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private router:Router,
    private auth:AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout().then(() => {
      this.router.navigate(['/login'])
    })
  }

}
