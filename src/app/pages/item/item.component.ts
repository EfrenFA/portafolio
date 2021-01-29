import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { descripcionProducto } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
 
  producto!: descripcionProducto;
  id!: string;
  //producto: descripcionProducto;

  constructor( private route: ActivatedRoute,
               public productoServicio: ProductosService) { }

  ngOnInit(): void {
   

    this.route.params.subscribe( parametros =>{
      //console.log(parametros['id']);
      this.productoServicio.getProducto(parametros['id'])
      .subscribe( ( response: descripcionProducto ) => {
        this.id = parametros['id'];
        this.producto = response;
        //console.log(response);

      });
    });
  }

}
