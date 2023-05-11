<?php
if (isset($_POST['button']) && isset($_POST['image']) && isset($_POST['firstname']) && isset($_POST['lastname'])) { //check all post data is sent
    //set the API url based on the value of the button
    if ($_POST['button'] == 'verify') {
        $url = 'http://localhost:8081/verify';
    } elseif ($_POST['button'] == 'initvalid' && $_POST['firstname'] != '' && $_POST['lastname'] != '') {
        $url = 'http://localhost:8081/initvalid';
    } else {
        print_r('ERROR: name not entered');
        return; //only returns if button has value 'inidvalid' and no name was set
    }

    $img = $_POST['image'];
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $button = $_POST['button'];

    $data = json_encode(array('img' => $img, 'firstname' => $firstname, 'lastname' => $lastname)); //jsonify data so it can be sent to api
    
    //create a curl connect with proper fields to request data from api
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    $result = curl_exec($curl);
    curl_close($curl);

    if ($url == 'http://localhost:8081/verify') { //Returns '0' on failed login and json object with user info on successful login.
        if ($result == '0') {
            print_r('Error: user not recognized');
        } else {
            $decoded = json_decode($result, true);
            print_r('Welcome ' .$decoded[0]['firstname'] .' ' .$decoded[0]['lastname'] .'! You have an id of ' .$decoded[0]['id'] .'.');
        }
    } else if ($url == 'http://localhost:8081/initvalid') {
        if ($result == '0') {
            print_r('ERROR: initalization was not successful');
        } else if ($result == '1') {
            print_r('Successfully initialized ' .$firstname .' ' .$lastname .'.');
        }
    }
    
} else {
    print_r('ERROR: POST data sent incorrectly');
}