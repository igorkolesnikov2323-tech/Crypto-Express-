const registraitionForm = document.querySelector("#register__form");

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(pass) {
  const symbolsOfPass = pass.split("");
  const regexUpper = /[A-Z]/;
  const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const numberRegex = /[0-9]/;

  if (
    pass.length > 8 &&
    symbolsOfPass.some((str) => numberRegex.test(str)) &&
    symbolsOfPass.some((str) => regexUpper.test(str)) &&
    symbolsOfPass.some((str) => specialCharsRegex.test(str))
  ) {
    return true;
  } else {
    console.log("password is not correct");
    if (pass.length <= 8) {
      console.log("Пароль слишком короткий");
    }
    if (!symbolsOfPass.some((str) => numberRegex.test(str))) {
      console.log("Пароль должен содержать цифры");
    }
    if (!symbolsOfPass.some((str) => regexUpper.test(str))) {
      console.log("Пароль должен сожержать заглавные буквы");
    }
    if (!symbolsOfPass.some((str) => specialCharsRegex.test(str))) {
      console.log("Пароль должен содержать специальные симовлы");
    }
    return false;
  }
}

async function sendPOSTRequest(username, email, password) {
  return await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });
}

registraitionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const emailValue = document.querySelector("#email__input").value;
  const passwordValue = document.querySelector("#password__input").value;
  const usernameValue = document.querySelector("#username__input").value;

  // validate data
  if (validateEmail(emailValue) && validatePassword(passwordValue)) {
    try {
      // send data fpom form to server at api/register
      const response = await sendPOSTRequest(
        usernameValue.trim(),
        emailValue.trim(),
        passwordValue.trim(),
      );

      // get the answer from server
      const data = await response.json();

      // hide the register from and show the verification form
      if (response.ok) {
        const registerForm = document.getElementById("register__form");
        const verificationBox = document.querySelector(".verification__box");
        registerForm.style.display = "none";
        verificationBox.style.display = "flex";

        // verification form onclick
        verificationBox.addEventListener("submit", async (event) => {
          event.preventDefault();
          const verificationItem = document.querySelectorAll(
            ".verification__item",
          );
          let dataFromVerificationForm = [];

          //
          verificationItem.forEach((input, index) => {
            dataFromVerificationForm.push(input.value);
          });
          const usersCode = dataFromVerificationForm.join("");

          // send the code to verifyCode
          const vCResponse = await fetch(
            "http://localhost:3000/api/verify-code",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: document.querySelector("#email__input").value,
                code: usersCode,
              }),
            },
          );
          const answerFromVerifyCode = await vCResponse.json();
          if (vCResponse.ok) {
            alert(answerFromVerifyCode.message);
            window.location.href = '/';
          } else {
            alert(answerFromVerifyCode.error);
          }
        });
      }

      if (data.error === "username already exists") {
        const errorFlexblox = document.querySelector(".error__flexbox-1");
        errorFlexblox.style.display = "flex";
      }

      if (data.error === "email already exists") {
        const emailErrorFlexbox = document.querySelector(".error__flexbox-2");
        emailErrorFlexbox.style.display = "flex";
      }
    } catch (error) {
      console.log("Network error: ", error);
    }
  }
});
