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

$conversation = $_POST["conversation_id"];
$mem = $_POST["mem"];
$name = $_POST["name"];
$sql = "UPDATE `conversations` SET member = '".$mem."', conversation_name = '".$name."', updated_at = NOW() WHERE conversation_id ='".$conversation."'";
echo $sql;
$result = $conn->query($sql);    

$conn->close();
?>