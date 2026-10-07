package com.example.demo.DTO;

public class MemberDTO {

    private Long id;
    private String name;

    // Default constructor
    public MemberDTO() {
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}