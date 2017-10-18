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

$phone = $_POST["phone"];
$other_phone = $_POST["other_phone"];


$sql = "DELETE FROM friends WHERE phone = '" . $phone . "' AND friend_phone = '". $other_phone ."'";
$result = $conn->query($sql);

$conn->close();

?>