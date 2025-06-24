package com.sobrecho.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobrecho.dao.ProductRepository;
import com.sobrecho.dao.UserRepository;
import com.sobrecho.dao.CheckoutOrderRepository;
import com.sobrecho.security.UserSpringSecurity;
import com.sobrecho.service.UserService;

@Service
public class PerformancemetricsService {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CheckoutOrderRepository checkoutOrderRepository;

	public Double calculatePercentageOfSellers() {
	    Long totalUsers = userRepository.count();
	    Long usersWithProducts = userRepository.countUsersWithProducts();
	    if (totalUsers == null || totalUsers == 0) {
	        return 0.0;
	    }
	    return (double) usersWithProducts / totalUsers * 100.0;
	}

	public Double getReceitaTotal() {
	    return checkoutOrderRepository.sumTotalValueByStatus("PAID");
	}

	public Long getQuantidadeProdutosVendidos() {
	    return checkoutOrderRepository.countByStatus("PAID");
	}

	public Double getMediaReceitaPorProduto() {
	    Double receitaTotal = getReceitaTotal();
	    Long quantidadeProdutos = getQuantidadeProdutosVendidos();
	    if (quantidadeProdutos == null || quantidadeProdutos == 0) {
	        return 0.0;
	    }
	    return receitaTotal / quantidadeProdutos;
	}

	public Double getReceitaTotalUsuarioLogado() {
	    UserSpringSecurity userSpringSecurity = UserService.authenticated();
	    if (userSpringSecurity == null) {
	        return 0.0;
	    }
	    Long userId = userSpringSecurity.getId();
	    return checkoutOrderRepository.sumTotalValueByStatusAndUserId("PAID", userId);
	}
}
