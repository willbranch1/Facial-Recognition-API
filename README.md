# Facial Recognition API

## General Overview
Project included creating an API that is used for facial recognition. The API was created in NodeJS and currently contains two functions. One is to verify if a face is known, the other is to add a known face to the database. A python file was created that handled the actual comparison of the faces. This python script is called by the API. A webpage made from HTML and PHP was created to test the project by capturing images via a webcam and sending them to the API via a POST request. A database was also created with MySQL to store references to known faces.

This project demonstrates knowledge and understanding of how APIs operate. It shows how APIs are created and how they can be used by other web apps to simplify operations and gather information. It also shows an understanding of how to properly communicate between different programs to seemlessly create an application. 

## Technology Used
- MySQL
- Python
- NodeJS
- HTML
- PHP
- JQuery

## Methodology
- A database was setup utilizing MySQL. This database stores information on verified faces such as the filepath to the picture, firstname, lastname, and user id. This database is accessed by the API.
- A python file was created that utilizes the face_recognition library. This file is called from the API to perform the comparison of faces. The python file is passed the filepath of two images. One filepath points to temporary image just taken by the user and the other points to a verified image from the database. It then uses those filepaths to access and compare the images. If the faces within the images match, the filepath of the verified face is returned. If they do not match, then a zero character is returned.
- NodeJS was used to create the API. The API is accessed via post requests. It is set up to listen on a port defined in the config.js file. This file also contains other configuration info such as the database credentials.
  - The /verify post request verifies if the temp image matches any image already in the database. It is responsible for calling the Python file. If a match is found, the persons name and id is returned to the PHP page. 
  - The /initvalid post request adds another face to the verified faces in the database. Other information such as the persons name is also inserted.
  - Note: more functions such as the ability to ban a face are in the works.  
- A simple webpage was created that allows the capture of an image via a webcam. An HTML page handles the image capture and sends the image uri and other data to a PHP page. The image can then be sent to the API through a curl connection. The webpage then waits for a response from the API and prints an output message. 
