package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Pay;

@Service
public class service {
	
	@Autowired
	repository pr;
	public boolean insert(Pay p) {
		boolean b=false;
		try {
			pr.save(p);
		}
		catch(Exception e) {
			b=true;
		}
		return b;
	}

}

