import {divNextHeader} from "../components/templatNextHeader/divNextHeader.js";
import {divCallMeTo} from "../components/templateCallToMe/tempCallToMe.js";
customElements.define("div-call-me", divCallMeTo);
customElements.define("div-next-header", divNextHeader);
let qustion = [
  {title: "عنوان سوال های شما ؟؟"},
  {title: "آیا ژانر کتاب ها یکسان است؟"},
  {title: "انواع ژانر کتاب ها را معرفی کنید؟"},
  {title: "انواع ژانر کتاب ها را معرفی کنید؟"},
  {title: "انواع ژانر کتاب ها را معرفی کنید؟"},
  {title: "عنوان سوال های شما ؟؟"},
  {title: "آیا ژانر کتاب ها یکسان است؟"},
];

function itemDiv(title) {
  return `<div class=" my-3 parentAccordian p-6 pb-1 w-full rounded-2xl border-[1px] border-zinc-200 cursor-pointer">
    <div class="flex  border-b-2 pb-5 border-white justify-between">
      <p class="text-lg md:text-xl">${title}</p>
      <img src="../img/double-black.png" class="w-5 h-5 my-auto" alt="" />
    </div>
    <div class="overflow-hidden text-lg   itemAccordian">
      البته لازم است توجه کنیم که هر کتاب می‌تواند در چند ژانر قرار بگیرد. در واقع نویسنده با ترکیب ژانرهای مختلف به گستردگی رمان خود و پیچیدگی شخصیت‌ها و رفتارهای
      آنان پرداخته است. همچنین باید گفت که دسته‌بندی مشخص و قطعی برای انواع ژانرهای کتاب وجود ندارد.
    </div>
  </div>`;
}

qustion.slice(0, 5).forEach((item) => {
  document.querySelector(".containerAccordian1").innerHTML += itemDiv(item.title);
});
qustion.slice(5, 7).forEach((item) => {
  document.querySelector(".containerAccordian2").innerHTML += itemDiv(item.title);
});

document.querySelectorAll(".parentAccordian").forEach((divAcord) => {
  divAcord.onclick = () => {
    let itemAcordian = divAcord.querySelector(".itemAccordian");
    divAcord.classList.toggle("show");
    itemAcordian.classList.toggle("showAcord");
    let height = itemAcordian.scrollHeight;
    if (divAcord.className.includes("show")) {
      itemAcordian.style.height = `${height}px`;
      divAcord.querySelector("img").src = "../img/double-white.png";
    } else {
      itemAcordian.style.height = `0px`;
      divAcord.querySelector("img").src = "../img/double-black.png";
    }
  };
});
