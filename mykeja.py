from frontend import create_app, socketio

app = create_app()

if __name__ == '__main__':
    if socketio is not None:
        socketio.run(app, debug=True, use_reloader=False, host='0.0.0.0', port=5000)
    else:
        app.run(debug=True, use_reloader=False, host='0.0.0.0', port=5000)