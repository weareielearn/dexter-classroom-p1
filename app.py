from flask import Flask, render_template, request, session, redirect
from operations import userAuth

userAuth.user_auth_init()
app = Flask(__name__)
app.secret_key = 'dexter-classroom-secret-key'


@app.route('/', methods=['POST', 'GET'])
def home():
    if 'dexter_classroom_session' not in session:
        if request.method == 'POST':
            username = request.form['username']
            session['dexter_classroom_session'] = username
            return redirect('/')
        else:
            return render_template('home.html')
    else:
        return redirect('/test')


@app.route('/forgot')
def forgot():
    if 'dexter_classroom_session' not in session:
        return render_template('forgot.html')
    else:
        return redirect('/')


@app.route('/new', methods=['GET', 'POST'])
def new():
    if 'dexter_classroom_session' not in session:
        if request.method == 'GET':
            return render_template('signup.html')
        else:
            username = request.form['username']
            password = request.form['password']
            phone = request.form['phone']
            community = request.form['community']
            userAuth.create_user(username, password, phone, community)
            session['dexter_classroom_session'] = username
            return redirect('/')
    else:
        return redirect('/')


@app.route('/test')
def test():
    if 'dexter_classroom_session' not in session:
        return redirect('/')
    return"Development in process"


# tests
@app.route('/test-logout')
def test_logout():
    if 'dexter_classroom_session' in session:
        session.pop('dexter_classroom_session')
    return redirect('/')


@app.route('/test-session')
def test_session():
    if 'dexter_classroom_session' not in session:
        session['dexter_classroom_session'] = 'test'
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)

