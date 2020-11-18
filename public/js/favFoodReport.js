const delAcc = document.querySelector("#deleteAcc");
const burgerDelAcc = document.querySelector("#burgerDeleteAcc");
const elems = document.querySelectorAll('.modal');
const instances = M.Modal.init(elems);
const closeModal = document.querySelector('#close');
const deleteAccount = document.querySelector('#delete');
const entreeTable = document.getElementById("entree-table");
const sidesTable = document.getElementById("sides-table");
const dessertTable = document.getElementById("dessert-table");
const beverageTable = document.getElementById("beverage-table");
const guestCountEl = document.getElementById("guestCount");
const h3El = document.getElementsByTagName("h3");

function createTableElem(food_name, id, newDict, table) {
  let tdElem = document.createElement('td');
  let tdCountElem = document.createElement('td');
  tdElem.textContent = food_name;
  if (id in newDict) {
    tdCountElem.textContent = newDict[id];
  }
  else {
    tdCountElem.textContent = 0;
  }
  table.appendChild(document.createElement('tbody'));
  table.appendChild(tdElem);
  table.appendChild(tdCountElem);
}


async function reportHandler() {

  const response = await fetch(`/api/favorite/favorite`, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  });
  const responseCount = await fetch(`/api/userfav/favreports`, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
  if (response.ok && responseCount.ok) {
    const finalDict = await response.json();
    const finalCountDict = await responseCount.json();
    const newDict = {};

    let guestCount = 0;
    for (j = 0; j < finalCountDict.length; j++) {
      newDict[finalCountDict[j].favorite_id] = finalCountDict[j].count;
      guestCount += finalCountDict[j].count;
    }
    guestCountEl.textContent = guestCount;

    for (i = 0; i < finalDict.length; i++) {

      if (finalDict[i].food_category === 'Entree') {
        createTableElem(finalDict[i].food_name, finalDict[i].id, newDict, entreeTable);
      }
      else if (finalDict[i].food_category === 'Sides') {
        createTableElem(finalDict[i].food_name, finalDict[i].id, newDict, sidesTable);
      }
      else if (finalDict[i].food_category === 'Dessert') {
        createTableElem(finalDict[i].food_name, finalDict[i].id, newDict, dessertTable);
      }
      else {
        createTableElem(finalDict[i].food_name, finalDict[i].id, newDict, beverageTable);
      }
    }
  }
}

//report filter dropdown
const filterBySelection = function (event) {
  event.preventDefault();

  const entreeDivEl = document.querySelector('#entree-filter');
  const sidesDivEl = document.querySelector('#sides-filter');
  const dessertDivEl = document.querySelector('#dessert-filter');
  const beverageDivEl = document.querySelector('#beverage-filter');

  switch (event.target.id) {
    case "filter-entree":
      entreeDivEl.style.display = "";
      sidesDivEl.style.display = "none";
      dessertDivEl.style.display = "none";
      beverageDivEl.style.display = "none";
      break;
    case "filter-sides":
      entreeDivEl.style.display = "none";
      sidesDivEl.style.display = "";
      dessertDivEl.style.display = "none";
      beverageDivEl.style.display = "none";
      break;
    case "filter-dessert":
      entreeDivEl.style.display = "none";
      sidesDivEl.style.display = "none";
      dessertDivEl.style.display = "";
      beverageDivEl.style.display = "none";
      break;
    case "filter-beverages":
      entreeDivEl.style.display = "none";
      sidesDivEl.style.display = "none";
      dessertDivEl.style.display = "none";
      beverageDivEl.style.display = "";
      break;

    default:
      entreeDivEl.style.display = "";
      sidesDivEl.style.display = "";
      dessertDivEl.style.display = "";
      beverageDivEl.style.display = "";
      break;
  }
}



function openModalHandler(event) {
  event.preventDefault();
  instances[0].open();
}

function closeModalHandler(event) {
  event.preventDefault();
  instances[0].close();
}

async function deleteAdminHandler(event) {
  event.preventDefault();
  const id = parseInt(delAcc.dataset.account);

  const response = await fetch(`/api/admin/${id}`, {
    method: "delete",
  });
  console.log(response.body);
  if (response.ok) {

    M.toast({ html: "Account Deleted Successfully!" });
    adminLogoutFormHandler();

  }

}
// event listener
document.body.onload = function () { reportHandler(); }
const reportFilterDropDownEl = document.querySelector('#report-filter-dropdown');
reportFilterDropDownEl.addEventListener('click', filterBySelection);
delAcc.addEventListener('click', openModalHandler);
burgerDelAcc.addEventListener('click', openModalHandler);
closeModal.addEventListener('click', closeModalHandler);
deleteAccount.addEventListener('click', deleteAdminHandler);