const userNameInput = document.querySelector(".name");
const phoneInput = document.querySelector(".phone");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const signUpBtn = document.querySelector(".signup");
const statusMessage = document.querySelector(".statusMessage");

const loginInputEmail = document.querySelector(".emailLogin");
const loginInputPassword = document.querySelector(".passwordLogin");
const loginBtn = document.querySelector(".login");

const users = JSON.parse(localStorage.getItem("users")) || [];

signUpBtn.addEventListener("click", () => {
  statusMessage.style.color = "black";
  if (
    userNameInput.value === "" ||
    phoneInput.value === "" ||
    emailInput.value === "" ||
    passwordInput.value === ""
  ) {
    statusMessage.textContent = "Все поля обязательны для заполнения!";
    statusMessage.style.color = "red";
    return;
  }

  // --- Валидация Имени ---
  const nameValue = userNameInput.value.trim();
  const onlyLetters = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  if (nameValue.length < 2 || nameValue.length > 24) {
    statusMessage.textContent = "Имя должно содержать от 2 до 24 символов!";
    statusMessage.style.color = "red";
    return;
  }
  if (!onlyLetters.test(nameValue)) {
    statusMessage.textContent = "Имя должно содержать только буквы!";
    statusMessage.style.color = "red";
    return;
  }

  // --- Валидация емейла ---
  const emailValue = emailInput.value.trim();
  if (emailValue.length < 7) {
    statusMessage.textContent = "Email должен содержать минимум 7 символов!";
    statusMessage.style.color = "red";
    return;
  }
  if (!emailValue.includes("@")) {
    statusMessage.textContent = "Email должен содержать символ @!";
    statusMessage.style.color = "red";
    return;
  }

  // --- Валидация Телефона ---
  const phoneValue = phoneInput.value.trim();
  if (!phoneValue.startsWith("+")) {
    statusMessage.textContent = "Телефон должен начинаться с символа '+'!";
    statusMessage.style.color = "red";
    return;
  }
  const phoneNumbersOnly = phoneValue.slice(1);
  const onlyNumbers = /^\d+$/; // только цифры
  if (!onlyNumbers.test(phoneNumbersOnly)) {
    statusMessage.textContent =
      "Телефон после '+' должен содержать только числа!";
    statusMessage.style.color = "red";
    return;
  }
  if (phoneNumbersOnly.length < 8 || phoneNumbersOnly.length > 12) {
    statusMessage.textContent =
      "Телефон должен содержать от 8 до 12 цифр (не считая '+')!";
    statusMessage.style.color = "red";
    return;
  }

  // --- Валидация Пароля ---
  const passwordValue = passwordInput.value;
  if (passwordValue.length < 5 || passwordValue.length > 26) {
    statusMessage.textContent = "Пароль должен быть от 5 до 26 символов!";
    statusMessage.style.color = "red";
    return;
  }

  let isError = users.some((user) => {
    return user.email === emailValue;
  });

  if (isError) {
    statusMessage.textContent = "Пользователь с таким email уже существует!";
    statusMessage.style.color = "red";
  } else {
    const user = {
      name: nameValue,
      phone: phoneValue,
      email: emailValue,
      password: passwordValue,
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    statusMessage.textContent = "Вы успешно зарегистрированы!";
    statusMessage.style.color = "green";

    userNameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
  }
});

//Авторизация
loginBtn.addEventListener("click", () => {
  const foundUser = users.find((user) => {
    return (
      user.email === loginInputEmail.value &&
      user.password === loginInputPassword.value
    );
  });

  const isLoginError = !foundUser;

  if (isLoginError) {
    if (loginInputEmail.value === "" || loginInputPassword.value === "") {
      statusMessage.innerText = "Необходимо заполнить все поля";
      statusMessage.style.color = "red";
    } else {
      statusMessage.innerText = "Вы ввели неверную почту или пароль";
      statusMessage.style.color = "red";
    }
  } else {
    loginInputEmail.value = "";
    loginInputPassword.value = "";
    statusMessage.innerText = "Вы успешно вошли";
    statusMessage.style.color = "green";

    setTimeout(() => {
      document.body.innerHTML = `
        <div class="welcome-screen">
          <h2>Добро пожаловать, ${foundUser.name}!</h2>
          <p>Вы находитесь в личном кабинете.</p>
          <button id="logoutBtn">Выйти</button>
        </div>
      `;

      document.querySelector("#logoutBtn").addEventListener("click", () => {
        location.reload();
      });
    }, 1000);
  }
});
