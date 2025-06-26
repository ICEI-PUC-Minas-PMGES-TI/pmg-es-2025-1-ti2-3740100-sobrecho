package com.sobrecho.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobrecho.dao.CheckoutOrderRepository;
import com.sobrecho.dao.UserRepository;

@Service
public class PerformanceMetricsAdminService {

    @Autowired
    private CheckoutOrderRepository checkoutOrderRepository;

    @Autowired
    private UserRepository userRepository;

    public Double getTotalRevenue() {
        return checkoutOrderRepository.sumTotalValueByStatus("PAID");
    }

    public Double getPercentageOfSellers() {
        Long totalUsers = userRepository.count();
        Long usersWithProducts = userRepository.countUsersWithProducts();
        if (totalUsers == null || totalUsers == 0) {
            return 0.0;
        }
        return (double) usersWithProducts / totalUsers * 100.0;
    }

    public Double getAverageRevenuePerSeller() {
        Double totalRevenue = getTotalRevenue();
        Long usersWithProducts = userRepository.countUsersWithProducts();
        if (usersWithProducts == null || usersWithProducts == 0) {
            return 0.0;
        }
        return totalRevenue / usersWithProducts;
    }

    public Double getAverageOrderValue() {
        Double totalRevenue = getTotalRevenue();
        Long totalOrders = checkoutOrderRepository.countByStatus("PAID");
        if (totalOrders == null || totalOrders == 0) {
            return 0.0;
        }
        return totalRevenue / totalOrders;
    }
}
