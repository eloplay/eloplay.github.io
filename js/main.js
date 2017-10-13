	angular
	.module('app', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
	.controller('pageICO_Ctr', function($scope, $window) {

  	$scope.scrollPos = $("body").scrollTop();

		$window.onscroll = function(){
			$scope.scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;
			$scope.bottomScrolPos = document.body.clientHeight - $scope.scrollPos;
			$scope.$apply(); //or simply $scope.$digest();
			//console.log('$scope.scrollPos= '+$scope.scrollPos);// проверяем значение скролла
			//console.log( $scope.bottomScrolPos );
	};

	});

	$(function() {

        var walletaddr  = '0x660cDee72302D2941A43db1275EDED7827023baA';
        var network     = 'mainnet';

        var infuraApiKey = 'U1fp9zS1uWSGbaXgOfH5';
        var usdethRate  = 300;
        var usdCap 		= 12000000;
        var ethCap      = parseInt(usdCap / usdethRate);


		AOS.init({
      //disable: window.innerWidth < 1024
      disable: true
    });

		$('.in-media').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			dots: true,
			appendArrows: $('.sl-class-arrow'),
			appendDots: $('.sl-class-dots'),
			prevArrow: '<i class="icon-arrow-left"></i>',
			nextArrow: '<i class="icon-arrow-right"></i>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3
					}
				},	{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				},	{
					breakpoint: 500,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});

		$('.slick-command').slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			dots: false,
			appendArrows: $('.command-class-arrow'),
			//appendDots: $('.command-class-dots'),
			prevArrow: '<i class="icon-arrow-left"></i>',
			nextArrow: '<i class="icon-arrow-right"></i>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3
					}
				}, {
					breakpoint: 650,
					settings: {
						slidesToShow: 2
					}
				}, {
					breakpoint: 576,
					settings: {
						verticalSwiping: true,
						vertical: true,
						slidesToShow: 1
					}
				}
			]
		});

		$('.slick-advisors').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			dots: false,
			appendArrows: $('.advisors-class-arrow'),
			//appendDots: $('.command-class-dots'),
			prevArrow: '<i class="icon-arrow-left"></i>',
			nextArrow: '<i class="icon-arrow-right"></i>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3
					}
				}, {
					breakpoint: 650,
					settings: {
						slidesToShow: 2
					}
				}, {
					breakpoint: 576,
					settings: {
						verticalSwiping: true,
						vertical: true,
						slidesToShow: 1
					}
				}
			]
		});

		$('.slick-audit').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			dots: false,
			appendArrows: $('.audit-class-arrow'),
			//appendDots: $('.command-class-dots'),
			prevArrow: '<i class="icon-arrow-left"></i>',
			nextArrow: '<i class="icon-arrow-right"></i>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3
					}
				}, {
					breakpoint: 650,
					settings: {
						slidesToShow: 2
					}
				}, {
					breakpoint: 576,
					settings: {
						verticalSwiping: true,
						vertical: true,
						slidesToShow: 1
					}
				}
			]
		});

		$('.slider__smart-tournaments').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 8000,
			dots: true,
			appendArrows: $('.smart-tournamentss-arrow'),
			appendDots: $('.smart-tournaments-dots'),
			prevArrow: '<i class="icon-arrow-left"></i>',
			nextArrow: '<i class="icon-arrow-right"></i>',
		});
/*
		if(window.location.hash) {
			var hash = window.location.hash;
			$('#hidden_anchor').attr('href', hash);
			$('#anchor-faq .panel-collapse:not(".in")').collapse('show');
			$(hash).parent().parent().collapse('show');
			$('#hidden_anchor').click();
		}
		*/
		$('a[href^=\\#faq-]').click(function(event){
			$(this).parent().parent().parent().parent().modal('hide');
			var id  = $(this).attr('href');
			$(id).parent().parent().collapse('show');
		});

		$('a[href^=\\#anchor-]').on("click", function (event) {

			event.preventDefault();
			var id  = $(this).attr('href'),
				top = $(id).offset().top;

			$('body,html').animate({scrollTop: top}, 800);
		});

        function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
            //
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +	 bugfix by: Michael White (http://crestidg.com)
            var i, j, kw, kd, km;
            // input sanitation & defaults
            if( isNaN(decimals = Math.abs(decimals)) ){
            	decimals = 2;
            }
            if( dec_point == undefined ){
            	dec_point = ",";
            }
            if( thousands_sep == undefined ){
            	thousands_sep = ".";
            }
            i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
            if( (j = i.length) > 3 ){
            	j = j % 3;
            } else {
            	j = 0;
            }
            km = (j ? i.substr(0, j) + thousands_sep : "");
            kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
            //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
            kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
            return km + kw + kd;
        }

        var dataStart = moment('2017-10-16 12:00:00Z').valueOf();//2017-10-16 12:00:00 UTC
        var dataHour = dataStart + 3600 * 1000;
        var dataDay = dataStart + 3600 * 24 * 1000;
        var dataWeek = dataStart + 3600 * 24 * 7 * 1000;
        var dataWeek2 = dataStart + 3600 * 24 * 7 * 2 * 1000;
        var dataEnd = moment('2017-11-15 12:00:00Z').valueOf();//2017-11-15 12:00:00 UTC
        var finished_by_cap = false;

        function get_current_timestamp() {
            return new moment().valueOf();
        }

        var toStart = dataStart - get_current_timestamp(),
            firstHour = dataHour - get_current_timestamp(),
            firstDay = dataDay - get_current_timestamp(),
            firstWeek = dataWeek - get_current_timestamp(),
            secondWeek = dataWeek2 - get_current_timestamp(),
            toEnd = dataEnd - get_current_timestamp();

        // ICO did not started yet
		if(toStart > 0){
			$('#main-screen').show();
			setInterval(function() {
				var distance = dataStart - get_current_timestamp();
				if (distance > 0) {
					var days = Math.floor(distance / (1000 * 60 * 60 * 24));
					var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.floor((distance % (1000 * 60)) / 1000);
					days = days > 9 ? days : ( '0' + days);
					hours = hours > 9 ? hours : ( '0' + hours);
					minutes = minutes > 9 ? minutes : ( '0' + minutes);
					seconds = seconds > 9 ? seconds : ( '0' + seconds);
					$("#days_pre").text(days);
					$("#hours_pre").text(hours);
					$("#minutes_pre").text(minutes);
					$("#seconds_pre").text(seconds);
				}else{
					window.location.reload(true);
				}
			}, 1000);
		}

        // ICO ongoing
		if(toStart <= 0 && toEnd > 0){
			$('#sale-started').show();

            if (firstHour >= 0) {
                var currentCounter = dataHour;
                $(".box-double").removeClass('hidden');
                $("#first_hour_info").removeClass('hidden');
                $("#first_hour_info_post").removeClass('hidden');
            } else if (firstDay >= 0) {
                var currentCounter = dataDay;
                $(".box-double").removeClass('hidden');
                $("#first_day_info").removeClass('hidden');
                $("#first_day_info_post").removeClass('hidden');
            } else if (firstWeek >= 0) {
                var currentCounter = dataWeek;
                $(".box-double").removeClass('hidden');
                $("#first_week_info").removeClass('hidden');
                $("#first_week_info_post").removeClass('hidden');
            } else if (secondWeek >= 0) {
                var currentCounter = dataWeek2;
                $(".box-double").removeClass('hidden');
                $("#second_week_info").removeClass('hidden');
                $("#second_week_info_post").removeClass('hidden');
            } else {
                var currentCounter = dataEnd;
                $(".box-time").removeClass('hidden');
            }

			setInterval(function() {
				var distance = currentCounter - get_current_timestamp();
				if (distance > 0) {
					var days = Math.floor(distance / (1000 * 60 * 60 * 24));
					var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.floor((distance % (1000 * 60)) / 1000);

					days = days > 9 ? days : ( '0' + days);
					hours = hours > 9 ? hours : ( '0' + hours);
					minutes = minutes > 9 ? minutes : ( '0' + minutes);
					seconds = seconds > 9 ? seconds : ( '0' + seconds);
					$(".timer-days").text(days);
					$(".timer-hours").text(hours);
					$(".timer-minutes").text(minutes);
					$(".timer-seconds").text(seconds);

				}else{
					window.location.reload(true);
				}
			}, 1000);
		}

        if(toStart <= 0){
            update_ico_progress();
        }

        function update_ico_progress() {

            var jsonUrl = "https://" + network + ".infura.io/" + infuraApiKey;
            var postData = {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "eth_getBalance",
                "params": [walletaddr,"latest"]
            };

            $.post( jsonUrl, JSON.stringify(postData),
                function( data, error ) {
                    if (data.result !== undefined) {
                        var weiInvested = parseInt(data.result, 16);
                        var ethInvested = Math.round((weiInvested / 1000000000000000000) * 100) / 100;
                        var usdInvested = ethInvested * usdethRate;
                        var prcInvested = Math.round((usdInvested / usdCap) * 100 * 100) / 100;

                        $('#usd_invested').html(number_format(usdInvested, 0, '.', ',') + ' USD');
                        $('#eth_invested').html(number_format(ethInvested, 2, '.', ',') + ' ETH');
                        $('#prc_invested').css('width', prcInvested + '%');
                        $('#usd_cap').html(number_format(usdCap, 0, '.', ',') + ' USD');
                        $('#eth_cap').html(number_format(ethCap, 0, '.', ',') + ' ETH');
                        $('.box-progressbar').removeClass('hidden');

                        if (ethInvested >= ethCap) {
                            finished_by_cap = true;
                        }
                        if (toEnd < 0 && !finished_by_cap) {
                            setTimeout(function(){ update_ico_progress() }, 15000);
                        }
                    }
                }
            , 'json');
        }

		function play_video(){
			$('video').each(function(){
				if ($(this).is(":in-viewport")) {
					$(this)[0].play();
				} else {
					$(this)[0].pause();
				}
			});
		}
		$(window).scroll(function(){
			play_video();
		});
		play_video();


		/** post preorder form **/
		$('#presaleBtn').click(function() {
			$("#presale").attr('target', 'presale_form_iframe');
			$('#presale').submit();
			$('#presaleModal').modal('hide');
			$('#preorderAddress').modal('show');
		});
		$('#preorderAddressBtn').click(function() {
			$('#preorderAddress').modal('hide');
			$('#depositAddress').modal('show');
		});
	});

var video = document.querySelector('#video');
var video2 = document.querySelector('#video2');
window.addEventListener('touchstart', function videoStart() {
	video.play();
	video2.play();
	this.removeEventListener('touchstart', videoStart);
});
