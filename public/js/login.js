async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const guestLoginEl = document.querySelector('#guest-login');
  const hostLoginEl = document.querySelector('#host-login');
  let response = [];

  // check for email and password input
  if (!email) {
    M.toast({ html: 'Please write your email' });
  } else if (!password) {
    M.toast({ html: 'Please write your password' });
  }

  if (guestLoginEl.checked) {
    response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

  } else if (hostLoginEl.checked) {
    response = await fetch("/api/admin/admin-login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }

  if (response.ok) {
    M.toast({ html: 'Login successful.' });
    if (guestLoginEl.checked) {
      document.location.replace("/profile");
    } else if (hostLoginEl.checked) {
      document.location.replace("/reports");
    }
  } else {
    M.toast({ html: 'Incorrect email and/or password' });
  }
}

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);