async function adminLogoutFormHandler() {
    const response = await fetch('/api/admin/admin-logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      M.toast({ html: "Logged out successfully" });
      document.location.replace('/');
    } else {
      M.toast({ html: "Error logging out" });
    }
  }
  
  document.querySelector('#logout').addEventListener("click", adminLogoutFormHandler);
  document.querySelector('#burger-logout').addEventListener("click", adminLogoutFormHandler);