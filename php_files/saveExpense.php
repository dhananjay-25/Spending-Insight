<?php
include 'db.php';
session_start();

$data = json_decode(file_get_contents("php://input"));

$user_id = $_SESSION['user_id'];
$category = $data->category;
$amount = $data->amount;
$date = $data->date;
$description = $data->description;

$stmt = $conn->prepare("INSERT INTO Expenses (user_id, category, amount, date, description) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("isds", $user_id, $category, $amount, $date, $description);

if ($stmt->execute()) {
    echo json_encode(["message" => "Expense added successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Error adding expense"]);
}

$stmt->close();
$conn->close();
?>
