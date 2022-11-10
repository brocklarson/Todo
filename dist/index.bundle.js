/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
class List {
    constructor(title,
        items = [],
        icon = `checklist`,
        custom = true,
        active = false
    ) {
        this.title = title
        this.items = items
        this.icon = icon
        this.custom = custom
        this.active = active
    };

    set isActive(value) {
        if (value) this.active = true;
        else this.active = false;
    }

    get isActive() {
        return this.active;
    }

    /* add item, remove item*/
}

const menuModule = () => {
    let _Lists = [];

    function closeMenu() {
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);

        menuContainer.classList.remove(`active`);
        menuBg.classList.remove(`active`);
    };

    function setActiveList(event) {
        _Lists.forEach(list => {
            list.isActive = false;
        });
        const activeList = _Lists.find(list => list.title == event.target.name);
        activeList.isActive = true;
    };

    function handleListClick(event) {
        setActiveList(event);
        closeMenu();
    };

    function setBtnListener(btn) {
        btn.addEventListener(`click`, handleListClick);
    };

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

        if (list.custom == true) {
            const removeIcon = document.createElement(`span`);
            removeIcon.classList.add(`material-symbols-outlined`, `remove-icon`);
            removeIcon.innerText = `close`;

            btn.appendChild(removeIcon);
        }
        setBtnListener(btn);
        return btn;
    };

    function setupList(title, icon = `checklist`, custom = true) {
        let list = new List(title, [], icon, custom);
        let container;

        if (custom == false) container = document.getElementById(`premadeLists`);
        else container = document.getElementById(`customLists`);

        const btn = makeBtn(list);
        container.appendChild(btn);

        _Lists.push(list);
    };

    function addNewList() {
        const listName = prompt(`New List Name:`);
        setupList(listName, `checklist`, true);
    };

    function initLists() {
        setupList(`Today`, `today`, false);
        setupList(`Tomorrow`, `event`, false);
        setupList(`This Week`, `date_range`, false);

        setupList(`To-Do`, `checklist`, true);
        ////Search local storage and add any lists to customLists here
    };

    function addListListener() {
        const addListBtn = document.getElementById(`addList`);
        addListBtn.addEventListener(`click`, addNewList);
    };

    (function init() {
        initLists();
        addListListener();
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
            menuContainer.classList.remove(`active`);
            menuBg.classList.remove(`active`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsYSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTGlzdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsXG4gICAgICAgIGl0ZW1zID0gW10sXG4gICAgICAgIGljb24gPSBgY2hlY2tsaXN0YCxcbiAgICAgICAgY3VzdG9tID0gdHJ1ZSxcbiAgICAgICAgYWN0aXZlID0gZmFsc2VcbiAgICApIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtc1xuICAgICAgICB0aGlzLmljb24gPSBpY29uXG4gICAgICAgIHRoaXMuY3VzdG9tID0gY3VzdG9tXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlXG4gICAgfTtcblxuICAgIHNldCBpc0FjdGl2ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZWxzZSB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBpc0FjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xuICAgIH1cblxuICAgIC8qIGFkZCBpdGVtLCByZW1vdmUgaXRlbSovXG59XG5cbmNvbnN0IG1lbnVNb2R1bGUgPSAoKSA9PiB7XG4gICAgbGV0IF9MaXN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY2xvc2VNZW51KCkge1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuXG4gICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlTGlzdChldmVudCkge1xuICAgICAgICBfTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgIGxpc3QuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBfTGlzdHMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT0gZXZlbnQudGFyZ2V0Lm5hbWUpO1xuICAgICAgICBhY3RpdmVMaXN0LmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTGlzdENsaWNrKGV2ZW50KSB7XG4gICAgICAgIHNldEFjdGl2ZUxpc3QoZXZlbnQpO1xuICAgICAgICBjbG9zZU1lbnUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QnRuTGlzdGVuZXIoYnRuKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGhhbmRsZUxpc3RDbGljayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcblxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChgbWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bi5pZCA9IGxpc3QudGl0bGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBidG4ubmFtZSA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gbGlzdC5pY29uO1xuXG4gICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGJ0blRleHQuaW5uZXJUZXh0ID0gbGlzdC50aXRsZTtcblxuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaWNvblNwYW4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG5cbiAgICAgICAgaWYgKGxpc3QuY3VzdG9tID09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgICAgICByZW1vdmVJY29uLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgLCBgcmVtb3ZlLWljb25gKTtcbiAgICAgICAgICAgIHJlbW92ZUljb24uaW5uZXJUZXh0ID0gYGNsb3NlYDtcblxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKHJlbW92ZUljb24pO1xuICAgICAgICB9XG4gICAgICAgIHNldEJ0bkxpc3RlbmVyKGJ0bik7XG4gICAgICAgIHJldHVybiBidG47XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwTGlzdCh0aXRsZSwgaWNvbiA9IGBjaGVja2xpc3RgLCBjdXN0b20gPSB0cnVlKSB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QodGl0bGUsIFtdLCBpY29uLCBjdXN0b20pO1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChjdXN0b20gPT0gZmFsc2UpIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcmVtYWRlTGlzdHNgKTtcbiAgICAgICAgZWxzZSBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY3VzdG9tTGlzdHNgKTtcblxuICAgICAgICBjb25zdCBidG4gPSBtYWtlQnRuKGxpc3QpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcblxuICAgICAgICBfTGlzdHMucHVzaChsaXN0KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkTmV3TGlzdCgpIHtcbiAgICAgICAgY29uc3QgbGlzdE5hbWUgPSBwcm9tcHQoYE5ldyBMaXN0IE5hbWU6YCk7XG4gICAgICAgIHNldHVwTGlzdChsaXN0TmFtZSwgYGNoZWNrbGlzdGAsIHRydWUpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdHMoKSB7XG4gICAgICAgIHNldHVwTGlzdChgVG9kYXlgLCBgdG9kYXlgLCBmYWxzZSk7XG4gICAgICAgIHNldHVwTGlzdChgVG9tb3Jyb3dgLCBgZXZlbnRgLCBmYWxzZSk7XG4gICAgICAgIHNldHVwTGlzdChgVGhpcyBXZWVrYCwgYGRhdGVfcmFuZ2VgLCBmYWxzZSk7XG5cbiAgICAgICAgc2V0dXBMaXN0KGBUby1Eb2AsIGBjaGVja2xpc3RgLCB0cnVlKTtcbiAgICAgICAgLy8vL1NlYXJjaCBsb2NhbCBzdG9yYWdlIGFuZCBhZGQgYW55IGxpc3RzIHRvIGN1c3RvbUxpc3RzIGhlcmVcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkTGlzdExpc3RlbmVyKCkge1xuICAgICAgICBjb25zdCBhZGRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZExpc3RgKTtcbiAgICAgICAgYWRkTGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGFkZE5ld0xpc3QpO1xuICAgIH07XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RzKCk7XG4gICAgICAgIGFkZExpc3RMaXN0ZW5lcigpO1xuICAgIH0oKSk7XG59O1xuXG5jb25zdCBtYWluU2NyZWVuTW9kdWxlID0gKCkgPT4ge1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QnRuYCk7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJnYCk7XG5cbiAgICAgICAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgICAgICBpZiAoIW1lbnVCZy5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51QmcuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBtZW51QmcuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdGVuZXJzKCk7XG4gICAgfSgpKTtcbn1cblxubWFpblNjcmVlbk1vZHVsZSgpO1xubWVudU1vZHVsZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==