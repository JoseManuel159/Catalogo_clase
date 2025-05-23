package com.example.mscatalogo.repository;

import com.example.mscatalogo.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    Optional<Producto> findByCodigo(String codigo);
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    List<Producto> findByFechaCreacionBetween(LocalDate startDate, LocalDate endDate);
    List<Producto> findByCategoriaId(Integer categoriaId);


}
