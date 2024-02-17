import {divCallMeTo} from "../components/templateCallToMe/tempCallToMe.js";
import {divNextHeader} from "../components/templatNextHeader/divNextHeader.js";
customElements.define("call-to-me", divCallMeTo);
customElements.define("div-next-header", divNextHeader);

const btn = document.querySelector("button");
btn.onclick = () => {
  document.querySelectorAll("input").forEach((item) => (item.value = ""));
  document.querySelector("select").value = "دپارتمان فروش";
  document.querySelector("textarea").value = "";
};
