document.addEventListener("DOMContentLoaded", function () {
  const balanceInput = document.getElementById("balance");
  const incomeList = document.getElementById("income-list");
  const expenseList = document.getElementById("expense-list");
  const balanceMessage = document.getElementById("balance-message");

  let balance = 0;
  let incomeTotal = 0;
  let expenseTotal = 0;

  balanceInput.addEventListener("change", function () {
    balance = parseFloat(balanceInput.value);
    updateBalanceMessage();
  });

  function updateBalanceMessage() {
    const difference = incomeTotal - expenseTotal;
    if (difference > 0) {
      balanceMessage.textContent = `You can still spend ${difference.toFixed(
        2
      )} PLN`;
    } else if (difference === 0) {
      balanceMessage.textContent = "Balance is zero";
    } else {
      balanceMessage.textContent = `The balance is negative. You lost ${Math.abs(
        difference
      ).toFixed(2)} PLN`;
    }
  }

  function addTransactionToList(list, amount, description) {
    const item = document.createElement("li");
    item.textContent = `${description}: ${amount.toFixed(2)} PLN`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      const newAmount = prompt("Enter new amount:");
      if (newAmount !== null) {
        const parsedAmount = parseFloat(newAmount);
        if (!isNaN(parsedAmount)) {
          amount = parsedAmount;
          item.textContent = `${description}: ${amount.toFixed(2)} PLN`;
          if (list === incomeList) {
            incomeTotal += parsedAmount;
          } else {
            expenseTotal += parsedAmount;
          }
          updateBalanceMessage();
        } else {
          alert("Invalid amount format!");
        }
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      if (list === incomeList) {
        incomeTotal -= amount;
      } else {
        expenseTotal -= amount;
      }
      list.removeChild(item);
      updateBalanceMessage();
    });

    item.appendChild(editButton);
    item.appendChild(deleteButton);
    list.appendChild(item);
  }

  document.getElementById("add-income").addEventListener("click", function () {
    const amount = prompt("Enter the amount of income:");
    if (amount !== null) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        addTransactionToList(incomeList, parsedAmount, "Income");
        incomeTotal += parsedAmount;
        updateBalanceMessage();
      } else {
        alert("Invalid amount format!");
      }
    }
  });

  document.getElementById("add-expense").addEventListener("click", function () {
    const amount = prompt("Enter the expense amount:");
    if (amount !== null) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        addTransactionToList(expenseList, parsedAmount, "Outcome");
        expenseTotal += parsedAmount;
        updateBalanceMessage();
      } else {
        alert("Invalid amount format!");
      }
    }
  });
});
