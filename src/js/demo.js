$(document).ready(function(){
	console.log('we are calling it..')
		$("#gallery-test").mkflickr({
			apiKey:'d980cbf534d97b23fa2664329cc40f98',
			userId:'44290892@N08', 
			itemCount:'10',
			containerCssClass:'flickr-region',
			tag:'span'
		});
	});