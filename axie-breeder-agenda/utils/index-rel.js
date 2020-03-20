//////////////////////////////////Utils//////////////////////////////////

function loadPlanData(plan) {
  var planData = plan.getDataRange().getValues(),
//      planSize = {rows: , cols: },
      head1 = planData.shift(),
      head2 = planData.shift();
  return {data: planData, head1: head1, head2: head2, headLength: 2};
}


// Create new plan sheet (nsht)
function createPlanSheet(sheetName) {
  //get template
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
      template = ss.getSheetByName("plan.temp") //.activate();
  //create copy
  var nsht = template.copyTo(ss);
  //set sheet name
  var sheetNames = new Array();
  ss.getSheets().forEach(function(sheet) {
    var sheetName = sheet.getName();
    if(sheetName.indexOf("plan: ADD_NAME_HERE") > -1) sheetNames.push(sheet.getName());
  });
  var newSheetName = sheetNames.length > 0 ? "plan: ADD_NAME_HERE("+sheetNames.length+")" : "plan: ADD_NAME_HERE";
  sheetName ? nsht.setName(sheetName) : nsht.setName(newSheetName);
  
  return nsht.activate();//.getName();
};



// Create new plan sheet (nsht)
function createHistSheet(sheetName) {
  //get template
  var template = ss.getSheetByName("history.temp");
  //create copy
  var nsht = template.copyTo(ss);
  //set sheet name
  sheetName ? nsht.setName(sheetName) : nsht.setName("hist: ADD_NAME_HERE");
  return nsht.activate();
};


/**
 * List of check function  for axie/axiePair checks
 * pair check = 2 axie check
 */
// pair is check as complete dont process
function isDone(checkCellValue) {
  return checkCellValue == true;
}
// ids are not number dont process
function validateId(axieId) {
  return (!isNaN(axieId) && axieId !== "");
}
function validatePair(axieId1, axieId2) {
  return (validateId(axieId1) && validateId(axieId2));
}
// is mature
function isMature(axieData) {
  return (axieData && axieData.stage > 3);
}
function pairMature(axieData1, axieData2) {
  return (isMature(axieData1) && isMature(axieData2));
}
