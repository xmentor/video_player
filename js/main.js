(function (d) {
    'use strict';
    
    function convertTime(seconds) {
        var hr  = Math.floor(seconds / 3600),
            min = Math.floor((seconds - (hr * 3600)) / 60),
            sec = Math.floor(seconds - (hr * 3600) -  (min * 60));
        
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec  = "0" + sec;
        }
        return min + ':' + sec;
    }
    
    var $video = d.querySelector(".video-player"),
        $video_width = Number.parseInt(window.getComputedStyle($video, null).getPropertyValue("width"));
    $video.controls = false;
    $video.loop = false;

    d.querySelector(".bar-time").style.width = $video_width - ($video_width / 1.6) + "px";
    
    //
    $video.addEventListener("timeupdate", function () {
        var bar = d.querySelector(".bar"),
            $time = d.querySelector(".time"),
            $time_duration = Math.floor(this.duration).toString(),
            $time_current = Math.floor(this.currentTime);
        bar.style.width = (this.currentTime / this.duration * 100) + "%";
        $time.innerHTML  = `${convertTime($time_current)}/${convertTime($time_duration)}`; 
        
    }, false);
    //
    $video.addEventListener("click", function () {
        if (this.paused) {
            this.play();
            d.querySelector(".control-button").classList.add("played");
        } else {
            this.pause();
            d.querySelector(".control-button").classList.remove("played");
        }
    }, false);
    
    //play / stop button
    d.querySelector(".control-button").addEventListener("click", function () {
        if ($video.paused) {
            $video.play();
            this.classList.add("played");
        } else {
            $video.pause();
            this.classList.remove("played");
        }
    }, false);
    // full-screen
    d.querySelector(".full-screen").addEventListener("click", function () {
        window.alert("W budowie");
        /*if (!document.mozFullScreen && !document.webkitFullScreen) {
            if ($video.mozRequestFullScreen) {
                $video.mozRequestFullScreen();
                $video.controls = true;
            } else {
                $video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                $video.controls = true;
            }
        } else {
            if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                $video.controls = false;
            } else {
                document.webkitCancelFullScreen();
                $video.controls = false;
            }
        }*/
    }, false);
    /*
    d.querySelector(".bar-time").addEventListener("click", function () {
       //console.log($video.currentTime);
    }, false);
    */
    
    //input range - change volume
    d.querySelector(".range").addEventListener("change", function () {
        var _value = +this.value / 100,
            vol = d.querySelector(".volume");
        
        console.log(_value);
        if (_value === 0) {
            vol.classList.add("mute");
            $video.muted = true;
        } else {
            vol.classList.remove("mute");
            $video.volume = _value; 
            $video.muted = false;
        }
    }, false);
    //unmute button
    d.querySelector(".unmute").addEventListener("click", function () {
        if (!$video.muted) {
            d.querySelector(".volume").classList.add("mute");
            $video.muted = true;
        }
    } , false);
    // mute button
    d.querySelector(".mute-b").addEventListener("click", function () {
        if ($video.muted) {
            d.querySelector(".volume").classList.remove("mute");
            $video.muted = false;
        }
    } , false);
    
}(document));