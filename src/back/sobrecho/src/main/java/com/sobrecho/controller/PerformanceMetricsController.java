package com.sobrecho.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sobrecho.service.PerformancemetricsService;


@RestController
@RequestMapping("/metrics")
public class PerformanceMetricsController {
	
	@Autowired
	PerformancemetricsService performancemetricsService;
	
	@GetMapping("/percentage-sellers")
	public ResponseEntity<Double> getPercentageOfSellers() {
	    Double percentage = performancemetricsService.calculatePercentageOfSellers();
	    return ResponseEntity.ok(percentage);
	}

	@GetMapping("/receita-total")
	public ResponseEntity<Double> getReceitaTotal() {
	    Double receitaTotal = performancemetricsService.getReceitaTotal();
	    return ResponseEntity.ok(receitaTotal);
	}

	@GetMapping("/quantidade-produtos-vendidos")
	public ResponseEntity<Long> getQuantidadeProdutosVendidos() {
	    Long quantidade = performancemetricsService.getQuantidadeProdutosVendidos();
	    return ResponseEntity.ok(quantidade);
	}

	@GetMapping("/media-receita-por-produto")
	public ResponseEntity<Double> getMediaReceitaPorProduto() {
	    Double media = performancemetricsService.getMediaReceitaPorProduto();
	    return ResponseEntity.ok(media);
	}

	@GetMapping("/receita-total-usuario-logado")
	public ResponseEntity<Double> getReceitaTotalUsuarioLogado() {
	    Double receita = performancemetricsService.getReceitaTotalUsuarioLogado();
	    return ResponseEntity.ok(receita);
	}
}
