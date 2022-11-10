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

    /* add item, remove item, set active(?) */
}

const menuModule = () => {
    let _Lists = [];

    function setActiveList(event) {
        _Lists.forEach(list => {
            list.isActive = false;
        });
        const activeList = _Lists.find(list => list.title == event.target.name);
        activeList.isActive = true;
    };

    function setBtnListener(btn) {
        btn.addEventListener(`click`, setActiveList);
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

        if (list.custom == true) {
            const removeIcon = document.createElement(`span`);
            removeIcon.classList.add(`material-symbols-outlined`, `remove-icon`);
            removeIcon.innerText = `close`;

            btn.appendChild(removeIcon);
        }
        setBtnListener(btn);
        return btn;
    };

    function initLists() {
        setupList(`Today`, `today`, false);
        setupList(`Tomorrow`, `event`, false);
        setupList(`This Week`, `date_range`, false);

        setupList(`To-Do`, `checklist`, true);
        ////Search local storage and add any lists to customLists here
    }

    function setupList(title, icon = `checklist`, custom = true) {
        let container;
        let list = new List(title, [], icon, custom);

        if (custom == false) {
            container = document.getElementById(`premadeLists`);
        } else {
            container = document.getElementById(`customLists`);
        }
        _Lists.push(list);

        const btn = makeBtn(list);
        container.appendChild(btn);
    };

    function addNewList() {
        const listName = prompt(`New List Name:`);
        setupList(listName, `checklist`, true);
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSxcbiAgICAgICAgaXRlbXMgPSBbXSxcbiAgICAgICAgaWNvbiA9IGBjaGVja2xpc3RgLFxuICAgICAgICBjdXN0b20gPSB0cnVlLFxuICAgICAgICBhY3RpdmUgPSBmYWxzZVxuICAgICkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb25cbiAgICAgICAgdGhpcy5jdXN0b20gPSBjdXN0b21cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmVcbiAgICB9O1xuXG4gICAgc2V0IGlzQWN0aXZlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBlbHNlIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgfVxuXG4gICAgLyogYWRkIGl0ZW0sIHJlbW92ZSBpdGVtLCBzZXQgYWN0aXZlKD8pICovXG59XG5cbmNvbnN0IG1lbnVNb2R1bGUgPSAoKSA9PiB7XG4gICAgbGV0IF9MaXN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlTGlzdChldmVudCkge1xuICAgICAgICBfTGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgIGxpc3QuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBfTGlzdHMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT0gZXZlbnQudGFyZ2V0Lm5hbWUpO1xuICAgICAgICBhY3RpdmVMaXN0LmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QnRuTGlzdGVuZXIoYnRuKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIHNldEFjdGl2ZUxpc3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcblxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChgbWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bi5pZCA9IGxpc3QudGl0bGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBidG4ubmFtZSA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gbGlzdC5pY29uO1xuXG4gICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGJ0blRleHQuaW5uZXJUZXh0ID0gbGlzdC50aXRsZTtcblxuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaWNvblNwYW4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG5cbiAgICAgICAgaWYgKGxpc3QuY3VzdG9tID09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgICAgICByZW1vdmVJY29uLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgLCBgcmVtb3ZlLWljb25gKTtcbiAgICAgICAgICAgIHJlbW92ZUljb24uaW5uZXJUZXh0ID0gYGNsb3NlYDtcblxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKHJlbW92ZUljb24pO1xuICAgICAgICB9XG4gICAgICAgIHNldEJ0bkxpc3RlbmVyKGJ0bik7XG4gICAgICAgIHJldHVybiBidG47XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0cygpIHtcbiAgICAgICAgc2V0dXBMaXN0KGBUb2RheWAsIGB0b2RheWAsIGZhbHNlKTtcbiAgICAgICAgc2V0dXBMaXN0KGBUb21vcnJvd2AsIGBldmVudGAsIGZhbHNlKTtcbiAgICAgICAgc2V0dXBMaXN0KGBUaGlzIFdlZWtgLCBgZGF0ZV9yYW5nZWAsIGZhbHNlKTtcblxuICAgICAgICBzZXR1cExpc3QoYFRvLURvYCwgYGNoZWNrbGlzdGAsIHRydWUpO1xuICAgICAgICAvLy8vU2VhcmNoIGxvY2FsIHN0b3JhZ2UgYW5kIGFkZCBhbnkgbGlzdHMgdG8gY3VzdG9tTGlzdHMgaGVyZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwTGlzdCh0aXRsZSwgaWNvbiA9IGBjaGVja2xpc3RgLCBjdXN0b20gPSB0cnVlKSB7XG4gICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QodGl0bGUsIFtdLCBpY29uLCBjdXN0b20pO1xuXG4gICAgICAgIGlmIChjdXN0b20gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcmVtYWRlTGlzdHNgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjdXN0b21MaXN0c2ApO1xuICAgICAgICB9XG4gICAgICAgIF9MaXN0cy5wdXNoKGxpc3QpO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9IG1ha2VCdG4obGlzdCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGROZXdMaXN0KCkge1xuICAgICAgICBjb25zdCBsaXN0TmFtZSA9IHByb21wdChgTmV3IExpc3QgTmFtZTpgKTtcbiAgICAgICAgc2V0dXBMaXN0KGxpc3ROYW1lLCBgY2hlY2tsaXN0YCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkTGlzdExpc3RlbmVyKCkge1xuICAgICAgICBjb25zdCBhZGRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZExpc3RgKTtcbiAgICAgICAgYWRkTGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGFkZE5ld0xpc3QpO1xuICAgIH07XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RzKCk7XG4gICAgICAgIGFkZExpc3RMaXN0ZW5lcigpO1xuICAgIH0oKSk7XG59O1xuXG5jb25zdCBtYWluU2NyZWVuTW9kdWxlID0gKCkgPT4ge1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QnRuYCk7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJnYCk7XG5cbiAgICAgICAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgICAgICBpZiAoIW1lbnVCZy5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51QmcuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBtZW51QmcuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgICAgICBpZiAobWVudUJnLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0ZW5lcnMoKTtcbiAgICB9KCkpO1xufVxuXG5tYWluU2NyZWVuTW9kdWxlKCk7XG5tZW51TW9kdWxlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9