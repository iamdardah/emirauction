(function ($) {
    "use strict";
  
    // ==========================================
    //      Start Document Ready function
    // ==========================================
    $(document).ready(function () {
        $(".bg-img").css("background-image", function () {
            var bg = "url(" + $(this).data("bg") + ")";
            return bg;
        });
    });

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

    var totalWidth = $('.why-choose--cards').width();
    var textWidth = totalWidth - 532;
    var hoverTimer; // Variable to hold the timer

    // Set initial widths
    $('.why-choose--card--title, .why-choose--card--desc').css('width', textWidth);

    $('.why-choose--card').each(function() {
        $(this).on('mouseenter', function() {
            var $self = $(this);
            
            // 1. Clear any pending timers from previous hovers
            clearTimeout(hoverTimer);

            // 2. Immediate actions
            $self.addClass('active').siblings().removeClass('active');
            
            // Reset siblings immediately (10ms is practically instant)
            $self.siblings().find('.why-choose--card--title, .why-choose--card--desc').css('width', textWidth);

            // 3. Delayed action for the current active card
            hoverTimer = setTimeout(function() {
                // Check if it's still active before applying 100%
                if ($self.hasClass('active')) {
                    $self.find('.why-choose--card--title, .why-choose--card--desc').css('width', '100%');
                }
            }, 650);
        });

        $(this).on('mouseleave', function() {
            // Clear timer so it doesn't expand after the mouse has already left
            clearTimeout(hoverTimer);
            
            $(this).find('.why-choose--card--title, .why-choose--card--desc').css('width', textWidth);
        });
    });
    // ==========================================
    //      End Document Ready function
    // ==========================================
})(jQuery);