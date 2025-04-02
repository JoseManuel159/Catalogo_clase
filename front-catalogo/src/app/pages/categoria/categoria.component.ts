import {Component, OnInit} from '@angular/core';
import {Categoria} from "../../models/categoria";
import {CategoriaService} from "../../services/categoria.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CategoriaFormComponent} from "../categoria-form/categoria-form.component";
import {MaterialModule} from "../../material/material.module";
import {MatButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatFormField, MatInput, MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-categoria',
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
    MatFormFieldModule
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'acciones']; // Columnas de la tabla
  categorias: Categoria[] = []; // Lista de categorías
  searchQuery: number = 0; // Para capturar el id de la categoría a buscar


  constructor(private categoriaService: CategoriaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Llamamos al servicio para obtener las categorías cuando se inicie el componente
    this.categoriaService.categorias$.subscribe(categorias => {
      this.categorias = categorias;  // Actualizamos la lista de categorías
    });

    this.categoriaService.findAll();  // Llamamos al servicio para cargar las categorías
  }

  filtrarPorId(): void {
    if (this.searchQuery) {
      this.categoriaService.obtenerPorId(this.searchQuery).subscribe(categoria => {
        this.categorias = [categoria];  // Solo mostrar la categoría encontrada
      });
    } else {
      this.categoriaService.findAll();  // Si no se ingresa un id, mostrar todas las categorías
    }
  }


  openDialog(categoria: Categoria | null): void {
    const dialogRef = this.dialog.open(CategoriaFormComponent, {
      width: '400px',
      data: { categoria: categoria || { id: 0, nombre: '' } }, // Si se pasa una categoría, se edita; si no, se agrega
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para manejar cuando el formulario se haya enviado correctamente
        console.log('Categoría guardada');
        this.categoriaService.findAll();  // Recargamos las categorías después de guardar
      } else {
        console.log('Diálogo cerrado sin guardar');
      }
    });
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.eliminar(id).subscribe(() => {
        this.categoriaService.findAll();
      });
    }
    this.categoriaService.findAll();

  }


}
