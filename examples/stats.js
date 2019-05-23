const fnbrcoapi = require('fnbr.coapi');
const fnbrco = new fnbrcoapi('api-key-here');

fnbrco.getStats().then(stats => {
	console.log(stats);
}).catch(err => {
	console.log(err);
});