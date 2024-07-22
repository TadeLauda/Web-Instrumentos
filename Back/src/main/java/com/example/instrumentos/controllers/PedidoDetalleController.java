package com.example.instrumentos.controllers;

import com.example.instrumentos.entities.Instrumento;
import com.example.instrumentos.entities.Pedido;
import com.example.instrumentos.entities.PedidoDetalle;
import com.example.instrumentos.repositories.InstrumentoRepository;
import com.example.instrumentos.repositories.PedidoDetalleRepository;
import com.example.instrumentos.repositories.PedidoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detallePedidos")
public class PedidoDetalleController {

    private final PedidoRepository pedidoRepository;

    private final InstrumentoRepository instrumentoRepository;
    private final PedidoDetalleRepository pedidoDetalleRepository;

    @Autowired
    public PedidoDetalleController(PedidoRepository pedidoRepository, InstrumentoRepository instrumentoRepository, PedidoDetalleRepository pedidoDetalleRepository) {
        this.pedidoRepository = pedidoRepository;
        this.instrumentoRepository = instrumentoRepository;
        this.pedidoDetalleRepository = pedidoDetalleRepository;
    }

    @GetMapping
    public List<PedidoDetalle> getAllPedidosDetalles(){
        return pedidoDetalleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDetalle> getPedidoDetalleById(@PathVariable Long id) {
        return pedidoDetalleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createDetallePedido(@RequestBody PedidoDetalle pedidoDetalle) {
        try {
            // Recuperar el Instrumento desde la base de datos
            Long instrumentoId = pedidoDetalle.getInstrumento().getId();
            Instrumento instrumento = instrumentoRepository.findById(instrumentoId)
                    .orElseThrow(() -> new EntityNotFoundException("Instrumento not found with id: " + instrumentoId));

            // Asignar el Instrumento recuperado al pedidoDetalle
            pedidoDetalle.setInstrumento(instrumento);

            // Recuperar el Pedido desde el pedidoDetalle
            Pedido pedido = pedidoDetalle.getPedido();
            if (pedido != null) {
                Long pedidoId = pedido.getId();
                pedido = pedidoRepository.findById(pedidoId)
                        .orElseThrow(() -> new EntityNotFoundException("Pedido not found with id: " + pedidoId));
                // Establecer la relación Pedido -> PedidoDetalle
                pedidoDetalle.setPedido(pedido);
            } else {
                return ResponseEntity.badRequest().body("Pedido not provided in PedidoDetalle");
            }

            // Guardar el PedidoDetalle
            PedidoDetalle savedDetalle = pedidoDetalleRepository.save(pedidoDetalle);
            return ResponseEntity.ok(savedDetalle);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating pedido detalle: " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<PedidoDetalle> updatePedidoDetalle(@PathVariable Long id, @RequestBody PedidoDetalle pedidoDetalleDetails) {
        return pedidoDetalleRepository.findById(id)
                .map(pedidoDetalle -> {
                    pedidoDetalle.setPedido(pedidoDetalleDetails.getPedido());
                    pedidoDetalle.setCantidad(pedidoDetalleDetails.getCantidad());
                    pedidoDetalle.setInstrumento(pedidoDetalleDetails.getInstrumento());
                    pedidoDetalle.setSubtotal(pedidoDetalleDetails.getSubtotal());
                    return ResponseEntity.ok(pedidoDetalleRepository.save(pedidoDetalle));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedidoDetalle(@PathVariable Long id) {
        return pedidoDetalleRepository.findById(id)
                .map(pedidoDetalle -> {
                    pedidoDetalleRepository.delete(pedidoDetalle);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
