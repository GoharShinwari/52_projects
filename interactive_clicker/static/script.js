var socket = io();

function incrementCounter() {
    socket.emit('increment');
}

document.getElementById('buyMinion').addEventListener('click', function() {
    let count = document.getElementById('counter').textContent;
    let clicks = parseInt(count.replace(/\D/g, ''), 10);

    if (clicks >= 99) {
        socket.emit('minionCountIncrease');
    } else {
        alert('Not enough clicks to buy a minion!');
    }
});

setInterval(function() {
    socket.emit('increment_by_minions');
}, 1000);

socket.on('update_counter', function(data) {
    document.getElementById('counter').textContent = `Clicks: ${data.counter}`;
});

socket.on('update_minionCount', function(data) {
    document.getElementById('minionCount').textContent = `CPS: ${data.minionCount}`;
});

socket.on('increment_users', function(data) {
    document.getElementById('curr_users').textContent = `Current Users: ${data.curr_users}`;
});

socket.on('decerement_users', function(data) {
    document.getElementById('curr_users').textContent = `Current Users: ${data.curr_users}`;
});
