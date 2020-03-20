

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


function tst(data) {
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
  Logger.log(axieSearchByName("a.dps", "0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b")); //, axieTemp2_)); //tst5 search for and in axies name.
  
//  //testing way to retreive data for sheet.
//  var data = ss.getSheetByName("plan: Bug deck").getDataRange().getValues();
//  Logger.log(typeof(data[3][2]));
//  Logger.log(data);
//  return data;
  
  //test first part in script, get axies lists and get data about them.
//  updatePlan("tstPlan"); //success
  
  //test create history and plan sheet.
//  saveToHistory("tstPlan");
  scanForBabies("tstPlan");
//  axieInventory()
}


/** Spreadsheet tests
/=getSingleAxie(128535)
/=axieSearchEncyclopedia("" ,"","" ,"" ,"" ,4, "beast","", "" ,"", "", "", "tail-the-last-one", "horn-imp")
/=getBodyParts()
/=getMyAxies("0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b","" ,"","" ,"" ,"" ,"", "","", "" ,"", "", "", "mouth-toothless-bite")
/=getActivityPoints(27706, 100000,100001,100002,100003,100004,100005,100006,100007,100008,100009,100010,100011,100012)
/=getCharm("0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b")
/=getTeams("0x72B786Ff9ef6D56A2B2dDDcfFF9bf78f353B145b", 100)
*/


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







function tst_scanForBabies(planName) {
  
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
  
  Logger.log("sires");
  Logger.log(sires);
  Logger.log("Matron");
  Logger.log(matrons);
  
  
   //get axies data
  var axies = [{id: 1, sireId: 10, matronId: 20}, {id: 2, sireId: 30, matronId: 40}, {id: 3, sireId: 50, matronId: 60}, {id: 4, sireId: 10, matronId: 20}, {id: 5, sireId: 30, matronId: 40}, {id: 6, sireId: 30, matronId: 40}]
 
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
      
//      Logger.log("babies")
//      Logger.log(babies)

      if(babies.length > 0) {
      Logger.log("setting first baby id");
        plan.getRange(rowPos +i, 11).setValue('https://axieinfinity.com/axie/'+ babies[0]);
        Logger.log("splicing")
        Logger.log(babies.splice(0, 1));
      }
      
      while (babies.length > 0) {
        Logger.log("inserting rows");
        Logger.log("babies")
        Logger.log(babies)
        var baby =  babies[babies.length -1];
        Logger.log(baby);
        
        plan.insertRowAfter(rowPos+i);
        rowPos += 1;
        plan.getRange(rowPos+i, 11).setValue('https://axieinfinity.com/axie/'+ baby);
        Logger.log("splicing loop")
        Logger.log(babies.splice(babies.length -1, 1));
      };
      
    };
  };
  
  rng.refreshTrigger.setValue(Math.random(1, 10));
  return plan.getName();
};





/**
//notes on form output
//step1 sale, sorting, stage, class, pureness, region, title, mystic, num_mystic, parts
first sampleof the form return.
{AllORMine=true, sorting=latest_auction, name=, parts=[tail-fish-snack, , , ], pureness=3, mystic=1, id=, region=true, class=aquatic, tittle=}
#2
{stage=4, num_mystic=1, sorting=latest_auction, mineOrAll=true, name=, parts=, pureness=2, onSale=true, id=, region=true, title=, class=aquatic}
#3 
{stage=4, num_mystic=1, sorting=highest_price, mineOrAll=false, name=, parts=, pureness=2, id=, region=true, title=, class=bug}
#4 with postip
{sale=true, breedcount=, sorting=latest_auction, parts=[, , , , , ], name=, title=origin}
#5 with all search param used:
{mine=true, sale=true, stage=1, num_mystic=1, breedcount=3, sorting=latest_auction, pureness=1, parts=tail-nimo, name=dps4/4, region=true, title=origin, class=beast}
*/


/**
[
   19-12-07 09:   46:   51:   022 EST
]Multiple parts searched[
   19-12-07 09:   46:   51:   023 EST
]List of searched parts[
   19-12-07 09:   46:   51:   023 EST
]starting pagination[
   19-12-07 09:   46:   51:   024 EST
]https://axieinfinity.com/api/v2/axies?part=tail-the-last-one&part=horn-imp&offset=0&stage=4&class=beast[
   19-12-07 09:   46:   51:   364 EST
]starting page 1[
   19-12-07 09:   46:   51:   365 EST
]Total to process:186[
   19-12-07 09:   46:   51:   365 EST
]Total to offset:0[
   19-12-07 09:   46:   51:   367 EST
]https://axieinfinity.com/api/v2/axies?offset=12&stage=4&class=beast[
   19-12-07 09:   46:   52:   106 EST
]starting page 2[
   19-12-07 09:   46:   52:   106 EST
]Total to process:174[
   19-12-07 09:   46:   52:   107 EST
]Total to offset:12[
   19-12-07 09:   46:   52:   109 EST
]https://axieinfinity.com/api/v2/axies?offset=24&stage=4&class=beast[
   19-12-07 09:   46:   52:   860 EST
]starting page 3[
   19-12-07 09:   46:   52:   861 EST
]Total to process:162[
   19-12-07 09:   46:   52:   861 EST
]Total to offset:24[
   19-12-07 09:   46:   52:   864 EST
]https://axieinfinity.com/api/v2/axies?offset=36&stage=4&class=beast[
   19-12-07 09:   46:   53:   416 EST
]starting page 4[
   19-12-07 09:   46:   53:   417 EST
]Total to process:150[
   19-12-07 09:   46:   53:   417 EST
]Total to offset:36[
   19-12-07 09:   46:   53:   420 EST
]https://axieinfinity.com/api/v2/axies?offset=48&stage=4&class=beast[
   19-12-07 09:   46:   53:   950 EST
]starting page 5[
   19-12-07 09:   46:   53:   950 EST
]Total to process:138[
   19-12-07 09:   46:   53:   951 EST
]Total to offset:48[
   19-12-07 09:   46:   53:   953 EST
]https://axieinfinity.com/api/v2/axies?offset=60&stage=4&class=beast[
   19-12-07 09:   46:   54:   482 EST
]starting page 6[
   19-12-07 09:   46:   54:   483 EST
]Total to process:126[
   19-12-07 09:   46:   54:   484 EST
]Total to offset:60[
   19-12-07 09:   46:   54:   486 EST
]https://axieinfinity.com/api/v2/axies?offset=72&stage=4&class=beast[
   19-12-07 09:   46:   55:   061 EST
]starting page 7[
   19-12-07 09:   46:   55:   062 EST
]Total to process:114[
   19-12-07 09:   46:   55:   063 EST
]Total to offset:72[
   19-12-07 09:   46:   55:   065 EST
]https://axieinfinity.com/api/v2/axies?offset=84&stage=4&class=beast[
   19-12-07 09:   46:   55:   599 EST
]starting page 8[
   19-12-07 09:   46:   55:   599 EST
]Total to process:102[
   19-12-07 09:   46:   55:   600 EST
]Total to offset:84[
   19-12-07 09:   46:   55:   601 EST
]https://axieinfinity.com/api/v2/axies?offset=96&stage=4&class=beast[
   19-12-07 09:   46:   56:   164 EST
]starting page 9[
   19-12-07 09:   46:   56:   165 EST
]Total to process:90[
   19-12-07 09:   46:   56:   166 EST
]Total to offset:96[
   19-12-07 09:   46:   56:   168 EST
]https://axieinfinity.com/api/v2/axies?offset=108&stage=4&class=beast[
   19-12-07 09:   46:   56:   722 EST
]starting page 10[
   19-12-07 09:   46:   56:   723 EST
]Total to process:78[
   19-12-07 09:   46:   56:   724 EST
]Total to offset:108[
   19-12-07 09:   46:   56:   727 EST
]https://axieinfinity.com/api/v2/axies?offset=120&stage=4&class=beast[
   19-12-07 09:   46:   57:   280 EST
]starting page 11[
   19-12-07 09:   46:   57:   281 EST
]Total to process:66[
   19-12-07 09:   46:   57:   281 EST
]Total to offset:120[
   19-12-07 09:   46:   57:   283 EST
]https://axieinfinity.com/api/v2/axies?offset=132&stage=4&class=beast[
   19-12-07 09:   46:   57:   807 EST
]starting page 12[
   19-12-07 09:   46:   57:   808 EST
]Total to process:54[
   19-12-07 09:   46:   57:   809 EST
]Total to offset:132[
   19-12-07 09:   46:   57:   811 EST
]https://axieinfinity.com/api/v2/axies?offset=144&stage=4&class=beast[
   19-12-07 09:   46:   58:   341 EST
]starting page 13[
   19-12-07 09:   46:   58:   342 EST
]Total to process:42[
   19-12-07 09:   46:   58:   342 EST
]Total to offset:144





[
   19-12-07 09:   33:   35:   225 EST
]Multiple parts searched[
   19-12-07 09:   33:   35:   226 EST
]List of searched parts[
   19-12-07 09:   33:   35:   226 EST
]starting pagination[
   19-12-07 09:   33:   35:   557 EST
]Total axie found:10[
   19-12-07 09:   33:   35:   558 EST
][
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/123187/axie/axie-full-transparent.png",
      1),
      123187,
      theTerminator,
      beast,
      4,
      1,
      400,
      null,
      false,
      0,
      33,
      44,
      31,
      56,
      Neo,
      bug,
      eyes,
      1,
      Tiny Fan,
      aquatic,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Jaguar,
      beast,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0xb3b1a1193a0b7b48b46efc3c86b614b152c257d5,
      101055,
      115799,
      1574832446,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/116190/axie/axie-full-transparent.png",
      1),
      116190,
      R1-back/tail,
      beast,
      4,
      1,
      145,
      null,
      false,
      1,
      35,
      41,
      31,
      57,
      Nerdy,
      bug,
      eyes,
      1,
      Nyan,
      beast,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Mint,
      plant,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0x91ea02976870d5a037a78c5ba3b8bc4f3d9e4da0,
      98161,
      15745,
      1573684441,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/93707/axie/axie-full-transparent.png",
      1),
      93707,
      Axie #93707,
      beast,
      4,
      1,
      14,
      null,
      false,
      4,
      31,
      43,
      31,
      59,
      Chubby,
      beast,
      eyes,
      1,
      Innocent Lamb,
      beast,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Jaguar,
      beast,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0x0c2ccccc447e7b86524f73c20ebac195e721c584,
      90193,
      83991,
      1568930550,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/78217/axie/axie-full-transparent.png",
      1),
      78217,
      Yumbles-44,
      beast,
      4,
      1,
      2387,
      null,
      true,
      1,
      35,
      44,
      31,
      54,
      Sleepless,
      aquatic,
      eyes,
      1,
      Clover,
      plant,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Risky Beast,
      beast,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0xf8454a749418e5e8c6a116900b10c4b7c2573349,
      75654,
      69171,
      1563582959,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/70580/axie/axie-full-transparent.png",
      1),
      70580,
      DPS ALL-STAR MONSTAR,
      beast,
      4,
      1,
      167,
      null,
      false,
      5,
      31,
      43,
      31,
      59,
      Puppy,
      beast,
      eyes,
      1,
      Nyan,
      beast,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Jaguar,
      beast,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0x91ea02976870d5a037a78c5ba3b8bc4f3d9e4da0,
      66408,
      26711,
      1560924420,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/69171/axie/axie-full-transparent.png",
      1),
      69171,
      Ariel-44,
      beast,
      4,
      1,
      1538,
      null,
      true,
      3,
      34,
      44,
      31,
      55,
      Confused,
      plant,
      eyes,
      1,
      Pink Cheek,
      bird,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Risky Beast,
      beast,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0xf8454a749418e5e8c6a116900b10c4b7c2573349,
      38554,
      60681,
      1560568546,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/62911/axie/axie-full-transparent.png",
      1),
      62911,
      Ben,
      beast,
      4,
      1,
      22,
      null,
      false,
      1,
      38,
      41,
      31,
      54,
      Topaz,
      reptile,
      eyes,
      1,
      Sakura,
      plant,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Spiky Wing,
      bug,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0x143b3cd490077f730e6ca6f3e3a3eecbdb469754,
      38457,
      38092,
      1558802529,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/35267/axie/axie-full-transparent.png",
      1),
      35267,
      Axie #35267,
      beast,
      4,
      1,
      1930,
      null,
      true,
      2,
      34,
      44,
      31,
      55,
      Confused,
      plant,
      eyes,
      1,
      Innocent Lamb,
      beast,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Kingfisher,
      bird,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0x08797952462b82db639ddbfdef2ab1718ffa7676,
      17233,
      31041,
      1549868899,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/24042/axie/axie-full-transparent.png",
      1),
      24042,
      Axie #24042,
      beast,
      4,
      1,
      4722,
      null,
      true,
      5,
      31,
      43,
      31,
      59,
      Little Peas,
      beast,
      eyes,
      1,
      Nut Cracker,
      beast,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Risky Beast,
      beast,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0xe293390d7651234c6dfb1f41a47358b9377c004f,
      21254,
      21321,
      1547034135,
      null
   ],
   [
      =IMAGE(      "https://storage.googleapis.com/assets.axieinfinity.com/axies/17752/axie/axie-full-transparent.png",
      1),
      17752,
      Axie #17752,
      beast,
      4,
      1,
      108,
      null,
      false,
      4,
      34,
      45,
      31,
      54,
      Little Peas,
      beast,
      eyes,
      1,
      Curved Spine,
      reptile,
      ears,
      1,
      Axie Kiss,
      beast,
      mouth,
      1,
      Imp,
      beast,
      horn,
      1,
      Raven,
      bird,
      back,
      1,
      The Last One,
      bird,
      tail,
      1,
      0x08797952462b82db639ddbfdef2ab1718ffa7676,
      16456,
      13632,
      1545078983,
      null
   ]
]





[19-12-06 10:32:39:750 PST] Multiple parts searched
[19-12-06 10:32:40:208 PST] starting pagination
[19-12-06 10:32:41:051 PST] starting page 1
[19-12-06 10:38:05:301 PST] 500 pages limit reached.
 Limit to avoid breaking google quotas and other isssues, can be changed in function pagination
[19-12-06 10:38:05:302 PST] 1800.0
[19-12-06 10:38:05:369 PST] [
   [
      =IMAGE(
         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125097/axie/axie-full-transparent.png",
         1),
         125097,
         Axie #125097,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         31,
         45,
         31,
         57,
         Mavis,
         bird,
         eyes,
         1,
         Innocent Lamb,
         beast,
         ears,
         1,
         Goda,
         beast,
         mouth,
         1,
         Dual Blade,
         beast,
         horn,
         1,
         Cupid,
         bird,
         back,
         1,
         Rice,
         beast,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         106150,
         103092,
         1575213218,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125091/axie/axie-full-transparent.png",
         1),
         125091,
         Axie #125091,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         34,
         43,
         31,
         56,
         Topaz,
         reptile,
         eyes,
         1,
         Belieber,
         beast,
         ears,
         1,
         Axie Kiss,
         beast,
         mouth,
         1,
         Dual Blade,
         beast,
         horn,
         1,
         Cupid,
         bird,
         back,
         1,
         Hare,
         beast,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         113265,
         107857,
         1575211343,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125089/axie/axie-full-transparent.png",
         1),
         125089,
         Axie #125089,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         38,
         42,
         31,
         53,
         Cucumber Slice,
         plant,
         eyes,
         1,
         Belieber,
         beast,
         ears,
         1,
         Nut Cracker,
         beast,
         mouth,
         1,
         Scaly Spear,
         reptile,
         horn,
         1,
         Risky Beast,
         beast,
         back,
         1,
         Tadpole,
         aquatic,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         92355,
         105041,
         1575210793,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125088/axie/axie-full-transparent.png",
         1),
         125088,
         Axie #125088,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         34,
         41,
         31,
         58,
         Little Peas,
         beast,
         eyes,
         1,
         Sidebarb,
         reptile,
         ears,
         1,
         Axie Kiss,
         beast,
         mouth,
         1,
         Little Branch,
         beast,
         horn,
         1,
         Timber,
         beast,
         back,
         1,
         Rice,
         beast,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         92843,
         105347,
         1575210793,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125087/axie/axie-full-transparent.png",
         1),
         125087,
         Axie #125087,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         32,
         43,
         31,
         58,
         Little Peas,
         beast,
         eyes,
         1,
         Nyan,
         beast,
         ears,
         1,
         Nut Cracker,
         beast,
         mouth,
         1,
         Anemone,
         aquatic,
         horn,
         1,
         Risky Beast,
         beast,
         back,
         1,
         Nut Cracker,
         beast,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         103091,
         118034,
         1575210793,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125086/axie/axie-full-transparent.png",
         1),
         125086,
         Axie #125086,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         32,
         45,
         31,
         56,
         Mavis,
         bird,
         eyes,
         1,
         Nut Cracker,
         beast,
         ears,
         1,
         Nut Cracker,
         beast,
         mouth,
         1,
         Anemone,
         aquatic,
         horn,
         1,
         Hero,
         beast,
         back,
         1,
         Nut Cracker,
         beast,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         104274,
         115434,
         1575210724,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125084/axie/axie-full-transparent.png",
         1),
         125084,
         Axie #125084,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         35,
         47,
         31,
         51,
         Mavis,
         bird,
         eyes,
         1,
         Owl,
         bird,
         ears,
         1,
         Peace Maker,
         bird,
         mouth,
         1,
         Eggshell,
         bird,
         horn,
         1,
         Buzz Buzz,
         bug,
         back,
         1,
         Cattail,
         plant,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         105592,
         111104,
         1575210504,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125083/axie/axie-full-transparent.png",
         1),
         125083,
         Axie #125083,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         31,
         43,
         31,
         59,
         Mavis,
         bird,
         eyes,
         1,
         Zen,
         beast,
         ears,
         1,
         Goda,
         beast,
         mouth,
         1,
         Imp,
         beast,
         horn,
         1,
         Timber,
         beast,
         back,
         1,
         Hare,
         beast,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         106618,
         110562,
         1575210502,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125082/axie/axie-full-transparent.png",
         1),
         125082,
         Axie #125082,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         34,
         40,
         31,
         59,
         Puppy,
         beast,
         eyes,
         1,
         Puppy,
         beast,
         ears,
         1,
         Axie Kiss,
         beast,
         mouth,
         1,
         Rose Bud,
         plant,
         horn,
         1,
         Ronin,
         beast,
         back,
         1,
         Shiba,
         beast,
         tail,
         1,
         0xe293390d7651234c6dfb1f41a47358b9377c004f,
         117093,
         80624,
         1575210502,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125018/axie/axie-full-transparent.png",
         1),
         125018,
         Axie #125018,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         40,
         40,
         31,
         53,
         Zeal,
         beast,
         eyes,
         1,
         Innocent Lamb,
         beast,
         ears,
         1,
         Silence Whisper,
         plant,
         mouth,
         1,
         Strawberry Shortcake,
         plant,
         horn,
         1,
         Mint,
         plant,
         back,
         1,
         Cloud,
         bird,
         tail,
         1,
         0x3945476e477de76d53b4833a46c806ef3d72b21e,
         118702,
         89194,
         1575202461,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125017/axie/axie-full-transparent.png",
         1),
         125017,
         Axie #125017,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         38,
         44,
         31,
         51,
         Neo,
         bug,
         eyes,
         1,
         Curly,
         bird,
         ears,
         1,
         Silence Whisper,
         plant,
         mouth,
         1,
         Strawberry Shortcake,
         plant,
         horn,
         1,
         Origami,
         bird,
         back,
         1,
         Cloud,
         bird,
         tail,
         1,
         0x3945476e477de76d53b4833a46c806ef3d72b21e,
         97335,
         54197,
         1575202461,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125016/axie/axie-full-transparent.png",
         1),
         125016,
         Axie #125016,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         39,
         44,
         31,
         50,
         Neo,
         bug,
         eyes,
         1,
         Gill,
         aquatic,
         ears,
         1,
         Silence Whisper,
         plant,
         mouth,
         1,
         Strawberry Shortcake,
         plant,
         horn,
         1,
         Origami,
         bird,
         back,
         1,
         Cloud,
         bird,
         tail,
         1,
         0x3945476e477de76d53b4833a46c806ef3d72b21e,
         110338,
         76142,
         1575202461,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/125007/axie/axie-full-transparent.png",
         1),
         125007,
         Axie #125007,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         34,
         45,
         31,
         54,
         Kotaro?,
         bug,
         eyes,
         1,
         Gill,
         aquatic,
         ears,
         1,
         Hungry Bird,
         bird,
         mouth,
         1,
         Trump,
         bird,
         horn,
         1,
         Hero,
         beast,
         back,
         1,
         Ant,
         bug,
         tail,
         1,
         0x3945476e477de76d53b4833a46c806ef3d72b21e,
         117967,
         23331,
         1575202083,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/124881/axie/axie-full-transparent.png",
         1),
         124881,
         Axie #124881,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         38,
         45,
         31,
         50,
         Gecko,
         reptile,
         eyes,
         1,
         Tiny Fan,
         aquatic,
         ears,
         1,
         Hungry Bird,
         bird,
         mouth,
         1,
         Kendama,
         beast,
         horn,
         1,
         Green Thorns,
         reptile,
         back,
         1,
         Hare,
         beast,
         tail,
         1,
         0xeeadc5701b5fd25fbcc7fbf04b048cdb1fff1c65,
         70044,
         95821,
         1575174341,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/124880/axie/axie-full-transparent.png",
         1),
         124880,
         Axie #124880,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         45,
         40,
         31,
         48,
         Confused,
         plant,
         eyes,
         1,
         Lotus,
         plant,
         ears,
         1,
         Kotaro,
         reptile,
         mouth,
         1,
         Babylonia,
         aquatic,
         horn,
         1,
         Tri Spikes,
         reptile,
         back,
         1,
         Ant,
         bug,
         tail,
         1,
         0xeeadc5701b5fd25fbcc7fbf04b048cdb1fff1c65,
         68141,
         107234,
         1575174341,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/124877/axie/axie-full-transparent.png",
         1),
         124877,
         Axie #124877,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         44,
         37,
         31,
         52,
         Neo,
         bug,
         eyes,
         1,
         Puppy,
         beast,
         ears,
         1,
         Zigzag,
         plant,
         mouth,
         1,
         Bumpy,
         reptile,
         horn,
         1,
         Turnip,
         plant,
         back,
         1,
         Yam,
         plant,
         tail,
         1,
         0xeeadc5701b5fd25fbcc7fbf04b048cdb1fff1c65,
         65182,
         102142,
         1575174334,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/124802/axie/axie-full-transparent.png",
         1),
         124802,
         Axie #124802,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         36,
         46,
         31,
         51,
         Gero,
         aquatic,
         eyes,
         1,
         Risky Bird,
         bird,
         ears,
         1,
         Axie Kiss,
         beast,
         mouth,
         1,
         Oranda,
         aquatic,
         horn,
         1,
         Watering Can,
         plant,
         back,
         1,
         Cottontail,
         beast,
         tail,
         1,
         0x0752f5a7cf11e4e2cded7822c12989acf0c1ede9,
         119100,
         119099,
         1575152623,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/124790/axie/axie-full-transparent.png",
         1),
         124790,
         Axie #124790,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         38,
         45,
         31,
         50,
         Blossom,
         plant,
         eyes,
         1,
         Belieber,
         beast,
         ears,
         1,
         Piranha,
         aquatic,
         mouth,
         1,
         Trump,
         bird,
         horn,
         1,
         Pigeon Post,
         bird,
         back,
         1,
         Hot Butt,
         plant,
         tail,
         1,
         0x0752f5a7cf11e4e2cded7822c12989acf0c1ede9,
         118128,
         103021,
         1575145705,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/124772/axie/axie-full-transparent.png",
         1),
         124772,
         Axie #124772,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         37,
         41,
         31,
         55,
         Zeal,
         beast,
         eyes,
         1,
         Innocent Lamb,
         beast,
         ears,
         1,
         Nut Cracker,
         beast,
         mouth,
         1,
         Incisor,
         reptile,
         horn,
         1,
         Green Thorns,
         reptile,
         back,
         1,
         Cottontail,
         beast,
         tail,
         1,
         0x3945476e477de76d53b4833a46c806ef3d72b21e,
         118719,
         118606,
         1575140467,
         null
      ],
      [
         =IMAGE(         "https://storage.googleapis.com/assets.axieinfinity.com/axies/124770/axie/axie-full-transparent.png",
         1),
         124770,
         Axie #124770,
         beast,
         4,
         1,
         400,
         null,
         false,
         0,
         39,
         40,
         31,
         54,
         Telescope,
         aquatic,
         eyes,
         1,


...
*/
