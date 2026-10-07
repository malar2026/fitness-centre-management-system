package com.example.demo.Service;

import java.util.List;

import com.example.demo.Entity.Payment;

public interface PaymentService {

	List<Payment> getAllPayment();
    Payment createPayment(Payment payment);
}
