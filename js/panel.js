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
let imgDiv = [
  {img: "../img/icons8-gmail-50.png", title: "50", more1: "تیکت", color: "blue-500", more2: "بازدید سایت"},
  {img: "../img/icons8-file-50.png", title: "0", more1: "مقاله", color: "danger", more2: "ثبت نام کاربر"},
  {img: "../img/icons8-users-50.png", title: "5056", more1: "کاربر", color: "success", more2: "فروش محصولات"},
  {img: "../img/icons8-book-50.png", title: "10", more1: "محصول", color: "warning", more2: "معاملات"},
];
div.forEach((item) => {
  document.querySelector(".panel").innerHTML += `
    
    <div class="p-5 cursor-pointer my-1 flex justify-between">${item.title}<img src="../img/arrow-left.png" alt="" class="w-5 h-5 my-auto" /></div>
    `;
});

imgDiv.forEach((item) => {
  document.querySelector(".more").innerHTML += `
           <div class="md:mx-auto flex p-4 rounded-lg">
                <div class="bg-${item.color} p-3 rounded-full"><img src="${item.img}" alt="" class="w-10" /></div>
                <div class=" h-max my-auto ms-5">${item.title}${item.more1}</div>
              </div>`;
  document.querySelector(".more2").innerHTML += `
         <div class="p-5 px-14 bg-${item.color} text-center text-3xl rounded-xl">
                <div class="p-2 border-b-[1px] border-zinc-400 my-2">${item.title}</div>
                <div class="my-4 text-2xl">${item.more2}</div>
              </div>
  `;
});

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
