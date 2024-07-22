package com.example.instrumentos.entities;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categoria extends Base {

    private String denominacion;
}
