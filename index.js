const $ = document;

//////////////////////// import All

import {Header, DivScroll, showMenuMobileBtn, closeMenuMobile} from "./js/Header-Site.js";
import {temp2, temp1} from "./components/temp1/temp1.js";
import {CreateDivMahsol} from "./js/Create-Div-Mahsol.js";
import {DivNeviSande} from "./components/nevisande/nevisande.js";
import {itemFooter} from "./components/menuFoter/footerMenu.js";
import {TemplateFooter} from "./js/footer.js";
customElements.define("majmoe-show", temp1);
customElements.define("category-show", temp2);
customElements.define("div-nevisande", DivNeviSande);
customElements.define("item-footer", itemFooter);
(() => {
  Header("");
  DivScroll("");
  showMenuMobileBtn();
  closeMenuMobile();
  TemplateFooter("");
})();
// let api = await fetch("http://localhost:3000/api/v1/book");
// let res = await api.json();
// console.log(res);

CreateDivMahsol([1, 5, 5, 2, 3, 6, 6, 5], document.querySelector(".product"), "");

///////////////// PopUp

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
  arr.forEach((element) => {
    let div = $.createElement("div");
    div.className = "swiper-slide py-2";
    div.innerHTML = `
             <div>
                <div class="bg-white p-14" style="border-radius: 40px; box-shadow: -1px 5px 14px 0px rgba(12, 12, 12, 0.06)">
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
CreateDivSwiper1([1, 1, 1, 1]);
