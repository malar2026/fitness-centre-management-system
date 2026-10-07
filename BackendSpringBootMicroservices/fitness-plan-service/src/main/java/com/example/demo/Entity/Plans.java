
package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "plans")
public class Plans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String duration;   // e.g. 1 Month, 3 Months
    private double price;

    public Plans() {}

    public Plans(Long id, String name, String duration, double price) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDuration() {
        return duration;
    }

    public double getPrice() {
        return price;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}

