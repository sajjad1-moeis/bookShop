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
    div.classList.remove("hidden");
  };
});

const loginBtn = document.querySelector(".loginBtn");
const registerBtn = document.querySelector(".registerBtn");
const inputDivRegestar = document.querySelectorAll("#regestar input");
const spanError = document.querySelectorAll(".spanError");
const spanErrorLogin = document.querySelector(".spanErrorLogin");
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

const regesterFunc = () => {
  spanError.forEach((span) => span.classList.add("hidden"));
  if (inputDivRegestar[0].value.length < 8) {
    removeClass(0);
  } else if (!validateEmail(inputDivRegestar[1].value)) {
    removeClass(1);
  } else if (inputDivRegestar[2].value.length < 8) {
    removeClass(2);
  } else if (inputDivRegestar[3].value !== inputDivRegestar[2].value) {
    console.log("object");
    removeClass(3);
  } else {
  }
};

///////////Function Login

const loginFunc = () => {
  console.log("object");
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

const email = "example@gmail.com";
console.log(validateEmail(email));
