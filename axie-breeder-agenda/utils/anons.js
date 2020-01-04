/*******************************************************************************
This file contain customFunction I made, feel free to copy them if you like what
you see.
*******************************************************************************/

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
  if(args.length >= maxParam) {
    for(var i = maxParam -1; i < args.length; i++) {
      containerArray.push(args[i]);
    };
    
    return containerArray;
  };
};



function pagination_(source, p, arrayId, totalId, offset, modifier, maxItem) {
  var arr = [],
      pBackup = JSON.stringify(p), // original param.
      response = source(p), //call to data source.
      tot = response[totalId], //total items found
      lmtReached = 0; // little variance trigger on final msg.
  
  maxItem = !maxItem ? 1000 : maxItem; /** Default max item. 
  (tested up to 2414 items, took very long to run and doesnt work from spreadsheet 
  but in script it works.)*/
  Logger.log("%s Items will be processed or less.", maxItem);
  
  function processItems(response, arrayId, modifier, containerArray, itemLimit){
    for(var i = 0; i < response[arrayId].length; i++) {
      if(containerArray.length >= itemLimit) break;
      if(!modifier)  containerArray.push( response[arrayId][i]) 
      else  containerArray.push(modifier( response[arrayId][i]));
    };
    return containerArray;
  };

  Logger.log("%s axies found", tot);  
  if(tot < offset) {
    Logger.log("Less then %s axies found", offset);
    processItems(response, arrayId, modifier,arr, maxItem);
    
  } else {
    while (tot > arr.length) {
       //Google limit control. will lod and add to spreadsheet a advise msg.
      if(arr.length >= maxItem) {
        var limit = (maxItem +" item limit reached.\n Limit to avoid breaking google quotas, exceed run time limit, set in function pagination_ in utils/anons.gs");
        Logger.log(limit);
        arr.push([limit]);
        lmtReached ++;
        break;
      };
      
      processItems(response, arrayId, modifier, arr, maxItem);
      
      if(tot <= arr.length) break;

      p = JSON.parse(pBackup);
      p.offset += arr.length;
      response = source(p);
    }; 
  };
  if(Array.isArray(arr[0])) {
    arr.push([arr.length - lmtReached, tot, "This is the items you've retreived so far and the total item found. You can start a new request and set offset param to this number and continue."]);
    Logger.log("Finished pagination.");
  }
  return arr;
};



/** https://stackoverflow.com/a/48046426/9588601
 * Takes a 2D array with element arrays with differing lengths
 * and adds empty string elements as necessary to return 
 * a 2D array with all element arrays of equal length.
 * @param {array} ar
 * @return {array}
 */
function symmetric2DArray_(ar){
  var maxLength;
  var symetric = true;
  if (!Array.isArray(ar)) return [['not an array']];
  ar.forEach( function(row){
    if (!Array.isArray(row)) return [['not a 2D array']];
    if (maxLength && maxLength !== row.length) {
      symetric = false;
      maxLength = (maxLength > row.length) ? maxLength : row.length;
    } else { maxLength = row.length }
  });
  if (!symetric) {
    ar.map(function(row){
      while (row.length < maxLength){
        row.push('');
      }
      return row;
    });
  }
  return ar
}



function addHeader_(trigger, array, headerTemp) {
  if(trigger) {
    array.unshift(headerTemp);
  };
  
  return array;
};