package com.example.demo.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import com.example.demo.DTO.MemberDTO;

@FeignClient(name = "fitness-member-service")
public interface MemberClient {

    @GetMapping("/api/members/{id}")
    MemberDTO getMember(@PathVariable("id") Long id);
}