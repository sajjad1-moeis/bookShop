const TemplateFooter = (dot) => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <footer class="container">
      <div class="md:px-10 container mt-44 relative">
        <div class="w-full ozviat p-5 md:p-20">
          <div class="text-white px-4 rounded-full bg-[#27187e] p-2 w-max mx-auto">دریافت تخفیف</div>
          <h1 class="text-3xl md:text-5xl text-white mx-auto my-8 text-center">به ما بپیوندید</h1>
          <div class="gap-3 overflow-hidden max-w-[550px] mx-auto w-full p-1 bg-white rounded-full flex justify-between">
            <div class="w-full"><input placeholder="ارسال ایمیل" type="text" class="w-full h-full p-3 outline-none" required /></div>
            <div class="cursor-pointer bg-primary p-3 rounded-full flex w-max text-white ps-5 pe-9">
              <div class="h-max my-auto">عضویت</div>
              <img src="${dot}./img/search3.png" class="w-7 inline ms-2" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#f1f2f6] gap-7 px-5 md:px-20 pt-44 pb-20 footer grid grid-cols-2 md:grid-cols-4">
        <div>
          <div><img src="${dot}./img/logo-book-shop.png" alt="" /></div>
          <div class="my-8">"همان باشید که هستید و آنچه را که احساس می کنید بگویید ، زیرا کسانی که اهمیت می دهند اهمیتی ندارند ."</div>
          <span class="text-primary">برنارد</span>
        </div>
        <item-footer></item-footer>
        <item-footer></item-footer>
        <item-footer></item-footer>
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
