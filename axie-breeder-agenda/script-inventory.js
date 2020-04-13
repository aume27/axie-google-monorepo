//////////////////////////////////Axie Inventory system//////////////////////////////////

// Search menus openers
function advSearchMenu() {

  var html = HtmlService.createHtmlOutputFromFile('html/sidebar-AdvSearch')
    .setWidth(370)
    .setHeight(740);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Advanced search menu');
}


function nameSearchMenu() {

  var html = HtmlService.createHtmlOutputFromFile('html/sidebar-NameSearch')
    .setWidth(450)
    .setHeight(300);

  SpreadsheetApp.getUi().showModalDialog(html, 'Name search menu');
}



//Load axie inventory
function axieInventory() {
  
  var invProfile = sheet.getRange("axieInvEthAddr").getValue(),
      ethAddr = !invProfile ? defaultProfile: invProfile,
      axieInv = pagination_(Ai.getMyAxies, {address: ethAddr, offset: 0}, "axies", "totalAxies", 12, axieTemp2_),
      dataRange = sheet.getDataRange();
  
  //add formula example to finish the list
  axieInv.push(["", "", "Use the formula: =axieSearchAddress(C2, NUMBER_TO_OFFSET_SPECIFIED_ABOVE)"]);
  
  axieInv = symmetric2DArray_(axieInv);
  
  dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
  dataRange.offset(2, 1, axieInv.length, axieInv[0].length).setValues(axieInv);
  
  refresh();
  return;
};





function advSearch(response) {
  
  //Signal that nothing was found.
  var sigEmptySearch_ = function(response, dataRange, searchResult) {
    Logger.log("Nothing found with this search:");
    Logger.log(response);
    
    searchResult = ["", "", "", "Nothing found with search:\""+ JSON.stringify(response)+ "\" , in your axie inventory."];
    
    dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
    sheet.appendRow(searchResult);
    return;
  };
  
  
  if(sheet.getName().indexOf("Inv") <= -1) sheet = mainInventory;
  
  var invProfile = sheet.getRange("axieInvEthAddr").getValue(),
      ethAddr = !invProfile ? defaultProfile: invProfile,
      p = JSON.parse(JSON.stringify(response)),
      dataRange = sheet.getDataRange();
  
  Logger.log("param"); 
  Logger.log(p);
  //  Logger.log(ethAddr); rmor
  
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
  //rmor
  
  try {
    //Base_search(1)
    var axies = searchStep1(p),
        totalFound = axies.totalAxies;
    
    axies = axies.axies; 
    Logger.log(axies);
    
    // Filter(1) by breed count
    if(axies.length > 0 && setBreedCount) {
      Logger.log("Checking breedcount:>")
      Logger.log("  set breedcount:>")
      Logger.log(setBreedCount)
      
      var f1Axies = axies.filter(function (axie) {
        return axie.breedCount === setBreedCount;
      });
      
    } else if (axies.length > 0) { 
      var f1Axies = axies; 
      
    } else {
      sigEmptySearch_(response, dataRange, f1Axies);
      return;
    }
    
    Logger.log("filtered 1")
    Logger.log(f1Axies);
    Logger.log(Boolean(f1Axies));
    Logger.log(f1Axies.length); //rmor
    
    
    // Filter(2) by name
    if(f1Axies.length > 0 && srchName) {
      Logger.log("searching by name");
      Logger.log("srchNAme");
      Logger.log(srchName);
      
      var f2Axies = axieSearchName(srchName, undefined, f1Axies, axieTemp2_);
      Logger.log(f2Axies); //rmor
      
      var searchResult = f2Axies;
      
    } else if (f1Axies.length > 0) { 
      //Prepare axie data for spreadsheet. Done automatically when searching in names.
      var searchResult = f1Axies.map(function(axie) {
        return axieTemp2_(axie);
      });
      
    } else {
      sigEmptySearch_(response, dataRange, f1Axies);
      return;
    } 
    
    
    //If nothing found
    if(!searchResult){
      sigEmptySearch_(response, dataRange, f1Axies);
      return;
    }
    
    Logger.log("Search results:");
    Logger.log(searchResult);
    
    dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
    dataRange.offset(2, 1, searchResult.length, searchResult[0].length).setValues(searchResult);
    
    refresh();
    
    return;
    
  } catch(e) {
    Logger.log("something went wrong!");
    Logger.log(e);
    // rmor SpreadsheetApp.getUi().alert("Something went wrong,\n You can contact the dev or check logs");
    return;
  }
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
  if(!searchResult){
    Logger.log("Nothing found");
    searchResult = [["Nothing found with \""+ response.getResponseText()+ "\" in your axie inventory."]];
  }
  
  dataRange.offset(2, 1, sheet.getLastRow(), sheet.getLastColumn()).clearContent();//clean sheet
  dataRange.offset(2, 1, searchResult.length, searchResult[0].length).setValues(searchResult);

  return;
};

  
  
  
  