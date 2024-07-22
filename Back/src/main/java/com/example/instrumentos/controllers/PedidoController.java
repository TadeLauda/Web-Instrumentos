package com.example.instrumentos.controllers;

import com.example.instrumentos.entities.Pedido;
import com.example.instrumentos.entities.PedidoDetalle;
import com.example.instrumentos.repositories.PedidoRepository;
import com.example.instrumentos.repositories.PedidoDetalleRepository;
import com.example.instrumentos.services.ChartsGoogle;
import com.example.instrumentos.services.InstrumentoPDF;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @Autowired
    private ChartsGoogle chartGoogle;

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createPedido(@RequestBody Pedido pedido) {
        try {
            Pedido savedPedido = pedidoRepository.save(pedido);
            return ResponseEntity.ok(savedPedido);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating pedido: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> updatePedido(@PathVariable Long id, @RequestBody Pedido pedidoDetails) {
        return pedidoRepository.findById(id)
                .map(pedido -> {
                    pedido.setFechaPedido(pedidoDetails.getFechaPedido());
                    return ResponseEntity.ok(pedidoRepository.save(pedido));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePedido(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(pedido -> {
                    pedidoRepository.delete(pedido);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/downloadPdf/{idInstrumento}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable String idInstrumento) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            InstrumentoPDF mPrintInstrumento = new InstrumentoPDF();
            // Crear un nuevo documento
            mPrintInstrumento.imprimirInstrumentoPdf(Long.parseLong(idInstrumento), outputStream);

            // Establecer las cabeceras de la respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));
            headers.setContentDispositionFormData("attachment", "documento.pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            // Devolver el archivo PDF como parte de la respuesta HTTP
            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/exportarExcel")
    public ResponseEntity<byte[]> exportarPedidosExcel(
            @RequestParam("fechaInicio") String fechaInicio,
            @RequestParam("fechaFin") String fechaFin) {

        try {
            // Convertir las fechas de String a LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateInicio = LocalDate.parse(fechaInicio, formatter);
            LocalDate dateFin = LocalDate.parse(fechaFin, formatter);

            System.out.println("Fechas convertidas correctamente");

            // Consultar los pedidos en el rango de fechas especificado
            List<Pedido> pedidos = pedidoRepository.findByFechaPedidoBetween(dateInicio, dateFin);
            System.out.println("Pedidos obtenidos correctamente: " + pedidos.size());

            // Crear el workbook (libro de Excel)
            try (Workbook workbook = new XSSFWorkbook()) {
                Sheet sheet = workbook.createSheet("Pedidos");

                // Header
                Row header = sheet.createRow(0);
                header.createCell(0).setCellValue("Fecha Pedido");
                header.createCell(1).setCellValue("Instrumento");
                header.createCell(2).setCellValue("Marca");
                header.createCell(3).setCellValue("Modelo");
                header.createCell(4).setCellValue("Cantidad");
                header.createCell(5).setCellValue("Subtotal");
                header.createCell(6).setCellValue("Total");

                // Data rows
                int rowIndex = 1;
                for (Pedido pedido : pedidos) {
                    for (PedidoDetalle detalle : pedido.getDetalles()) {
                        Row row = sheet.createRow(rowIndex++);
                        row.createCell(0).setCellValue(pedido.getFechaPedido().toString());
                        row.createCell(1).setCellValue(detalle.getInstrumento().getInstrumento());
                        row.createCell(2).setCellValue(detalle.getInstrumento().getMarca());
                        row.createCell(3).setCellValue(detalle.getInstrumento().getModelo());
                        row.createCell(4).setCellValue(detalle.getCantidad());
                        row.createCell(5).setCellValue(detalle.getInstrumento().getPrecio());
                        row.createCell(6).setCellValue(detalle.getSubtotal());
                    }
                }

                // Convertir a bytes para enviar como respuesta
                byte[] bytes = workbookToBytes(workbook);
                System.out.println("Workbook convertido a bytes correctamente");

                // Preparar respuesta para descargar
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
                headers.setContentDispositionFormData("attachment", "ReportePedidos.xlsx");
                headers.setContentLength(bytes.length);

                return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (DateTimeParseException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private byte[] workbookToBytes(Workbook workbook) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        return bos.toByteArray();
    }
    @GetMapping("/barchart")
    public List<List<Object>> getBarChartData() {
        List<List<Object>> data = new ArrayList<>();
        data.add(Arrays.asList("Mes/Año", "Cantidad de Pedidos"));

        List<Map<String, Object>> datos = chartGoogle.getDatosChartBar();
        for (Map<String, Object> row : datos) {
            data.add(Arrays.asList(row.get("mes_anio"), row.get("cantidad_pedidos")));
        }
        return data;
    }

    @GetMapping("/piechart")
    public List<List<Object>> getPieChartData() {
        List<List<Object>> data = new ArrayList<>();
        data.add(Arrays.asList("Instrumento", "Cantidad de Pedidos"));

        List<Map<String, Object>> datos = chartGoogle.getDatosChartPie();
        for (Map<String, Object> row : datos) {
            data.add(Arrays.asList(row.get("instrumento"), row.get("cantidad")));
        }
        return data;
    }
}
