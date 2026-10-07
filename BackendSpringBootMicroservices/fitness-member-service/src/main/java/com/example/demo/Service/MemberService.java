package com.example.demo.Service;

import java.util.List;
import com.example.demo.Entity.Member;

public interface MemberService {
    List<Member> getAllMembers();
    Member addMember(Member member);
    
    void deleteById(Long id);
    Member getMemberById(Long id);
}
