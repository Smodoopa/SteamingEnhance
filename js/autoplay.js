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