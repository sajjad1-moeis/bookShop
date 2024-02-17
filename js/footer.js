const TemplateFooter = (dot) => {
  document.querySelector("main").insertAdjacentHTML(
    "beforeend",
    `
    <footer class="max-w-[1550px] w-full mx-auto">
      <div class="px-5 md:px-20  mt-44 relative">
        <div class="w-full ozviat p-5 md:p-40">
          <div class="text-white px-4 rounded-full bg-[#27187e] p-2 w-max mx-auto md:text-balance text-sm flex-none">دریافت تخفیف</div>
          <h1 class="text-3xl md:text-5xl text-white mx-auto my-8 text-center">به ما بپیوندید</h1>
          <div class="gap-3 overflow-hidden max-w-[550px] mx-auto w-full p-1 md:bg-white md:rounded-full md:flex justify-between">
            <div class="w-full"><input placeholder="ارسال ایمیل" type="text" class="w-full rounded-lg h-full p-3 outline-none" required /></div>
            <div class="cursor-pointer bg-black md:bg-primary p-3 rounded-lg md:rounded-full flex w-full justify-center text-center md:w-max text-white md:ps-9 md:pe-7 md:mx-0 mx-auto my-3 md:my-0">
              <div class="h-max my-auto ">عضویت</div>
              <img src="${dot}./img/search3.png" class="w-7 inline ms-2" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#f1f2f6] gap-7 px-5 py-44 md:px-20   footer grid grid-cols-2 md:grid-cols-4">

      
        <div class="text-center">
          <div class="w-max mx-auto"><img src="${dot}./img/logo-book-shop.png" alt="" /></div>
          <div class="my-8">"همان باشید که هستید و آنچه را که احساس می کنید بگویید ، زیرا کسانی که اهمیت می دهند اهمیتی ندارند ."</div>
          <span class="text-primary">برنارد</span>
        </div>
        <item-footer tail="${dot}./css/tailwind.css" css="${dot}./css/style.css"></item-footer>
        <item-footer tail="${dot}./css/tailwind.css" css="${dot}./css/style.css"></item-footer>
        <item-footer tail="${dot}./css/tailwind.css" css="${dot}./css/style.css"></item-footer>
      </div>
      <div class="md:px-10">
        <div class="text-white bg-primary end-footer pt-12 pb-9 p-14 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div class="text-center h-max m-auto">example@gmail.com</div>
          <div class="text-center h-max m-auto">ساخت این سایت توسط طراح <span class="text-red-600">محفوظ </span>است</div>
          <div class="flex gap-2 mx-auto">
            <div class="p-2 rounded-full shadow-lg bg-white"><img src="${dot}./img/icons8-facebook-50.png" class="w-6" alt="" /></div>
            <div class="p-2 rounded-full shadow-lg bg-white"><img src="${dot}./img/icons8-facebook-50.png" class="w-6" alt="" /></div>
            <div class="p-2 rounded-full shadow-lg bg-white"><img src="${dot}./img/icons8-facebook-50.png" class="w-6" alt="" /></div>
          </div>
        </div>
      </div>
    </footer>
    `
  );
};
export {TemplateFooter};
