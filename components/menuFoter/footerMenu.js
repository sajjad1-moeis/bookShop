let template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="" />
<link rel="stylesheet" href="" />
<div class="text-xl">
<div class="h-max border-s-2 border-zinc-300"></div>
<div class="">
  <div class="h-5 border-s-2 border-zinc-200"></div>
  <div class="border-s-4 border-primary ps-8 ">منو سفارشی</div>
  <div class="text-zinc-500 ps-8 border-s-2 border-zinc-200">
    <div class="py-10 leading-8">
      <div>صفحه اصلی</div>
      <div>کتاب ها</div>
      <div>مجموعه</div>
      <div>دسته بندی</div>
    </div>
  </div>
</div>
<div class="border-s-2 border-zinc-300"></div>
</div>
`;
class itemFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.append(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelectorAll("link")[0].href = this.getAttribute("tail");
    this.shadowRoot.querySelectorAll("link")[1].href = this.getAttribute("css");
  }
}
export {itemFooter};
