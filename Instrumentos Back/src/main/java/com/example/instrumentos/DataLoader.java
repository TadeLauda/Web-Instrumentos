package com.example.instrumentos;

import com.example.instrumentos.ENUMS.Rol;
import com.example.instrumentos.entities.*;
import com.example.instrumentos.repositories.*;
import com.example.instrumentos.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public void run(String... args) throws Exception {
        // Crear categorías
        Categoria cuerda = new Categoria();
        cuerda.setDenominacion("Cuerda");
        Categoria viento = new Categoria();
        viento.setDenominacion("Viento");
        Categoria percusion = new Categoria();
        percusion.setDenominacion("Percusión");
        Categoria teclado = new Categoria();
        teclado.setDenominacion("Teclado");
        Categoria electronico = new Categoria();
        electronico.setDenominacion("Electrico");

        categoriaRepository.saveAll(Arrays.asList(cuerda, viento, percusion, teclado, electronico));

        // Crear instrumentos
        Instrumento guitarra = Instrumento.builder()
                .instrumento("Guitarra")
                .marca("Fender")
                .modelo("Stratocaster")
                .precio(1200)
                .costoEnvio("Gratis")
                .cantidadVendida(200)
                .descripcion("Guitarra eléctrica Fender")
                .categoria(cuerda)
                .imagen("https://acdn.mitiendanube.com/stores/969/083/products/fender-aerodyne-special-sss-stratocaster-guitar-bright-white-5-2c9ecc7a9bb7a3bf2c17151007383716-1024-1024.png")
                .eliminado(false)
                .build();

        Instrumento guitarraAcustica = Instrumento.builder()
                .instrumento("Guitarra Acustica")
                .marca("Epiphone")
                .modelo("Cardelmen")
                .precio(2400)
                .costoEnvio("Gratis")
                .cantidadVendida(350)
                .descripcion("Guitarra Acustica Epiphone")
                .categoria(cuerda)
                .imagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VK6_TXcTzIUmdx42nCsC1MT3ZCgKob84EA&s")
                .eliminado(false)
                .build();

        Instrumento piano = Instrumento.builder()
                .instrumento("Piano")
                .marca("Parquer")
                .modelo("KOL123")
                .precio(1700)
                .costoEnvio("Gratis")
                .cantidadVendida(219)
                .descripcion("Piano con teclas sensitivas")
                .categoria(teclado)
                .imagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZjgiExJnEdCZY-wLA4lZexStzAr6knAu8Og&s")
                .eliminado(false)
                .build();

        Instrumento violin = Instrumento.builder()
                .instrumento("Violín")
                .marca("Stradivarius")
                .modelo("1716 Messiah")
                .precio(15000)
                .costoEnvio("Gratis")
                .cantidadVendida(50)
                .descripcion("Violín Stradivarius 1716 Messiah")
                .categoria(cuerda)
                .imagen("https://rvb-img.reverb.com/image/upload/s--11b5GgWX--/f_auto,t_large/v1628955089/dtp595dcgi81cf7hnwkd.jpg")
                .eliminado(false)
                .build();

        Instrumento flauta = Instrumento.builder()
                .instrumento("Flauta Travesera")
                .marca("Yamaha")
                .modelo("YFL-222")
                .precio(400)
                .costoEnvio("Gratis")
                .cantidadVendida(300)
                .descripcion("Flauta Travesera Yamaha YFL-222")
                .categoria(viento)
                .imagen("https://m.media-amazon.com/images/I/81fT0QqyCGL.jpg")
                .eliminado(false)
                .build();

        Instrumento saxofon = Instrumento.builder()
                .instrumento("Saxofón")
                .marca("Selmer")
                .modelo("Mark VI")
                .precio(6000)
                .costoEnvio("Gratis")
                .cantidadVendida(80)
                .descripcion("Saxofón Selmer Mark VI")
                .categoria(viento)
                .imagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmj_7vxxnaWFGG4_OZd6KyAAarj8xLquhcqw&s")
                .eliminado(false)
                .build();

        Instrumento bateria = Instrumento.builder()
                .instrumento("Batería")
                .marca("Pearl")
                .modelo("Export EXX725S/C")
                .precio(1200)
                .costoEnvio("Gratis")
                .cantidadVendida(100)
                .descripcion("Batería Pearl Export EXX725S/C")
                .categoria(percusion)
                .imagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJOI2xFWWLRDMJRUz40LpWUUQu8bjUm_3NpNOt9-Pv2xKAKd-cVQoysgIrvf2E4SLKtEA&usqp=CAU")
                .eliminado(false)
                .build();

        Instrumento tambor = Instrumento.builder()
                .instrumento("Tambor")
                .marca("Remo")
                .modelo("Ambassador Coated")
                .precio(80)
                .costoEnvio("Gratis")
                .cantidadVendida(200)
                .descripcion("Tambor Remo Ambassador Coated")
                .categoria(percusion)
                .imagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVOt1uOy2_fpdC062QeAupet7gGzfLtEtPrA&s")
                .eliminado(false)
                .build();

        Instrumento pianoElectrico = Instrumento.builder()
                .instrumento("Piano Eléctrico")
                .marca("Roland")
                .modelo("RD-2000")
                .precio(2500)
                .costoEnvio("Gratis")
                .cantidadVendida(80)
                .descripcion("Piano Eléctrico Roland RD-2000")
                .categoria(teclado)
                .imagen("https://i.ytimg.com/vi/5fmF0R2gcoE/maxresdefault.jpg")
                .eliminado(false)
                .build();

        Instrumento sintetizador = Instrumento.builder()
                .instrumento("Sintetizador")
                .marca("Korg")
                .modelo("Minilogue XD")
                .precio(700)
                .costoEnvio("Gratis")
                .cantidadVendida(150)
                .descripcion("Sintetizador Korg Minilogue XD")
                .categoria(electronico)
                .imagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLuAKanws1U_Mjs8oxal-You56nxhe4HGyTA&s")
                .eliminado(false)
                .build();

        instrumentoRepository.saveAll(Arrays.asList(guitarra, guitarraAcustica, piano, violin, flauta, saxofon, bateria, tambor, pianoElectrico, sintetizador));

        Pedido pedido1 = Pedido.builder()
                .fechaPedido(LocalDate.now())
                .build();

        Pedido pedido2 = Pedido.builder()
                .fechaPedido(LocalDate.now())
                .build();

        Pedido pedido3 = Pedido.builder()
                .fechaPedido(LocalDate.now())
                .build();

        Pedido pedido4 = Pedido.builder()
                .fechaPedido(LocalDate.now())
                .build();

        Pedido pedido5 = Pedido.builder()
                .fechaPedido(LocalDate.now())
                .build();

        // Crear detalles de pedidos
        PedidoDetalle detalle1 = PedidoDetalle.builder()
                .pedido(pedido1)
                .instrumento(guitarra)
                .cantidad(1)
                .subtotal(guitarra.getPrecio() * 1)
                .build();

        PedidoDetalle detalle2 = PedidoDetalle.builder()
                .pedido(pedido1)
                .instrumento(violin)
                .cantidad(2)
                .subtotal(violin.getPrecio() * 2)
                .build();

        PedidoDetalle detalle3 = PedidoDetalle.builder()
                .pedido(pedido2)
                .instrumento(piano)
                .cantidad(1)
                .subtotal(piano.getPrecio() * 1)
                .build();

        PedidoDetalle detalle4 = PedidoDetalle.builder()
                .pedido(pedido2)
                .instrumento(flauta)
                .cantidad(3)
                .subtotal(flauta.getPrecio() * 3)
                .build();

        PedidoDetalle detalle5 = PedidoDetalle.builder()
                .pedido(pedido3)
                .instrumento(saxofon)
                .cantidad(1)
                .subtotal(saxofon.getPrecio() * 1)
                .build();

        PedidoDetalle detalle6 = PedidoDetalle.builder()
                .pedido(pedido4)
                .instrumento(bateria)
                .cantidad(2)
                .subtotal(bateria.getPrecio() * 2)
                .build();

        PedidoDetalle detalle7 = PedidoDetalle.builder()
                .pedido(pedido5)
                .instrumento(pianoElectrico)
                .cantidad(1)
                .subtotal(pianoElectrico.getPrecio() * 1)
                .build();

        PedidoDetalle detalle8 = PedidoDetalle.builder()
                .pedido(pedido5)
                .instrumento(sintetizador)
                .cantidad(2)
                .subtotal(sintetizador.getPrecio() * 2)
                .build();

        PedidoDetalle detalle9 = PedidoDetalle.builder()
                .pedido(pedido1)
                .instrumento(bateria)
                .cantidad(1)
                .subtotal(bateria.getPrecio() * 1)
                .build();

        PedidoDetalle detalle10 = PedidoDetalle.builder()
                .pedido(pedido2)
                .instrumento(sintetizador)
                .cantidad(2)
                .subtotal(sintetizador.getPrecio() * 2)
                .build();

        PedidoDetalle detalle11 = PedidoDetalle.builder()
                .pedido(pedido3)
                .instrumento(guitarraAcustica)
                .cantidad(1)
                .subtotal(guitarraAcustica.getPrecio() * 1)
                .build();

        PedidoDetalle detalle12 = PedidoDetalle.builder()
                .pedido(pedido4)
                .instrumento(tambor)
                .cantidad(3)
                .subtotal(tambor.getPrecio() * 3)
                .build();

        PedidoDetalle detalle13 = PedidoDetalle.builder()
                .pedido(pedido5)
                .instrumento(violin)
                .cantidad(1)
                .subtotal(violin.getPrecio() * 1)
                .build();

        // Asociar detalles con pedidos
        pedido1.setDetalles(Arrays.asList(detalle1, detalle2, detalle9));
        pedido2.setDetalles(Arrays.asList(detalle3, detalle4, detalle10));
        pedido3.setDetalles(Arrays.asList(detalle5, detalle11));
        pedido4.setDetalles(Arrays.asList(detalle6, detalle12));
        pedido5.setDetalles(Arrays.asList(detalle7, detalle8, detalle13));

        // Guardar pedidos (esto guardará automáticamente los detalles por la cascada)
        pedidoRepository.saveAll(Arrays.asList(pedido1, pedido2, pedido3, pedido4, pedido5));

        // Actualizar total de pedidos
        pedido1.setTotalPedido(pedido1.getDetalles().stream().mapToDouble(PedidoDetalle::getSubtotal).sum());
        pedido2.setTotalPedido(pedido2.getDetalles().stream().mapToDouble(PedidoDetalle::getSubtotal).sum());
        pedido3.setTotalPedido(pedido3.getDetalles().stream().mapToDouble(PedidoDetalle::getSubtotal).sum());
        pedido4.setTotalPedido(pedido4.getDetalles().stream().mapToDouble(PedidoDetalle::getSubtotal).sum());
        pedido5.setTotalPedido(pedido5.getDetalles().stream().mapToDouble(PedidoDetalle::getSubtotal).sum());

        pedidoRepository.saveAll(Arrays.asList(pedido1, pedido2, pedido3, pedido4, pedido5));

        // Crear usuarios
        Usuario admin = new Usuario();
        admin.setNombreUsuario("admin");
        admin.setClave("admin");
        admin.setRol(Rol.ADMIN);

        Usuario user = new Usuario();
        user.setNombreUsuario("user");
        user.setClave("user");
        user.setRol(Rol.USER);

        // Guardar usuarios
        usuarioService.createUsuario(admin);
        usuarioService.createUsuario(user);
    }
}
