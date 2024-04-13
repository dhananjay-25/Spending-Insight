<?php
include 'db.php';
session_start();

$user_id = $_SESSION['user_id'];

// Get total expenses
$total_expenses_query = "SELECT SUM(amount) as total_expenses FROM Expenses WHERE user_id = ?";
$stmt = $conn->prepare($total_expenses_query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$total_expenses_result = $stmt->get_result();
$total_expenses = $total_expenses_result->fetch_assoc()['total_expenses'];

// Get category-wise expenses
$category_expenses_query = "SELECT category, SUM(amount) as total_amount FROM Expenses WHERE user_id = ? GROUP BY category";
$stmt = $conn->prepare($category_expenses_query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$category_expenses_result = $stmt->get_result();
$category_expenses = [];

while ($row = $category_expenses_result->fetch_assoc()) {
    $category_expenses[] = $row;
}

$response = [
    "total_expenses" => $total_expenses,
    "category_expenses" => $category_expenses
];

echo json_encode($response);

$stmt->close();
$conn->close();
?>
