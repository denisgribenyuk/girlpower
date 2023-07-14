(function($) {
    'use strict';
	
	jQuery(document).ready(function(){
		$("#phone").inputmask({"mask": "+7 (999) 999-99-99"});

		/* START MENU-JS */	
			$('.nav a, .banner-btn a, .about_btn').on('click', function(e){
				var anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $(anchor.attr('href')).offset().top - 50
				}, 1500);
				e.preventDefault();
			});		

	
			$(window).scroll(function() {
			  if ($(this).scrollTop() > 100) {
				$('.menu-top').addClass('menu-shrink');
				$('.brand').hide();
				$('.navbar-link').show();
			  } else {
				$('.menu-top').removeClass('menu-shrink');
				$('.brand').show();
				$('.navbar-link').hide();
			  }
			});
			
			$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
			});				
		/* END MENU-JS */
		
		/* START MOBILE-MENU  */
			$('.main_menu').slicknav({
				prependTo:".mobile-nav",
			});
		/* START MOBILE-MENU  */
		 
		/* START ISOTOP JS */
			var $grid = $('.work_content_area').isotope({
			  // options
			});
			// filter items on button click
			$('.work_filter').on( 'click', 'li', function() {
			  var filterValue = $(this).attr('data-filter');
			  $grid.isotope({ filter: filterValue });
			});
			// filter items on button click
			$('.work_filter').on( 'click', 'li', function() {
				$(this).addClass('active').siblings().removeClass('active')
			});
		/* END ISOTOP JS */
		
		/* START LIGHTBOX */
		
			lightbox.option({
			  'resizeDuration': 200,
			  'wrapAround': true
			});
		
		/* END LIGHTBOX JS */
		
		/* START COUNDOWN JS */
			$('#counter_area').on('inview', function(event, visible, visiblePartX, visiblePartY) {
				if (visible) {
					$(this).find('.counter').each(function () {
						var $this = $(this);
						$({ Counter: 0 }).animate({ Counter: $this.text() }, {
							duration: 5000,
							easing: 'swing',
							step: function () {
								$this.text(Math.ceil(this.Counter));
							}
						});
					});
					$(this).unbind('inview');
				}
			});
		/* END COUNDOWN JS */
		
	});	

		// Date in footer
	var date = new Date();
	$(".date_footer").text(date.getFullYear());
	
		/*PRELOADER JS*/
			$(window).on('load', function() {  
				$('.spinner').fadeOut();
				$('.preloader').delay(350).fadeOut('slow'); 
			}); 
		/*END PRELOADER JS*/

		/* START FORM */
	$("#form-contact").on("submit", function(e) {
		var formData = {
			name: $("#name").val(),
			phone: $("#phone").val(),
			message: $("#message").val()
		}
		console.log(formData)
		var formResponseElem = $('.form-response')
		e.preventDefault()
		$.ajax({
			url:     `${window.location.href}/feedback`, //url страницы
			type:     "POST", //метод отправки
			encode:   true,
			data: formData,
			success: function(response) { //Данные отправлены успешно
				$('.form-block').hide(200)
				formResponseElem.html("<h2><span>Спасибо</span>. Я обязательно свяжусь с <span>тобой</span></h2>")
				formResponseElem.show(400)
			},
			error: function(response) { // Данные не отправлены
				console.log(response.data)
				$('.form-block').hide(200)
				$('.form-response').html("<h2><span>Извини,<br></span> у нас что-то пошло не так.<br>Ты можешь связаться со мной в telegram: <a href='https://t.me/youknowmyname01'>@youknowmyname01</a></h2>")
				formResponseElem.show(400)
			}
		});

	})
	/* END FORM */

		// Wow
			new WOW().init();
})(jQuery);