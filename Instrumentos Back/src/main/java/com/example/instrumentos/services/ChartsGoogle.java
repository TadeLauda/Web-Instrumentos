package com.example.instrumentos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ChartsGoogle {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getDatosChartBar() {
        String sql = "SELECT FORMATDATETIME(p.fecha_pedido, 'yyyy-MM') AS mes_anio, COUNT(p.id) AS cantidad_pedidos " +
                "FROM pedido p " +
                "GROUP BY mes_anio " +
                "ORDER BY mes_anio";

        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> getDatosChartPie() {
        String sql = "SELECT i.instrumento AS instrumento, COUNT(dp.id) AS cantidad " +
                "FROM pedido_detalle dp " +
                "JOIN instrumento i ON dp.instrumento_id = i.id " +
                "GROUP BY i.instrumento " +
                "ORDER BY cantidad DESC";

        return jdbcTemplate.queryForList(sql);
    }
}
