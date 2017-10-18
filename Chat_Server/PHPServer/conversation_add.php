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


$sql = "SELECT phone, birthday,username FROM users WHERE phone = '" . $other_phone . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();    
    
    $friend_user_name = $row["username"];
    $friends_birthday = $row["birthday"];
    $friend_username = $row["username"];
    
    $sql = "INSERT INTO friends (phone, friend_phone,birthday,username) VALUES ('".$phone."', ".$other_phone.",'".$friends_birthday."','".$friend_user_name."')";
    $result = $conn->query($sql);    
}

$conn->close();

?>