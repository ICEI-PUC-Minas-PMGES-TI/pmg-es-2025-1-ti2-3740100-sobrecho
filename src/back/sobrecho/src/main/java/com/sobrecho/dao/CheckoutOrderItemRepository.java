package com.sobrecho.dao;

import com.sobrecho.model.CheckoutOrderItem;
import com.sobrecho.model.CheckoutOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutOrderItemRepository extends JpaRepository<CheckoutOrderItem, Long> {
    List<CheckoutOrderItem> findByCheckoutOrder(CheckoutOrder checkoutOrder);
}