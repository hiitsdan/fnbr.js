const fnbrcoapi = require('fnbr.coapi');
const fnbrco = new fnbrcoapi('api-key-here');

fnbrco.getItem('Raptor', 3, 'outfit').then(items => {
	console.log(items);
}).catch(err => {
	console.log(err);
});