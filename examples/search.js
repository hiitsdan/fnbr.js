const fnbrjs = require('fnbr.js');
const fnbrco = new fnbrjs('api-key-here');

fnbrco.getItem('Raptor', 3, 'outfit').then(items => {
	console.log(items);
}).catch(err => {
	console.log(err);
});