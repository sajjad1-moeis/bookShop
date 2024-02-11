const $ = document;
const Header = (dot) => {
  document.querySelector(".body").insertAdjacentHTML(
    "afterbegin",
    `
    <header class="pe-8 w-full">
        <div class="hidden lg:grid grid-cols-4 gap-14">
          <div class="md:col-span-3" style="border-bottom-left-radius: 70px; box-shadow: 0px 13px 26px 0px rgba(12, 12, 12, 0.06)">
            <div class="flex p-5 py-8">
              <div class="me-8 p-2">
                <img src="${dot}./img/logo-book-shop.png" class="" alt="" />
              </div>
              <div class="flex gap-8 text-lg text-zinc-500">
                <div class="item-nav h-max m-auto flex-none active"><a href="${dot}./index.html">صفحه اصلی</a></div>
                <div class="item-nav h-max m-auto">کتاب ها</div>
                <div class="item-nav h-max m-auto">مجموعه<img class="w-3 ms-1 inline" src="${dot}./img/arrow.png" alt="" /></div>
                <div class="item-nav h-max m-auto">دسته بندی<img class="w-3 ms-1 inline" src="${dot}./img/arrow.png" alt="" /></div>
                <div class="item-nav h-max m-auto">صفحات<img class="w-3 ms-1 inline" src="${dot}./img/arrow.png" alt="" /></div>
                <div class="item-nav h-max m-auto">درباره ما</div>
              </div>
            </div>
          </div>
          <div class="md:col-span-1 py-8">
            <div class="flex m-auto h-max gap-5">
              <div class="basketBtn cursor-pointer my-auto p-0 xl:p-4 rounded-full border-[1px] border-zinc-200 relative">
                <div class="w-5 h-5 bottom-0 left-[-5px] text-white rounded-full bg-[#ff006f] absolute text-sm leading-6"><span class="mr-[7px]">1</span></div>

                <img src="${dot}./img/download.png" class="w-9" />
              </div>
              <div class="login m-auto p-4 w-full h-full cursor-pointer bg-primary text-white rounded-full">
                <div class="text-center w-max m-auto pe-2">
                  <img src="${dot}./img/user.png" class="my-auto w-7 h-7 inline" />
                  <span class="my-auto">ورود / ثبت نام</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>`
  );
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    
    <div class="header-mobile w-full lg:hidden bg-white shadow-xl p-5 flex justify-between fixed" style="z-index: 55555">
  <div><img src="${dot}./img/logo-book-shop.png" class="w-28" alt="" /></div>
  <div class="flex gap-1">
    <div class="cursor-pointer p-3 rounded-full bg-primary"><img src="${dot}./img/book-header.png" class="w-6" alt="" /></div>
    <div class="cursor-pointer p-3 rounded-full bg-primary showMenuMobile"><img src="${dot}./img/menu-svgrepo-com (1).svg" class="w-6" alt="" /></div>
  </div>
</div>
<div class="lg:hidden block max-w-[300px] w-full p-5 fixed h-[100vh] bg-primary left-0 menu-mobile">
      <div class="flex justify-between text-white">
        <div class="text-xl h-max my-auto">منوها</div>
        <div class="closeBtnMenuMobile"><img src="${dot}./img/close-icon.png" alt="" class="w-8" /></div>
      </div>
    </div>
`
  );
};

const DivScroll = (dot) => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
  <div id="scrollTop" class="cursor-pointer bg-white rounded-full fixed"><img class="w-14" src="${dot}./img/icons8-arrow-50.png" alt="" /></div>
  `
  );
  let btnScrollTop = $.getElementById("scrollTop");
  window.onscroll = () => {
    if (window.scrollY > 50) {
      btnScrollTop.style.cssText = "bottom:50px;";
    } else {
      btnScrollTop.style.cssText = "bottom:-70px;";
    }
  };
  btnScrollTop.onclick = () => {
    window.scrollTo(0, 0);
  };
};

function removeClass(elm, clas) {
  $.querySelector(`${elm}`).classList.remove(`${clas}`);
}
const showMenuMobileBtn = () => {
  $.querySelector(".showMenuMobile").onclick = () => {
    $.querySelector(".menu-mobile").classList.toggle("showMenu");
    $.querySelector("main").classList.toggle("showMain");
    $.querySelector(".header-mobile").classList.toggle("showMain");
  };
};
function a() {
  removeClass(".header-mobile", "showMain");
  removeClass("main", "showMain");
  removeClass(".menu-mobile", "showMenu");
}

/////////////CloseMenuMobile

const closeMenuMobile = () => {
  document.querySelector(".header-mobile").onclick = (e) => {
    let Elm = e.target.tagName;
    if (Elm === "DIV") {
      if (!e.target.className.includes("showMenuMobile")) {
        a();
      }
    } else {
      if (!e.target.parentElement.className.includes("showMenuMobile")) {
        a();
      }
    }
  };
  document.querySelector("main").onclick = a;
  $.querySelector(".closeBtnMenuMobile").onclick = a;
};
export {Header, DivScroll, showMenuMobileBtn, closeMenuMobile};
