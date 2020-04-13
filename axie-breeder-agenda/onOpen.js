// Create a menu in google sheet ui.
function onOpen(e) {  
  Logger.log("Project opening");
  
  var ui = SpreadsheetApp.getUi();
  
  var agendaMenu = ui.createMenu('**Axie agenda tools**'),
      inventoryMenu = ui.createMenu('**Axie inventory tools**'),
      extraTools = ui.createMenu('**Extra tools**')
//      agendaSubMenu = ui.createMenu('') rmor
  
      
  //Set menu bar.    
  agendaMenu
    .addItem('Create new plan', 'createPlanSheet')
    .addItem('Process/Refresh plan', 'updatePlan')
    .addSeparator()
    .addItem('Scan babies', 'scanForBabies')
//  .addSubMenu( rmor
  .addToUi();
  
  inventoryMenu
    .addItem('Refresh inventory', 'axieInventory')
    .addItem('Name search(inv. only)', 'nameSearchMenu')
    .addItem('Advanced search', 'advSearchMenu')
  .addToUi();

  extraTools
    .addItem('Invert cells value(select horizontal cells and invert tips', 'switchPlaces')
  .addToUi();
  
  
//  ui.createMenu('**TEST MENU**') rmor
//    .addItem('tst_scanForBabies', 'tst_scanForBabies')
//  .addToUi();
  Logger.log("menus loaded");
  
  refresh();
}