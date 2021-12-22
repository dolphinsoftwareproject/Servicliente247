package com.Backend.Servicliente247.Repositorios;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;

import com.Backend.Servicliente247.Modelos.*;

@Repository
//MongoRepository me va a permitir hacer las acciones CRUD
public interface PqrsRepositorio extends MongoRepository<PqrsModelo,Long>{
    ArrayList<PqrsModelo> findByTipo(String tipo);
    ArrayList<PqrsModelo> findByResponsable(String responsable);
    ArrayList<PqrsModelo> findByFecha(Date fecha);
    ArrayList<PqrsModelo> findByEstado(String estado);
}
