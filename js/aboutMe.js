import {tempAboutMeCls, classTextAboutMe} from "../components/temp1/temp1.js";
import {itemFooter} from "../components/menuFoter/footerMenu.js";
customElements.define("tick-template", tempAboutMeCls);
customElements.define("item-footer", itemFooter);
customElements.define("text-about", classTextAboutMe);

const imgTranslate = document.getElementById("imgTranslate");
const translateImg = (e) => {
  let top = Math.floor((e.pageY - imgTranslate.offsetTop) / 150);
  let left = Math.floor((e.pageX - imgTranslate.offsetLeft) / 150);
  imgTranslate.style.cssText = `transform : perspective(300px)  rotateX(${left}deg) rotateY(${top}deg)`;
  console.log(left);
};
imgTranslate.onmousemove = translateImg;
imgTranslate.onmouseleave = () => {
  imgTranslate.style.cssText = `transform : perspective(300px)  rotateX(0) rotateY(0)`;
};
