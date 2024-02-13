const $ = document;
import {CreateDivsPanel, moreDivCreatePanel, CheckAuth, setUiUser, funcLogOut} from "./export.js";
let div = [
  {title: "پیشخوان", href: "../html/userPage.html?id=pishkhan"},
  {title: "تیکت ها", href: "../html/userPage.html?id=tiket"},
  {title: "علاقه مندی ها", href: "../html/userPage.html?id=love"},
  {title: "جزِیات حساب", href: "../html/userPage.html?id=moreUser"},
  {title: "صفحه اصلی", href: "../index.html"},
  {title: "خروج", href: "#"},
];

let imgDiv = [
  {img: "../img/icons8-shopping-bag-64.png", title: "0", more1: "تیکت", color: "blue-500", more2: "مجموع خرید"},
  {img: "../img/icons8-money-64.png", title: "0", more1: "مقاله", color: "danger", more2: "خرید های من"},
  {img: "../img/icons8-gmail-50.png", title: "0", more1: "کاربر", color: "success", more2: "تیکت ها"},
  {img: "../img/icons8-purse-32.png", title: "0", more1: "محصول", color: "warning", more2: "موجودی حساب"},
];
const spanNameUser = document.getElementById("nameUser");
////////////// use Import All
setUiUser(spanNameUser);

CheckAuth("#");
CreateDivsPanel(div);
moreDivCreatePanel(imgDiv);
let aDiv = document.querySelectorAll(".panel a");
funcLogOut(aDiv[5]);

//////////////////
const showDivLocation = () => {
  let locationSite = location.search;
  let IdLocation = new URLSearchParams(locationSite);
  let SearchLocation = IdLocation.get("id");
  console.log(SearchLocation);
  if (SearchLocation === null) {
    document.querySelector(`#pishkhan`).classList.remove("hidden");
  } else {
    document.querySelectorAll(".Location").forEach((div) => div.classList.add("hidden"));
    document.querySelector(`#${SearchLocation}`).classList.remove("hidden");
  }
};
showDivLocation();

//////////////////// divLoveTextContent

let divLove = document.getElementById("love");
const divLoveTextContent = () => {
  let api = 0;
  if (api > 1) {
  } else {
    divLove.textContent = "محصولی در علاقه مندی شما وجود ندارد ...";
  }
};
divLoveTextContent();

///////////////////////// funUpdateUser

const divUpdateUser = document.querySelector(".divUpdateUser");
let inputDivUpdateUser;
const funUpdateUser = () => {
  let arrUser = ["نام", "نام خانوادگی", "شغل", "ایمیل"];
  for (let i = 0; i < arrUser.length; i++) {
    divUpdateUser.innerHTML += `
    <div>
    <p class="my-4">${arrUser[i]}</p>
    <input type="text" class="focus:border-[1px] focus:border-zinc-300 bg-zinc-100 p-4 w-full outline-none rounded-xl" />
    </div>
    `;
  }
  inputDivUpdateUser = document.querySelectorAll(".divUpdateUser input");
};
funUpdateUser();
// console.log(inputDivUpdateUser);
fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {credentials: "include"})
  .then((result) => result.json())
  .then((res) => {
    console.log(res);
    let fullname = res.userdata.fullname.split("-");
    fullname.push(res.userdata.job);
    fullname.push(res.userdata.email);
    for (let i = 0; i < fullname.length; i++) {
      inputDivUpdateUser[i].value = fullname[i];
    }
    LodingSite();
  })
  .catch((err) => {});

function LodingSite() {
  $.body.classList.remove("bg-primary");
  $.querySelector(".load").classList.add("hidden");
  $.querySelector("main").classList.remove("hidden");
}

////////////////////////////////////

const changeUserBtn = $.getElementById("changeUser");
const changePassBtn = $.getElementById("changePass");
const uploadImg = $.getElementById("uploadImg");
//////////// changeUser

const changeUserFunc = () => {
  const formData = new FormData();
  formData.append("image", uploadImg.files[0]);
  formData.append("fullname", `${inputDivUpdateUser[0].value}-${inputDivUpdateUser[1].value}`);
  formData.append("job", inputDivUpdateUser[2].value);
  formData.append("email", inputDivUpdateUser[3].value);
  fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {
    method: "PUT",
    credentials: "include",
    headers: {"Content-Type": "multipart/form-data"},
    body: formData,
  }).then(console.log);
};

////////////// changePass

const currentPass = $.getElementById("currentPass");

const changePassFunc = () => {
  console.log("object");
};

changeUserBtn.onclick = changeUserFunc;
changePassBtn.onclick = changePassFunc;
