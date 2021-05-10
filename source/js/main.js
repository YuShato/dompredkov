import {forEachPolyfill} from './utils/polyfill-foreach';
import {initIe11Download} from './utils/init-ie11-download';
import {openMenu} from './modules/openMenu';
import {sliderMenu} from './modules/sliderMenu';
import {sliderEvent} from "./modules/sliderEvent";
import {instSlider} from "./modules/instSlider";
import {fixNav} from './modules/fixNav';
import {mapPopup} from './modules/mapPopup';
import {showForm} from './modules/showForm';
import {activeDropdownArticles} from './modules/mobile-articles';

// Utils
// ---------------------------------
forEachPolyfill();
initIe11Download();

// Modules
// ---------------------------------
openMenu();
mapPopup();
sliderMenu();
sliderEvent();
instSlider();
fixNav();
showForm();
activeDropdownArticles();
