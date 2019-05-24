const fnbrjs = require('fnbr.js');
const fnbrco = new fnbrjs('api-key-here');

fnbrco.getStats().then(stats => {
	console.log(stats);
}).catch(err => {
	console.log(err);
});