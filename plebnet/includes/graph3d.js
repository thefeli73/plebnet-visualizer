const Graph = ForceGraph3D()
  (document.getElementById('3d-graph'))
	.jsonUrl('graphs/graph3d_full.json')
	.nodeLabel('id')
	.nodeAutoColorBy('group')
	.nodeThreeObject(node => {
		const sprite = new SpriteText(node.name);
		sprite.material.depthWrite = false; // make sprite background transparent
		sprite.color = node.color;
		sprite.textHeight = 8;
		return sprite;
	});

Graph.d3Force('charge').strength(-220);