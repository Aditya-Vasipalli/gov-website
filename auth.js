// auth.js
// Handles registration and login using jQuery and localStorage for demo purposes.
// In a real project, use a backend for secure authentication.

$(document).ready(function() {
  // Registration
  $('#signupForm').on('submit', function(e) {
    e.preventDefault();
    const name = $('#signupName').val().trim();
    const email = $('#signupEmail').val().trim().toLowerCase();
    const password = $('#signupPassword').val();
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      alert('An account with this email already exists.');
      return;
    }
    users[email] = { name, password };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
  });

  // Login
  $('#loginForm').on('submit', function(e) {
    e.preventDefault();
    const email = $('#email').val().trim().toLowerCase();
    const password = $('#password').val();
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[email] || users[email].password !== password) {
      alert('Invalid email or password.');
      return;
    }
    // Save session (for demo)
    localStorage.setItem('currentUser', JSON.stringify({ email, name: users[email].name }));
    alert('Login successful!');
    window.location.href = 'index.html';
  });

  // Profile and session UI logic for index.html
  $(document).ready(function() {
    // Only handle login/logout UI for the header, do not inject user details/profile into the homepage header.
    function renderProfile() {
      const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (user) {
        // Remove login/signup button if present
        $("#loginBtn").remove();
      } else {
        // Not logged in: show login/signup if missing
        if ($("#loginBtn").length === 0) {
          $("header").append('<a href="login.html" id="loginBtn">Login / Sign Up</a>');
        }
      }
    }

    renderProfile();

    // Logout handler (for homepage, just remove session and reload)
    $(document).on('click', '#logoutBtn', function() {
      localStorage.removeItem('currentUser');
      location.reload();
    });
  });

  // Show change password form
  $(document).on('click', '#showChangePwd', function() {
    $('#changePwdForm').toggle();
  });

  // Change password handler
  $(document).on('submit', '#changePwdForm', function(e) {
    e.preventDefault();
    const newPwd = $('#newPwd').val();
    if (!newPwd) {
      alert('Please enter a new password.');
      return;
    }
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) return;
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[user.email]) {
      users[user.email].password = newPwd;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Password updated successfully!');
      $('#changePwdForm').hide();
      $('#newPwd').val('');
    }
  });

  // Ensure hardcoded admin account exists in localStorage
  (function ensureAdminAccount() {
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users['admin@womenfirst.in']) {
      users['admin@womenfirst.in'] = { name: 'Admin', password: 'admin123', isAdmin: true };
      localStorage.setItem('users', JSON.stringify(users));
    }
  })();

  // Utility to check if current user is admin
  function isAdmin() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user && user.email === 'admin@womenfirst.in';
  }
});
