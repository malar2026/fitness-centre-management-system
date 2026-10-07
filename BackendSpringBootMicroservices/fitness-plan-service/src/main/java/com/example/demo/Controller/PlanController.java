package com.example.demo.Controller;


import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Plans;
import com.example.demo.Service.PlanService;

@RestController
@RequestMapping("/api")
//@CrossOrigin("*")
public class PlanController {

    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping("/plans")
    public List<Plans> getPlans() {
        return planService.getAllPlans();
    }

    @PostMapping("/plans")
    public Plans addPlan(@RequestBody Plans plan) {
    	System.out.println("Adding plan");
    	System.out.println(plan.getName());
        return planService.addPlan(plan);
    }

    @GetMapping("/plans/{id}")
    public Plans getPlan(@PathVariable Long id) {
        return planService.getPlanById(id);
    }

    @DeleteMapping("/plans/{id}")
    public void deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
    }
}