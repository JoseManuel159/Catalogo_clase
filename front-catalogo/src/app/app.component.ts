import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CategoriaComponent} from "./pages/categoria/categoria.component";
import {ProductoComponent} from "./pages/listar-productos/listar-productos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CategoriaComponent, ProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-catalogo';
}
