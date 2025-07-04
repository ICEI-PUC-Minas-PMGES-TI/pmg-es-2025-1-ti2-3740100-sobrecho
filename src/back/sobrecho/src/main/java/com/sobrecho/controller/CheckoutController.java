package com.sobrecho.controller;

import com.sobrecho.dto.checkout.CheckoutRequestDTO;
import com.sobrecho.dto.checkout.CheckoutResponseDTO;
import com.sobrecho.dto.checkout.UpdateCheckoutStatusDTO;
import com.sobrecho.service.CheckoutService;
import com.sobrecho.service.exceptions.ObjectNotFoundException;
import com.sobrecho.service.exceptions.AuthorizationException;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    
    @GetMapping("/getUserCheckouts")
    public ResponseEntity<List<CheckoutResponseDTO>> getUserCheckouts() {
        try {
            List<CheckoutResponseDTO> response = checkoutService.findAllByAuthenticatedUser();
            return ResponseEntity.ok(response);
        } catch (AuthorizationException e) {
            System.err.println("Erro 401/403 ao buscar checkouts: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Erro interno do servidor ao buscar checkouts: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<UpdateCheckoutStatusDTO> updateCheckoutStatus(
            @PathVariable String id,
            @Valid @RequestBody UpdateCheckoutStatusDTO statusDTO) {
        try {
            UpdateCheckoutStatusDTO updatedDTO = checkoutService.updateStatus(id, statusDTO);
            return ResponseEntity.ok(updatedDTO);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Erro interno do servidor ao atualizar status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/findById/{id}")
    public ResponseEntity<CheckoutResponseDTO> findById(@PathVariable String id) {
        try {
            CheckoutResponseDTO response = checkoutService.findByIdentifier(id);
            return ResponseEntity.ok(response);
        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    }
}