import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuarios/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CartService } from '../../service/cart/cart.service';
import { FacturasService } from '../../service/facturas/facturas.service';
import { Desglose, Facturas } from '../../service/facturas/facturas';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  fact: Facturas[] = [];
  desg: Desglose[] = [];
  items = this.cartService.getItems();
  form: FormGroup;
  err = null;


  constructor(
    public usuarioService: UsuarioService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      email: new FormControl('', [Validators.required]),
      ced: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      num: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      dir: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      password: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.usuarioService.createUsuario(this.form.value).subscribe(res =>
      {
      console.log('Usuario creado correctamente!');
      this.router.navigate(['paginaprincipal/login']);
    },
    error => {
      console.log(error);
      this.err = error.error;
    }
    )

  }
}
