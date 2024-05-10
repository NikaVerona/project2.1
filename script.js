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
      balanceMessage.textContent = `Вы все еще можете потратить ${difference.toFixed(
        2
      )} злотых`;
    } else if (difference === 0) {
      balanceMessage.textContent = "Баланс равен нулю";
    } else {
      balanceMessage.textContent = `Баланс отрицательный. Вы потеряли ${Math.abs(
        difference
      ).toFixed(2)} злотых`;
    }
  }

  function addTransactionToList(list, amount, description) {
    const item = document.createElement("li");
    item.textContent = `${description}: ${amount.toFixed(2)} злотых`;

    const editButton = document.createElement("button");
    editButton.textContent = "Редактировать";
    editButton.addEventListener("click", function () {
      const newAmount = prompt("Введите новую сумму:");
      if (newAmount !== null) {
        const parsedAmount = parseFloat(newAmount);
        if (!isNaN(parsedAmount)) {
          amount = parsedAmount;
          item.textContent = `${description}: ${amount.toFixed(2)} злотых`;
          if (list === incomeList) {
            incomeTotal += parsedAmount;
          } else {
            expenseTotal += parsedAmount;
          }
          updateBalanceMessage();
        } else {
          alert("Неверный формат суммы!");
        }
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
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
    const amount = prompt("Введите сумму дохода:");
    if (amount !== null) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        addTransactionToList(incomeList, parsedAmount, "Доход");
        incomeTotal += parsedAmount;
        updateBalanceMessage();
      } else {
        alert("Неверный формат суммы!");
      }
    }
  });

  document.getElementById("add-expense").addEventListener("click", function () {
    const amount = prompt("Введите сумму расхода:");
    if (amount !== null) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        addTransactionToList(expenseList, parsedAmount, "Расход");
        expenseTotal += parsedAmount;
        updateBalanceMessage();
      } else {
        alert("Неверный формат суммы!");
      }
    }
  });
});
