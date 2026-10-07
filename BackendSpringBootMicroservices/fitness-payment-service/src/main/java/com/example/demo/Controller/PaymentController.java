package com.example.demo.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Payment;
import com.example.demo.Service.PaymentServiceImpl;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PaymentController {

    private final PaymentServiceImpl service;

    public PaymentController(PaymentServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/payments")
    public Payment add(@RequestBody Payment payment) {
    	System.out.println(payment.getTransactionStatus());
        return service.createPayment(payment);
    }

    @GetMapping("/payments")
    public List<Payment> all() {
        return service.getAllPayment();
    }
}
