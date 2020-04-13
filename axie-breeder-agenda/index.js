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
  //Sprdsht and sht
var ss = SpreadsheetApp.getActive(),
    sheet = ss.getActiveSheet(),
    cell = sheet.getActiveCell(),
    dashboardSht = ss.getSheetByName("Dashboard"),
    mainInventory = ss.getSheetByName("Inventory"); 

//predefined ranges, mostly relates to settings and dynamic ranges
var rng = { 
  mainAddress: dashboardSht.getRange("mainEthAddr"),
  refreshTrigger: dashboardSht.getRange("refreshTrig"),
  priceFeedQuote: dashboardSht.getRange("priceFeedQuote"),
  floorsIndex: dashboardSht.getRange("floorsIndex"),
  contentTable: dashboardSht.getRange("contentTableIndex")
}

var defaultProfile = rng.mainAddress.getValue(), //Ethereum address
    timeZone = Session.getScriptTimeZone(),
    actDate = function actDate() {
                return (Utilities.formatDate(new Date(), timeZone, "dd-MM-yyyy' 'HH:mm"))
              };

//////////////////////////////////Utils//////////////////////////////////
function refresh() {
  
  //Generate table of content
  var sheets = ss.getSheets(),
      contentTable = new Array();
  
  sheets.forEach(function(sht) {
    Logger.log(sht.getName());
    contentTable.push(['=HYPERLINK("' +getSheetUrl(sht) +'"; "' +sht.getName() +'")' ]);
  });
  
  rng.contentTable.offset(0,0, ss.getActiveSheet().getLastRow() - 2, 1).clearContent();
  rng.contentTable.offset(0,0, contentTable.length, contentTable[0].length).setFormulas(contentTable);

  Logger.log("finished loading content table");
  
  
  //Generate Axie market metrics.
  //Axie types floor prices.
  var axieFl = axiePriceFloor(),
      petiteFl = axiePricePetiteFloor(),
      virginFl = axiePriceVirginFloor(),
      originFl = axiePriceSpecial("origin"),
      mysticFl = axiePriceSpecial("mystic");

  var metrics = [["Floors"],[axieFl],[petiteFl],
                 [virginFl],[originFl],
                 [mysticFl]];
  
  rng.floorsIndex.offset(0,0,metrics.length).setValues(metrics);
  
    //Make in sheet formulas refresh.
  rng.refreshTrigger.setValue(Math.random(1, 10));
  
  return;
}




/**
 * List of check function  for axie/axiePair checks
 * pair check = 2 axie check
 */
// pair is check as complete dont process
function isDone(checkCellValue) {
  
  return checkCellValue == true;
}

// ids are not number dont process
function validateId(number) {
  
    if (number === null) return false;
  
    return (!isNaN(number) && number !== ""); //
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


//page jump buttons functions, for the lazy like me XD
function SwitchToDashboard() {
  
  ss.getSheetByName('Dashboard').activate();
};

function SwitchToInventory() {
  
  ss.getSheetByName('Inventory').activate();
};