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
$creator = $_POST["creator"];
$message = $_POST["message"];


$sql ="INSERT INTO messages (message_id, conversation_id, creator, message, created_at)
 VALUES ('NULL','".$conversation_id."','".$creator."','".$message."',NOW());";
$conn->query($sql); 
$sql = "SELECT * from messages ORDER BY message_id DESC LIMIT 1";
$result = mysqli_query($conn,$sql);

$jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($jsonData);

$conn->close();

?>