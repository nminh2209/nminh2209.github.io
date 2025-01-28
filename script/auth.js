class AuthService {
    constructor() {
        this.API_URL = 'http://localhost:3000/api'; // Or your actual backend URL

        this.token = localStorage.getItem('token');
    }

    async login(email, password, role) {
        try {
            const response = await fetch(`${this.API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role })
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', role);
                localStorage.setItem('userId', data.userId);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        window.location.href = '/login.html';
    }

    async saveTestResult(testType, score, details) {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${this.API_URL}/test-results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    testType,
                    score,
                    details,
                    timestamp: new Date().toISOString()
                })
            });
            return response.ok;
        } catch (error) {
            console.error('Save test result error:', error);
            return false;
        }
    }

    async getTestHistory() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${this.API_URL}/test-results/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Get test history error:', error);
            return [];
        }
    }
}

// Initialize auth service
const auth = new AuthService();

// Event listeners
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const success = await auth.login(email, password, role);
    if (success) {
        Swal.fire({
            title: 'Success!',
            text: 'Login successful',
            icon: 'success'
        }).then(() => {
            window.location.href = '/dashboard.html';
        });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Invalid credentials',
            icon: 'error'
        });
    }
});

// Add this to your test pages
async function saveTestResults(testType, score, details) {
    if (!auth.token) {
        Swal.fire({
            title: 'Please login',
            text: 'You need to login to save test results',
            icon: 'warning'
        }).then(() => {
            window.location.href = '/login.html';
        });
        return;
    }

    const saved = await auth.saveTestResult(testType, score, details);
    if (saved) {
        Swal.fire({
            title: 'Success!',
            text: 'Test results saved successfully',
            icon: 'success'
        });
    }
}
