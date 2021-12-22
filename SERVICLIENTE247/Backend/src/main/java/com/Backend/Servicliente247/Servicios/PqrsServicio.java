package com.Backend.Servicliente247.Servicios;


import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import com.Backend.Servicliente247.Modelos.PqrsModelo;
import com.Backend.Servicliente247.Repositorios.PqrsRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PqrsServicio {
    //Tiene refencia a los repositorios usados es decir mongoRepository
    @Autowired
    PqrsRepositorio pqrsRepositorio;
    //metodo que guarda los datos y retorna el un objeto de tipo PqrsModelo
    public PqrsModelo  guardaPqrs(PqrsModelo pqrs){
        //metodos de cliente repositorio
        return  pqrsRepositorio.save(pqrs);
    }

    //metodo para obtener todo la lista de objetos
    public ArrayList <PqrsModelo> obtenerPqrs(){
        return (ArrayList<PqrsModelo>) pqrsRepositorio.findAll();
    }

    //metodo que se encarga de eliminar objetos
    public boolean eliminarPqrs (Long id){
        if (pqrsRepositorio.existsById(id)){
            pqrsRepositorio.deleteById(id);
            return true;
        }else {
            return false;
        }
    }

    //metodo consultar pqrs por id
    public Optional <PqrsModelo> obtenerPqrsxId (Long id){
        return pqrsRepositorio.findById(id);
    }

     //metodo consultar pqrs por id
     public ArrayList <PqrsModelo> obtenerPqrsxTipo (String tipo){
        return pqrsRepositorio.findByTipo(tipo);
    }

    public ArrayList <PqrsModelo> obtenerPqrsxResponsable (String responsable){
        return pqrsRepositorio.findByResponsable(responsable);
    }

    public ArrayList <PqrsModelo> obtenerPqrsxFecha (Date fecha){
        return pqrsRepositorio.findByFecha(fecha);
    }

    public ArrayList <PqrsModelo> obtenerPqrsxEstado (String estado){
        return pqrsRepositorio.findByEstado(estado);
    }
}
