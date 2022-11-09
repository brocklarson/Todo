/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const menuSetup = () => {
    const menu = document.getElementById(`menu`);
    let customLists = [`To-Do`];
    let activeList = `To-Do`;
    ////Search local storage and add any lists to customLists here

    function setupTitle() {
        const title = document.createElement(`h1`);
        title.classList.add(`app-title`);
        title.innerText = `Tracker`;
        menu.appendChild(title);
    };

    function createMenuLists(listTitle, icon = `checklist`) {
        const menu = document.getElementById(`menu`);
        const btn = document.createElement(`button`);
        btn.classList.add(`menu-buttons`);
        btn.id = listTitle.replace(/\s/g, "");
        btn.name = listTitle;

        const iconSpan = document.createElement(`span`);
        iconSpan.classList.add(`material-symbols-outlined`);
        iconSpan.innerText = icon;

        const btnText = document.createElement(`span`);
        btnText.innerText = listTitle;

        menu.appendChild(btn);
        btn.appendChild(iconSpan);
        btn.appendChild(btnText);
    };

    function setupPremadeLists() {
        createMenuLists(`Today`, `today`);
        createMenuLists(`Tomorrow`, `event`);
        createMenuLists(`This Week`, `date_range`);
    };

    function setupListHeading() {
        const listsHeading = document.createElement(`p`);
        listsHeading.classList.add(`menu-lists`);
        listsHeading.innerText = `Lists`;
        menu.appendChild(listsHeading);
    };

    function setupCustomLists() {
        customLists.forEach(item => createMenuLists(item, `checklist`));

        createMenuLists(`Add List`, `add`)
    }

    function setActiveList(e) {
        activeList = e.target.id;
        console.log(activeList);
    }

    function getActiveList() {
        console.log(activeList);
        return activeList;
    }

    function createEventListeners() {
        const btns = document.querySelectorAll(`.menu-buttons`);
        btns.forEach(btn => btn.addEventListener(`click`, setActiveList));
    }

    (function setupMenu() {
        setupTitle();
        setupPremadeLists();
        setupListHeading();
        setupCustomLists();
        createEventListeners();
    }());

    return {
        getActiveList
    }
};

menuSetup();
menuSetup.getActiveList();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVudVNldHVwID0gKCkgPT4ge1xuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgIGxldCBjdXN0b21MaXN0cyA9IFtgVG8tRG9gXTtcbiAgICBsZXQgYWN0aXZlTGlzdCA9IGBUby1Eb2A7XG4gICAgLy8vL1NlYXJjaCBsb2NhbCBzdG9yYWdlIGFuZCBhZGQgYW55IGxpc3RzIHRvIGN1c3RvbUxpc3RzIGhlcmVcblxuICAgIGZ1bmN0aW9uIHNldHVwVGl0bGUoKSB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDFgKTtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZChgYXBwLXRpdGxlYCk7XG4gICAgICAgIHRpdGxlLmlubmVyVGV4dCA9IGBUcmFja2VyYDtcbiAgICAgICAgbWVudS5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1lbnVMaXN0cyhsaXN0VGl0bGUsIGljb24gPSBgY2hlY2tsaXN0YCkge1xuICAgICAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKGBtZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgYnRuLmlkID0gbGlzdFRpdGxlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgYnRuLm5hbWUgPSBsaXN0VGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gaWNvbjtcblxuICAgICAgICBjb25zdCBidG5UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBidG5UZXh0LmlubmVyVGV4dCA9IGxpc3RUaXRsZTtcblxuICAgICAgICBtZW51LmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChpY29uU3Bhbik7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChidG5UZXh0KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBQcmVtYWRlTGlzdHMoKSB7XG4gICAgICAgIGNyZWF0ZU1lbnVMaXN0cyhgVG9kYXlgLCBgdG9kYXlgKTtcbiAgICAgICAgY3JlYXRlTWVudUxpc3RzKGBUb21vcnJvd2AsIGBldmVudGApO1xuICAgICAgICBjcmVhdGVNZW51TGlzdHMoYFRoaXMgV2Vla2AsIGBkYXRlX3JhbmdlYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwTGlzdEhlYWRpbmcoKSB7XG4gICAgICAgIGNvbnN0IGxpc3RzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgbGlzdHNIZWFkaW5nLmNsYXNzTGlzdC5hZGQoYG1lbnUtbGlzdHNgKTtcbiAgICAgICAgbGlzdHNIZWFkaW5nLmlubmVyVGV4dCA9IGBMaXN0c2A7XG4gICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQobGlzdHNIZWFkaW5nKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBDdXN0b21MaXN0cygpIHtcbiAgICAgICAgY3VzdG9tTGlzdHMuZm9yRWFjaChpdGVtID0+IGNyZWF0ZU1lbnVMaXN0cyhpdGVtLCBgY2hlY2tsaXN0YCkpO1xuXG4gICAgICAgIGNyZWF0ZU1lbnVMaXN0cyhgQWRkIExpc3RgLCBgYWRkYClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVMaXN0KGUpIHtcbiAgICAgICAgYWN0aXZlTGlzdCA9IGUudGFyZ2V0LmlkO1xuICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVMaXN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBY3RpdmVMaXN0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVMaXN0KTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUxpc3Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IGJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgc2V0QWN0aXZlTGlzdCkpO1xuICAgIH1cblxuICAgIChmdW5jdGlvbiBzZXR1cE1lbnUoKSB7XG4gICAgICAgIHNldHVwVGl0bGUoKTtcbiAgICAgICAgc2V0dXBQcmVtYWRlTGlzdHMoKTtcbiAgICAgICAgc2V0dXBMaXN0SGVhZGluZygpO1xuICAgICAgICBzZXR1cEN1c3RvbUxpc3RzKCk7XG4gICAgICAgIGNyZWF0ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfSgpKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldEFjdGl2ZUxpc3RcbiAgICB9XG59O1xuXG5tZW51U2V0dXAoKTtcbm1lbnVTZXR1cC5nZXRBY3RpdmVMaXN0KCk7XG5cbihmdW5jdGlvbiBpbml0RXZlbnRzKCkge1xuICAgIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJ0bmApO1xuICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgIGNvbnN0IG1lbnVCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QmdgKTtcbiAgICBjb25zdCBhZGRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYEFkZExpc3RgKTtcblxuICAgIG1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgIGlmICghbWVudUJnLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVCZy5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICB9KTtcbiAgICBtZW51QmcuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKG1lbnVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgaWYgKG1lbnVCZy5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgfSk7XG4gICAgYWRkTGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGFkZE5ld0xpc3QpO1xuXG59KCkpO1xuXG5mdW5jdGlvbiBhZGROZXdMaXN0KCkge1xuICAgIGNvbnN0IGxpc3ROYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBOYW1lOmApO1xuICAgIGNyZWF0ZU1lbnVMaXN0cyhsaXN0TmFtZSwgYGNoZWNrTGlzdGApO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==