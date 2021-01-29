
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { descripcionProducto } from '../interfaces/producto-descripcion.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  cargando = true;
  productos: Producto[]=[];
  productosf: Producto[]=[];
  constructor( private http:HttpClient) { 
    this.cargarProductos();
  }


private cargarProductos(){


  return new Promise( (resolve, reject )  => {
    this.http.get('https://appefren.firebaseio.com/productos_idx.json')
             .subscribe( (response: any )  => {
             //console.log(response);
             this.productos = response;
             this.cargando = false;
             resolve;
  });

  

  });

}

getProducto(id: string){

  return this.http.get<descripcionProducto>(`https://appefren.firebaseio.com/productos/${ id }.json`);

}

buscarProducto( termino: string ){


  if (this.productos.length == 0){
    //Cargar Productos
     this.cargarProductos().then( () => {
        //Cargar Los Productos
        //Aplicar el filtro
        this.filtrarProductos(termino);
     });
  }else{
    //Cargar el Filtro
    this.filtrarProductos(termino);
  }


  this.productosf = this.productos.filter(producto =>{
       return true;
  });

  //console.log(this.productosf);

}

private filtrarProductos(termino: string){

  this.productosf = [];
  termino = termino.toLocaleLowerCase();
  
    this.productos.forEach( prod => {

      const titulolower =  prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || titulolower.indexOf(termino) >= 0){
          this.productosf.push(prod);
      }
    });

}

}
