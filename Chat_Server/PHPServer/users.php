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

$members = $_POST["members"];

$sql = "SELECT phone, username,birthday, email, conversations, image_source, status FROM users WHERE phone IN (".$members.")";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($jsonData);
} else {
    echo "error";
}
$conn->close();

?>