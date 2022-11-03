import {
    headerSetup,
    menuSetup,
    createMenuLists,
} from './page-setup.js';

headerSetup();
menuSetup();

(function initEventListeners() {
    const menuButton = document.getElementById(`menuButton`);
    const menuContainer = document.getElementById(`menu`);
    const menuBg = document.getElementById(`menuBg`);

    menuButton.addEventListener(`click`, function() {
        if (!menuContainer.classList.contains(`active`)) menuContainer.classList.add(`active`);
        if (!menuBg.classList.contains(`active`)) menuBg.classList.add(`active`);
    });
    menuBg.addEventListener(`click`, function() {
        if (menuContainer.classList.contains(`active`)) menuContainer.classList.remove(`active`);
        if (menuBg.classList.contains(`active`)) menuBg.classList.remove(`active`);
    });

}());