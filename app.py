from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/forgot')
def forgot():
    return render_template('forgot.html')


@app.route('/new', methods=['GET', 'POST'])
def new():
    if request.method == 'GET':
        return render_template('signup.html')
    else:
        username = request.form['username']
        password = request.form['password']
        phone = request.form['phone']
        community = request.form['community']
        return"asd"


if __name__ == '__main__':
    app.run(debug=True)

