package com.sobrecho.controller;

import com.sobrecho.dto.checkout.CheckoutRequestDTO;
import com.sobrecho.dto.checkout.CheckoutResponseDTO;
import com.sobrecho.service.CheckoutService;
import com.sobrecho.service.exceptions.ObjectNotFoundException;
import com.sobrecho.service.exceptions.AuthorizationException;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping
    public ResponseEntity<CheckoutResponseDTO> processCheckout(@Valid @RequestBody CheckoutRequestDTO request) {
        try {
            CheckoutResponseDTO response = checkoutService.processCheckout(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (ObjectNotFoundException e) {
            System.err.println("Erro 404 no checkout: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (AuthorizationException e) {
            System.err.println("Erro 401/403 no checkout: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println("Erro interno do servidor no checkout: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}