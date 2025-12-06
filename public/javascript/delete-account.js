const API_BASE = '/api';

function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

async function resetAccount() {
    const username = document.getElementById('resetUsername').value.trim();
    const confirmUsername = document.getElementById('confirmUsername').value.trim();
    
    if (!username) {
        showAlert('Please enter your username', 'error');
        return;
    }
    
    if (username !== confirmUsername) {
        showAlert('Usernames do not match. Please confirm your username.', 'error');
        return;
    }
    
    if (!confirm(`Are you absolutely sure you want to permanently delete the account "${username}"? This cannot be undone and all your backup codes will be lost forever.`)) {
        return;
    }
    
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.disabled = true;
    deleteBtn.textContent = 'Deleting account...';
    
    try {
        const response = await fetch(`${API_BASE}/reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showAlert('Account deleted successfully. Redirecting to home...', 'success');
            document.getElementById('resetUsername').value = '';
            document.getElementById('confirmUsername').value = '';
            
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } else {
            showAlert(result.error || 'Failed to delete account', 'error');
        }
    } catch (error) {
        showAlert('Network error. Please check your connection.', 'error');
    } finally {
        deleteBtn.disabled = false;
        deleteBtn.textContent = 'Delete Account Permanently';
    }
}

document.getElementById('deleteBtn').addEventListener('click', resetAccount);

document.getElementById('confirmUsername').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') resetAccount();
});