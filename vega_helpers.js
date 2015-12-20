function vh() {
    var result = { scales: [], data: [], 
                   axes: [ undefined, undefined ],
                   marks: []
                 };

    var scale_objects = [];
    var axes_objects = [ undefined, undefined ];

    function deep_copy(json) { return JSON.parse(JSON.stringify(json)); };
    
    return {
        width: function(x) {
            if (x === void 0)
                return result.width;
            result.width = x;
            return this;
        },
        height: function(y) {
            if (y === void 0)
                return result.height;
            result.height = y;
            return this;
        },
        padding: function(spec) {
            if (spec === void 0)
                return result.padding;
            result.padding = deep_copy(spec);
            return this;
        },
        run: function(element) {
            vg.parse.spec(result, function(chart) {
                chart({el: element}).update(); 
            });
            return this;
        },
        data: function(source) {
            if (source === void 0)
                return result.data;
            result.data = deep_copy(source);
            return this;
        },
        spec: function(spec) {
            if (spec === void 0)
                return result;
            result = deep_copy(spec);
            return this;
        },
        call: function(f) {
            return f(this);
        }, 
        axes: function(which) {
            if (which !== "x" && which !== "y")
                throw new Exception("parameter must be either x or y");
            var key = {"x": 0, "y": 1};
            if (axes_objects[key[which]] !== void 0) return axes_objects[key[which]];
            var axis = { "type": which };
            var inner_result = {
                scale: function(scale) {
                    if (scale === void 0)
                        return axis.scale;
                    else if (typeof scale === typeof "") {
                        axis.scale = scale;
                    } else {
                        // assume type is object, and is the scale object from below.
                        axis.scale = scale.name();
                    }
                    return this;
                },
                orient: function(orient) {
                    if (orient === void 0) return axis.orient;
                    axis.orient = orient;
                    return this;
                },
                title: function(title) {
                    if (title === void 0) return axis.title;
                    axis.title = title;
                    return this;
                }
            };
            result.axes[key[which]] = axis;
            axes_objects[key[which]] = inner_result;
            return inner_result;
        },
        scale: function(name) {
            if (name !== void 0) {
                for (var i=0; i<result.scales.length; ++i) {
                    if (result.scale_objects[i].name === name)
                        return result.scale_objects[i].value;
                }
                return undefined;
            }
            var scale = { 
                range: "width",
                domain: {}
            };
            var scale_object = {
                name: "",
                value: scale
            };
            var inner_result = {
                name: function(name) {
                    if (name === void 0) return scale.name;
                    scale.name = name;
                    scale_object.name = name;
                    return this;
                },
                range: function(spec) {
                    if (spec === void 0) return scale.range;
                    scale.range = spec;
                    return this;
                },
                domain: function(spec) {
                    if (spec === void 0) return scale.domain;
                    scale.domain = deep_copy(spec);
                    return this;
                },
                data: function(data) {
                    if (data === void 0) return scale.data;
                    scale.data = data;
                    return this;
                },
                nice: function(v) {
                    if (v === void 0) return scale.nice;
                    scale.nice = v;
                    return this;
                },
                type: function(type) {
                    if (type === void 0) return scale.type;
                    scale.type = type;
                    return this;
                },
                zero: function(b) {
                    if (b === void 0) return scale.zero;
                    scale.zero = b;
                    return this;
                },
                round: function(b) {
                    if (b === void 0) return scale.round;
                    scale.round = b;
                    return this;
                },
                call: function(f) {
                    return f(this);
                }
            };
            result.scales.push(scale);
            scale_objects.push(scale_object);
            return inner_result;
        },
        mark: function(type) {
            var mark = { properties: {} };
            var inner_result = {
                type: function(type) {
                    if (type === void 0) return mark.type;
                    mark.type = type;
                    return this;
                },
                from: function(from) {
                    if (from === void 0) return mark.from;
                    mark.from = deep_copy(from);
                    return this;
                },
                enter: function(spec) {
                    if (spec === void 0) return mark.properties.enter;
                    mark.properties.enter = deep_copy(spec);
                    return this;
                },
                update: function(spec) {
                    if (spec === void 0) return mark.properties.update;
                    mark.properties.update = deep_copy(spec);
                    return this;
                },
                hover: function(spec) {
                    if (spec === void 0) return mark.properties.hover;
                    mark.properties.hover = deep_copy(spec);
                    return this;
                },
                call: function(f) {
                    return f(this);
                }
            };
            result.marks.push(mark);
            if (type !== void 0)
                inner_result.type(type);
            return inner_result;
        }
    };
};
