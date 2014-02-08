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
			document.getElementById("risk_unit").innerHTML="EUR";
			break;
		default:
			document.getElementById("risk_unit").innerHTML="%";
			break;
	}
}

function calcResults()
{
    /* Retrieve fields */
    var getAlgo = parseInt(document.getElementById("selAlgo").value);
    var getCapital = parseFloat(document.getElementById("capital").value);
    var getRisk = parseFloat(document.getElementById("risk").value);
    var getPrice = parseFloat(document.getElementById("price").value);
    var getStoploss = parseFloat(document.getElementById("stoploss").value);
    var getCommission = parseFloat(document.getElementById("commission").value);
    var getTax = parseFloat(document.getElementById("tax").value);
    /* Declare vars */
    var varShares, varUse, varLooseBuy, varLooseSell, varLoose, varLooseTot, varSell, varReturnHigh1, varReturnHigh2, varTotalProfit, varTotalProfitAll;
    var varT1, varT2, varN1;
    var varLTSell, varLTSellTaxComm;
    
    /* Main */
    // Algoritm 1 = use risk %, algoritm 2 = use risk value
    // To minimize risk, only invest part of capital
    switch(getAlgo)
    {
	case 1:
    	    varUse = getCapital * getRisk / 100;
	    break;
	default:
	    varUse = getRisk;
    }
    // What you loose to tax and commission on buy
    varLooseBuy = (getTax / 100 * varUse) + getCommission;
    // Number of shares you can buy
    varShares = varUse / getPrice - varLooseBuy;
    // When shares are negative, make them 0
    if (varShares < 0)
            varShares = 0
    // Pre-sell calculations:
    // Capital * risk = shares / 2 * X - (commission + tax on shares / 2 * X) + shares / 2 * stoploss - (commission + tax on shares / 2 * stoploss)
    // X is the value we need = varSell
    varT1 = (varShares / 2 - getTax / 100 * varShares / 2) * getStoploss;
    varT2 = -2 * getCommission - varUse;
    varN1 = (getTax /100 * varShares / 2) - (varShares / 2);
    // At which price you need to sell
    if(varShares != 0)
        varSell = (varT1 + varT2)/varN1;
    else
        varSell = 0;
    // What you loose when selling
    varLooseSell = (getTax / 100 * getStoploss) + (getTax / 100 * varSell) + 2 * getCommission; 
    // The total that was lost (both buying and selling)
    varLoose = varLooseBuy + varLooseSell;
    // When stocks drop to stoploss after purchase, calculate loss on capital
    varLTSell = varShares * getPrice - varShares * getStoploss;
    // and loss through taxes and commission on selling (buying is added in the final formula)
    varLTSellTaxComm = varShares * getStoploss * getTax / 100 + getCommission;
    // Calculate all that was lost when stocks drop to stoploss after purchase
    varLooseTot = varLTSell + varLooseBuy + varLTSellTaxComm;
    // Selling other half of shares at the varSell price gives a return of
    varReturnHigh1 = varSell * Math.ceil(varShares / 2) - varSell * getTax / 100 * Math.ceil(varShares / 2) - getCommission;
    varReturnHigh2 = varSell * Math.floor(varShares / 2) - varSell * getTax / 100 * Math.floor(varShares / 2) - getCommission;
    // When we sell both halves of our shares at the varSell price, wat will be our profit?
    varTotalProfit = varReturnHigh1 + varReturnHigh2 - varUse - varLooseBuy;
    // When we sell our shares at once at the varSell price, wat will be our profit? Only 1 x taxes and commission
    varTotalProfitAll = varSell * Math.floor(varShares) - varSell * getTax / 100 * Math.floor(varShares) - varUse - varLooseBuy;

    showResults(varUse, varLooseTot, varLooseBuy, varSell, varLoose, varLooseSell, varShares, varReturnHigh1, varReturnHigh2, varSell, varTotalProfit, varTotalProfitAll);
}

function showResults(varUse, varLooseTot, varLooseBuy, varSell, varLoose, varLooseSell, varShares, varReturnHigh1, varReturnHigh2, varSell, varTotalProfit, varTotalProfitAll)
{
    /* Retrieve fields */
    var getCapital = parseFloat(document.getElementById("capital").value);
    var getPrice = parseFloat(document.getElementById("price").value);
    /* Get objects */
    var objRes = document.getElementById("Resultfield");
    /* text vars */
    var txtTitle, txtUse, txtUse2, txtFailure, txtFailure2, txtStolen, txtStolen2, txtStolen3, txtStolen4, txtShares, txtShares2, txtEven, txtEven1, txtEven2, txtReturnEven, txtReturnEven2, txtReturn, txtReturn1, txtReturn2, txtTotalProfit, txtTotalProfit1, txtTotalProfit2, txtTotalProfitAll, txtTotalProfitAll1, txtTotalProfitAll2;
    
    
    txtTitle =  "<h3>Results</h3>";
    if(varUse > getCapital)
    {
        txtUse = "<p>Capital you would like to use: <span class=\"negative\">";
        txtUse2 = "</span> EUR. <span class=\"negative\">Too bad you\'re too poor to afford it.</span></p>";
    }
    else
    {
        txtUse = "<p>Capital you may use: <span class=\"strong\">";
        txtUse2 = "</span> EUR.</p>";
    }
    txtFailure = "<p> Total failure makes you loose: <span class=\"negative\">";
    txtFailure2 = "</span> EUR.</p>";
    txtStolen = "<p>Stolen by government/bank: <span class=\"strong\">";
    txtStolen2 = "</span> EUR (buy) and <span class=\"strong\">";
    txtStolen3 = "</span> EUR (sell), the bastards took <span class=\"strong\">";
    txtStolen4 = "</span> EUR.</p>";
    if(varShares != 0)
        txtShares = "<p>Shares you can buy: <span class=\"strong\">";
    else
        txtShares = "<p>Shares you can buy: <span class=\"negative\">";
        txtShares2 = "</span>.</p>";
    if(varSell == 0)
    {
        txtEven = "<p><span class=\"negative\">Don't buy shares with this little money! Chance of success -> ";
        txtEven1 = " and I do mean "
        txtEven2 = " !</span></p>";
    }
    else if(varSell > 2*getPrice)
    {
        txtEven = "<p>To break even, you need to sell 50% (<span class=\"strong\">";
        txtEven1 = "</span>) of your shares at <span class=\"negative\">";
        txtEven2 = "</span> EUR. <span class=\"negative\">WARNING: More than twice the buy price!</span></p><p><span class=\"negative\">Use more capital (higher risk) or increase your \"stop loss\" value when realism is needed.</span></p>";
    }
    else
    {
        txtEven = "<p>To break even, you need to sell 50% (<span class=\"strong\">";
        txtEven1 = "</span>) of your shares at <span class=\"strong\">";
        txtEven2 = "</span> EUR.</p>";
    }
    txtReturnEven = "<p>This will give you an initial return of <span class=\"positive\">";
    txtReturnEven2 = "</span> EUR.</p>";
    
    if(varShares != 0)
    {
        txtReturn = "<p>Selling the other half at <span class=\"strong\">";
        txtReturn1 = "</span> EUR or more, will give a return of at least <span class=\"positive\">";
        txtReturn2 = "</span> EUR.</p>";
    }
    else
    {
        txtReturn = "<p>";
        txtReturn1 = " ";
        txtReturn2 = "</p>";
    }
    txtTotalProfit = "<p>Selling both halves of the shares at <span class=\"strong\">";
    txtTotalProfit1 = "</span> EUR, will get us a profit of <span class=\"positive\">";
    txtTotalProfit2 = "</span> EUR.";
    
    txtTotalProfitAll = "<p>Selling all shares at once at <span class=\"strong\">";
    txtTotalProfitAll1 = "</span> EUR, will get us a profit of <span class=\"positive\">";
    txtTotalProfitAll2 = "</span> EUR.";
    
    objRes.innerHTML = txtTitle + txtUse + roundNumber(varUse,4) + txtUse2 + txtFailure + roundNumber(varLooseTot,4) + txtFailure2 + txtStolen + roundNumber(varLooseBuy,4) + txtStolen2  + roundNumber(varLooseSell,4) + txtStolen3 + roundNumber(varLoose,4) + txtStolen4 + txtShares + Math.floor(varShares) + txtShares2 + txtEven + Math.ceil(varShares/2) + txtEven1 + roundNumber(varSell,4) + txtEven2 + txtReturnEven + roundNumber(varReturnHigh1,4) + txtReturnEven2 + txtReturn + roundNumber(varSell,4) + txtReturn1 + roundNumber(varReturnHigh2,4) + txtReturn2 + txtTotalProfit + roundNumber(varSell,4) + txtTotalProfit1 + roundNumber(varTotalProfit,4) + txtTotalProfit2 + txtTotalProfitAll + roundNumber(varSell,4) + txtTotalProfitAll1 + roundNumber(varTotalProfitAll,4) + txtTotalProfitAll2;

}
