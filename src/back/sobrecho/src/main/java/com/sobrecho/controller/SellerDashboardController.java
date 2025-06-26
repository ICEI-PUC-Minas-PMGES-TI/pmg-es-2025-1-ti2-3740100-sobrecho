package com.sobrecho.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sobrecho.service.PerformanceMetricsSellerService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard/seller")
public class SellerDashboardController {

    @Autowired
    private PerformanceMetricsSellerService sellerService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getSellerDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        Double totalRevenue = sellerService.getTotalRevenue();
        Long productsQuantity = sellerService.getProductsQuantity();
        Double revenuePerProduct = sellerService.getRevenuePerProduct();

        dashboard.put("totalRevenue", totalRevenue);
        dashboard.put("productsQuantity", productsQuantity);
        dashboard.put("revenuePerProduct", revenuePerProduct);

        return ResponseEntity.ok(dashboard);
    }
}
