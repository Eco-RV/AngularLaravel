import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { Usuario } from 'src/app/service/usuarios/usuario';
import Swal from 'sweetalert2';
import { JwtService } from 'src/app/service/shared/jwt.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  users: Usuario[] = [];
  item: any | undefined;
  form: FormGroup;
  id: any | undefined;
  nom: any | undefined;
  email: any | undefined;
  ced: any | undefined;
  num: any | undefined;
  dir: any | undefined;
  password: any | undefined;
  category: any | undefined;
  err = null;
  user: any;



  constructor(
    public usuarioService: UsuarioService,
    private router: Router,
    private jwtService: JwtService,

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

    this.usuarioService.getAll().subscribe((datau: Usuario[]) => {
      this.users = datau;
      for (let index = 0; index < this.users.length; index++) {
        this.usuarioService.getPermiso(this.users[index].id).subscribe((datac: any) => {
          this.users[index].category = datac;
        })
      }
    })
    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      email: new FormControl('', [Validators.required]),
      ced: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      num: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      dir: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      password: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.usuarioService.createUsuario(this.form.value).subscribe(res => {
      Swal.fire(
        'Usuario Creado Correctamente!'
      )
      window.location.reload();
    },
      error => {
        console.log(error);
        this.err = error.error;
      }
    )

  }

  eliminarUsuario(userID) {
    Swal.fire({
      title: 'Esta seguro de eliminar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#178CA4',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService
          .delete(userID)
          .subscribe(
            response => {
              Swal.fire(
                'Usuario Eliminado!'
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
  editar() {
    this.form.value['id'] = this.id;
    if (this.form.value['nom'] == "") {
      this.form.value['nom'] = this.nom;
    }
    if (this.form.value['email'] == "") {
      this.form.value['email'] = this.email;
    }
    if (this.form.value['ced'] == "") {
      this.form.value['ced'] = this.ced;
    }
    if (this.form.value['num'] == "") {
      this.form.value['num'] = this.num;
    }
    if (this.form.value['dir'] == "") {
      this.form.value['dir'] = this.dir;
    }
    if (this.form.value['password'] == "") {
      this.form.value['password'] = this.password;
    }

    console.log(this.form.value);
    this.usuarioService.edit(this.form.value).subscribe(res => {
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



  mostrarFormEditar(userID) {

    let formAdd = document.querySelector(".form-add");
    let formEdit = document.querySelector(".form-edit");

    this.item = this.users.find(
      (item) => item.id === userID
    );
    console.log(this.item);
    this.form['id'] = this.item.id;
    this.id = this.item.id;
    this.nom = this.item.nom;
    this.email = this.item.email;
    this.ced = this.item.ced;
    this.num = this.item.num;
    this.dir = this.item.dir;
    this.password = this.item.password;
    this.category = this.item.category;
    // (<HTMLInputElement>document.getElementById('ide')).value = this.item.id.toString();
    (<HTMLInputElement>document.getElementById('nom')).value = this.item.nom.toString();
    (<HTMLInputElement>document.getElementById('email')).value = this.item.email;
    (<HTMLInputElement>document.getElementById('ced')).value = this.item.ced.toString();
    (<HTMLInputElement>document.getElementById('num')).value = this.item.num;
    (<HTMLInputElement>document.getElementById('dir')).value = this.item.dir.toString();
    (<HTMLInputElement>document.getElementById('password')).value = this.item.password;
    (<HTMLInputElement>document.getElementById('category')).value = this.item.category;



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
