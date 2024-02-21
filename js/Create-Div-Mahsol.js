const CreateDivMahsol = (arr, parent, dot, clas, current, arr2) => {
  let createFragment = document.createDocumentFragment();
  parent.innerHTML = "";
  arr.forEach((item) => {
    let div = document.createElement("div");
    div.className = clas;
    div.innerHTML = `
      <div class="containerProduct relative" data-num="${item._id}"> 
      <div class="deleteLove absolute ${current ? "block" : "hidden"} w-6 h-6 rounded-full overflow-hidden cursor-pointer left-5 top-5"><img src="${dot}./img/close-red.png"></div>
              <div class="bg-white p-6 px-8 py-8 border-[1px] border-zinc-200" style="border-radius: 40px">
                <div class="item-mahsol relative overflow-hidden border-b-[1px] border-zinc-300  ">
                  <div  class="hoverLeft bg-primary absolute h-max p-2 rounded-full ${current ? "hidden" : "block"}" data-num="${item._id}">
                    <div id="love" class="cursor-pointer rounded-full love"><img src="${dot}./img/heart-svgrepo-com (8).svg" class="md:w-5 w-7 mx-auto my-2" alt="" /></div>
                    <div id="moghaiese" class="cursor-pointer rounded-full"><img src="${dot}./img/compare.png" class="md:w-6 w-8 my-3" alt="" /></div>
                    <div id="search" class="cursor-pointer rounded-full fastShow"><img src="${dot}./img/search3.png" class="md:w-5 w-7 mx-auto my-2" alt="" /></div>
                  </div>

                  <img src="https://bookshop-backend.liara.run${item.imagePath}" alt="" class="my-5 w-full h-full object-cover max-h-[305px]" />
                </div>
                <div class="my-6 md:text-xl text-center h-[28px]">${item.name}</div>
                <div class="w-full block lg:flex justify-between my-3">
                <div class="text-xl text-center">${item.price.toLocaleString()} تومان</div>
                  <div class="my-auto h-max "><img class="mx-auto my-2" src="${dot}./img/star.png" alt="" /></div>
                </div>
              </div>
              <div data-num="${item._id}" style="margin-top: -20px" class="flex btnMahsol cursor-pointer mx-auto p-3 px-6 w-max rounded-full bg-primary text-white " >
                <div class="h-max flex"><img src="${dot}./img/shop.png" class="w-6 inline me-2" alt="" />افزودن به سبد خرید</div>
              </div>
            </div>
    `;
    createFragment.append(div);
  });
  parent.append(createFragment);

  document.querySelectorAll(".deleteLove").forEach((btn) => {
    btn.onclick = () => {
      if (arr2) {
        let id = btn.parentElement.dataset.num;
        let find = arr2.findIndex((item) => item._id === id);
        arr2.splice(find, 1);
        localStorage.setItem("love", JSON.stringify(arr2));
        CreateDivMahsol(arr2, document.getElementById("userLove"), ".", "", true, arr2);
        if (arr2.length < 1) {
          document.getElementById("loveDiv").textContent = "محصولی در علاقه مندی شما وجود ندارد ...";
        }
      }
    };
  });
};
export {CreateDivMahsol};
