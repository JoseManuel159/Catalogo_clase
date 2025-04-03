package com.example.mscatalogo.service.serviceImpl;

import com.example.mscatalogo.entity.Producto;
import com.example.mscatalogo.repository.ProductoRepository;
import com.example.mscatalogo.service.ProductoService;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final String UPLOAD_DIR = "C:/ciclo-5/Desarrollo de Aplicaciones/practicas de java/practicas/imagenes/";


    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public Producto save(Producto producto, MultipartFile imagen) {
        if (!imagen.isEmpty()) {
            try {
                // Redimensionar la imagen antes de guardarla
                String originalFilename = imagen.getOriginalFilename();
                String newFileName = UUID.randomUUID() + "_" + originalFilename;  // Nombre único para evitar colisiones
                Path path = Paths.get(UPLOAD_DIR + newFileName);

                // Redimensionar la imagen a un tamaño más pequeño (ajustar según tus necesidades)
                Thumbnails.of(imagen.getInputStream())
                        .size(500, 500)  // Ajusta el tamaño a 500x500 px (por ejemplo)
                        .toFile(path.toFile());  // Guarda la imagen redimensionada

                producto.setImagen(newFileName);  // Guardamos el nombre del archivo
            } catch (IOException e) {
                throw new RuntimeException("Error al guardar la imagen", e);
            }
        }
        return productoRepository.save(producto);
    }


    @Override
    public Producto update(Integer id, Producto producto) {
        Optional<Producto> existingProducto = productoRepository.findById(id);
        if (existingProducto.isPresent()) {
            Producto prod = existingProducto.get();

            // Solo actualizamos los valores si se han enviado
            if (producto.getCodigo() != null){
                prod.setCodigo(producto.getCodigo());
            }

            if (producto.getNombre() != null) {
                prod.setNombre(producto.getNombre());
            }
            if (producto.getDescripcion() != null) {
                prod.setDescripcion(producto.getDescripcion());
            }
            if (producto.getCategoria() != null) {
                prod.setCategoria(producto.getCategoria());
            }
            if (producto.getPrecioCompra() != null) {
                prod.setPrecioCompra(producto.getPrecioCompra());
            }
            if (producto.getPrecioVenta() != null) {
                prod.setPrecioVenta(producto.getPrecioVenta());
            }
            if (producto.getFechaCreacion() != null) {
                prod.setFechaCreacion(producto.getFechaCreacion());
            }

            // Guardamos la entidad con los valores actualizados
            return productoRepository.save(prod);
        }
        throw new RuntimeException("Producto no encontrado");
    }


    @Override
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    @Override
    public Producto findById(Integer id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Override
    public void delete(Integer id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Producto no encontrado");
        }
    }

    @Override
    public Producto buscarPorCodigo(String codigo) {
        return productoRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RuntimeException("Producto con código " + codigo + " no encontrado"));
    }

    @Override
    public List<Producto> buscarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public List<Producto> buscarPorFechaCreacionRango(LocalDate startDate, LocalDate endDate) {
        return productoRepository.findByFechaCreacionBetween(startDate, endDate);
    }

    public List<Producto> buscarPorCategoria(Integer categoriaId) {
        return productoRepository.findByCategoriaId(categoriaId);
    }



}