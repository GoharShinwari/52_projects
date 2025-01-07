from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

counter = 0
curr_users = 0

@app.route('/')
def index():
    return render_template('index.html', counter=counter)

@socketio.on('increment')  
def handle_increment():
    global counter
    counter += 1
    emit('update_counter', {'counter': counter}, broadcast=True)

@socketio.on('connect')
def increment_users():
    global curr_users
    curr_users += 1 
    emit('increment_users', {'curr_users': curr_users}, broadcast=True)
    print(f'User connected. Current users: {curr_users}')


@socketio.on('disconnect')
def decerement_users():
    global curr_users
    curr_users -= 1 
    emit('decerement_users', {'curr_users': curr_users}, broadcast=True)
    print(f'User disconnected. Current users: {curr_users}')



if __name__ == '__main__':
    socketio.run(app, debug=True)