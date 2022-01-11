import { Component, OnInit } from '@angular/core';

import { Facturas } from '../../service/facturas/facturas';
import { FacturasService } from '../../service/facturas/facturas.service';
import Swal from 'sweetalert2';
import { JwtService } from 'src/app/service/shared/jwt.service';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: Facturas[] = [];
  fact: Facturas | undefined;
  user: any;

  constructor(
    public facturasService: FacturasService,
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /* Permisos */
    this.jwtService.profile().subscribe((res: any) => {
      this.user = res;
      this.usuarioService.getPermiso(this.user.id).subscribe((
        datac: any) => {
        if (datac != "SuperUsuario") {
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

    this.facturasService.getAll().subscribe((datau: Facturas[]) => {
      this.facturas = datau;

    })

  }

  eliminar(id) {
    Swal.fire({
      title: 'Esta seguro de eliminar la factura?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#178CA4',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.facturasService
          .delete(id)
          .subscribe(
            response => {
              Swal.fire(
                'Factura Eliminada!'
              )
              window.location.reload();
            },
            error => {
              console.log(error);
            }
          );


      }
    })
  }


}
