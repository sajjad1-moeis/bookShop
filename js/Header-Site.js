const $ = document;
const Header = (dot, href, link) => {
  document.querySelector(".body").insertAdjacentHTML(
    "afterbegin",
    `
    <header class="pe-8 w-full relative ">
        <div class="hidden lg:grid grid-cols-4 gap-14">
          <div class="md:col-span-3" style="border-bottom-left-radius: 70px; box-shadow: 0px 13px 26px 0px rgba(12, 12, 12, 0.06)">
            <div class="flex p-5 py-8">
              <div class="me-8 p-2">
                <img src="${dot}./img/logo-book-shop.png" class="" alt="" />
              </div>
              <div class="flex gap-8 text-lg text-zinc-500">
                <div id="home" class="item-nav h-max m-auto flex-none active"><a href="${dot}./index.html" >صفحه اصلی</a></div>
                <div id="store" class="item-nav h-max m-auto"><a href="${dot}./html/store.html?id=store" >کتاب ها</a></div>
                <div class="hidden xl:flex gap-8">
                <div class="item-nav h-max m-auto  ">مجموعه<img class="w-3 ms-1 inline" src="${dot}./img/arrow.png" alt="" />
                <div class=" absolute w-max  majmoee maj">
                  <div class="bg-white py-10 container  w-max grid grid-cols-2 md:grid-cols-4 gap-4">
                  <header-majmoee bg="bg-warning" title="کتاب غار"></header-majmoee>
                  <header-majmoee bg="bg-warning" title="کتاب غار"></header-majmoee>
                  <header-majmoee bg="bg-warning" title="کتاب غار"></header-majmoee>
                  <header-majmoee bg="bg-warning" title="کتاب غار"></header-majmoee>
                  </div>
               </div>
                </div>
                <div class="item-nav h-max m-auto relative" id="pages">
                <div class=" absolute w-max pt-14">
                <div class="p-5 bg-primary text-white   hidden majmoee ">
                   <a href="#"><div class="pe-20 my-3">وبلاگ</div></a>
                   <a href="#"><div class="pe-20 my-3">درباره ما</div></a>
                   <a href="#"><div class="pe-20 my-3">سوالات متداول</div></a>
                </div>
                </div>
                صفحات<img class="w-3 ms-1 inline" src="${dot}./img/arrow.png" alt="" />
                </div>
                </div>
                <div class="item-nav h-max m-auto relative" id="category">
                <div class=" absolute w-max pt-14" style="z-index:11111">
                <div class="p-5 bg-primary text-white   hidden majmoee ">
                   <a href="#"><div class="pe-20 my-3">وبلاگ</div></a>
                   <a href="#"><div class="pe-20 my-3">درباره ما</div></a>
                   <a href="#"><div class="pe-20 my-3">سوالات متداول</div></a>
                </div>
                </div>
                دسته بندی<img class="w-3 ms-1 inline" src="${dot}./img/arrow.png" alt="" /></div>
                <div class="item-nav h-max m-auto z-[11111]" id="abutMe" >
                <a href="${dot}./html/abutMe.html?id=abutMe">
                درباره ما
                </a>
                </div>
              </div>
            </div>
          </div>
          <div class="md:col-span-1 py-8">
            <div class="flex m-auto h-max gap-5">
              <div class="basketBtn cursor-pointer my-auto p-0 xl:p-4 rounded-full border-[1px] border-zinc-200 relative">
                <div class="w-5 h-5 bottom-0 left-[-5px] text-white rounded-full bg-[#ff006f] absolute text-sm leading-6"><span class="mr-[7px]">1</span></div>

                <img src="${dot}./img/download.png" class="w-9" />
              </div>
              <div class="login m-auto  w-full h-full cursor-pointer bg-primary text-white rounded-full">
              <a href="${dot}${link}">  
              <div class="text-center w-max m-auto  p-4">
                  <img src="${dot}./img/user.png" class="my-auto w-7 h-7 inline" />
                  <span class="my-auto">${href}</span>
                </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>`
  );
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="hidden header-mobile w-full lg:hidden bg-white shadow-xl p-5  justify-between fixed" style="z-index: 55555">
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
      <a href="${dot}${link}">
        <div class="my-5 p-3 border-b-2 text-white border-white">
          <span class="my-auto">${href}</span>
        </div>
     </a>
     <a href="${dot}./html/store.html">
        <div class="my-5 p-3 border-b-2 text-white border-white">
          <span class="my-auto">کتاب ها</span>
       </div>
     </a>
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

function LodingSite(bg) {
  $.body.classList.remove("bg-primary");
  $.body.classList.add(bg);
  $.querySelector(".load").classList.add("hidden");
  $.querySelector("main").classList.remove("hidden");
  if ($.querySelector(".header-mobile")) {
    $.querySelector(".header-mobile").classList.replace("hidden", "flex");
  }
}

function ActiveItemNav() {
  document.querySelectorAll(".item-nav").forEach((item) => item.classList.remove("active"));
  let locationSite = location.search;
  let IdLocation = new URLSearchParams(locationSite);
  let SearchLocation = IdLocation.get("id");
  if (SearchLocation === null) {
    document.querySelector(`#home`).classList.add("active");
  } else {
    document.querySelector(`#${SearchLocation}`).classList.add("active");
  }
}

const headerAndIsLogin = (dot) => {
  fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {credentials: "include"})
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (data.login) {
        if (data.userdata.isAdmin) {
          Header(dot, "پنل مدیریت", "./html/panel-Admin.html");
        } else {
          Header(dot, "حساب کاربری", "./html/userPage.html");
        }
      } else {
        Header(dot, "ورود / ثبت نام", "./html/login.html");
      }
      DivScroll(dot);
      showMenuMobileBtn();
      closeMenuMobile();
      LodingSite("s");
      ActiveItemNav();
    })
    .catch((err) => {
      console.log(err);
    });
};

export {headerAndIsLogin, LodingSite};
