// let $ = document;
// let flag = true;
// let SaveUser = $.querySelector(".SaveUser");
// SaveUser.addEventListener("click", () => {
//   if (flag) {
//     flag = false;
//     SaveUser.classList.replace("bg-black", "bg-blue-700");
//     SaveUser.style.textAlign = "-webkit-left";
//   } else {
//     flag = true;
//     SaveUser.style.textAlign = "-webkit-right";
//     SaveUser.classList.replace("bg-blue-700", "bg-black");
//   }
// });

// let cokie = $.cookie;
// let loginText = $.querySelectorAll(".loginText");
// let btnSubmit = $.querySelector(".btnSubmit");
// let btnLogin = $.querySelector(".btnLogin");
// let inputLogin = $.querySelectorAll(".inputLogin");
// let inputSubmit = $.querySelectorAll(".inputSubmit");
// loginText.forEach((btn) => {
//   btn.onclick = () => {
//     if (btn.className.includes("Submit")) {
//       $.querySelector(".DivSubmit").classList.remove("hidden");
//       $.querySelector(".DivLogin").classList.add("hidden");
//     } else {
//       $.querySelector(".DivSubmit").classList.add("hidden");
//       $.querySelector(".DivLogin").classList.remove("hidden");
//     }
//     loginText.forEach((btn) => btn.classList.remove("active"));
//     btn.classList.add("active");
//   };
// });
// btnLogin.addEventListener("click", () => {
//   if (inputLogin[0].value && inputLogin[1].value) {
//     if (cokie) {
//       let cokie = document.cookie.split(";");
//       let y = cokie.map((item) => item.slice(item.indexOf("=") + 1));
//       console.log(y);
//       if (inputLogin[0].value === `${y[0]}${y[1]}` && inputLogin[1].value === y[2]) {
//         alert("با موفقیت ورود کردید");
//         location.href = "../index.html";
//       } else {
//         $.querySelector(".ElmNotLogin").innerHTML = "نام کاربری یا پسوورد اشتباه است";
//       }
//     } else {
//       $.querySelector(".ElmNotLogin").innerHTML = "ابتدا ثبت نام کنید";
//     }
//   } else {
//     $.querySelector(".ElmNotLogin").innerHTML = "لطفا مقادیر را به درستی وارد کنید";
//   }
// });
// btnSubmit.addEventListener("click", () => {
//   if (cokie) {
//     $.querySelector(".ElmNotSubmit").innerHTML = "وارد حساب خود شوید";
//   } else {
//     if (inputSubmit[2].value != inputSubmit[3].value) {
//       $.querySelector(".ElmNotSubmit").innerHTML = "لطفا پسوورد رو عین هم تکرار کنید";
//     } else if (inputSubmit[0].value && inputSubmit[1].value && inputSubmit[2].value && inputSubmit[3].value) {
//       let date = new Date();
//       console.log(date.getTime());
//       let now = date.setTime(date.getTime() + 20 * 24 * 60 * 60 * 1000);
//       $.cookie = `name=${inputSubmit[0].value};path=/;expires=${date}`;
//       $.cookie = `family=${inputSubmit[1].value};path=/;expires=${date}`;
//       $.cookie = `pass=${inputSubmit[3].value};path=/;expires=${date}`;
//       alert("ثبت نام با موفقیت انجام شد");
//       setTimeout(() => {
//         location.reload();
//       }, 500);
//     }
//   }
// });

// ///ShowPass

// $.querySelectorAll(".ShowPass").forEach((ShowPassBtn) => {
//   ShowPassBtn.addEventListener("click", (e) => {
//     let parent = e.target.parentElement;
//     let input = parent.querySelector("input");
//     if (e.target.src === "http://127.0.0.1:5501/img/eye.png") {
//       ShowPassBtn.src = "../img/eye-slash.png";
//       input.type = "text";
//     } else {
//       input.type = "password";
//       ShowPassBtn.src = "../img/eye.png";
//     }
//   });
// });

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

///////////Function Regester

const regesterFunc = () => {
  spanError.forEach((span) => span.classList.add("hidden"));
  if (inputDivRegestar[0].value.length < 8) {
    removeClass(0);
  } else if (inputDivRegestar[1].value.length < 4) {
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
