from flask import Flask, render_template, send_file, request, jsonify, redirect
from ydl import download_video, ytdl
from pytube import YouTube
import sys
import os
from werkzeug.datastructures import ImmutableMultiDict
import json
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

@app.route("/youtube_search")
def youtubes():
    return render_template("YoutubeSearch.html")

@app.route("/form")
def form():
    return render_template("form.html")

@app.route("/download_test", methods=["GET", "POST"])
def download():
    # url = "https://www.youtube.com/watch?v=4vGPyznu-Ys"
    # download_path = YouTube(url).streams.filter(only_audio=True).first().download()
    # new_path, ext = os.path.splitext(download_path)
    # new_path = new_path + '.mp3'
    # os.rename(download_path,new_path)
    # fname = new_path.split('//')[-1]
    # return send_file(fname, as_attachment=True)
    vid_url = "%%https://www.youtube.com/watch?v=dQw4w9WgXcQ%"
    if request.method == 'POST':
        # redirect("/download_test", code=307)
        vid_url = request.form['key']
        url = str(vid_url)
        download_path = YouTube(url).streams.filter(only_audio=True).first().download()
        new_path = download_path
        new_path, ext = os.path.splitext(download_path)
        new_path = new_path + '.mp3'
        os.rename(download_path, new_path)
        fname = new_path.split('//')[-1]
        return send_file(fname, as_attachment=True)
        # return request.form
    else:
        return "I like trains"


if __name__=="__main__":
    app.run(threaded=True,port=5000)
