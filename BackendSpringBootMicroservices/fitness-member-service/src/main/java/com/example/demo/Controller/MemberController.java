package com.example.demo.Controller;


import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Entity.Member;
import com.example.demo.Service.MemberService;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MemberController {

    private final MemberService service;

    public MemberController(MemberService service) {
        this.service = service;
    }

    @GetMapping("/members")
    public List<Member> getMembers() {
        return service.getAllMembers();
    }
    
    @GetMapping("/members/{id}")
    public Member getMember(@PathVariable("id") Long id) {
        return service.getMemberById(id);
    }

    @PostMapping("/members")
    public Member addMember(@RequestBody Member member) {
        return service.addMember(member);
    }
    
    @DeleteMapping("/members/{id}")
    public void deleteMember(@PathVariable Long id) {
        service.deleteById(id);
    }
}
