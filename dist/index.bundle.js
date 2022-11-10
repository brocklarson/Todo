/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
class List {
    constructor(title,
        items = [],
        icon = `checklist`
    ) {
        this.title = title
        this.items = items
        this.icon = icon
    };
    /* add item, remove item */
}

const menuModule = () => {
    let premadeLists = [];
    let customLists = [];
    let activeList = `To-Do`;

    function initLists() {
        premadeLists.push(new List(`Today`, [], `today`));
        premadeLists.push(new List(`Tomorrow`, [], `event`));
        premadeLists.push(new List(`This Week`, [], `date_range`));

        customLists.push(new List(`To-Do`, [], `checklist`));
        ////Search local storage and add any lists to customLists here
    }

    function makeBtn(list) {
        const btn = document.createElement(`button`);

        btn.classList.add(`menu-buttons`);
        btn.id = list.title.replace(/\s/g, "");
        btn.name = list.title;

        const iconSpan = document.createElement(`span`);
        iconSpan.classList.add(`material-symbols-outlined`);
        iconSpan.innerText = list.icon;

        const btnText = document.createElement(`span`);
        btnText.innerText = list.title;

        btn.appendChild(iconSpan);
        btn.appendChild(btnText);

        return btn;
    };

    function setupLists(lists) {
        const container = document.getElementById(lists);

        eval(lists).forEach(list => {
            const btn = makeBtn(list);
            container.appendChild(btn);

            if (lists === `customLists`) {
                const removeIcon = document.createElement(`span`);
                removeIcon.classList.add(`material-symbols-outlined`, `remove-icon`);
                removeIcon.innerText = `close`;

                btn.appendChild(removeIcon)
            }
        });
    };

    function addNewList() {
        const listName = prompt(`New List Name:`);
        customLists.push(new List(listName, [], `checklist`));

        const btn = makeBtn(customLists.at(-1));
        document.getElementById(`customLists`).appendChild(btn);
        //Need add new list to have a remove icon. Maybe change this function to just remove lists and the reset up each time? Or make another function that makes that icon?
    }

    function setActiveList(e) {
        activeList = e.target.id;
    };

    function initListeners() {
        const btns = document.querySelectorAll(`.menu-buttons`);
        const addListBtn = document.getElementById(`addList`);

        btns.forEach(btn => btn.addEventListener(`click`, setActiveList));
        addListBtn.addEventListener(`click`, addNewList);
    };

    (function initMenu() {
        initLists();
        setupLists(`premadeLists`);
        setupLists(`customLists`);
        initListeners();
    }());
};

const mainScreenModule = () => {

    function initListeners() {
        const menuButton = document.getElementById(`menuBtn`);
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

    };

    (function init() {
        initListeners();
    }());
}

mainScreenModule();
menuModule();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLGEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLFxuICAgICAgICBpdGVtcyA9IFtdLFxuICAgICAgICBpY29uID0gYGNoZWNrbGlzdGBcbiAgICApIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtc1xuICAgICAgICB0aGlzLmljb24gPSBpY29uXG4gICAgfTtcbiAgICAvKiBhZGQgaXRlbSwgcmVtb3ZlIGl0ZW0gKi9cbn1cblxuY29uc3QgbWVudU1vZHVsZSA9ICgpID0+IHtcbiAgICBsZXQgcHJlbWFkZUxpc3RzID0gW107XG4gICAgbGV0IGN1c3RvbUxpc3RzID0gW107XG4gICAgbGV0IGFjdGl2ZUxpc3QgPSBgVG8tRG9gO1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RzKCkge1xuICAgICAgICBwcmVtYWRlTGlzdHMucHVzaChuZXcgTGlzdChgVG9kYXlgLCBbXSwgYHRvZGF5YCkpO1xuICAgICAgICBwcmVtYWRlTGlzdHMucHVzaChuZXcgTGlzdChgVG9tb3Jyb3dgLCBbXSwgYGV2ZW50YCkpO1xuICAgICAgICBwcmVtYWRlTGlzdHMucHVzaChuZXcgTGlzdChgVGhpcyBXZWVrYCwgW10sIGBkYXRlX3JhbmdlYCkpO1xuXG4gICAgICAgIGN1c3RvbUxpc3RzLnB1c2gobmV3IExpc3QoYFRvLURvYCwgW10sIGBjaGVja2xpc3RgKSk7XG4gICAgICAgIC8vLy9TZWFyY2ggbG9jYWwgc3RvcmFnZSBhbmQgYWRkIGFueSBsaXN0cyB0byBjdXN0b21MaXN0cyBoZXJlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUJ0bihsaXN0KSB7XG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKGBtZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgYnRuLmlkID0gbGlzdC50aXRsZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICAgIGJ0bi5uYW1lID0gbGlzdC50aXRsZTtcblxuICAgICAgICBjb25zdCBpY29uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgaWNvblNwYW4uY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGApO1xuICAgICAgICBpY29uU3Bhbi5pbm5lclRleHQgPSBsaXN0Lmljb247XG5cbiAgICAgICAgY29uc3QgYnRuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgYnRuVGV4dC5pbm5lclRleHQgPSBsaXN0LnRpdGxlO1xuXG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChpY29uU3Bhbik7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChidG5UZXh0KTtcblxuICAgICAgICByZXR1cm4gYnRuO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXR1cExpc3RzKGxpc3RzKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpc3RzKTtcblxuICAgICAgICBldmFsKGxpc3RzKS5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnRuID0gbWFrZUJ0bihsaXN0KTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgICAgICAgICBpZiAobGlzdHMgPT09IGBjdXN0b21MaXN0c2ApIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICAgICAgICAgIHJlbW92ZUljb24uY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGAsIGByZW1vdmUtaWNvbmApO1xuICAgICAgICAgICAgICAgIHJlbW92ZUljb24uaW5uZXJUZXh0ID0gYGNsb3NlYDtcblxuICAgICAgICAgICAgICAgIGJ0bi5hcHBlbmRDaGlsZChyZW1vdmVJY29uKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkTmV3TGlzdCgpIHtcbiAgICAgICAgY29uc3QgbGlzdE5hbWUgPSBwcm9tcHQoYE5ldyBMaXN0IE5hbWU6YCk7XG4gICAgICAgIGN1c3RvbUxpc3RzLnB1c2gobmV3IExpc3QobGlzdE5hbWUsIFtdLCBgY2hlY2tsaXN0YCkpO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9IG1ha2VCdG4oY3VzdG9tTGlzdHMuYXQoLTEpKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGN1c3RvbUxpc3RzYCkuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgLy9OZWVkIGFkZCBuZXcgbGlzdCB0byBoYXZlIGEgcmVtb3ZlIGljb24uIE1heWJlIGNoYW5nZSB0aGlzIGZ1bmN0aW9uIHRvIGp1c3QgcmVtb3ZlIGxpc3RzIGFuZCB0aGUgcmVzZXQgdXAgZWFjaCB0aW1lPyBPciBtYWtlIGFub3RoZXIgZnVuY3Rpb24gdGhhdCBtYWtlcyB0aGF0IGljb24/XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlTGlzdChlKSB7XG4gICAgICAgIGFjdGl2ZUxpc3QgPSBlLnRhcmdldC5pZDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgYnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgY29uc3QgYWRkTGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRMaXN0YCk7XG5cbiAgICAgICAgYnRucy5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBzZXRBY3RpdmVMaXN0KSk7XG4gICAgICAgIGFkZExpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGROZXdMaXN0KTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXRNZW51KCkge1xuICAgICAgICBpbml0TGlzdHMoKTtcbiAgICAgICAgc2V0dXBMaXN0cyhgcHJlbWFkZUxpc3RzYCk7XG4gICAgICAgIHNldHVwTGlzdHMoYGN1c3RvbUxpc3RzYCk7XG4gICAgICAgIGluaXRMaXN0ZW5lcnMoKTtcbiAgICB9KCkpO1xufTtcblxuY29uc3QgbWFpblNjcmVlbk1vZHVsZSA9ICgpID0+IHtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJ0bmApO1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuXG4gICAgICAgIG1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApO1xuICAgICAgICAgICAgaWYgKCFtZW51QmcuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUJnLmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApO1xuICAgICAgICB9KTtcbiAgICAgICAgbWVudUJnLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAobWVudUNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICAgICAgaWYgKG1lbnVCZy5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdGVuZXJzKCk7XG4gICAgfSgpKTtcbn1cblxubWFpblNjcmVlbk1vZHVsZSgpO1xubWVudU1vZHVsZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==