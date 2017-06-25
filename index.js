 
// Changes image opacity based on mouse position
$(document).mousemove(function(a) {
        r = a.pageX,
        c = a.pageY,
        d = e(u, r, c);
        var t = d / 100 * l / 3e3;
        $(".front").css("opacity", t)
    })

//Changes background color based on mouse position
$(document).mousemove(function(e){
    var $width = ($(document).width())/(252 - 23);
    var $height = ($(document).height())/(253 - 2);
    var $pageX = parseInt(e.pageX / $width,10) + 23;
    var $pageY = parseInt(e.pageY / $height,10) + 2;
    $("body").css("background-color", "rgb("+$pageX+","+$pageY+","+$pageX+")");
    console.log($pageX, $pageY);
}); 
