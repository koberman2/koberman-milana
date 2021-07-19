(function (factory, jQuery, Zepto) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object' && typeof Meteor === 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}
}(function ($) {
	var brandStoreIcon = L.icon({
		iconUrl: 'images/icons-leaflet-stores.svg#brand-store',
		iconSize: [36,36]
	});
	var outletIcon = L.icon({
		iconUrl: 'images/icons-leaflet-stores.svg#outlet',
		iconSize: [36,36]
	});
	var discountIcon = L.icon({
		iconUrl: 'images/icons-leaflet-stores.svg#discount',
		iconSize: [36,36]
	});


	var leafletAttr = '',
		leafletUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
	var grayscale   = L.tileLayer(leafletUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: leafletAttr});



	$(function () {
		var $leafletChooseShop = $('#leafletChooseShop');

		if ($leafletChooseShop.exists()) {
			var map = L.map('leafletChooseShop', {
				center: [59.9306298,30.3598275],
				zoom: 13,
				layers: [grayscale]
			});
			L.marker([59.9306298,30.3598275], {icon: brandStoreIcon}).addTo(map);
			L.marker([59.9106298,30.3598275], {icon: outletIcon}).addTo(map);
		}
	});

}, window.jQuery, window.Zepto));
