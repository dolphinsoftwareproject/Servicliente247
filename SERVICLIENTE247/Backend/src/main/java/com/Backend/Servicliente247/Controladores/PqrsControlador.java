package com.Backend.Servicliente247.Controladores;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import com.Backend.Servicliente247.Modelos.PqrsModelo;
import com.Backend.Servicliente247.Servicios.PqrsServicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE})
@RequestMapping ("/pqrs")
public class PqrsControlador {
    
    @Autowired
    PqrsServicio pqrsServicio;

    @PostMapping()
    public PqrsModelo guardarPqrs (@RequestBody PqrsModelo pqrs){
        return pqrsServicio.guardaPqrs(pqrs);
    }

    @GetMapping()
    public ArrayList <PqrsModelo> obtenerPqrs(){
        return pqrsServicio.obtenerPqrs();
    }

    @DeleteMapping(path = "/{id}")
    public boolean eliminarPqrsxId(@PathVariable("id") Long id){
        return pqrsServicio.eliminarPqrs(id);

    }

    @GetMapping(path = "/{id}")
    public Optional <PqrsModelo> obtenerPqrsxId(@PathVariable("id") Long id){
        return pqrsServicio.obtenerPqrsxId(id);
    }
    

    @GetMapping(path = "/bTipo/{tipo}")
    public ArrayList <PqrsModelo> obtenerPqrsxTipo(@PathVariable("tipo")String tipo){
        return pqrsServicio.obtenerPqrsxTipo(tipo);
    }

    @GetMapping(path = "/bResponsable/{responsable}")
    public ArrayList <PqrsModelo> obtenerPqrsxResponsable(@PathVariable("responsable")String responsable){
        return pqrsServicio.obtenerPqrsxResponsable(responsable);
    }

    @GetMapping(path = "/bFecha/{fecha}")
    public ArrayList <PqrsModelo> obtenerPqrsxFecha(@PathVariable("fecha")Date fecha){
        return pqrsServicio.obtenerPqrsxFecha(fecha);
    }

    @GetMapping(path = "/bEstado/{estado}")
    public ArrayList <PqrsModelo> obtenerPqrsxEstado(@PathVariable("estado")String estado){
        return pqrsServicio.obtenerPqrsxEstado(estado);
    }

}

