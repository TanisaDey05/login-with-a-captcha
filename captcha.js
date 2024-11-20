// Generate random CAPTCHA text
function generateCaptchaText() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// Draw CAPTCHA on canvas with distortions
function drawCaptcha(text) {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add background elements
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise
    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw distorted text
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = '#650202';
    ctx.textBaseline = 'middle';
    const xStart = 20;

    text.split('').forEach((char, index) => {
        const x = xStart + index * 30 + Math.random() * 10;
        const y = 40 + Math.random() * 10;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.3);
        ctx.fillText(char, 0, 0);
        ctx.restore();
    });
}

// Initialize CAPTCHA
let currentCaptcha = generateCaptchaText();
drawCaptcha(currentCaptcha);

// Refresh CAPTCHA
document.getElementById('refreshCaptcha').addEventListener('click', () => {
    currentCaptcha = generateCaptchaText();
    drawCaptcha(currentCaptcha);
    document.getElementById('captchaMessage').textContent = '';
    document.getElementById('captchaInput').value = '';
});

// Verify CAPTCHA
document.getElementById('login-btn').addEventListener('click', () => {
    const userInput = document.getElementById('captchaInput').value.trim();
    const message = document.getElementById('captchaMessage');
    if (userInput === currentCaptcha) {
        message.textContent = 'CAPTCHA verified successfully!';
        message.style.color = 'green';
    } else {
        message.textContent = 'Incorrect CAPTCHA. Please try again.';
        message.style.color = 'red';
    }
});
