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
let apiUser = null;
let imgUser = $.querySelectorAll(".imgUser");
console.log(imgUser);
// console.log(inputDivUpdateUser);
const SettUI = async () => {
  try {
    let api = await fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {credentials: "include"});
    let jsonApi = await api.json();
    apiUser = jsonApi.userdata;
    imgUser.forEach((img) => (img.src = `https://bookshop-backend.liara.run${jsonApi.userdata.profileURLPath}`));
    let fullname = jsonApi.userdata.fullname.split("-");
    fullname.push(jsonApi.userdata.job);
    fullname.push(jsonApi.userdata.email);
    for (let i = 0; i < fullname.length; i++) {
      inputDivUpdateUser[i].value = fullname[i];
    }
  } catch {
    SwalAlert("دوباره تلاش کنید", "error");
  }
};
SettUI();

function LodingSite() {
  $.body.classList.remove("bg-primary");
  $.querySelector(".load").classList.add("hidden");
  $.querySelector("main").classList.remove("hidden");
}

////////////////////////////////////

const changeUserBtn = $.getElementById("changeUser");
const changePassBtn = $.getElementById("changePass");
const uploadImg = $.getElementById("uploadImg");
//////////////Unpoad Img User
uploadImg.onchange = () => {
  console.log();
  let url = URL.createObjectURL(uploadImg.files[0]);
  console.log(url);
  imgUser.forEach((img) => (img.src = url));
};
//////////// changeUser
function SwalAlert(message, icon) {
  Swal.fire({
    title: message,
    icon: icon,
  });
}

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
    .then((data) => {
      SwalAlert("اطلاعات با موفقیت تغییر یافت", "success");
    });
};

////////////// changePass
const currentPass = $.getElementById("currentPass");
const inputPass = $.querySelectorAll(".inputPass");
const spanError = $.querySelector(".spanError");
const changePassFunc = () => {
  if (inputPass[0].value.length < 8) {
    spanError.textContent = "پسوورد فعلی باید بیشتر از 8 کاراکتر باشد";
  } else if (inputPass[1].value.length < 8) {
    spanError.textContent = "پسوورد جدید باید بیشتر از 8 کاراکتر باشد";
  } else {
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

///////////// create Div mahsol

import {CreateDivMahsol} from "./Create-Div-Mahsol.js";
let mahsolContainer = $.querySelector(".mahsol");
let api = await fetch("https://bookshop-backend.liara.run/api/v1/books");
let arrBook = await api.json();
CreateDivMahsol(arrBook.slice(4, 8), mahsolContainer, ".");

//////////////////Open Modal Tiket

const allInputTiket = $.querySelectorAll(".input-tiket");
function closeModal() {
  allInputTiket[0].value = "دپارتمان";
  Array.from(allInputTiket)
    .slice(1)
    .forEach((input) => (input.value = ""));
  modalTiket.style.cssText = "top: -100%;transform: translate(0,-60%)";
  $.querySelector("main").style.cssText = "filter: none; background: #fff;";
}

const openModalBtn = $.querySelector(".open-Modal");
const modalTiket = $.querySelector(".modalTiket");
openModalBtn.onclick = () => {
  modalTiket.style.cssText = "top: 0%;transform: translate(0,0%)";
  $.querySelector("main").style.cssText = "filter: brightness(0.5); background: #ccc;";
};

$.querySelector("main").onclick = (e) => {
  let div = e.target.tagName;
  if (div === "DIV") {
    if (!e.target.className.includes("open-Modal")) {
      closeModal();
    }
  } else {
  }
};

//////////// Post Tiket

const postTiketBtn = $.getElementById("postTiket");
const errorTiketSpan = $.querySelector(".errorTiketSpan");
const postTiket = () => {
  if (allInputTiket[0].value && allInputTiket[1].value && allInputTiket[2].value) {
    errorTiketSpan.classList.add("hidden");
    let newTiket = {
      subject: allInputTiket[0].value,
      title: allInputTiket[1].value,
      message: allInputTiket[2].value,
    };
    fetch("https://bookshop-backend.liara.run/api/v1/ticket", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newTiket),
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        closeModal();
        getTiketFunc();
      })
      .catch((err) => {
        SwalAlert("دوباره تلاش کنید", "error");
      });
  } else {
    errorTiketSpan.classList.remove("hidden");
  }
};
postTiketBtn.onclick = postTiket;

let IdTiket = 0;
////////////// get Tiket
const tiketsContainer = $.querySelector(".tikets");

const getTiketFunc = async () => {
  fetch("https://bookshop-backend.liara.run/api/v1/ticket/myTickets", {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((data) => {
      if (data.tickets == "") {
        tiketsContainer.innerHTML = `<div class="w-max my-10 text-xl mx-auto">تیکتی وجود ندارد</div>`;
      } else {
        console.log(data.tickets);
        let date = new Date(data.tickets[0].createDate).toLocaleString("fa-IR");
        let time = date.split(",");
        console.log(time);
        tiketsContainer.innerHTML = "";
        data.tickets.forEach((item) => {
          tiketsContainer.innerHTML += `
      
        <div class="btnShowChatUser p-2 px-4 my-2 rounded hover:bg-zinc-100 block md:flex justify-between cursor-pointer" data-ticket="${item._id}">
          <div class="h-max my-auto">${item.title}</div>
          <div class=" md:flex justify-between gap-5 md:my-0 my-5">
            <div class="lg:text-xs text-zinc-400 h-max my-auto"> ${time[0]}   (${time[1].slice(0, 6)} )</div>
            <div class=" flex md:my-5 my-5 gap-2">
              <div class="lg:text-xs bg-zinc-200 text-slate-500 py-1 px-1.5 rounded">${item.subject}</div>
              <div class="lg:text-xs px-4 ${item.status ? "bg-success" : "bg-danger"} text-white py-1 px-1.5 rounded">${item.status ? "باز" : "بسته"}</div>
            </div>
               </div>
            </div>
         `;
        });

        $.querySelectorAll(".btnShowChatUser").forEach((btn) => {
          btn.onclick = () => {
            let nameUser = document.querySelector("#nameUser").textContent;
            console.log(nameUser);
            IdTiket = btn.dataset.ticket;
            showTikcetFunc(btn.dataset.ticket, nameUser);
          };
        });
      }
      LodingSite();
    })
    .catch((err) => {});
};
const inputNewTextTicket = $.querySelector(".inputNewTextTicket");

function showTikcetFunc(id, title) {
  fetch(`https://bookshop-backend.liara.run/api/v1/ticket/${id}`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((res) => {
      console.log(res);
      console.log();
      $.querySelector(".titleTicket").textContent = res.ticket.title;
      let DivChatUser = $.querySelector(".containerChatUser");
      DivChatUser.classList.remove("hidden");
      inputNewTextTicket.value = "";
      $.querySelector(".divChatUser").innerHTML = "";
      res.messages.forEach((item) => {
        let date = new Date(item.sendTime).toLocaleString("fa-IR");
        let time = date.split(",");
        console.log(time);
        $.querySelector(".divChatUser").innerHTML += `
         <div class="${item.isAdminMessage ? "divAdminChat" : "divUserChat"}">
        <div class="max-w-[800px] w-full  p-6 ${
          item.isAdminMessage ? "bg-primary text-white" : " bg-zinc-100"
        } " style="border-radius: 10px; border-bottom-left-radius: 0">
          <div class="mt-2 mb-5 text-sm w-full">${title} ${time[0]}  (${time[1]} )</div>
          <p>${item.content}</p>
        </div>
      </div>
      `;
      });
    })
    .catch((err) => {});
}

getTiketFunc();

////////////// sendNewTextTicket

const sendNewTextTicketBtn = $.querySelector(".sendNewTextTicket");
const sendNewTextTicket = () => {
  if (inputNewTextTicket.value) {
    fetch(`https://bookshop-backend.liara.run/api/v1/ticket/${IdTiket}`, {
      method: "PUT",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: inputNewTextTicket.value}),
    })
      .then((res) => res.json())
      .then(console.log);

    console.log(IdTiket);
  } else {
    SwalAlert("لطفا متن مورد نظر را بنویسید", "warning");
  }
};

sendNewTextTicketBtn.onclick = sendNewTextTicket;
