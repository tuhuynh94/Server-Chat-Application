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
$pw = $_POST["pw"];


$sql = "SELECT phone, username,birthday, email, conversations  FROM users WHERE phone = '" . $phone . "' OR username =  '" . $phone . "' AND password = '" . $pw . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();

    echo json_encode($row, JSON_UNESCAPED_UNICODE);
} else {
    echo "error";
}
$conn->close();

?>