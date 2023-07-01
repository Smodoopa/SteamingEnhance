
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
}

const loadQueue = () => {
    if (!localStorage.getItem('myQueue')) localStorage.setItem('myQueue', '[]');
}

const loadQueueModal = () => {
        //Add Queue Modal to Site Nav Header
        $('body').prepend('<div class="queue-modal"><div class="queue-modal-content"><div class="queue-details"><div class="server-header"><h3 class="header-text">My Queue</h3><div id="close-btn" class="server-header-btn"><i class="bi bi-x-lg"></i></div></div><table class="queue-table"><tbody><tr class="queue-table-headers"><th>Order</th><th>Name</th></tr></tbody></table><div class="queue-button-panel"><div id="btnQueueClear" class="btn btn-primary"><i class="bi bi-trash"></i></div><div id="btnShuffleQueue" class="btn btn-primary"><i class="bi bi-shuffle"></i></div><input class="quickAddInput" placeholder="Quick Add"><div class="btn btn-primary quickAddSubmit"><i class="fa fa-search" aria-hidden="true"></i></div></div></div></div></div>');

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