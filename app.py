from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/git_api")
def demo():
    return render_template("demo.html")

@app.route("/youtube_api")
def youtube():
    return render_template("youtubeapi.html")


if __name__=="__main__":
    app.run(debug=True)
