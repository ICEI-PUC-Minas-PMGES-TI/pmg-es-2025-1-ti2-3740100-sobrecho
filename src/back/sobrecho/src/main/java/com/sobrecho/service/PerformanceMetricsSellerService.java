package com.sobrecho.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobrecho.dao.CheckoutOrderRepository;
import com.sobrecho.dao.ProductRepository;
import com.sobrecho.security.UserSpringSecurity;
import com.sobrecho.service.UserService;

@Service
public class PerformanceMetricsSellerService {

    @Autowired
    private CheckoutOrderRepository checkoutOrderRepository;

    @Autowired
    private ProductRepository productRepository;

    public Double getTotalRevenue() {
        UserSpringSecurity user = UserService.authenticated();
        if (user == null) {
            return 0.0;
        }
        Long userId = user.getId();
        return checkoutOrderRepository.sumTotalValueByStatusAndUserId("PAID", userId);
    }

    public Long getProductsQuantity() {
        UserSpringSecurity user = UserService.authenticated();
        if (user == null) {
            return 0L;
        }
        Long userId = user.getId();
        return checkoutOrderRepository.countProductsSoldByUserId("PAID", userId);
    }

    public Double getRevenuePerProduct() {
        Double totalRevenue = getTotalRevenue();
        Long productsQuantity = getProductsQuantity();
        if (productsQuantity == null || productsQuantity == 0) {
            return 0.0;
        }
        return totalRevenue / productsQuantity;
    }
}
