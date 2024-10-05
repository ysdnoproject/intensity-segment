const IntensitySegments = require("../src/intensity_segments.js");

test("intensity segments test 1", () => {
  const segments1 = new IntensitySegments();
  expect(segments1.toString()).toBe("[]");

  segments1.add(10, 30, 1);
  expect(segments1.toString()).toBe("[[10,1],[30,0]]");

  segments1.add(20, 40, 1);
  expect(segments1.toString()).toBe("[[10,1],[20,2],[30,1],[40,0]]");

  segments1.add(10, 40, -2);
  expect(segments1.toString()).toBe("[[10,-1],[20,0],[30,-1],[40,0]]");
});

test("intensity segments test 2", () => {
  const segments = new IntensitySegments();
  expect(segments.toString()).toBe("[]");

  segments.add(10, 30, 1);
  expect(segments.toString()).toBe("[[10,1],[30,0]]");

  segments.add(20, 40, 1);
  expect(segments.toString()).toBe("[[10,1],[20,2],[30,1],[40,0]]");

  segments.add(10, 40, -1);
  expect(segments.toString()).toBe("[[20,1],[30,0]]");

  segments.add(10, 40, -1);
  expect(segments.toString()).toBe("[[10,-1],[20,0],[30,-1],[40,0]]");
});
