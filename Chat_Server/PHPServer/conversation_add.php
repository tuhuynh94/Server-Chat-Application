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

$creator = $_POST["creator"];
$mem = $_POST["mem"];
$conversation_name = $_POST["conversation_name"];
$sql ="INSERT INTO conversations (conversation_id, conversation_name,member,creator, created_at) VALUES ('NULL','".$conversation_name."','".$mem."','".$creator."',NOW());";

///echo($sql);
$conn->query($sql);    
 
$sql = "SELECT * from conversations ORDER BY conversation_id DESC LIMIT 1";
$result = mysqli_query($conn,$sql);

$jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($jsonData);

$conn->close();

?>