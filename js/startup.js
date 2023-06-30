
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

    queueInit();
    initAutoPlay();

    window.scrollTo(0, 0);
    $('.jw-icon-fullscreen').click();
}




/*-----------------------------------------------------------------*/
/*-----------------------------QUEUE-------------------------------*/
/*-----------------------------------------------------------------*/

const queueHeaderBtn = '<div class="seQueue"><button data-toggle="dropdown" data-placeholder="false"><i class="bi bi-list-ul"></i> </button></div>';

const queueInit = () => {
    loadQueue();
    loadQueueModal();
}

const loadQueue = () => {
    if (!localStorage.getItem('myQueue')) localStorage.setItem('myQueue', '[]');
}

const loadQueueModal = () => {
        //Add Queue Modal to Site Nav Header
        $('body').prepend('<div class="queue-modal"><div class="queue-modal-content"><div class="queue-details"><div class="server-header"><h3 class="header-text">My Queue</h3><div id="close-btn" class="server-header-btn"><i class="bi bi-x-lg"></i></div></div><table class="queue-table"><tbody><tr class="queue-table-headers"><th>Order</th><th>Name</th></tr></tbody></table><div class="queue-button-panel"><div id="btnFav" class="btn btn-primary"><i class="fa fa-star" aria-hidden="true"></i></div><div id="btnQueueClear" class="btn btn-primary"><i class="fa fa-trash" aria-hidden="true"></i></div><div id="btnShuffleQueue" class="btn btn-primary"><i class="fa fa-random" aria-hidden="true"></i></div><input class="quickAddInput" placeholder="Quick Add"><div class="btn btn-primary quickAddSubmit"><i class="fa fa-search" aria-hidden="true"></i></div></div></div></div></div>');

        $("#user > div").prepend('<div class="seQueue"><button data-toggle="dropdown" data-placeholder="false"><i class="bi bi-list-ul"></i> </button></div>');

        $('.seQueue').click(() => displayQueueModal());
        $('#close-btn').click(() => closeQueueModal());
}

const addToQueue = url => {
    //var myQueue = JSON.parse(localStorage.getItem('myQueue'));

    //myQueue.push([text, url]);

    //localStorage.setItem("myQueue", JSON.stringify(myQueue));
    //triggerNoticiation(`${text} successfully added to your queue!`);
}

const displayQueueModal = () => {
    //loadQueueItems();
    //$('#btnFav').click(e => { loadFavoritesList() });
    $('.queue-modal').css('display', 'flex');
    $('body').toggleClass('noscroll');
}

const closeQueueModal = () => {
    $('.queue-modal').hide();
    $('.queue-table').html('<tbody><tr class="queue-table-headers"><th>Order</th><th>Name</th></tr></tbody>');
    $('body').toggleClass('noscroll');
}


/*-----------------------------------------------------------------*/
/*-----------------------------AUTO-PLAY---------------------------*/
/*-----------------------------------------------------------------*/


const initAutoPlay = () => {
    $('.btn-watchnow').click();
    setTimeout(window.scrollTo(0, 0), 1000);
}


const waitForPlayer = setInterval(() => {
    var isAutoPlayOn = JSON.parse(localStorage.getItem('autoplay'));

    if (!isAutoPlayOn) clearInterval(waitForPlayer);

    if ($('.jw-video').length > 0) {
        clearInterval(waitForPlayer);
        document.getElementById('player').scrollIntoView();
        $('.jw-video').get(0).play();
        listenForEndOfMedia;
        console.log('[SOAPTV AutoPlay] Autoplay initiated.');
    }
}, 1000);

const listenForEndOfMedia = setInterval(() => {
    var elapsedSeconds, durationSeconds;

    var elapsed = $('#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-elapsed').text(),
        duration = $('#player > div.jw-wrapper.jw-reset > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-duration').text();

    var a = elapsed.split(':'),
        b = duration.split(':');

    //Repeat code. Gross. I have to go to bed. :(
    if (a.length == 3) elapsedSeconds = ((parseInt(a[0]) * 60) * 60) + (parseInt(a[1]) * 60) + parseInt(a[2]);
    if (a.length == 2) elapsedSeconds = (parseInt(a[0]) * 60) + parseInt(a[1]);
    if (a.length == 1) elapsedSeconds = parseInt(a[0]);

    if (b.length == 3) durationSeconds = ((parseInt(b[0]) * 60) * 60) + (parseInt(b[1]) * 60) + parseInt(b[2]);
    if (b.length == 2) durationSeconds = (parseInt(b[0]) * 60) + parseInt(b[1]);
    if (b.length == 1) durationSeconds = parseInt(b[0]);

    if ((durationSeconds - elapsedSeconds) == 5) console.log("Holy shit this works.")
}, 1000);


const playNextInQueue = () => {
    var queue = JSON.parse(localStorage.getItem('myQueue'));

    if (queue.length < 1) return;

    var nextMedia = queue.shift();
    localStorage.setItem("myQueue", JSON.stringify(queue));

    window.location.replace(nextMedia[1]);
}