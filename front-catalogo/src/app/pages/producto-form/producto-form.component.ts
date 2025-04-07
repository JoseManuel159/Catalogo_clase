import {Component, Inject, OnInit} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoriaService} from "../../services/categoria.service";
import {Producto} from "../../models/producto";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ProductoService} from "../../services/producto.service";

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    MatDialogActions,
    MatButton,
    NgIf,
    MatInput,
    MatFormFieldModule,  // Añade esto

  ],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements  OnInit{
  productoForm!: FormGroup;
  categorias: any[] = [];  // Lista de categorías disponibles
  imagenSeleccionada?: File; // Archivo de imagen seleccionado


  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private dialogRef: MatDialogRef<ProductoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto }
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      id: [this.data.producto.id],
      codigo: [this.data.producto.codigo, Validators.required],
      nombre: [this.data.producto.nombre, Validators.required],
      descripcion: [this.data.producto.descripcion],
      cantidad: [this.data.producto.cantidad, [Validators.required, Validators.min(1)]],
      precioCompra: [this.data.producto.precioCompra, [Validators.required, Validators.min(0)]],
      precioVenta: [this.data.producto.precioVenta, [Validators.required, Validators.min(0)]],
      categoria: [this.data.producto.categoria?.id, Validators.required],
      imagen: [null] // Almacena el archivo, no solo el nombre
    });

    this.categoriaService.categorias$.subscribe(categorias => {
      this.categorias = categorias;
    });
    this.categoriaService.findAll();
  }


  onSubmit(): void {
    if (this.productoForm.valid) {
      const productoData = this.productoForm.value;
      productoData.categoria = { id: productoData.categoria };

      const formData = new FormData();
      formData.append('producto', new Blob([JSON.stringify(productoData)], { type: 'application/json' }));

      // Agregar la imagen seleccionada, si existe
      if (this.imagenSeleccionada) {
        formData.append('imagen', this.imagenSeleccionada); // Nombre del campo debe coincidir con el del backend
      }

      // Llamada al servicio para guardar el producto
      this.productoService.guardarConImagen(formData).subscribe(
        (response) => {
          // Producto guardado con éxito
          console.log('Producto guardado con éxito:', response);
          // Ahora cierra el diálogo, después de que el guardado se haya completado
          this.dialogRef.close(response);  // Aquí se pasa la respuesta (producto guardado) al cerrar el diálogo
        },
        (error) => {
          console.error('Error al guardar el producto:', error);
        }
      );
    }

    console.log(this.productoForm.value);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.imagenSeleccionada = file; // Guardamos el archivo seleccionado
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
