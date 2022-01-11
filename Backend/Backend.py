from pytube import YouTube

# Url des Videos
url = 'https://www.youtube.com/watch?v=YDDz1Er2IXA&list=RDMMYDDz1Er2IXA&start_radio=1'
my_video = YouTube(url)

# Gibt den Videotitel in der Konsole Wieder
print(my_video.title)

# Wählt die höchste mögliche Auflösung des Videos zum download
my_video = my_video.streams.get_highest_resolution()

# Downloaded das Video
my_video.download()