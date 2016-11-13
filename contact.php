<?php

// configure
$from = $_POST['email']; 
$sendTo = 'peiniwo@gmail.com';
$subject = 'Booking Request: Robert Chang Wedding';
$fields = array('firstName' => 'FirstName', 'lastName' => 'LastName', 'phone' => 'Phone', 'email' => 'Email', 'comments' => 'Comments', 'eventType' => 'EventType', 'eventDate' => 'EventDate', 'eventLocation' => 'EventLocation', 'talent' => 'Talent', 'eventStart' => 'StartTime', 'eventLong' => 'HowLong'); // array variable name => Text to appear in email
$okMessage = 'Contact form successfully submitted. Thank you, we will get back to you soon!';
$errorMessage = 'There was an error while submitting the form. Please try again.';

// let's do the sending

try
{
    $emailText = "You have new message from contact form\n=============================\n";

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    mail($sendTo, $subject, $emailText, "From: " . $from);

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);
    
    header('Content-Type: application/json');
    
    echo $encoded;
}
else {
    echo $responseArray['message'];
}
