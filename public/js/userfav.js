const delAcc = document.querySelector("#deleteAcc");
const burgerDelAcc = document.querySelector("#burgerDeleteAcc");
const elems = document.querySelectorAll('.modal');
const instances = M.Modal.init(elems);
const closeModal = document.querySelector('#close');
const deleteAccount = document.querySelector('#delete');

async function userFavPageHandler(event) {
  event.preventDefault();

  const removeArray = [];
  const fav = document.forms[0];
  for (var i = 0; i < fav.length - 1; i++) {
    removeArray.push(fav[i].value);
  }

  // for each unchecked element
  removeArray.forEach(uncheckPostData);

  // check if item is associated to profile table
  async function uncheckPostData(item) {
    const response = await fetch(`/api/userfav/delete/` + item, {
      method: "delete",
      body: JSON.stringify({ favorite_id: item }),
      headers: { "Content-Type": "application/json" },
    });
  }
  userfavFormHandler();
};



async function userfavFormHandler(event) {

  M.toast({ html: 'Favorite foods Updated Successfully!' });

  const userfavArray = [];
  const userfav = document.forms[0];

  for (var i = 0; i < userfav.length; i++) {
    if (userfav[i].checked) {
      userfavArray.push(parseInt(userfav[i].value));
    }
  }
  console.log(userfavArray);
  // for each element (checkbox)...
  userfavArray.forEach(checkPostData);

  // check if item has a value & post data
  async function checkPostData(item) {
    console.log(item);
    console.log('here');
    const response = await fetch("/api/userfav/", {
      method: "post",
      body: JSON.stringify({ favorite_id: item }),
      headers: { "Content-Type": "application/json" },
    });
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

async function deleteUserHandler(event) {
  event.preventDefault();
  const id = parseInt(delAcc.dataset.account);

  const response = await fetch(`/api/users/${id}`, {
    method: "delete",
  });
  console.log(response.body);
  if (response.ok) {

    M.toast({ html: "Account Deleted Successfully!" });
    logoutFormHandler();

  }

}
// event listener
document
  .querySelector(".userfav-form")
  .addEventListener("submit", userFavPageHandler);

delAcc.addEventListener('click', openModalHandler);
burgerDelAcc.addEventListener('click', openModalHandler);
closeModal.addEventListener('click', closeModalHandler);
deleteAccount.addEventListener('click', deleteUserHandler);