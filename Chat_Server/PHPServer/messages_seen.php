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

if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();
    echo json_encode($row, JSON_UNESCAPED_UNICODE);
} else {
    echo "s::0 this user is not exists";
}
$conn->close();

?>