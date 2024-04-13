<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

// Check if user exists
$stmt = $conn->prepare("SELECT * FROM Users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    // User not found or invalid credentials
    http_response_code(401);
    echo json_encode(["message" => "Invalid email or password"]);
} else {
    $user = $result->fetch_assoc();

    // Verify password
    if (password_verify($password, $user['password'])) {
        // Generate JWT token (Replace this with your JWT generation logic)
        $token = "your_generated_jwt_token";

        echo json_encode(["token" => $token]);
    } else {
        // Password does not match
        http_response_code(401);
        echo json_encode(["message" => "Invalid email or password"]);
    }
}

$stmt->close();
$conn->close();
?>
