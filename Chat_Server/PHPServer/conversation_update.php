<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chat";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8");

$conversation = $_POST["conversation_id"];
$mem = $_POST["mem"];


$sql = "UPDATE `conversations` SET member = '".$mem."' WHERE conversation_id ='".$conversation."';
$result = $conn->query($sql);    

$conn->close();

?>