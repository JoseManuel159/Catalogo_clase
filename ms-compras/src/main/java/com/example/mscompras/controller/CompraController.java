package com.example.mscompras.controller;

import com.example.mscompras.entity.Compra;
import com.example.mscompras.servicio.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compras")
public class CompraController {

    @Autowired
    private CompraService compraService;

    @GetMapping
    public List<Compra> getAllCompras() {
        return compraService.getCompras();
    }

    @GetMapping("/{id}")
    public Compra getCompraById(@PathVariable Integer id) {
        return compraService.getCompra(id);
    }

    @PostMapping
    public Compra createCompra(@RequestBody Compra compra) {
        return compraService.saveCompra(compra);
    }

    @PutMapping
    public Compra updateCompra(@RequestBody Compra compra) {
        return compraService.updateCompra(compra);
    }

    @DeleteMapping("/{id}")
    public void deleteCompra(@PathVariable Integer id) {
        compraService.deleteCompra(id);
    }
}
