let template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="../css/tailwind.css" />
<link rel="stylesheet" href="../css/style.css" />
<div>
<img src="./img/n1.jpg" alt="" class="rounded-full persent" />
<div class="flex gap-2 w-max mx-auto mt-[-35px]">
  <div class="p-2 md:p-4 bg-white rounded-full shadow-lg" style="z-index:555" ><img src="./img/icons8-facebook-50.png" class="w-6 md:w-8" alt="" /></div>
  <div class="p-2 md:p-4 bg-white rounded-full shadow-lg" style="z-index:555" ><img src="./img/icons8-facebook-50.png" class="w-6 md:w-8" alt="" /></div>
</div>
<div class="my-6 text-center">
  <h3 class="title1 text-3xl my-2.5">مایک براون</h3>
  <p class="title2 text-zinc-400">نویسنده بزریلی</p>
</div>
</div>
`;
class DivNeviSande extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.append(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelector(".persent").src = this.getAttribute("img");
    this.shadowRoot.querySelector(".title1").textContent = this.getAttribute("t1");
    this.shadowRoot.querySelector(".title2").textContent = this.getAttribute("t2");
  }
}
export {DivNeviSande};
