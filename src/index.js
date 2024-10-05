const IntensitySegments = require("./intensity_segments.js");

const segments1 = new IntensitySegments();
segments1.toString(); // Should be "[]"

segments1.add(10, 30, 1);
segments1.toString(); // Should be: "[[10,1],[30,0]]"
segments1.add(20, 40, 1);
segments1.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
segments1.add(10, 40, -2);
segments1.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"

// Another example sequence:
const segments2 = new IntensitySegments();
segments2.toString(); // Should be "[]"
segments2.add(10, 30, 1);
segments2.toString(); // Should be "[[10,1],[30,0]]"
segments2.add(20, 40, 1);
segments2.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[20,1],[30,0]]"
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"
