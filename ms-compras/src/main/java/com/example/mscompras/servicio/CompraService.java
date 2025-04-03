package com.example.mscompras.servicio;


import com.example.mscompras.entity.Compra;
import com.example.mscompras.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CompraService {

    List<Compra> getCompras();
    Compra getCompra(Integer id);
    Compra saveCompra(Compra compra);
    Compra updateCompra(Compra compra);
    void deleteCompra(Integer id);

}
