package com.sobrecho.controller;

import com.sobrecho.dto.UserSignUpDTO;
import com.sobrecho.firebase.FirebaseStorageService;
import com.sobrecho.dto.SellerSignUpDTO;
import com.sobrecho.dto.SignInDTO;
import com.sobrecho.dto.AuthResponseDTO;
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

    @Autowired
    private com.sobrecho.service.AuthService authService;
    
    

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpDTO dto) {
        AuthResponseDTO response = authService.signUpUser(dto);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/sign-up-seller", consumes = {"multipart/form-data"})
    public ResponseEntity<?> signUpSeller(
            @RequestPart("data") String data,
            @RequestPart("image") MultipartFile image) {
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            SellerSignUpDTO dto = mapper.readValue(data, SellerSignUpDTO.class);

            String imageUrl = firebaseStorageService.uploadFile(image);

            AuthResponseDTO response = authService.signUpSeller(dto, imageUrl);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erro ao fazer upload da imagem");
        }
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInDTO dto) {
        AuthResponseDTO response = authService.signIn(dto);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDTO dto) {
        AuthResponseDTO response = authService.refreshToken(dto);
        return ResponseEntity.ok(response);
    }
}