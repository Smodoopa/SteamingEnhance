
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

    observer.observe(document, { childList: true, subtree: true });
  
    document.addEventListener('tooltipsterElementCreated', function(event) {
      const tooltipElement = event.detail;
    
      const mediaUrl = 'https://fmovies.wtf/' + $(tooltipElement).find('div.tooltipster-box > div > div.action > a').attr('href');
      const mediaTitle = $('.tooltipster-base').find('div.info > div.head > div.start.d-flex > div.name').text();
    
      $(tooltipElement).find('.add2list').click(() => {
            $(tooltipElement).find('div.tooltipster-box > div > div.info > div.head > div.start.d-flex > div.dropdown.user-bookmark > div').append('<a id="queueMedia" class="dropdown-item" mediaUrl="' + mediaUrl + '" mediaTitle="' + mediaTitle + '">Queue</a>');
            $('#queueMedia').click(() => {
                const mediaUrl = $('#queueMedia').attr('mediaUrl');
                const mediaTitle = $('#queueMedia').attr('mediaTitle');
                console.log(mediaTitle);
                addToQueue(mediaUrl, mediaTitle);
            });
      });
    });
    waitForPlayer();
}

const waitForPlayer = setInterval(() => {
    if ($('.jw-video').length > 0) {
        clearInterval(waitForPlayer);
        document.getElementById('player').scrollIntoView();
        //$('#divTurnOff').click();
        $('.jw-video').get(0).play();
        listenForEndOfMedia;
        console.log('Autoplay initiated.');
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

    if ((durationSeconds - elapsedSeconds) == 5) playNextInQueue();
}, 1000);


const playNextInQueue = () => {
    var queue = JSON.parse(localStorage.getItem('myQueue'));

    if (queue.length < 1) return;

    var nextMedia = queue.shift();
    localStorage.setItem("myQueue", JSON.stringify(queue));

    window.location.replace(nextMedia[1]);
}

const loadQueue = () => {
    if (!localStorage.getItem('myQueue')) localStorage.setItem('myQueue', '[]');
}

const loadQueueModal = () => {
        //Add Queue Modal to Site Nav Header
        $('body').prepend('<div class="queue-modal"><div class="queue-modal-content"><div class="queue-details"><div class="server-header"><h3 class="header-text">My Queue</h3><div id="close-btn" class="server-header-btn"><i class="bi bi-x-lg"></i></div></div><table class="queue-table"><tbody><tr class="queue-table-headers"><th>Order</th><th>Name</th></tr></tbody></table><div class="queue-button-panel"><div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group me-2" role="group" aria-label="First group" style="margin-right: 15px;"><button id="btnQueueClear" type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button><button id="btnShuffleQueue" type="button" class="btn btn btn-secondary"><i class="bi bi-shuffle"></i></button></div><div class="input-group"><input type="text" class="form-control" placeholder="Search..."><div class="input-group-append"><button class="btn btn-secondary" type="button"><i class="bi bi-search"></i></button></div></div></div></div></div></div></div>');

        $("#user > div").prepend('<div class="seQueue"><button data-toggle="dropdown" data-placeholder="false"><i class="bi bi-list-ul"></i> </button></div>');

        $('.seQueue').click(() => displayQueueModal());
        $('#close-btn').click(() => closeQueueModal());

        $('#btnQueueClear').click(() => {
            localStorage.setItem('myQueue', '[]');
            closeQueueModal();
            loadQueueModal();
        });

        $('#btnShuffleQueue').click(() => {
            shuffleQueue();
        });
}

const shuffleQueue = () => {
    var queue = JSON.parse(localStorage.getItem('myQueue'));

    for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
    }

    localStorage.setItem("myQueue", JSON.stringify(queue));

    reloadQueueItems();
}

const addToQueue = (url, title) => {
    var myQueue = JSON.parse(localStorage.getItem('myQueue'));

    myQueue.push([title, url]);

    localStorage.setItem("myQueue", JSON.stringify(myQueue));
    console.log('Added ' + title + ' to your queue. Link: ' + url);
    //triggerNoticiation(`${text} successfully added to your queue!`);
}

const displayQueueModal = () => {
    loadQueueItems();
    console.log("Display queue modal.");
    $('.queue-modal').css('display', 'flex');
    $('body').toggleClass('noscroll');
}

const closeQueueModal = () => {
    $('.queue-modal').hide();
    $('.queue-table').html('<tbody><tr class="queue-table-headers"><th>Order</th><th>Name</th></tr></tbody>');
    $('body').toggleClass('noscroll');
}

const loadQueueItems = () => {
    var queue = JSON.parse(localStorage.getItem('myQueue'));

    queue.forEach((item, index) => {
        if (index == 0) {
            $('.queue-table tr:last').after(`<tr style="background: #a3a3a340;"><td>${index + 1}</td><td class="queueTableRowData"><a class="text-truncate" href="${item[1]}">${item[0]}<span class="upNextLabel badge text-bg-warning">Up Next</span></a><div id="btnQueueDown" class="btnQueueTable"><i class="bi bi-chevron-down"></i></div><div id="btnQueueUp" class="btnQueueTable"><i class="bi bi-chevron-up"></i></div><div id="btnQueueDelete" class="btnQueueTable"><i class="bi bi-x-lg"></i></div></td></tr>`);
        } else {
            $('.queue-table tr:last').after(`<tr><td>${index + 1}</td><td class="queueTableRowData"><a class="text-truncate" href="${item[1]}">${item[0]}</a><div id="btnQueueDown" class="btnQueueTable"><i class="bi bi-chevron-down"></i></div><div id="btnQueueUp" class="btnQueueTable"><i class="bi bi-chevron-up"></i></div><div id="btnQueueDelete" class="btnQueueTable"><i class="bi bi-x-lg"></i></div></td></tr>`);
        }
    });

    $('.queueTableRowData > #btnQueueDelete').click(e => {
        var myQueue = JSON.parse(localStorage.getItem('myQueue'));
        myQueue.splice($(e.target.parentElement.parentElement).index() - 1, 1);
        localStorage.setItem("myQueue", JSON.stringify(myQueue));
        reloadQueueItems();
    });

    $('.queueTableRowData > #btnQueueUp').click(e => {
        var myQueue = JSON.parse(localStorage.getItem('myQueue')),
            rowToMove = $(e.target.parentElement.parentElement).index() - 1;

        if (rowToMove == 0) return;

        let movedRowDataTemp = myQueue[rowToMove];
        myQueue[rowToMove] = myQueue[rowToMove - 1];
        myQueue[rowToMove - 1] = movedRowDataTemp;

        localStorage.setItem("myQueue", JSON.stringify(myQueue));

        reloadQueueItems();
    });

    $('.queueTableRowData > #btnQueueDown').click(e => {
        var myQueue = JSON.parse(localStorage.getItem('myQueue')),
            rowToMove = $(e.target.parentElement.parentElement).index() - 1;

        if (rowToMove == (myQueue.length - 1)) return;

        let movedRowDataTemp = myQueue[rowToMove];
        myQueue[rowToMove] = myQueue[rowToMove + 1];
        myQueue[rowToMove + 1] = movedRowDataTemp;

        localStorage.setItem("myQueue", JSON.stringify(myQueue));

        reloadQueueItems();
    });
}

const observer = new MutationObserver(function(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (let node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('tooltipster-base')) {
            const event = new CustomEvent('tooltipsterElementCreated', { detail: node });
            document.dispatchEvent(event);
          }
        }
      }
    }
  });

  const reloadQueueItems = () => {
    unloadQueueItems();
    loadQueueItems();
}

const unloadQueueItems = () => {
    $('.queue-table tbody tr:not(:first)').remove();
}