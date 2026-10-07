package com.example.demo.Service;


import java.util.List;

import com.example.demo.Entity.Plans;

public interface PlanService {

	List<Plans> getAllPlans();

    Plans getPlanById(Long id);

    Plans createPlan(Plans plan);

    Plans updatePlan(Long id, Plans plan);

	Plans addPlan(Plans plan);

    void deletePlan(Long id);

}
