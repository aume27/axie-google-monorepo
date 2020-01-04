/*******************************************************************************
This file contain customFunction I made, feel free to copy them if you like what
you see.
*******************************************************************************/


/**
 * Search by comparing values from an array to a specified object property value
 *        in an array of objects.
 *        then return the values of a different property for the matching objects.
 * @param {string} keyPropStr Name of the property that is used as key for comparison.
 * @param {string} searchedPropStr Name of the property to extract values from objArr.
 *                                It is possible to retreive the entire object using
 *                                the string "wholeObject" instead of a propertyName.
 * @param {array} keyValArr Values for key Property used for comparison.
 * @param {array} objArr List of object to search in.
 * @param {array} excepArr List of value to avoid searching.
 * Example:
 *         var keyValArr = [1, 2, 3 ];
 *         var objArr = [ {a: 1, b: 2, c: "boo", d: "Hello " },
 *                        {a: 2, b: 3, c: 1, d: "???"},
 *                        {a: 3, b: "...", c: 2, d: "world !" }];
 *         var excepArr = [2];
 *         srchByCmpr("a", "d", keyValArr, objArr, excepArr);
 *
 *         // → [["Hello", "From: 1"],
 *               ["Execption", "From: 2"]
 *               ["world !", "From: 3"]];
 * @return {array} Values requested from the list of objects .
 * @customFunction
 */
function srchByCmpr(keyPropStr, searchedPropStr, keyValArr, objArr, excepArr) {

  function chkAbsence(value2check, array) { //Avoid dependencies.

    if(array == undefined) return true ;

    function checkInequal(a) { return a != value2check };
    res = array.every(checkInequal);
    return res;
  };

  var searchedValues = [];
  keyValArr = typeof(keyValArr) == "string" ? [keyValArr] : keyValArr;
  if (!Array.isArray(keyValArr)) { return [errr, 'keyValues array not an array'] };
  if (!Array.isArray(objArr)) { return [errr, 'objArr not an array, must be an array of objects'] };
  keyValArr = keyValArr.join().split(","); //get1DArray

  for (var a = 0; a < keyValArr.length; a++) {
    if (searchedValues.length !== a) { searchedValues.push([keyValArr[a-1], "Missing", keyValArr[a-1]]) };

    if (chkAbsence(keyValArr[a].toLowerCase(), excepArr)) {

      for (var b = 0; b < objArr.length; b++) {

        if (objArr[b][keyPropStr] == keyValArr[a]) {
          if (searchedPropStr === "wholeObject") {
            searchedValues.push([objArr[b], keyValArr[a]]);
              break;
          } else {
            searchedValues.push([objArr[b][searchedPropStr], keyValArr[a]]);
              break;
          };
        };
      }
    } else {
      searchedValues.push([keyValArr[a], "Exception", keyValArr[a], "In exception list"]);
    };
  }

  while (searchedValues.length < keyValArr.length) { searchedValues.push(["", "Missing", "On end check"]) };
  //Return
  return searchedValues;
}



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
//      Logger.log(args[i])
      containerArray.push(args[i]);
    };
    
    return containerArray;
  };
};



function pagination_(source, p, arrayId, total, offset, modifier, maxPage) {
  var arr = [],
      pBackup = JSON.stringify(p), // original param.
      response = source(p), //call to data source.
      tot = response[total], //total items found
      page = 0; //count pages
  
  maxPage = !maxPage ? 500 : maxPage; // Default max page
  
  function processItems(response, arrayId, modifier, containerArray){
    response[arrayId].forEach(function(e) {
      if(modifier) {
        containerArray.push(modifier(e));
      } else {
        containerArray.push(e);
      };
    });
    return containerArray;
  };
  
  if(tot < offset) {
    processItems(response, arrayId, modifier,arr);
    p = JSON.parse(pBackup);
    
  } else {
    while (tot > arr.length) {
      
      processItems(response, arrayId, modifier, arr);
     
      if(tot <= arr.length) break;
      
      //Google limit control. 
      if(page >= maxPage) {
        var limit = (maxPage +" pages limit reached.\n Limit to avoid breaking google quotas and other isssues, can be changed in function pagination");
        Logger.log(limit);
        arr.push([limit], [arr.length, "<= This is the ammount of axies you've retreived so far. You can start a new request and set offset param to this number and continue. NB; "+
                  "Its is possible  that you are getting close to google daily quota limits"]);
        break;
      };
      p = JSON.parse(pBackup);
      p.offset = arr.length;
//      Logger.log("Pagination. Params");
//      Logger.log(p);
      
      page ++;
      response = source(p);
    }; 
  };
  
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