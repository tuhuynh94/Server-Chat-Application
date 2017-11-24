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

$conversation_id = $_POST["conversation_id"];

$sql = "SELECT conversation_id, conversation_name, creator, created_at, updated_at,member FROM conversations WHERE conversation_id ='". $conversation_id . "'";
$result = $conn->query($sql);

$jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($jsonData);
  
$conn->close();

?>