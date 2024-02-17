let template = document.createElement("template");
template.innerHTML = `
   <link rel="stylesheet" href="../css/tailwind.css" />
   <link rel="stylesheet" href="../css/style.css" />
   <div class="pt-32 lg:pt-14">
          <div class="flex justify-between">
            <span class="text-xl t1">تماس با ما</span>
            <div class="h-max my-auto">
              <a href="../index.html">
                <span class="text-zinc-400 "><img src="../img/icons8-home-50.png" class="w-4 inline me-2" alt=""><span class="t1">تماس با ما</span></span>
              </a>
            </div>
          </div>
        </div>
`;

class divNextHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.append(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelectorAll(".t1").forEach((span) => (span.textContent = this.getAttribute("title")));
  }
}

export {divNextHeader};
