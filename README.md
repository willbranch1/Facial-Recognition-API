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

## Walkthrough
- Note: all the development was done on a local computer
1. Open two terminals and navigate to the directory. To start the API, run the command 'node .'. To start the WebServer, run the command 'php -S localhost:8080'.
<p align="center">
    <img alt="Terminal Windows" width="75%" src="https://i.imgur.com/Bc9BRjv.png"/>
    <p align="center">Admin page that is revealed after a user logs in.</p>
    <br>
</p>
2. In a web browser, go to localhost:8080. The image on the left is from your computers webcam.
<p align="center">
    <img alt="WebPage Example" width="75%" src="https://i.imgur.com/aBs9L8J.png"/>
    <br>
</p>
3. If the 'Take Snapshot' button is clicked, the image will be displayed to the right. 
<p align="center">
    <img alt="Sample Picture" width="75%" src="https://i.imgur.com/UyiWW5k.png"/>
    <br>
</p>
4. If 'Verify User' is clicked, an error message will be returned from the API since the user is not in the verified database. We must first add the user.
<p align="center">
    <img alt="API Error" width="75%" src="https://i.imgur.com/BNX9bM5.png"/>
    <br>
</p>
5. On the right side are form boxes for the users name. If those forms are filled and a picture has been taken, The 'Enter New User' button will enter the person into the database.
<p align="center">
    <img alt="Enter New User" width="75%" src="https://i.imgur.com/HOELUyL.png"/>
    <br>
    <img alt="Initialized" width="75%" src="https://i.imgur.com/ljzO003.png"/>
    <br>
</p>
6. If we then take a new picture and hit 'Verify User', you will see the API returns my name and id from the database since I am now a verified person in the database. 
<p align="center">
    <img alt="New Picture" width="75%" src="https://i.imgur.com/vdiatVH.png"/>
    <br>
    <img alt="Verified" width="75%" src="https://i.imgur.com/A3pW4Hf.png"/>
    <br>
</p>






