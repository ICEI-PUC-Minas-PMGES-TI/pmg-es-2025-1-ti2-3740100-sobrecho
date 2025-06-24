package com.sobrecho.dao;

import com.sobrecho.model.CheckoutOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CheckoutOrderRepository extends JpaRepository<CheckoutOrder, Long> {
    Optional<CheckoutOrder> findByCheckoutIdentifier(String checkoutIdentifier);

	List<CheckoutOrder> findAllByUserId(Long id);
}