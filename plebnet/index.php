<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Plebnet Visualizer - Satoshis.Tech</title>

		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
		<meta name="description" content="A visualization of Plebnet">
		<meta name="keywords" content="ln, lightning, lightning network, Plebnet, cyclic hub, hub, visualizer, nodes">
		<meta name="author" content="Felix Schulze">
		<meta HTTP-EQUIV="CACHE-CONTROL" CONTENT="public">
		<link rel="canonical" href="https://plebnet.satoshis.tech">


		<meta property="og:image" content="https://plebnet.satoshis.tech/assets/img/thumbnail.png?v=1.0.0">
		<meta property="og:image:height" content="1200">
		<meta property="og:image:width" content="630">
		<meta property="og:image:alt" content="Plebnet Thumbnail">
		<meta name="twitter:image" content="https://plebnet.satoshis.tech/assets/img/thumbnail.png?v=1.0.0">
		<meta property="twitter:image:alt" content="Plebnet Thumbnail">

		<meta property="og:type" content="website">
		<meta property="og:site_name" content="Satoshis.Tech">
		<meta property="og:title" content="Plebnet Visualizer - Satoshis.Tech">
		<meta property="og:url" content="https://plebnet.satoshis.tech">
		<meta property="og:description" content="A visualization of Plebnet">
		<meta name="title" content="Plebnet Visualizer - Satoshis.Tech">

		<?php
		include 'includes/favicon.html';
		?>
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" async rel="stylesheet">
		<link rel="stylesheet" async href="/assets/css/main.css?v=1.10.7">
	</head>
	<body>
		<nav>
			<div id="search" class="nav-content">
				<form autocomplete="off" onsubmit="">
					<div class="autocomplete">
						<input type="text" placeholder="Node alias" id="nodeInput" name="nodeInput">
						<img class="searchIcon" src="assets/img/icons/search_64.png">
					</div>
				</form>
			</div>
			<div class="nav-content">
				<div id="info" class="button">
					<img src="assets/img/icons/info_64.png">
				</div>
			</div>
			<div class="nav-content">
				<div id="settings" class="button" onclick="showSettings();">
					<img src="assets/img/icons/setting_64.png">
				</div>
			</div>
		</nav>

		<div id="bar">
			<div class="section">
				<div class="content">
					<h2>Info</h2>
					<h3>Last Updated: <?php echo date("H:i T", filemtime("graphs/graph.json")); ?></h3>
					<p>This graph is showing nodes that are part of Plebnet.
					Nodes on the graph are scrubbed from <a href="https://graph.plebnet.org/" target="_blank">Plebnet</a>.
					Channels are collected directly from the LN.
					</p>
				</div>
			</div>
			<div class="section">
				<div class="content">
					<h2>Settings</h2>
					<p>3D version is <button onclick="window.location.href='/3d';">available here</button><p>
					<ul>
						<li>
							Show node names for:
							<ul>
								<li>
									<input type="checkbox" id="setting1a" name="setting1a" value="Node names selected" checked disabled>
									<label for="setting1a"> Selected node</label>
								</li>
								<li>
									<input type="checkbox" id="setting1b" name="setting1b" value="Node names neighbours" checked>
									<label for="setting1b"> Neighbouring nodes</label>
								</li>
								<li>
									<input type="checkbox" id="setting1c" name="setting1c" value="Node names neighbours 2nd" checked>
									<label for="setting1c"> Neighbouring nodes 
										<span class="tooltip">(2nd degree)
											<span class="tooltiptext">The neighbours' neighbours</span>
										</span>
									</label>
								</li>
								<li>
									<input type="checkbox" id="setting1" name="setting1" value="Node names">
									<label for="setting1"> All nodes</label>
								</li>
							</ul>
						</li>
						<li>
							<input type="checkbox" id="setting2" name="setting2" value="Triangle Edges">
							<label for="setting2"> Show only 
								<span class="tooltip">triangular channels
									<span class="tooltiptext">Triangular channels are channels that form a triangle with 2 other channels, also know as a cyclic superhub, liquidity triangle, channel swap or ring of fire.</span>
								</span>
							</label>
						</li>
					</ul>
				</div>
			</div>
			<div class="section">
				<div class="content">
					<h2>Connect</h2>
					Connect with my node <a href="https://btcpay.satoshis.tech/embed/BhtTLhbEhSZByquLhPqbbG45SejRXHkimRtBUbtn7m7y/BTC/ln" target="_blank">here (QR)</a>.<br>
					Other links to my node: 
					<a href="https://terminal.lightning.engineering/#/02241407b77092b0ac43350fdb09d13476cf11b0453037494e55f56207e1b247b8" target="_blank">terminal web</a>, 
					<a href="https://amboss.space/node/02241407b77092b0ac43350fdb09d13476cf11b0453037494e55f56207e1b247b8" target="_blank">amboss.space</a> and 
					<a href="https://1ml.com/node/02241407b77092b0ac43350fdb09d13476cf11b0453037494e55f56207e1b247b8" target="_blank">1ml.com</a>.
					</p>
				</div>
			</div>
		</div>
		
		<script src="/assets/js/donate.js?v=1.2.3"></script>
		<script src ="https://btcpay.satoshis.tech/modal/btcpay.js"></script>
		<form method="POST"  onsubmit="onBTCPayFormSubmit(event);return false"  action="https://btcpay.satoshis.tech/api/v1/invoices">
			<input type="hidden" name="checkoutDesc" value="Donation from Anonymous" />
			<input type="hidden" name="price" value="0.00001" />
			<input type="hidden" name="storeId" value="BhtTLhbEhSZByquLhPqbbG45SejRXHkimRtBUbtn7m7y" />
			<input type="hidden" name="jsonResponse" value="true" />
			<input type="hidden" name="notifyEmail" value="donation@satoshis.tech" />
			<input type="hidden" name="currency" value="BTC" />
			<button type="submit" name="submit" id="donate">
				<img src="assets/img/icons/donate_24.png">Buy me a coffee
			</button>
		</form>
		
		<div id="graph_container">
		</div>

		<script src="https://d3js.org/d3.v3.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script src="/assets/js/graph.js?v=1.3.1"></script>
		<script src="/assets/js/settings.js?v=1.6.0"></script>
		<script src="/assets/js/ui.js?v=1.3.0"></script>
		<script src="/assets/js/find.js?v=1.2.0"></script>
	</body>
</html>
