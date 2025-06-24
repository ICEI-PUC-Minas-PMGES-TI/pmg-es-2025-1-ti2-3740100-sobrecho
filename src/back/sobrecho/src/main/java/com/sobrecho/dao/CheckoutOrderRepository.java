
package com.sobrecho.dao;
import com.sobrecho.model.CheckoutOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface CheckoutOrderRepository extends JpaRepository<CheckoutOrder, Long> {
    Optional<CheckoutOrder> findByCheckoutIdentifier(String checkoutIdentifier);

	List<CheckoutOrder> findAllByUserId(Long id);

    @Query("SELECT COALESCE(SUM(c.totalValue), 0) FROM CheckoutOrder c WHERE c.status = :status")
    Double sumTotalValueByStatus(@Param("status") String status);

    Long countByStatus(String status);
}
