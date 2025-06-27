document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('global-pi-mined').textContent = data.globalPiMined.toLocaleString();
            document.getElementById('active-sessions').textContent = data.activeSessions.toLocaleString();
            document.getElementById('referral-stats').textContent = data.referralStats.toLocaleString();
        })
        .catch(error => console.error('Error fetching stats:', error));
}); 