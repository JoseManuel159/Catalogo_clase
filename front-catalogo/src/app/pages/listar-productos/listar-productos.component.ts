import {Component, OnInit} from '@angular/core';
import {Producto} from "../../models/producto";
import {ProductoService} from "../../services/producto.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MaterialModule} from "../../material/material.module";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ProductoFormComponent} from "../producto-form/producto-form.component";
import {MatDialog} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {CategoriaFormComponent} from "../categoria-form/categoria-form.component";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CategoriaFormComponent,
    MaterialModule,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatFormField,
    MatInputModule,
    MatFormFieldModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ProductoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'precioVenta', 'acciones'];  // Columnas de la tabla
  productos: Producto[] = [];  // Lista de productos
  searchCodigo: string = ''; // Variable para almacenar el código a buscar
  searchNombre: string = ''; // Variable para buscar por nombre
  meses = [
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' }
  ];
  mesSeleccionado: number = 0;
  anioSeleccionado: number = new Date().getFullYear(); // Año actual por defecto

  constructor(private productoService: ProductoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Llamamos al servicio para obtener los productos cuando se inicie el componente
    this.productoService.productos$.subscribe((productos) => {
      this.productos = productos;  // Actualizamos la lista de productos
    });

    this.productoService.findAll();  // Llamamos al servicio para cargar los productos
  }

  openDialog(producto: Producto | null): void {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '400px',
      data: { producto: producto || { id: 0, nombre: '', descripcion: '', precioVenta: 0 } }, // Si se pasa un producto, se edita; si no, se agrega
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Producto guardado');
        this.productoService.findAll();  // Recargamos los productos después de guardar
      } else {
        console.log('Diálogo cerrado sin guardar');
      }
    });
  }

  buscarProductoPorCodigo(): void {
    if (this.searchCodigo.trim()) {
      this.productoService.buscarPorCodigo(this.searchCodigo).subscribe(producto => {
        this.productos = producto ? [producto] : [];
      });
    } else {
      this.productoService.findAll();  // Recargamos los productos después de guardar
    }
  }

  buscarProductoPorNombre(): void {
    if (this.searchNombre.trim()) {
      this.productoService.buscarPorNombre(this.searchNombre).subscribe(productos => {
        this.productos = productos;
      });
    } else {
      this.productoService.findAll();  // Recargamos los productos después de guardar
    }
  }

  buscarPorMes(): void {
    if (this.mesSeleccionado > 0) {
      this.productoService.buscarPorMes(this.mesSeleccionado, this.anioSeleccionado).subscribe(productos => {
        this.productos = productos;
      });
    } else {
      this.productoService.findAll();  // Recargamos los productos después de guardar
    }
  }


  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe(() => {
        this.productoService.findAll();  // Recargamos los productos después de eliminar
      });
    }
  }
}
