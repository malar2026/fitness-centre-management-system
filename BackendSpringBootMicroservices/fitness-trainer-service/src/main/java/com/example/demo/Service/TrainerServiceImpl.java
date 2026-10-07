package com.example.demo.Service;


import com.example.demo.Entity.Trainer;
import com.example.demo.Repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerServiceImpl implements TrainerService {

    private final TrainerRepository repository;

    public TrainerServiceImpl(TrainerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Trainer addTrainer(Trainer trainer) {
        return repository.save(trainer);
    }

    @Override
    public List<Trainer> getAllTrainers() {
        return repository.findAll();
    }

    @Override
    public Trainer getTrainerById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
    }

    @Override
    public Trainer updateTrainer(Long id, Trainer trainer) {
        Trainer existing = getTrainerById(id);
        existing.setName(trainer.getName());
        existing.setSpecialization(trainer.getSpecialization());
        existing.setPhone(trainer.getPhone());
        existing.setEmail(trainer.getEmail());
        existing.setExperience(trainer.getExperience());
        return repository.save(existing);
    }

    @Override
    public void deleteTrainer(Long id) {
        repository.deleteById(id);
    }
}
