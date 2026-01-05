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
    if ($(window).width() > 991) {
        var totalWidth = $('.why-choose--cards').width();
        var textWidth = $(window).width() < 1200
            ? totalWidth - 512
            : totalWidth - 532;
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
                
                if (!$(this).hasClass('active')) {
                    $(this).find('.why-choose--card--title, .why-choose--card--desc').css('width', textWidth);
                }
            });
        });
    }

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

    // Dashboard menu collapse
    $('.dashboard--header--toggle-btn').on('click', function(){
        $('.dashboard--sidebar').toggleClass('active');
    });
    $('.dashboard--sidebar--btn').on('click', function(){
        $('.dashboard--sidebar').removeClass('active');
    });

    // Overlayscroll
    function overlayScroll() {
        if($('.scroll').length) {
            $('.scroll').overlayScrollbars({});
        }
    }
    overlayScroll();

    // Recent Earning chart
    if($('#recentEarnings').length) {
        var categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var recentEarningsOptions = {
            series: [{
                name: 'Deposit',
                color: 'var(--base-1)',
                data: [34, 45, 37, 47, 38, 47, 35, 41, 18, 47, 27, 0]
            },{
                name: 'Withdraw',
                color: '#ff3d3d',
                data: [24, 35, 47, 37, 28, 37, 25, 51, 28, 37, 37, 10]
            }],
            chart: {
                height: 250,
                type: 'line',
                toolbar: {
                    show: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 4
            },
            xaxis: {
                categories: categories
            },
            legend: {
                show: false
            },
            tooltip: {
                x: {
                    formatter: function(value, { dataPointIndex }) {
                        const currentYear = new Date().getFullYear();
                        return `${categories[dataPointIndex]} - ${currentYear}`;
                    }
                },
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: {
                        height: 300,
                    }
                },
            },{
                breakpoint: 576,
                options: {
                    chart: {
                        height: 250,
                    }
                },
            }]
        };
        var recentEarningsChart = new ApexCharts(document.querySelector("#recentEarnings"), recentEarningsOptions);
        recentEarningsChart.render();
    }

    // Password show hide
    $('.password-field--btn').on('click', function(){
        $(this).toggleClass('show');
        if($(this).hasClass('show')) {
            $(this).siblings('input').attr('type', 'text');
        } else {
            $(this).siblings('input').attr('type', 'password');
        }
    });
    // ==========================================
    //      End Document Ready function
    // ==========================================
})(jQuery);