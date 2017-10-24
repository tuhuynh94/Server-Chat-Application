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

$conversation_id = $_POST["conversations"];

$sql ="INSERT INTO messages (message_id, conversation_id, from_phone, message, created_at, is_send ) VALUES ();";
$conn->query($sql); 
$sql = "SELECT * from conversations ORDER BY message_id DESC LIMIT 1";
$result = mysqli_query($conn,$sql);

$jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);

$conn->close();

?>

<?php