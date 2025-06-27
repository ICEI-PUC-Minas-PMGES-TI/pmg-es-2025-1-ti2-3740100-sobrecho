
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

    @Query("SELECT COALESCE(SUM(c.totalValue), 0) FROM CheckoutOrder c WHERE c.status = :status AND c.user.id = :userId")
    Double sumTotalValueByStatusAndUserId(@Param("status") String status, @Param("userId") Long userId);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.user.id = :userId")
    Long countProductsByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(i) FROM CheckoutOrder c JOIN c.items i WHERE c.status = :status AND c.user.id = :userId")
    Long countProductsSoldByUserId(@Param("status") String status, @Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(i.productPrice), 0) FROM CheckoutOrder c JOIN c.items i WHERE c.status = :status AND i.product.user.id = :userId")
    Double sumTotalValueByStatusAndUserIdFromItems(@Param("status") String status, @Param("userId") Long userId);

    Long countByStatus(String status);
}
