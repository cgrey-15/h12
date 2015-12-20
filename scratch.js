var h = vh().width(500)
    .height(500)
    .data([{name: "data", url: "data/iris.json"}]);

h.scale().name("x").range("width").domain({"data": "data", "field": "sepalWidth"}).zero(false);
h.scale().name("y").range("height").domain({"data": "data", "field": "sepalLength"}).zero(false);
h.scale().name("color").type("ordinal").domain({data: "data", "field": "species"})
    .range("category10");
h.axes("x").scale("x");
h.axes("y").scale("y");

h.mark().type("symbol").from({"data": "data"})
    .enter({"x": {"scale": "x", "field": "sepalWidth"},
            "y": {"scale": "y", "field": "sepalLength"},
            "size": {"value": 49},
            "fill": {"scale": "color", "field": "species"}});

h.run("#vis");
