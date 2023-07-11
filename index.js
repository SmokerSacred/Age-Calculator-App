let inputDay = document.getElementById("input-day");
let inputMonth = document.getElementById("input-month");
let inputYear = document.getElementById("input-year");
let submit = document.getElementById("submit");
let outputDay = document.getElementById("day");
let outputMonth = document.getElementById("month");
let outputYear = document.getElementById("year");


function birthday() {
  const validMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const MonthsWith31Days = [0, 2, 4, 6, 7, 9, 11];
  const MonthsWith28Days = [1];
  const MonthsWith30Days = [3, 5, 8, 10];

  let days = inputDay.value.trim();
  let months = parseInt(inputMonth.value);
  let years = inputYear.value.trim();

  let errors = [];

  if (days === "") {
    errors.push("This field is required");
  } else if (isNaN(days) || days < 1 || days > 31) {
    errors.push("Must be a valid day");
  }

  if (isNaN(months) || months < 1 || months > 12) {
    errors.push("Must be a valid month");
  }

  if (years.length !== 4 || isNaN(years)) {
    errors.push("Must be a valid year");
  }

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  let maxDays;
  if (MonthsWith31Days.includes(months - 1)) {
    maxDays = 31;
  } else if (MonthsWith30Days.includes(months - 1)) {
    maxDays = 30;
  } else if (MonthsWith28Days.includes(months - 1)) {
    maxDays = 28;
  }

  if (days > maxDays) {
    errors.push("Must be a valid day");
  }

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  const currentDate = new Date();
  const conceptionDate = new Date(years, months - 1, days);

  if (currentDate < conceptionDate) {
    errors.push("Must be a valid year");
  }

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  const ageInMilliseconds = currentDate - conceptionDate;
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
  const ageInMonths = Math.floor(ageInDays / 30.44);
  const ageInYears = Math.floor(ageInDays / 365);

  outputDay.textContent = ageInDays;
  outputMonth.textContent = ageInMonths;
  outputYear.textContent = ageInYears;
}

function showErrors(errors) {
  const allInputFields = document.querySelectorAll(".input-container input");

  // Reset error messages and styles
  allInputFields.forEach((inputField) => {
    const label = inputField.previousElementSibling;
    const inputContainer = inputField.parentNode;
    const alertContainer = inputField.nextElementSibling;

    label.style.color = ""; // Reset to default color
    inputField.style.borderColor = ""; // Reset to default border color

    if (
      errors.includes("This field is required") &&
      inputField.value.trim() === ""
    ) {
      label.style.color = "var(--color-primary-two)";
      inputField.style.borderColor = "var(--color-primary-two)";
      alertContainer.textContent = "This field is required";
    }

    if (
      errors.includes("Must be a valid day") &&
      inputField.id === "input-day"
    ) {
      label.style.color = "var(--color-primary-two)";
      inputField.style.borderColor = "var(--color-primary-two)";
      alertContainer.textContent = "Must be a valid day";
    }

    if (
      errors.includes("Must be a valid month") &&
      inputField.id === "input-month"
    ) {
      label.style.color = "var(--color-primary-two)";
      inputField.style.borderColor = "var(--color-primary-two)";
      alertContainer.textContent = "Must be a valid month";
    }

    if (
      errors.includes("Must be a valid year") &&
      inputField.id === "input-year"
    ) {
      label.style.color = "var(--color-primary-two)";
      inputField.style.borderColor = "var(--color-primary-two)";
      alertContainer.textContent = "Must be a valid year";
    }

    alertContainer.classList.toggle(
      "alert",
      errors.includes(alertContainer.textContent)
    );
    alertContainer.style.display = errors.includes(alertContainer.textContent)
      ? "block"
      : "none";
  });
}



submit.addEventListener("click", birthday);
