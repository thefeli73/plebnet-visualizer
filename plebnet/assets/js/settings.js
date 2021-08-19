function setting1() {
    if($('#setting1').is(":checked")) {
	    $("#graph_svg").addClass("show");
    } else {
	    $("#graph_svg").removeClass("show");
    }
}
function setting1b() {
    if($('#setting1b').is(":checked")) {
	    $("#graph_svg").addClass("enable1st");
    } else {
	    $("#graph_svg").removeClass("enable1st");
    }
}
function setting1c() {
    if($('#setting1c').is(":checked")) {
	    $("#graph_svg").addClass("enable2nd");
    } else {
	    $("#graph_svg").removeClass("enable2nd");
    }
}
function setting2() {
    if($('#setting2').is(":checked")) {
	    draw_graph("");
    } else {
	    draw_graph("_full");
    }
    //reapply settings 
    reinit();
}

function init() {
    $( function(){
        setTimeout(() => {
            //Show all node names (change classes)
            $('#setting1').change(function(){
                setting1();
            });
            //Show 1st degree neighbours
            $('#setting1b').change(function(){
                setting1b();
            });
            //Show 2nd degree neighbours
            $('#setting1c').change(function(){
                setting1c();
            });
            
            //show all channels (reload script with different graph.json)
            $('#setting2').change(function(){
                setting2();
            });
			reinit();
        }, 200);
    });
}

function reinit() {
    $( function(){
        setTimeout(() => {
            setting1();
            setting1b();
            setting1c();
            neighbours();
        }, 200);
    });
}
init();
