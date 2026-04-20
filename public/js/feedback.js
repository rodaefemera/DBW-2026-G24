const submitButton = document.getElementById("submitButton");

const fields = {
    email: document.getElementById("emailInput"),
    feedback: document.getElementById("feedbackTextarea")
};

const feedbackForm = document.getElementById("feedbackForm");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (feedbackForm) {
    if (submitButton && submitButton.form !== feedbackForm) {
        console.warn("#submitButton is not associated with #feedbackForm.");
    }
    feedbackForm.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        logFeedbackToConsole();
        resetForm();
    }
}

function validateForm() {
    let allValid = true;
    for (const key in fields) {
        if (!Object.prototype.hasOwnProperty.call(fields, key)) {
            continue;
        }
        const field = fields[key];
        if (!field) {
            continue;
        }
        let fieldValid = false;
        if (key === "email") {
            fieldValid = validateEmailField(field);
        } else {
            fieldValid = validateTextField(field);
        }
        allValid = allValid && fieldValid;
    }
    return allValid;
}

function validateTextField(field) {
    field.classList.remove("is-valid", "is-invalid");
    const ok = field.value.trim() !== "";
    field.classList.add(ok ? "is-valid" : "is-invalid");
    return ok;
}

function validateEmailField(field) {
    field.classList.remove("is-valid", "is-invalid");
    const trimmed = field.value.trim();
    if (trimmed === "") {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        return true;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
        field.classList.add("is-invalid");
        return false;
    }
    field.classList.add("is-valid");
    return true;
}

function logFeedbackToConsole() {
    const email = fields.email ? fields.email.value.trim() : "N/A";
    const feedback = fields.feedback ? fields.feedback.value.trim() : "";
    const submittedAt = new Date();
    const dateTimeLabel = submittedAt.toLocaleString("pt-PT", { dateStyle: "short", timeStyle: "medium" });
    console.log(`FEEDBACK MATRIOSCA: Email=${email}; Feedback="${feedback}"; Data=${dateTimeLabel}`);
}

function resetForm() {
    for (const key in fields) {
        if (!Object.prototype.hasOwnProperty.call(fields, key)) {
            continue;
        }
        const field = fields[key];
        if (!field) {
            continue;
        }
        field.value = "";
        field.classList.remove("is-valid", "is-invalid");
    }
}