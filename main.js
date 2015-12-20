function set_data(h) {
    return h.data([
        {
            "name": "table",
            "values": [
                {"category":"A", "amount":28},
                {"category":"B", "amount":55},
                {"category":"C", "amount":43},
                {"category":"D", "amount":91},
                {"category":"E", "amount":81},
                {"category":"F", "amount":53},
                {"category":"G", "amount":19},
                {"category":"H", "amount":87},
                {"category":"I", "amount":52}
            ]
        }
    ]);
}

function get_vega_spec() {
    var h = vh();
    h.width(400).height(200);
    h.padding({"top": 10, "left": 30, "bottom": 20, "right": 10});
    var xscale = h.scale().name("xscale").type("ordinal").range("width").domain({"data": "table", field: "category"});
    var yscale = h.scale().name("yscale").range("height").domain({"data": "table", field: "amount"}).nice(true);
    h.axes("x").scale(xscale);
    h.axes("y").scale(yscale);
    h.mark()
        .type("rect").from({"data": "table"})
        .enter({"x": {"scale": "xscale", "field": "category"},
                "width": {"scale": "xscale", "band": true, "offset": -1},
                "y": {"scale": "yscale", "field": "amount"},
                "y2": {"scale": "yscale", "value": 0 }})
        .update({"fill": {"value": "steelblue"}})
        .hover({"fill": {"value": "red"}})
    ;
    h.call(set_data);
    return h;
}

function get_bad_driving_spec() {
    var h1 = vh()
        .width(800)
        .height(200)
        .data([{ "name": "drive",
                 "url": "data/driving.json" }]);
    function nice(o) { return o.zero(false).round(true).nice(true); };
    function x_scale(s) { 
        return s.name("x").range("width").domain({"data": "drive", "field": "year"}).call(nice);
    }
    h1.scale().call(x_scale);
    h1.scale().name("y").range("height").domain({"data": "drive", "field": "miles"}).call(nice);
    h1.axes("x").scale("x");
    h1.axes("y").scale("y");
    h1.mark().type("line").from({"data": "drive"})
        .enter({
          "interpolate": {"value": "cardinal"},
          "x": {"scale": "x", "field": "year"},
          "y": {"scale": "y", "field": "miles"},
          "stroke": {"value": "#000"},
          "strokeWidth": {"value": 3}
        });

    var h2 = vh()
        .width(800)
        .height(200)
        .data([{ "name": "drive",
                 "url": "data/driving.json" }]);

    h2.axes("x").scale("x");
    h2.axes("y").scale("y");
    h2.scale().call(x_scale);
    h2.scale().name("y").range("height").domain({"data": "drive", "field": "gas"}).call(nice);
    h2.mark().type("line").from({"data": "drive"})
        .enter({
          "interpolate": {"value": "cardinal"},
          "x": {"scale": "x", "field": "year"},
          "y": {"scale": "y", "field": "gas"},
          "stroke": {"value": "#000"},
          "strokeWidth": {"value": 3}
        });

    return [h1, h2];
}

function get_driving_spec() {
    var h = vh()
        .width(800)
        .height(500)
        .data([{ "name": "drive",
                 "url": "data/driving.json" }]);
    function nice(o) { return o.zero(false).round(true).nice(true); };
    h.scale().name("x").domain({"data": "drive", "field": "miles"})
        .range("width").call(nice);
    h.scale().name("y").domain({"data": "drive", "field": "gas"})
        .range("height").call(nice);
    h.axes("x").orient("top").scale("x");
    h.axes("y").orient("left").scale("y");
    h.mark().type("line")
        .from({"data": "drive"})
        .enter({
          "interpolate": {"value": "cardinal"},
          "x": {"scale": "x", "field": "miles"},
          "y": {"scale": "y", "field": "gas"},
          "stroke": {"value": "#000"},
          "strokeWidth": {"value": 3}
        });
    h.mark().type("symbol")
        .from({"data": "drive"})
        .enter({
          "x": {"scale": "x", "field": "miles"},
          "y": {"scale": "y", "field": "gas"},
          "fill": {"value": "#fff"},
          "stroke": {"value": "#000"},
          "strokeWidth": {"value": 1},
          "size": {"value": 49 }
        });
    return h;
}
