const Movement = {
  id: "",
  description: "",
  amount: 0,
  category: "",
};
const movements = [];
idEdit = "";

document.addEventListener("DOMContentLoaded", function () {
  const inBtn = document.getElementById("btnAdd");
  const outBtn = document.getElementById("btnRest");

  outBtn.addEventListener("click", function () {
    saveMov("Outcome");
  });
  inBtn.addEventListener("click", function () {
    saveMov("Income");
  });

  function saveMov(category) {
    if (idEdit != "") {
      modifyRow();
    } else {
      addRow(category);
    }
  }
});

function addRow(category) {
  const txtDescription = document.getElementById(`txt${category}Description`);
  const txtAmount = document.getElementById(`txt${category}Value`);

  const mov = Object.create(Movement);
  mov.description = txtDescription.value;
  mov.amount = txtAmount.value;
  mov.id = Date.now();
  mov.category = category;
  movements.push(mov);
  refreshTable(category);
  emptyValues(category);
  totalHeader();
}
function emptyValues(category) {
  const txtDescription = document.getElementById(`txt${category}Description`);
  const txtAmount = document.getElementById(`txt${category}Value`);

  txtDescription.value = "";
  txtAmount.value = "";
  idEdit = "";
}
function modifyRow() {
  const mov = movements.find((movimiento) => movimiento.id === idEdit);
  const txtDescription = document.getElementById(
    `txt${mov.category}Description`
  );
  const txtAmount = document.getElementById(`txt${mov.category}Value`);

  mov.description = txtDescription.value;
  mov.amount = txtAmount.value;
  refreshTable(mov.category);
  emptyValues(mov.category);
  totalHeader();
}

function editRow(id) {
  const mov = movements.find((movimiento) => movimiento.id === id);

  const txtDescription = document.getElementById(
    `txt${mov.category}Description`
  );
  const txtAmount = document.getElementById(`txt${mov.category}Value`);

  txtDescription.value = mov.description;
  txtAmount.value = mov.amount;
  idEdit = mov.id;
}
function deleteRow(id) {
  const category = movements.find((mov) => mov.id === id).category;
  const index = movements.findIndex((mov) => mov.id === id);
  const confirmation = confirm(
    "¿Are you sure that you want to delete the register?"
  );

  if (index !== -1 && confirmation) {
    movements.splice(index, 1);
    // console.log('Delete Movement');
    refreshTable(category);
    emptyValues(category);
    totalHeader();
  } else {
    console.log("We cannot find any register with that ID");
  }
}

function refreshTable(category) {
  const tblValues = document.getElementById(`tbl${category}`);
  const sumaSpan = document.getElementById(`Sum${category}`);

  var total = 0;
  tblValues.textContent = "";
  sumaSpan.textContent = "";

  movements
    .filter((mov) => mov.category === category)
    .forEach((mov) => {
      total = total + parseFloat(mov.amount);
      const newRow = document.createElement("tr");
      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = mov.description;
      const amountCell = document.createElement("td");
      amountCell.textContent = mov.amount;
      const actionsCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editRow(mov.id, category));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteRow(mov.id));

      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      newRow.appendChild(descriptionCell);
      newRow.appendChild(amountCell);
      newRow.appendChild(actionsCell);
      tblValues.appendChild(newRow);
    });
  sumaSpan.textContent = total;
}
function totalHeader() {
  const pSum = document.getElementById(`balance-message`);
  var totalSum = 0;
  pSum.textContent = "";
  var myClass = "";
  movements.forEach((mov) => {
    if (mov.category === "Income") {
      totalSum = totalSum + parseFloat(mov.amount);
    }
    if (mov.category === "Outcome") {
      totalSum = totalSum - parseFloat(mov.amount);
    }
  });
  if (totalSum > 0) {
    pSum.textContent = `You can still spend  ${totalSum.toFixed(2)} PLN`;
    myClass = "green";
  }
  if (totalSum === 0) {
    pSum.textContent = `Balance is zero`;
  }
  if (totalSum < 0) {
    pSum.textContent = `The balance is negative. You lost ${Math.abs(
      totalSum.toFixed(2)
    )} PLN`;
    myClass = "red";
  }
  pSum.classList.remove("red");
  pSum.classList.remove("green");
  if (myClass.length > 0) {
    pSum.classList.add(myClass);
  }
}
