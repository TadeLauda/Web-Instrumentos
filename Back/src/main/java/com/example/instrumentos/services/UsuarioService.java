package com.example.instrumentos.services;

import com.example.instrumentos.entities.Usuario;
import com.example.instrumentos.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario createUsuario(Usuario usuario) {
        try {
            usuario.setClave(usuario.encriptarClave(usuario.getClave()));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> getUsuario(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario updateUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> login(String nombreUsuario, String clave) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario)
                .filter(usuario -> {
                    try {
                        return usuario.getClave().equals(usuario.encriptarClave(clave));
                    } catch (NoSuchAlgorithmException e) {
                        e.printStackTrace();
                        return false;
                    }
                });
    }
}
