 
// Changes image opacity based on mouse position
$(document).mousemove(function(a) {
        r = a.pageX,
        c = a.pageY,
        d = e(u, r, c);
        var t = d / 100 * l / 3e3;
        $(".front").css("opacity", t)
    })
