package com.Backend.Servicliente247.Modelos;



import org.springframework.data.annotation.Id;

public class PqrsModelo {
    
    @Id
    private Long id;    
    private String tipo;
    private String fecha;
    private String nombre;
    private String email;   
    private String detalle;
    private String estado;     
    private String responsable;
    private String fecha_respuesta;
    private String respuesta;

    
    public PqrsModelo(Long id, String tipo, String fecha, String nombre, String email, String detalle, String estado,
            String responsable, String fecha_respuesta, String respuesta) {
        this.id = id;
        this.tipo = tipo;
        this.fecha = fecha;
        this.nombre = nombre;
        this.email = email;
        this.detalle = detalle;
        this.estado = estado;
        this.responsable = responsable;
        this.fecha_respuesta = fecha_respuesta;
        this.respuesta = respuesta;
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getFecha() {
        return fecha;
    }
    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getDetalle() {
        return detalle;
    }
    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getResponsable() {
        return responsable;
    }
    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }
    public String getFecha_respuesta() {
        return fecha_respuesta;
    }
    public void setFecha_respuesta(String fecha_respuesta) {
        this.fecha_respuesta = fecha_respuesta;
    }
    public String getRespuesta() {
        return respuesta;
    }
    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }
        
}
