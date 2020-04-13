/** Operations
- On edit check if pair gets checked as completed if yes save SLP cost, 
  calculate SLP cost value in Base currency and save it. Then add completion date.
- 
*/
function onEdit(e) {
  
  var triggerCell = e.range,
      eValue = triggerCell.getValue();
  
  Logger.log("triggerCellRange")
  Logger.log(triggerCell);
  Logger.log("event value")
  Logger.log(eValue)
  
  
  
  //Only on plan sheets.
  if(sheet.getName().indexOf("plan: ") < 0) return;
  
  //Only when a completion cell is check, inside the plan data range.
  if(triggerCell.getColumn() === 1 && eValue === true &&
     triggerCell.getRow() > planIndex()) {//First column, "checked as done" column.
    
    Logger.log("A breed was completed");
    
    var doneRow = triggerCell.getRow(),
        brdCostCol = 7, // column with breed cost.
        brdCostRecCol = 14;  // column with breed cost record. calculate total spent.
    
    try {
      
      //avoid overwrite already saved values.
      if(!sheet.getRange(doneRow, brdCostRecCol).getValue()) {
        Logger.log("calculating rates");
        
        var slpValue = cgkoExtV3("small-love-potion","","","market_data.current_price.eth"),
            slpSecondVal = cgkoExtV3("small-love-potion","","","market_data.current_price."+ rng.priceFeedQuote.getvalue());
        
        var bCost = sheet.getRange(doneRow, brdCostCol).getValue();
        
        var bCostEthVal = myToFixed_(slpValue * bCost + 0.002, 6),
            bCSecondVal = myToFixed_(slpSecondVal * bCost, 4);
        
        var toLog = [[bCost, bCostEthVal, bCSecondVal, actDate()]];
        
        sheet.getRange(doneRow, brdCostRecCol, 1, toLog[0].length).setValues(toLog);
        
        return;
        
      } else return;
    } catch (e) { Logger.log(e); }
  } else return; 
  //end completions check operation.

}