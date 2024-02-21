const $ = document;

import {divNextHeader} from "../components/templatNextHeader/divNextHeader.js";
import {CreateDivMahsol} from "./Create-Div-Mahsol.js";
import {countBasket} from "./Header-Site.js";
import {addToLove, fastShow} from "./export.js";
customElements.define("div-next-header", divNextHeader);

let api = await fetch("https://bookshop-backend.liara.run/api/v1/books");
let arrBook = await api.json();
let local = JSON.parse(localStorage.getItem("mahsol"));
let arrMahsol = [];
arrMahsol = local;

var Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,

  showClass: {
    popup: `
      animate__animated
      animate__bounceInRight
      animate__faster
    `,
  },
  hideClass: {
    popup: `
      animate__animated
      animate__bounceOutRight
      animate__faster
    `,
  },
  color: "#fff",
  background: "#198754",
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function renderDivMahsol() {
  tableMahsol.innerHTML = "";
  $.querySelector("#mobileBasket").innerHTML = "";

  arrMahsol.forEach((item) => {
    tableMahsol.innerHTML += `
    <div data-id="${item.id}" class="grid grid-cols-12 text-center border-b-[1px] border-zinc-200">
    <div class="col-span-1 cursor-pointer flex removeProduct"><img src="../img/close-red.png" class="w-6 m-auto" alt="" /></div>
    <div class="col-span-3 p-5 header-table"><img class="w-28 m-auto" src="https://bookshop-backend.liara.run${item.img}" alt="" /></div>
    <div class="col-span-2 p-5 header-table">${item.name}</div>
    <div class="col-span-2 p-5 header-table">${item.price.toLocaleString()}</div>
    <div class="col-span-2 p-5 header-table gap-2"> 
    <img src="../img/icons8-minus-24.png" class="cursor-pointer  minusProduct my-auto w-4 h-4" alt="" />
    <input readonly type="text" value="${item.count}" class="text-center w-14 outline-none p-1.5 rounded-full border-zinc-200 border-[1px]" />
    <img src="../img/icons8-close-50.png" class="cursor-pointer plusProduct my-auto w-3 h-3 rotate-45" alt="" />
  </div>
    <div class="col-span-2 p-5 header-table">${(item.count * item.price).toLocaleString()}</div>
  </div>
    `;
    $.querySelector("#mobileBasket").innerHTML += `
    <div class="border-zinc-200 border-[1px] rounded-xl my-4">
              <div class="flex justify-between">
                <div><img src="https://bookshop-backend.liara.run${item.img}" class="w-28" alt="" /></div>
                <div class="p-5" data-id="${item.id}"><img src="../img/close-red.png" class="w-6 removeProduct" alt="" /></div>
              </div>
              <div class="grid grid-cols-3 mt-3">
                <div class="col-span-1 border-l-[1px] border-zinc-200">
                  <div class="mobileItemBasket">محصول</div>
                  <div class="mobileItemBasket">قیمت</div>
                  <div class="mobileItemBasket">تعداد</div>
                  <div class="mobileItemBasket">جمع جزِ</div>
                </div>
                <div class="col-span-2" data-id="${item.id}">
                  <div class="mobileItemBasket">${item.name}</div>
                  <div class="mobileItemBasket">${item.price.toLocaleString()}</div>
                  <div class="p-[14px] flex gap-3 justify-center">
                    <img src="../img/icons8-minus-24.png" class="cursor-pointer minusProduct my-auto w-4 h-4" alt="" />
                    <input readonly type="text" value="${item.count}" class="text-center w-14 outline-none p-1.5 rounded-full border-zinc-200 border-[1px]" />
                    <img src="../img/icons8-close-50.png" class="cursor-pointer plusProduct my-auto w-3 h-3 rotate-45" alt="" />
                  </div>
                  <div class="mobileItemBasket">${item.count * item.price} تومان</div>
                </div>
              </div>
            </div>
    `;
  });

  $.querySelectorAll(".plusProduct").forEach((btn) => {
    btn.onclick = function () {
      let id = btn.parentElement.parentElement.dataset.id;
      let index = local.findIndex((item) => item.id === id);
      arrMahsol[index].count++;
      localStorage.setItem("mahsol", JSON.stringify(arrMahsol));
      renderDivMahsol();
      total(arrMahsol);
    };
  });

  $.querySelectorAll(".minusProduct").forEach((btn) => {
    btn.onclick = function () {
      let id = btn.parentElement.parentElement.dataset.id;
      let index = local.findIndex((item) => item.id === id);
      if (arrMahsol[index].count > 1) {
        arrMahsol[index].count--;
      } else {
        arrMahsol.splice(index, 1);
      }
      localStorage.setItem("mahsol", JSON.stringify(arrMahsol));
      renderDivMahsol();
      isArrBaskets();
      total(arrMahsol);
      countBasket(arrMahsol);
    };
  });

  $.querySelectorAll(".removeProduct").forEach((btn) => {
    btn.onclick = function () {
      let id = btn.parentElement.dataset.id;
      let index = local.findIndex((item) => item.id === id);
      arrMahsol.splice(index, 1);
      localStorage.setItem("mahsol", JSON.stringify(arrMahsol));
      total(arrMahsol);
      renderDivMahsol();
      isArrBaskets();
      countBasket(arrMahsol);
    };
  });
}

////////////////////////

function isArrBaskets() {
  if (arrMahsol.length > 0) {
    $.getElementById("empityBasketImg").classList.add("hidden");
    $.getElementById("divAsli").classList.remove("hidden");
  } else {
    $.getElementById("empityBasketImg").classList.remove("hidden");
    $.getElementById("divAsli").classList.add("hidden");
  }
}

let tableMahsol = $.querySelector("#tableMahsol");

CreateDivMahsol(arrBook.slice(0, 4), $.querySelector("#mahsol"), ".", "", false);
let btnMahsol = document.querySelectorAll(".btnMahsol");
btnMahsol.forEach((item) => {
  item.onclick = async () => {
    containerProduct(arrMahsol, item);
  };
});

function setlocal(arr) {
  localStorage.setItem("mahsol", JSON.stringify(arr));
}
function containerProduct(arrMahsol, btn) {
  let idMahsol = btn.dataset.num;
  fetch(`https://bookshop-backend.liara.run/api/v1/books/${idMahsol}`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((data) => {
      addTobascket(data, arrMahsol);
    })
    .catch((err) => {});
}

function addTobascket(respons, arrMahsol) {
  fetch(`https://bookshop-backend.liara.run/api/v1/books`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((arr) => {
      let newProduct = {
        id: respons.foundBook._id,
        name: respons.foundBook.name,
        price: respons.foundBook.price,
        img: respons.foundBook.imagePath,
        count: 1,
      };
      let someLocal = arrMahsol.some((item) => item.id === newProduct.id);
      if (someLocal) {
        let findIndexLocal = arrMahsol.findIndex((item) => item.id === newProduct.id);
        arrMahsol[findIndexLocal].count++;
      } else {
        arrMahsol.push(newProduct);
      }
      setlocal(arrMahsol);
      renderDivMahsol();
      total(arrMahsol);
      isArrBaskets();
      countBasket(arrMahsol);

      Toast.fire({title: "با موفقیت به سبد خرید اضافه شد", icon: "success"});
    });
}

renderDivMahsol();
isArrBaskets();
total(arrMahsol);
function total(arr) {
  let priceTotal = arr.reduce((prev, next) => {
    return (prev += next.count * next.price);
  }, 0);
  $.querySelector(".total").innerHTML = `
  <td class="p-5 text-center">${priceTotal.toLocaleString()}</td>
  <td class="p-5 text-center border-r-[1px] border-zinc-200">${priceTotal.toLocaleString()}</td>
  `;
}

let btnLove = document.querySelectorAll(".love");
let arrBookUser = [];
arrBookUser = JSON.parse(localStorage.getItem("love"));
btnLove.forEach((item) => {
  item.onclick = () => {
    addToLove(arrBookUser, item);
  };
});
fastShow(".");
