import {Component, Inject, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import EventEmitter from "node:events";
import {Categoria} from "../../models/categoria";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {CategoriaService} from "../../services/categoria.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {
  categoria: Categoria = { id: 0, nombre: '' }; // Inicializamos el objeto de categoría

  constructor(
    private categoriaService: CategoriaService,
    public dialogRef: MatDialogRef<CategoriaFormComponent>, // Esto es para controlar el diálogo
    @Inject(MAT_DIALOG_DATA) public data: { categoria: Categoria }
  ) {
    if (data.categoria) {
      this.categoria = data.categoria; // Si hay datos, cargamos la categoría en el formulario
    }
  }

  // Método para guardar la categoría
  guardarCategoria(): void {
    if (this.categoria.id === 0) {
      this.categoriaService.guardar(this.categoria).subscribe(() => {
        this.dialogRef.close(true); // Cerramos el diálogo y pasamos un valor indicando que se guardó
      });
    } else {
      this.categoriaService.actualizar(this.categoria.id, this.categoria).subscribe(() => {
        this.dialogRef.close(true); // Cerramos el diálogo y pasamos un valor indicando que se guardó
      });
    }
  }

  // Método para cerrar el diálogo sin hacer nada
  cancelar(): void {
    this.dialogRef.close(false); // Solo cerramos el diálogo
  }
}
