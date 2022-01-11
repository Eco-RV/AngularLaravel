import { Component, OnInit, HostListener } from '@angular/core';
import { UsuarioService } from '../../service/usuarios/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CartService } from '../../service/cart/cart.service';
import { FacturasService } from '../../service/facturas/facturas.service';
import { Desglose, Facturas } from '../../service/facturas/facturas';
import Swal from 'sweetalert2'

import { Producto } from '../../service/productos/productos';
import { ProductoService } from '../../service/productos/productos.service';
import { JwtService } from 'src/app/service/shared/jwt.service';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.component.html',
  styleUrls: ['./agregarproducto.component.css']
})
export class AgregarproductoComponent implements OnInit {

  fact: Facturas[] = [];
  desg: Desglose[] = [];
  items = this.cartService.getItems();
  form: FormGroup;
  user: any;

  productos: Producto[] = [];
  item: any | undefined;


  constructor(
    public usuarioService: UsuarioService,
    public productoService: ProductoService,
    private router: Router,
    private cartService: CartService,
    private facturaService: FacturasService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {

    /* Permisos */
    this.jwtService.profile().subscribe((res: any) => {
      this.user = res;
      this.usuarioService.getPermiso(this.user.id).subscribe((
        datac: any) => {

        if (datac != "Administrativo") {
          Swal.fire({
            title: 'No esta autorizado para entrar a esta pagina',
            icon: 'info',
            allowOutsideClick: false
          })
          if (datac == "SuperUsuario") {
            this.router.navigate(['superusuario/usuarios']);
          }
          if (datac == "Administrativo") {
            this.router.navigate(['admin/stock']);
          }
          if (datac == "Cliente") {
            this.router.navigate(['producto/lista']);
          }

        }
      })
    },
      error => {
        Swal.fire({
          title: 'Para acceder a la pagina debe iniciar sesion',
          icon: 'info',
          allowOutsideClick: false
        })
        this.router.navigate(['paginaprincipal/login']);
      })
    /* Fin Permisos */

    this.form = new FormGroup({
      id: new FormControl(''),
      nom: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      desc: new FormControl('', [Validators.required]),
      pre_uni: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      can: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      cat: new FormControl('', [Validators.required])
    });
  }

  /* Declara el evento scroll del HostListener */
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    /* NavBar */
    let element1 = document.querySelector('nav');

    /* Condiciones para el cambio de color segun la altura del scroll */
    if (window.pageYOffset > 1) {
      element1.classList.add('bg-primary-g');
    } else {
      element1.classList.remove('bg-primary-g');
    }
  }


  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.productoService.create(this.form.value).subscribe(res => {
      Swal.fire(
        'Producto Creado Correctamente!'
      )
      window.location.reload();
    },
      error => {
        console.log(error);
      }
    )
  }


}
