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
$password = $_POST["pass"];
$image_source = $_POST["image_source"];
$username = $_POST["username"];
$email = $_POST["email"];

$sql ="UPDATE users SET username = '".$username."', birthday = '".$birthday."', password = '".$password."',image_source = '".$image_source."',email = '".$email."' WHERE phone = '".$phone."'";
echo $sql;
$conn->query($sql); 

$sql ="UPDATE friends SET username = '".$username."', email = '".$email."', birthday = '".$birthday."', gender = ".$gender.", image_source = '".$image_source"' WHERE friend_phone = '".$phone."'";
echo $sql;
$conn->query($sql); 

$sql ="UPDATE invite_friend SET from_user = '".$username."' WHERE from_phone IN '".$phone."'";
echo $sql;
$conn->query($sql); 

$conn->close();

?>