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
    // ==========================================
    //      End Document Ready function
    // ==========================================
})(jQuery);