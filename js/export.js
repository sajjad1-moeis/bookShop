const CreateDivsPanel = (arr, count) => {
  arr.forEach((item) => {
    document.querySelector(".panel").innerHTML += `
        
    <a href="${item.href}">
    <div class="p-5 cursor-pointer my-1 flex justify-between relative">
      <div class="p-1 ${count > 0 ? "" : "hidden"} ${count > 9 ? "px-2" : "px-2.5"} text-sm  rounded-full bg-danger absolute top-3 right-1/4 ${
      item.notification ? "" : "hidden"
    }"><span class="" id="countTicket">${count}</span></div>
       ${item.title}<img src="../img/arrow-left.png" alt="" class="w-5 h-5 my-auto" />
      </div>
    </a>
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
                  <div class="p-2 border-b-[1px] border-white my-2 item">${item.title}</div>
                  <div class="my-4 text-2xl">${item.more2} <img class=" w-8 inline" src="${item.img}"></div>
                </div>
    `;
  });
};

/////////////////////Check Login is Panel Admin And User

const CheckAuth = (href) => {
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

import {countBasket} from "./Header-Site.js";

function containerProduct(arrMahsol, btn) {
  let idMahsol = btn.dataset.num;
  fetch(`https://bookshop-backend.liara.run/api/v1/books/${idMahsol}`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((data) => {
      addTobascket(data, arrMahsol);
    })
    .catch((err) => {});
}

function setlocal(arr) {
  localStorage.setItem("mahsol", JSON.stringify(arr));
}

function addTobascket(respons, arrMahsol) {
  var Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,

    showClass: {
      popup: `
        animate__animated
        animate__bounceInRight
        animate__faster
      `,
    },
    hideClass: {
      popup: `
        animate__animated
        animate__bounceOutRight
        animate__faster
      `,
    },
    color: "#fff",
    background: "#198754",
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  fetch(`https://bookshop-backend.liara.run/api/v1/books`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((arr) => {
      let newProduct = {
        id: respons.foundBook._id,
        name: respons.foundBook.name,
        price: respons.foundBook.price,
        img: respons.foundBook.imagePath,
        count: 1,
      };
      let someLocal = arrMahsol.some((item) => item.id === newProduct.id);
      if (someLocal) {
        let findIndexLocal = arrMahsol.findIndex((item) => item.id === newProduct.id);
        arrMahsol[findIndexLocal].count++;
      } else {
        arrMahsol.push(newProduct);
      }
      countBasket(arrMahsol);
      setlocal(arrMahsol);
      Toast.fire({title: "با موفقیت به سبد خرید اضافه شد", icon: "success"});
    });
}

function addToLove(arrBookUser, btn) {
  var Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,

    showClass: {
      popup: `
        animate__animated
        animate__bounceInRight
        animate__faster
      `,
    },
    hideClass: {
      popup: `
        animate__animated
        animate__bounceOutRight
        animate__faster
      `,
    },
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  let idMahsol = btn.parentElement.dataset.num;
  console.log(idMahsol);
  fetch(`https://bookshop-backend.liara.run/api/v1/books/${idMahsol}`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((mahsol) => {
      let localLove = JSON.parse(localStorage.getItem("love"));
      let some = arrBookUser.some((item) => item._id === mahsol.foundBook._id);

      if (!some) {
        arrBookUser.push(mahsol.foundBook);
        localStorage.setItem("love", JSON.stringify(arrBookUser));
        console.log(localLove);
        Toast.fire({title: "به علاقه مندی ها  اضافه شد", icon: "success", background: "#198754", color: "#fff"});
      } else {
        Toast.fire({title: "در علاقه مندی وجود دارد", icon: "warning", background: "#fff", color: "#000"});
      }
    })
    .catch((err) => {});
}

const empityLocal = () => {
  let localMahsol = JSON.parse(localStorage.getItem("mahsol"));
  localMahsol === null ? localStorage.setItem("mahsol", JSON.stringify([])) : undefined;
  let localLove = JSON.parse(localStorage.getItem("love"));
  localLove === null ? localStorage.setItem("love", JSON.stringify([])) : undefined;
};
export {CreateDivsPanel, moreDivCreatePanel, CheckAuth, setUiUser, funcLogOut, containerProduct, empityLocal, addToLove};
