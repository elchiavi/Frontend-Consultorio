import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { ObraSocial } from '../../models/obra-social.model';
import { Paciente } from 'src/app/models/paciente.model';
import { Prestacion } from '../../models/prestacion.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public obrasSociales: ObraSocial[] = [];
  public pacientes: Paciente[] = [];
  public prestaciones: Prestacion[] = [];


  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService,
               private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({termino}) => this.busquedaGlobal( termino));
  }

  busquedaGlobal( termino: string) {

    this.busquedasService.busquedaGlobal( termino)
        .subscribe( (resp: any) => {
          this.obrasSociales = resp.obrasSociales;
          this.prestaciones = resp.prestaciones;
          this.pacientes = resp.pacientes;
        })
  }

  abrirPaciente( paciente: Paciente) {

    this.router.navigate(['dashboard/pacientes', paciente._id]);

  }

}
