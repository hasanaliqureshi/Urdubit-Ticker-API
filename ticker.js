var express = require('express');
var app = express();

app.get('/', function(req, res) {
	var BlinkTradeWS = require("blinktrade").BlinkTradeWS;
	var blinktrade = new BlinkTradeWS({ prod: true, brokerId: 8 });
	blinktrade.connect().then(function() { return blinktrade.login({ 
		username: API_KEY, 
		password: API_PASSWORD 
	}); 
	}).then(function(logged) { 

		blinktrade.subscribeTicker(["BLINK:BTCPKR"]).then(function(ticker) {
  			res.send(ticker);
		});
		
	}).catch(function(err) {
		console.log(err); 
	});

});

app.listen(3000);
