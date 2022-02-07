import { Component, OnInit, DoCheck } from '@angular/core';
import { UsuarioService } from './Services/usuario.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck {

  public identity: any;
  public page: number;
  public date: any;
  constructor(
    private usuaroServices: UsuarioService,
    private router: Router
  ){
    this.page = 1;
    //this.date = moment().startOf('hour').fromNow();;
  }

  ngOnInit(): void {
      console.log('Component principal appComponent');
      this.identity =  this.usuaroServices.getIdentity();
  }

  ngDoCheck(): void {
      this.identity = this.usuaroServices.getIdentity();
  }

  logOut(){
    this.usuaroServices.LogOut();
    this.router.navigate(['/about']);
  }
}
