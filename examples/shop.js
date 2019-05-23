const fnbrcoapi = require('fnbr.coapi');
const fnbrco = new fnbrcoapi('api-key-here');

fnbrco.getShop().then(shop => {
	console.log(shop);
}).catch(err => {
	console.log(err);
});