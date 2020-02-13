/************************************************************
References to AxieInfinity.com api and development:
  -Unofficial API documentation:
  https://pacxiu.github.io/AxieInfinityAPI
  -Introdution to build mini-game and tools:
  https://medium_.com/@kreatywnikreatywnym/axie-infinity-tutorial-paint-my-axies-vanilla-js-cd70cf8c6adb

GAS (googleAppScript) facts:
  - A script that uses a library does not run as quickly as
    single script project. Recommend to copy this code to
    a script file in your project. Or copy your libraries 
    in this projects.
  - Can't call anonym functions contained in an object from
    spreadsheet. The Variable.functionName() structure is
    reserved for library reference name in googleAppScript.
  - Can't send an object as function parametter from
    spreadsheet,params must be hard coded.
  - Get method doesn't handle payloads using UrlFetchApp,
    concat query_param_string to url.
************************************************************/
/************************************************************
License
MIT License

Copyright (c) January 2020 Guillaume MD, @27aume

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to
whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
************************************************************/
/*
 @customfunction
*/

//Globals
var ss = SpreadsheetApp.getActive(),
    sheet = ss.getActiveSheet(),
    cell = sheet.getActiveCell(),
    managerSht = ss.getSheetByName("Manager");

var rng = { //predefined ranges and settings
  mainAddress: managerSht.getRange("mainEthAddr"),
  refreshTrigger: managerSht.getRange("refreshTrig"),
  rowHLTrigger: managerSht.getRange("rowHighlightTrigger")
}

var defaultProfile = rng.mainAddress.getValue(), //Ethereum address
    timeZone = Session.getScriptTimeZone();




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
  var template = ss.getSheetByName("plan.temp") //.activate();
  //create copy
  var nsht = template.copyTo(ss);
  //set sheet name
  sheetName ? nsht.setName(sheetName) : nsht.setName("plan: ADD_NAME_HERE");
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





//////////////////////////////////Core//////////////////////////////////

// Create a menu in google sheet ui.
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  var agendaMenu = ui.createMenu('**Axie agenda tools**'),
      inventoryMenu = ui.createMenu('**Axie inventory tools**'),
      extraTools = ui.createMenu('**Extra tools**');
      
  agendaMenu
    .addItem('Update plan. (load data)', 'updatePlan')
    .addItem('Scan for babies.(After eggs is in inventory)', 'scanForBabies')
    .addItem('Save completed breeds.', 'saveToHistory')
    .addSeparator()
    .addItem('Create new plan sheet.', 'createPlanSheet')
    .addItem('Create new history sheet.', 'createHistSheet')
  .addToUi();
  
  inventoryMenu
    .addItem('Reload axie Inventory.', 'axieInventory')
    .addItem('Search By name.', 'searchAxiesByName')
  .addToUi();

  extraTools
    .addItem('Update all plans', 'updateAllPlans')
    .addItem('invert cells value: rangeStart_End > rangeEnd_Start', 'switchPlaces')
  .addToUi();
  
//  ui.createMenu('**TEST MENU**')
//    .addItem('tst_scanForBabies', 'tst_scanForBabies')
//  .addToUi();
}




// Reload/update plan sheet
function updatePlan(planName) {
  var plan = !planName ? sheet : ss.getSheetByName(planName);
  
  var pd = loadPlanData(plan),
      sires = [],
      matrons = [];
  
  //get axies lists
  for(var i = 0; i < pd.data.length; i++) {
    
    //If row is check as complete dont process, if ids are not number dont process
    if(!isNaN(pd.data[i][2]) && pd.data[i][0] === false ) { 
      sires.push(Number(pd.data[i][2]));
    } else {
      sires.push("");
    }
    if(!isNaN(pd.data[i][4]) && pd.data[i][0] === false) {
      matrons.push(Number(pd.data[i][4]));
      continue;
    } else {
      matrons.push("");   
    }
    
  };
  
  var siresData = Ai.getMultiAxies(sires);
  var matronsData = Ai.getMultiAxies(matrons);
  
  for(var i =  0; i < pd.data.length; i++) {
    
    var sire = siresData[i],
        matron = matronsData[i];
    
    //If row is check as complete dont process
    if(pd.data[i][0] === true) {
      //breedcount
      pd.data[i][3] = "";
      pd.data[i][5] = "";
      //love potion counts/checks
      pd.data[i][6] = "";
      pd.data[i][7] = "";
      
    } else {
      
      if(sire && sire.stage > 3) {
        pd.data[i][3] = sire.breedCount; //sire breedcount
      } else {
        pd.data[i][3] = "";
      };
      
      if(matron && matron.stage >3) {
        pd.data[i][5] = matron.breedCount; //matron breedcount
      } else {
        pd.data[i][5] = "";
      };
      
      //Check if breedables
      if(sire && sire.stage > 3 && matron && matron.stage > 3) {
        pd.data[i][6] = ('=axieCountLPTC($D'+(i+3) +' , $F'+(i+3)+')');
        pd.data[i][7] = ('=axieSimpleCheckBreedable($D'+(i+3) +' , $F'+(i+3)+ ', planAccLovePotionTotal'+')');
        
      } else {
        pd.data[i][6] = "";
        pd.data[i][7] = "";
      };
    };
    
    //If axie id is numeric simply.
    if(!isNaN(pd.data[i][2]) && pd.data[i][2] !== "") { 
      //change Id to axie url HyperLink
      pd.data[i][2] = ('=HYPERLINK(\"https://marketplace.axieinfinity.com/axie/'+ pd.data[i][2]+'\", '+ '\"' +pd.data[i][2] +'\")');
    };//repeat as above for matron.
    if(!isNaN(pd.data[i][4]) && pd.data[i][4] !== "") {
      pd.data[i][4] = ('=HYPERLINK(\"https://marketplace.axieinfinity.com/axie/'+ pd.data[i][4]+'\", '+ '\"' +pd.data[i][4] +'\")');
    };
    
    
      
    
    if(pd.data[i][2] && pd.data[i][4] && !isNaN(pd.data[i][2]) && !isNaN(pd.data[i][4])) {
      //add freak breeding calculator link
      pd.data[i][9] = axieFreakCalcUrl(pd.data[i][2], pd.data[i][4]);
    };
    
    
  };
  //Set data to sheet.
  var dataRange = plan.getDataRange().offset(2, 0, pd.data.length, pd.head1.length);
  
  dataRange.setValues(pd.data);
  rng.refreshTrigger.setValue(Math.random(1, 10));
  
  return plan.getName();
};



//refresh all your plans at once.
function updateAllPlans() {
  var shtNames = [],
      sheets = ss.getSheets();
  
  for (var i= 0; i < sheets.length; i++) {
    var shtName = sheets[i].getName();
    if(shtName.indexOf("plan:") >= 0) shtNames.push(shtName);
  };
  Logger.log("Pages that will be updated: "+ shtNames.join(", "));
  
  function loopTrouPlans(shtList) {
    for (var i = 0; i < shtList.length; i++) {
      updatePlan(shtList[i]);
    }
  };
  
  if(shtNames.length > 12) {
  
    var ui = ss.getUi();
    var response = ui.prompt("Search in axies names", ui.ButtonSet.YES_CANCEL);
    
    // Process the user's response.
    if (response.getSelectedButton() == ui.Button.OK) { loopTrouPlans(shtNames); 
    } else if (response.getSelectedButton() == ui.Button.CANCEL) { Logger.log("Search canceled");
    } else { Logger.log("Exit prompt");
    };
    
  } else {
    loopTrouPlans(shtNames);
  };
  return;
};

//You have more than 12 plans to update. \nIt Might take some time or even crash. \nWould you like to proceed?

//Scan for babies
      //link to babies after breeding
function scanForBabies(planName) {
  
  var plan = ss.getSheetByName("tstPlan"),//!planName ? sheet : ss.getSheetByName(planName),
      pd = loadPlanData(plan),
      sires = [],
      matrons = [];
  
  //get axies lists
  for(var i = 0; i < pd.data.length; i++) {
    
    //If row is check as complete dont process, if ids are not number dont process
    if( !isNaN(pd.data[i][2]) && !isNaN(pd.data[i][4]) && pd.data[i][0] == false ) {
      sires.push(pd.data[i][2]);
      matrons.push(pd.data[i][4]);
    } else { 
      sires.push("");
      matrons.push("");
    } 
  };
  
   //get axies data
  var axies = pagination_(Ai.getMyAxies, {address: plan.getRange("planEthAddress").getValue(),
                                          stage: [1, 2, 3], offset: 0} , "axies", "totalAxies", 12);
  // for each pair
  var rowPos = 3;
  for(var i =  0; i < sires.length; i++) {
    var sire = sires[i],
        matron = matrons[i],
        babies = [];
    
    if(sire && matron) {
      //check each babies
      for (var a = 0; a < axies.length; a++) {
        if(sire == axies[a].sireId && matron == axies[a].matronId) {
          babies.push(axies[a].id);
          axies.splice(a, 1);
          a--;
        };
      };

      if(babies.length > 0) {
      Logger.log("setting first baby id");
        plan.getRange(rowPos +i, 11).setValue('https://axieinfinity.com/axie/'+ babies[0]);
        Logger.log("splicing")
        Logger.log(babies.splice(0, 1));
      }
      
      while (babies.length > 0) {
        Logger.log("inserting rows");
        var baby =  babies[babies.length -1];
        
        plan.insertRowAfter(rowPos+i);
        rowPos += 1;
        plan.getRange(rowPos+i, 11).setValue('https://axieinfinity.com/axie/'+ baby);
        Logger.log(babies.splice(babies.length -1, 1));
      };
      
    };
  };
  
  rng.refreshTrigger.setValue(Math.random(1, 10));
  return plan.getName();
};





//save to history 
//with date
function saveToHistory(planName) {
  var plan = !planName ? sheet : ss.getSheetByName(planName),
      planName = plan.getName().split(": ")[1],
      pd = loadPlanData(plan),
      history = ss.getSheetByName("hist: "+planName);
  
  Logger.log(pd.data[0][9]);
    Logger.log(pd.data[0][9]);

  
  if(!history) {
    history = createHistSheet("hist: "+planName);
  };
  
  //append rows to history
  for(var i =  0; i < pd.data.length; i++) {
    if (pd.data[i][0] == true) {
      var row = [(Utilities.formatDate(new Date(), timeZone, "dd-MM-yyyy' 'HH:mm")), pd.data[i][2], pd.data[i][4], pd.data[i][10], pd.data[i][8], pd.data[i][11], pd.data[i][9]];
      history.appendRow(row);
    }; 
  }
  
  //delete from plan
  var rows = pd.data.length;
  for(var i =  0; i < rows; i++) {
    
    if (pd.data[i][0] == true) {
      plan.deleteRow(i + pd.headLength + 1);
      
      pd.data.splice(i, 1);
      i--;
      rows--;
    };
  };
  
  rng.refreshTrigger.setValue(Math.random(1, 10));
  plan.activate();
  return;
}



//Load axie inventory
function axieInventory() {
  var invProfile = sheet.getRange("axieInvEthAddr").getValue(),
      ethAddr = !invProfile ? defaultProfile: invProfile;
//  Logger.log(ethAddr);
  var axieInv = symmetric2DArray_(pagination_(Ai.getMyAxies, {address: ethAddr, offset: 0}, "axies", "totalAxies", 12, axieTemp2_));
  
  var dataRange = sheet.getDataRange();
  
  dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
  dataRange.offset(2, 1, axieInv.length, axieInv[0].length).setValues(axieInv);
  rng.refreshTrigger.setValue(Math.random(1, 10));
  return;
  
};


function searchAxiesByName() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt("Search in axies names", "Enter the text you want to search in your axies names", ui.ButtonSet.OK_CANCEL);
  
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.OK) {
    
    var invProfile = sheet.getRange("axieInvEthAddr").getValue(),
        ethAddr = !invProfile ? defaultProfile: invProfile;
    
    Logger.log(response.getResponseText());
    Logger.log(ethAddr);
    
    var searchResult = axieSearchByName(response.getResponseText(), ethAddr, axieTemp2_),
        dataRange = sheet.getDataRange();
    Logger.log(searchResult);
    
    //If nothing found
    if(!searchResult.length){
      searchResult = [["Nothing found with \""+ response.getResponseText()+ "\" in your axie inventory."]];
    }
    
    dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
    dataRange.offset(2, 1, searchResult.length, searchResult[0].length).setValues(searchResult);
    rng.refreshTrigger.setValue(Math.random(1, 10));
    return;
    
  } else if (response.getSelectedButton() == ui.Button.CANCEL) { Logger.log("Search canceled");
  } else { Logger.log("Exit prompt")};
};
  
  
  
  