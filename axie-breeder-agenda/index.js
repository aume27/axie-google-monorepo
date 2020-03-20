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
    managerSht = ss.getSheetByName("Manager"),
    mainInventory = ss.getSheetByName("Inventory: Main");

var rng = { //predefined ranges and settings
  mainAddress: managerSht.getRange("mainEthAddr"),
  refreshTrigger: managerSht.getRange("refreshTrig"),
  rowHLTrigger: managerSht.getRange("rowHighlightTrigger")
}

var defaultProfile = rng.mainAddress.getValue(), //Ethereum address
    timeZone = Session.getScriptTimeZone(),
    actDate = function actDate() {
                return (Utilities.formatDate(new Date(), timeZone, "dd-MM-yyyy' 'HH:mm"))
              };

//////////////////////////////////Core//////////////////////////////////
//////////////////////////////////Plan sheets system//////////////////////////////////

//(ONLY) if completion date cell is empty:
//On edit check if pair gets checked as completed if yes save SLP cost, 
  // calculate SLP cost value in Base currency and save it. Then add completion date.


// Reload/update plan sheet
function updatePlan(planName) {
  var plan = !planName ? sheet : ss.getSheetByName(planName);
  
  var pd = loadPlanData(plan),
      sires = [],
      matrons = [];
  
  //get axies id lists
  for(var i = 0; i < pd.data.length; i++) {
    //If row is check as complete dont process, if ids are not number dont process
    if (!isDone(pd.data[i][0])) {
      if(validateId(pd.data[i][2])) { 
        sires.push(Number(pd.data[i][2]));
      } else {
        sires.push("");
      }
      if(validateId(pd.data[i][4])) {
        matrons.push(Number(pd.data[i][4]));
        continue;
      } else {
        matrons.push("");   
      }
    } else {
      sires.push("");
      matrons.push("");  
    };
  };
  
  Logger.log(sires);
  Logger.log(matrons);
  var siresData = Ai.getMultiAxies(sires);
  var matronsData = Ai.getMultiAxies(matrons);
  
  for(var i =  0; i < pd.data.length; i++) {
    
    var sire = siresData[i],
        matron = matronsData[i];
    
    //If row is check as complete dont process
    if(!isDone(pd.data[i][0])) {
      
      //if parent is mature get breadcount.
      if(isMature(sire)) {
        pd.data[i][3] = sire.breedCount; //sire breedcount
      } else {
        pd.data[i][3] = "";
      };
      
      if(isMature(matron)) {
        pd.data[i][5] = matron.breedCount; //matron breedcount
      } else {
        pd.data[i][5] = "";
      };
      
      //Check if breedables
      if(pairMature(sire, matron)) {
        pd.data[i][6] = ('=axieCountLPTC($D'+(i+3) +' , $F'+(i+3)+')');
        pd.data[i][7] = ('=axieCheckBreedableSimple($D'+(i+3) +' , $F'+(i+3)+ ', planAccLovePotionTotal'+')');
        
      } else {
        pd.data[i][6] = "";
        pd.data[i][7] = "";
      };
    };
    
  //Apply to all
    //If axie id is numeric simply.
    if(validateId(sires[i])) { 
      //change Id to axie url HyperLink
      pd.data[i][2] = ('=HYPERLINK(\"https://marketplace.axieinfinity.com/axie/'+ sires[i] +'\", '+ '\"' + sires[i] +'\")');
    };//repeat as above for matron.
    if(validateId(matrons[i])) {
      pd.data[i][4] = ('=HYPERLINK(\"https://marketplace.axieinfinity.com/axie/'+ matrons[i]+'\", '+ '\"' +matrons[i] +'\")');
    };

    if(validatePair(sires[i], matrons[i])) {
      //add freak axie breeding calculator link
      var fabcLink = axiePrintFreakCalcUrl(sires[i], matrons[i]);
      
//      Logger.log(fabcLink);
      pd.data[i][9] = fabcLink;
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
  
  var plan = !planName ? sheet : ss.getSheetByName(planName), //ss.getSheetByName("tstPlan"),//
      pd = loadPlanData(plan),
      sires = [],
      matrons = [];
  
  //get axies lists
  for(var i = 0; i < pd.data.length; i++) {
    
    //If row is check as complete dont process, if ids are not number dont process
    if(validatePair(pd.data[i][2], pd.data[i][4]) && !isDone(pd.data[i][0])) {
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
  // for each couple
  var rowPos = 3;//skip header, count inserted rows.
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
        plan.getRange(rowPos +i, 11).setValue('https://marketplace.axieinfinity.com/axie/'+ babies[0]);
        Logger.log("splicing")
        Logger.log(babies.splice(0, 1));
      }
      
      while (babies.length > 0) {
        Logger.log("inserting rows");
        var baby =  babies[babies.length -1];
        
        plan.insertRowAfter(rowPos+i);
        rowPos += 1;
        plan.getRange(rowPos+i, 11).setValue('https://marketplace.axieinfinity.com/axie/'+ baby);
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
      var row = [actDate, pd.data[i][2], pd.data[i][4], pd.data[i][10], pd.data[i][8], pd.data[i][11], pd.data[i][9]];
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



//////////////////////////////////Axie Inventory system//////////////////////////////////
function advSearchMenu() {
  var html = HtmlService.createHtmlOutputFromFile('html/sidebarAdvSearch')
    .setWidth(370)
    .setHeight(740)
  SpreadsheetApp.getUi().showModalDialog(html, 'Advanced search menu');
}

function nameSearchMenu() {
  var html = HtmlService.createHtmlOutputFromFile('html/sidebarNameSearch')
    .setWidth(450)
    .setHeight(300)
  SpreadsheetApp.getUi().showModalDialog(html, 'Name search menu');
}

//Load axie inventory
function axieInventory() {
  var invProfile = sheet.getRange("axieInvEthAddr").getValue(),
      ethAddr = !invProfile ? defaultProfile: invProfile,
      axieInv = symmetric2DArray_(pagination_(Ai.getMyAxies, {address: ethAddr, offset: 0}, "axies", "totalAxies", 12, axieTemp2_)),
      dataRange = sheet.getDataRange();
  
  dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
  dataRange.offset(2, 1, axieInv.length, axieInv[0].length).setValues(axieInv);
  rng.refreshTrigger.setValue(Math.random(1, 10));
  return;
};

function advSearch(response) {
  
  if(sheet.getName().indexOf("Inv") <= -1) sheet = mainInventory;
  var invProfile = sheet.getRange("axieInvEthAddr").getValue(),
      ethAddr = !invProfile ? defaultProfile: invProfile,
      p = JSON.parse(JSON.stringify(response)),
      template = axieTemp2_;
  
  Logger.log("param");
  Logger.log(p);
//  Logger.log(ethAddr);
  
  //define where we search, all or user axies.
  
  var searchStep1;
  if(p.mine == "true") {
    searchStep1 = Ai.getMyAxies;
    p.address = ethAddr;
    
  } else searchStep1 = Ai.getAllAxies;
  
  Logger.log(searchStep1);
  //get base data for axieinfinity, then pass to deeper searches
  //Clean object and record other search params
  delete p.mine;
  var srchName = p.name,
      setBreedCount = p.breedCount;
  
  

  delete p.name;
  delete p.breedCount;
  cleanObj(p);
  
  Logger.log("param");
  Logger.log(p);
  //get base axie list
  var axies = searchStep1(p),
      totalFound = axies.totalAxies;
  axies = axies.axies;
  
  Logger.log(axies);
  
  // Filter by breed count
  if(setBreedCount) {
    Logger.log("Checking breedcount:>")
    Logger.log("  set breedcount:>")
    Logger.log(setBreedCount)
    var f1Axies = axies.filter(function (axie) {
      return axie.breedCount === setBreedCount;
    });
  } else { var f1Axies = axies; };
  Logger.log(f1Axies);
  
  
  // Filter by name if requested
  if(srchName) {
    Logger.log("searching by name");
    Logger.log("srchNAme");
    Logger.log(srchName);
    var f2Axies = axieSearchName(srchName, "", f1Axies, template),
        searchResult = f2Axies;
  } else { 
    //Prepare axie data for spreadsheet. Done automatically when searching in names.
    var searchResult = f1Axies.map(function(axie) {
      return template(axie);
    }); 
  };
  
  
  //If nothing found
  if(!searchResult.length){
    Logger.log("Nothing found");
    searchResult = [["Nothing found with \""+ response.getResponseText()+ "\" in your axie inventory."]];
  }
  
  var dataRange = sheet.getDataRange();
  Logger.log("Search results:");
  Logger.log(searchResult);
  
  dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
  dataRange.offset(2, 1, searchResult.length, searchResult[0].length).setValues(searchResult);
  rng.refreshTrigger.setValue(Math.random(1, 10));
  return;
}



function searchAxiesByName(response) {
  
  if(sheet.getName().indexOf("Inv") <= -1) sheet = mainInventory;
  var invProfile = sheet.getRange("axieInvEthAddr").getValue(),
      ethAddr = !invProfile ? defaultProfile: invProfile;
  
  //    Logger.log(response.name);
  //    Logger.log(ethAddr);
  
  var searchResult = axieSearchName(response.name, ethAddr, "", axieTemp2_);
  var dataRange = sheet.getDataRange();
  Logger.log(searchResult);
  
  //If nothing found
  if(!searchResult.length){
    Logger.log("Nothing found");
    searchResult = [["Nothing found with \""+ response.getResponseText()+ "\" in your axie inventory."]];
  }
  
  dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
  dataRange.offset(2, 1, searchResult.length, searchResult[0].length).setValues(searchResult);
  rng.refreshTrigger.setValue(Math.random(1, 10));
  return;
};

  
  
  
  