package com.example.instrumentos.controllers;

import com.example.instrumentos.entities.Instrumento;
import com.example.instrumentos.repositories.CategoriaRepository;
import com.example.instrumentos.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instrumentos")
public class InstrumentoController {
    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Instrumento> getAllInstrumentos() {
        return instrumentoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instrumento> getInstrumentoById(@PathVariable Long id) {
        return instrumentoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categoria/{categoriaId}")
    public List<Instrumento> getInstrumentosByCategoria(@PathVariable Long categoriaId) {
        return instrumentoRepository.findByCategoriaId(categoriaId);
    }

    @PostMapping
    public Instrumento createInstrumento(@RequestBody Instrumento instrumento) {
        return instrumentoRepository.save(instrumento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instrumento> updateInstrumento(@PathVariable Long id, @RequestBody Instrumento instrumentoDetails) {
        return instrumentoRepository.findById(id)
                .map(instrumento -> {
                    instrumento.setInstrumento(instrumentoDetails.getInstrumento());
                    instrumento.setMarca(instrumentoDetails.getMarca());
                    instrumento.setModelo(instrumentoDetails.getModelo());
                    instrumento.setImagen(instrumentoDetails.getImagen());
                    instrumento.setPrecio(instrumentoDetails.getPrecio());
                    instrumento.setCostoEnvio(instrumentoDetails.getCostoEnvio());
                    instrumento.setCantidadVendida(instrumentoDetails.getCantidadVendida());
                    instrumento.setDescripcion(instrumentoDetails.getDescripcion());
                    instrumento.setCategoria(instrumentoDetails.getCategoria());
                    instrumento.setEliminado(instrumentoDetails.isEliminado());
                    return ResponseEntity.ok(instrumentoRepository.save(instrumento));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstrumento(@PathVariable Long id) {
        return instrumentoRepository.findById(id)
                .map(instrumento -> {
                    instrumentoRepository.delete(instrumento);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
