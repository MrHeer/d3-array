var tape = require("tape"),
    d3 = require("../");

const data = [
  {name: "jim",   amount: "3400",   date: "11/12/2015"},
  {name: "carl",  amount: "12011", date: "11/12/2015"},
  {name: "stacy", amount: "1201",  date: "01/04/2016"},
  {name: "stacy", amount: "3405",  date: "01/04/2016"}
];

tape("rollup(data, reduce, accessor) returns the expected map", function(test) {
  test.deepEqual(
    entries(d3.rollup(data, v => v.length, d => d.name), 1),
    [
      ["jim", 1],
      ["carl", 1],
      ["stacy", 2]
    ]
  );
  test.deepEqual(
    entries(d3.rollup(data, v => d3.sum(v, d => d.amount), d => d.name), 1),
    [
      ["jim", 3400],
      ["carl", 12011],
      ["stacy", 4606]
    ]
  );
  test.end();
});

tape("rollup(data, reduce, accessor, accessor) returns the expected map", function(test) {
  test.deepEqual(
    entries(d3.rollup(data, v => v.length, d => d.name, d => d.amount), 2),
    [
      [
        "jim",
        [
          ["3400", 1]
        ]
      ],
      [
        "carl",
        [
          ["12011", 1]
        ]
      ],
      [
        "stacy",
        [
          ["1201", 1],
          ["3405", 1]
        ]
      ]
    ]
  );
  test.end();
});

function entries(map, depth) {
  if (depth > 0) {
    return Array.from(map, ([k, v]) => [k, entries(v, depth - 1)]);
  } else {
    return map;
  }
}
