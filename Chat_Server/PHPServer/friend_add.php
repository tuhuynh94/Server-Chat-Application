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

$phone = $_POST["phone"];
$other_phone = $_POST["other_phone"];


$sql ="SELECT username,phone, birthday, email FROM users WHERE phone = '".$other_phone."'";
//echo($sql);
$conn->query($sql);    
 
$result = mysqli_query($conn,$sql);
if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();
    
    $sql = "INSERT INTO `friends`(`phone`, `friend_phone`, `email`, `birthday`, `username`, `add_at`,`id`) VALUES ('".$phone."','".$other_phone."','".$row["email"]."','".$row["birthday"]."','".$row["username"]."',NOW(),'NULL');";
    $conn->query($sql);
    $sql = "SELECT * from friends ORDER BY id DESC LIMIT 1";
    $result = mysqli_query($conn,$sql);

    $jsonData = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($jsonData);

}
$conn->close();

?>