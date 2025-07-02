package com.example.demo;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class entity {
	public class Pay {

		public Pay(String hashKey, String odexPymtRefNo, String totalPayAmt, String pymtApprovalDate, String bankRefNo,
				String currency) {
			
		}

	}
	@Id
       private String hashKey;
       private String odexPymtRefNo;
       private String totalPayAmt;
       private String pymtApprovaldate;
       private String bankRefNo;
       private String currency;
	public String getHashKey() {
		return hashKey;
	}
	public void setHashKey(String hashKey) {
		this.hashKey = hashKey;
	}
	public String getOdexPymtRefNo() {
		return odexPymtRefNo;
	}
	public void setOdexPymtRefNo(String odexPymtRefNo) {
		this.odexPymtRefNo = odexPymtRefNo;
	}
	public String getTotalPayAmt() {
		return totalPayAmt;
	}
	public void setTotalPayAmt(String totalPayAmt) {
		this.totalPayAmt = totalPayAmt;
	}
	public String getPymtApprovaldate() {
		return pymtApprovaldate;
	}
	public void setPymtApprovaldate(String pymtApprovaldate) {
		this.pymtApprovaldate = pymtApprovaldate;
	}
	public String getBankRefNo() {
		return bankRefNo;
	}
	public void setBankRefNo(String bankRefNo) {
		this.bankRefNo = bankRefNo;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	@Override
	public String toString() {
		return "Pay [hashKey=" + hashKey + ", odexPymtRefNo=" + odexPymtRefNo + ", totalPayAmt=" + totalPayAmt
				+ ", pymtApprovaldate=" + pymtApprovaldate + ", bankRefNo=" + bankRefNo + ", currency=" + currency
				+ "]";
	}
	public entity(String hashKey, String odexPymtRefNo, String totalPayAmt, String pymtApprovaldate, String bankRefNo,
			String currency) {
		super();
		this.hashKey = hashKey;
		this.odexPymtRefNo = odexPymtRefNo;
		this.totalPayAmt = totalPayAmt;
		this.pymtApprovaldate = pymtApprovaldate;
		this.bankRefNo = bankRefNo;
		this.currency = currency;
	}
}
