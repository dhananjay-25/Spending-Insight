<?php
$host = "localhost";
$username = "root";
$password = "";  // Assuming no password
$dbname = "spending_insight";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else {
    echo "Successfully connected to the database.";
}
?>
