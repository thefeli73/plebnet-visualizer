function neighbours() {
	var all_neighbours;
	var nodes = [];
	$.getJSON( "graphs/neighbours.json", function( data ) {
		all_neighbours = data;
	});
	$.getJSON( "graphs/graph_full.json", function( graph ) {
		for(var node in graph["nodes"]) {
			nodes.push(graph["nodes"][node]["id"]);
		}
	});
	
	$(".node").click(function(){
		if ($(".selected")[0] != $(this)[0]) {
			$(".neighbour2nd").removeClass("neighbour2nd");
			$(".neighbour").removeClass("neighbour");
			$(".selected").removeClass("selected");
			$(this).addClass("selected");
			
			$("#graph_svg").removeClass("enable1st");
			$("#graph_svg").removeClass("enable2nd");
			
			let node = this.id; 
			$("." + nodes.indexOf(node)).addClass("neighbour");
			for (var i = 0; i < all_neighbours[node].length; i++) {
				first_deg_neighbour = all_neighbours[node][i];
				$("#" + first_deg_neighbour).addClass("neighbour");
				$("." + nodes.indexOf(first_deg_neighbour)).addClass("neighbour2nd");
				
				for (var j = 0; j < all_neighbours[first_deg_neighbour].length; j++) {
					second_deg_neighbour = all_neighbours[first_deg_neighbour][j];
					$("#" + second_deg_neighbour).addClass("neighbour2nd");
				}
			}
			var sleep = 400
			setTimeout(function(){
				setting1b();
				setTimeout(function(){
					setting1c();
				}, sleep);
			}, sleep);
		}
	});
}
function showSettings() {
	//spin cogwheel
	$("#settings").toggleClass("active");
	//Show settings menu
	$("#bar").toggleClass("visible");
}