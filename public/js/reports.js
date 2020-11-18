const delAcc = document.querySelector("#deleteAcc");
const burgerDelAcc = document.querySelector("#burgerDeleteAcc");
const elems = document.querySelectorAll('.modal');
const instances = M.Modal.init(elems);
const closeModal = document.querySelector('#close');
const deleteAccount = document.querySelector('#delete');
const allergyTable = document.getElementById("allergy-table");
const medicalTable = document.getElementById("medical-table");
const religiousTable = document.getElementById("religious-table");
const substanceTable = document.getElementById("substance-table");
const weightMgmtTable = document.getElementById("weight-table");
const otherTable = document.getElementById("other-table");
const guestRestrictCountEl = document.getElementById("guestRestrictCount");
const h3El = document.getElementsByTagName("h3");
console.log(h3El);

function createTableElem(restriction_name, id, newDict, table) {
  let tdElem = document.createElement('td');
  let tdCountElem = document.createElement('td');
  tdElem.textContent = restriction_name;
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

async function reportFormHandler() {
  const responseCategory = await fetch(`/api/restrictions/category`, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
  if (responseCategory.ok) {
    const categoryArray = await responseCategory.json();

    for (i = 0; i < categoryArray.length; i++) {
      console.log(categoryArray[i]);
      console.log(i);
      console.log(h3El[i + 1]);
      const heading = h3El[i + 1].id.split('-')[0]
      if (heading === categoryArray[i].category.toLowerCase()) {
        h3El[i + 1].textContent = categoryArray[i].category;
      }
    }

  }
  const response = await fetch(`/api/restrictions`, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  });
  const responseCount = await fetch(`/api/profiles/reports`, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
  if (response.ok && responseCount.ok) {
    const finalDict = await response.json();
    const finalCountDict = await responseCount.json();
    const newDict = {};
    let guestCount = 0;
    for (j = 0; j < finalCountDict.length; j++) {
      newDict[finalCountDict[j].restriction_id] = finalCountDict[j].count;
      guestCount += finalCountDict[j].count;
    }
    guestRestrictCountEl.textContent = guestCount;

    for (i = 0; i < finalDict.length; i++) {

      if (finalDict[i].category === 'Allergies') {
        createTableElem(finalDict[i].restriction_name, finalDict[i].id, newDict, allergyTable);
      }
      else if (finalDict[i].category === 'Medical') {
        createTableElem(finalDict[i].restriction_name, finalDict[i].id, newDict, medicalTable);
      }
      else if (finalDict[i].category === 'Religious') {
        createTableElem(finalDict[i].restriction_name, finalDict[i].id, newDict, religiousTable);
      }
      else if (finalDict[i].category === 'Substance') {
        createTableElem(finalDict[i].restriction_name, finalDict[i].id, newDict, substanceTable);
      }
      else if (finalDict[i].category === 'Weight Management') {
        createTableElem(finalDict[i].restriction_name, finalDict[i].id, newDict, weightMgmtTable);
      }
      else {
        createTableElem(finalDict[i].restriction_name, finalDict[i].id, newDict, otherTable);
      }
    }
  }
}


document.body.onload = function () { reportFormHandler(); }


//report filter dropdown
const filterBySelection = function (event) {
  event.preventDefault();

  const allergiesDivEl = document.querySelector('#allergies');
  const medicalDivEl = document.querySelector('#medical');
  const religiousDivEl = document.querySelector('#religious');
  const substanceDivEl = document.querySelector('#substance');
  const weightDivEl = document.querySelector('#weight');
  const otherDivEl = document.querySelector('#other');

  switch (event.target.id) {
    case "filter-allergies":
      allergiesDivEl.style.display = "";
      medicalDivEl.style.display = "none";
      religiousDivEl.style.display = "none";
      substanceDivEl.style.display = "none";
      weightDivEl.style.display = "none";
      otherDivEl.style.display = "none";
      break;
    case "filter-medical":
      allergiesDivEl.style.display = "none";
      medicalDivEl.style.display = "";
      religiousDivEl.style.display = "none";
      substanceDivEl.style.display = "none";
      weightDivEl.style.display = "none";
      otherDivEl.style.display = "none";
      break;
    case "filter-religious":
      allergiesDivEl.style.display = "none";
      medicalDivEl.style.display = "none";
      religiousDivEl.style.display = "";
      substanceDivEl.style.display = "none";
      weightDivEl.style.display = "none";
      otherDivEl.style.display = "none";
      break;
    case "filter-substance":
      allergiesDivEl.style.display = "none";
      medicalDivEl.style.display = "none";
      religiousDivEl.style.display = "none";
      substanceDivEl.style.display = "";
      weightDivEl.style.display = "none";
      otherDivEl.style.display = "none";
      break;
    case "filter-weight":
      allergiesDivEl.style.display = "none";
      medicalDivEl.style.display = "none";
      religiousDivEl.style.display = "none";
      substanceDivEl.style.display = "none";
      weightDivEl.style.display = "";
      otherDivEl.style.display = "none";
      break;
    case "filter-other":
      allergiesDivEl.style.display = "none";
      medicalDivEl.style.display = "none";
      religiousDivEl.style.display = "none";
      substanceDivEl.style.display = "none";
      weightDivEl.style.display = "none";
      otherDivEl.style.display = "";
      break;
    default:
      allergiesDivEl.style.display = "";
      medicalDivEl.style.display = "";
      religiousDivEl.style.display = "";
      substanceDivEl.style.display = "";
      weightDivEl.style.display = "";
      otherDivEl.style.display = "";
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
  console.log(delAcc);
  const response = await fetch(`/api/admin/${id}`, {
    method: "delete",
  });
  console.log(response.body);
  if (response.ok) {

    M.toast({ html: "Account Deleted Successfully!" });
    adminLogoutFormHandler();

  }

}

const reportFilterDropDownEl = document.querySelector('#report-filter-dropdown');
reportFilterDropDownEl.addEventListener('click', filterBySelection);
delAcc.addEventListener('click', openModalHandler);
burgerDelAcc.addEventListener('click', openModalHandler);
closeModal.addEventListener('click', closeModalHandler);
deleteAccount.addEventListener('click', deleteAdminHandler);