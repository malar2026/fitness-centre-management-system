package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Payment;
import com.example.demo.Enum.TransactionStatus;
import com.example.demo.Feign.MemberClient;
import com.example.demo.FitnessPaymentServiceApplication;
import com.example.demo.DTO.MemberDTO;
import com.example.demo.Repository.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final FitnessPaymentServiceApplication fitnessPaymentServiceApplication;

	@Autowired
    private final PaymentRepository repository;
	
	@Autowired
    private MemberClient memberClient;

    public PaymentServiceImpl(PaymentRepository repository, FitnessPaymentServiceApplication fitnessPaymentServiceApplication) {
        this.repository = repository;
        this.fitnessPaymentServiceApplication = fitnessPaymentServiceApplication;
    }

// 	@Override
//	public List<Payment> getAllPayment() {
//		return repository.findAll();
//	}
 	
 	@Override
 	public List<Payment> getAllPayment() {

 	    List<Payment> payments = repository.findAll();

 	    for (Payment payment : payments) {

 	        MemberDTO member = memberClient.getMember(payment.getMemberId());

 	        payment.setName(member.getName());

 	        System.out.println(
 	            "Payment ID = " + payment.getId() +
 	            ", Member Name = " + member.getName()
 	        );
 	    }

 	    return payments;
 	}

	@Override
	public Payment createPayment(Payment payment) {
		 // 🔗 Step 1: Call Member Service
		System.out.println("========== PAYMENT DEBUG ==========");
		System.out.println("Amount      = " + payment.getAmount());
		System.out.println("Member ID   = " + payment.getMemberId());
		System.out.println("PaymentDate = " + payment.getPaymentDate());
		System.out.println("===================================");

		MemberDTO member = memberClient.getMember(payment.getMemberId());
		
		 // ✅ Step 2: Set status
		payment.setTransactionStatus(TransactionStatus.DONE);
		
		payment.setName(member.getName());
		
		System.out.println("Member Name = " + member.getName());
		System.out.println("===================================");
		
		// ✅ Step 3: Save payment
        return repository.save(payment);
	}
}