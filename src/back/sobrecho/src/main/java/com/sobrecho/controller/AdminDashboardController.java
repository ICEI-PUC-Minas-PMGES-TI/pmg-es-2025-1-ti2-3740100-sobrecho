package com.sobrecho.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sobrecho.service.PerformanceMetricsAdminService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard/admin")
public class AdminDashboardController {

    @Autowired
    private PerformanceMetricsAdminService adminService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        Double totalRevenue = adminService.getTotalRevenue();
        Double percentageOfSellers = adminService.getPercentageOfSellers();
        Double averageRevenuePerSeller = adminService.getAverageRevenuePerSeller();
        Double averageOrderValue = adminService.getAverageOrderValue();

        dashboard.put("totalRevenue", totalRevenue);
        dashboard.put("percentageOfSellers", percentageOfSellers);
        dashboard.put("averageRevenuePerSeller", averageRevenuePerSeller);
        dashboard.put("averageOrderValue", averageOrderValue);

        return ResponseEntity.ok(dashboard);
    }
}
