package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.entity.Pay;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class controller {
	@Autowired
	service ps;
@PostMapping("approve")
public ModelAndView approve(HttpServletRequest req) {
	ModelAndView mv=null;//to get the value insert the value
	String hashKey=req.getParameter("hashKey");
	String OdexPymtRefNo=req.getParameter("OdexPymtRefNo");
	String TotalPayAmt=req.getParameter("TotalPayAmt");
	String PymtApprovalDate=req.getParameter("PymtApprovalDate");
	String BankRefNo=req.getParameter("BankRefNo");
	String Currency=req.getParameter("Currency");
	

	Pay p= new Pay(hashKey,OdexPymtRefNo,TotalPayAmt,PymtApprovalDate,BankRefNo,Currency);
	
	try {
		ps.insert(p);
		mv=new ModelAndView("success");
	}
	catch(Exception e){
		mv=new ModelAndView("error");
	}
	return mv;
	
}


}