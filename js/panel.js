const $ = document;
import {CreateDivsPanel, moreDivCreatePanel, CheckAuth, funcLogOut} from "./export.js";
import {LodingSite} from "./Header-Site.js";
let div = [
  {notification: false, title: "پیشخوان", href: "../html/panelAdmin.html?id=pishkhan"},
  {notification: false, title: "محصول", href: "../html/panelAdmin.html?id=mahsol"},
  {notification: true, title: "تیکت ها ", href: "../html/panelAdmin.html?id=ticket"},
  {notification: false, title: "کاربران ", href: "../html/panelAdmin.html?id=Users"},
  {notification: false, title: "صفحه اصلی ", href: "../index.html"},
  {notification: false, title: "تنظیمات ", href: "../html/panelAdmin.html?id=settings"},
  {notification: false, title: "خروج ", href: "#"},
];
let imgDiv = [
  {img: "../img/icons8-gmail-50.png", title: "50", more1: "تیکت", color: "blue-500", more2: "بازدید سایت"},
  {img: "../img/icons8-file-50.png", title: "0", more1: "مقاله", color: "danger", more2: "ثبت نام کاربر"},
  {img: "../img/icons8-users-50.png", title: "5056", more1: "کاربر", color: "success", more2: "فروش محصولات"},
  {img: "../img/icons8-book-50.png", title: "10", more1: "محصول", color: "warning", more2: "معاملات"},
];

////////////////Chart
const SwalAler = (title, icon) => {
  Swal.fire({
    title: title,
    icon: icon,
  });
};

const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["شنبه", "یکشنبه", "دو شنبه", "سه شنبه", "چهار شنبه"],
    datasets: [
      {
        label: "تیکت ها",
        data: [18, 25, 32, 25, 36, 55, 5, 11, 27, 88],
        borderColor: "#36A2EB",
        backgroundColor: "#0d6efd",
        barPercentage: 0.4,
      },
      {
        label: "کاربران",
        data: [3, 30, 16, 30, 16, 36, 21, 40, 20, 30],
        borderColor: "#36A2EB",
        backgroundColor: "#198754",
        barPercentage: 0.4,
      },
      {
        label: "محصولات",
        data: [32, 12, 42, 25, 76, 32, 23, 18, 15, 99],
        borderColor: "#36A2EB",
        backgroundColor: "#fbbc34",
        barPercentage: 0.4,
      },
      {
        label: "مقاله",
        data: [12, 22, 32, 55, 56, 42, 33, 11, 25, 42],
        borderColor: "#FF6384",
        backgroundColor: "#dc3545",
        barPercentage: 0.4,
      },
    ],
  },
  options: {
    layout: {
      padding: 40,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

////////////////// Btn LogOut

////// ShowDivPanel

const ShowDivPanelUrl = () => {
  let locationSite = location.search;
  let IdLocation = new URLSearchParams(locationSite);
  let SearchLocation = IdLocation.get("id");
  if (SearchLocation) {
    let Div = document.querySelector(`#${SearchLocation}`);
    let divPanel = document.querySelectorAll(".divPanel");
    divPanel.forEach((div) => div.classList.add("hidden"));
    Div.classList.remove("hidden");
  } else {
    document.querySelector("#pishkhan").classList.remove("hidden");
  }
};
ShowDivPanelUrl();

/////////////////////////
// ShowAllTikcet///

let userId = null;
let userTicket = null;
const ShowAllTikcet = () => {
  let containerTicket = document.querySelector(".ticketsDiv");
  fetch(`https://bookshop-backend.liara.run/api/v1/ticket`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((data) => {
      containerTicket.innerHTML = "";
      data.tickets.forEach((item) => {
        containerTicket.innerHTML += `<div class="my-4 itemTicket ${item.status ? "" : "notTicket"}">
        <div class="my-3 p-8 rounded-lg bg-[#313348] block md:flex justify-between">
          <div class="h-max my-auto">${item.seen ? "تیکت پاسخ داده شده" : "تیکت جدید"}</div>
          <div class="flex my-2 gap-2" data-user="${item.creator}" data-ticket="${item._id}">
            <div class="text-sm p-2 cursor-pointer bg-success rounded answerTicket">${item.seen ? "مشاهده تیکت" : "جواب دادن به تیکت"}  </div>
            <div class="text-sm p-2 cursor-pointer bg-danger rounded ${item.status ? "deleteTicket" : ""}">${item.status ? "بستن تیکت" : "بسته شده"}</div>
          </div>
        </div>
      </div>`;
      });
      let itemTicketAll = document.querySelectorAll(".answerTicket");
      let deleteTicket = document.querySelectorAll(".deleteTicket");
      itemTicketAll.forEach((btn) => {
        btn.onclick = () => {
          userId = btn.parentElement.dataset.user;
          userTicket = btn.parentElement.dataset.ticket;
          showContainerTicket(userId, userTicket);
          console.log();
        };
      });

      deleteTicket.forEach((btn) => {
        btn.onclick = () => {
          fetch(` https://bookshop-backend.liara.run/api/v1/ticket/${btn.parentElement.dataset.ticket}/close`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
          })
            .then((result) => result.json())
            .then((data) => {
              console.log(data);
              ShowAllTikcet();
            })
            .catch((err) => {
              SwalAler("دوباره تلاش کنید", "error");
            });
        };
      });

      window.filterSinData = data.tickets.filter((item) => item.seen === false);
    })
    .catch((err) => {
      SwalAler("دوباره تلاش کنید", "error");
    });
};
ShowAllTikcet();

/////////// Show Ticket

const containerChatUserAndAdmin = document.querySelector(".containerChatUserAndAdmin");
const categoryTicket = document.querySelector(".categoryTicket");
const subjectTicket = document.querySelector(".subjectTicket");
const divInputTicket = $.querySelector(".divInputTicket");

const showContainerTicket = (useId, userTicket) => {
  console.log(useId);
  fetch(`https://bookshop-backend.liara.run/api/v1/userdata/${useId}`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".divNewTextTicket").classList.remove("hidden");
      document.querySelector(".titleDivNewTextTicket").textContent = `  ${data.fullname}  `;
      fetch(`https://bookshop-backend.liara.run/api/v1/ticket/${userTicket}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result.ticket.status);
          result.ticket.status ? divInputTicket.classList.remove("hidden") : divInputTicket.classList.add("hidden");
          subjectTicket.textContent = result.ticket.subject;
          categoryTicket.textContent = result.ticket.title;
          containerChatUserAndAdmin.innerHTML = "";
          console.log(result.messages);
          result.messages.forEach((item) => {
            let date = new Date(item.sendTime).toLocaleString("fa-IR");
            let time = date.split(",");
            containerChatUserAndAdmin.innerHTML += `
                <div class="${item.isAdminMessage ? "divAdminChat" : "divUserChat"}  text-base">
                      <div class="first max-w-[900px] w-full p-4 py-6 rounded-xl">
                        <div class="my-4"  >
                          <div class="text-lg"> ${item.isAdminMessage ? "admin" : data.fullname}</div>
                          <div>${time[1].slice(0, 5)}    ${time[0]}  </div>
                        </div>
                       ${item.content} </div>
                    </div>
            `;
          });
        })
        .catch((err) => {
          SwalAler("دوباره تلاش کنید", "error");
        });
    })
    .catch((err) => {
      SwalAler("دوباره تلاش کنید", "error");
    });
};

////////////// close Ticket BTN

const closeDivChat = document.querySelector(".closeDivChat");

closeDivChat.onclick = () => {
  document.querySelector(".divNewTextTicket").classList.add("hidden");
};

/////////////////////// sendAnswerTicket

const sendAnswerTicketBtn = document.querySelector(".sendAnswerTicket");
const inputNewTextTicket = document.querySelector(".inputNewTextTicket");

sendAnswerTicketBtn.onclick = () => {
  console.log(userTicket);
  if (inputNewTextTicket.value) {
    fetch(`https://bookshop-backend.liara.run/api/v1/ticket/${userTicket}`, {
      method: "PUT",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: inputNewTextTicket.value}),
    })
      .then((result) => result.json())
      .then(() => {
        showContainerTicket(userId, userTicket);
        ShowAllTikcet();
        inputNewTextTicket.value = "";
      })
      .catch((err) => {
        SwalAler("دوباره تلاش کنید", "error");
      });
  }
};

//////////////////////////////////////////// product Item

const containerMahsol = $.querySelector(".containerMahsol");

const getAllProduct = () => {
  fetch(`https://bookshop-backend.liara.run/api/v1/books`)
    .then((result) => result.json())
    .then((data) => {
      containerMahsol.innerHTML = "";
      data.forEach((item) => {
        containerMahsol.innerHTML += `
          <div class="p-5 my-4 bg-[#313348] rounded-xl block md:flex justify-between px-10">
                  <div class=" md:flex gap-6">
                    <div class="w-max m-auto">
                    <img src="https://bookshop-backend.liara.run${item.imagePath}" class="rounded-full h-32 w-32 object-cover" alt="" />
                    </div>
                  <div class="h-max md:my-auto md:text-right  text-center my-5">
                      <div class="my-3 text-white text-xl">
                        <span class="text-zinc-300 text-base">محصول :</span>
                        <span class="ms-2">${item.name}</span>
                      </div>
                      <div class="my-3 text-white text-xl">
                        <span class="text-zinc-300 text-base">قیمت :</span>
                        <span class="ms-2">${item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex h-max my-auto gap-3" data-id="${item._id}">
                    <div class="editProduct my-2 text-center cursor-pointer p-4 text-lg text-white rounded  bg-warning">ادیت محصول</div>
                    <div class="deleteProduct my-2 text-center cursor-pointer p-4 text-lg text-white rounded bg-danger">حذف محصول</div>
                  </div>
                </div>`;
      });
      $.querySelectorAll(".editProduct").forEach((btn) => {
        btn.onclick = () => {
          let id = btn.parentElement.dataset.id;
          EditProduct(id);
        };
      });
      $.querySelectorAll(".deleteProduct").forEach((btn) => {
        btn.onclick = () => {
          let id = btn.parentElement.dataset.id;
          DeleteProduct(id);
        };
      });
    })
    .catch((err) => {
      SwalAler("دوباره تلاش کنید", "error");
    });
};

//////////////////EditProduct

const inputMahsolAll = $.querySelectorAll(".input-mahsol");

const EditProduct = (id) => {
  showModal("updateMahsol");
  window.idBook = id;
};

$.querySelector("#updateMahsol").onclick = () => {
  postMahsol("PUT", idBook);
};
//////////////////DeleteProduct
const Toast = Swal.mixin({
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "بله و خروج",
  cancelButtonText: "خیر",
});

const DeleteProduct = (id) => {
  Toast.fire({title: "آیا مایلید حذف کنید ؟", icon: "warning"}).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "با موفقیت حذف شد",
        icon: "success",
      }).then(() => {
        fetch("https://bookshop-backend.liara.run/api/v1/books", {
          method: "DELETE",
          credentials: "include",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({id: id}),
        })
          .then((result) => result.json())
          .then(() => {
            getAllProduct();
          })
          .catch((err) => {
            SwalAler("دوباره تلاش کنید", "error");
          });
      });
    }
  });
};

getAllProduct();

////////////////////Show modal
const addProduct = $.querySelector(".addProduct");
const modalTiket = $.querySelector(".modalTiket");
const btnAddOrUpdate = $.querySelectorAll(".btnAddOrUpdate .bg-primary");

const showModal = (btn) => {
  btnAddOrUpdate.forEach((btn) => btn.classList.add("hidden"));
  modalTiket.style.cssText = "top: 0%;transform: translate(0,0%)";
  $.querySelector("main").style.cssText = "filter: brightness(0.5)";
  $.querySelector(`#${btn}`).classList.remove("hidden");
};

// updateMahsol;
const closeModal = () => {
  modalTiket.style.cssText = "top: -100%;transform: translate(0,-60%)";
  $.querySelector("main").style.cssText = "filter: none";
};

$.querySelector("main").onclick = (e) => {
  let btn = e.target.className;
  if (!(btn.includes("editProduct") || btn.includes("addProduct"))) {
    closeModal();
  }
};

addProduct.onclick = () => {
  showModal("postMahsol");
};
const closeModalMahsol = $.querySelector(".closeModalMahsol");
closeModalMahsol.onclick = closeModal;

///////////////////// Post Mahsol

const postMahsolBtn = $.querySelector("#postMahsol");
const inputImgMahsol = $.querySelector(".input-img-mahsol");

const postMahsol = (metod, idImg) => {
  let sum = 0;
  inputMahsolAll.forEach((item) => (item.value ? sum++ : sum));
  if (sum >= 3 && inputImgMahsol.value) {
    console.log(sum);
    console.log(inputImgMahsol.value);
    if (isNaN(inputMahsolAll[1].value)) {
      console.log("nan");
      $.querySelector(".errorTiketSpan").textContent = "لطفا برای قیمت عدد وارد کنید";
    } else if (isNaN(inputMahsolAll[2].value)) {
      console.log("nan");
      $.querySelector(".errorTiketSpan").textContent = "لطفا برای تخفیف عدد وارد کنید";
    } else {
      $.querySelector(".errorTiketSpan").textContent = "";
      console.log($.querySelector(".errorTiketSpan"));
      let data = null;
      if (metod === "POST") {
        const formData = new FormData();
        formData.append("image", inputImgMahsol.files[0]);
        formData.append("name", inputMahsolAll[0].value);
        formData.append("price", Number(inputMahsolAll[1].value));
        formData.append("offer", inputMahsolAll[2].value);
        formData.append("filter", inputMahsolAll[3].value);
        data = formData;
      } else {
        data = JSON.stringify({
          name: inputMahsolAll[0].value,
          price: Number(inputMahsolAll[1].value),
          offer: inputMahsolAll[2].value,
          filter: inputMahsolAll[3].value,
          id: idImg,
        });
      }
      fetch("https://bookshop-backend.liara.run/api/v1/books", {
        method: metod,
        credentials: "include",
        headers: metod === "PUT" ? {"Content-Type": "application/json"} : undefined,
        body: data,
      })
        .then((result) => result.json())
        .then(async (data) => {
          if (metod === "PUT" && inputImgMahsol.value) {
            await new Promise((resole) => {
              let form = new FormData();
              form.append("image", inputImgMahsol.files[0]);
              form.append("id", idImg);
              fetch("https://bookshop-backend.liara.run/api/v1/books/newImage", {
                method: "POST",
                credentials: "include",
                body: form,
              }).then(resole);
            });
          }
          getAllProduct();
          closeModal();
          inputMahsolAll.forEach((item) => (item.value = ""));
        })
        .catch((err) => {
          SwalAler("دوباره تلاش کنید", "error");
        });
    }
  }
};

postMahsolBtn.onclick = () => {
  postMahsol("POST");
};

///////////////// Get All Users

const DivUsers = $.querySelector(".containerUSers");
const divAdmin = $.querySelector(".divAdmin");
const tempate = `<div class="w-full text-xl md:text-2xl text-center my-10">کاربری وجود ندارد ...</div>`;
const divBtnPageItem = $.querySelector(".divBtnPageItem");
const getUsers = () => {
  fetch(`https://bookshop-backend.liara.run/api/v1/userdata/getUsers`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((data) => {
      let filterUser = data.users.filter((item) => item.isAdmin !== true);
      let filterAdmin = data.users.filter((item) => item.isAdmin !== false);

      filterUser == "" ? (DivUsers.innerHTML = tempate) : pagination(filterUser, DivUsers, divBtnPageItem);
      filterAdmin == "" ? (DivUsers.innerHTML = tempate) : pagination(filterAdmin, divAdmin, $.querySelector(".divBtnPageAdmin"));
      divBtnPageItem.parentElement.classList.remove("hidden");
      LodingSite("bg-[#232434]");
    })
    .catch((err) => {});
};
getUsers();

/////////////////// pagition

let page = 1;
let currentMahsol = 10;
function pagination(arr1, parent, parentBtn) {
  let Btn1 = Math.ceil(arr1.length / 10);
  let end = page * currentMahsol;
  let start = end - currentMahsol;
  let slice = arr1.slice(start, end);
  if (slice == "") {
    page--;
    end = page * currentMahsol;
    start = end - currentMahsol;
    slice = arr1.slice(start, end);
  } else {
    parent.innerHTML = "";
    parentBtn.innerHTML = "";
    slice.forEach((user) => {
      parent.innerHTML += ItemDivUserAndAdmin(user.email, user._id, user.isAdmin);
    });
    for (let i = 1; i < Btn1 + 1; i++) {
      parentBtn.innerHTML += `
    <div class="w-8 h-8 rounded-full itemPage cursor-pointer bg-blue-500"><div class="h-max w-max my-1.5 mx-auto">${i}</div></div>
    `;
    }
    parentBtn.querySelectorAll(".itemPage").forEach((btn) => {
      btn.onclick = () => {
        console.log("object");
        page = btn.textContent;
        pagination(arr1, parent, parentBtn);
      };
    });

    $.querySelectorAll(".addAdmin").forEach((btn) => {
      btn.onclick = () => {
        let id = btn.parentElement.dataset.id;
        userToAdmin("setUserAdmin", id);
      };
    });
    $.querySelectorAll(".closeAdmin").forEach((btn) => {
      btn.onclick = () => {
        let id = btn.parentElement.dataset.id;
        userToAdmin("setAdminAsUser", id);
      };
    });

    $.querySelectorAll(".deleteUser").forEach((btn) => {
      btn.onclick = () => {
        let id = btn.parentElement.dataset.id;
        //////////
        Toast.fire({title: "آیا مایلید حذف کنید ؟", icon: "warning"}).then((result) => {
          if (result.isConfirmed) {
            console.log(btn.parentElement.dataset.id);
            Swal.fire({
              title: "با موفقیت حذف شد",
              icon: "success",
            }).then(() => {
              fetch(`https://bookshop-backend.liara.run/api/v1/userdata/${id}`, {
                method: "DELETE",
                credentials: "include",
              })
                .then(() => {
                  getUsers();
                })
                .catch((err) => {
                  SwalAler("دوباره تلاش کنید", "error");
                });
            });
          }
        });
      };
    });
  }
}

function ItemDivUserAndAdmin(email, id, admin) {
  return `<div class="my-4 itemUser">
  <div class="my-3 p-4 md:p-8 rounded-lg bg-[#313348] block md:flex justify-between">
    <div class="h-max my-auto md:text-xl w-[100px] md:w-max">${email}</div>
    <div class="justify-end my-3 md:my-0 flex gap-2" data-id="${id}">
      <div class="p-2 md:p-3 cursor-pointer bg-blue-600 md:text-base text-sm rounded w-max ${admin ? "closeAdmin" : "addAdmin"}">${admin ? "لغو ادمینی" : "ادد ادمین"}</div>
      <div class="p-2 md:p-3 cursor-pointer bg-danger md:text-base text-sm rounded w-max deleteUser">${admin ? "حذف ادمین" : "حذف کاربر"}</div>
    </div>
  </div>
</div>`;
}

////////////////////////// btn Page Item

/////// use ImportAll

CreateDivsPanel(div, "");
// CheckAuth("../html/userPage.html");
moreDivCreatePanel(imgDiv);
let aDiv = document.querySelectorAll(".panel a");
funcLogOut(aDiv[6]);

function userToAdmin(type, id) {
  fetch(`https://bookshop-backend.liara.run/api/v1/userdata/${type}`, {
    method: "PUT",
    credentials: "include",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({userId: id}),
  })
    .then((res) => getUsers())
    .then(console.log);
}
