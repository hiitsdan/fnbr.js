const fnbrcoapi = require('fnbr.coapi');
const fnbrco = new fnbrcoapi('api-key-here');

fnbrco.getUpcoming().then(upcoming => {
	console.log(upcoming);
}).catch(err => {
	console.log(err);
});