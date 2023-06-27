const queueInit = () => {
    loadQueue();

    
}



const loadQueue = () => {
    if (!localStorage.getItem('myQueue')) localStorage.setItem('myQueue', '[]');
}





const addToQueue = url => {
    var myQueue = JSON.parse(localStorage.getItem('myQueue'));

    myQueue.push([text, url]);

    localStorage.setItem("myQueue", JSON.stringify(myQueue));
    triggerNoticiation(`${text} successfully added to your queue!`);
}



const loadQueueModal = () => {
    loadQueueItems();

    $('#btnFav').click(e => { loadFavoritesList() });

    $('.queue-modal').css('display', 'flex');
    $('body').toggleClass('noscroll');
}


const closeQueueModal = () => {
    $('.queue-modal').hide();
    $('.queue-table').html('<tbody><tr class="queue-table-headers"><th>Order</th><th>Name</th></tr></tbody>');
    $('body').toggleClass('noscroll');
}