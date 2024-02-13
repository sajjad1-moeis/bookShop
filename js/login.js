let $ = document;

const inputs = document.querySelectorAll(".input");

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});

let SwichLoginBtn = document.querySelectorAll(".login");

let BtnLoginAndRegestar = document.querySelectorAll(".loginAndRegester  div");
BtnLoginAndRegestar.forEach((btn) => {
  btn.onclick = () => {
    BtnLoginAndRegestar.forEach((div) => div.classList.remove("active"));
    btn.classList.add("active");
    SwichLoginBtn.forEach((btn) => btn.classList.add("hidden"));
    let id = btn.dataset.id;
    let div = document.querySelector(`#${id}`);
    id === "regestar"
      ? div.querySelectorAll(".text-danger").forEach((span) => span.classList.add("hidden"))
      : div.querySelectorAll(".text-danger").forEach((span) => (span.textContent = ""));
    div.querySelectorAll("input").forEach((input) => (input.value = ""));
    div.classList.remove("hidden");
  };
});

const loginBtn = document.querySelector(".loginBtn");
const registerBtn = document.querySelector(".registerBtn");
const inputDivRegestar = document.querySelectorAll("#regestar input");
const spanError = document.querySelectorAll(".spanError");
const spanErrorLogin = document.querySelector(".spanErrorLogin");
const inputLogin = document.querySelectorAll(".inputLogin");
const showPassBtn = document.querySelectorAll(".showPassBtn");
const removeClass = (add) => {
  spanError[add].classList.remove("hidden");
};
console.log("d@gmail.com".length);
///////////Function Regester

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/////////////////////
const ValidDataBaseRegister = (name, family, email, pass) => {
  let newUser = {
    email: email,
    fullname: `${name}-${family}`,
    password: pass,
  };
  fetch("https://bookshop-backend.liara.run/api/v1/register", {
    credentials: "include",
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newUser),
  })
    .then((result) => {
      Swal.fire({
        title: "با موفقیت ثبت نام کردید ",
        icon: "success",
      }).then((data) => {
        if (data.isConfirmed || data.isDismissed) {
          location.reload();
        }
      });
    })
    .catch((err) => {
      Swal.fire({
        title: "دوباره تلاش کنید",
        icon: "error",
      });
    });
};
const regesterFunc = () => {
  spanError.forEach((span) => span.classList.add("hidden"));
  if (inputDivRegestar[0].value.length < 3) {
    removeClass(0);
  } else if (inputDivRegestar[1].value.length < 4) {
    removeClass(1);
  } else if (!validateEmail(inputDivRegestar[2].value)) {
    removeClass(2);
  } else if (inputDivRegestar[3].value < 8) {
    console.log("object");
    removeClass(3);
  } else {
    ValidDataBaseRegister(inputDivRegestar[0].value, inputDivRegestar[1].value, inputDivRegestar[2].value, inputDivRegestar[3].value);
  }
};

////////////////Valid Login
const ValidDataBaseLogin = async (email, password) => {
  fetch("https://bookshop-backend.liara.run/api/v1/login", {
    credentials: "include",
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      if (data.valid !== undefined) {
        if (!data.valid) {
          spanErrorLogin.textContent = "لطفا ابتدا ثبت نام کنید";
        }
      } else if (!data.success) {
        spanErrorLogin.textContent = "پسورد اشتباه است";
      } else {
        Swal.fire({
          title: "با موفقیت ورود کردید ",
          icon: "success",
        }).then((data) => {
          if (data.isConfirmed || data.isDismissed) {
            location.href = "../index.html";
          }
        });
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "دوباره تلاش کنید",
        icon: "error",
      });
    });
};

///////////Function Login

const loginFunc = () => {
  if (inputLogin[0].value && inputLogin[1].value) {
    if (!validateEmail(inputLogin[0].value)) {
      spanErrorLogin.textContent = "ایمیل صحیح نمی باشد";
    } else if (inputLogin[1].value.length < 8) {
      spanErrorLogin.textContent = "پسورد نباید از 8 تا کمتر باشد";
    } else {
      ValidDataBaseLogin(inputLogin[0].value, inputLogin[1].value);
    }
  } else {
    spanErrorLogin.textContent = "لطفا تمام فیلد هارا پر کنید";
  }
};

/////Convert input Text  To Pass

function showPassFunc() {
  let input = this.parentElement.querySelector("input");
  let img = this.parentElement.querySelector("img");
  if (input.type === "password") {
    input.type = "text";
    img.src = "../img/eye.png";
  } else {
    img.src = "../img/eye-slash.png";
    input.type = "password";
  }
}
showPassBtn.forEach((btn) => {
  btn.onclick = showPassFunc;
});
registerBtn.onclick = regesterFunc;
loginBtn.onclick = loginFunc;
