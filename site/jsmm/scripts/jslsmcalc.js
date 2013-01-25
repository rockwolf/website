function roundNumber(rnum, rlength)
{ 
  // Arguments: number to round, number of decimal places
  var varNumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
  return varNumber;
}

function calcResults()
{
    /* Retrieve fields */
    var getCapital = parseFloat(document.getElementById("capital").value);
    var getRisk = parseFloat(document.getElementById("risk").value);
    var getClt = parseFloat(document.getElementById("clt").value);
    /* Declare vars */
    var varTrade, varTotal, varRiskvalue ;
    var txtResult;
    /* Main */
    varTrade = parseFloat(0);
    varTotal = getCapital;
    txtResult = "";
    do
    {
        varTrade++; 
        if(varTrade > getClt)
            break;
        varRiskvalue = parseFloat(varTotal * getRisk / 100);
        varTotal = parseFloat(varTotal - varRiskvalue);
        txtResult += txtResults(roundNumber(varTrade,4), roundNumber(varTotal,4), roundNumber(varRiskvalue,4));
    }
    while(varTotal>0.01)
    varTrade = 0;
    txtResult += txtResults(varTrade, 0, 0);
    showResults(txtResult);
}

function txtResults(varTrade, varTotal, varRiskvalue)
{
    var getRisk = parseFloat(document.getElementById("risk").value);
    /* text vars */
    var txtText;
    
    switch(varTrade) 
    {
        case 1:
            txtText = "<table cellspacing=\"0\" celpadding=\"0\" border=\"0\"><tr><th>Trade</th><th>&nbsp;</th><th>Capital</th><th>&nbsp;</th><th>" + roundNumber(getRisk,4) + "% risk on each trade</th></tr>";
            if(varTotal <= 5000)
                txtText += "<tr><td><span class=\"negative\">" + varTrade + "</span></td><td>&nbsp;</td><td><span class=\"negative\">" + varTotal + "</span></td><td>&nbsp;</td><td><span class=\"negative\">" + varRiskvalue + "</span></td></tr>";
            else if(varTotal > 5000 && varTotal < 10000)
                txtText += "<tr><td><span class=\"strong\">" + varTrade + "</span></td><td>&nbsp;</td><td><span class=\"strong\">" + varTotal + "</span></td><td>&nbsp;</td><td><span class=\"strong\">" + varRiskvalue + "</span></td></tr>";
            else if(varTotal > 20000 )
                txtText += "<tr><td><span class=\"positive\">" + varTrade + "</span></td><td>&nbsp;</td><td><span class=\"positive\">" + varTotal + "</span></td><td>&nbsp;</td><td><span class=\"positive\">" + varRiskvalue + "</span></td></tr>";
            else
                txtText += "<tr><td>" + varTrade + "</td><td>&nbsp;</td><td>" + varTotal + "</td><td>&nbsp;</td><td>" + varRiskvalue + "</td></tr>";
            break;
        case 0:
            txtText = "</table>";
            break;
        default:
            if(varTotal <= 5000)
                txtText = "<tr><td><span class=\"negative\">" + varTrade + "</span></td><td>&nbsp;</td><td><span class=\"negative\">" + varTotal + "</span></td><td>&nbsp;</td><td><span class=\"negative\">" + varRiskvalue + "</span></td></tr>";
            else if(varTotal > 5000 && varTotal < 10000)
                txtText = "<tr><td><span class=\"strong\">" + varTrade + "</span></td><td>&nbsp;</td><td><span class=\"strong\">" + varTotal + "</span></td><td>&nbsp;</td><td><span class=\"strong\">" + varRiskvalue + "</span></td></tr>";
            else if(varTotal > 20000 )
                txtText = "<tr><td><span class=\"positive\">" + varTrade + "</span></td><td>&nbsp;</td><td><span class=\"positive\">" + varTotal + "</span></td><td>&nbsp;</td><td><span class=\"positive\">" + varRiskvalue + "</span></td></tr>";
            else
                txtText = "<tr><td>" + varTrade + "</td><td>&nbsp;</td><td>" + varTotal + "</td><td>&nbsp;</td><td>" + varRiskvalue + "</td></tr>";
            break;
    }
    return txtText;
}

function showResults(result)
{
    var txtTitle;
    var objRes = document.getElementById("Resultfield");
    
    txtTitle =  "<h3>Results</h3>";
    objRes.innerHTML = "<p>" + txtTitle + result + "</p>"; 
}
