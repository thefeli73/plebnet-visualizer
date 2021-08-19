function onBTCPayFormSubmit(event) {
	sats = prompt("Choose an amount between 100 and 500000 sats", "2500");
    if (sats === null) {
        return;
    }
	if (sats < 100 || sats > 500000){
		alert("Invalid amount!");
        return;
	}
	amountBTC = sats * 0.00000001;
	
	desc = prompt("Optionally enter a name", "Anonymous");
    if (desc === null) {
        return;
    }
	
	event.target[0].value = "Donation from " + desc;
	event.target[1].value = amountBTC;
	
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200 && this.responseText) {
                var response = JSON.parse(this.responseText);
                window.btcpay.showInvoice(response.invoiceId);
            }
        }
    };
    xhttp.open("POST", event.target.getAttribute('action'), true);
    xhttp.send(new FormData(event.target));
}