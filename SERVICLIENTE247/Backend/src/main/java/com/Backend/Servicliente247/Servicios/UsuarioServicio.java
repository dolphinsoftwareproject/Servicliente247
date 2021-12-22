package com.Backend.Servicliente247.Servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Backend.Servicliente247.Repositorios.UsuarioRepositorio;

import java.util.ArrayList;
import java.util.Optional;

import com.Backend.Servicliente247.Modelos.UsuarioModelo;

@Service
public class UsuarioServicio {
    @Autowired
    UsuarioRepositorio usuarioRep;

    public UsuarioModelo guardarUsuario(UsuarioModelo usuario){
        return usuarioRep.save(usuario);
    }


    public ArrayList<UsuarioModelo> consultarUsuario() {
        return (ArrayList<UsuarioModelo>) usuarioRep.findAll();
    }

    public Optional<UsuarioModelo> consultaUsuarioPorId(int id) {
        return usuarioRep.findById(id);
    }

    public boolean eliminaUsuario(Integer id) {
        if (usuarioRep.existsById(id)) {
            usuarioRep.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public ArrayList<UsuarioModelo> consultaPqrsxNombre(String nombre) {
        return usuarioRep.findByNombre(nombre);
    }


}
