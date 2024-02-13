import {CreateDivsPanel, moreDivCreatePanel} from "./export.js";
let div = [
  {title: "افزودن محصول", href: "#"},
  {title: "افزودن مقاله", href: "#"},
  {title: "افزودن نویسنده", href: "#"},
  {title: "کاربران ", href: "#"},
  {title: "تیکت ها ", href: "#"},
  {title: "نظرات ", href: "#"},
  {title: "تنظیمات ", href: "#"},
  {title: "خروج ", href: "#"},
];
CreateDivsPanel(div);
let imgDiv = [
  {img: "../img/icons8-gmail-50.png", title: "50", more1: "تیکت", color: "blue-500", more2: "بازدید سایت"},
  {img: "../img/icons8-file-50.png", title: "0", more1: "مقاله", color: "danger", more2: "ثبت نام کاربر"},
  {img: "../img/icons8-users-50.png", title: "5056", more1: "کاربر", color: "success", more2: "فروش محصولات"},
  {img: "../img/icons8-book-50.png", title: "10", more1: "محصول", color: "warning", more2: "معاملات"},
];
moreDivCreatePanel(imgDiv);
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

let aDiv = document.querySelectorAll(".panel a");
console.log(aDiv);
console.log();
const LogOut = () => {
  aDiv[7].onclick = () => {
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
          }).then((result) => {
            location.href = "../index.html";
            fetch("https://bookshop-backend.liara.run/api/v1/logout", {credentials: "include"})
              .then((result) => {
                console.log(result);
              })
              .catch((err) => {});
          });
        }
      });
  };
};
LogOut();
let swalAlert = Swal.mixin({
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "بله و خروج",
  cancelButtonText: "خیر",
});
