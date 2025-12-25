(function ($) {
    "use strict";
  
    // ==========================================
    //      Start Document Ready function
    // ==========================================
    // Background Image
    $(document).ready(function () {
        $(".bg-img").css("background-image", function () {
            var bg = "url(" + $(this).data("bg") + ")";
            return bg;
        });
    });

    // Countdown
    $(".auction--card--body--counter--countdown").each(function(){
        let $this = $(this);
        let totalSeconds = parseInt($this.data("minute")) * 60;
        let initialSeconds = totalSeconds;
  
        function updateCountdown() {
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;
            let h = String(hours).padStart(2, '0');
            let m = String(minutes).padStart(2, '0');
            let s = String(seconds).padStart(2, '0');
            $this.html("<span>" + h + "</span>:<span>" + m + "</span>:<span>" + s + "</span>");
            let percentPassed = (1 - totalSeconds / initialSeconds) * 100;
    
            if (percentPassed >= 80) {
                $this.removeClass("bg--success bg--warning").addClass("bg--danger");
            } else if (percentPassed >= 50) {
                $this.removeClass("bg--success bg--danger").addClass("bg--warning");
            } else {
                $this.removeClass("bg--warning bg--danger").addClass("bg--success");
            }
    
            if (totalSeconds > 0) {
                totalSeconds--;
            } else {
                clearInterval(timer);
            }
        }
  
        updateCountdown();
        let timer = setInterval(updateCountdown, 1000);
    });

    // Why choose us hover effects
    var totalWidth = $('.why-choose--cards').width();
    var textWidth = totalWidth - 532;
    var hoverTimer;
    $('.why-choose--card--title, .why-choose--card--desc').css('width', textWidth);
    $('.why-choose--card').each(function() {
        $(this).on('mouseenter', function() {
            var $self = $(this);
            
            clearTimeout(hoverTimer);

            $self.addClass('active').siblings().removeClass('active');
            
            $self.siblings().find('.why-choose--card--title, .why-choose--card--desc').css('width', textWidth);

            hoverTimer = setTimeout(function() {
                if ($self.hasClass('active')) {
                    $self.find('.why-choose--card--title, .why-choose--card--desc').css('width', '100%');
                }
            }, 650);
        });

        $(this).on('mouseleave', function() {
            clearTimeout(hoverTimer);
            
            $(this).find('.why-choose--card--title, .why-choose--card--desc').css('width', textWidth);
        });
    });

    // Testimonial Slider
    $('.testimonial--slider').each(function () {
        if ($(this).hasClass('testimonial--slider-rtl')) {
            $(this).bxSlider({
                minSlides: 6,
                maxSlides: 6,
                slideMargin: 0,
                ticker: true,
                speed: 50000,
                responsive: true,
                autoDirection: 'prev',
            });
        } else {
            $(this).bxSlider({
                minSlides: 6,
                maxSlides: 6,
                slideMargin: 0,
                ticker: true,
                speed: 50000,
                responsive: true,
            });
        }
    });

    // Odometer Counter Js
    function formatNumber(num) {
        let suffix = '';
        if (num >= 1000000000) {
            num = (num / 1000000000).toFixed(1).replace(/\.0$/, '');
            suffix = 'b';
        } else if (num >= 1000000) {
            num = (num / 1000000).toFixed(1).replace(/\.0$/, '');
            suffix = 'm';
        } else if (num >= 1000) {
            num = (num / 1000).toFixed(1).replace(/\.0$/, '');
            suffix = 'k';
        }
        return { num: num, suffix: suffix };
    }
    function animateOdometer(element) {
        var count = parseInt($(element).attr("data-count"), 10);
        var formattedData = formatNumber(count);
        $(element).html(formattedData.num);
        $(element).siblings('.odometer-suffix').html(formattedData.suffix);
    }
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateOdometer(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    $(".odometer").each(function() {
        observer.observe(this);
    });

    // Mobile menu
    $('.mobile-menu-btn').on('click', function(){
        $('.header--bottom--menu-sm').addClass('active');
    });
    $('.header--bottom--menu-sm--close').on('click', function(){
        $('.header--bottom--menu-sm').removeClass('active');
    });

    // Quick select investment amount
    $('.auction-details--form--quick-select--btn').on('click', function(){
        var dataValue = $(this).attr('data-val');
        var inputField = $('#investmentAmount');

        inputField.val(dataValue);
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Progressbar width
    $('.auction-information--slot--progressbar').each(function(){
        var width = $(this).data('value');

        $(this).css('width', width);
    });
    // ==========================================
    //      End Document Ready function
    // ==========================================
})(jQuery);