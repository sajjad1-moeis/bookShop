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
                  <div class="p-2 border-b-[1px] border-white my-2">${item.title}</div>
                  <div class="my-4 text-2xl">${item.more2} <img class=" w-8 inline" src="${item.img}"></div>
                </div>
    `;
  });
};

/////////////////////Check Login is Panel Admin And User
const CheckAuth = (href) => {
  console.log("object");
  fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {credentials: "include"})
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      if (res.login) {
        if (!res.userdata.isAdmin) {
          location.href = href;
        }
      } else {
        location.href = "../index.html";
      }
    })
    .catch((err) => {});
};

//// Set Name User

const setUiUser = (spanNameUser) => {
  fetch("https://bookshop-backend.liara.run/api/v1/userdata/mydata", {credentials: "include"})
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      spanNameUser.textContent = res.userdata.fullname;
    });
};

//////////////// Function logOut

const funcLogOut = (elm) => {
  let swalAlert = Swal.mixin({
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله و خروج",
    cancelButtonText: "خیر",
  });
  elm.onclick = () => {
    swalAlert
      .fire({
        title: "آیا مایلید خارج شوید ؟",
        icon: "warning",
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "با موفقیت خارج شدی",
            icon: "success",
          }).then(() => {
            fetch("https://bookshop-backend.liara.run/api/v1/logout", {credentials: "include"})
              .then((result) => {
                location.href = "../index.html";
                console.log(result);
              })
              .catch((err) => {});
          });
        }
      });
  };
};

export {CreateDivsPanel, moreDivCreatePanel, CheckAuth, setUiUser, funcLogOut};
