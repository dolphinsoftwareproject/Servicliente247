package com.Backend.Servicliente247.Repositorios;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;

import com.Backend.Servicliente247.Modelos.UsuarioModelo;

import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends MongoRepository<UsuarioModelo,Integer>{

    ArrayList<UsuarioModelo> findByNombre(String nombre);
}
