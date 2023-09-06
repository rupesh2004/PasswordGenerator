const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generation = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?"
};

const generatePasswords = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excludedDuplicates = false;
    let passLength = parseInt(lengthSlider.value);

    options.forEach((option) => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += " "; // Add space character
            } else {
                excludedDuplicates = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar =
            staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludedDuplicates) {
            if (!randomPassword.includes(randomChar) || randomChar === " ") {
                randomPassword += randomChar;
            } else {
                i--;
            }
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
    passIndicator.id =
        lengthSlider.value <= 8
            ? "weak"
            : lengthSlider.value <= 16
                ? "medium"
                : "strong";
};

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePasswords();
    updatePassIndicator();
};

const copyToClipboard = () => {
    const password = passwordInput.value;
    const tempInput = document.createElement("input");
    tempInput.value = password;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Passwords copied successfully");
};


lengthSlider.addEventListener("input", updateSlider);
updateSlider();
