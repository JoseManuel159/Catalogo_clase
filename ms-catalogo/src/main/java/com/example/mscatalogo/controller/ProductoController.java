package com.example.mscatalogo.controller;

import com.example.mscatalogo.entity.Producto;
import com.example.mscatalogo.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }



    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.update(id, producto));
    }

    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarProducto(@PathVariable Integer id) {
        productoService.delete(id);
        return ResponseEntity.ok("Producto eliminado correctamente");
    }

    @GetMapping("/buscar/{codigo}")
    public ResponseEntity<Producto> buscarProductoPorCodigo(@PathVariable String codigo) {
        Producto producto = productoService.buscarPorCodigo(codigo);
        return ResponseEntity.ok(producto);
    }

    @GetMapping("/buscar/nombre/{nombre}")
    public ResponseEntity<List<Producto>> buscarProductoPorNombre(@PathVariable String nombre) {
        List<Producto> productos = productoService.buscarPorNombre(nombre);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/buscar/fecha/rango")
    public ResponseEntity<List<Producto>> buscarProductoPorRangoFecha(
            @RequestParam String startDate, @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        List<Producto> productos = productoService.buscarPorFechaCreacionRango(start, end);
        return ResponseEntity.ok(productos);
    }


    @GetMapping("/buscarPorCategoria/{categoriaId}")
    public ResponseEntity<List<Producto>> buscarPorCategoria(@PathVariable Integer categoriaId) {
        List<Producto> productos = productoService.buscarPorCategoria(categoriaId);
        return ResponseEntity.ok(productos);
    }



}
