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

        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`listUpdate`, LISTS);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`changeActiveList`, activeList);
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

        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`listUpdate`, LISTS);
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
    let LISTS = [];

    function getActiveList() {
        let activeList = LISTS.find(list => list.active == true);
        if (!activeList) activeList = LISTS[0];
        return activeList.title;
    };

    function updateActiveList() {
        //Update Header Title
        const headerListName = document.getElementById(`headerListName`);
        headerListName.innerText = getActiveList();
    }

    function updateLists(pubsubData) {
        LISTS = pubsubData;
    }

    function getStartupList() {
        LISTS = menuModule.getLists();
        updateActiveList();
    }

    function updateCheckbox(event) {
        const checkbox = event.target;
        const li = event.target.parentNode
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
    }

    function expandItem(event) {
        return;
    }

    function setItemListener(icon, itemText) {
        icon.addEventListener('click', updateCheckbox);
        itemText.addEventListener('click', expandItem);
    }

    function setupNewItem(itemName) {
        const ul = document.getElementById(`listItems`)

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
    }

    function addItem() {
        const itemName = prompt(`New List Item:`);
        setupNewItem(itemName)
    }

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

    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.subscribe(`listUpdate`, updateLists);
    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.subscribe(`changeActiveList`, updateActiveList);

    (function init() {
        initListeners();
        getStartupList();
    }());
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7O1VDdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLFFBQVEsc0RBQWM7QUFDdEIsUUFBUSxzREFBYztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxRQUFRLHNEQUFjO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxhQUFhO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBLElBQUksd0RBQWdCO0FBQ3BCLElBQUksd0RBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0ge1xuICAgIGV2ZW50czoge30sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgIH0sXG4gICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdW2ldID09PSBmbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwdWJsaXNoOiBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgeyBldmVudHMgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi9wdWJzdWIuanMnO1xuXG5jbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSxcbiAgICAgICAgaXRlbXMgPSBbXSxcbiAgICAgICAgaWNvbiA9IGBjaGVja2xpc3RgLFxuICAgICAgICBjdXN0b20gPSB0cnVlLFxuICAgICAgICBhY3RpdmUgPSBmYWxzZVxuICAgICkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb25cbiAgICAgICAgdGhpcy5jdXN0b20gPSBjdXN0b21cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmVcbiAgICB9O1xuXG4gICAgc2V0IGlzQWN0aXZlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBlbHNlIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgfVxuXG4gICAgLyogYWRkIGl0ZW0sIHJlbW92ZSBpdGVtKi9cbn1cblxuY29uc3QgbWVudU1vZHVsZSA9ICgoKSA9PiB7XG4gICAgbGV0IExJU1RTID0gW107XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1lbnUoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJnYCk7XG5cbiAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgbWVudUJnLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRBY3RpdmVMaXN0KGV2ZW50KSB7XG4gICAgICAgIExJU1RTLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBsaXN0LmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT0gZXZlbnQudGFyZ2V0Lm5hbWUpO1xuICAgICAgICBhY3RpdmVMaXN0LmlzQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2VsZWN0ZWRgKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYHNlbGVjdGVkYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChgc2VsZWN0ZWRgKTtcblxuICAgICAgICBldmVudHMucHVibGlzaChgbGlzdFVwZGF0ZWAsIExJU1RTKTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYGNoYW5nZUFjdGl2ZUxpc3RgLCBhY3RpdmVMaXN0KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTGlzdENsaWNrKGV2ZW50KSB7XG4gICAgICAgIHNldEFjdGl2ZUxpc3QoZXZlbnQpO1xuICAgICAgICBjbG9zZU1lbnUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QnRuTGlzdGVuZXIoYnRuKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGhhbmRsZUxpc3RDbGljayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcblxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChgbWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bi5pZCA9IGxpc3QudGl0bGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBidG4ubmFtZSA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gbGlzdC5pY29uO1xuXG4gICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGJ0blRleHQuaW5uZXJUZXh0ID0gbGlzdC50aXRsZTtcblxuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaWNvblNwYW4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG5cbiAgICAgICAgc2V0QnRuTGlzdGVuZXIoYnRuKTtcbiAgICAgICAgcmV0dXJuIGJ0bjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBMaXN0KHRpdGxlLCBpY29uID0gYGNoZWNrbGlzdGAsIGN1c3RvbSA9IHRydWUpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBuZXcgTGlzdCh0aXRsZSwgW10sIGljb24sIGN1c3RvbSk7XG4gICAgICAgIGxldCBjb250YWluZXI7XG5cbiAgICAgICAgaWYgKGN1c3RvbSA9PSBmYWxzZSkgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByZW1hZGVMaXN0c2ApO1xuICAgICAgICBlbHNlIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjdXN0b21MaXN0c2ApO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9IG1ha2VCdG4obGlzdCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgICAgIExJU1RTLnB1c2gobGlzdCk7XG5cbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYGxpc3RVcGRhdGVgLCBMSVNUUyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZE5ld0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpc3ROYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBOYW1lOmApO1xuICAgICAgICBzZXR1cExpc3QobGlzdE5hbWUsIGBjaGVja2xpc3RgLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RzKCkge1xuICAgICAgICBzZXR1cExpc3QoYFRvZGF5YCwgYHRvZGF5YCwgZmFsc2UpO1xuICAgICAgICBzZXR1cExpc3QoYFRvbW9ycm93YCwgYGV2ZW50YCwgZmFsc2UpO1xuICAgICAgICBzZXR1cExpc3QoYFRoaXMgV2Vla2AsIGBkYXRlX3JhbmdlYCwgZmFsc2UpO1xuXG4gICAgICAgIHNldHVwTGlzdChgVG8tRG9gLCBgY2hlY2tsaXN0YCwgdHJ1ZSk7XG4gICAgICAgIC8vLy9TZWFyY2ggbG9jYWwgc3RvcmFnZSBhbmQgYWRkIGFueSBsaXN0cyB0byBjdXN0b21MaXN0cyBoZXJlXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZExpc3RMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgYWRkTGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRMaXN0YCk7XG4gICAgICAgIGFkZExpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGROZXdMaXN0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0TGlzdHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBMSVNUUztcbiAgICB9XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RzKCk7XG4gICAgICAgIGFkZExpc3RMaXN0ZW5lcigpO1xuICAgIH0oKSk7XG5cbiAgICByZXR1cm4geyBnZXRMaXN0cyB9O1xufSkoKTtcblxuY29uc3QgbWFpblNjcmVlbk1vZHVsZSA9ICgoKSA9PiB7XG4gICAgbGV0IExJU1RTID0gW107XG5cbiAgICBmdW5jdGlvbiBnZXRBY3RpdmVMaXN0KCkge1xuICAgICAgICBsZXQgYWN0aXZlTGlzdCA9IExJU1RTLmZpbmQobGlzdCA9PiBsaXN0LmFjdGl2ZSA9PSB0cnVlKTtcbiAgICAgICAgaWYgKCFhY3RpdmVMaXN0KSBhY3RpdmVMaXN0ID0gTElTVFNbMF07XG4gICAgICAgIHJldHVybiBhY3RpdmVMaXN0LnRpdGxlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVMaXN0KCkge1xuICAgICAgICAvL1VwZGF0ZSBIZWFkZXIgVGl0bGVcbiAgICAgICAgY29uc3QgaGVhZGVyTGlzdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaGVhZGVyTGlzdE5hbWVgKTtcbiAgICAgICAgaGVhZGVyTGlzdE5hbWUuaW5uZXJUZXh0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpc3RzKHB1YnN1YkRhdGEpIHtcbiAgICAgICAgTElTVFMgPSBwdWJzdWJEYXRhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN0YXJ0dXBMaXN0KCkge1xuICAgICAgICBMSVNUUyA9IG1lbnVNb2R1bGUuZ2V0TGlzdHMoKTtcbiAgICAgICAgdXBkYXRlQWN0aXZlTGlzdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoZWNrYm94KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBsaSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlXG4gICAgICAgIGNvbnN0IHRleHQgPSBsaS5jaGlsZHJlblsxXTtcblxuICAgICAgICBpZiAoY2hlY2tib3guaW5uZXJUZXh0ID09PSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgKSB7XG4gICAgICAgICAgICBjaGVja2JveC5pbm5lclRleHQgPSBgY2hlY2tfYm94YDtcbiAgICAgICAgICAgIHRleHQuc3R5bGUuc2V0UHJvcGVydHkoYHRleHQtZGVjb3JhdGlvbmAsIGBsaW5lLXRocm91Z2hgKTtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNldFByb3BlcnR5KGBvcGFjaXR5YCwgYDUwJWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tib3guaW5uZXJUZXh0ID0gYGNoZWNrX2JveF9vdXRsaW5lX2JsYW5rYDtcbiAgICAgICAgICAgIHRleHQuc3R5bGUuc2V0UHJvcGVydHkoYHRleHQtZGVjb3JhdGlvbmAsIGBub25lYCk7XG4gICAgICAgICAgICBsaS5zdHlsZS5zZXRQcm9wZXJ0eShgb3BhY2l0eWAsIGAxMDAlYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBhbmRJdGVtKGV2ZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRJdGVtTGlzdGVuZXIoaWNvbiwgaXRlbVRleHQpIHtcbiAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZUNoZWNrYm94KTtcbiAgICAgICAgaXRlbVRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBleHBhbmRJdGVtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cE5ld0l0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdEl0ZW1zYClcblxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGxpYCk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoYGxpc3QtaXRlbWApO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGApO1xuICAgICAgICBpY29uLmlubmVyVGV4dCA9IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2A7XG5cbiAgICAgICAgY29uc3QgaXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGl0ZW1UZXh0LmlubmVyVGV4dCA9IGl0ZW1OYW1lO1xuXG4gICAgICAgIHVsLmluc2VydEJlZm9yZShsaSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKSk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpdGVtVGV4dCk7XG5cbiAgICAgICAgc2V0SXRlbUxpc3RlbmVyKGljb24sIGl0ZW1UZXh0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRJdGVtKCkge1xuICAgICAgICBjb25zdCBpdGVtTmFtZSA9IHByb21wdChgTmV3IExpc3QgSXRlbTpgKTtcbiAgICAgICAgc2V0dXBOZXdJdGVtKGl0ZW1OYW1lKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJ0bmApO1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuICAgICAgICBjb25zdCBhZGRJdGVtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKTtcblxuICAgICAgICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIW1lbnVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIGlmICghbWVudUJnLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVCZy5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lbnVCZy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZEl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGRJdGVtKTtcbiAgICB9O1xuXG4gICAgZXZlbnRzLnN1YnNjcmliZShgbGlzdFVwZGF0ZWAsIHVwZGF0ZUxpc3RzKTtcbiAgICBldmVudHMuc3Vic2NyaWJlKGBjaGFuZ2VBY3RpdmVMaXN0YCwgdXBkYXRlQWN0aXZlTGlzdCk7XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RlbmVycygpO1xuICAgICAgICBnZXRTdGFydHVwTGlzdCgpO1xuICAgIH0oKSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==