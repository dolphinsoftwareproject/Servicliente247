package com.Backend.Servicliente247.Controladores;

import java.util.ArrayList;
import java.util.Optional;

import com.Backend.Servicliente247.Modelos.UsuarioModelo;
import com.Backend.Servicliente247.Servicios.UsuarioServicio;

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
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
@RequestMapping("/usuario")
public class UsuarioControlador {

    @Autowired
    UsuarioServicio usuarioServicio;

    @PostMapping()
    public UsuarioModelo guardarUsuario(@RequestBody UsuarioModelo pqrs) {
        return usuarioServicio.guardarUsuario(pqrs);
    }

    @GetMapping()
    public ArrayList<UsuarioModelo> consultarUsuario() {
        return usuarioServicio.consultarUsuario();
    }

    @DeleteMapping(path = "/{id}")
    public boolean eliminarPqrsPorId(@PathVariable("id") int id) {
        return usuarioServicio.eliminaUsuario(id);
    }

    @GetMapping(path = "/{id}")
    public Optional<UsuarioModelo> consultarUsuarioPorId(@PathVariable("id") int id) {
        return usuarioServicio.consultaUsuarioPorId(id);
    }

    
    
}
