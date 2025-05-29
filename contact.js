// contact.js
// Handles the Contact Us form submission using jQuery and stores data in localStorage as a demo.
// In a real project, you would send this to a backend server via AJAX.

$(document).ready(function() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    const name = $('#fullname').val().trim();
    const message = $('#message').val().trim();
    if (!name || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    // Store in localStorage (for demo purposes)
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({ name, message, date: new Date().toISOString() });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    // Optionally, clear the form and show a success message
    $('#contactForm')[0].reset();
    alert('Thank you for contacting us! Your message has been saved.');
  });
});
