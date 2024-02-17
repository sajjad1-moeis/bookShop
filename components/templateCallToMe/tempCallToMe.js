let template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="../css/tailwind.css" />
   <link rel="stylesheet" href="../css/style.css" />
   <div class="flex gap-6 w-max mx-auto md:mx-0 my-3 divCallMe">
   <div class="rounded-full  w-20 h-20  imgCallMe">
     <div class="w-max mt-5 m-auto"><img src="" class="w-10 " alt="" /></div>
   </div>
   <div class="h-max w-[150px] lg:w-max my-auto">
     <div class=" text-xl md:text-3xl my-2 t1 t1CallMe flex-none"></div>
     <div class="text-zinc-500 text-base md:text-lg t2"></div>
   </div>
 </div>

`;

class divCallMeTo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.append(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelector("img").src = this.getAttribute("img");
    this.shadowRoot.querySelector(".t1").textContent = this.getAttribute("t1");
    this.shadowRoot.querySelector(".t2").textContent = this.getAttribute("t2");
  }
}

export {divCallMeTo};
