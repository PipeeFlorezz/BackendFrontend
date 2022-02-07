import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../Models/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.usuario = new Usuario('', '','', '', '');
  }

  ngOnInit(): void {
  }

  envioSignup(formularioRegister: NgForm){
    this.usuarioService.loginUser(this.usuario).subscribe(
      response => {
        console.log(response);
        if(response.noUser){
          alert('Este usuario no existe');  
          this.router.navigate(['/login']);

        }
        localStorage.setItem('Identity', JSON.stringify(response[0]));
        localStorage.setItem('Token', JSON.stringify(response[1]));
        this.router.navigate(['/inicio']);
      }
    )
  }

}
