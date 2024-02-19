import {headerAndIsLogin} from "./Header-Site.js";
import {TemplateFooter} from "./footer.js";
import {itemFooter} from "../components/menuFoter/footerMenu.js";
import {empityLocal} from "./export.js";
TemplateFooter(".");
headerAndIsLogin(".", JSON.parse(localStorage.getItem("mahsol")));
customElements.define("item-footer", itemFooter);
empityLocal();
