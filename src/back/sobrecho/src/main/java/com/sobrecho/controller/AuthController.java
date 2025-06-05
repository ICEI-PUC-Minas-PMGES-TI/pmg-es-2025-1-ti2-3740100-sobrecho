package com.sobrecho.controller;

import com.sobrecho.dto.UserSignUpDTO;
import com.sobrecho.dto.SellerSignUpDTO;
import com.sobrecho.dto.SignInDTO;
import com.sobrecho.dto.RefreshTokenDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;



@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private FirebaseStorageService firebaseStorageService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpDTO dto) {
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/sign-up-seller", consumes = {"multipart/form-data"})
    public ResponseEntity<?> signUpSeller(
            @RequestPart("data") SellerSignUpDTO dto,
            @RequestPart("image") MultipartFile image) {
        try {
            // 1. Faz upload da imagem para o Firebase e pega a URL
            String imageUrl = firebaseStorageService.uploadFile(image);

            // 2. Passe a URL para o AuthService (ou serviço responsável)
            // Exemplo:
            AuthResponseDTO response = authService.signUpSeller(dto, imageUrl);

            // 3. Retorne a resposta para o front
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erro ao fazer upload da imagem");
        }
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInDTO dto) {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDTO dto) {
        return ResponseEntity.ok().build();
    }
}