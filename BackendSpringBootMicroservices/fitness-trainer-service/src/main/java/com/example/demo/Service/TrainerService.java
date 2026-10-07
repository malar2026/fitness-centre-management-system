package com.example.demo.Service;

import com.example.demo.Entity.Trainer;
import java.util.List;

public interface TrainerService {

    Trainer addTrainer(Trainer trainer);
    
    List<Trainer> getAllTrainers();
    
    Trainer getTrainerById(Long id);
    
    Trainer updateTrainer(Long id, Trainer trainer);
    
    void deleteTrainer(Long id);
}
