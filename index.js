const $ = document;

//////////////////////// import All
import {empityLocal, addToLove, fastShow} from "./js/export.js";
import {headerAndIsLogin} from "./js/Header-Site.js";
import {temp2, temp1} from "./components/temp1/temp1.js";
import {CreateDivMahsol} from "./js/Create-Div-Mahsol.js";
import {DivNeviSande} from "./components/nevisande/nevisande.js";
import {itemFooter} from "./components/menuFoter/footerMenu.js";
import {TemplateFooter} from "./js/footer.js";

customElements.define("majmoe-show", temp1);
customElements.define("category-show", temp2);
customElements.define("div-nevisande", DivNeviSande);
customElements.define("item-footer", itemFooter);

////////////////IsLogin

headerAndIsLogin("", JSON.parse(localStorage.getItem("mahsol")));
empityLocal();
////////////////// Swiper 1

let mySwiper1 = $.querySelector(".mySwiper1");
let swiper1 = mySwiper1.querySelector(".swiper-wrapper");
var swiper = new Swiper(mySwiper1, {
  slidesPerView: 1,
  spaceBetween: 10,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper1 .swiper-button-next",
    prevEl: ".swiper1 .swiper-button-prev",
  },
  breakpoints: {
    640: {slidesPerView: 1, spaceBetween: 20},
    768: {slidesPerView: 2, spaceBetween: 40},
    1024: {slidesPerView: 3, spaceBetween: 50},
  },
});

const CreateDivSwiper1 = (arr) => {
  let fragment = $.createDocumentFragment();
  arr.forEach(() => {
    let div = $.createElement("div");
    div.className = "swiper-slide py-2";
    div.innerHTML = `
             <div>
                <div class="bg-white p-14 shadow-lg" style="border-radius: 40px;">
                  <div class="text-xl">"بهترین. واقعاً خوب. ای کاش اول به آن فکر می کردم. فروشگاه اکسترا را به شما هم پیشنهاد می کنم."</div>
                  <p class="text-primary my-2">
                    سارا بهرامی
                    <span class="text-zinc-400">معلم</span>
                  </p>
                </div>
                <div style="margin-top: -40px" class="w-max rounded-full overflow-hidden mx-auto border-8 border-zinc-100">
                  <img src="./img/admin.png" class="w-20" alt="" />
                </div>
              </div>
    `;
    fragment.append(div);
  });
  swiper1.append(fragment);
};
CreateDivSwiper1([1, 11, 11, 1, 1, 1]);
let api = await fetch("https://bookshop-backend.liara.run/api/v1/books");
let arrBook = await api.json();
CreateDivMahsol(arrBook.slice(0, 8), document.querySelector(".product"), "", "relative overflow-hidden ");
TemplateFooter("");
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

//////////////

var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper2 .swiper-pagination",
    clickable: true,
  },
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  breakpoints: {640: {slidesPerView: 2}, 768: {slidesPerView: 3}, 1024: {slidesPerView: 4}},
});
CreateDivMahsol(arrBook.slice(0, 8), document.querySelector(".mySwiper2 .swiper-wrapper"), "", " swiper-slide overflow-hidden bg-transparent");

var swiper = new Swiper(".mySwiper3", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper3 .swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  breakpoints: {640: {slidesPerView: 2}, 768: {slidesPerView: 3}, 1024: {slidesPerView: 4}},
});
CreateDivMahsol(arrBook.slice(0, 8), document.querySelector(".mySwiper3 .swiper-wrapper"), "", " swiper-slide overflow-hidden bg-transparent", false);
import {containerProduct} from "./js/export.js";
let btnMahsol = document.querySelectorAll(".btnMahsol");

let arrMahsol = [];
arrMahsol = JSON.parse(localStorage.getItem("mahsol"));

let btnLove = document.querySelectorAll(".love");
let arrBookUser = [];
arrBookUser = JSON.parse(localStorage.getItem("love"));
btnMahsol.forEach((item) => (item.onclick = () => containerProduct(arrMahsol, item)));
btnLove.forEach((item) => {
  item.onclick = () => {
    addToLove(arrBookUser, item);
  };
});

///////////////////////////////////////
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
fastShow();
