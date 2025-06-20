package com.sobrecho.service;

import com.sobrecho.dao.ProductRepository;
import com.sobrecho.dao.CheckoutOrderRepository;
import com.sobrecho.dto.checkout.CheckoutItemDTO;
import com.sobrecho.dto.checkout.CheckoutRequestDTO;
import com.sobrecho.dto.checkout.CheckoutResponseDTO;
import com.sobrecho.model.CheckoutOrder;
import com.sobrecho.model.CheckoutOrderItem;
import com.sobrecho.model.Product;
import com.sobrecho.model.User;
import com.sobrecho.security.UserSpringSecurity;
import com.sobrecho.service.exceptions.ObjectNotFoundException;
import com.sobrecho.service.exceptions.AuthorizationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

@Service
public class CheckoutService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CheckoutOrderRepository checkoutOrderRepository;
    
    @Autowired
    private UserService userService;

    @Transactional
    public CheckoutResponseDTO processCheckout(CheckoutRequestDTO checkoutRequest) {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if (Objects.isNull(userSpringSecurity)) {
            throw new AuthorizationException("Acesso negado! Usuário não autenticado.");
        }
        User currentUser = this.userService.findById(userSpringSecurity.getId());

        CheckoutOrder newOrder = new CheckoutOrder();
        newOrder.setUser(currentUser);

        newOrder.setDeliveryCep(checkoutRequest.getAddress().getCep());
        newOrder.setDeliveryStreet(checkoutRequest.getAddress().getStreet());
        newOrder.setDeliveryNumber(checkoutRequest.getAddress().getNumber());
        newOrder.setDeliveryDistrict(checkoutRequest.getAddress().getDistrict());
        newOrder.setDeliveryCity(checkoutRequest.getAddress().getCity());
        newOrder.setDeliveryState(checkoutRequest.getAddress().getState());
        newOrder.setDeliveryComplement(checkoutRequest.getAddress().getComplement());

        double calculatedTotalValue = 0.0;
        for (CheckoutItemDTO itemDTO : checkoutRequest.getItems()) {
            Optional<Product> productOpt = productRepository.findById(itemDTO.getId());
            if (productOpt.isEmpty()) {
                throw new ObjectNotFoundException("Produto com ID " + itemDTO.getId() + " não encontrado.");
            }
            Product product = productOpt.get();

            CheckoutOrderItem orderItem = new CheckoutOrderItem();
            orderItem.setProduct(product);
            orderItem.voidsetProductName(product.getName());
            orderItem.setProductDescription(product.getDescription());
            orderItem.setProductPrice(product.getPrice());
            orderItem.setProductSize(itemDTO.getSize());
            orderItem.setProductCategory(product.getCategory());
            if (product.getImages() != null && !product.getImages().isEmpty()) {
                orderItem.setProductImageUrl(product.getImages().get(0).getUrl());
            }

            newOrder.addOrderItem(orderItem);
            calculatedTotalValue += product.getPrice();
        }
        newOrder.setTotalValue(calculatedTotalValue);

        newOrder.setPaymentMethod(checkoutRequest.getPayment().getMethod());
        newOrder.setInstallments(checkoutRequest.getPayment().getInstallments());

        if ("credit-card".equalsIgnoreCase(checkoutRequest.getPayment().getMethod())) {
            newOrder.setInstallments(checkoutRequest.getPayment().getInstallments());
            newOrder.setCardHolderName(checkoutRequest.getPayment().getCard().getHolder());
            String cardNumber = checkoutRequest.getPayment().getCard().getNumber();
            newOrder.setCardNumberLastDigits(cardNumber.substring(Math.max(0, cardNumber.length() - 4)));
            newOrder.setCpfHolderPayment(checkoutRequest.getPayment().getCard().getCpf());
            
            newOrder.setStatus("PAID"); 

        } else if ("pix".equalsIgnoreCase(checkoutRequest.getPayment().getMethod())) {
            newOrder.setStatus("PENDING"); 
        }

        String checkoutIdentifier = UUID.randomUUID().toString();
        newOrder.setCheckoutIdentifier(checkoutIdentifier);

        CheckoutOrder savedOrder = checkoutOrderRepository.save(newOrder);

        return new CheckoutResponseDTO(
            savedOrder.getCheckoutIdentifier(),
            checkoutRequest,
            savedOrder.getStatus()
        );
    }
}