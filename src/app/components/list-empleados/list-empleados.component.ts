import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  constructor(private _empleadoService: EmpleadoService, private router: Router,  private toastr: ToastrService) {
       }

  ngOnInit(): void {
    this.getEmpleados()
  }
  getEmpleados(){
    this.empleados = [];
    this._empleadoService.getEmpleados().subscribe(data =>{
     data.forEach((element:any) => {
       
       this.empleados.push({
         id: element.payload.doc.id,
        ...element.payload.doc.data()
       })
     });
     console.log(this.empleados);
    });
  }
  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(() =>{
     
     this.toastr.error('Empleado eliminado con exito');
      console.log('empleado eliminado','Empleado eliminado', {
        positionClass: 'toast-bottom-right'});
      this.getEmpleados();
    }).catch(
      error => {
        console.log('error al eliminar empleado' + error);
      }
      
    );
  }
}
