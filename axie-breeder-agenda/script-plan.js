//////////////////////////////////Plan sheets system//////////////////////////////////

/** plan sheet preparation and plan sections index trackers **/
var pPrepIndex = function () { return sheet.getName().indexOf("plan: ") >= 0 ?  sheet.getRange("plan_prep_").getRow()  : ""; }
var planIndex = function () { return sheet.getName().indexOf("plan: ") >= 0 ?  sheet.getRange("plan_").getRow() : ""; }



function loadPlanData(plan, planPrepLength) { 
  // plan prep length = plan_ index cell row number - header(3) //rmorv
  
  var planData = plan.getDataRange().getValues(),
      headLength = 0,
      pBreakdown = new Object();
  
  //take headers
  pBreakdown.head1 = planData.shift();
  headLength ++;
  
  pBreakdown.head2 = planData.shift();
  headLength ++;

  pBreakdown.headLength = headLength;
  
  //take preparation section.
  pBreakdown.prepLength = (planPrepLength - headLength);
  pBreakdown.prepData = planData.splice(0, pBreakdown.prepLength);
  
  //plan data 
  pBreakdown.data = planData
  
  return pBreakdown;
}



// Create new plan sheet (nsht)
function createPlanSheet(sheetName) {

  //get template
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
      template = ss.getSheetByName("plan: TEMPLATE") //.activate();

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




// Reload/update plan sheet
function updatePlan(planName) {
  Logger.log("plan updating...");
  
  var plan = !planName ? sheet : ss.getSheetByName(planName);
  Logger.log(plan.getName());
  
  var pd = loadPlanData(plan, planIndex()),
      sires = new Array(),
      matrons = new Array();
  
  //get axies id lists
  for(var i = 0; i < pd.data.length; i++) {
    
    //If row is check as complete dont process, if ids are not number dont process
    if (!isDone(pd.data[i][0])) {
      
      if(validateId(pd.data[i][2])) sires.push(Number(pd.data[i][2]));
      else sires.push("");
      
      if(validateId(pd.data[i][4])) matrons.push(Number(pd.data[i][4]));
      else matrons.push("");   
      
    } else {
      sires.push("");
      matrons.push("");  
    };
  };
  
//  Logger.log(sires);
//  Logger.log(matrons); //rmorv
  var siresData = Ai.getMultiAxies(sires),
      matronsData = Ai.getMultiAxies(matrons);
  
  for(var i =  0; i < pd.data.length; i++) {
    
    var sire = siresData[i],
        matron = matronsData[i];
    
    //If row is check as complete dont process
    if(!isDone(pd.data[i][0])) {
      
      //if parent is mature get breadcount.
      if(isMature(sire)) pd.data[i][3] = sire.breedCount; //sire breedcount
      else pd.data[i][3] = "";
      
      if(isMature(matron)) pd.data[i][5] = matron.breedCount; //matron breedcount
      else pd.data[i][5] = "";
      
      //Check if breedables
      if(pairMature(sire, matron)) {
 
        pd.data[i][6] = ('=axieCountLPTC($D'+(i+ planIndex() +1 ) +' ; $F'+(i+ planIndex() +1 )+')');
        pd.data[i][7] = ('=axieCheckBreedableSimple($D'+(i+ planIndex() +1 ) +' ; $F'+(i+ planIndex() +1 )+ '; planAccLovePotionTotal'+')');
        
      } else {
        pd.data[i][6] = "";
        pd.data[i][7] = "";
      };
    };
    
    
  //Apply to all
    //If axie id is numeric simply. //change Id to axie url HyperLink
    if(validateId(sires[i])) pd.data[i][2] = ('=HYPERLINK(\"https://marketplace.axieinfinity.com/axie/'+ sires[i] +'\"; '+ '\"' + sires[i] +'\")');

    if(validateId(matrons[i])) pd.data[i][4] = ('=HYPERLINK(\"https://marketplace.axieinfinity.com/axie/'+ matrons[i]+'\"; '+ '\"' +matrons[i] +'\")');
    
    //add freak axie breeding calculator link
    if(validatePair(sires[i], matrons[i])) {
      var fabcLink = axiePrintFreakCalcUrl(sires[i], matrons[i]);
      
//      Logger.log(fabcLink); //rmorv
      pd.data[i][9] = fabcLink;
    };   
  };
  
//  Logger.log(pd)
  Logger.log(planIndex())
  Logger.log(pd.data.length)
  Logger.log(pd.data)
  Logger.log(pd.head1.length) //rmorv

  //Set data to sheet.
  var dataRange = plan.getRange(planIndex() + 1, 1, pd.data.length, pd.head1.length);
  Logger.log(dataRange.getA1Notation());
  
  dataRange.setValues(pd.data);
  
  refresh();  
  return plan.getName();
};





//Scan for babies
//link to babies after breeding
function scanForBabies(planName) {
  
  var plan = !planName ? sheet : ss.getSheetByName(planName), //ss.getSheetByName("tstPlan"),//
      pd = loadPlanData(plan, planIndex()),
      parents = new Array(),
      listedBabies = new Array(); // record babies already in the plan.
  
  Logger.log(plan.getName());
  
  
  //get pairs(parents) list and already listed babies
  for(var i = 0; i < pd.data.length; i++) {
    
    //If row is check as complete dont process, if ids are not number dont process
    if(validatePair(pd.data[i][2], pd.data[i][4])) {
      parents.push([{ id: pd.data[i][2], breedcount: pd.data[i][3]}, { id: pd.data[i][4], breedcount: pd.data[i][5]}]);
      
    } else { 
      parents.push(["",""]);
    };
    
    if(pd.data[i][10]) listedBabies.push(pd.data[i][10]);
  };
  
  //Trim the bottom of the plan: now do empty iteration everywhere.
  while(parents[parents.length-1][0] === "") {
    parents.splice(parents.length-1, 1);
  }
  
  
  //get baby in inventory list
  var axies = pagination_(Ai.getMyAxies,
                          {address: plan.getRange("planEthAddress").getValue(), stage: [1, 2, 3], offset: 0 },
                          "axies", "totalAxies", 12);
  
  if(!axies.length) {
    Logger.log("No new egg, larva, or petite detected");
    return;
  }
  
  axies.reverse();// set from oldest_newest ids.
  
  //Remove already listed babies
  var newBb = axies.filter(function (axie, index) {
    if(!checkPresence_( listedBabies, 'https://marketplace.axieinfinity.com/axie/' + axie.id)) return true;
    else Logger.log("baby listed, discarding: " + listedBabies[index]); 
  });
  
  
  
  //Starting data inserting.
  // For each pair(row)
  var rowPos = planIndex() +1;//target data first row and keep track
//  var rowtarg = 1; //rmorv
  for(var i =  0; i < parents.length; i++) {
    
        Logger.log("rowPos: " + (rowPos + i)); // rmorv
    

//        plan.getRange(rowPos + i, 13).setValue("target " +rowtarg);  // rmorv
      
    
    var sire = parents[i][0],
        matron = parents[i][1],
        babies = new Array();
    
    
    
    
    if(!sire.id && !matron.id) {
//      plan.getRange(rowPos + i, 13).setValue("skipped, not a pair after targ: "+ rowtarg);
//      rowtarg++;  // rmorv
      continue;
    }
    
//    plan.getRange(rowPos + i, 12).setValue("row init " +sire.id +" "+ matron.id);  // rmorv
    
//    rowtarg++;  // rmorv
    
    Logger.log(sire.id +" "+ matron.id);
    
    
    //get babies of this pair.
    for (var a = 0; a < newBb.length; a++) {
      if(sire.id == newBb[a].sireId && matron.id == newBb[a].matronId ||
         sire.id ==  newBb[a].matronId && matron.id == newBb[a].sireId) {
        
        babies.push(newBb[a].id);
        newBb.splice(a, 1);
        
        a--;
      };
    };  
    
    if(!babies.length) continue;
    
    
    //Set first baby
    if(plan.getRange(rowPos + i, 11).getValue() === "") {
      Logger.log("setting first baby id. On row: " + (rowPos + i));
      
      plan.getRange(rowPos + i, 11).setValue('https://marketplace.axieinfinity.com/axie/'+ babies[0]);
//      plan.getRange(rowPos + i, 12).setValue("used");  // rmorv
      
      Logger.log("splicing");
      Logger.log(babies.splice(0, 1));
      
    } 
//    else plan.getRange(rowPos + i, 12).setValue("skipped");  // rmorv
    
    if(!babies.length) continue;
    babies.reverse();// Run rest of list from bottom to top, reverse to keep same order.
    
    
    //set other babies
    while (babies.length > 0) {
      var baby = 'https://marketplace.axieinfinity.com/axie/' + babies[babies.length -1];
      rowPos ++;
//      plan.getRange(rowPos + i, 13).setValue("target " +rowtarg);
//      rowtarg++  //rmorv;
      
      //other pair below
      if(validateId(plan.getRange(rowPos + i, 3).getValue()) || 
         validateId(plan.getRange(rowPos + i, 5).getValue()) 
        ){
          
          Logger.log("row is used. by an other couple");
          
//          plan.getRange(rowPos + i, 12).setValue("jump back, used. by an other pair");  // rmorv
          
          rowPos --;
          
//      plan.getRange(rowPos + i, 13).setValue("target " +rowtarg);
//          rowtarg++;  // rmorv
          
          plan.insertRowAfter(rowPos + i);
          
          rowPos ++;
//      plan.getRange(rowPos + i, 13).setValue("target " + rowtarg);
//          plan.getRange(rowPos + i, 12).setValue("inserted");  // rmorv
          
        //sibling below
        } else if( plan.getRange(rowPos + i, 2).getValue().indexOf("baby^") > -1 || plan.getRange(rowPos + i, 11).getValue() !== "") {
          Logger.log("already a baby listed on this row");
          
//          plan.getRange(rowPos + i, 12).setValue("skipped, other baby of pair");  // rmorv
          parents.splice(i, 1);
          continue;
          
        };
      
      Logger.log("finished checking placement. adding baby");
      Logger.log(babies.splice(babies.length -1, 1));
      
      
      //set breed stats(breedcount of parents and breed cost
      var sireNBrdCount = (sire.breedcount +1),
          matronNBrdCount = (matron.breedcount +1),
          
          res = [[plan.getRange(rowPos+i,2).getValue() + " baby^", "",sireNBrdCount, "",matronNBrdCount, 
                 axieCountLPTC(sireNBrdCount, matronNBrdCount)]];
      
      plan.getRange(rowPos+i,2).offset(0, 0, 1, res[0].length).setValues(res);
      plan.getRange(rowPos+i, 11).setValue(baby);
      
//      plan.getRange(rowPos + i, 12).setValue("used"); //rmorv
//      
//      if(babies.length > 0) {
//        plan.insertRowAfter(rowPos+i);
//        
//        //          plan.getRange(rowPos + i, 12).setValue("inserted");  // rmorv        
//      };
      if(babies.length > 0) plan.insertRowAfter(rowPos+i);
    };
    
  };  
  
  refresh();
  return plan.getName();
};


