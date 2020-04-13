/*
 @customfunction
*/
/** Notes
- built as a "Two pager" script. Copy this file and "utils/anons-script".
*/
/////////////////////////////////////Globals/////////////////////////////////////

//display prices properly. adjust decimals
var div = 1000000000000000000;

//Set all functions to display header. to disable change it for false.
var showHead = true;





/////////////////////////////////////Axies/////////////////////////////////////

/**
 * Get Simgle Axie.
 *  Provide data about a defined axie.
 *
 * @param {number} axie the ID of the axie that you want data for.
 * @customfunction
 */
function axieSearchSingle(axie) {
  
  var axStats = axieTemp_(Ai.getSingleAxie(axie)),
      result = [axStats];
  
  
  addHeader_(showHead, result, axieHeadTemp_());
  
  Logger.log(result)
  return result;
}



/**
 * Get Multiple Axies.
 * Provide data about a defined list of axies.
 *
 * @param {number} axies This parametter is a restParam, just add more parametters separated by comas holding the different axie ids.
 * @customfunction
 */
function axieSearchMultiple(axies) {
  
  var axieIds = new Array(),
      result = new Array();
  
  if(arguments.length > 1) restParam_(1, arguments, axieIds);
  else if (Array.isArray(axies)) axieIds = axies.join().split(",");     
  
  showHead = false;
  
  
  axieIds.forEach(function(id) {
    if(id) result.push(getSingleAxie(Number(id))[0]);
    else result.push("");
  });
  
  
  Logger.log(result);
  return result;
}



/**
 * Search trough all axies:
 * Provide data about all axies.
 *   To skip a parametter add empty string.
 *   It is not recommended to use this function to load all axies. 
 *   Will exceed google max execution time limit. Try to make resonably precise searches like; 
 *   add the stage and the class, search for 2 parts at a time not one.
 *
 * @param {number} offset The number of axies to skip.
 * @param {number} display The number of axies to display.
 * @param {trigger} sale A trigger to indicate if you want only axies on sale or not. can be a number like 0 or 1, string like "yes" or true.
 * @param {string} sorting The sorting rule you want, can be latest_auction, lowest_price, highest_price, lowest_id, highest_id.
 * @param {number} stage The stage number. 1 egg, 2 larva, 3 petite or 4 adult
 * @param {string} class Filter by a certain class.
 * @param {number} pureness Filter by number of parts of the same class on axie.
 * @param {string} region Filter by region of origine like japan or international(standard).
 * @param {string} title Filter by title like origin, meo%20corp.
 * @param {trigger} mystic Filter only mystic axies
 * @param {number} num_mystic Filter by number of mystic parts on axies
 * @param {string} part Filter by parts. Add more inputs with the different parts the axie must have.
 *                 e.g.:Skip params. Then add multiple parts separated by semicolon.
 *                 =axieSearchEncyclopedia(""; ""; ""; ""; ""; ""; ""; ""; ""; ""; ""; ""; "horn-imp"; "back-snail-shell";...)
 * @customfunction
 */
function axieSearchEncyclopedia(offset, display, sale, sorting, stage, class, pureness, region, title, mystic, num_mystic, part) {
  
  var argNum = 12,//number of parametters in thsi function. for custom rest param.
      partAr = restParam_(argNum, arguments, []),
      axies = new Array();
  
  
  //Build parametter object
  offset = offset ? offset: 0; //offset default to zero.
  
  var p = argsToObj_(argNum, axieSearchParams, arguments);
  
  
  //axie infinity return json off 12 axies at a time so i defaulted the pagination at 12.
  Logger.log("Starting pagination");
  
  axies = pagination_(Ai.getAllAxies, p, "axies", "totalAxies", 12, axieTemp_, display);
  
  
  addHeader_(showHead, axies, axieHeadTemp_());
  
  return symmetric2DArray_(axies);
};



/**
 * Get axies By Address.
 * Provide data about all axies for given ethereum address. All option are OPTIONAL
 *
 * @param {string} ethAddress ethereum address
 * @param {number} offset The number of axies to skip.
 * @param {number} display Indicate how many axie to display.
 * @param {trigger} sale A trigger to indicate if you want only axies on sale or not. e.g: a number like 0 or 1.
 * @param {string} sorting The sorting rule you want, can be latest_auction, lowest_price, highest_price, lowest_id, highest_id.
 * @param {number} stage The stage number. 1 egg, 2 larva, 3 petite or 4 adult
 * @param {string} class Filter by a certain class.
 * @param {number} pureness Filter by number of parts of the same class on axie.
 * @param {string} region Filter by region of origine like japan or international(standard).
 * @param {string} title Filter by title like origin, meo%20corp.
 * @param {trigger} mystic Filter only mystic axies
 * @param {number} num_mystic Filter by number of mystic parts on axies
 * @param {string} part Filter by parts. Add more inputs with the different parts the axie must have.
 *                 e.g.:Skip params. Then add multiple parts separated by semicolon.
 *                 =axieSearchEncyclopedia(""; ""; ""; ""; ""; ""; ""; ""; ""; ""; ""; ""; "horn-imp"; "back-snail-shell";...)
 * @customfunction
 */
function axieSearchAddress(address, offset, display, sale, sorting, stage, class, pureness, region, title, mystic, num_mystic, part) {
  
  var argNum = 13,//number of parametters in thsi function. for custom rest param.
      partAr = restParam_(argNum, arguments, []),
      axies = new Array();

  
  //Build parametter object
  offset = offset ? offset: 0; //offset default to zero.
  
  axieSearchParams.unshift("address");
  
  var p = argsToObj_(argNum, axieSearchParams, arguments);
  
  //axie infinity return json off 12 axies at a time so i defaulted the pagination at 12.
  Logger.log("starting pagination");
  axies = pagination_(Ai.getMyAxies, p, "axies", "totalAxies", 12, axieTemp_, display);
  
  addHeader_(showHead, axies, axieHeadTemp_());
  return symmetric2DArray_(axies);
};



/**
 * Search axies by name.
 *   Look trough your axies names for a defined piece of text, can be a part of the name or the full name.
 *
 * @param {string} nameSearch The string to search for in your axies name.
 * @param {string} ethAddress Address to import the axies from.
 * @param {array} Src2axieList Use in script to input an array of axie objects.
 * 
 * @return A array of axies.
 * @customfunction
 */
function axieSearchName(nameSearch, Src1ethAddr, Src2axieList, template, headTemplate) {
  var searchResult = [];
  
  if(Src1ethAddr) {
    Logger.log("searching through account.");
    
    var p = { address: Src1ethAddr, offset: 0},
        axies = pagination_(Ai.getMyAxies, p, "axies", "totalAxies", 12);
    
  } else if (axieList) {
    
    Logger.log("searching through axie list.");
    if (!Array.isArray(axieList)) {
      
      Logger.log("Wrong axieList type, should provide an array of axie object"); 
      return new Error("Wrong axieList type, should provide an array of axie object");
    }
    
    if (typeof(axieList[0]) !== "object") {
      
      Logger.log("Wrong item type, should provide an array of axie object"); 
      return new Error("Wrong item type, should provide an array of axie object"); 
    }
    
    var axies = axieList;
  } else {
  
    logger.log("something went wrong with axie source input.");
    return new Error("something went wrong with axie source input.");
  }  
  
  // Default template.
  if (!template) {
    
    template = axieTemp_;
    
    headTemplate = axieHeadTemp_();
  } else { //defined template
    
    if(!headTemplate) { //headerless template.
      
      headTemplate = "";
      
      showHead = false;
    }
  }
  
  Logger.log("axie list aquired, template defined, starting filter");

  //Format data.
  axies.forEach(function(axie) {
    if(axie.name.indexOf(nameSearch) >= 0) searchResult.push(template(axie));
  });
  
  
  addHeader_(showHead, searchResult, headTemplate);

  Logger.log("Name search completed");
  Logger.log(searchResult);
  return searchResult;
};



/**
 * Get account total axies.
 * 
 * @param {string} ethAddress An ethereum address.
 *
 * @return {number} Total axie count by ethereum address.
 * @customfunction
 */
function axieTotalByAddress(ethAddress) {
  return Ai.getMyAxies({address: ethAddress}).totalAxies;
};


/**
 * Check Small love potion inventory.
 * Allows to get total Love potion for given ETH Address. 
 *
 * @param {string} ethAddress ethereum address
 * @customfunction
 */
function axieTotalAddressSLP(ethAddress) {
  return Ai.getSmallLoveP(ethAddress).total;
}

/**
 * get Body Parts
 * Provide data about all body-parts
 * 
 * @return {array} List of all parts.
 * @customfunction
 */
function axieGetBodyParts() {
  
  var parts = new Array(),
      response = Ai.getBodyParts();
  
  
  response.forEach(function(part) {
    parts.push(bodyTemp_(part));
  });
  
  
  addHeader_(showHead, parts, bodyHeadTemp_());
  
  return symmetric2DArray_(parts);
};

/////////////////////////////////////Axies markets/////////////////////////////////////


/** 
 * Get axies floor price (Default).
 * @customfunction
 */
function axiePriceFloor() {
  
  var stage = 4,
      p = {offset: 0, sale: "true", sorting: "lowest_price", stage: stage},
      cheapestAxieValue = (Ai.getAllAxies(p).axies[0].auction.buyNowPrice / div);
  
  return Number(cheapestAxieValue).toFixed(4);
}


/** 
 * Get petite floor price.
 * @customfunction
 */
function axiePricePetiteFloor() {
  
  var stage = 3,
      p = {offset: 0, sale: "true", sorting: "lowest_price", stage: stage},
      cheapestPetiteValue = (Ai.getAllAxies(p).axies[0].auction.buyNowPrice / div);
  
  return Number(cheapestPetiteValue).toFixed(4);
}


/** 
 * Get  virgin axie floor price.
 * @customfunction
 */
function axiePriceVirginFloor() {
  
  function virginOnly(a) { if(a.breedCount === 0) return a };
  
  function clearEmptyVals(n) { return n !== "" }; 
  
  var virgins = pagination_(Ai.getAllAxies, {offset: 0, sale: "true", sorting: "lowest_price", stage: 4}, "axies", "totalAxies", 12, virginOnly),
      cheapestVirgin = virgins.filter(clearEmptyVals)[0], //get cheapest adult virgin
      cheapestVirginValue = (cheapestVirgin.auction.buyNowPrice / div);
 
  return Number(cheapestVirginValue).toFixed(4); 
}


/** 
 * Get floor price for special axies
 * works only for 1part_mystic, title(origin, meo%20corp), region(japan)
 * 
 * @param {string} propValue Value of the property to search by. e.g:
 *                           mystic, origin, meo%20corp, japan.
 * @param {string} propertyN Name of the property to search by. Leave empty for mystic and origin. e.g:
 *                           title, region.
 * @customfunction
 */
function axiePriceSpecial(propValue, propertyN) {
  
  var stage = 4,
      p = {offset: 0, sale: "true", sorting: "lowest_price", stage: stage};
  
  //default query.
  if(!propValue || propValue === "origin") p.title ="origin";
  else if(propValue === "mystic") p.num_mystic = 1;
  else p[propertyN] = propValue;
   
  
  var cheapestAxieValue = (Ai.getAllAxies(p).axies[0].auction.buyNowPrice / div);
  
  return Number(cheapestAxieValue).toFixed(4);
}





/////////////////////////////////////Battles/////////////////////////////////////

/**
 * Check charm
 * Allows to get data about charm (Bean's Blessing) for given ETH Address.
 * Will return true or false if its is activated or not.
 *
 * @param {string} ethAddress ethereum address.
 * @customfunction
 */
function axieBtlCharm(ethAddress) {
  return Ai.getCharm(ethAddress).isCharmActivated;
};



/**
 * Activity Points:
 * Allows to get data about activity points for given Axies. Can request multiple ID's at once.
 *
 * @param {number} axies This parametter is a restParam, just add more parametters separated by comas holding the different axie ids.
 * @customfunction
 */
function axieBtlActivityPoints(axies) { //can also use array of ids when used in google-app-script.
  
  var arr = new Array(),
      result = new Array();
  
  restParam_(1, arguments, arr);
  Logger.log(arr);
  
  
  var response = Ai.getActivityPoints(arr);
  
  response.forEach(function(axie) {
    result.push([axie.axieId, axie.activityPoint]);
  });
  
  
  addHeader_(showHead, result, ["Axie id", "Activity points"]);
  
  return symmetric2DArray_(result);
};



/**
 * Get Leaderboard
 * Allows to get leaderboard data for given ETH Address. Shows top 30 players + given address if outside of top 30.
 *
 * @param {string} ethAddress ethereum address.
 * @customfunction
 */
function axieBtlLeaderboard(ethAddress) {
  
  var response = Ai.getLboard(ethAddress),
      result = new Array();
  
  response.forEach(function(user){
    result.push(lboardTemp_(user));
  });
  
  addHeader_(showHead, result, lboardHeadTemp_());
  return symmetric2DArray_(result);
};



/**
 * Get my Teams.
 * Allows to get data about teams from profile.
 *
 * @param {string} ethAddress Your ethereum address.
 * @param {number} count The number of team to retreive. Defaulted at 1000.
 * @param {number} offset Number of teams to skip.
 * @param {string} no_limit Add "no_limit" if you want all your teams.
 * @customfunction
 */
function axieGetMyTeams(ethAddress, count, offset, no_limit) {

  var p = new Object(),
      result = new Array();
  
  //Build parametter object
  if(ethAddress) p.address = ethAddress;
  
  p.count = count ? count: 1000; //offset default to zero.
  
  p.offset = offset ? offset: 0; //offset default to zero.
  
  if(no_limit) p.no_limit = no_limit;
    
  var response = Ai.getTeams(p);
  
  
  response.teams.forEach(function(team) {
    result.push(teamTemp_(team));
  });
  
  
  addHeader_(showHead, result, teamHeadTemp_());
  
  return symmetric2DArray_(result);
};



/**
 * Team
 * Allows to get data about a team.
 *
 * @param {string} team Id of the team to retreive data for.
 * @customfunction
 */
function axieGetTeam(teamId) {
  
    var result = [],
        response = Ai.getTeam(teamId);
  
  result.push(teamTemp_(response));
    
  addHeader_(showHead, result, teamHeadTemp_());
  
  return result;
};





/////////////////////////////////////Lunancia/////////////////////////////////////

/**
 * Marketplace
 * Allows to get data about items on land marketplace.
 *
 * @param {number} offset Number of items to skip
 * @param {number} count Number of items to retreive
 * @param {string} sorting Sort by highest_price, lowest_price, highest_price, lowest_id.
 * @param {string} search Search for a land, item, itemAlias. Category or item alias (eg - p3a is requesting MakerDao Bronze items)
 * @param {string} type Filter by type of item: savannah, forest, arctic, mystic, genesis.
 * @param {string} rarity Filter by rarity: common, rare, epic, mystic.
 * @customfunction
 */
function axieLandMarket(offset, count, sorting, search, type, rarity) {
  
  var p = {},
      result = [];
  
  
  p.offset = offset ? offset: 0; //offset default to zero.
  if(count) p.count = count;
  if(sorting) p.sorting = sorting;
  if(search) p.item_name = search;
  if(type) p.type = type;
  if(rarity) p.rarity = rarity;
  
  Logger.log(p)
  var response = Ai.getMarket(p);
  
  response.results.forEach(function(e) {
    
    if(e.assetType === "land") {
      result.push(landTemp_(e));
    } else if(e.assetType === "item") {
      result.push(itemTemp_(e));
    };
  });
  Logger.log(response.total);
  
  addHeader_(showHead, result, landMarketHeadTemp_());
  return symmetric2DArray_(result);  
};



/**
 * Marketplace bundles
 * Allows to get data about items on land marketplace.
 *
 * @param {number} offset Number of items to skip
 * @param {number} count Number of items to retreive
 * @param {string} sorting Sort by highest_price, lowest_price, highest_price, lowest_id.
 * @param {string} search Search for a land, item, itemAlias. Category or item alias (eg - p3a is requesting MakerDao Bronze items)
 * @param {string} type Filter by type of item: savannah, forest, arctic, mystic, genesis.
 * @param {string} rarity Filter by rarity: common, rare, epic, mystic.
 * @customfunction
 */
function axieLandMarketBundles(offset, count, sorting, search, type, rarity) {
  
  var p = {},
      result = [];
  
  
  p.offset = offset ? offset: 0; //offset default to zero.
  if(count) p.count = count;
  if(sorting) p.sorting = sorting;
  if(search) p.item_name = search;
  if(type) p.type = type;
  if(rarity) p.rarity = rarity;
  
  var response = Ai.getMarketBundles(p);
  Logger.log(response);
  
  if(showHead) result = bundleHeadTemp_();
  
  response.results.forEach(function(bundle) {
    result = bundleTemp_(bundle, result);
  });
  
  Logger.log(response.total);
  
  return symmetric2DArray_(result);  
};





/////////////////////////////////////Others/////////////////////////////////////

/**
 * Breeding Calculator
 *   Get link to breeding calculator.
 *
 * @param {numder} sireId
 * @param {number} matronId
 * @customfunction
 */
function axiePrintFreakCalcUrl(sireId, matronId) {
  return ("https://freakitties.github.io/axie/calc.html?sireId="+ sireId+ "&matronId="+ matronId);
}



/**
 * Check if an axie is breedable.
 * It calculate the total of potions required to breed for an axie pair and tell you if you have enought.
 * 
 * @param {number} axie1 The Id of the sire to verify if breedable.Can also be an axie object.
 * @param {number} axie2 The Id of the matron to verify if breedable.Can also be an axie object.
 * @param {string} ethAddress You ethereum address in case potion total and axie data are needed.
 * @param {number} lovePTotal (OPTIONAL) Your total number of potion.
 * @customfunction
 */
function axieCheckBreedable(axie1,axie2, ethAddress, lovePTotal) {
  
  if(typeof(axie1) === "object") {
    
    var ax1 = axie1,
        ax2 = axie2;
    
  } else if(typeof(axie1) === "number") {
    
    var ax1 = Ai.getSingleAxie(axie1),
        ax2 = Ai.getSingleAxie(axie2);
  };
  
  if(ax.stage <4) return false;
  
  
  var ax1BC = ax1.breedCount,
      ax2BC = ax2.breedCount;
  
  if(typeof(lovePTotal) === "number")  var lpt = lovePTotal;
  else if(!lovePTotal) var lpt = Ai.getSmallLoveP(ethAddress);

  var lpCost = (axieCountLPCost(ax1BC) + axieCountLPCost(ax2BC));
  
  if(lpCost <= lpt) return true;
  else return false;
};



/**
 * Check if an axie is breedable.
 * It calculate the total of potions required to breed for an axie pair and tell you if you have enought.
 * 
 * @param {number} brdCntAx1 The BreedCount of the sire to check.
 * @param {number} brdCntAx2 The BreedCount of the matron to check.
 * @param {number} lovePTotal Your total number of potion.
 * @customfunction
 */
function axieCheckBreedableSimple(brdCntAx1, brdCntAx2, lovePTotal) {
  
  if (typeof(brdCntAx1) !== "number" || typeof(brdCntAx2) !== "number") return "";
 
  var lpCost = axieCountLPTC(brdCntAx1, brdCntAx2);
  
  if(lpCost <= lovePTotal) return true;
  else return false;
};



/**
 * Count total potion required for 2 axies to breed.
 * LPTC = Love Potion Total Cost
 * 
 * @param {number} brdCntAx1 The BreedCount of the sire to check.
 * @param {number} brdCntAx2 The BreedCount of the matron to check.
 * @customfunction
 */
function axieCountLPTC(brdCntAx1, brdCntAx2) {
  
  if(validateN_(brdCntAx1) && validateN_(brdCntAx2)) {
    
    var lpCost = (axieCountLPCost(brdCntAx1) + axieCountLPCost(brdCntAx2));
    return lpCost;
  } 
  else return "";
};


/**
 * Count total potion required for a axie.
 * 
 * @param {number} breedcount The BreedCount of the axie to check.
 * @customfunction
 */
function axieCountLPCost(breedcount) {
  
  var pc = 0; //potion cost
  
  if(breedcount < 1) {
    pc += 100;
    
  } else if(breedcount < 2) {
    pc += 200;
    
  } else if(breedcount < 3) {
    pc += 300;
    
  } else if(breedcount < 4) {
    pc += 500;
    
  } else if(breedcount < 5) {
    pc += 800;
    
  } else if(breedcount < 6) {
    pc += 1300;
    
  } else if(breedcount < 7) {
    pc += 2100;
  };
  
  return pc;
};




