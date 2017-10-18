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

$conversation_name = $_POST["conversation_name"];
$member = $_POST["mem"];
$creator = $_POST["creator"];


$sql ="INSERT INTO conversations (conversation_id, conversation_name,member,creator);
 VALUES ('NULL','".$conversation_name."','".$member."','".$creator."',,,);";
    //echo($sql);
    $conn->query($sql);    
 
$sql = "SELECT * from conversations ORDER BY id DESC LIMIT 1";
$result = mysqli_query($conn,$sql);

$jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo "s::1" . json_encode($jsonData);

$conn->close();

?>