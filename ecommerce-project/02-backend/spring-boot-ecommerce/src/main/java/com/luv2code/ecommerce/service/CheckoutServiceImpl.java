package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {
    private CustomerRepository customerRepository;

    @Autowired //Optional, since there is only one constructor
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();
        order.setOrderTrackingNumber(generateOrderTrackingNumber());
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        purchase.getOrderItems().forEach(item -> order.add(item));

        Customer customer = purchase.getCustomer();
        Customer customerFromDb = customerRepository.findByEmail(customer.getEmail());

        if(customerFromDb != null) {
            customer = customerFromDb;
        }

        customerRepository.save(customer.add(order));

        return new PurchaseResponse(order.getOrderTrackingNumber());
    }

    /**
     * Generates a Universallyy Unique IDentifier (UUID)
     * @return UUID
     */
    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
