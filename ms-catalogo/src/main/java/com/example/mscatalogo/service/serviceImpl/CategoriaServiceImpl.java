package com.example.mscatalogo.service.serviceImpl;

import com.example.mscatalogo.entity.Categoria;
import com.example.mscatalogo.exepciones.ResourceNotFoundException;
import com.example.mscatalogo.repository.CategoriaRepository;
import com.example.mscatalogo.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaServiceImpl implements CategoriaService{
    @Autowired
    private CategoriaRepository categoriaRepository;


    @Override
    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }


    @Override
    public Categoria guardar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }


    @Override
    public Categoria actualizar(Categoria categoria) {
        Categoria categoriaExistente = categoriaRepository.findById(categoria.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));
        if (categoria.getNombre() != null) {
            categoriaExistente.setNombre(categoria.getNombre());
        }
        return categoriaRepository.save(categoriaExistente);
    }



    @Override
    public Optional<Categoria> listarPorId(Integer id) {
        return categoriaRepository.findById(id);
    }


    @Override
    public void eliminarPorId(Integer id) {
        categoriaRepository.deleteById(id);
    }

}
