import {divNextHeader} from "../components/templatNextHeader/divNextHeader.js";
customElements.define("div-next-header", divNextHeader);
import {CreateDivMahsol} from "./Create-Div-Mahsol.js";
import {containerProduct, addToLove, fastShow} from "./export.js";

let arrMahsol = [];
arrMahsol = JSON.parse(localStorage.getItem("mahsol"));

let api = await fetch("https://bookshop-backend.liara.run/api/v1/books");
let arrBook = await api.json();
tippy("#love", {
  theme: "tomato",
  content: "افزودن به علاقه مندی",
  placement: "right",
});
tippy("#moghaiese", {
  content: "مقایسه کردن",
  placement: "right",
});
tippy("#search", {
  content: "مشاهده سریع",
  placement: "right",
});

let page = 1;
let current = 6;

const pagination = () => {
  let end = page * current;
  let start = end - current;

  CreateDivMahsol(arrBook.slice(start, end), document.querySelector(".containerProduct"), ".");
  document.querySelectorAll(".btnMahsol").forEach((item) => (item.onclick = () => containerProduct(arrMahsol, item)));
};
pagination(arrBook);
let btnMahsol = document.querySelectorAll(".btnMahsol");

/////////////Page btns
let btns = 0;
const PageBtn = () => {
  btns = Math.ceil(arrBook.length / current);
  document.querySelector(".containerPagination").innerHTML = "";
  for (let i = 1; i < btns + 1; i++) {
    document.querySelector(".containerPagination").innerHTML += `
    <div class="w-10 h-10 bg-primary text-base rounded-full pageItemStore cursor-pointer"><div class="pt-2.5 text-white w-max mx-auto">${i}</div></div>
    `;
  }
  let pageItemStore = document.querySelectorAll(".pageItemStore");
  pageItemStore[0].classList.add("pageItemActive");
  pageItemStore.forEach((btn) => {
    btn.onclick = () => {
      activePage(btn);
    };
  });
};

function removeAll() {
  document.querySelectorAll(".pageItemStore").forEach((btn) => {
    btn.classList.remove("pageItemActive");
  });
}

function activePage(btn) {
  let innerBtn = Number(btn.textContent);
  removeAll();
  page = innerBtn;
  document.querySelectorAll(".pageItemStore").forEach((btn) => {
    btn.classList.remove("pageItemActive");
  });
  btn.classList.add("pageItemActive");
  pagination(arrBook);
}

PageBtn();

////////////////// next btn page
const nextBtn = document.getElementById("nextPagination");
const prevBtn = document.getElementById("prevPagination");
let sum = 1;
const next = () => {
  if (sum < btns) {
    sum++;
    page = sum;
    removeAll();
    document.querySelectorAll(".pageItemStore")[sum - 1].classList.add("pageItemActive");
    pagination(arrBook);
  }
  if (sum === btns) {
    nextBtn.classList.add("hidden");
    prevBtn.classList.remove("hidden");
  }
};

nextBtn.onclick = next;

////////////////// prev btn page

const prev = () => {
  if (sum > btns - 1) {
    sum--;
    page = sum;
    removeAll();
    document.querySelectorAll(".pageItemStore")[sum - 1].classList.add("pageItemActive");
    pagination(arrBook);
  }
  if (sum !== btns) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  }
};

prevBtn.onclick = prev;
btnMahsol.forEach((item) => (item.onclick = () => containerProduct(arrMahsol, item)));

let btnLove = document.querySelectorAll(".love");
let arrBookUser = [];
arrBookUser = JSON.parse(localStorage.getItem("love"));
btnLove.forEach((item) => {
  item.onclick = () => {
    addToLove(arrBookUser, item);
  };
});
fastShow(".");
document.getElementById("chanePagination").onchange = () => {
  let currentValue = Number(document.getElementById("chanePagination").value);
  page = 1;
  current = currentValue;
  pagination();
  PageBtn();
  console.log(current);
};
