import {CreateDivsPanel, moreDivCreatePanel} from "./export.js";
let div = [
  {title: "صفحه اصلی", href: "../index.html"},
  {title: "پیشخوان", href: "#"},
  {title: "خرید ها", href: "#"},
  {title: "تیکت ها", href: "#"},
  {title: "جزِیات حساب", href: "#"},
  {title: "خروج", href: "#"},
];
CreateDivsPanel(div);
const spanNameUser = document.getElementById("nameUser");

const setUiUser = () => {
  fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {credentials: "include"})
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      spanNameUser.textContent = res.userdata.fullname;
    });
};
setUiUser();

let imgDiv = [
  {img: "../img/icons8-shopping-bag-64.png", title: "0", more1: "تیکت", color: "blue-500", more2: "مجموع خرید"},
  {img: "../img/icons8-money-64.png", title: "0", more1: "مقاله", color: "danger", more2: "خرید های من"},
  {img: "../img/icons8-gmail-50.png", title: "0", more1: "کاربر", color: "success", more2: "تیکت ها"},
  {img: "../img/icons8-purse-32.png", title: "0", more1: "محصول", color: "warning", more2: "موجودی حساب"},
];
moreDivCreatePanel(imgDiv);
