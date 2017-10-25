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
$content = $_POST["content"];
$message_id = $_POST["message_id"];

$sql ="UPDATE messages SET message = '".$content."', updated_at = NOW() WHERE message_id = '".$message_id."' AND conversation_id = '".$conversation_id."'";
$conn->query($sql); 

$conn->close();

?>