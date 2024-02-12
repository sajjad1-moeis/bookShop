const CreateDivsPanel = (arr) => {
  arr.forEach((item) => {
    document.querySelector(".panel").innerHTML += `
        
    <a href="${item.href}"><div class="p-5 cursor-pointer my-1 flex justify-between">${item.title}<img src="../img/arrow-left.png" alt="" class="w-5 h-5 my-auto" /></div></a>
        `;
  });
};
const moreDivCreatePanel = (arr, img) => {
  arr.forEach((item) => {
    if (document.querySelector(".more")) {
      document.querySelector(".more").innerHTML += `
             <div class="md:mx-auto flex p-4 rounded-lg">
                  <div class="bg-${item.color} p-3 rounded-full"><img src="${item.img}" alt="" class="w-10" /></div>
                  <div class=" h-max my-auto ms-5">${item.title} ${item.more1}</div>
                </div>`;
    }
    document.querySelector(".more2").innerHTML += `
           <div class="p-5 px-14 bg-${item.color} text-center text-3xl rounded-xl">
                  <div class="p-2 border-b-[1px] border-zinc-400 my-2">${item.title}</div>
                  <div class="my-4 text-2xl">${item.more2} <img class=" w-8 inline" src="${item.img}"></div>
                </div>
    `;
  });
};

export {CreateDivsPanel, moreDivCreatePanel};
