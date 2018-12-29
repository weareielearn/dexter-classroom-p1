from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/forgot')
def forgot():
    return render_template('forgot.html')


@app.route('/new')
def forgot():
    return render_template('signup.html')


if __name__ == '__main__':
    app.run(debug=True)

