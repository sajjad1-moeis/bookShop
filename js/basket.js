const $ = document;

import {divNextHeader} from "../components/templatNextHeader/divNextHeader.js";
import {CreateDivMahsol} from "./Create-Div-Mahsol.js";
import {containerProduct} from "./export.js";
customElements.define("div-next-header", divNextHeader);

let api = await fetch("https://bookshop-backend.liara.run/api/v1/books");
let arrBook = await api.json();
let local = JSON.parse(localStorage.getItem("mahsol"));
let arrMahsol = [];
arrMahsol = [...local];

CreateDivMahsol(arrBook.slice(0, 4), $.querySelector("#mahsol"), ".", "");
console.log(arrMahsol);
let tableMahsol = $.querySelector("#tableMahsol");
if (local == "") {
} else {
  renderDivMahsol();
  isArrBaskets();
}
let btnMahsol = document.querySelectorAll(".btnMahsol");
btnMahsol.forEach((item) => {
  item.onclick = () => {
    isArrBaskets();
    containerProduct(arrMahsol, item);
    renderDivMahsol();
  };
});
function renderDivMahsol() {
  tableMahsol.innerHTML = "";
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
  });

  $.querySelectorAll(".plusProduct").forEach((btn) => {
    btn.onclick = function () {
      let id = btn.parentElement.parentElement.dataset.id;
      let index = local.findIndex((item) => item.id === id);
      arrMahsol[index].count++;
      localStorage.setItem("mahsol", JSON.stringify(arrMahsol));
      renderDivMahsol();
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
    };
  });

  $.querySelectorAll(".removeProduct").forEach((btn) => {
    btn.onclick = function () {
      let id = btn.parentElement.dataset.id;
      let index = local.findIndex((item) => item.id === id);
      arrMahsol.splice(index, 1);
      localStorage.setItem("mahsol", JSON.stringify(arrMahsol));
      renderDivMahsol();
      isArrBaskets();
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
