<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = $data->email;
$password = $data->password;

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if user already exists
$stmt = $conn->prepare("SELECT * FROM Users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["message" => "User already exists"]);
} else {
    // Insert new user
    $stmt = $conn->prepare("INSERT INTO Users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);
    $stmt->execute();

    echo json_encode(["message" => "User registered successfully"]);
}

$stmt->close();
$conn->close();
?>
