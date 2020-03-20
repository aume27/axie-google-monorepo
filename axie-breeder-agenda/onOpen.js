// Create a menu in google sheet ui.
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  var agendaMenu = ui.createMenu('**Axie agenda tools**'),
      inventoryMenu = ui.createMenu('**Axie inventory tools**'),
      extraTools = ui.createMenu('**Extra tools**');
      
  agendaMenu
    .addItem('Refresh/load', 'updatePlan')
    .addItem('Scan babies', 'scanForBabies')
    .addItem('Save breeds.', 'saveToHistory')
    .addSeparator()
    .addItem('Create new plan', 'createPlanSheet')
    .addItem('Create new history', 'createHistSheet')
    .addSeparator()
    .addItem('Update all plans', 'updateAllPlans')
  .addToUi();
  
  inventoryMenu
    .addItem('Refresh inventory', 'axieInventory')
    .addItem('Name search(inv. only)', 'nameSearchMenu')
    .addItem('Advanced search', 'advSearchMenu')
  .addToUi();

  extraTools
    .addItem('Invert cells value(select horizontal cells and invert tips', 'switchPlaces')
  .addToUi();
  
//  ui.createMenu('**TEST MENU**')
//    .addItem('tst_scanForBabies', 'tst_scanForBabies')
//  .addToUi();
}