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

$message_id = $_POST["message_id"];
$phone = $_POST["phone"];

$sql = "SELECT message_id, is_seen, seen_at FROM messages_seen WHERE message_id = '" . $message_id . "' AND phone = '" . $phone . "'";
$result = $conn->query($sql);

$jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($jsonData);

$conn->close();

?>