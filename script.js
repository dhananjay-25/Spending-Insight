//budget planner code
document.addEventListener('DOMContentLoaded', function() {
    const budgetForm = document.getElementById('budgetForm');
    const budgetSummary = document.getElementById('budgetSummary');
    let totalBudget = 0;
    let remainingBudget = 0;
    const plannedExpenses = {};

    budgetForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const category = document.getElementById('categorySelect').value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

        if (!isNaN(expenseAmount)) {
            if (!plannedExpenses[category]) {
                plannedExpenses[category] = 0;
            }
            plannedExpenses[category] += expenseAmount;

            // Deduct planned expense from remaining budget
            remainingBudget = totalBudget - Object.values(plannedExpenses).reduce((acc, val) => acc + val, 0);

            renderBudgetSummary();
        }

        // Clear expense input field
        document.getElementById('expenseAmount').value = '';
    });

    budgetForm.addEventListener('input', function(event) {
        const budgetAmount = parseFloat(document.getElementById('budgetAmount').value);
        if (!isNaN(budgetAmount)) {
            totalBudget = budgetAmount;
            remainingBudget = totalBudget - Object.values(plannedExpenses).reduce((acc, val) => acc + val, 0);
            renderBudgetSummary();
        }
    });

    function renderBudgetSummary() {
        let html = `<h3>Monthly Budget Planner</h3>
                    <p>Total Budget: ₹${totalBudget.toFixed(2)}</p>
                    <p>Remaining Budget: ₹${remainingBudget.toFixed(2)}</p>
                    <ul class="list-group">`;
                    
        for (const [category, amount] of Object.entries(plannedExpenses)) {
            html += `<li class="list-group-item">
            ${category}: ₹${amount.toFixed(2)}
                     <button class="edit-btn" data-category="${category}">Edit</button>
                     <button class="delete-btn" data-category="${category}">Delete</button></li>`;
        }
        html += `</ul>`;
        budgetSummary.innerHTML = html;

        // Event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                const newAmount = parseFloat(prompt(`Enter new amount for ${category} (in INR):`, plannedExpenses[category]));

                if (!isNaN(newAmount)) {
                    remainingBudget += plannedExpenses[category] - newAmount;
                    plannedExpenses[category] = newAmount;
                    renderBudgetSummary();
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                remainingBudget += plannedExpenses[category];
                delete plannedExpenses[category];
                renderBudgetSummary();
            });
        });
    }
});


// scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    // ... (existing code)

    // Get the button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    scrollToTopBtn.addEventListener('click', function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});


// Expense tracker code
document.addEventListener('DOMContentLoaded', function() {
    // Fetch monthly budget and categories from database (Dummy data for now)
    const monthlyBudget = 50000;
    let totalExpenses = 0;
    const expenseData = {};

    // Populate categories in expense form
    const expenseCategorySelect = document.getElementById('expenseCategory');
    const categories = ['Food', 'Transportation', 'Utilities', 'Groceries'];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        expenseCategorySelect.appendChild(option);
    });

    // Update budget display
    document.getElementById('monthlyBudget').textContent = monthlyBudget;

    // Handle expense form submission
    const expenseForm = document.getElementById('expenseForm');
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const expenseCategory = expenseCategorySelect.value;
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

        if (!isNaN(expenseAmount)) {
            // Update total expenses
            totalExpenses += expenseAmount;
            document.getElementById('totalExpenses').textContent = totalExpenses;

            // Update expense data
            if (!expenseData[expenseCategory]) {
                expenseData[expenseCategory] = 0;
            }
            expenseData[expenseCategory] += expenseAmount;

            // Add expense to table
            const expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
            const newRow = expenseTable.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            cell1.textContent = expenseCategory;
            cell2.textContent = expenseAmount;

            // Reset form
            expenseForm.reset();
        }
    });

    // Calculate & Display Category-wise Expenses Button
    const calculateExpenseBtn = document.getElementById('calculateExpenseBtn');
    calculateExpenseBtn.addEventListener('click', function() {
        const categoryWiseTotal = {};

        for (const category in expenseData) {
            if (expenseData.hasOwnProperty(category)) {
                if (!categoryWiseTotal[category]) {
                    categoryWiseTotal[category] = 0;
                }
                categoryWiseTotal[category] += expenseData[category];
            }
        }

        // Display category-wise totals
        const expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
        while (expenseTable.firstChild) {
            expenseTable.removeChild(expenseTable.firstChild);
        }

        for (const category in categoryWiseTotal) {
            const newRow = expenseTable.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            cell1.textContent = category;
            cell2.textContent = categoryWiseTotal[category];
        }
    });

    // Save Expenses Button
    const saveExpenseBtn = document.getElementById('saveExpenseBtn');
    saveExpenseBtn.addEventListener('click', function() {
        saveExpenseToDatabase(expenseData, totalExpenses);
    });

    // Function to save expense to database
    function saveExpenseToDatabase(expenses, total) {
        console.log('Saving expenses to database...');
        console.log('Total Expenses:', total);
        console.log('Expense Data:', expenses);
        // Implement saving to database logic here
        // This can be done using AJAX, fetch API, or any backend method
    }
});



// User Registration
fetch('register.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
    }),
})
.then(response => response.json())
.then(data => {
    console.log(data.message);
});

// User Login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form-container form');
    const messageDiv = document.querySelector('.message'); // Assuming you have a message div to display messages

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('php_files/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.token);
            messageDiv.textContent = "Login successful!";
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = "An error occurred. Please try again.";
        });
    });
});



// get analysis - charts...
document.addEventListener('DOMContentLoaded', function() {
    fetch('php_files/getAnalysis.php')
    .then(response => response.json())
    .then(data => {
        // Extract data for Chart.js
        const labels = data.category_expenses.map(item => item.category);
        const amounts = data.category_expenses.map(item => item.total_amount);

        // Create Chart
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Amount',
                    data: amounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


