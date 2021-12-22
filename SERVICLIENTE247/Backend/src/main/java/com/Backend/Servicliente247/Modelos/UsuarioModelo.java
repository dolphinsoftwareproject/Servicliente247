package com.Backend.Servicliente247.Modelos;

import org.springframework.data.annotation.Id;

public class UsuarioModelo {
    @Id
    private int id;
    private String nombre;
    private String login;
    private String password;
    private int permiso;

    public UsuarioModelo(int id, String nombre, String login, String password, int permiso) {
        this.id = id;
        this.nombre = nombre;
        this.login = login;
        this.password = password;
        this.permiso = permiso;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getPermiso() {
        return permiso;
    }

    public void setPermiso(int permiso) {
        this.permiso = permiso;
    }

    
    
}



