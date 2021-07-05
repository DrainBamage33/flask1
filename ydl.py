from __future__ import unicode_literals
import youtube_dl
from flask import send_file
from pytube import YouTube
import os

class MyLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)


def my_hook(d):
    if d['status'] == 'finished':
        print('Done downloading, now converting ...')


def download_video(url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'logger': MyLogger(),
        'progress_hooks': [my_hook],
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download(["https://www.youtube.com/watch?v=4vGPyznu-Ys"])

def ytdl(url):
    download_path = YouTube(url).streams.filter(only_audio=True).first().download()
    new_path = download_path
    # new_path, ext = os.path.splitext(download_path)
    # new_path = new_path + '.mp3'
    # os.rename(download_path, new_path)
    fname = new_path.split('//')[-1]
    return send_file(fname, as_attachment=True)
