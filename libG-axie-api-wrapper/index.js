/************************************************************
Instructions:
- There is two ways of using a library in google
  1. copy paste it in your project.
  2. use the script id in the library project properties. For more info visit https://developers.google.com/apps-script/guides/libraries.
     The actual library script id is: 1XQhNeKBi0ONR7_0iVM94DlQzi1Hwh8wvB_zCJxrnyiphMY_3AjudC6Qi


Credits:
  - @27aume, Author.

References to AxieInfinity.com api and development:
  -Unofficial API documentation:
  https://pacxiu.github.io/AxieInfinityAPI
  -Introdution to build mini-game and tools:
  https://medium.com/@kreatywnikreatywnym/axie-infinity-tutorial-paint-my-axies-vanilla-js-cd70cf8c6adb

GAS (googleAppScript) facts:
  - A script that uses a library does not run as quickly as
    single script project. Recommend to copy this code to
    a script file in your project.
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

Copyright (c) November 2019 Guillaume MD, @27aume

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



/**
 * Uri Map - To store api end points
 */
var um_ = {
  //roots
  r: "https://axieinfinity.com",
  r2: "https://lunacia.skymavis.com/game-api",
  rv1: "https://api.axieinfinity.com/v1",
  rv2: "https://axieinfinity.com/api/v2",
  // axie inventory and info on parts //uses api v2
  ax: {
    axies: "/axies", //add:  + "/AXIE_ID" to get a single axie
    bodyPrts: "/body-parts",
    byAddr: "/addresses",//add:  + "/ETH_ADDRESS/axies" to get a list of your axies.
    smallLoveP: "/clients" //add /ETH_ADDRESS/items/1"
  },
  //battle operation and data // Uses api v1
  btl: {
    //Ethereum account battle data
    profile: "/battle/accounts", // add: + "/ETH_ADDRESS"
    //Charm rel data
    charm: "/battle/battle/check-charm", // add: + "/ETH_ADDRESS"
    //Axies activity point count
    activity: "/battle/battle/activity-point",
    //Queue a team
    queue: "/battle/battle/queue",
    //remaining practice matches count
    practice: "/battle/dynamicBattle/practice-quota",
    //get count on pending challenges
    pendingPractice: "/challenge/pending/",
    //Leaderboard
    lBoard: "/battle/history/leaderboard",
    //Battle history
    hstRanked: "/battle/history/matches",
    hstPrac: "/battle/challenge/matches",
    //Axie teams data
    teams: "/battle/teams", // add: + "/TEAM_ID" //to get a specific team data.
    //Queue team
    queue: "/battle/battle/queue",
    //Update team
    upd: "/battle/teams/update",
    //Delete team
    del: "/battle/teams/delete",
    //Pending battles
    pendingBtl: "/battle/teams/pending", // add: + "/ETH_ADDRESS"
  },
  //Lunacia lands
  land: {
    acc: "/account-api/account/profile",
    //List of plots owned by profile
    plots: "/land-api/profile/land", // add: + "/ACCOUNT_ID"
    //Inventory
    inv: "/land-api/profile/inventory", // add: + "/ACCOUNT_ID"
    //Land marketplace
    market: "/marketplace-api/query-assets",
    chests: "/land-api/remaining-chests"
  }
};

var param_err_ethAdrr = "You must provide a valid ethereum address as a string. e.g. \"0x72b786ff9ef6d56a2b2dddcfff9bf78f353b145b\".",
    param_err_obj = "There is something missing in your param object. Refer to https://pacxiu.github.io/AxieInfinityAPI/#update-team for more information.",
    param_err_teamId = "You must provide a valid team Id as a string. e.g. \"fc6fa716-c578-4ab1-8ad6-9386477cbfb0\"."
      +"\nYou can find it in the url, when editing a team or by calling getTeams().",
    param_err_accId = "You must provide a valid account id as a number. e.g. 549.\n" +
      "You can find it using the land profile api call.";




/////////////////////////////////////Utils/////////////////////////////////////

/**
 * Rest parametter
 *
 * @param {number} maxParam Number of defined params and/or index of your rest param.
 * @param {arguments variable} args Simply pass the arguments variable of your parent function.
 * @param {array} containerArray The array that will store values of extending params.
 *
 * @return {array} Return an array of values to work with.
 */
function restParam_(maxParam, args, containerArray) {
  if(args.length > maxParam) {
    for(var i = maxParam -1; i < args.length; i++) {
//      Logger.log(args[i])
      containerArray.push(args[i]);
    };

    return containerArray;
  };
};



/**
* Turn object to query string\
*
* @param {object} obj Supply an paramter object.
* @param {boolean} start indicate if you are starting a new query string or appending to one.
* @return {string} query string to append at the end of an uri.
*/
function obj2queryStr_(obj, start) {
//  Logger.log("converting object to query string.");
  var queryS = "";
  
  if(obj) {
    //parametters properties
    var props = Object.keys(obj);
//    Logger.log(props);
    if(start) {
      if(Array.isArray(obj[props[0]])) {
        queryS += ("?" +props[0] +"=" +obj[props[0]][0]);
        obj[props[0]][0].shift();
        
        obj[props[0]].forEach(function(value) {
          queryS += ("&" +props[0] +"=" + value);
          
          //      Logger.log(queryS);
          return queryS;
        });
      } else {
        queryS += ("?" +props[0] +"=" +obj[props[0]]);
      }
      props.shift();
    };
    
    if (props.length >= 1) {
      
      props.forEach(function(prop) {
        if(Array.isArray(obj[prop])) {
          
          obj[prop].forEach(function(value) {
            queryS += ("&" +prop +"=" + value);
            
            //      Logger.log(queryS);
            return queryS;
          });
        } else {
          queryS += ("&" +prop +"=" +obj[prop]);
        };
        //      Logger.log(queryS);
        return queryS;
      });
    };
  };
//  Logger.log(queryS);
  return queryS;
};


/**
 * Process request to public api.
 *
 * @param {string} url
 *
 * @return {Object} response
 */
function pubReq_(url) {
  try {
    var headers = {
        'content-Type': 'application/json'
      },
      params = {
        'method': 'get',
        'headers': headers,
        'muteHttpExceptions': true
      },
      result = UrlFetchApp.fetch(url, params),
      response = JSON.parse(result.getContentText());
    
    return response;

  } catch(e) {
    Logger.log(e);
    return "\n error: " + e;
  };
};


/////////////////////////////////////Axies/////////////////////////////////////

/**
 * get Simgle Axie
 * Provide data about a defined axie.
 *
 * @param {number} axie the ID of the axie that you want data for.
 * @return {object} response with an array of all axies in obj.axies
 */
function getSingleAxie(axie) {

  if (!axie || isNaN(axie)) {
    return "getSingle() error.\n You must provide a valide AXIE_ID. E.g. 27777 as a number.";
  };

  var url = (um_.rv2 +um_.ax.axies),
      request = url +"/" +axie.toString(),
      response = pubReq_(request);

  // Logger.log(response);
  return response;
}



/**
 * get Multiple Axies
 * Provide data about a defined list of axies.
 *
 * @param {number} axies the list of ID.Each id as a param or an array of id.
 * @return {array} response an array of object by axie.
 */
function getMultiAxies(axies) {
  var axieIds = [],
      result = [];
  if(arguments.length > 1) {
  restParam_(1, arguments, axieIds);

  } else if (Array.isArray(axies)) {
    if(Array.isArray(axies[0])) {
      axieIds = axies.join().split(","); 
    } else {axieIds = axies; };
  };

  axieIds.forEach(function(id) {
    if(id) {
      var data = getSingleAxie(id);
      result.push(data);
    } else { result.push("")};
  });

//  Logger.log(result);
  return result;
}



/**
 * get All Axies
 * Provide data about all axies
 *   can be used with multiple params in addtion.
 *
 * @param {object} p parametters inclue many possibilities like pagination,
 *        sorting by parts, breeadable or not, etc.
 * @return {object} response with an array of all axies in obj.axies
 */
function getAllAxies(p) {
  var url = (um_.rv2 +um_.ax.axies),
      start = true;

  var queryStr = obj2queryStr_(p, start),
      request = (url +queryStr);

//  Logger.log(request);
  var response = pubReq_(request);

  //url sample:
  // https://axieinfinity.com/api/v2/axies
  //    ?mystic=true&offset=0&part=back-hermit

  // Logger.log(response);
  return response;
}



/**
 * get Body Parts
 * Provide data about all body-parts
 *
 * @return {array} response: an array of all parts as objects.
 */
function getBodyParts() {
  var url = um_.rv2 +um_.ax.bodyPrts,
      request = url;
      response = pubReq_(request);

  // Logger.log(response);
  return response;
}



/**
 * get By Address
 * Provide data about all axies for given ethereum address.
 *
 * @param {string} ethAddress ethereum address
 * @param {object} p parametters inclue many possibilities like pagination,
 *        sorting by parts, breeadable or not, etc.\
 *
 * @return {object} containing an array of all axies and their data.
 */
function getMyAxies(p) {

  //safe checks:
  if (!p.address || typeof(p.address) !== "string") {
    return "getMyAxies() error.\n" +param_err_ethAdrr;
  };

  var url = (um_.rv2 +um_.ax.byAddr +"/" +p.address +um_.ax.axies),
      start = true;

  
  var queryStr = obj2queryStr_(p, start),
      request = (url +queryStr)
//  Logger.log(request);
  var response = pubReq_(request);

  // Logger.log(response);
  return response;
}



/**
 * Check Small love potion data
 * Allows to get data about Love potion for given ETH Address. 
 * (Total owned, blockchain related data, etc.)
 * @param {string} ethAddress ethereum address
 *
 * @return {object} response object.
 */
function getSmallLoveP(ethAddress) {

  //safe checks.
  if (!ethAddress || typeof(ethAddress) !== "string") {
    return "getSmallLovePCount() error.\n" +param_err_ethAdrr;
  };

  var url = (um_.r2 +um_.ax.smallLoveP +"/" +ethAddress.toLowerCase() +"/items/1"),
      request = url,
      response = pubReq_(request);
  
  Logger.log(url)

  // Logger.log(response);
  return response;
}



/////////////////////////////////////Battles/////////////////////////////////////
/**
 * Check charm
 * Allows to get data about charm (Bean's Blessing) for given ETH Address.
 *
 * @param {string} ethAddress ethereum address
 *
 * @return {object} response object.
 */
function getCharm(ethAddress) {

  //safe checks.
  if (!ethAddress || typeof(ethAddress) !== "string") {
    return "getCharm() error.\n" +param_err_ethAdrr;
  };

  var url = um_.rv1 +um_.btl.charm +"/" +ethAddress,
      request = url,
      response = pubReq_(request);

  // Logger.log(response);
  return response;
}



/**
 * Activity Points:
 * Allows to get data about activity points for given Axies. Can request multiple ID's at once.
 *
 * @param {number or array} axies a single or an array of axie ID.
 *
 * @return {array} an array containing object by axie.
 */
function getActivityPoints(axies) {

  //safe checks.
  if(!Array.isArray(axies) && isNaN(axies)) {
    return "getActivityPoints() error.\nYou must provide a valide axie Id as a number or an array of axie IDs, e.g. 27706 or [ ..., 27706, 27777].";
  };

  if(Array.isArray(axies)) {
    var url = um_.rv1 +um_.btl.activity +"?axieId=" +axies[0];

    axies.shift();

    axies.forEach(function(axie) {
      url += ("&axieId=" +axie);

      //      Logger.log(url);
      return url;
    });

  } else {
    var url = um_.rv1 +um_.btl.activity  +"?axieId=" +axies;
  };

  var request = url,
      response = pubReq_(request);
  // Logger.log(response);
  return response;
}



/**
 * Leaderboard
 * Allows to get leaderboard data for given ETH Address. Shows top 30 players + given address if outside of top 30.
 *
 * @param {string} ethAddress ethereum address.
 *
 * @return {array} array cointaining object by profile.
 */
function getLboard(ethAddress) {

  //safe checks
  if (ethAddress && typeof(ethAddress) !== "string") {
    return "getLboard() error.\n" +param_err_ethAdrr;
  };

  var url = um_.rv1 +um_.btl.lBoard,
      request = url;

  if (ethAddress) request += ("?address=" +ethAddress);

  var response = pubReq_(request);

  // Logger.log(response);
  return response;
}



/**
 * Battle Profile:
 * Allows to get data about Ethereum Profile.
 *
 * @param {string} ethAddress ethereum address.
 *
 * @return {object} response object.
 */
function getBattleProfile(ethAddress) {

  //safe checks
  if (!ethAddress || typeof(ethAddress) !== "string") {
    return "getProfile() error.\n" +param_err_ethAdrr;
  };

  var url = um_.rv1 +um_.btl.profile +"/" +ethAddress,
       request = url;

  var response = pubReq_(request);

  // Logger.log(response);
  return response;
}



/**
 * Teams
 * Allows to get data about teams from profile.
 *
 * @param {object} p parametter object, include all desired params.
 *               Mandatory params:
 *                  Ethereum address
 *                  count. Number of team to request
 *               Other params: offset default is 0, no_limit.
 *
 * @return {object} response object.
 */
function getTeams(p) {

  //safe checks
  if (!p.address || typeof(p.address) !== "string") {
    return "getTeams() error.\n" +param_err_ethAdrr +" In your parametter object.";
  };
  if (!p.offset) {
    p.offset = 0;
  };
  if (!p.count) {
    return "getTeams() error.\n You must provide a count parametter indicating the number of teams to request. e.g. count: 99";
  };


  var url = um_.rv1 +um_.btl.teams +"/",
      queryS = obj2queryStr_(p, true),
      request = url +queryS,
      response = pubReq_(request);

  // Logger.log(response);
  return response;
}



/**
 * Team
 * Allows to get data about a team.
 *
 * @param {string} team provide a team id.
 *
 * @return {object} response object.
 */
function getTeam(teamID) {

  //safe checks
  if (!teamID || typeof(teamID) !== "string") {
    return "getTeam() error.\n" +param_err_teamId;
  };

  var url = um_.rv1 +um_.btl.teams,
      request = url +"/" +teamID;

  var response = pubReq_(request);

  // Logger.log(response);
  return response;
}



/////////////////////////////////////Lunancia/////////////////////////////////////
/**
 * Remaining Chests:
 * Allows to get data about remaining chests in land presale.
 *
 * @return {object}
 */
function getChests() {
  var url = (um_.r +um_.land.chests),
      request = url,
      response = pubReq_(request);

  // Logger.log(response);
  return response;
};



/**
 * Marketplace
 * Allows to get data about items on land marketplace.
 *
 * @param {object} p query params object
 * @return {object}
 */
function getMarket(p) {
  var url = (um_.r +um_.land.market),
      queryStr = obj2queryStr_(p, true),
      request = (url +queryStr),
      response = pubReq_(request);

  //  Logger.log(response);
  return response;
};


/**
 * Marketplace bundles
 * Allows to get data about items on land marketplace.
 *
 * @param {object} p query params object
 * @return {object}
 */
function getMarketBundles(p) {
  var url = um_.r +um_.land.market +"/bundles",
    queryStr = obj2queryStr_(p, true),
      request = url +queryStr,
        response = pubReq_(request);

  //  Logger.log(response);
  return response;
};
