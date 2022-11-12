/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pubsub.js":
/*!***********************!*\
  !*** ./src/pubsub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "events": () => (/* binding */ events)
/* harmony export */ });
const events = {
    events: {},
    subscribe: function(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    unsubscribe: function(eventName, fn) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    publish: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub.js */ "./src/pubsub.js");


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

    newItem(itemName) {
        this.items.push({ name: itemName, notes: ``, completed: false });
    }

    updateItemStatus(itemName) {
        const item = this.items.find(item => item.name === itemName);
        item.completed = !item.completed;
    }

    /* remove item, change item status, change item name, change list title*/
}

const listManager = (() => {
    let LISTS = [];

    const createNewList = (title, icon = `checklist`, custom = true) => {
        let list = new List(title, [], icon, custom);
        LISTS.push(list);
    };

    const setActiveList = (event) => {
        LISTS.forEach(list => {
            list.isActive = false;
        });
        const activeList = LISTS.find(list => list.title == event.target.name);
        activeList.isActive = true;
    };

    const getActiveList = () => {
        let activeList = LISTS.find(list => list.isActive == true);
        if (!activeList) activeList = LISTS[0];
        return activeList;
    };

    const manageItems = (itemName, action) => {
        const list = getActiveList();
        if (action === `new`) list.newItem(itemName);
        if (action === `statusChange`) list.updateItemStatus(itemName);
    };

    const getLists = () => {
        return LISTS;
    };

    function initLists() {
        createNewList(`Today`, `today`, false);
        createNewList(`Tomorrow`, `event`, false);
        createNewList(`This Week`, `date_range`, false);

        createNewList(`To-Do`, `checklist`, true);
        ////Search local storage and add any lists to customLists here
    };

    (function init() {
        initLists();
    })();

    return {
        createNewList,
        getLists,
        setActiveList,
        getActiveList,
        manageItems
    }
})();

const menuModule = (() => {

    function closeMenu() {
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);

        menuContainer.classList.remove(`active`);
        menuBg.classList.remove(`active`);
    };

    function updateSelectedBtn(event) {
        document.querySelectorAll(`.selected`).forEach(el => {
            el.classList.remove(`selected`);
        });
        event.target.classList.add(`selected`);
    };

    function handleListClick(event) {
        listManager.setActiveList(event);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`updateActiveList`, event)
        updateSelectedBtn(event);
        closeMenu();
    };

    function setBtnListener(btn) {
        btn.addEventListener(`click`, handleListClick);
    };

    function makeBtn(list) {
        let container;

        if (list.custom == false) container = document.getElementById(`premadeLists`);
        else container = document.getElementById(`customLists`);

        const btn = document.createElement(`button`);
        btn.classList.add(`menu-buttons`);
        btn.id = list.title.replace(/\s/g, "");
        btn.name = list.title;

        const iconSpan = document.createElement(`span`);
        iconSpan.classList.add(`material-symbols-outlined`);
        iconSpan.innerText = list.icon;

        const btnText = document.createElement(`span`);
        btnText.innerText = list.title;

        container.appendChild(btn);
        btn.appendChild(iconSpan);
        btn.appendChild(btnText);

        setBtnListener(btn);
    };

    function addNewList() {
        const listName = prompt(`New List Name:`); //Setup validation that that list name doesn't already exist
        listManager.createNewList(listName, `checklist`, true);
        makeBtn({ title: listName, icon: `checklist`, custom: true });
    };

    function addListListener() {
        const addListBtn = document.getElementById(`addList`);
        addListBtn.addEventListener(`click`, addNewList);
    };

    function initLists() {
        const lists = listManager.getLists();
        lists.forEach(list => {
            makeBtn(list);
        });
    };

    (function init() {
        initLists();
        addListListener();
    }());

})();

const mainScreenModule = (() => {
    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.subscribe(`updateActiveList`, updateActiveList);

    function updateHeader() {
        const headerListName = document.getElementById(`headerListName`);
        const activeList = listManager.getActiveList();
        headerListName.innerText = activeList.title;
    };

    function updateActiveList() {
        updateHeader();
        //update list items
    }

    function updateCheckbox(event) {
        const checkbox = event.target;
        const li = event.target.parentNode;
        const text = li.children[1];

        if (checkbox.innerText === `check_box_outline_blank`) {
            checkbox.innerText = `check_box`;
            text.style.setProperty(`text-decoration`, `line-through`);
            li.style.setProperty(`opacity`, `50%`);
        } else {
            checkbox.innerText = `check_box_outline_blank`;
            text.style.setProperty(`text-decoration`, `none`);
            li.style.setProperty(`opacity`, `100%`);
        }

        listManager.manageItems(text.innerText, `statusChange`);
    };

    function expandItem(event) {
        //still todo
        return;
    };

    function setItemListener(icon, itemText) {
        icon.addEventListener('click', updateCheckbox);
        itemText.addEventListener('click', expandItem);
    };

    function setupNewItem(itemName) {
        const ul = document.getElementById(`listItems`);

        const li = document.createElement(`li`);
        li.classList.add(`list-item`);

        const icon = document.createElement(`span`);
        icon.classList.add(`material-symbols-outlined`);
        icon.innerText = `check_box_outline_blank`;

        const itemText = document.createElement(`span`);
        itemText.innerText = itemName;

        ul.insertBefore(li, document.getElementById(`addItem`));
        li.appendChild(icon);
        li.appendChild(itemText);

        setItemListener(icon, itemText);
    };

    function addItem() {
        const itemName = prompt(`New List Item:`); //Setup validation that that item name doesn't already exist
        setupNewItem(itemName);
        listManager.manageItems(itemName, `new`);
    };

    function initListeners() {
        const menuButton = document.getElementById(`menuBtn`);
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);
        const addItemBtn = document.getElementById(`addItem`);

        menuButton.addEventListener(`click`, function() {
            if (!menuContainer.classList.contains(`active`)) menuContainer.classList.add(`active`);
            if (!menuBg.classList.contains(`active`)) menuBg.classList.add(`active`);
        });
        menuBg.addEventListener(`click`, function() {
            menuContainer.classList.remove(`active`);
            menuBg.classList.remove(`active`);
        });
        addItemBtn.addEventListener(`click`, addItem);
    };

    (function init() {
        initListeners();
        updateHeader();
    }());
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7O1VDdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQiw2Q0FBNkM7QUFDdkU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsc0RBQWM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQSxrQkFBa0Isa0RBQWtEO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsQ0FBQzs7QUFFRDtBQUNBLElBQUksd0RBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0ge1xuICAgIGV2ZW50czoge30sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgIH0sXG4gICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdW2ldID09PSBmbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwdWJsaXNoOiBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgeyBldmVudHMgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi9wdWJzdWIuanMnO1xuXG5jbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSxcbiAgICAgICAgaXRlbXMgPSBbXSxcbiAgICAgICAgaWNvbiA9IGBjaGVja2xpc3RgLFxuICAgICAgICBjdXN0b20gPSB0cnVlLFxuICAgICAgICBhY3RpdmUgPSBmYWxzZVxuICAgICkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb25cbiAgICAgICAgdGhpcy5jdXN0b20gPSBjdXN0b21cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmVcbiAgICB9O1xuXG4gICAgc2V0IGlzQWN0aXZlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBlbHNlIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgfVxuXG4gICAgbmV3SXRlbShpdGVtTmFtZSkge1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goeyBuYW1lOiBpdGVtTmFtZSwgbm90ZXM6IGBgLCBjb21wbGV0ZWQ6IGZhbHNlIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW1TdGF0dXMoaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBpdGVtLmNvbXBsZXRlZCA9ICFpdGVtLmNvbXBsZXRlZDtcbiAgICB9XG5cbiAgICAvKiByZW1vdmUgaXRlbSwgY2hhbmdlIGl0ZW0gc3RhdHVzLCBjaGFuZ2UgaXRlbSBuYW1lLCBjaGFuZ2UgbGlzdCB0aXRsZSovXG59XG5cbmNvbnN0IGxpc3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgICBsZXQgTElTVFMgPSBbXTtcblxuICAgIGNvbnN0IGNyZWF0ZU5ld0xpc3QgPSAodGl0bGUsIGljb24gPSBgY2hlY2tsaXN0YCwgY3VzdG9tID0gdHJ1ZSkgPT4ge1xuICAgICAgICBsZXQgbGlzdCA9IG5ldyBMaXN0KHRpdGxlLCBbXSwgaWNvbiwgY3VzdG9tKTtcbiAgICAgICAgTElTVFMucHVzaChsaXN0KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0QWN0aXZlTGlzdCA9IChldmVudCkgPT4ge1xuICAgICAgICBMSVNUUy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgbGlzdC5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IExJU1RTLmZpbmQobGlzdCA9PiBsaXN0LnRpdGxlID09IGV2ZW50LnRhcmdldC5uYW1lKTtcbiAgICAgICAgYWN0aXZlTGlzdC5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEFjdGl2ZUxpc3QgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QuaXNBY3RpdmUgPT0gdHJ1ZSk7XG4gICAgICAgIGlmICghYWN0aXZlTGlzdCkgYWN0aXZlTGlzdCA9IExJU1RTWzBdO1xuICAgICAgICByZXR1cm4gYWN0aXZlTGlzdDtcbiAgICB9O1xuXG4gICAgY29uc3QgbWFuYWdlSXRlbXMgPSAoaXRlbU5hbWUsIGFjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBsaXN0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBpZiAoYWN0aW9uID09PSBgbmV3YCkgbGlzdC5uZXdJdGVtKGl0ZW1OYW1lKTtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gYHN0YXR1c0NoYW5nZWApIGxpc3QudXBkYXRlSXRlbVN0YXR1cyhpdGVtTmFtZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldExpc3RzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gTElTVFM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0cygpIHtcbiAgICAgICAgY3JlYXRlTmV3TGlzdChgVG9kYXlgLCBgdG9kYXlgLCBmYWxzZSk7XG4gICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRvbW9ycm93YCwgYGV2ZW50YCwgZmFsc2UpO1xuICAgICAgICBjcmVhdGVOZXdMaXN0KGBUaGlzIFdlZWtgLCBgZGF0ZV9yYW5nZWAsIGZhbHNlKTtcblxuICAgICAgICBjcmVhdGVOZXdMaXN0KGBUby1Eb2AsIGBjaGVja2xpc3RgLCB0cnVlKTtcbiAgICAgICAgLy8vL1NlYXJjaCBsb2NhbCBzdG9yYWdlIGFuZCBhZGQgYW55IGxpc3RzIHRvIGN1c3RvbUxpc3RzIGhlcmVcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVOZXdMaXN0LFxuICAgICAgICBnZXRMaXN0cyxcbiAgICAgICAgc2V0QWN0aXZlTGlzdCxcbiAgICAgICAgZ2V0QWN0aXZlTGlzdCxcbiAgICAgICAgbWFuYWdlSXRlbXNcbiAgICB9XG59KSgpO1xuXG5jb25zdCBtZW51TW9kdWxlID0gKCgpID0+IHtcblxuICAgIGZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcbiAgICAgICAgY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG4gICAgICAgIGNvbnN0IG1lbnVCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QmdgKTtcblxuICAgICAgICBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQnRuKGV2ZW50KSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zZWxlY3RlZGApLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShgc2VsZWN0ZWRgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKGBzZWxlY3RlZGApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVMaXN0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGlzdE1hbmFnZXIuc2V0QWN0aXZlTGlzdChldmVudCk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKGB1cGRhdGVBY3RpdmVMaXN0YCwgZXZlbnQpXG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkQnRuKGV2ZW50KTtcbiAgICAgICAgY2xvc2VNZW51KCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldEJ0bkxpc3RlbmVyKGJ0bikge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBoYW5kbGVMaXN0Q2xpY2spO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWtlQnRuKGxpc3QpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcblxuICAgICAgICBpZiAobGlzdC5jdXN0b20gPT0gZmFsc2UpIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcmVtYWRlTGlzdHNgKTtcbiAgICAgICAgZWxzZSBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY3VzdG9tTGlzdHNgKTtcblxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoYG1lbnUtYnV0dG9uc2ApO1xuICAgICAgICBidG4uaWQgPSBsaXN0LnRpdGxlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgYnRuLm5hbWUgPSBsaXN0LnRpdGxlO1xuXG4gICAgICAgIGNvbnN0IGljb25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBpY29uU3Bhbi5jbGFzc0xpc3QuYWRkKGBtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkYCk7XG4gICAgICAgIGljb25TcGFuLmlubmVyVGV4dCA9IGxpc3QuaWNvbjtcblxuICAgICAgICBjb25zdCBidG5UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBidG5UZXh0LmlubmVyVGV4dCA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChpY29uU3Bhbik7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChidG5UZXh0KTtcblxuICAgICAgICBzZXRCdG5MaXN0ZW5lcihidG4pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGROZXdMaXN0KCkge1xuICAgICAgICBjb25zdCBsaXN0TmFtZSA9IHByb21wdChgTmV3IExpc3QgTmFtZTpgKTsgLy9TZXR1cCB2YWxpZGF0aW9uIHRoYXQgdGhhdCBsaXN0IG5hbWUgZG9lc24ndCBhbHJlYWR5IGV4aXN0XG4gICAgICAgIGxpc3RNYW5hZ2VyLmNyZWF0ZU5ld0xpc3QobGlzdE5hbWUsIGBjaGVja2xpc3RgLCB0cnVlKTtcbiAgICAgICAgbWFrZUJ0bih7IHRpdGxlOiBsaXN0TmFtZSwgaWNvbjogYGNoZWNrbGlzdGAsIGN1c3RvbTogdHJ1ZSB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkTGlzdExpc3RlbmVyKCkge1xuICAgICAgICBjb25zdCBhZGRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZExpc3RgKTtcbiAgICAgICAgYWRkTGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGFkZE5ld0xpc3QpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdHMoKSB7XG4gICAgICAgIGNvbnN0IGxpc3RzID0gbGlzdE1hbmFnZXIuZ2V0TGlzdHMoKTtcbiAgICAgICAgbGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgIG1ha2VCdG4obGlzdCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RzKCk7XG4gICAgICAgIGFkZExpc3RMaXN0ZW5lcigpO1xuICAgIH0oKSk7XG5cbn0pKCk7XG5cbmNvbnN0IG1haW5TY3JlZW5Nb2R1bGUgPSAoKCkgPT4ge1xuICAgIGV2ZW50cy5zdWJzY3JpYmUoYHVwZGF0ZUFjdGl2ZUxpc3RgLCB1cGRhdGVBY3RpdmVMaXN0KTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyTGlzdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaGVhZGVyTGlzdE5hbWVgKTtcbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IGxpc3RNYW5hZ2VyLmdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgaGVhZGVyTGlzdE5hbWUuaW5uZXJUZXh0ID0gYWN0aXZlTGlzdC50aXRsZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlQWN0aXZlTGlzdCgpIHtcbiAgICAgICAgdXBkYXRlSGVhZGVyKCk7XG4gICAgICAgIC8vdXBkYXRlIGxpc3QgaXRlbXNcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGVja2JveChldmVudCkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgbGkgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgY29uc3QgdGV4dCA9IGxpLmNoaWxkcmVuWzFdO1xuXG4gICAgICAgIGlmIChjaGVja2JveC5pbm5lclRleHQgPT09IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2ApIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IGBjaGVja19ib3hgO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYGxpbmUtdGhyb3VnaGApO1xuICAgICAgICAgICAgbGkuc3R5bGUuc2V0UHJvcGVydHkoYG9wYWNpdHlgLCBgNTAlYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5pbm5lclRleHQgPSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYG5vbmVgKTtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNldFByb3BlcnR5KGBvcGFjaXR5YCwgYDEwMCVgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RNYW5hZ2VyLm1hbmFnZUl0ZW1zKHRleHQuaW5uZXJUZXh0LCBgc3RhdHVzQ2hhbmdlYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4cGFuZEl0ZW0oZXZlbnQpIHtcbiAgICAgICAgLy9zdGlsbCB0b2RvXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0SXRlbUxpc3RlbmVyKGljb24sIGl0ZW1UZXh0KSB7XG4gICAgICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVDaGVja2JveCk7XG4gICAgICAgIGl0ZW1UZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXhwYW5kSXRlbSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwTmV3SXRlbShpdGVtTmFtZSkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsaXN0SXRlbXNgKTtcblxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGxpYCk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoYGxpc3QtaXRlbWApO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGApO1xuICAgICAgICBpY29uLmlubmVyVGV4dCA9IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2A7XG5cbiAgICAgICAgY29uc3QgaXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGl0ZW1UZXh0LmlubmVyVGV4dCA9IGl0ZW1OYW1lO1xuXG4gICAgICAgIHVsLmluc2VydEJlZm9yZShsaSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKSk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpdGVtVGV4dCk7XG5cbiAgICAgICAgc2V0SXRlbUxpc3RlbmVyKGljb24sIGl0ZW1UZXh0KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkSXRlbSgpIHtcbiAgICAgICAgY29uc3QgaXRlbU5hbWUgPSBwcm9tcHQoYE5ldyBMaXN0IEl0ZW06YCk7IC8vU2V0dXAgdmFsaWRhdGlvbiB0aGF0IHRoYXQgaXRlbSBuYW1lIGRvZXNuJ3QgYWxyZWFkeSBleGlzdFxuICAgICAgICBzZXR1cE5ld0l0ZW0oaXRlbU5hbWUpO1xuICAgICAgICBsaXN0TWFuYWdlci5tYW5hZ2VJdGVtcyhpdGVtTmFtZSwgYG5ld2ApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBtZW51QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCdG5gKTtcbiAgICAgICAgY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG4gICAgICAgIGNvbnN0IG1lbnVCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QmdgKTtcbiAgICAgICAgY29uc3QgYWRkSXRlbUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRJdGVtYCk7XG5cbiAgICAgICAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgICAgICBpZiAoIW1lbnVCZy5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51QmcuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBtZW51QmcuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgYWRkSXRlbSk7XG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdGVuZXJzKCk7XG4gICAgICAgIHVwZGF0ZUhlYWRlcigpO1xuICAgIH0oKSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==