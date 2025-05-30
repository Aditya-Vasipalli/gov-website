$(document).ready(function() {
  emailjs.init("lgY1utGQUUV_jk4EF");

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

  const btn = document.getElementById('button');
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (btn) btn.value = 'Sending...';
    emailjs.sendForm('service_bszus9s', 'template_pe70agg', this)
      .then(function() {
        if (btn) btn.value = 'Send Message';
        alert('Thank you for contacting us! Your message has been sent.');
        // Store in localStorage (for demo purposes)
        const name = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({ name, email, message, date: new Date().toISOString() });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        document.getElementById('contactForm').reset();
        setTimeout(renderMessages, 100);
      }, function(err) {
        if (btn) btn.value = 'Send Message';
        alert('Email failed: ' + JSON.stringify(err));
      });
  });
});
