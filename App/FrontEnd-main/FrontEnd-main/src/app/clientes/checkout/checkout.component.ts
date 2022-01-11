import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart/cart.service';
import { Facturas, Desglose } from 'src/app/service/facturas/facturas';
import { FacturasService } from 'src/app/service/facturas/facturas.service';
import { Usuario } from 'src/app/service/usuarios/usuario';
import { JwtService } from 'src/app/service/shared/jwt.service';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {
  items = this.cartService.getItems();
  item = this.items[1];
  fact: Facturas[] = [];
  desg: Desglose[] = [];
  user: any;
  lvl:any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private facturaService: FacturasService,
    public jwtService: JwtService,
    private usuarioService: UsuarioService
  ) {
  }
  ngOnInit(): void {
    /* Permisos */
    this.jwtService.profile().subscribe((res: any) => {
      this.user = res;
      this.usuarioService.getPermiso(this.user.id).subscribe((
        datac: any) => {
          this.lvl=datac;
        if (datac == "Administrativo") {
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
  }
  deleteFromCart(item) { //Elimina el item dentro del cart
    this.cartService.deleteFromCart(item);
  }
  comprar() {
    this.fact['usuario_id'] = this.user.id;
    this.fact['tot'] = this.cartService.getTotalPrecio();
    this.fact.toString();
    console.log(Object.assign({}, this.fact));
    this.facturaService.createFactura(Object.assign({}, this.fact)).subscribe(res => {
      Swal.fire("Su compra esta siendo procesada...", "", "info");
      for (let item = 0; item < this.items.length; item++) {
        const element = this.items[item];
        this.desg['facturas_id'] = 0;
        this.desg['producto_id'] = element.id;
        this.desg['cantidad'] = element.cantlleva;
        this.desg['pre_tot'] = (element.pre_uni * element.cantlleva);
        this.facturaService.createDesglose(Object.assign({}, this.desg)).subscribe(res => {
          console.log('Desglose creado correctamente!');
          if (item === this.items.length - 1) {
            Swal.fire("Su compra ha sido realizada", "", "success");
            this.cartService.clearCart();
            if(this.lvl=="Cliente"){
              this.router.navigate(['producto/pdf']);
            }
            else{
              this.router.navigate(['superusuario/facturas']);
            }

          }
        })
      }
      console.log('Factura creada correctamente!');
    })
  }


  /* Declara el evento scroll del HostListener */
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    /* NavBar */
    let element1 = document.querySelector('nav');
    /* Icon Carrito */
    let element3 = document.getElementById('icon');

    /* Condiciones para el cambio de color segun la altura del scroll */
    if (window.pageYOffset > 1) {
      element1.classList.add('bg-primary-g');

      element3.classList.add('btn-color-icon');
    } else {
      element1.classList.remove('bg-primary-g');
      element3.classList.remove('btn-color-icon');
    }
  }



}
