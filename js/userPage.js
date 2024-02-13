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
const imgUser = $.querySelectorAll(".imgUser");
fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {credentials: "include"})
  .then((result) => result.json())
  .then((res) => {
    imgUser.forEach((img) => (img.src = `https://bookshop-backend.liara.run${res.userdata.profileURLPath}`));
    let fullname = res.userdata.fullname.split("-");
    fullname.push(res.userdata.job);
    fullname.push(res.userdata.email);
    for (let i = 0; i < fullname.length; i++) {
      inputDivUpdateUser[i].value = fullname[i];
    }
  })
  .catch((err) => {});
LodingSite();

function LodingSite() {
  $.body.classList.remove("bg-primary");
  $.querySelector(".load").classList.add("hidden");
  $.querySelector("main").classList.remove("hidden");
}

////////////////////////////////////

const changeUserBtn = $.getElementById("changeUser");
const changePassBtn = $.getElementById("changePass");
const uploadImg = $.getElementById("uploadImg");
uploadImg.onchange = () => {
  console.log();
  let url = URL.createObjectURL(uploadImg.files[0]);
  console.log(url);
  imgUser.forEach((img) => (img.src = url));
};
//////////// changeUser

const changeUserFunc = () => {
  const formData = new FormData();
  formData.append("image", uploadImg.files[0]);
  formData.append("fullname", `${inputDivUpdateUser[0].value}-${inputDivUpdateUser[1].value}`);
  formData.append("job", inputDivUpdateUser[2].value);
  formData.append("email", inputDivUpdateUser[3].value);
  fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {
    method: "POST",
    credentials: "include",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => location.reload());
};

////////////// changePass
const currentPass = $.getElementById("currentPass");
const inputPass = $.querySelectorAll(".inputPass");
const spanError = $.querySelector(".spanError");
console.log(inputPass);
const changePassFunc = () => {
  if (inputPass[0].value.length < 8) {
    spanError.textContent = "پسوورد فعلی باید بیشتر از 8 کاراکتر باشد";
  } else if (inputPass[1].value.length < 8) {
    spanError.textContent = "پسوورد جدید باید بیشتر از 8 کاراکتر باشد";
  } else {
    console.log(inputPass[0].value);
    console.log(inputPass[1].value);
    let newPass = {
      currentpassword: inputPass[0].value,
      password: inputPass[1].value,
    };
    fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata/password", {
      credentials: "include",
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPass),
    })
      .then((result) => result.json())
      .then((data) => {
        if (!data.success) {
          spanError.textContent = "پسوورد فعلی صحیح نیست";
        } else {
          Swal.fire({
            title: "پسوورد با موفقیت تغییر کرد",
            icon: "success",
          }).then((data) => {
            if (data.isConfirmed || data.isDismissed) {
              location.reload();
            }
          });
        }
        console.log(data);
      })
      .catch((err) => {});
    console.log("object");
  }
};

changeUserBtn.onclick = changeUserFunc;
changePassBtn.onclick = changePassFunc;

////////////// Tikets

const tiketsContainer = $.querySelector(".tikets");
let tiketsApi = 0;
if (tiketsApi) {
  tiketsContainer.innerHTML = `<a href="#">
  <div class="p-2 px-4 rounded hover:bg-zinc-100 block md:flex justify-between">
    <div class="h-max my-auto">محصولات سایت</div>
    <div class="flex justify-between gap-5 md:my-0 my-5">
      <div class="lg:text-xs text-zinc-400 h-max my-auto">1402/09/04 (02:42)</div>
      <div class="flex md:my-5 my-5 gap-2">
        <div class="lg:text-xs bg-zinc-200 text-slate-500 py-1 px-1.5 rounded">پشتیبانی</div>
        <div class="lg:text-xs bg-zinc-200 text-slate-500 py-1 px-1.5 rounded">پشتیبانی</div>
      </div>
    </div>
  </div>
</a>`;
} else {
  tiketsContainer.innerHTML = `<span>تیکتی وجود ندارد</span>`;
}

//////////////Unpoad Img User
