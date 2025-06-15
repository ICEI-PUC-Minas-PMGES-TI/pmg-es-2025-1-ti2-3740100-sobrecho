package com.sobrecho.controller;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sobrecho.dao.StoreRepository;
import com.sobrecho.model.Product;
import com.sobrecho.model.Store;
import com.sobrecho.service.StoreService;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/store")
public class StoreController {
	
	@Autowired
	private StoreRepository storeRepositoty;
	
	@Autowired
	private StoreService storeService;
	
    @GetMapping("/")
    public List<Store> listProducts() {
        return storeRepositoty.findAll();
    }
	
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> create(
            @RequestPart("name") @NotBlank String name,
            @RequestPart("description") @NotBlank String description,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            Store store = new Store();
            store.setName(name);
            store.setDescription(description);
            
            Store savedStore = storeService.create(store, image); 

            URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(savedStore.getId())
                    .toUri();

            return ResponseEntity.created(uri).build();
        } catch (IOException e) { 
            return ResponseEntity.status(500).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).build();
        }
    }


}
