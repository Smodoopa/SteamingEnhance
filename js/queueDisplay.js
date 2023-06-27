const queueHeaderBtn = '<div class="seQueue"><button data-toggle="dropdown" data-placeholder="false"><i class="bi bi-list-ul"></i> </button></div>';

const queueInit = () => {
    loadQueue();
}

const loadQueue = () => {
    if (!localStorage.getItem('myQueue')) localStorage.setItem('myQueue', '[]');
}

const loadQueueModal = () => {
        //Add Queue Modal to Site Nav Header
        $('body').prepend('<div class="queue-modal"><div class="queue-modal-content"><div class="queue-details"><div class="server-header"><h3 class="header-text">My Queue</h3><div id="close-btn" class="server-header-btn"><i class="bi bi-x-lg"></i></div></div><table class="queue-table"><tbody><tr class="queue-table-headers"><th>Order</th><th>Name</th></tr></tbody></table><div class="queue-button-panel"><div id="btnFav" class="btn btn-primary"><i class="fa fa-star" aria-hidden="true"></i></div><div id="btnQueueClear" class="btn btn-primary"><i class="fa fa-trash" aria-hidden="true"></i></div><div id="btnShuffleQueue" class="btn btn-primary"><i class="fa fa-random" aria-hidden="true"></i></div><input class="quickAddInput" placeholder="Quick Add"><div class="btn btn-primary quickAddSubmit"><i class="fa fa-search" aria-hidden="true"></i></div></div></div></div></div>');

        $('.seQueue').click(() => displayQueueModal());
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