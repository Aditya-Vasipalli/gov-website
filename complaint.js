$(document).ready(function() {
  $('#complaintForm').on('submit', function(e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const details = $('#details').val().trim();
    if (!name || !email || !details) {
      alert('Please fill in all required fields.');
      return;
    }
    // Store in localStorage (for demo purposes)
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    complaints.push({ name, email, details, date: new Date().toISOString() });
    localStorage.setItem('complaints', JSON.stringify(complaints));
    $('#complaintForm')[0].reset();
    alert('Your complaint has been submitted. Thank you!');
  });

  // Download as Excel (CSV)
  $('#downloadComplaints').on('click', function() {
    let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    if (complaints.length === 0) {
      alert('No complaints to download.');
      return;
    }
    let csv = 'Name,Email,Details,Date\n';
    complaints.forEach(c => {
      // Escape commas and quotes
      const row = [c.name, c.email, c.details, c.date].map(x => '"' + (x || '').replace(/"/g, '""') + '"').join(',');
      csv += row + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'complaints.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});
