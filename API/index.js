const config = require('./config.js');
const lib = require('./lib.js');
const fs = require('fs');
const { spawn } = require('child_process');
const mysql = require('mysql');
const express = require('express');

const con = lib.con_db(config.host, config.user, config.password, config.database, mysql); //connect to database

const app = express();
app.use(express.json()); //allows data to be posted as json

app.listen( //initialize API to listen on specified port
    config.port,
    function(err) {
        if (err) throw err;
        else console.log('It\'s alive on http://localhost:' + config.port);
    }
);

/**
 * Handles a POST request to verify a user.
 * 
 * POST request contains an image that is formatted and sent to a python script along with 
 * known faces. The known faces are compared with the to be verified image and and a result is retured.
 * 
 * @returns '0' for failed verifcation and json object for successful verification.
 */
app.post('/verify', function(req, res) {
    const { img } = req.body;

    var base64 = img.replace('data:image/jpeg;base64,','');
    var temp = 'C:/Users/621wa/Documents/Facial-Recognition-API/Photos/temp.jpg'

    fs.writeFile(temp, base64, 'base64', function(err) { //Store to be verified photo in a temporary location.
        if (err) throw(err);
    });
    
    con.query('SELECT filepath FROM valid_photos;', function(err, data) {
        if (err) throw err;
        else {
            const python = spawn('py', ['face_compare.py',temp,JSON.stringify(data)]); //Initialize python child process.
            python.stdout.on('data', function (data) {
                dataToSend = data.toString().trim(); //Trim data to remove unnecessary end of line characters.
                console.log(dataToSend)
                if (dataToSend != '0'){
                    //If the temp face matched a known face, grab the name and id of the known face and send them.
                    con.query('SELECT firstname, lastname, id FROM valid_photos WHERE filepath=\'' + dataToSend + '\';', function(err, user) {
                        if (err) throw err;
                        else {
                            res.send(JSON.stringify(user));
                        }
                    });
                } else {
                    //Otherwise, send a failed login error.
                    console.log('ERROR: failed login');
                    res.send('0');
                }
            });
            python.on('close', function(code) { //Close python child process.
                if (code != 0) {
                    console.log('ERROR: child process did not close correctly with code: ' + code);
                }
            });
        }
    });
});

/**
 * Handles a post request to initialize a known user.
 * 
 * Stores the image on the local machine and formats a MySQL query that inserts a verified face filepath into a database.
 * 
 * @returns '0' for failed initialization and '1' for succesful initialization.
 */
app.post('/initvalid', function(req, res) {
    const { img } = req.body;
    const { firstname } = req.body;
    const { lastname } = req.body;

    var base64 = img.replace('data:image/jpeg;base64,','');

    filepath = 'C:/Users/621wa/Documents/Facial-Recognition-API/Photos/' + firstname + lastname + '.jpg';
    
    fs.writeFile(filepath, base64, 'base64', function(err) { //Writes image path to file system.
        if (err) {
            console.log(err);
            res.send('0');
        }
        else { //Only inserts into the database if there is no error.
            var sql = 'INSERT INTO valid_photos (filepath, firstname, lastname) VALUES (\'' + filepath + '\', \'' + firstname + '\', \'' + lastname + '\');';            
            con.query(sql, function(err) {
                if (err) {
                    console.log(err);
                    res.send('0');
                }
                else {
                    console.log('Succesfully inserted new user ' + firstname + ' ' + lastname + '.');
                    res.send('1');
                }
            });
        }
    });
});