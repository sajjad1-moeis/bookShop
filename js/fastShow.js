import {divNextHeader} from "../components/templatNextHeader/divNextHeader.js";
customElements.define("div-next-header", divNextHeader);
import {containerProduct, addToLove} from "./export.js";

let l = location.search;
let url = new URLSearchParams(l);
let result = url.get("id");
fetch(`https://bookshop-backend.liara.run/api/v1/books/${result}`, {
  credentials: "include",
})
  .then((result) => result.json())
  .then((data) => {
    document.getElementById("img").src = `https://bookshop-backend.liara.run${data.foundBook.imagePath}`;
    document.getElementById("name").textContent = data.foundBook.name;
    document.getElementById("price").textContent = `${data.foundBook.price.toLocaleString()} تومان`;
    document.querySelector(".btnMahsol").setAttribute("data-num", `${data.foundBook._id}`);
    document.querySelector(".containerHeart").setAttribute("data-num", `${data.foundBook._id}`);
  })
  .catch((err) => {});

let btnMahsol = document.querySelectorAll(".btnMahsol");
let arrMahsol = [];
arrMahsol = JSON.parse(localStorage.getItem("mahsol"));
btnMahsol.forEach((item) => (item.onclick = () => containerProduct(arrMahsol, item)));

let btnLove = document.querySelectorAll(".love");
let arrLove = [];
arrLove = JSON.parse(localStorage.getItem("love"));
btnLove.forEach((item) => (item.onclick = () => addToLove(arrLove, item)));

document.querySelector(".ss").onmousemove = (e) => {
  let top = `${e.clientY - document.querySelector(".ss").offsetTop}px`;
  let left = `${e.clientX - document.querySelector(".ss").offsetLeft}px`;
  document.getElementById("img").style.transformOrigin = `${left} ${top}`;
  document.getElementById("img").style.transform = `scale(1.3)`;
};
document.querySelector(".ss").onmouseleave = (e) => {
  document.getElementById("img").style.transformOrigin = `0 0`;
  document.getElementById("img").style.transform = `scale(1)`;
};
