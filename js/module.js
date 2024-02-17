import {headerAndIsLogin} from "./Header-Site.js";
import {TemplateFooter} from "./footer.js";
import {itemFooter} from "../components/menuFoter/footerMenu.js";
TemplateFooter(".");
headerAndIsLogin(".");
customElements.define("item-footer", itemFooter);
