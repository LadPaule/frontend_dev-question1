const form = document.getElementById("registrationForm");
const result = document.getElementById("registrationResult");

const base_fees = 
{ 
    WEB: 40000, 
    DIG: 25000 
};
const discounted_rate = 0.88;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name    = document.getElementById("participantName").value.trim();
    const ageRaw  = document.getElementById("participantAge").value.trim();
    const code    = document.getElementById("workshopCode").value.trim().toUpperCase();

    if (!name) {
        showError("Please enter the participant's name");
        return;
    }

    if (ageRaw === "") {
        showError("Please enter the participant's age");
        return;
    }

    const age = Number(ageRaw);
    if (!Number.isFinite(age) || age <= 0) {
        showError("Please enter a valid age");
        return;
    }

    if (!code) {
        showError("You must select a workshop.");
        return;
    }

    const baseFee = base_fees[code];
    if (baseFee === undefined) {
        showError("Invalid workshop code.");
        return;
    }

    let fee = baseFee;
    let discountMessage = " No discount applied.";

    if (age >= 18) {
        fee = Math.round(baseFee * discounted_rate);
        discountMessage = " 12% discount applied.";
    }

    result.className = "result success";
    result.textContent = `${name} registered for ${code} at a fee of ${fee}.` + discountMessage;

    form.reset();
});

function showError(message) {
    result.className = "result error";
    result.textContent = message;
}