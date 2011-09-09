function roundNumber(rnum, rlength)
{ 
  // Arguments: number to round, number of decimal places
  var varNumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
  return varNumber;
}

function changeLayout(algoritm)
{
	switch(parseInt(algoritm))
	{
		case 2:
            document.getElementById("cap1").innerHTML = "Invested capital:";
            document.getElementById("cap2").innerHTML = "<input type=\"text\" id=\"capital\" value=\"\" /> EUR";
			break;
		default:
            document.getElementById("cap1").innerHTML = "";
            document.getElementById("cap2").innerHTML = "";
			break;
	}
}

function calcResults()
{
    /* Retrieve fields */
    var getAlgo = parseInt(document.getElementById("selAlgo").value);
    if(getAlgo == 2)
    {
        if(!document.getElementById("capital"))
            changeLayout(2);
        var getCapital = parseFloat(document.getElementById("capital").value);
    }
    else
    {
        if(document.getElementById("capital"))
            changeLayout(1);
        var getCapital = 0;
    }
    var getShares = parseFloat(document.getElementById("shares").value);
    var getPrice = parseFloat(document.getElementById("price").value);
    var getCommission = parseFloat(document.getElementById("commission").value);
    var getTax = parseFloat(document.getElementById("tax").value);
    /* Declare vars */
    var varNettoReturn, varLoose, varReturn, varLooseTaxComm;
    /* Main */
    // Netto return = without paying tax and commission 
    varNettoReturn = getShares * getPrice;
    // Our return on the investment
    varLooseTaxComm = varNettoReturn * getTax / 100 + getCommission;
    varReturn = getShares * getPrice - varLooseTaxComm;
    // Algoritm 2 = also calculate profit
    if (getAlgo == 2)
        varProfit = getCapital - varReturn;
    else
        varProfit = 0;
    // minimum sell price needed to make a profit
    // Shares * X - (Shares * Tax * X + Commission) = Capital
    // => X = (Capital + Commission)/(Shares - Shares * Tax)
    varSuggestion = roundNumber((getCapital + getCommission)/(getShares - getShares * getTax / 100),4);

    showResults(getCapital, getPrice, getShares, varReturn, varProfit, getAlgo, varLooseTaxComm, varNettoReturn, varSuggestion);
}

function showResults(getCapital, getPrice, getShares, varReturn, varProfit, getAlgo, varLooseTaxComm, varNettoReturn, varSuggestion, varLoose)
{
    var objRes = document.getElementById("Resultfield");
    /* text vars */
    var txtTitle, txtUse, txtUseSpan, txtUse2, txtUse3, txtLoose, txtLoose2;
    
    
    txtTitle =  "<h3>Results</h3>";
    // return info
    if(getAlgo == 2)
    {
        txtUse = "<p>On your investment of <span class=\"strong\">" + roundNumber(getCapital,4);
        if(varReturn > getCapital)
            txtUseSpan = "<span class=\"positive\">";
        else
            txtUseSpan = "<span class=\"negative\">";
        txtUse2 = "</span> EUR, you get a return of " + txtUseSpan;
    }
    else
    {
        txtUse = "<p>You";
        txtUse2 = " get a return of <span class=\"positive\">";
    }
    // 'loss or profit?' and suggestion
    if(varReturn > getCapital || getAlgo != 2)
    {
        txtUse3 = "</span> EUR.</p>";
        txtSuggestion = "";
    }
    else
    {
        txtUse3 = "</span> EUR. <span class=\"negative\">You loose " + roundNumber(Math.abs(varReturn - getCapital),4) + " EUR. GAME OVER! Insert coin.</span></p>";
        txtSuggestion = "<p> I suggest you try to sell this stock at a price of at least <span class=\"strong\">" + varSuggestion + ".</span>";
    }
    // netto return info
    txtNetto = "<p> Your theoretical netto return would've been <span class=\"strong\">";
    txtNetto2 = "</span> EUR, if tax and commission did not exist.</p>";
    // tax and commission loss
    txtLoose = "<p>The total value the government and the bank stole, is <span class=\"negative\">";
    txtLoose2 = "</span> EUR.</p>";
    
    objRes.innerHTML = txtTitle + txtUse + txtUse2 + roundNumber(varReturn,4) + txtUse3 + txtNetto + roundNumber(varNettoReturn,4) + txtNetto2 + txtLoose + roundNumber(varLooseTaxComm,4) + txtLoose2 + txtSuggestion;

}
