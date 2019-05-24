const fnbrjs = require('fnbr.js');
const fnbrco = new fnbrjs('api-key-here');

fnbrco.getShop().then(shop => {
	console.log(shop);
}).catch(err => {
	console.log(err);
});