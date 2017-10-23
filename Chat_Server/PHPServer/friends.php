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
//$phone = "1";

$sql = "SELECT phone, friend_phone,username, add_at, birthday,email FROM friends WHERE phone = '" . $phone . "'";
$result = $conn->query($sql);

$jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($jsonData);

$conn->close();

?>