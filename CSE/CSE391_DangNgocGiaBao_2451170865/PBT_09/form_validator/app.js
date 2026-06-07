const form = document.querySelector("#registerForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");
const submitBtn = document.querySelector("#submitBtn");

const strengthFill = document.querySelector("#strengthFill");

const modal = document.querySelector("#successModal");
const closeModal = document.querySelector("#closeModal");
const userInfo = document.querySelector("#userInfo");

function setValid(input, messageElement) {
    input.classList.add("valid");
    input.classList.remove("invalid");
    messageElement.textContent = "✅ Hợp lệ";
    messageElement.style.color = "green";
}

function setInvalid(input, messageElement, message) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    messageElement.textContent = message;
    messageElement.style.color = "red";
}

function validateName() {
    const value = nameInput.value.trim();
    const error = document.querySelector("#nameError");

    if (value.length >= 2 && value.length <= 50) {
        setValid(nameInput, error);
        return true;
    }

    setInvalid(nameInput, error, "Tên phải từ 2-50 ký tự");
    return false;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const error = document.querySelector("#emailError");

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(value)) {
        setValid(emailInput, error);
        return true;
    }

    setInvalid(emailInput, error, "Email không hợp lệ");
    return false;
}

function validatePassword() {
    const value = passwordInput.value;
    const error = document.querySelector("#passwordError");

    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;

    if (strength <= 1) {
        strengthFill.style.width = "33%";
        strengthFill.style.background = "red";
        setInvalid(passwordInput, error, "Mật khẩu yếu");
        return false;
    }

    if (strength === 2 || strength === 3) {
        strengthFill.style.width = "66%";
        strengthFill.style.background = "orange";
        error.textContent = "⚠️ Mật khẩu trung bình";
        error.style.color = "orange";
        passwordInput.classList.add("valid");
        return true;
    }

    strengthFill.style.width = "100%";
    strengthFill.style.background = "green";
    setValid(passwordInput, error);
    return true;
}

function validateConfirmPassword() {
    const error = document.querySelector("#confirmError");

    if (confirmInput.value === passwordInput.value && confirmInput.value !== "") {
        setValid(confirmInput, error);
        return true;
    }

    setInvalid(confirmInput, error, "Mật khẩu không khớp");
    return false;
}

function formatPhone(value) {
    value = value.replace(/\D/g, "");

    if (value.length > 4 && value.length <= 7) {
        return value.replace(/(\d{4})(\d+)/, "$1-$2");
    }

    if (value.length > 7) {
        return value.replace(/(\d{4})(\d{3})(\d+)/, "$1-$2-$3");
    }

    return value;
}

function validatePhone() {
    const error = document.querySelector("#phoneError");

    let raw = phoneInput.value.replace(/\D/g, "");

    if (raw.length === 10) {
        setValid(phoneInput, error);
        return true;
    }

    setInvalid(phoneInput, error, "Số điện thoại phải có 10 số");
    return false;
}

function checkFormValid() {
    const isValid =
        validateName() &&
        validateEmail() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validatePhone();

    submitBtn.disabled = !isValid;
}

nameInput.addEventListener("input", () => {
    validateName();
    checkFormValid();
});

emailInput.addEventListener("input", () => {
    validateEmail();
    checkFormValid();
});

passwordInput.addEventListener("input", () => {
    validatePassword();
    validateConfirmPassword();
    checkFormValid();
});

confirmInput.addEventListener("input", () => {
    validateConfirmPassword();
    checkFormValid();
});

phoneInput.addEventListener("input", () => {
    phoneInput.value = formatPhone(phoneInput.value);
    validatePhone();
    checkFormValid();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    userInfo.innerHTML = `
        <p><strong>Họ tên:</strong> ${nameInput.value}</p>
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>SĐT:</strong> ${phoneInput.value}</p>
    `;

    modal.classList.remove("hidden");

    form.reset();
    strengthFill.style.width = "0%";
    submitBtn.disabled = true;
});

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});