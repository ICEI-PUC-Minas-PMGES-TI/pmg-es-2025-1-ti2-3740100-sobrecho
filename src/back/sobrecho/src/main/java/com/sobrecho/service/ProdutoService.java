package com.sobrecho.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sobrecho.dao.ProdutoRepository;
import com.sobrecho.model.Imagem;
import com.sobrecho.model.Produto;

@Service
public class ProdutoService {

    private static String caminhoImagens = "src/main/resources/images";

    @Autowired
    private ProdutoRepository produtoRepository;

    public void salvarProdutoComImagens(Produto produto, MultipartFile[] arquivos) throws IOException {
        if (arquivos != null && arquivos.length > 0) {
            for (MultipartFile arquivo : arquivos) {
                if (!arquivo.isEmpty()) {
                    String nomeArquivo = gerarNomeUnico(arquivo);
                    salvarArquivoNoDisco(arquivo, nomeArquivo);
                    
                    Imagem imagem = new Imagem();
                    imagem.setNomeImagem(nomeArquivo);
                    imagem.setProduto(produto);
                    produto.getImagens().add(imagem);
                }
            }
        }
        produtoRepository.save(produto);
    }

    private String gerarNomeUnico(MultipartFile arquivo) {
        return System.currentTimeMillis() + "_" + arquivo.getOriginalFilename();
    }

    private void salvarArquivoNoDisco(MultipartFile arquivo, String nomeArquivo) throws IOException {
        Path diretorio = Paths.get(caminhoImagens).toAbsolutePath().normalize();
        Files.createDirectories(diretorio);
        Path destino = diretorio.resolve(nomeArquivo);
        Files.copy(arquivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);
    }
    
    public void deletarProduto(Long id) throws IOException {
        Produto produto = produtoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        
        for (Imagem imagem : produto.getImagens()) {
            Path caminhoImagem = Paths.get(caminhoImagens, imagem.getNomeImagem()).toAbsolutePath().normalize();
            Files.deleteIfExists(caminhoImagem);
        }
        
        produtoRepository.deleteById(id);
    }
}