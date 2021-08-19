function selectNode(nmb) {
	var id = lookup[nmb];
	$("#" + id).click();
}

function autocomplete(inp, arr) {
  var currentFocus;
  var nodeNmb = [];
  inp.addEventListener("input", function(e) {
	  nodeNmb = [];
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = 0;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        for (j = 0; j <= (arr[i].length - val.length); j++) {
          if (arr[i].substr(j, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = arr[i].substr(0, j);
            b.innerHTML += "<strong>" + arr[i].substr(j, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length+j);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.innerHTML += "<input type='hidden' value='" + i + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
				selectNode(this.getElementsByTagName("input")[1].value);
            });
            if (a.children.length < 5) {
            	a.appendChild(b);
				nodeNmb.push(i);
            }
			break;
          }
        }
      }
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
   	  addActive(x);
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key*/
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key*/
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
		this.blur()
		selectNode(nodeNmb[currentFocus]);
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

var nodes = []
var lookup = []
$.getJSON( "graphs/graph.json", function( graph ) {
	for(var node in graph["nodes"]) {
		nodes.push(graph["nodes"][node]["name"]);
		nodes.push(graph["nodes"][node]["id"]);
		lookup.push(graph["nodes"][node]["id"]);
		lookup.push(graph["nodes"][node]["id"]);
	}
});

autocomplete(document.getElementById("nodeInput"), nodes);