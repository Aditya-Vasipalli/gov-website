$(document).ready(function() {
  function renderMessages() {
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    if (messages.length === 0) {
      $('#messagesList').html('<em>No messages received yet.</em>');
      return;
    }
    let html = '<ul class="list-group">';
    messages.forEach(m => {
      html += `<li class="list-group-item mb-2">
        <strong>${m.name}</strong> <span class="text-muted" style="font-size:0.9em;">(${new Date(m.date).toLocaleString()})</span><br>
        <span>${m.message}</span>
      </li>`;
    });
    html += '</ul>';
    $('#messagesList').html(html);
  }

  renderMessages();

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
    setTimeout(renderMessages, 100); // Slight delay to ensure storage is updated
  });
});
