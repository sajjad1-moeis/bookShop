let template = document.createElement("template");
template.innerHTML = `
   <link rel="stylesheet" href="./css/tailwind.css" />
   <link rel="stylesheet" href="./css/style.css" />
    <div class=" w-full parent">
    <div class="text-lg onvan">اکشن و ماجراجویی</div>
    <div class="hover cursor-pointer pe-3 p-2 gap-3 flex text-xs border-[1px] border-white rounded-full my-3 w-max">
      <div class="p-1 px-1.5 border-[1px] border-white rounded-full"><img src="./img/arrow-left.png" class="w-3 inline" alt="" /></div>
      <div class="m-auto">مشاهده مجموعه</div>
    </div>
  </div>
    
    `;
class temp1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.append(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelector(".parent").classList.add(this.getAttribute("book"));
    this.shadowRoot.querySelector(".onvan").textContent = this.getAttribute("title");
  }
}

let template2 = document.createElement("template");
template2.innerHTML = `
   <link rel="stylesheet" href="./css/tailwind.css" />
   <link rel="stylesheet" href="./css/style.css" />
         <section class="max-w-[550px] w-full mx-auto">
          <div class="w-full flex gap-5">
            <div class="w-full border-[1px] border-zinc-200 m-auto"></div>
            <div class="flex-none p-2 rounded-full px-3 bg-primary text-white onvan"></div>
            <div class="w-full border-[1px] border-zinc-200 m-auto"></div>
          </div>
          <div class="my-8 text-2xl md:text-5xl text-center">
            <span class="font-bold onvan1">مجموعه کتاب </span>
          </div>
        </section>
    
    `;
class temp2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.append(template2.content.cloneNode(true));
  }
  connectedCallback() {
    // this.shadowRoot.querySelector(".parent").classList.add(this.getAttribute("book"));
    this.shadowRoot.querySelector(".onvan").textContent = this.getAttribute("title");
    this.shadowRoot.querySelector(".onvan1").textContent = this.getAttribute("more");
  }
}

let tempAboutMe = document.createElement("template");
tempAboutMe.innerHTML = `
    <link rel="stylesheet" href="../css/tailwind.css" />
   <link rel="stylesheet" href="../css/style.css" />
                 <div class="flex mt-3">
                      <div class="p-2  rounded-full item-tick">
                        <img src="../img/icons8-tick-64.png" class=" w-[30px]" alt="" />
                      </div>
                      <div class="h-max my-auto ms-3 text-lg">مسئولیت محدود</div>
                    </div>
         
`;
class tempAboutMeCls extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.append(tempAboutMe.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelector(".text-lg").textContent = this.getAttribute("title");
  }
}
export {temp2, temp1, tempAboutMeCls};
