function getHLCodesAsArray() {
  const bullets = [

    [ "|1", 
      [
        ["background-color", "white"],
        ["color", "black"]
      ]
    ],

    [ "|2", 
      [
        ["background-color", "yellow"],
        ["color", "black"]
      ]
    ],

    [ "|3", 
      [
        ["background-color", "DeepPink"],
        ["color", "white"]
      ]
    ],

    [ "|4", 
      [
        ["background-color", "red"]
      ]
    ],

    [ "|5",
      [
        ["background-color", "orange"]
      ]
    ],

    [ "|6", 
      [
        ["background-color", "purple"]
      ]
    ],

    [ "|7", 
      [
        ["background-color", "blue"],
        ["color", "white"]
      ]
    ],

    [ "|8", 
      [
        ["background-color", "beige"],
        ["color", "black"]
      ]
    ],

    [ "|9", 
      [
        ["background-color", "white"],
        ["color", "black"]
      ]
    ],

    [ "FUP", 
      [
        ["background-color", "turquoise"]
      ]
    ],

    [ "<>", 
      [
        ["background-color", "brown"],
        ["color", "yellow"]
      ]
    ],

    [ "√", 
      [
        ["background-color", "purple"],
        ["color", "white"]
      ]
    ],

    [ "√√", 
      [
        ["background-color", "#AAAAAA"],
        ["text-decoration", "underline"],
        ["color", "black"]
      ]
    ],

    [ "~~", 
      [
        ["font-style", "italic"],
        ["font-weight", "900"],
        ["text-shadow", "2px 2px #FF0000"]
      ]
    ],

    [ "[]", 
      [
        ["font-variant", "small-caps"]
      ]
    ],

    [ "{}", 
      [
        ["font-weight", "900"],
        ["text-decoration", "overline"],
      ]
    ]

  ];
  return bullets;
}
/*
    ["|1", "HStyle01"],
    ["|2", "HStyle02"],
    ["|3", "HStyle03"],
    ["|4", "HStyle04"],
    ["|5", "HStyle05"],
    ["|6", "HStyle06"],
    ["|7", "HStyle07"],
    ["|8", "HStyle08"],
    ["|9", "HStyle09"],
    ["FUP", "HStyle10"],
    ["<>", "HStyle11"],
    ["√", "HStyle12"],
    ["√√", "HStyle13"],
    ["~~", "HStyle14"],
    ["[]", "HStyle15"],
    ["{}", "HStyle16"],
*/

/*
  ["|1", "backgroundColor", "white"],
  ["|1", "color", "black"],

  ["|2", "backgroundColor", "yellow"],
  ["|2", "color", "black"],

  ["|3", "backgroundColor", "DeepPink"],
  ["|3", "color", "white"],

  ["|4", "backgroundColor", "red"],

  ["|5", "backgroundColor", "orange"],

  ["|6", "backgroundColor", "purple"],

  ["|7", "backgroundColor", "blue"],
  ["|7", "color", "white"],

  ["|8", "backgroundColor", "beige"],
  ["|8", "color", "black"],

  ["|9", "backgroundColor", "white"],
  ["|9", "color", "black"],

  ["FUP", "backgroundColor", "turquoise"],

  ["<>", "backgroundColor", "brown"],
  ["<>", "color", "yellow"],

  ["√", "backgroundColor", "purple"],
  ["√", "color", "white"],

  ["√√", "backgroundColor", "#AAAAAA"],
  ["√√", "textDecoration", "underline overline"],
  ["√√", "color", "black"],

  ["~~", "fontStyle", "italic"],
  ["~~", "textDecoration", "underline overline"],
  ["~~", "fontWeight", "900"],
  ["~~", "textShadow", "2px 2px #FF0000"],

  ["[]", "fontVariant", "small-caps"],

  ["{}", "fontWeight", "900"]
*/