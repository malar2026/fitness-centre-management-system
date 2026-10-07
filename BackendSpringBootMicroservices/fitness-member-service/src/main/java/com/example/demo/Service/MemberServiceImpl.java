package com.example.demo.Service;


import java.util.List;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.Member;
import com.example.demo.Repository.MemberRepository;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository repo;

    public MemberServiceImpl(MemberRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Member> getAllMembers() {
        return repo.findAll();
    }

    @Override
    public Member addMember(Member member) {
        return repo.save(member);
        
    }

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
	}

	@Override
	public Member getMemberById(Long id) {
		// TODO Auto-generated method stub
		return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
	}
}
