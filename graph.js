function Node(inVertices, outVertices, name, value) {
    if (typeof(inVertices)==='undefined') {
        outVertices = [];
    }
    if (typeof(outVertices)==='undefined') {
        inVertices = [];
    }
    if (typeof(name)==='undefined') {
        name = null;
    }
    if (typeof(value)==='undefined') {
        value = null;
    }
    this.inVertices = inVertices;
    this.outVertices = outVertices;
    this.name = name;
    this.value = value;
}

function Graph (tree) {
    if (typeof(tree)==='undefined') {
        tree = false;
    }
    this.root = new Node();
}

var margin = {top: 20, right: 120, bottom: 20, left: 120},
 width = window.innerWidth - margin.right - margin.left,
 height = window.innerHeight - margin.top - margin.bottom;
 
var i = 0;


var diagonal = d3.svg.diagonal()
 .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
 .attr("width", width + margin.right + margin.left)
 .attr("height", height + margin.top + margin.bottom)
  .append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
   links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Declare the nodesâ€¦
  var node = svg.selectAll("g.node")
   .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
   .attr("class", "node")
   .attr("transform", function(d) { 
    return "translate(" + d.y + "," + d.x + ")"; });

  nodeEnter.append("circle")
   .attr("r", 10)
   .style("fill", "#fff");

  nodeEnter.append("text")
   .attr("x", function(d) { 
    return d.children || d._children ? -13 : 13; })
   .attr("dy", ".35em")
   .attr("text-anchor", function(d) { 
    return d.children || d._children ? "end" : "start"; })
   .text(function(d) { return d.name; })
   .style("fill-opacity", 1);

  // Declare the linksâ€¦
  var link = svg.selectAll("path.link")
   .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
   .attr("class", "link")
   .attr("d", diagonal);

}



function diagram () {
    var tree = d3.layout.tree().size([height, width]);

    var nodes = new Graph();

    update(tree.root);
}
