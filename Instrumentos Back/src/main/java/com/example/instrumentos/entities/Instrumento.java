package com.example.instrumentos.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Instrumento extends Base{

    private String instrumento;
    private String marca;
    private boolean eliminado;
    private String modelo;
    private String imagen;
    private double precio;
    private String costoEnvio;
    private int cantidadVendida;
    private String descripcion;


    @ManyToOne
    @JoinColumn(name = "idCategoria")
    private Categoria categoria;

}
