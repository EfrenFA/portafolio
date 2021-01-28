import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {


  info: InfoPagina = {};
  cargada = true;
  equipo: any[]=[];

  constructor(private http: HttpClient) {

   this.cargarInfo();
   this.cargarEquipo();

   }

   private cargarInfo(){

    //Leer el archivo json data-pagina.json de carpeta data

  this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {

      //console.log( resp );
      this.cargada = false;
      this.info = resp;
     
      
    });
   }

   private cargarEquipo(){
     this.http.get('https://appefren.firebaseio.com/equipo.json')
     .subscribe( (response: any) => {
 
      this.equipo = response;
      //console.log( response);
      this.cargada = false;


     });

   }
}
