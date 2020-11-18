const loggedIn = document.querySelector("#current-password").dataset.loggedin;

async function changePwFormHandler(event) {
  event.preventDefault();

  // Will be used for future upgrade for checking current password
  const currentPassword = document.querySelector("#current-password").value.trim();

  const id = document.querySelector("#current-password").name;
  const newPassword = document.querySelector("#new-password").value.trim();
  const confirmNewPassword = document.querySelector("#confirm-new-password").value.trim();
  let response = [];

  if (newPassword.length < 8) {
    M.toast({ html: 'Password must be at least 8 characters long' });
  } else if (newPassword !== confirmNewPassword) {
    M.toast({ html: 'Password does not match' });
  } else
    //select guest or host login 
    if (loggedIn === "guestLoggedIn") {
      response = await fetch(`/api/users/${id}`, {
        method: "put",
        body: JSON.stringify({ password: newPassword }),
        headers: { "Content-Type": "application/json" }
      });
    } else if (loggedIn === "hostLoggedIn") {
      response = await fetch(`/api/admin/${id}`, {
        method: "put",
        body: JSON.stringify({ password: newpw }),
        headers: { "Content-Type": "application/json" }
      });
    }
  if (response.ok) {
    M.toast({ html: 'Password changed successfully' });
    document.location.replace('/');
  } else {
    M.toast({ html: 'Error!' });
  }
}

document
  .querySelector(".change-pw-form")
  .addEventListener("submit", changePwFormHandler);
