/*
 @customfunction
*/

/////////////////////////////////////Globals/////////////////////////////////////

//display prices properly.
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
function axieGetSingle(axie) {
  var axStats = axieTemp_(Ai.getSingleAxie(axie)),
      result = [axStats];
  
  addHeader_(showHead, result, axieHeadTemp_());
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
 * @param {trigger} sale A trigger to indicate if you want only axies on sale or not. can be a number like 0 or 1, string like "yes" or true.
 * @param {trigger} siring A trigger to indicate if you want only axies on siring or not. can be a number like 0 or 1, string like "yes" or true.
 * @param {string} sorting The sorting rule you want, can be latest_auction, lowest_price, highest_price, lowest_id, highest_id.
 * @param {trigger} breedable Set as true or false. Filter only breedable axies or not.
 * @param {number} stage The stage number. 1 egg, 2 larva, 3 petite or 4 adult
 * @param {string} class Filter by a certain class.
 * @param {number} pureness Filter by number of parts of the same class on axie.
 * @param {string} region Filter by region of origine like japan or international(standard).
 * @param {string} title Filter by title like origin, meo%20corp.
 * @param {trigger} mystic Filter only mystic axies
 * @param {number} num_mystic Filter by number of mystic parts on axies
 * @param {string} parts Filter by parts. This parametter is a restParam, just add more parametters holding the different parts the axie must have.
 *                 e.g.:Skip params before parts with "". Then add multiple parts separated by comas.
 *                      =axieSearchEncyclopedia("", "", "", "", "", "", "", "", "", "", "", "", "horn-imp", "back-snail-shell", "tail-gerbil")
 * @customfunction
 */
function axieSearchEncyclopedia(offset, sale, siring, sorting, breedable, stage, class, pureness, region, title, mystic, num_mystic, parts) {
  var p = {},
      partAr = [],
      axies = [];
  
  restParam_(13, arguments, partAr);
  
  //Build parametter object
  p.offset = offset ? offset: 0; //offset default to zero.
  if(sale) p.sale = "yes"; //Show only axie for sale
  if(siring) p.siring = "yes"; //Show only axie available for siring.
  if(sorting) p.sorting = sorting;
  if(breedable) p.breedable = "yes";
  if(stage) p.stage = stage;
  if(class) p.class = class;
  if(pureness) p.pureness = pureness;
  if(parts) p.part = partAr;
  if(region) p.region = region;
  if(title) p.title = title;
  if(mystic) p.mystic = mystic;
  if(num_mystic) p.num_mystic = num_mystic;
  Logger.log(p);
  
  //axie infinity return json off 12 axies at a time so i defaulted the pagination at 12.
  Logger.log("starting pagination");
  axies = pagination_(Ai.getAllAxies, p, "axies", "totalAxies", 12, axieTemp_);
  
  addHeader_(showHead, axies, axieHeadTemp_());
  return symmetric2DArray_(axies);
};



/**
 * Get Multiple Axies.
 * Provide data about a defined list of axies.
 *
 * @param {number} axies This parametter is a restParam, just add more parametters separated by comas holding the different axie ids.
 * @customfunction
 */
function axieGetMultiple(axies) {
  var axieIds = [],
      result = [];
  
  if(arguments.length > 1) {
  restParam_(1, arguments, axieIds);
    
  } else if (Array.isArray(axies)) {
        axieIds = axies.join().split(",");     
  };
  
  showHead = false
  axieIds.forEach(function(id) {
    if(id) {
    result.push(getSingleAxie(Number(id))[0]);
    } else { result.push(""); };
  });
  
  return result;
}



/**
 * Get axies By Address.
 * Provide data about all axies for given ethereum address.
 *
 * @param {string} ethAddress ethereum address
 * @param {number} offset The number of axies to skip.
 * @param {trigger} sale A trigger to indicate if you want only axies on sale or not. can be a number like 0 or 1, string like "yes" or true.
 * @param {trigger} siring A trigger to indicate if you want only axies on siring or not. can be a number like 0 or 1, string like "yes" or true.
 * @param {string} sorting The sorting rule you want, can be latest_auction, lowest_price, highest_price, lowest_id, highest_id.
 * @param {trigger} breedable Set as true or false. Filter only breedable axies or not.
 * @param {number} stage The stage number. 1 egg, 2 larva, 3 petite or 4 adult
 * @param {string} class Filter by a certain class.
 * @param {number} pureness Filter by number of parts of the same class on axie.
 * @param {string} region Filter by region of origine like japan or international(standard).
 * @param {string} title Filter by title like origin, meo%20corp.
 * @param {trigger} mystic Filter only mystic axies
 * @param {number} num_mystic Filter by number of mystic parts on axies
 * @param {string} parts Filter by parts. This parametter is a restParam, just add more parametters holding the different parts the axie must have.
 *                 e.g.:Skip params before parts with "". Then add multiple parts separated by comas.
 *                      =axieSearchEncyclopedia("", "", "", "", "", "", "", "", "", "", "", "", "horn-imp", "back-snail-shell", "tail-gerbil")
 * @customfunction
 */
function axieGetByAddress(address, offset, sale, siring, sorting, breedable, stage, class, pureness, region, title, mystic, num_mystic, parts) {
  var p = {},
      partAr = [],
      axies = [];
    
  restParam_(14, arguments, partAr);
  
  //Build parametter object
  if(address) p.address = address;
  p.offset = offset ? offset: 0; //offset default to zero.
  if(sale) p.sale = "yes"; //Show only axie for sale
  if(siring) p.siring = "yes"; //Show only axie available for siring.
  if(sorting) p.sorting = sorting;
  if(breedable) p.breedable = "yes";
  if(stage) p.stage = stage;
  if(class) p.class = class;
  if(pureness) p.pureness = pureness;
  if(parts) p.part = partAr;
  if(region) p.region = region;
  if(title) p.title = title;
  if(mystic) p.mystic = mystic;
  if(num_mystic) p.num_mystic = num_mystic;
  
  //axie infinity return json off 12 axies at a time so i defaulted the pagination at 12.
  Logger.log("starting pagination");
  axies = pagination_(Ai.getMyAxies, p, "axies", "totalAxies", 12, axieTemp_);
  
  addHeader_(showHead, axies, axieHeadTemp_());
  return symmetric2DArray_(axies);
};



/**
 * Search axies by name.
 *   Look trough your axies names for a defined piece of text, can be a part of the name or the full name.
 *
 * @param {string} nameSearch The string to search for in your axies name.
 * @param {string} ethAddress Address to import the axies from.
 * @customfunction
 */
function axieSearchByName(nameSearch, ethAddress, template, headTemplate) {
  var p = { address: ethAddress, offset: 0},
      axies = pagination_(Ai.getMyAxies, p, "axies", "totalAxies", 12),
      searchResult = [];
  
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
  
  axies.forEach(function(axie) {
        if(axie.name.indexOf(nameSearch) >= 0) {
          searchResult.push(template(axie));
        };
      });
  
  addHeader_(showHead, searchResult, headTemplate);
  return searchResult;
};



/**
 * Get account total axies.
 * 
 * @param {string} ethAddress Your ethereum address
 * @customfunction
 */
function axieAddressCount(ethAddress) {
  return Ai.getMyAxies({address: ethAddress}).totalAxies;
};


/**
 * Check Small love potion inventory.
 * Allows to get total Love potion for given ETH Address. 
 *
 * @param {string} ethAddress ethereum address
 * @customfunction
 */
function axieSmallLovePCount(ethAddress) {
  return Ai.getSmallLoveP(ethAddress).total;
}

/**
 * get Body Parts
 * Provide data about all body-parts
 *
 * @customfunction
 */
function axieBodyParts() {
  var parts = [],
      response = Ai.getBodyParts();
  
  response.forEach(function(part) {
    parts.push(bodyTemp_(part));
  })
  
  addHeader_(showHead, parts, bodyHeadTemp_());
  return symmetric2DArray_(parts);
};



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
 * Activity Points.
 * Allows to get data about activity points for given Axies. Can request multiple ID's at once.
 *
 * @param {number} axies This parametter is a restParam, just add more parametters separated by comas holding the different axie ids.
 * @customfunction
 */
function axieBtlActivityPoints(axies) { //can also use array of ids when used in google-app-script.
  var arr = [],
      result = [];
  
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
      result = [];
  
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
  var p = {},
      result = [];
  
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
  
  if(showHead) result = bundleHeadTemp_();
  
  response.results.forEach(function(bundle) {
    result = bundleTemp_(bundle, result);
    Logger.log(result)
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
function axieFreakCalcUrl(sireId, matronId) {
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
  
  if(typeof(lovePTotal) === "number") {
    var lpt = lovePTotal;
  } else if(!lovePTotal) {
    var lpt = Ai.getSmallLoveP(ethAddress) 
  }
  
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
function axieSimpleCheckBreedable(brdCntAx1, brdCntAx2, lovePTotal) {
  if (typeof(brdCntAx1) !== "number" || typeof(brdCntAx2) !== "number") {
    return "";
  }
  
  var lpCost = axieCountLPTC(brdCntAx1, brdCntAx2);
  
  if(lpCost <= lovePTotal) {
    return true;
  } else {
    return false;
  }
};



/**
 * Count total potion required for 2 axies to breed.
 * 
 * @param {number} brdCntAx1 The BreedCount of the sire to check.
 * @param {number} brdCntAx2 The BreedCount of the matron to check.
 * @customfunction
 */
function axieCountLPTC(brdCntAx1, brdCntAx2) {
  if (typeof(brdCntAx1) !== "number" || typeof(brdCntAx2) !== "number") {
    return "";
  };
  var lpCost = (axieCountLPCost(brdCntAx1) + axieCountLPCost(brdCntAx2));
  return lpCost;
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




