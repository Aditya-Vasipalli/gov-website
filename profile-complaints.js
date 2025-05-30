$(document).ready(function() {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!user) return;
  let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
  // Compare emails in lowercase for consistency
  complaints = complaints.filter(c => (c.email || '').toLowerCase() === user.email.toLowerCase());
  if (complaints.length === 0) {
    $('#yourComplaints').html('<em>No complaints submitted yet.</em>');
    return;
  }
  let html = '<ul style="text-align:left;">';
  complaints.forEach(c => {
    html += `<li><strong>Date:</strong> ${new Date(c.date).toLocaleString()}<br><strong>Details:</strong> ${c.details}</li>`;
  });
  html += '</ul>';
  $('#yourComplaints').html(html);
});
