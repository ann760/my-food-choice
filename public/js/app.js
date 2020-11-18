document.addEventListener('DOMContentLoaded', function () {
    const profileDropdownEl = document.querySelectorAll('#profile-dropdown');
    const instances = M.Dropdown.init(profileDropdownEl, {
      constrainWidth: false,
      coverTrigger: false, // Displays dropdown below the button
      hover: true, // Activate on hover
      alignment: 'right'
    });
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    // class: dropdown-trigger
    const filterByEl = document.querySelectorAll('#filter-by-dropdown');
    const instances = M.Dropdown.init(filterByEl, {
      constrainWidth: false,
      coverTrigger: false, // Displays dropdown below the button
      hover: true, // Activate on hover
    });
  });
  
  // init materialize components
  M.AutoInit();