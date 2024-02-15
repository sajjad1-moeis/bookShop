const $ = document;
import {CreateDivsPanel, moreDivCreatePanel, CheckAuth, funcLogOut} from "./export.js";
import {LodingSite} from "./Header-Site.js";
let div = [
  {title: "پیشخوان", href: "../html/Panel-Admin.html?id=pishkhan"},
  {title: "محصول", href: "../html/Panel-Admin.html?id=mahsol"},
  {title: "تیکت ها ", href: "../html/Panel-Admin.html?id=ticket"},
  {title: "کاربران ", href: "../html/Panel-Admin.html?id=Users"},
  {title: "افزودن مقاله", href: "../html/Panel-Admin.html?id=mahgale"},
  {title: "تنظیمات ", href: "../html/Panel-Admin.html?id=settings"},
  {title: "خروج ", href: "#"},
];
let imgDiv = [
  {img: "../img/icons8-gmail-50.png", title: "50", more1: "تیکت", color: "blue-500", more2: "بازدید سایت"},
  {img: "../img/icons8-file-50.png", title: "0", more1: "مقاله", color: "danger", more2: "ثبت نام کاربر"},
  {img: "../img/icons8-users-50.png", title: "5056", more1: "کاربر", color: "success", more2: "فروش محصولات"},
  {img: "../img/icons8-book-50.png", title: "10", more1: "محصول", color: "warning", more2: "معاملات"},
];

/////// use ImportAll

CheckAuth("../html/userPage.html");
CreateDivsPanel(div);
moreDivCreatePanel(imgDiv);
let aDiv = document.querySelectorAll(".panel a");
funcLogOut(aDiv[6]);

////////////////Chart

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
      console.log(data);
      containerTicket.innerHTML = "";
      data.tickets.forEach((item) => {
        console.log();
        containerTicket.innerHTML += `<div class="my-4 itemTicket">
        <div class="my-3 p-8 rounded-lg bg-[#313348] block md:flex justify-between">
          <div class="h-max my-auto">${item.seen ? "تیکت پاسخ داده شده" : "تیکت جدید"}</div>
          <div class="flex gap-2" data-user="${item.creator}" data-ticket="${item._id}">
            <div class="text-sm p-2 cursor-pointer bg-success rounded answerTicket">${item.seen ? "مشاهده تیکت" : "جواب دادن به تیکت"}  </div>
            <div class="text-sm p-2 cursor-pointer bg-danger rounded deleteTicket">بستن تیکت</div>
          </div>
        </div>
      </div>`;
      });
      let itemTicketAll = document.querySelectorAll(".answerTicket");
      itemTicketAll.forEach(
        (btn) =>
          (btn.onclick = () => {
            userId = btn.parentElement.dataset.user;
            userTicket = btn.parentElement.dataset.ticket;
            showContainerTicket(userId, userTicket);
            console.log();
          })
      );
    })
    .catch((err) => {});
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
        .catch((err) => {});
    })
    .catch((err) => {
      Swal.fire({
        title: "لطفا دوباره تلاش کنید",
        icon: "error",
      });
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
        inputNewTextTicket.value = "";
      })
      .catch((err) => {});
  }
};

//////////////////////////////////////////// product Item

const containerMahsol = $.querySelector(".containerMahsol");

const getAllProduct = () => {
  fetch(`https://bookshop-backend.liara.run/api/v1/books`)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      containerMahsol.innerHTML = "";
      data.forEach((item) => {
        containerMahsol.innerHTML += `
          <div class="p-5 my-4 bg-[#313348] rounded-xl block md:flex justify-between px-10">
                  <div class=" md:flex gap-6">
                    <div class="w-max m-auto">
                    <img src="https://bookshop-backend.liara.run${item.imagePath}" class="rounded-full w-32 object-cover" alt="" />
                    </div>
                  <div class="h-max md:my-auto md:text-right  text-center my-5">
                      <div class="my-3 text-white text-xl">
                        <span class="text-zinc-300 text-base">محصول :</span>
                        <span class="ms-2">${item.name}</span>
                      </div>
                      <div class="my-3 text-white text-xl">
                        <span class="text-zinc-300 text-base">قیمت :</span>
                        <span class="ms-2">${item.price}</span>
                      </div>
                    </div>
                  </div>
                  <div class="block md:flex h-max my-auto gap-3" data-id="${item._id}">
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
      LodingSite("bg-[#232434]");
    })
    .catch((err) => {});
};

//////////////////EditProduct
const EditProduct = (id) => {
  // let uplateBook = {};
  // fetch("https://bookshop-backend.liara.run/api/v1/books", {
  //   method: "PUT",
  //   credentials: "include",
  //   body: {name, price, offer, id},
  // });
  showModal();
};

//////////////////DeleteProduct
const DeleteProduct = (id) => {
  Swal.fire({
    title: "آیا مایلید حذف کنید ؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله و خروج",
    cancelButtonText: "خیر",
  }).then((result) => {
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
          .catch((err) => {});
      });
    }
  });
};

getAllProduct();

////////////////////Show modal
const addProduct = $.querySelector(".addProduct");
const modalTiket = $.querySelector(".modalTiket");
const showModal = () => {
  modalTiket.style.cssText = "top: 0%;transform: translate(0,0%)";
  $.querySelector("main").style.cssText = "filter: brightness(0.5)";
};

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

addProduct.onclick = showModal;
const closeModalMahsol = $.querySelector(".closeModalMahsol");
closeModalMahsol.onclick = closeModal;

///////////////////// Post Mahsol

const postMahsolBtn = $.querySelector("#postMahsol");
const inputMahsolAll = $.querySelectorAll(".input-mahsol");
const inputImgMahsol = $.querySelector(".input-img-mahsol");

const postMahsol = () => {
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
      const formData = new FormData();
      formData.append("image", inputImgMahsol.files[0]);
      formData.append("name", inputMahsolAll[0].value);
      formData.append("price", Number(inputMahsolAll[1].value));
      formData.append("offer", inputMahsolAll[2].value);
      formData.append("filter", inputMahsolAll[3].value);
      fetch("https://bookshop-backend.liara.run/api/v1/books", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((result) => result.json())
        .then((data) => console.log(data))
        .catch((err) => {});
    }
  }
};

postMahsolBtn.onclick = postMahsol;
