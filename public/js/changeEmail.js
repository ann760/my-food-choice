async function changeEmailFormHandler(event) {
  event.preventDefault();

  const curremail = document.querySelector("#current-email").value.trim();
  const newemail = document.querySelector("#new-email").value.trim();
  const changeEmailBtn = document.querySelector('#changeemail-btn');
  //const userId = document.createElement();

  //select guest or host login 
  console.dir(document.querySelector("#current-email"));
  const id = document.querySelector("#current-email").name;
  const loggedIn = document.querySelector("#current-email").dataset.loggedin;
  if (loggedIn === "guestLoggedIn") {
    if (curremail && newemail) {
      const response = await fetch(`/api/users/${id}`, {
        method: "put",
        body: JSON.stringify({ email: newemail }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        M.toast({ html: 'Email changed successfully' });
        document.location.replace('/');
      } else {
        M.toast({ html: 'Error!' });
      }
    }
  }
  if (loggedIn === "hostLoggedIn") {
    if (curremail && newemail) {
      const response = await fetch(`/api/admin/${id}`, {
        method: "put",
        body: JSON.stringify({ email: newemail }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        M.toast({ html: 'Email changed successfully' });
        document.location.replace('/');
      } else {
        M.toast({ html: 'Error!' });
      }
    }
  }
}

document
  .querySelector(".change-email-form")
  .addEventListener("submit", changeEmailFormHandler);
