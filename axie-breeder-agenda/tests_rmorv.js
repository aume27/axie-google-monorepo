/**nnotes
- rmorv : remove of release version.
*/
function tst3_breedingPlannerSheet() { 
  
  //2020-04-10 


  //h20
  updatePlan("plan: tstPlan"); //success
  
  
  
  
  //2020-04-04 h16 
//  scanForBabies(sheet.getName());

  
  return;
}




function tst3_spreadsheetUtils() {
  
  
  //2020-04-10 
//  Logger.log("axie floor")
//  Logger.log(axiePricePetiteFloor())
//  Logger.log("petite floor")
//  Logger.log(axiePricePetiteFloor())
//  Logger.log(axiePriceFloor(true));
//  Logger.log("virgin")
//  Logger.log(axiePriceVirginFloor())
//  Logger.log("origin")
//  Logger.log(axiePriceSpecial("origin"))
//  Logger.log("mystic")
//  Logger.log(axiePriceSpecial("mystic"))
//  Logger.log("special")
//  Logger.log(axiePriceSpecial("japan","region"))
             
  
  
}

function tst(data) {
  
  
  
//  //2020-04-10 //h10:30
//  var listedBabies = ["a1","a2","a3","a4"];
//  var axies = [{id: "a1"},{id: "a5"}];
//  var axies1 = [{id: "a6"},{id: "a7"}];
//  var axies2 = [{id: "a1"},{id: "a2"}];
//  var axies3 = [{id: "a5"},{id: "a7"}];
//  
//  /** 
//  * Took it on modzilla JS docs.
//  *
//  */
//  function checkPresence_(arr, value2Check) {
//    return arr.some(function(arrVal) {
//      return value2Check === arrVal;
//    });
//  }
//  
//  var newBabies = axies2.filter(function (axie, index) {
//      if(!checkPresence_( listedBabies, axie.id)) { //'https://marketplace.axieinfinity.com/axie/'+ 
//        return true;
//      } else Logger.log("baby match, discarded: " + listedBabies[index]); 
//  });
//    
//  Logger.log(newBabies);

  
  
  //2020-04-04 h12 
//  // Is a valid numerical value. exclude null.
//  function validateN_(number) {
//    if (number === null) return false;
//    return (!isNaN(number) && number !== ""); //
//  }
//  Logger.log("empty string");
//  Logger.log(validateN_(""));
//  Logger.log("text");
//  Logger.log(validateN_("baby^"));
//  Logger.log("text number");
//  Logger.log(validateN_("152771"));
//  Logger.log("decimal text number");
//  Logger.log(validateN_("15.2771"));
//  Logger.log("number zero");
//  Logger.log(validateN_(0));
//  Logger.log("number");
//  Logger.log(validateN_(15));
//  Logger.log("decimal number");
//  Logger.log(validateN_(0.15));
//  Logger.log("undefined");
//  Logger.log(validateN_(undefined));
//  Logger.log("null");
//  Logger.log(validateN_(null));
//  /**
//  [20-04-04 11:54:50:741 EDT] empty string
//  [20-04-04 11:54:50:741 EDT] false
//  [20-04-04 11:54:50:742 EDT] text
//  [20-04-04 11:54:50:743 EDT] false
//  [20-04-04 11:54:50:743 EDT] number zero
//  [20-04-04 11:54:50:744 EDT] true
//  [20-04-04 11:54:50:744 EDT] number
//  [20-04-04 11:54:50:745 EDT] true
//  [20-04-04 11:54:50:745 EDT] undefined
//  [20-04-04 11:54:50:746 EDT] false
//  [20-04-04 11:54:50:746 EDT] null
//  [20-04-04 11:54:50:747 EDT] true
//  */
  
  //2020-04-02 h21
//  sheet = ss.getSheetByName("plan: tstPlan");
//  var pPrepIndex = function () { return sheet.getName().indexOf("plan: ") >= 0 ?  sheet.getRange("plan_prep_").getRow()  : ""; }/** plan sheet preparation section **/
//  var planIndex = function () { return sheet.getName().indexOf("plan: ") >= 0 ?  sheet.getRange("plan_").getRow() : ""; }
//  var pd = loadPlanData(sheet, planIndex());
////  Logger.log(pd.prepLength);
//  Logger.log(pPrepIndex());
//  Logger.log(planIndex());
//  
//  //  2020-03-31 h18
//  var pPrepIndex = sheet.getName().indexOf("plan: ") >= 0 ?  sheet.getRange("plan_prep_").getRow() : ""; /** plan sheet preparation section **/
//  var planIndex = sheet.getName().indexOf("plan: ") >= 0 ?  sheet.getRange("plan_").getRow() : "";
//  
//  Logger.log(sheet.getName());
//  Logger.log(sheet.getName().indexOf("plan: ") >= 0);
//  Logger.log(pPrepIndex)
//  Logger.log(planIndex)
//  var toDel = sheet.getRange(pPrepIndex, 1, planIndex() - pPrepIndex, sheet.getLastColumn());
//  Logger.log(toDel.getA1Notation());
//  Logger.log(toDel.getHeight()  + pHeadL);
//  
//  /*
//  [20-03-31 18:42:59:039 EDT] plan: TEMPLATE
//  [20-03-31 18:42:59:040 EDT] true
//  [20-03-31 18:42:59:041 EDT] 3.0
//  [20-03-31 18:42:59:042 EDT] 25.0
//  [20-03-31 18:42:59:112 EDT] A3:P24
//  [20-03-31 18:42:59:113 EDT] 24.0
//  
//  [20-03-31 18:32:46:702 EDT] plan: TEMPLATE
//  [20-03-31 18:32:46:703 EDT] true
//  [20-03-31 18:32:46:703 EDT] 3.0
//  [20-03-31 18:32:46:704 EDT] 25.0
//  [20-03-31 18:32:46:755 EDT] A3:P27
//  [20-03-31 18:32:46:756 EDT] 27.0
//  */
  
  
  //2020-03-31 5pm
//  Logger.log(sheet.getRange('a7:c10').getLastRow());
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////OLDER TESTS (a mess)////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  //function tst1212(a1, a2, a3, a4) { // testing function argsToObj()
//  Logger.log("Length")
//  Logger.log(arguments.length)
//  Logger.log("first arg")
//  Logger.log(arguments[0])
//  Logger.log("args")
//  Logger.log(arguments)
//  
//  var paramObj = argsToObj_(4,["a1","a2","a3","a4"], arguments);
//  return paramObj;
//}
  
//  Logger.log(tst1212("hello", true, 12, [1,2,3,4,5]));
    //tst1212("hello", true, 12, [{obj: "tst"},{obj2: "tst2"}]));
  
  //function clearEmptyVals(n) { return n !== "" }; 
  //var a = ["", "sfdfd", 1, "", ""];
  //Logger.log(a.filter(clearEmptyVals));
  
  //  var sheet = ss.getSheetByName("Copy of offense").activate();
  //  Logger.log(sheet);
  //  sheet.appendRow(["hello world"]);
  
  
  //  Logger.log(Ai.getMyAxies({
  //    address: "0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b",
  //    stage: 1
  //  }));
  
  
  //  var ss = SpreadsheetApp.getActive(),
  //      sheet = ss.getActiveSheet(),
  //      cell = sheet.getActiveCell(),
  //      manager = ss.getSheetByName("Manager");
  //  Logger.log(manager);
  //  Logger.log(manager.getRange("mainEthAddr").getA1Notation());
  
  
  //  var out = new Array()
  //  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  //  for (var i=0 ; i<sheets.length ; i++) out.push( [ sheets[i].getName() ] );
  //  Logger.log(out);
  //  return out
  
  //  var planName = "plan: tstPlan"
  //  Logger .log(planName.split(": "));
};


function tst_priceFeed(){
  Logger.log(cgkoExtV2("bitcoin","","","market_data.current_price.usd"));
}


function tst2_breedingPlannerSheet() {
//  Logger.log(
    //typeof(sheet.getRange("plan_").getRow()));
    //sheet.getRange("plan_").getRow());
    //axieSearchByName("a.dps", "0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b")); //, axieTemp2_)); //tst5 search for and in axies name.
  
//  //testing way to retreive data for sheet.
//  var data = ss.getSheetByName("plan: Bug deck").getDataRange().getValues();
//  Logger.log(typeof(data[3][2]));
//  Logger.log(data);
//  return data;
  
  //test first part in script, get axies lists and get data about them.
  updatePlan("plan: tstPlan"); //success
  
  //test create history and plan sheet.
//  saveToHistory("tstPlan");
//  scanForBabies("tstPlan");
//  axieInventory()
}




function tsts_spreadsheetUtils() {
 var res = axieSearchEncyclopedia("", "", "1", "", "4", "plant", "", "", "", "", "", "mouth-toothless-bite", "tail-shrimp");
     // axieSearchAddress("0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b", "", "", "", "", "", "", "", "", "", "", "", "mouth-toothless-bite", "tail-shrimp");
    //axieGetSingle(27706)); //tst1
//  getBodyParts(); //tst3 test getBodyParts
  Logger.log(res);
  
  
  
//   Logger.log(getMultiAxies([27706, 27705, 27704]))
//   Logger.log(Ai.getMultiAxies(27706, 27705, 27704));
//  getSingleAxie(130000); //tst5 check response for different axie stages
//  toSheet(6-1, 2, 1, axieSearchEncyclopedia("" ,"" ,"" ,"" ,"" ,4, "beast" ,"", "" ,"", "", ""))//, "tail-the-last-one", "horn-imp")); //tst6 find the problem with getMyAxies()
//  Logger.log(getCharm("0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b")); //tst7
//  Logger.log(getActivityPoints(27706, 100000,100001,100002,100003,100004,100005,100006,100007,100008,100009,100010,100011,100012)); //tst8
//  Logger.log(getLboard()); //tst9
//  Logger.log(getTeams("0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b", 100)); //tst10
//  Logger.log(getTeam("b3e8e6f1-06e6-4d2d-a1ff-609a549aafb2")); //tst11
//  Logger.log(getMarket("", 100, "", "", "", "epic")); //Ai.getMarket().results[0]); //tst12
//  Logger.log(getMarketBundles("", 100, "", "", "", "")); //tst13
  
  //Wohooo core functions done and working properly (for the moment).
//  Logger.log(axiePriceFloor(true));
  //axieSearchEncyclopedia("" , "", "" ,"" ,"" ,"" ,4, "beast" ,"", "" ,"", "", "", "tail-the-last-one"));
  //axiePriceFloor(true));
  //axieSearchByName("a.dps", "0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b")); //, axieTemp2_)); //tst5 search for and in axies name.
    //simpleCheckBreedable(0,6, 150)); //tst4
    //getSmallLoveP("0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b")); //tst3
    //getAccAxieCount("0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b")); //tst2
    //isBreedable(124136)); //120885)); //tst1
}

function tst_library() {
  var tst = Ai.getMyAxies("0x72b786ff9ef6d56a2b2dddcfff9bf78f353b145b");
  Logger.log(tst);
}










