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

$conversation_id = explode(';',$_POST["conversations"]);

$sql = "SELECT * FROM messages WHERE conversation_id IN '" . $conversation_id . "'";
echo $sql +"\n";
$result = $conn->query($sql);

$jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($jsonData);

$conn->close();

?>