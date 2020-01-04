/////////////////////////////////////Templates/////////////////////////////////////
/**
Templates for object to spreadsheet friendly arrays.
turn an objects in and array
generate headers
etc.
**/
var axieHeadTemp_ = function() {
     return ["Image","Id","Name","Class","Title","Axie stage","Level","Experience","Breedable",
             "breedcount","Hp","Speed","Skill","Morale",
             "Eyes >> name","class","stage",
             "Ears >> name","class","stage",
             "Mouth >> name","class","stage", "Move > name", "type", "attack", "defense", "accuracy", "description",
             "Horn >> name","class","stage", "Move > name", "type", "attack", "defense", "accuracy", "description",
             "Back  >> name","class","stage", "Move > name", "type", "attack", "defense", "accuracy", "description",
             "Tail >> name","class","stage", "Move > name", "type", "attack", "defense", "accuracy", "description", 
             "Owner","Sire","MatronId","Birth date", "Auction type","Actual sell price","End price","Days left"];
};


var axieTemp_ = function(a) {
  var axStats = [];
  
  function addEffect(axie, partIndex) {
    if(axie.parts[partIndex].moves[0].effects[0]) {
      return (axie.parts[partIndex].moves[0].effects[0].name +", " +axie.parts[partIndex].moves[0].effects[0].description);
    } else return "";
  };
  
  
  //Base axie data
  if(a.stage < 3) {
    //stage 1 egg and 2 larva
    axStats = [ ('=image(\"' +a.image +'\", 1)'), ('https://axieinfinity.com/axie/'+ a.id), a.name, "",
               a.title, a.stage, a.level, "", "", "" , "", "", "", "",
               "", "", "",
               "", "", "",
               "", "", "", "", "", "", "", "", "", 
               "", "", "", "", "", "", "", "", "", 
               "", "", "", "", "", "", "", "", "", 
               "", "", "", "", "", "", "", "", "",
               ('https://axieinfinity.com/profile/'+ a.owner), ('https://axieinfinity.com/axie/'+ a.sireId), ('https://axieinfinity.com/axie/'+ a.matronId),
               (Utilities.formatDate(new Date(a.birthDate * 1000), timeZone, "dd-MM-yyyy'_'HH:mm"))];
  } else if(a.stage < 4) {
    
    //stage 3 petite and 4 adult
    axStats = [ ('=image(\"' +a.image +'\", 1)'), ('https://axieinfinity.com/axie/'+ a.id), a.name, a.class,
               a.title, a.stage, a.level, "", false, "",
               a.stats.hp, a.stats.speed, a.stats.skill, a.stats.morale,
               a.parts[0].name, a.parts[0].class, a.parts[0].stage,
               a.parts[1].name, a.parts[1].class, a.parts[1].stage,
               a.parts[2].name, a.parts[2].class, a.parts[2].stage, a.parts[2].moves[0].name, a.parts[2].moves[0].type, a.parts[2].moves[0].attack, a.parts[2].moves[0].defense, a.parts[2].moves[0].accuracy, addEffect(a, 2),
               a.parts[3].name, a.parts[3].class, a.parts[3].stage, a.parts[3].moves[0].name, a.parts[3].moves[0].type, a.parts[3].moves[0].attack, a.parts[3].moves[0].defense, a.parts[3].moves[0].accuracy, addEffect(a, 3),
               a.parts[4].name, a.parts[4].class, a.parts[4].stage, a.parts[4].moves[0].name, a.parts[4].moves[0].type, a.parts[4].moves[0].attack, a.parts[4].moves[0].defense, a.parts[4].moves[0].accuracy, addEffect(a, 4),
               a.parts[5].name, a.parts[5].class, a.parts[5].stage, a.parts[5].moves[0].name, a.parts[5].moves[0].type, a.parts[5].moves[0].attack, a.parts[5].moves[0].defense, a.parts[5].moves[0].accuracy, addEffect(a, 5),
               ('https://axieinfinity.com/profile/'+ a.owner), ('https://axieinfinity.com/axie/'+ a.sireId), ('https://axieinfinity.com/axie/'+ a.matronId),
               (Utilities.formatDate(new Date(a.birthDate * 1000), timeZone, "dd-MM-yyyy'_'HH:mm"))];
  } else {
    //Stage 4 adult
    axStats = [ ('=image(\"' +a.image +'\", 1)'), ('https://axieinfinity.com/axie/'+ a.id), a.name, a.class,
               a.title, a.stage, a.level, a.exp, a.breedable, a.breedCount,
               a.stats.hp, a.stats.speed, a.stats.skill, a.stats.morale,
               a.parts[0].name, a.parts[0].class, a.parts[0].stage,
               a.parts[1].name, a.parts[1].class, a.parts[1].stage,
               a.parts[2].name, a.parts[2].class, a.parts[2].stage, a.parts[2].moves[0].name, a.parts[2].moves[0].type, a.parts[2].moves[0].attack, a.parts[2].moves[0].defense, a.parts[2].moves[0].accuracy, addEffect(a, 2),
               a.parts[3].name, a.parts[3].class, a.parts[3].stage, a.parts[3].moves[0].name, a.parts[3].moves[0].type, a.parts[3].moves[0].attack, a.parts[3].moves[0].defense, a.parts[3].moves[0].accuracy, addEffect(a, 3),
               a.parts[4].name, a.parts[4].class, a.parts[4].stage, a.parts[4].moves[0].name, a.parts[4].moves[0].type, a.parts[4].moves[0].attack, a.parts[4].moves[0].defense, a.parts[4].moves[0].accuracy, addEffect(a, 4),
               a.parts[5].name, a.parts[5].class, a.parts[5].stage, a.parts[5].moves[0].name, a.parts[5].moves[0].type, a.parts[5].moves[0].attack, a.parts[5].moves[0].defense, a.parts[5].moves[0].accuracy, addEffect(a, 5),
               ('https://axieinfinity.com/profile/'+ a.owner), ('https://axieinfinity.com/axie/'+ a.sireId), ('https://axieinfinity.com/axie/'+ a.matronId),
               (Utilities.formatDate(new Date(a.birthDate * 1000), timeZone, "dd-MM-yyyy'_'HH:mm"))];
  };
  //additional contextual data:
  if(a.auction) {
    axStats.push(a.auction.type, a.auction.buyNowPrice /div, a.auction.endingPrice /div, Number(a.auction.timeLeft/86400).toFixed(2));
  };
  return axStats;
};


//Body-part template
var bodyHeadTemp_ = function(a) {
  return ["Part id", "Name", "Type", "Class", "Special genes"];
};
var bodyTemp_ = function(a) {
  return [a.partId, a.name, a.type, a.class, a.specialGenes];
};




//Leaderboard 
var lboardHeadTemp_ = function() {
  return ["address", "name", "rank", "wins", "losses", "draws", "rating"];
}
var lboardTemp_ = function(a) {
  return [a.address, a.name, a.rank, a.wins, a.losses, a.draws, a.rating];
};




//Battle teams
var teamHeadTemp_ = function() {
  //21 data point
  return [ "Link", "owner", "teamId", "name", 
          "teamMember1 axieId", "part1", "part2", "part3", "part4", "position", 
          "teamMember2 axieId", "part1", "part2", "part3", "part4", "position", 
          "teamMember3 axieId", "part1", "part2", "part3", "part4", "position"];
};
var teamTemp_ = function(a) {
  return ['https://axieinfinity.com/team/' +a.teamId, a.owner, a.teamId, a.name, 
          'https://axieinfinity.com/axie/'+ a.teamMembers[0].axieId, a.teamMembers[0].moveSet[0].part, a.teamMembers[0].moveSet[1].part, a.teamMembers[0].moveSet[2].part, a.teamMembers[0].moveSet[3].part, a.teamMembers[0].position, 
          'https://axieinfinity.com/axie/'+ a.teamMembers[1].axieId, a.teamMembers[1].moveSet[0].part, a.teamMembers[1].moveSet[1].part, a.teamMembers[1].moveSet[2].part, a.teamMembers[1].moveSet[3].part, a.teamMembers[1].position, 
          'https://axieinfinity.com/axie/'+ a.teamMembers[2].axieId, a.teamMembers[2].moveSet[0].part, a.teamMembers[2].moveSet[1].part, a.teamMembers[2].moveSet[2].part, a.teamMembers[2].moveSet[3].part, a.teamMembers[2].position];
};




//Land market places
var landMarketHeadTemp_ = function() {
  return ["assetType", "sortingId", "realTokenId", "tokenId", "owner",
          "alias", "name", "type", "rarity", "landType", "row",
          "col", "description", "effects", "link",
          "listingIndex", "startingPrice",
          "currentPrice", "endingPrice", "Days left"];
};


var bundleHeadTemp_ = function() {
  return [
    ["Owner", "Listing index", "Starting price", "Current price", "Ending price", "Started on", "Finish on", "Days left"],
    ["      Item list --->","assetType", "realTokenId", "tokenId", "alias", "name", "type", "rarity", "row", "col", "description", "effects"]];
};


var bundleTemp_ = function(a, result) {
  //Bundle and onwer data
  result.push([a.owner, a.listingIndex, a.startingPrice /div, a.currentPrice /div, a.endingPrice /div, 
               Utilities.formatDate(new Date(a.startingTimestamp * 1000), timeZone, "dd-MM-yyyy'_'HH:mm"), Utilities.formatDate(new Date(a.endingTimestamp * 1000), timeZone, "dd-MM-yyyy'_'HH:mm"),
               Number(a.timeLeft/86400).toFixed(2)]);
  //Items data
  a.items.forEach(function(e) {
    if(e.assetType === "land") {
      var land = ["", e.assetType, e.realTokenId, "-",
                  "-", "-", e.landType, "-", e.row,
                  e.col, "-", "-"];
      result.push(land);
    } else if(e.assetType === "item") {
      var item = ["", e.assetType, e.realTokenId, e.tokenId,
                  e.alias, e.name, e.type, e.rarity, "-",
                  "-", e.description, e.effects];
      result.push(item);
    };
  });
  
  return result;
};


var itemTemp_ = function(a) {
  var item = [a.assetType, a.sortingId, a.realTokenId, a.tokenId, a.owner,
              a.alias, a.name, a.type, a.rarity, "-", "-",
              "-", a.description, a.effects, 'https://land.axieinfinity.com/item/'+ a.alias+ '/'+ a.sortingId];
  
  if(a.startingPrice) {
    item.push(a.listingIndex, a.startingPrice /div, a.currentPrice /div, a.endingPrice /div, Number(a.timeLeft/86400).toFixed(2));
  };
  
  return item
};


var landTemp_ = function(a) {
  var land = [a.assetType, a.sortingId, a.realTokenId, "-", a.owner,
              "-", "-", "-", "-", a.landType, a.row,
              a.col, "-", "-", 'https://land.axieinfinity.com/land/'+ a.row+ '/'+ a.col];
  
  if(a.startingPrice) {
    land.push(a.listingIndex, a.startingPrice /div, a.currentPrice /div, a.endingPrice /div, Number(a.timeLeft/86400).toFixed(2));
  };
  
  return land;
};



