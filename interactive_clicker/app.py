from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

counter = 0
curr_users = 0
minionCount = 0

@app.route('/')
def index():
    return render_template('index.html', counter=counter, minionCount=minionCount, curr_users=curr_users)

@socketio.on('connect')
def on_connect():
    global curr_users
    curr_users += 1
    emit('update_counter', {'counter': counter}, room=request.sid)
    emit('update_minionCount', {'minionCount': minionCount}, room=request.sid)
    emit('increment_users', {'curr_users': curr_users}, broadcast=True)

@socketio.on('disconnect')
def on_disconnect():
    global curr_users
    curr_users -= 1
    emit('decerement_users', {'curr_users': curr_users}, broadcast=True)

@socketio.on('increment')
def handle_increment():
    global counter
    counter += 1
    emit('update_counter', {'counter': counter}, broadcast=True)

@socketio.on('minionCountIncrease')
def handle_minion_count_increase():
    global minionCount, counter
    if counter >= 99:
        minionCount += 1
        counter -= 99
        emit('update_minionCount', {'minionCount': minionCount}, broadcast=True)
        emit('update_counter', {'counter': counter}, broadcast=True)

@socketio.on('increment_by_minions')
def handle_increment_by_minions():
    global counter, minionCount
    counter += minionCount
    emit('update_counter', {'counter': counter}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
