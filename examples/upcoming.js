const fnbrjs = require('fnbr.js');
const fnbrco = new fnbrjs('api-key-here');

fnbrco.getUpcoming().then(upcoming => {
	console.log(upcoming);
}).catch(err => {
	console.log(err);
});