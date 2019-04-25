/*eslint no-unused-vars: 0 */

'use strict';

import $ from 'jquery';
import '../scss/index.scss';
import AOS from 'aos';
import 'aos/dist/aos.css'

import {tabs} from './modules/tabs';
import {dropdowns} from './modules/dropdown';
import {accordion} from './modules/accordion';
import {burger} from './modules/burger';
import {showMore} from './modules/show-more';
import {navOnSections} from './modules/nav-on-sections';
import {form} from './modules/form';
import {imageListItem} from './modules/images-list';
import {goTos} from './modules/goTo';

$('document').ready(function(){
    tabs.init();
    dropdowns.init();
    accordion.init();
    burger.init();
    form.init();
    AOS.init();
    imageListItem.init();

    showMore.init();
    goTos.init();

    navOnSections.init();
});