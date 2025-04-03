package com.example.mscompras.servicio.servicioImpl;

import com.example.mscompras.entity.Compra;
import com.example.mscompras.repository.CompraRepository;
import com.example.mscompras.servicio.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompraServiceImpl implements CompraService {

    @Autowired
    private CompraRepository repository;

    @Override
    public List<Compra> getCompras() {
        return repository.findAll();
    }

    @Override
    public Compra getCompra(Integer id) {
        Optional<Compra> compra = repository.findById(id.longValue());
        return compra.orElse(null);
    }

    @Override
    public Compra saveCompra(Compra compra) {
        return repository.save(compra);
    }

    @Override
    public Compra updateCompra(Compra compra) {
        return repository.save(compra);
    }

    @Override
    public void deleteCompra(Integer id) {
        repository.deleteById(id.longValue());
    }
}