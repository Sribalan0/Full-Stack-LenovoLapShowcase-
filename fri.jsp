<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
	<body>
	<form action="approve" method="post">
	HashKey<input type="text" name="hashkey"><br><br>
	OdexPymtRefNo:<input type="text" name="OdexPymtRefNo"><br><br>
	TotalPayAmt:<input type="number" name="TotalPayAmt"><br><br>
	PymtApprovalDate:<input type="text" name="PymtApprovalDate"><br><br>
	BankRefNo:<input type="number" name="BankRefNo"><br><br>
	<select name="Currency" id="currency">
	  <option value="usd">USD</option>
	  <option value="Rupee">Rupee</option>
	  <option value="dollar">Dollar</option>
	</select><br><br>
	<input type="submit" value="Done">
</form>
</body>
</html>