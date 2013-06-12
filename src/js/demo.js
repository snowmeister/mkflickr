$(document).ready(function () {
	$("#gallery-test").mkflickr({
		/** NOTE - Change this to YOUR Flickr Developers API Key */
		apiKey: 'd980cbf534d97b23fa2664329cc40f98',
		/** NOTE - Unless you WANT to see my images, change this to YOUR desired Flickr users id.*/
		userId: '44290892@N08',
		/** Set how many images you want to display...*/
		itemCount: '10',
		/** set the tag you'd like to wrap each image in eg: 'span', 'div', 'li'*/
		tag: 'span'
	});
});