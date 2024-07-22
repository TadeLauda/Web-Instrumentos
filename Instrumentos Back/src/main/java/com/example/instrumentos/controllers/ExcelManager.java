package com.example.instrumentos.controllers;

import com.example.instrumentos.entities.Instrumento;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelManager {

    public static byte[] generarReporteExcel(List<Instrumento> instrumentos) throws IOException {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Instrumentos");

            // Crear encabezados
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Instrumento");
            headerRow.createCell(1).setCellValue("Marca");
            headerRow.createCell(2).setCellValue("Modelo");
            headerRow.createCell(3).setCellValue("Precio");
            headerRow.createCell(4).setCellValue("Cantidad Vendida");
            headerRow.createCell(5).setCellValue("Descripción");

            // Llenar datos de los instrumentos
            int rowNum = 1;
            for (Instrumento instrumento : instrumentos) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(instrumento.getInstrumento());
                row.createCell(1).setCellValue(instrumento.getMarca());
                row.createCell(2).setCellValue(instrumento.getModelo());
                row.createCell(3).setCellValue(instrumento.getPrecio());
                row.createCell(4).setCellValue(instrumento.getCantidadVendida());
                row.createCell(5).setCellValue(instrumento.getDescripcion());
            }

            // Escribir el workbook en un ByteArrayOutputStream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();

        } catch (IOException e) {
            throw new IOException("Error al generar el reporte Excel", e);
        }
    }
}