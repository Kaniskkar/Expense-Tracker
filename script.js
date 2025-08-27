const addBtn = document.getElementById("addBtn");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categorySelect = document.getElementById("category");
const tableBody = document.getElementById("expenseTableBody");

// Store expenses
let expenses = [];

// Pie Chart setup
const pieCtx = document.getElementById("pieChart").getContext("2d");
let pieChart = new Chart(pieCtx, {
  type: "pie",
  data: {
    labels: ["Food", "Travel", "Entertainment", "Other"],
    datasets: [{
      data: [0, 0, 0, 0],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
    }]
  },options: {
    plugins: {
      legend: {
        labels: {
          color: "hsl(204, 74%, 68%)",   
          font: {
            size: 14
          }
        }
      }
    }
  }
});

// Add expense
addBtn.addEventListener("click", () => {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const category = categorySelect.value;

  if (description && amount && category) {
    // Save
    expenses.push({ description, amount, category });

    // Add row in table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${description}</td>
      <td>${amount}</td>
      <td>${category}</td>
    `;
    tableBody.appendChild(row);

    // Update chart
    updatePieChart();

    // Clear inputs
    descriptionInput.value = "";
    amountInput.value = "";
    categorySelect.value = "";
  } else {
    alert("Please fill all fields.");
  }
});

function updatePieChart() {
  let categoryTotals = { Food: 0, Travel: 0, Entertainment: 0, Other: 0 };
  expenses.forEach(exp => categoryTotals[exp.category] += exp.amount);
  
  pieChart.data.datasets[0].data = Object.values(categoryTotals);
  pieChart.update();
}

