import {tempAboutMeCls, classTextAboutMe} from "../components/temp1/temp1.js";
import {divNextHeader} from "../components/templatNextHeader/divNextHeader.js";
customElements.define("tick-template", tempAboutMeCls);
customElements.define("text-about", classTextAboutMe);
customElements.define("div-next-header", divNextHeader);

const imgTranslate = document.getElementById("imgTranslate");
const translateImg = (e) => {
  let top = Math.floor((e.pageY - imgTranslate.offsetTop) / 180);
  let left = Math.floor((e.pageX - imgTranslate.offsetLeft) / 180);
  imgTranslate.style.cssText = `transform : perspective(250px)  rotateX(${top}deg) rotateY(${left}deg)`;
  console.log(top);
  console.log(left);
};
imgTranslate.onmousemove = translateImg;
imgTranslate.onmouseleave = () => {
  imgTranslate.style.cssText = `transform : perspective(250px)  rotateX(0) rotateY(0)`;
};
