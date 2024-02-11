const CreateDivMahsol = (arr, parent, dot) => {
  let fragment = document.createDocumentFragment();
  arr.forEach((item) => {
    let div = document.createElement("div");
    div.className = "relative overflow-hidden ";
    div.innerHTML = `
    <div data-num="${item._id}"> 
              <div class="bg-white p-6 px-8 py-8" style="border-radius: 40px">
                <div class="item-mahsol relative overflow-hidden border-b-[1px] border-zinc-300">
                  <div  class="hoverLeft bg-primary absolute h-max p-2 rounded-full">
                    <div id="love" class="cursor-pointer rounded-full"><img src="${dot}./img/heart-svgrepo-com (8).svg" class="md:w-5 w-7 mx-auto my-2" alt="" /></div>
                    <div id="moghaiese" class="cursor-pointer rounded-full"><img src="${dot}./img/compare.png" class="md:w-6 w-8 my-3" alt="" /></div>
                    <div id="search" class="cursor-pointer rounded-full"><img src="${dot}./img/search3.png" class="md:w-5 w-7 mx-auto my-2" alt="" /></div>
                  </div>

                  <img src="https://book-shop-back-end-one.vercel.app${item.imagePath}" alt="" />
                </div>
                <div class="my-6 text-3xl">${item.name}</div>
                <div class="w-full flex justify-between my-3">
                  <div class="my-auto h-max"><img src="./img/star.png" alt="" /></div>
                  <div class="text-xl">${item.price} تومان</div>
                </div>
              </div>
              <div style="margin-top: -20px" class="btnMahsol cursor-pointer mx-auto p-3 px-6 w-max rounded-full bg-primary text-white flex" >
                <div class="h-max"><img src="./img/shop.png" class="w-6 inline me-2" alt="" />افزودن به سبد خرید</div>
              </div>
            </div>
    `;
    fragment.append(div);
  });
  parent.append(fragment);
};
export {CreateDivMahsol};
