function startUp() {
    $.fn.insertAt = function (index, element) {
        var lastIndex = this.children().size();
        if (index < 0) {
            index = Math.max(0, lastIndex + 1 + index);
        }
        this.append(element);
        if (index < lastIndex) {
            this.children().eq(index).before(this.children().last());
        }
        return this;
    }
    
    $('.btn-watchnow').click();
    console.log("SteamEnhance activated.");


    window.scrollTo(0, 0);
    $('.jw-icon-fullscreen').click();
}