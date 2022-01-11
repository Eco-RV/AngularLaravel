import { Component, OnInit, HostListener } from '@angular/core';
import { Usuario } from 'src/app/service/usuarios/usuario';
import { FacturasService } from '../../service/facturas/facturas.service';
import { JwtService } from 'src/app/service/shared/jwt.service';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})

export class PdfComponent implements OnInit {

  //Variables de tipo any
  facturas: any[] = [];
  desglose: any[] = [];
  desg_can: any[] = [];
  desg_pro: any[] = [];
  desg_pre: any[] = [];
  desg_sub: any[] = [];
  nom: any[] = [];
  mon_tot = 0;
  user: Usuario;



  constructor(
    private facturasService: FacturasService,
    public jwtService: JwtService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    /* Permisos */
    this.jwtService.profile().subscribe((res: any) => {
      this.user = res;
      this.usuarioService.getPermiso(this.user.id).subscribe((
        datac: any) => {
        if (datac != "Cliente") {
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
    this.jwtService.profile().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      this.facturasService.getLast(this.user.id).subscribe((datac: any[]) => {
        this.facturas[0] = datac;
        this.desglose = this.facturas[0].desglose;
        for (let index = 0; index < this.desglose.length; index++) {
          const element = this.desglose[index];
          this.mon_tot += element.pre_tot;
        }

        console.log(this.facturas[0]);
      })
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

