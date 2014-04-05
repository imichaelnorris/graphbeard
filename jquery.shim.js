jQuery.fn.topcenter = function() {
    this.css("position","absolute");
    this.css("top", 25+"px");
    this.css("left", Math.max(0, (($(window).width() -
                        $(this).outerWidth())/2) + $(window).scrollLeft()) + "px")
        this.css("padding", parseInt(this.css("padding"))+25);
    this.corner('cool 20px');
    return this;

}
