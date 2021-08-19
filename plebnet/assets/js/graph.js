function draw_graph(suffix) {
    var width = window.innerWidth;
	var height = window.innerHeight;

    var fill = d3.scale.category20();
    
    var graph_elem = document.getElementById("graph_svg");
    if (graph_elem) {
        graph_elem.remove();
    }
    
    var svg = d3.select("#graph_container").append("svg")
        .attr("id", "graph_svg")
        .attr("width", width)
        .attr("height", height)
        .attr("version", "1.1")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
		.call(d3.behavior.zoom().on("zoom", function () {
			svg.attr("transform", "scale(" + d3.event.scale + ")")
		}));

    var force = d3.layout.force()
        .gravity(0.25)
        .charge(-1200)
        //.gravity(0)
        //.charge(0)
        .linkDistance(150)
        .size([width, height]);
	    
    var voronoi = d3.geom.voronoi()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .clipExtent([[0, 0], [width, height]]);
        
    d3.json("graphs/graph" + suffix + ".json", function(error, json) {
      if (error) throw error;

      force
          .nodes(json.nodes)
          .links(json.links)
          .start();

      var link = svg.selectAll(".link")
          .data(json.links)
          .enter().append("line")
          .attr("class", function(d) { return "link " + d.source.index + " " + d.target.index; });

      var node = svg.selectAll(".node")
          .data(json.nodes)
	      .enter().append("g")
          .attr("class", "node")
          .attr("id", function(d) { return d.id; })
	      .style("text-shadow", function(d) { return "2px 2px 4px" + d.color; })
          .call(force.drag);
	      
      var circle = node.append("circle")
          .attr("r", 5)
	      .style("stroke", function(d) { return d.color; })
          .attr("class", "circle");
	      
      var hov_circle = node.append("circle")
          .attr("r", 15)
          .attr("class", "cell")

      var id_link = node.append("a")
          .attr("xlink:href", function(d) { return "https://amboss.space/node/" + d.id; })
          .attr("target", "_blank");

      var label = id_link.append("text")
          .attr("dy", ".35em")
          .text(function(d) { return d.name; });

      force.on("tick", function() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        circle
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        hov_circle
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        label
            .attr("x", function(d) { return d.x + 8; })
            .attr("y", function(d) { return d.y; });
      });
    });
}
draw_graph("_full");
