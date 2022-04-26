//==========================
//  GLOBAL VARs
//==========================

//const tasksSelector = '.SpreadsheetTaskName' +
//window.tasksSelector = ".SpreadsheetTaskName.SpreadsheetTaskName--editable.SpreadsheetGridTaskNameCell-taskName";
//window.taskParentsSelector = ".SpreadsheetCell--isCompact.SpreadsheetCell--withoutLeftBorder.SpreadsheetCell.SpreadsheetGridTaskNameCell--rainbow.SpreadsheetGridTaskNameCell.SpreadsheetTaskRow-nameCell";
window.tasks_Selector = "div.SpreadsheetCell.SpreadsheetGridTaskNameCell.SpreadsheetTaskRow-nameCell";
window.tasksSubLabel_Selector = "label.SpreadsheetTaskName.SpreadsheetTaskName--editable.SpreadsheetGridTaskNameCell-taskName";
//window.tasksSubLabelDiv_Selector = "div.SpreadsheetTaskName--shadow";
window.tasksSubLabelDiv_Selector = "div";
window.detailsPane_Selector = ".FullWidthPageStructureWithDetailsOverlay-detailsOverlay";
window.detailsPane_visibleClass = "FullWidthPageStructureWithDetailsOverlay-detailsOverlay--visible";

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