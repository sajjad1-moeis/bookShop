import {CreateDivsPanel, moreDivCreatePanel, CheckAuth, funcLogOut} from "./export.js";

let div = [
  {title: "پیشخوان", href: "../html/Panel-Admin.html?id=pishkhan"},
  {title: "افزودن محصول", href: "../html/Panel-Admin.html?id=mahsol"},
  {title: "افزودن مقاله", href: "../html/Panel-Admin.html?id=mahgale"},
  {title: "افزودن نویسنده", href: "../html/Panel-Admin.html?id=nevisande"},
  {title: "کاربران ", href: "../html/Panel-Admin.html?id=Users"},
  {title: "تیکت ها ", href: "../html/Panel-Admin.html?id=ticket"},
  {title: "نظرات ", href: "../html/Panel-Admin.html?id=comment"},
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
funcLogOut(aDiv[8]);

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
  console.log(SearchLocation);
  if (SearchLocation) {
    let Div = document.querySelector(`#${SearchLocation}`);
    let divPanel = document.querySelectorAll(".divPanel");
    divPanel.forEach((div) => div.classList.add("hidden"));
    Div.classList.remove("hidden");
    console.log(Div);
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
        containerTicket.innerHTML += `<div class="my-4 itemTicket">
        <div class="my-3 p-8 rounded-lg bg-[#313348] block md:flex justify-between">
          <div class="h-max my-auto">تیکت جدید</div>
          <div class="flex gap-2" data-user="${item.creator}" data-ticket="${item._id}">
            <div class="text-sm p-2 cursor-pointer bg-success rounded answerTicket">جواب دادن به تیکت</div>
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

  console.log(containerTicket);
};
ShowAllTikcet();

////////////// close
const showContainerTicket = (useId, userTicket) => {
  console.log(useId);
  fetch(`https://bookshop-backend.liara.run/api/v1/userdata/${useId}`, {
    credentials: "include",
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".divNewTextTicket").classList.remove("hidden");
      document.querySelector(".titleDivNewTextTicket").textContent = data.fullname;
    })
    .catch((err) => {});
};

///////////
const closeDivChat = document.querySelector(".closeDivChat");
closeDivChat.onclick = () => {
  document.querySelector(".divNewTextTicket").classList.add("hidden");
};
