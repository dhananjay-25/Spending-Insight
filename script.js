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
