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
$birthday = $_POST["birthday"];
$image_source = $_POST["image_source"];
$username = $_POST["username"];
$email = $_POST["email"];
$conversations= $_POST["conversations"];

$sql ="UPDATE users SET username = '".$username."', birthday = '".$birthday."',image_source = '".$image_source."',email = '".$email."',conversations = '".$conversations."' WHERE phone = '".$phone."'";
echo $sql;
$conn->query($sql); 

$conn->close();

?>