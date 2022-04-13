//==========================
//  GLOBAL VARs
//==========================

//const tasksSelector = '.SpreadsheetTaskName' +
window.tasksSelector = '.SpreadsheetTaskName' +
  '.SpreadsheetTaskName--editable' +
  '.SpreadsheetGridTaskNameCell-taskName';

//const addElsToThisBarSelector = ".TopbarPageHeaderGlobalActions";
window.addElsToThisBarSelector = ".TopbarPageHeaderGlobalActions";
//const completedTaskClassName = "SpreadsheetGridTaskNameCell-taskName--completed";
window.completedTaskClassName = "SpreadsheetGridTaskNameCell-taskName--completed";
//const burgerMenu = document.querySelector(".AsanaBaseTopbar--showingBreadcrumbs");
window.burgerMenu = document.querySelector(".AsanaBaseTopbar--showingBreadcrumbs");

const uiElsToHide = [	//each of these selectors are classes WHICH COULD return MULTIPLE elements
  ".PageToolbarStructure",
  ".PageToolbarStructure--withoutBottomBorder",
  ".PageToolbarStructure.ProjectSpreadsheetGridPageToolbar",
  ".PageToolbarStructure--withoutBottomBorder.PageToolbarStructure.ProjectSpreadsheetGridPageToolbar",

  ".ProjectSpreadsheetGridPageToolbar",
  ".ProjectSpreadsheetAddTaskAndAggregationRow",
  ".ProjectSpreadsheetAddTaskAndAggregationRow-stickyCell.ProjectSpreadsheetAddTaskAndAggregationRow-stickyCell--compact",
  ".ProjectSpreadsheetAddTaskAndAggregationRow-stickyCell--compact",
  ".ProjectSpreadsheetAddTaskAndAggregationRow-stickyCell",

  ".SpreadsheetGridHeaderStructure",
  ".SpreadsheetRow.SpreadsheetRow--enabled.ProjectSpreadsheetAddTaskAndAggregationRow.ProjectSpreadsheetAddTaskAndAggregationRow--compact.ProjectSpreadsheetAddTaskAndAggregationRow-hasSubtaskToggle"
];
const uiElsToShrink = [	//each of these selectors are classes WHICH COULD return MULTIPLE elements
  "div.DropTargetTaskGroupHeader > div > div",
  "div.PotColumnName"
];

const completedTaskBgColor = null //"#334433";
const completedTaskTextColor = null //"#777777";