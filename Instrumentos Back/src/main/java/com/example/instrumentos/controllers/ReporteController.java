package com.example.instrumentos.controllers;

import com.example.instrumentos.entities.Instrumento;
import com.example.instrumentos.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("")
public class ReporteController {

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @GetMapping("/generarReporteExcel")
    public ResponseEntity<byte[]> generarReporteExcel() {
        try {
            // Obtener todos los instrumentos de la base de datos
            List<Instrumento> instrumentos = instrumentoRepository.findAll();

            // Generar el reporte de Excel con los datos obtenidos
            byte[] excelBytes = ExcelManager.generarReporteExcel(instrumentos);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "ReporteInstrumentos.xlsx");

            return ResponseEntity.ok().headers(headers).body(excelBytes);

        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
