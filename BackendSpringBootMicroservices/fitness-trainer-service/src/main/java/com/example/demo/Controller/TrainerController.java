package com.example.demo.Controller;

import com.example.demo.Entity.Trainer;
import com.example.demo.Service.TrainerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
//@CrossOrigin("*")
public class TrainerController {

    private final TrainerService service;

    public TrainerController(TrainerService service) {
        this.service = service;
    }

    @PostMapping("/trainers")
    public Trainer addTrainer(@RequestBody Trainer trainer) {
        return service.addTrainer(trainer);
    }

    @GetMapping("/trainers")
    public List<Trainer> getAllTrainers() {
        return service.getAllTrainers();
    }

    @GetMapping("/trainers/{id}")
    public Trainer getTrainerById(@PathVariable Long id) {
        return service.getTrainerById(id);
    }

    @PutMapping("/trainers/{id}")
    public Trainer updateTrainer(@PathVariable Long id,
                                 @RequestBody Trainer trainer) {
        return service.updateTrainer(id, trainer);
    }

    @DeleteMapping("/trainers/{id}")
    public void deleteTrainer(@PathVariable Long id) {
        service.deleteTrainer(id);
    }
}
