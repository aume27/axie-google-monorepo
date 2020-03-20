/**
 * Utility function and macros for any spreadsheet project.
 * 
 */
 
 
 
 function addHeader_(trigger, array, headerTemp) {
  if(trigger) {
    array.unshift(headerTemp);
  };
  
  return array;
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


 
 function switchPlaces() {
  var target = sheet.getActiveRange(), //.getRange('B2:D2'), 
      activities = target.getValues();
// Logger.log(target.getA1Notation())
 Logger.log(activities)
 var  leftAct = activities[0].splice(0, 1)[0],
      rightAct = activities[0].splice(activities[0].length -1, 1)[0];
  
  
  Logger.log(leftAct)
  Logger.log(rightAct)
  
  activities[0].unshift(rightAct);
  activities[0].push(leftAct);
  Logger.log(activities);
  target.setValues(activities);
//  Logger.log(sheet.getActiveRange().getValues());//.getA1Notation());
}



function countSheets(tag) {
  var sheets = ss.getSheets(),
      shtNames = [];
  
  for (var i= 0; i < sheets.length; i++) {
    var shtName = sheets[i].getName();
    if(shtName.indexOf(tag) >= 0) shtNames.push(shtName);
  };
  Logger.log("Pages that have been counted: "+ shtNames.join(", ")+ ".");
  return shtNames.length;
}



function deleteHtmlElement_(element) {
//  console.log("heres the element:", element);
//      console.log("removing inner html");
  element.innerHTML = "";
//      console.log("removing element", element);
  element.remove();
  return;
}

