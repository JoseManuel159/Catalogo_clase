export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  precioCompra: number;
  precioVenta: number;
  fechaCreacion: string;
  categoria: {
    id: number;
    nombre: string;
  };
  imagen: string;
}
