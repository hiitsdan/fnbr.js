const Client = require('./index.js');

const fnbrco = new Client('913bd2ab-0c02-41f0-ae77-4e35c7724811');

fnbrco.getItem('raptor').then(x => {
	console.log(x);
}).catch(err => {
	console.log(err);
});