import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../Models/usuario';
import { UsuarioService } from '../../Services/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public usuario: Usuario;
  public uploadFile: Array<File>
  public identificado: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.usuario = new Usuario('', '', '', '','');
    this.uploadFile = [];
  }

  ngOnInit(): void {
    console.log('Componente register metodo ngOnInit')
  }

  envioSignup(formularioRegister: NgForm) {
    console.log(this.usuario);
    this.usuarioService.addUser(this.usuario).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('identificado', JSON.stringify(response[0]));
        localStorage.setItem('Token', JSON.stringify(response[1]));
        if (this.uploadFile) {
          this.usuarioService.subirFile(this.uploadFile)
            .then(result => console.log(result))
            .catch(error => console.log(error));
          this.identificado = localStorage.getItem('identificado');
          let identity = JSON.parse(this.identificado);
          setTimeout(() => {
            this.usuarioService.getUser(identity._id).subscribe(
              response => {
                console.log(response.user);
                localStorage.removeItem('identificado');
                localStorage.setItem('Identity', JSON.stringify(response.user));
                this.router.navigate(['/inicio']);
              }
            )
          }, 500);
        }
      }
    )
  }

  imgRegister(event: any) {
    console.log(event);
    this.uploadFile = <Array<File>>event.target.files[0];
    console.log(this.uploadFile);
  }


}
