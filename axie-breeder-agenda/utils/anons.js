/*******************************************************************************
This file contain customFunction I made, feel free to copy them if you like what
you see.
*******************************************************************************/



/**
 * Rest parametter
 *
 * @param {number} maxParam Number of defined params and/or index of your rest param.
 * @param {arguments variable} args Simply pass the arguments variable of your parent function.
 * @param {variable} container The array that will store values of extending params.
 *
 * @return {array} Return an array of values to work with.
 */
function restParam_(maxParam, args, container) {
  if(args.length > maxParam) {
    Logger.log("loopings args");
    for(var i = maxParam -1; i < args.length; i++) {
      Logger.log(args[i])
      if(args[i]) container.push(args[i]);
    };
    
//    Logger.log(container);
    
  } else if (args.length == maxParam) {
    Logger.log("Only one arg");
    Logger.log(args[args.length -1]);
    container = args[args.length -1];
    
    
  }
  Logger.log("log results")
  Logger.log(container);
  Logger.log("type of container: " + typeof(container));
  return container;
};



function pagination_(source, p, arrayId, totalId, paginationOffset, modifier, maxItem) {
  var pBackup = JSON.stringify(p), // original param.
      response = source(p), //call to data source.
      tot = response[totalId], //total items found.
      lmtReached = 0; // little variance trigger on final msg.
  
//  Logger.log(pBackup);
  Logger.log(response);
  
  maxItem = !maxItem ? 1000 : maxItem; /** Default max item. 
  (tested up to 2414 items, took very long to run and doesnt work from spreadsheet 
  but in script it works.)*/
  Logger.log("%s Items will be processed or less.", maxItem);
  //  Logger.log(response[arrayId]);
  
  function processItems(response, arrayId, modifier, containerArray, itemLimit){
    //    Logger.log(response);
    //    Logger.log(arrayId);
    //    Logger.log(response[arrayId]);
    //    Logger.log(typeof(response[arrayId]));
    
    for(var i = 0; i < response[arrayId].length; i++) {
      if(containerArray.length >= itemLimit) break;
      
      if(!modifier) containerArray.push(response[arrayId][i]);
      else {
        var item = modifier(response[arrayId][i])
        if(!item) item = "";
        containerArray.push(item);
      }
    };
    //    Logger.log(containerArray);
    return containerArray;
  };
  
  var containerArray = [];
  if(tot < paginationOffset) {
    Logger.log("Less then %s items found", paginationOffset);
    Logger.log("%s items found", tot);
    processItems(response, arrayId, modifier, containerArray, maxItem);
    
  } else {
    Logger.log("More then %s items found", paginationOffset);
    Logger.log("%s items found", tot);
    
    
    while (tot > containerArray.length) {
      //Google limit control. will lod and add to spreadsheet a advise msg.
      if(containerArray.length >= maxItem) {
        var limit = (maxItem +" item limit reached.\n Limit to avoid breaking google quotas, exceed run time limit, set in function pagination_ in utils/anons.gs");
        Logger.log(limit);
        containerArray.push([limit]);
        lmtReached ++;
        break;
      };
      
      processItems(response, arrayId, modifier, containerArray, maxItem);
      
      if(tot <= containerArray.length) break;
      
      p = JSON.parse(pBackup);
      p.offset = containerArray.length;
      response = source(p);
    }; 
  };
  if(Array.isArray(containerArray[0])) {
    containerArray.push([containerArray.length - lmtReached, tot, "This is the items you've retreived so far and the total item found. You can start a new request and set offset param to this number and continue."]);
    Logger.log("Finished pagination.");
  }
  return containerArray;
};



/**
 make sure your rest param is at the end of your propertyNameList
*/
function argsToObj_(expectedArgCount,propertyNameList, arguments) {
  var p = {},
      lastArgAr = restParam_(expectedArgCount, arguments, []);
  
  //Build parametter object
  for(var i = 0; i < propertyNameList.length; i++) {
    //If last property;
    if(i === propertyNameList.length -1 && lastArgAr) { 
      Logger.log("setting last param")
      Logger.log(typeof(lastArgAr));
      
      p[propertyNameList[i]] = lastArgAr; 
      break; 
    } else if(i === propertyNameList.length -1 && !lastArgAr) {
      Logger.log("no last param to set")
      p[propertyNameList[i]] = "";
      break;
    } else if(arguments[i]) {
      p[propertyNameList[i]] = arguments[i];
    }
  };
  
  Logger.log(p);
  return p;
}



/**
* Turn object to query string\
*
* @param {object} obj Supply an paramter object.
* @param {boolean} start indicate if you are starting a new query string or appending to one.
* @return {string} query string to append at the end of an uri.
*/
function obj2queryStr_(obj, start) {
  var queryS = "";
  
  if(obj) {
    //parametters properties
    var props = Object.keys(obj);
    Logger.log(props);
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
  Logger.log(queryS);
  return queryS;
};



// ids are not number dont process
function validateN_(number) {
  return (!isNaN(number) && number !== "");
}



/**
 * If checked value DOES NOT match with any of the values
 * in the array return true.
 * @customFunction
 */
function chkAbsence_(value2check, array) {
  if(array == undefined) return true ;

  function checkInequal(a) { return a !== value2check };

  var res = array.every(checkInequal);
  //  Logger.log("checkIfNoMatch:\n result: "+res);
  return res;
};



/**
 * Function to make sure rounding does not crash with toFixed().
 * Will only apply toFixed when possible else will return entry raw.
 */
function myToFixed_(number, decimal) {
  if (validateN_(number)) {
    return Number(number).toFixed(decimal);
  } else {
    return number;
  };
};



function cleanObj(obj) { //   https://stackoverflow.com/a/286162/9588601
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
      delete obj[propName];
    }
  }
}