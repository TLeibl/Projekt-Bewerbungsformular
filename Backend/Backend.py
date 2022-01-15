# from pytube import YouTube

# # Url des Videos
# url = 'https://www.youtube.com/watch?v=tOixFKz-E0o'
# my_video = YouTube(url)

# # Gibt den Videotitel in der Konsole Wieder
# print(my_video.title)

# # Wählt die höchste mögliche Auflösung des Videos zum download
# my_video = my_video.streams.get_highest_resolution()

# # Downloaded das Video
# my_video.download()
# Python program to write JSON
# to a file
  
  
import json
  
# Data to be written
dictionary ={
    "name" : "sathiyajith",
    "rollno" : 56,
    "cgpa" : 8.6,
    "phonenumber" : "9976770500"
}
  
# Serializing json 
json_object = json.dumps(dictionary, indent = 4)
  
# Writing to sample.json
with open("sample.json", "w") as outfile:
    outfile.write(json_object)