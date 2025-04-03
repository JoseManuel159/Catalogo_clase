package com.example.mscatalogo.service;

import com.example.mscatalogo.entity.Producto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface ProductoService {
    Producto save(Producto producto, MultipartFile imagen);
    Producto update(Integer id, Producto producto);
    List<Producto> findAll();
    Producto findById(Integer id);
    void delete(Integer id);
    Producto buscarPorCodigo(String codigo);
    List<Producto> buscarPorNombre(String nombre);
    List<Producto> buscarPorFechaCreacionRango(LocalDate startDate, LocalDate endDate);
    List<Producto> buscarPorCategoria(Integer categoriaId);
}
