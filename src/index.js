import "./styles.css";

(function setupForm(docObj) {
  const formEl = docObj.querySelector("form");
  const emailEl = docObj.querySelector("#email");
  const pcEl = docObj.querySelector("#pc");
  const pwdEl = docObj.querySelector("#pwd");
  const pwdConfEl = docObj.querySelector("#conf-pwd");
  const countryEl = docObj.querySelector("#country");

  formEl.addEventListener("submit", verify);

  emailEl.addEventListener("blur", () => {
    if (!verifyEmail()) {
      emailEl.focus();
    }
  });

  countryEl.addEventListener("blur", () => {
    if (!verifyCountry()) {
      countryEl.focus();
    }
  });

  pcEl.addEventListener("blur", () => {
    if (!verifyPostalCode()) {
      pcEl.focus();
    }
  });

  pwdEl.addEventListener("blur", () => {
    if (!verifyPassword()) {
      pwdEl.focus();
    }
  });
  pwdConfEl.addEventListener("input", () => {
    if (!verifyPassword(2)) {
      pwdConfEl.focus();
    }
  });

  function verifyCountry() {
    if (countryEl.value === "") {
      showErrors(countryEl, "Select your country.");
      return false;
    } else {
      hideErrors(countryEl);
      return true;
    }
  }
  function verifyPassword(chk) {
    if ((!chk && !pwdEl.validity.valid) || pwdEl.value.length < 8) {
      showErrors(pwdEl, "Your password must be at least 8 characters long.");
      return false;
    } else {
      hideErrors(pwdEl);
    }
    if (chk === 2) {
      if (pwdConfEl.validity.value || pwdConfEl.value.length < 8) {
        showErrors(
          pwdConfEl,
          "Your password must be at least 8 characters long."
        );
        return false;
      }
      if (pwdEl.value !== pwdConfEl.value) {
        showErrors(pwdConfEl, "Your passwords must match.");
        return false;
      }
      hideErrors(pwdConfEl);
    }
    return true;
  }

  function verifyPostalCode() {
    if (!pcEl.validity.valid || pcEl.value.length < 3) {
      showErrors(pcEl, "You must enter a valid postal code.");
      return false;
    } else {
      hideErrors(pcEl);
      return true;
    }
  }
  function verifyEmail() {
    if (!emailEl.validity.valid || emailEl.value.length < 3) {
      showErrors(emailEl, "You must enter a valid email.");
      return false;
    } else {
      hideErrors(emailEl);
      return true;
    }
  }
  function hideErrors(el) {
    el.nextElementSibling.classList.remove("e-visible");
    el.nextElementSibling.classList.add("e-hidden");
    el.parentElement.classList.remove("invalid");
  }

  function showErrors(el, errorMsg) {
    el.nextElementSibling.innerText = errorMsg;
    el.nextElementSibling.classList.add("e-visible");
    el.nextElementSibling.classList.remove("e-hidden");
    el.parentElement.classList.add("invalid");
  }

  function verify(e) {
    console.log(e.target);
    e.preventDefault();
    if (
      !verifyEmail() ||
      !verifyPostalCode ||
      !verifyPassword ||
      !verifyCountry ||
      !verifyPassword(2)
    ) {
      alert("Please complete the form fields to sign-up.");
    } else {
      const dialog = docObj.querySelector("dialog");
      dialog.showModal();
      formEl.reset();
    }
  }
})(document);
