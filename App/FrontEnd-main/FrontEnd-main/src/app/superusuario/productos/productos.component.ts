import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Producto } from '../../service/productos/productos';
import { ProductoService } from '../../service/productos/productos.service';
import Swal from 'sweetalert2';
import { JwtService } from 'src/app/service/shared/jwt.service';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  item: any | undefined;
  form: FormGroup;
  id: any | undefined;
  nom: any | undefined;
  desc: any | undefined;
  pre_uni: any | undefined;
  can: any | undefined;
  cat: any | undefined;
  user: any;




  constructor(
    public productoService: ProductoService,
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

    this.productoService.getAll().subscribe((datau: Producto[]) => {
      this.productos = datau;
    })
    this.form = new FormGroup({
      id: new FormControl(''),
      nom: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      desc: new FormControl('', [Validators.required]),
      pre_uni: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      can: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      cat: new FormControl('', [Validators.required])
    });
    this.form
  }

  eliminar(id) {
    Swal.fire({
      title: 'Esta seguro de eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#178CA4',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productoService
          .delete(id)
          .subscribe(
            response => {
              Swal.fire(
                'Producto Eliminado!'
              )
              window.location.reload();
            },
            error => {
            }
          );
      }
    })
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
  editar() {
    this.form.value['id'] = this.id;
    if (this.form.value['nom'] == "") {
      this.form.value['nom'] = this.nom;
    }
    if (this.form.value['desc'] == "") {
      this.form.value['desc'] = this.desc;
    }
    if (this.form.value['pre_uni'] == "") {
      this.form.value['pre_uni'] = this.pre_uni;
    }
    if (this.form.value['can'] == "") {
      this.form.value['can'] = this.can;
    }
    if (this.form.value['cat'] == "") {
      this.form.value['cat'] = this.cat;
    }

    console.log(this.form.value);
    this.productoService.edit(this.form.value).subscribe(res => {
      Swal.fire(
        'Producto Editado Correctamente!'
      )
      window.location.reload();
    },
      error => {
        console.log(error);
      }
    )
  }



  mostrarFormEditar(productoID) {

    let formAdd = document.querySelector(".form-add");
    let formEdit = document.querySelector(".form-edit");


    this.item = this.productos.find(
      (item) => item.id === productoID
    );
    this.form['id'] = this.item.id;
    this.id = this.item.id;
    this.nom = this.item.nom;
    this.desc = this.item.desc;
    this.pre_uni = this.item.pre_uni;
    this.can = this.item.cant;
    this.cat = this.item.categoria.nom;

    // (<HTMLInputElement>document.getElementById('id')).value = this.item.id.toString();
    (<HTMLInputElement>document.getElementById('nom')).value = this.item.nom.toString();
    (<HTMLInputElement>document.getElementById('desc')).value = this.item.desc.toString();
    (<HTMLInputElement>document.getElementById('pre_uni')).value = this.item.pre_uni.toString();
    (<HTMLInputElement>document.getElementById('can')).value = this.item.cant.toString();
    (<HTMLInputElement>document.getElementById('cat')).value = this.item.categoria.nom.toString();


    formEdit.classList.add('d-block');
    formAdd.classList.add('d-none');

    formAdd.classList.remove('d-block');
    formEdit.classList.remove('d-none');



  }

  mostrarFormAdd() {
    let formAdd = document.querySelector(".form-add");
    let formEdit = document.querySelector(".form-edit");


    formEdit.classList.add('d-none');
    formAdd.classList.add('d-block');

    formEdit.classList.remove('d-block');
    formAdd.classList.remove('d-none');
  }

}
