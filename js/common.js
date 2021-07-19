(function (factory, jQuery, Zepto) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object' && typeof Meteor === 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}
}(function ($) {
	$.fn.exists = function () {
		return this.length !== 0;
	};

	var $dropdownScrollbar;
	var outerWidth;
	var scrollBars = {};
	var dropdownScrollbars = {};
	var $offcanvasScrollBar;
	var $navTabsPersonalArea, navTabsPersonalAreaScrollbar, navTabsPersonalAreaSlick;
	var stickyPersonalAreaNavTabs;
	var filtersContainerScroll;
	var $filtersContainerScroll;
	var stickyBasket;

	var initLeftSideMenu = function () {
		var $body = $(document.body);
		var $milOffCanvasBtn = $('.mil-offcanvas-btn');
		var $dataTarget = $($milOffCanvasBtn.attr('data-target') || null);

		if ($dataTarget.exists()) {
			if (outerWidth >= 1200) {
				$dataTarget.addClass('show');
			} else {
				$dataTarget.removeClass('show');
			}
			$body.removeClass('off-canvas-backdrop').css('overflow', 'auto');
		}
	};

	var initNavTabsPersonalArea = function () {
		if (!$navTabsPersonalArea.exists()) {
			return;
		}

		if (outerWidth >= 768) {
			if (navTabsPersonalAreaSlick) {
				$navTabsPersonalArea.slick('unslick');
			}
			navTabsPersonalAreaScrollbar = new PerfectScrollbar($navTabsPersonalArea[0], {
				wheelPropagation: false
			});
		} else {
			if (navTabsPersonalAreaScrollbar) {
				navTabsPersonalAreaScrollbar.destroy();
			}

			navTabsPersonalAreaSlick = $navTabsPersonalArea.slick({
				focusOnSelect: true,
				dots: false,
				slidesToShow: 1,
				arrows: true,
				fade: true
			});
			var $active = $navTabsPersonalArea.find('.active');
			var $slickSlide = $active.closest('.slick-slide');
			$navTabsPersonalArea.slick('slickGoTo', parseInt($slickSlide.index()));
		}
	};

	var initStickyPersonalAreaNavTabs = function () {
		var options = {
			marginTop: 82
		};

		if (!$('.sticky-container').exists()) {
			return;
		}

		if (stickyPersonalAreaNavTabs) {
			stickyPersonalAreaNavTabs.destroy();
		}

		if (outerWidth >= 768 && outerWidth < 1200) {
			options.marginTop = 91;
		}
		if (outerWidth >= 1200) {
			options.marginTop = 75;
		}

		stickyPersonalAreaNavTabs = new Sticky('.sticky-container', options);
	};

	var initStickyBasket = function() {
		var options = {
			marginTop: 82,
			marginBottom: 25
		};

		if (!$('.basket-sticky-container').exists() || outerWidth < 1400) {
			if (stickyBasket) {
				stickyBasket.destroy();
			}
			return;
		}

		if (outerWidth >= 768 && outerWidth < 1200) {
			options.marginTop = 91;
		}
		if (outerWidth >= 1200) {
			options.marginTop = 75;
		}

		if (stickyBasket) {
			stickyBasket.destroy();
		}

		stickyBasket = new Sticky('.basket-sticky-container', options);
	};

	var initFiltersContainerScroll = function() {
		if (outerWidth <= 1200) {
			filtersContainerScroll = new PerfectScrollbar('.filters-container-scroll', {wheelPropagation: false});
		} else {
			if (filtersContainerScroll) {
				filtersContainerScroll.destroy();
			}
		}
	};

	var updateFiltersContainerScroll = function() {
		if ($filtersContainerScroll.exists()) {
			$filtersContainerScroll.scrollTop(0);
		}
		if (filtersContainerScroll) {
			filtersContainerScroll.update();
		}
	};

	var initDropDownScrollBar = function() {
		if (outerWidth <= 1200) {
			if (!$.isEmptyObject(dropdownScrollbars)) {
				for (var index in dropdownScrollbars) {
					console.log(dropdownScrollbars[index]);
					if (dropdownScrollbars[index]) {
						dropdownScrollbars[index].destroy();
					}
				}
			}
			return;
		}

		if ($dropdownScrollbar.exists()) {
			dropdownScrollbars = {};
			$dropdownScrollbar.each(function () {
				var dataScrollIndex = this.getAttribute('data-scroll-index');
				dropdownScrollbars[dataScrollIndex] = new PerfectScrollbar(this, {
					wheelPropagation: false
				});
			});
		}
	};

	var init = function () {
		outerWidth = window.outerWidth;
		initDropDownScrollBar();
		initLeftSideMenu();
		initNavTabsPersonalArea();
		initStickyPersonalAreaNavTabs();
		initStickyBasket();
	};

	$(function () {
		var $milScrollBar = $('.mil-scroll-bar');
		var $milMainCarousel = $('.mil-main-carousel');
		var $offCanvas = $('.off-canvas');
		var $milProductCarouselSlick = $('.mil-product-carousel-slick');
		var $milMainCenterCarouselSlick = $('.mil-main-center-carousel-slick');
		var $dataMask = $('[data-mask]');
		var $offCanvasEnd = $('.offcanvas-end');
		var $dropdownToggle = $('.dropdown-toggle');
		var $sliderRange = $('.slider-range');
		var $navbarCatalogFilter = $('#navbarCatalogFilter');

		$navTabsPersonalArea = $('.nav-tabs-personal-area');
		$dropdownScrollbar = $('.dropdown-scrollbar');
		$filtersContainerScroll = $('.filters-container-scroll');

		init();

		if ($navbarCatalogFilter.exists()) {
			var navbarCatalogFilter = document.getElementById('navbarCatalogFilter');
			var $modalBackdrop = $('<div/>', {class: 'modal-backdrop fade show d-xl-none'});
			var $main = $('main');
			navbarCatalogFilter.addEventListener('show.bs.collapse', function () {
				initFiltersContainerScroll();
				$main.append($modalBackdrop);
			});
			navbarCatalogFilter.addEventListener('hidden.bs.collapse', function() {
				$modalBackdrop.remove();
			});
		}

		if ($sliderRange.exists()) {
			$sliderRange.each(function () {
				var $this = $(this);
				var $inputFrom = $this.find('.input-from');
				var $inputTo = $this.find('.input-to');
				$this.find('.range').ionRangeSlider({
					type: 'double',
					skin: 'round',
					hide_from_to: true,
					hide_min_max: true,
					onStart: updateInputs,
					onChange: updateInputs,
					onFinish: updateInputs
				});

				function updateInputs(data) {
					$inputFrom.prop('value', data.from);
					$inputTo.prop('value', data.to);
				}
			});
		}

		if ($offCanvas.exists()) {
			$offCanvas.css('visibility', 'visible')
		}

		if ($milMainCenterCarouselSlick.exists()) {
			$milMainCenterCarouselSlick.slick({
				dots: true,
				infinite: true,
				arrows: false,
				fade: true,
				cssEase: 'linear',
				autoplay: 7000
			})
		}

		if ($milProductCarouselSlick.exists()) {
			$milProductCarouselSlick.each(function () {
				var $this = $(this);
				$this.slick({
					dots: false,
					infinite: true,
					slidesToShow: 1,
					variableWidth: true,
					appendArrows: '.mil-product-carousel-position-' + $this.attr('data-type') + ' .mil-carousel-arrows'
				});
			});
		}

		if ($milScrollBar.exists()) {
			scrollBars = {};
			$milScrollBar.each(function () {
				var dataScrollIndex = this.getAttribute('data-scroll-index');
				scrollBars[dataScrollIndex] = new PerfectScrollbar(this, {
					wheelPropagation: false
				});
			});
		}

		if ($milMainCarousel.exists()) {
			$milMainCarousel.slick({
				dots: true,
				infinite: true,
				appendArrows: '.mil-carousel .mil-carousel-arrows',
				fade: true,
				cssEase: 'linear'
			})
		}

		if ($dataMask.exists()) {
			$dataMask.each(function () {
				var $this = $(this);
				$this.mask($this.attr('data-mask'), {});
			});

		}

		$offCanvasEnd = document.querySelector('.offcanvas-end');
		if ($offCanvasEnd) {
			$offCanvasEnd.addEventListener('show.bs.offcanvas', function () {
				$offcanvasScrollBar = new PerfectScrollbar('.offcanvas-scroll-bar', {
					wheelPropagation: false
				});
				$('body').css('overflow', 'hidden');
			});
			$offCanvasEnd.addEventListener('hidden.bs.offcanvas', function () {
				$offcanvasScrollBar.destroy();
				$('body').css('overflow', 'auto');
			})
		}

		if ($dropdownToggle.exists()) {
			$dropdownToggle.each(function () {
				new Dropdown(this, {});
			});
			var dropdownMenu = document.querySelectorAll('.dropdown-toggle');
			dropdownMenu.forEach(function(e){
				e.addEventListener('hide.bs.dropdown', function(){
					$('.filter-nav-link').removeClass('d-none');
					$('.toggle-title-nav-link').text('').addClass('d-none');
					$('.title-nav-link').removeClass('d-none');
					$('.nav-item').not('.not-hide-nav-item').removeClass('d-none');
					updateFiltersContainerScroll();
				});
			});
		}
	});

	$(document).on('click', '.filter-nav-link', function(e){
		if (outerWidth > 1200) {
			return;
		}
		var $this = $(this);
		var $navbarNav = $this.closest('.navbar-nav');
		var $thisNavItem = $this.closest('.nav-item');
		$navbarNav.find('.nav-item').not($thisNavItem).not('.not-hide-nav-item').addClass('d-none');
		$this.addClass('d-none');
		$('.toggle-title-nav-link').text($this.text()).removeClass('d-none');
		$('.title-nav-link').addClass('d-none');
		updateFiltersContainerScroll();
	});



	$(document).on('click', '.favorites-check', function(e){
		// enter your code

		e.stopPropagation();
	});

	$(document).on('click', '.nav-sub-item > .nav-link', function (e) {
		var $this = $(this);
		var $navSubItem = $this.closest('.nav-sub-item');
		var $milScrollBar = $this.closest('.mil-scroll-bar');
		var dataScrollIndex = $milScrollBar.attr('data-scroll-index');
		$navSubItem.toggleClass('active');
		scrollBars[dataScrollIndex].update();

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(document).on('click', '.mil-offcanvas-btn', function (e) {
		var $this = $(this);
		var $dataTarget = $($this.attr('data-target') || null);
		if (!$dataTarget.exists()) {
			return;
		}
		if (outerWidth >= 1200) {
			return;
		}
		$this.toggleClass('open');
		$dataTarget.toggleClass('show');
		$(document.body).toggleClass('off-canvas-backdrop').css('overflow', !$dataTarget.hasClass('show') ? 'auto' : 'hidden');

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(document).on('click', '.basket-pickup-check', function(){
		$('.basket-pickup-col').removeClass('d-none');
		$('.basket-delivery-col').addClass('d-none');
		if (stickyBasket) {
			stickyBasket.update();
		}
	});

	$(document).on('click', '.basket-delivery-check', function(){
		$('.basket-pickup-col').addClass('d-none');
		$('.basket-delivery-col').removeClass('d-none');
		if (stickyBasket) {
			stickyBasket.update();
		}
	});

	$(window).on('resize', function () {
		init();
	});

}, window.jQuery, window.Zepto));
