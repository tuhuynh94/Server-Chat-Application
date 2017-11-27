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
$password = $_POST["password"];
$image_source = $_POST["image_source"];
$username = $_POST["username"];
$email = $_POST["email"];

$sql ="UPDATE users SET username = '".$username."', birthday = '".$birthday."', password = '".$password."',image_source = '".$image_source."',email = '".$email."' WHERE phone = '".$phone."'";
echo $sql;
$conn->query($sql); 

$conn->close();

?>