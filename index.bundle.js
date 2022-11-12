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
        let activeList = LISTS.find(list => list.active == true);
        if (!activeList) activeList = LISTS[0];
        return activeList;
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
        getActiveList
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
        const listName = prompt(`New List Name:`);
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
    function updateHeader() {
        const headerListName = document.getElementById(`headerListName`);
        const activeList = listManager.getActiveList();
        headerListName.innerText = activeList.title;
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
        //still todo
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

    (function init() {
        initListeners();
        updateHeader();
    }());
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7O1VDdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isa0RBQWtEO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsSSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvcHVic3ViLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHtcbiAgICBldmVudHM6IHt9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IHsgZXZlbnRzIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gJy4vcHVic3ViLmpzJztcblxuY2xhc3MgTGlzdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsXG4gICAgICAgIGl0ZW1zID0gW10sXG4gICAgICAgIGljb24gPSBgY2hlY2tsaXN0YCxcbiAgICAgICAgY3VzdG9tID0gdHJ1ZSxcbiAgICAgICAgYWN0aXZlID0gZmFsc2VcbiAgICApIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtc1xuICAgICAgICB0aGlzLmljb24gPSBpY29uXG4gICAgICAgIHRoaXMuY3VzdG9tID0gY3VzdG9tXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlXG4gICAgfTtcblxuICAgIHNldCBpc0FjdGl2ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZWxzZSB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBpc0FjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xuICAgIH1cblxuICAgIC8qIGFkZCBpdGVtLCByZW1vdmUgaXRlbSovXG59XG5cbmNvbnN0IGxpc3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgICBsZXQgTElTVFMgPSBbXTtcblxuICAgIGNvbnN0IGNyZWF0ZU5ld0xpc3QgPSAodGl0bGUsIGljb24gPSBgY2hlY2tsaXN0YCwgY3VzdG9tID0gdHJ1ZSkgPT4ge1xuICAgICAgICBsZXQgbGlzdCA9IG5ldyBMaXN0KHRpdGxlLCBbXSwgaWNvbiwgY3VzdG9tKTtcbiAgICAgICAgTElTVFMucHVzaChsaXN0KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0QWN0aXZlTGlzdCA9IChldmVudCkgPT4ge1xuICAgICAgICBMSVNUUy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgbGlzdC5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IExJU1RTLmZpbmQobGlzdCA9PiBsaXN0LnRpdGxlID09IGV2ZW50LnRhcmdldC5uYW1lKTtcbiAgICAgICAgYWN0aXZlTGlzdC5pc0FjdGl2ZSA9IHRydWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEFjdGl2ZUxpc3QgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QuYWN0aXZlID09IHRydWUpO1xuICAgICAgICBpZiAoIWFjdGl2ZUxpc3QpIGFjdGl2ZUxpc3QgPSBMSVNUU1swXTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUxpc3Q7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldExpc3RzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gTElTVFM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0cygpIHtcbiAgICAgICAgY3JlYXRlTmV3TGlzdChgVG9kYXlgLCBgdG9kYXlgLCBmYWxzZSk7XG4gICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRvbW9ycm93YCwgYGV2ZW50YCwgZmFsc2UpO1xuICAgICAgICBjcmVhdGVOZXdMaXN0KGBUaGlzIFdlZWtgLCBgZGF0ZV9yYW5nZWAsIGZhbHNlKTtcblxuICAgICAgICBjcmVhdGVOZXdMaXN0KGBUby1Eb2AsIGBjaGVja2xpc3RgLCB0cnVlKTtcbiAgICAgICAgLy8vL1NlYXJjaCBsb2NhbCBzdG9yYWdlIGFuZCBhZGQgYW55IGxpc3RzIHRvIGN1c3RvbUxpc3RzIGhlcmVcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVOZXdMaXN0LFxuICAgICAgICBnZXRMaXN0cyxcbiAgICAgICAgc2V0QWN0aXZlTGlzdCxcbiAgICAgICAgZ2V0QWN0aXZlTGlzdFxuICAgIH1cbn0pKCk7XG5cbmNvbnN0IG1lbnVNb2R1bGUgPSAoKCkgPT4ge1xuXG4gICAgZnVuY3Rpb24gY2xvc2VNZW51KCkge1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuXG4gICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRCdG4oZXZlbnQpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNlbGVjdGVkYCkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGBzZWxlY3RlZGApO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoYHNlbGVjdGVkYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUxpc3RDbGljayhldmVudCkge1xuICAgICAgICBsaXN0TWFuYWdlci5zZXRBY3RpdmVMaXN0KGV2ZW50KTtcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRCdG4oZXZlbnQpO1xuICAgICAgICBjbG9zZU1lbnUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QnRuTGlzdGVuZXIoYnRuKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGhhbmRsZUxpc3RDbGljayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChsaXN0LmN1c3RvbSA9PSBmYWxzZSkgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByZW1hZGVMaXN0c2ApO1xuICAgICAgICBlbHNlIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjdXN0b21MaXN0c2ApO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChgbWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bi5pZCA9IGxpc3QudGl0bGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBidG4ubmFtZSA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gbGlzdC5pY29uO1xuXG4gICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGJ0blRleHQuaW5uZXJUZXh0ID0gbGlzdC50aXRsZTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGljb25TcGFuKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGJ0blRleHQpO1xuXG4gICAgICAgIHNldEJ0bkxpc3RlbmVyKGJ0bik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZE5ld0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpc3ROYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBOYW1lOmApO1xuICAgICAgICBsaXN0TWFuYWdlci5jcmVhdGVOZXdMaXN0KGxpc3ROYW1lLCBgY2hlY2tsaXN0YCwgdHJ1ZSk7XG4gICAgICAgIG1ha2VCdG4oeyB0aXRsZTogbGlzdE5hbWUsIGljb246IGBjaGVja2xpc3RgLCBjdXN0b206IHRydWUgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZExpc3RMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgYWRkTGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRMaXN0YCk7XG4gICAgICAgIGFkZExpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGROZXdMaXN0KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RzKCkge1xuICAgICAgICBjb25zdCBsaXN0cyA9IGxpc3RNYW5hZ2VyLmdldExpc3RzKCk7XG4gICAgICAgIGxpc3RzLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBtYWtlQnRuKGxpc3QpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgICAgICBhZGRMaXN0TGlzdGVuZXIoKTtcbiAgICB9KCkpO1xuXG59KSgpO1xuXG5jb25zdCBtYWluU2NyZWVuTW9kdWxlID0gKCgpID0+IHtcbiAgICBmdW5jdGlvbiB1cGRhdGVIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckxpc3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGhlYWRlckxpc3ROYW1lYCk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGhlYWRlckxpc3ROYW1lLmlubmVyVGV4dCA9IGFjdGl2ZUxpc3QudGl0bGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2hlY2tib3goZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGNvbnN0IGxpID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGVcbiAgICAgICAgY29uc3QgdGV4dCA9IGxpLmNoaWxkcmVuWzFdO1xuXG4gICAgICAgIGlmIChjaGVja2JveC5pbm5lclRleHQgPT09IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2ApIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IGBjaGVja19ib3hgO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYGxpbmUtdGhyb3VnaGApO1xuICAgICAgICAgICAgbGkuc3R5bGUuc2V0UHJvcGVydHkoYG9wYWNpdHlgLCBgNTAlYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5pbm5lclRleHQgPSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYG5vbmVgKTtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNldFByb3BlcnR5KGBvcGFjaXR5YCwgYDEwMCVgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGFuZEl0ZW0oZXZlbnQpIHtcbiAgICAgICAgLy9zdGlsbCB0b2RvXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRJdGVtTGlzdGVuZXIoaWNvbiwgaXRlbVRleHQpIHtcbiAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZUNoZWNrYm94KTtcbiAgICAgICAgaXRlbVRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBleHBhbmRJdGVtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cE5ld0l0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdEl0ZW1zYClcblxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGxpYCk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoYGxpc3QtaXRlbWApO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGApO1xuICAgICAgICBpY29uLmlubmVyVGV4dCA9IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2A7XG5cbiAgICAgICAgY29uc3QgaXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGl0ZW1UZXh0LmlubmVyVGV4dCA9IGl0ZW1OYW1lO1xuXG4gICAgICAgIHVsLmluc2VydEJlZm9yZShsaSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKSk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpdGVtVGV4dCk7XG5cbiAgICAgICAgc2V0SXRlbUxpc3RlbmVyKGljb24sIGl0ZW1UZXh0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRJdGVtKCkge1xuICAgICAgICBjb25zdCBpdGVtTmFtZSA9IHByb21wdChgTmV3IExpc3QgSXRlbTpgKTtcbiAgICAgICAgc2V0dXBOZXdJdGVtKGl0ZW1OYW1lKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJ0bmApO1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuICAgICAgICBjb25zdCBhZGRJdGVtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKTtcblxuICAgICAgICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIW1lbnVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIGlmICghbWVudUJnLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVCZy5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lbnVCZy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZEl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGRJdGVtKTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdXBkYXRlSGVhZGVyKCk7XG4gICAgfSgpKTtcbn0pKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9