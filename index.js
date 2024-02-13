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

////////////////IsLogin

const IsLogin = () => {
  fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {credentials: "include"})
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (data.login) {
        console.log(data);
        if (data.userdata.isAdmin) {
          Header("", "پنل مدیریت", "./html/Panel-Admin.html");
        } else {
          Header("", "حساب کاربری", "./html/userPage.html");
        }
      } else {
        Header("", "ورود / ثبت نام", "./html/login.html");
      }
      DivScroll("");
      showMenuMobileBtn();
      closeMenuMobile();
      TemplateFooter("");
      LodingSite();
    })
    .catch((err) => {
      console.log(err);
    });
};
IsLogin();

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
  arr.forEach(() => {
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
CreateDivSwiper1([1, 11, 11, 1, 1, 1]);
let api = await fetch("https://bookshop-backend.liara.run/api/v1/books");
let arrBook = await api.json();
console.log(arrBook);
CreateDivMahsol(arrBook.slice(0, 8), document.querySelector(".product"), "");
function LodingSite() {
  $.body.classList.remove("bg-primary");
  $.querySelector(".load").classList.add("hidden");
  $.querySelector("main").classList.remove("hidden");
  $.querySelector(".header-mobile").classList.replace("hidden", "flex");
}
