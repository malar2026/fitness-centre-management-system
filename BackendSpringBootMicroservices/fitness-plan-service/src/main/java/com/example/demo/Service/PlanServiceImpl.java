package com.example.demo.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.Entity.Plans;
import com.example.demo.Repository.PlansRepository;
import com.example.demo.Service.PlanService;

@Service
public class PlanServiceImpl implements PlanService {

    private final PlansRepository planRepository;

    public PlanServiceImpl(PlansRepository planRepository) {
        this.planRepository = planRepository;
    }

    @Override
    public List<Plans> getAllPlans() {
        return planRepository.findAll();
    }

    @Override
    public Plans getPlanById(Long id) {
        return planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));
    }

    @Override
    public Plans createPlan(Plans plan) {
        return planRepository.save(plan);
    }

    @Override
    public Plans updatePlan(Long id, Plans plan) {
        Plans existingPlan = getPlanById(id);

        existingPlan.setName(plan.getName());
        existingPlan.setDuration(plan.getDuration());
        existingPlan.setPrice(plan.getPrice());

        return planRepository.save(existingPlan);
    }

    @Override
    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

	@Override
	public Plans addPlan(Plans plan) {
		// TODO Auto-generated method stub
	    return planRepository.save(plan);
	}

	
}
