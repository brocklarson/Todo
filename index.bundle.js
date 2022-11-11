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

const menuModule = (() => {
    let LISTS = [];

    function closeMenu() {
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);

        menuContainer.classList.remove(`active`);
        menuBg.classList.remove(`active`);
    };

    function setActiveList(event) {
        LISTS.forEach(list => {
            list.isActive = false;
        });
        const activeList = LISTS.find(list => list.title == event.target.name);
        activeList.isActive = true;

        document.querySelectorAll(`.selected`).forEach(el => {
            el.classList.remove(`selected`);
        });
        event.target.classList.add(`selected`);
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

        LISTS.push(list);
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

    const getLists = () => {
        return LISTS;
    }

    (function init() {
        initLists();
        addListListener();
    }());

    return { getLists };
})();

const mainScreenModule = (() => {
    let LISTS = menuModule.getLists();

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

    function getActiveList() {
        let activeList = LISTS.find(list => list.active == true);
        if (!activeList) activeList = LISTS[0];
        return activeList.title;
    };

    function setupActiveList() {
        //Update Header Title
        const headerListName = document.getElementById(`headerListName`);
        headerListName.innerText = getActiveList();
    }

    (function init() {
        initListeners();
        setupActiveList();
    }());
})();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxhQUFhO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSxcbiAgICAgICAgaXRlbXMgPSBbXSxcbiAgICAgICAgaWNvbiA9IGBjaGVja2xpc3RgLFxuICAgICAgICBjdXN0b20gPSB0cnVlLFxuICAgICAgICBhY3RpdmUgPSBmYWxzZVxuICAgICkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb25cbiAgICAgICAgdGhpcy5jdXN0b20gPSBjdXN0b21cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmVcbiAgICB9O1xuXG4gICAgc2V0IGlzQWN0aXZlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBlbHNlIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgfVxuXG4gICAgLyogYWRkIGl0ZW0sIHJlbW92ZSBpdGVtKi9cbn1cblxuY29uc3QgbWVudU1vZHVsZSA9ICgoKSA9PiB7XG4gICAgbGV0IExJU1RTID0gW107XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1lbnUoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJnYCk7XG5cbiAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgbWVudUJnLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVMaXN0KGV2ZW50KSB7XG4gICAgICAgIExJU1RTLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBsaXN0LmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT0gZXZlbnQudGFyZ2V0Lm5hbWUpO1xuICAgICAgICBhY3RpdmVMaXN0LmlzQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2VsZWN0ZWRgKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYHNlbGVjdGVkYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChgc2VsZWN0ZWRgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTGlzdENsaWNrKGV2ZW50KSB7XG4gICAgICAgIHNldEFjdGl2ZUxpc3QoZXZlbnQpO1xuICAgICAgICBjbG9zZU1lbnUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QnRuTGlzdGVuZXIoYnRuKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGhhbmRsZUxpc3RDbGljayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcblxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChgbWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bi5pZCA9IGxpc3QudGl0bGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBidG4ubmFtZSA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gbGlzdC5pY29uO1xuXG4gICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGJ0blRleHQuaW5uZXJUZXh0ID0gbGlzdC50aXRsZTtcblxuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaWNvblNwYW4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG5cbiAgICAgICAgc2V0QnRuTGlzdGVuZXIoYnRuKTtcbiAgICAgICAgcmV0dXJuIGJ0bjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBMaXN0KHRpdGxlLCBpY29uID0gYGNoZWNrbGlzdGAsIGN1c3RvbSA9IHRydWUpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBuZXcgTGlzdCh0aXRsZSwgW10sIGljb24sIGN1c3RvbSk7XG4gICAgICAgIGxldCBjb250YWluZXI7XG5cbiAgICAgICAgaWYgKGN1c3RvbSA9PSBmYWxzZSkgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByZW1hZGVMaXN0c2ApO1xuICAgICAgICBlbHNlIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjdXN0b21MaXN0c2ApO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9IG1ha2VCdG4obGlzdCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgICAgIExJU1RTLnB1c2gobGlzdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZE5ld0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpc3ROYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBOYW1lOmApO1xuICAgICAgICBzZXR1cExpc3QobGlzdE5hbWUsIGBjaGVja2xpc3RgLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RzKCkge1xuICAgICAgICBzZXR1cExpc3QoYFRvZGF5YCwgYHRvZGF5YCwgZmFsc2UpO1xuICAgICAgICBzZXR1cExpc3QoYFRvbW9ycm93YCwgYGV2ZW50YCwgZmFsc2UpO1xuICAgICAgICBzZXR1cExpc3QoYFRoaXMgV2Vla2AsIGBkYXRlX3JhbmdlYCwgZmFsc2UpO1xuXG4gICAgICAgIHNldHVwTGlzdChgVG8tRG9gLCBgY2hlY2tsaXN0YCwgdHJ1ZSk7XG4gICAgICAgIC8vLy9TZWFyY2ggbG9jYWwgc3RvcmFnZSBhbmQgYWRkIGFueSBsaXN0cyB0byBjdXN0b21MaXN0cyBoZXJlXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZExpc3RMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgYWRkTGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRMaXN0YCk7XG4gICAgICAgIGFkZExpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGROZXdMaXN0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0TGlzdHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBMSVNUUztcbiAgICB9XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RzKCk7XG4gICAgICAgIGFkZExpc3RMaXN0ZW5lcigpO1xuICAgIH0oKSk7XG5cbiAgICByZXR1cm4geyBnZXRMaXN0cyB9O1xufSkoKTtcblxuY29uc3QgbWFpblNjcmVlbk1vZHVsZSA9ICgoKSA9PiB7XG4gICAgbGV0IExJU1RTID0gbWVudU1vZHVsZS5nZXRMaXN0cygpO1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QnRuYCk7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJnYCk7XG5cbiAgICAgICAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgICAgICBpZiAoIW1lbnVCZy5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51QmcuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBtZW51QmcuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldEFjdGl2ZUxpc3QoKSB7XG4gICAgICAgIGxldCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QuYWN0aXZlID09IHRydWUpO1xuICAgICAgICBpZiAoIWFjdGl2ZUxpc3QpIGFjdGl2ZUxpc3QgPSBMSVNUU1swXTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUxpc3QudGl0bGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwQWN0aXZlTGlzdCgpIHtcbiAgICAgICAgLy9VcGRhdGUgSGVhZGVyIFRpdGxlXG4gICAgICAgIGNvbnN0IGhlYWRlckxpc3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGhlYWRlckxpc3ROYW1lYCk7XG4gICAgICAgIGhlYWRlckxpc3ROYW1lLmlubmVyVGV4dCA9IGdldEFjdGl2ZUxpc3QoKTtcbiAgICB9XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RlbmVycygpO1xuICAgICAgICBzZXR1cEFjdGl2ZUxpc3QoKTtcbiAgICB9KCkpO1xufSkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=