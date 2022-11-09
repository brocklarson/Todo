/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function createMenuLists(listTitle, icon) {
    const menu = document.getElementById(`menu`);
    const button = document.createElement(`button`);
    button.classList.add(`menu-buttons`);
    button.id = listTitle.replace(/\s/g, "");
    button.name = listTitle;

    const iconSpan = document.createElement(`span`);
    iconSpan.classList.add(`material-symbols-outlined`);
    iconSpan.innerText = icon;

    const buttonText = document.createElement(`span`);
    buttonText.innerText = listTitle;

    menu.appendChild(button);
    button.appendChild(iconSpan);
    button.appendChild(buttonText);
};

const menuSetup = () => {
    const menu = document.getElementById(`menu`);

    const title = document.createElement(`h1`);
    title.classList.add(`app-title`);
    title.innerText = `Tracker`;
    menu.appendChild(title);

    createMenuLists(`Today`, `today`);
    createMenuLists(`Tomorrow`, `event`);
    createMenuLists(`This Week`, `date_range`);

    let customLists = [`To-Do`];
    ////Search local storage and add any lists to customLists here

    const listsHeading = document.createElement(`p`);
    listsHeading.classList.add(`menu-lists`);
    listsHeading.innerText = `Lists`;
    menu.appendChild(listsHeading);

    customLists.forEach(item => createMenuLists(item, `checklist`));

    createMenuLists(`Add List`, `add`)

    const background = document.createElement(`div`);
    background.classList.add(`menu-bg`);
    background.id = `menuBg`
    document.body.appendChild(background);
};

(function initEvents() {
    const menuButton = document.getElementById(`menuBtn`);
    const menuContainer = document.getElementById(`menu`);
    const menuBg = document.getElementById(`menuBg`);
    const addListBtn = document.getElementById(`AddList`);

    menuButton.addEventListener(`click`, function() {
        if (!menuContainer.classList.contains(`active`)) menuContainer.classList.add(`active`);
        if (!menuBg.classList.contains(`active`)) menuBg.classList.add(`active`);
    });
    menuBg.addEventListener(`click`, function() {
        if (menuContainer.classList.contains(`active`)) menuContainer.classList.remove(`active`);
        if (menuBg.classList.contains(`active`)) menuBg.classList.remove(`active`);
    });
    addListBtn.addEventListener(`click`, addNewList);

}());

function addNewList() {
    const listName = prompt(`New List Name:`);
    createMenuLists(listName, `checkList`);
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVNZW51TGlzdHMobGlzdFRpdGxlLCBpY29uKSB7XG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoYG1lbnUtYnV0dG9uc2ApO1xuICAgIGJ1dHRvbi5pZCA9IGxpc3RUaXRsZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgYnV0dG9uLm5hbWUgPSBsaXN0VGl0bGU7XG5cbiAgICBjb25zdCBpY29uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICBpY29uU3Bhbi5jbGFzc0xpc3QuYWRkKGBtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkYCk7XG4gICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gaWNvbjtcblxuICAgIGNvbnN0IGJ1dHRvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgYnV0dG9uVGV4dC5pbm5lclRleHQgPSBsaXN0VGl0bGU7XG5cbiAgICBtZW51LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKGljb25TcGFuKTtcbiAgICBidXR0b24uYXBwZW5kQ2hpbGQoYnV0dG9uVGV4dCk7XG59O1xuXG5jb25zdCBtZW51U2V0dXAgPSAoKSA9PiB7XG4gICAgY29uc3QgbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG5cbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGgxYCk7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZChgYXBwLXRpdGxlYCk7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gYFRyYWNrZXJgO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gICAgY3JlYXRlTWVudUxpc3RzKGBUb2RheWAsIGB0b2RheWApO1xuICAgIGNyZWF0ZU1lbnVMaXN0cyhgVG9tb3Jyb3dgLCBgZXZlbnRgKTtcbiAgICBjcmVhdGVNZW51TGlzdHMoYFRoaXMgV2Vla2AsIGBkYXRlX3JhbmdlYCk7XG5cbiAgICBsZXQgY3VzdG9tTGlzdHMgPSBbYFRvLURvYF07XG4gICAgLy8vL1NlYXJjaCBsb2NhbCBzdG9yYWdlIGFuZCBhZGQgYW55IGxpc3RzIHRvIGN1c3RvbUxpc3RzIGhlcmVcblxuICAgIGNvbnN0IGxpc3RzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICBsaXN0c0hlYWRpbmcuY2xhc3NMaXN0LmFkZChgbWVudS1saXN0c2ApO1xuICAgIGxpc3RzSGVhZGluZy5pbm5lclRleHQgPSBgTGlzdHNgO1xuICAgIG1lbnUuYXBwZW5kQ2hpbGQobGlzdHNIZWFkaW5nKTtcblxuICAgIGN1c3RvbUxpc3RzLmZvckVhY2goaXRlbSA9PiBjcmVhdGVNZW51TGlzdHMoaXRlbSwgYGNoZWNrbGlzdGApKTtcblxuICAgIGNyZWF0ZU1lbnVMaXN0cyhgQWRkIExpc3RgLCBgYWRkYClcblxuICAgIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBiYWNrZ3JvdW5kLmNsYXNzTGlzdC5hZGQoYG1lbnUtYmdgKTtcbiAgICBiYWNrZ3JvdW5kLmlkID0gYG1lbnVCZ2BcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJhY2tncm91bmQpO1xufTtcblxuKGZ1bmN0aW9uIGluaXRFdmVudHMoKSB7XG4gICAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QnRuYCk7XG4gICAgY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG4gICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuICAgIGNvbnN0IGFkZExpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgQWRkTGlzdGApO1xuXG4gICAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIW1lbnVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgaWYgKCFtZW51QmcuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUJnLmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApO1xuICAgIH0pO1xuICAgIG1lbnVCZy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAobWVudUNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICBpZiAobWVudUJnLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICB9KTtcbiAgICBhZGRMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgYWRkTmV3TGlzdCk7XG5cbn0oKSk7XG5cbmZ1bmN0aW9uIGFkZE5ld0xpc3QoKSB7XG4gICAgY29uc3QgbGlzdE5hbWUgPSBwcm9tcHQoYE5ldyBMaXN0IE5hbWU6YCk7XG4gICAgY3JlYXRlTWVudUxpc3RzKGxpc3ROYW1lLCBgY2hlY2tMaXN0YCk7XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9