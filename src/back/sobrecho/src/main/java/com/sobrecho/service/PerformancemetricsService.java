package com.sobrecho.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sobrecho.dao.ProductRepository;
import com.sobrecho.dao.UserRepository;

@Service
public class PerformancemetricsService {
	
	 @Autowired
	 private UserRepository userRepository;

	  @Autowired
	  private ProductRepository productRepository;

	  public Double calculatePercentageOfSellers() {
	        Long totalUsers = userRepository.count();
	        Long usersWithProducts = userRepository.countUsersWithProducts();
	        if (totalUsers == null || totalUsers == 0) {
	            return 0.0;
	        }
	        return (double) usersWithProducts / totalUsers * 100.0;
	    }
}
