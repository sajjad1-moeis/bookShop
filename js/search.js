const $ = document;
import {divNextHeader} from "../components/templatNextHeader/divNextHeader.js";
customElements.define("div-next-header", divNextHeader);
import {containerProduct, addToLove} from "./export.js";
import {CreateDivMahsol} from "./Create-Div-Mahsol.js";
let api = await fetch("https://bookshop-backend.liara.run/api/v1/books");
let arrBook = await api.json();

const searchBookInput = $.getElementById("searchBookInput");
const searchBookBtn = $.getElementById("searchBookBtn");

function SerachBook() {
  if (searchBookInput.value) {
    location.href = `../html/search.html?id=${searchBookInput.value}`;
  }
}

searchBookInput.onkeydown = (e) => {
  if (e.key === "Enter") {
    SerachBook();
  }
};

searchBookBtn.onclick = SerachBook;

let url = location.search;
let serach = new URLSearchParams(url);
let wordSerach = serach.get("id");
let filterBook = arrBook.filter((item) => {
  return item.name.includes(wordSerach);
});
CreateDivMahsol(filterBook, document.querySelector("#searchProduct"), ".", "", false);

let btnMahsol = document.querySelectorAll(".btnMahsol");

let arrMahsol = [];
arrMahsol = JSON.parse(localStorage.getItem("mahsol"));
btnMahsol.forEach((item) => (item.onclick = () => containerProduct(arrMahsol, item)));

//////////////////
let btnLove = $.querySelectorAll(".love");
let arrLove = [];
arrLove = JSON.parse(localStorage.getItem("love"));
btnLove.forEach((item) => (item.onclick = () => addToLove(arrLove, item)));
