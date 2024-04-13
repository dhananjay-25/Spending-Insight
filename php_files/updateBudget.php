<?php
include 'db.php';
session_start();

$data = json_decode(file_get_contents("php://input"));

$user_id = $_SESSION['user_id'];
$total_budget = $data->total_budget;

$stmt = $conn->prepare("INSERT INTO Budgets (user_id, total_budget, remaining_budget) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE total_budget = VALUES(total_budget), remaining_budget = VALUES(remaining_budget)");
$stmt->bind_param("idd", $user_id, $total_budget, $total_budget);

if ($stmt->execute()) {
    echo json_encode(["message" => "Budget updated successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Error updating budget"]);
}

$stmt->close();
$conn->close();
?>
