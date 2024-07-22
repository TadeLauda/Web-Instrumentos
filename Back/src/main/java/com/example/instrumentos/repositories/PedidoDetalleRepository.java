package com.example.instrumentos.repositories;

import com.example.instrumentos.entities.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle,Long> {
}
