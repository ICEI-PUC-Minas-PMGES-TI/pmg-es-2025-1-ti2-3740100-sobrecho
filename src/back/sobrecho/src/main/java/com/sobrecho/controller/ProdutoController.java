package com.sobrecho.controller;

import com.sobrecho.dao.ProdutoRepository;
import com.sobrecho.model.Produto;
import com.sobrecho.service.ProdutoService;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

	@Autowired
	ProdutoRepository produtoRepository;
	
    @Autowired
    private ProdutoService produtoService;
    

    @GetMapping("/listar")
	public List<Produto> listar(){
		return produtoRepository.findAll();
	}
    
    @PostMapping("/criar")
    public ResponseEntity<String> criarProduto(
            @ModelAttribute Produto produto,
            @RequestParam(value = "file", required = false) MultipartFile arquivo) {
        
        try {
            produtoService.salvarProdutoComImagem(produto, arquivo);
            return ResponseEntity.ok("Produto cadastrado com sucesso!");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro");
        } 
    }
    
	@DeleteMapping("deletar/{id}")
	public void deletar(@PathVariable Long id) {
		produtoRepository.deleteById(id);
	}
}