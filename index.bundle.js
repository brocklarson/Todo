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



/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage)
/* harmony export */ });
/* harmony import */ var _pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub.js */ "./src/pubsub.js");


_pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.subscribe('updateLocalStorage', function(data) { updateLocalStorage(data[0], data[1]) });

function updateLocalStorage(name, data) {
    if (_storageAvailable('localStorage')) {
        localStorage.setItem(name, JSON.stringify(data));
    }
}

function getLocalStorage(data) {
    if (_storageAvailable('localStorage')) {
        if (localStorage.getItem(data)) {
            return JSON.parse(localStorage.getItem(data));
        }
    }
}

function _storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}



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
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");



//Update checkbox when setting up list items read from local storage
//Add functionality for due dates
//Update due date when setting up lists items read from local storage

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
    };

    get isActive() {
        return this.active;
    };

    newItem(itemName) {
        this.items.push({ name: itemName, notes: ``, dueDate: ``, completed: false });
    };

    updateItemStatus(itemName) {
        const item = this.items.find(item => item.name === itemName);
        item.completed = !item.completed;
    };

    deleteItem(itemName) {
        const index = this.items.findIndex(item => item.name === itemName);
        this.items.splice(index, 1);
    };
}
const listManager = (() => {
    let LISTS = [];

    function updateLocalStorage(name, data) {
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`updateLocalStorage`, [name, data]);
    };

    const createNewList = (title, items = [], icon = `checklist`, custom = true, active = false) => {
        let list = new List(title, items, icon, custom, active);
        LISTS.push(list);
        updateLocalStorage(`LISTS`, LISTS);
    };

    const setActiveList = (event, fromStorage = null) => {
        let selectedList;
        if (event) selectedList = event.target.name;
        else if (fromStorage) selectedList = fromStorage.title;
        else selectedList = LISTS[0].title;

        LISTS.forEach(list => {
            list.isActive = false;
        });

        const activeList = LISTS.find(list => list.title == selectedList);
        activeList.isActive = true;

        updateLocalStorage(`activeList`, activeList);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`updateActiveList`);
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
        updateLocalStorage(`LISTS`, LISTS);
    };

    const getLists = () => {
        return LISTS;
    };

    const deleteList = () => {
        if (!window.confirm('Delete List?')) return;
        const activeList = getActiveList();
        const index = LISTS.findIndex(list => list.title === activeList.title);
        LISTS.splice(index, 1);

        updateLocalStorage(`LISTS`, LISTS);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`deleteList`, activeList.title);
    };

    const deleteItem = (event) => {
        if (!window.confirm('Delete Item?')) return;
        const list = getActiveList();
        const itemName = event.target.parentNode.childNodes[1].innerText;
        list.deleteItem(itemName);

        updateLocalStorage(`LISTS`, LISTS);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`deleteItem`, itemName);
    };

    function initLists() {
        if ((0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)('LISTS')) {
            const lists = (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)('LISTS');
            lists.forEach(list => {
                createNewList(list.title, list.items, list.icon, list.custom, list.active)
            });
        } else {
            createNewList(`Today`, [], `today`, false, false);
            createNewList(`Tomorrow`, [], `event`, false, false);
            createNewList(`This Week`, [], `date_range`, false, false);
            createNewList(`To-Do`, [], `checklist`, true, false);
        };
    };

    function initActiveList() {
        if ((0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)('activeList')) {
            const activeList = (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.getLocalStorage)('activeList');
            setActiveList(null, activeList);
        } else {};
    };

    (function init() {
        initLists();
        initActiveList();
    })();

    return {
        createNewList,
        getLists,
        setActiveList,
        getActiveList,
        manageItems,
        deleteList,
        deleteItem
    }
})();

const menuModule = (() => {
    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.subscribe(`deleteList`, resetLists);

    function resetLists(listName) {
        const menuLists = document.querySelectorAll(`.menu-buttons`);
        const element = Array.from(menuLists).find(list => list.name === listName);
        element.remove();
        listManager.setActiveList();
    };

    function closeMenu() {
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);

        menuContainer.classList.remove(`active`);
        menuBg.classList.remove(`active`);
    };

    function updateSelectedBtn(event) {
        let selectedList;
        if (event) selectedList = event.target;
        else {
            const activeList = listManager.getActiveList();
            const menuLists = document.querySelectorAll(`.menu-buttons`);
            selectedList = Array.from(menuLists).find(list => list.name === activeList.title);
        }
        document.querySelectorAll(`.selected`).forEach(el => {
            el.classList.remove(`selected`);
        });
        selectedList.classList.add(`selected`);
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
        const lists = listManager.getLists();
        let listName = prompt(`New List Name:`);
        if (!listName) return;

        let invalid = lists.find(list => list.title === listName);
        let counter = 0;
        while (invalid) {
            listName = prompt(`List Name already used. Please use a different list name:`);
            invalid = lists.find(list => list.title === listName);
            counter++;
            if (counter >= 5) {
                window.alert(`Error creating list. Please try again`);
                return;
            }
        };

        listManager.createNewList(listName, [], `checklist`, true, false);
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
        updateSelectedBtn();
    }());

})();

const mainScreenModule = (() => {
    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.subscribe(`updateActiveList`, updateActiveList);
    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.subscribe(`deleteItem`, deleteListItem);

    function deleteListItem(itemName) {
        const items = document.querySelectorAll(`.list-item`);
        const element = Array.from(items).find(item => item.childNodes[1].innerText === itemName);
        element.remove();
    };

    function updateHeader(activeList) {
        const headerListName = document.getElementById(`headerListName`);
        headerListName.innerText = activeList.title;
    };

    function updateListItems(activeList) {
        const li = document.getElementsByClassName(`list-item`);
        while (li.length > 0) {
            li[0].parentNode.removeChild(li[0]);
        }

        activeList.items.forEach(item => {
            setupNewItem(item.name, item.completed);
        });
    };

    function checkCustomList(activeList) {
        const addItemBtn = document.getElementById(`addItem`);
        const listOptionsIcon = document.getElementById(`listOptions`);

        if (activeList.custom == false) {
            addItemBtn.classList.add(`removed`);
            listOptionsIcon.classList.add(`removed`);
        } else {
            addItemBtn.classList.remove(`removed`);
            listOptionsIcon.classList.remove(`removed`);
        }
    };

    function updateActiveList() {
        const activeList = listManager.getActiveList();
        updateHeader(activeList);
        updateListItems(activeList);
        checkCustomList(activeList);
    };

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



    function setItemListener(icon, itemOptions) {
        icon.addEventListener('click', updateCheckbox);
        itemOptions.addEventListener(`click`, listManager.deleteItem);
    };

    function setupNewItem(itemName, completed) {
        const ul = document.getElementById(`listItems`);

        const li = document.createElement(`li`);
        li.classList.add(`list-item`);

        const icon = document.createElement(`span`);
        icon.classList.add(`material-symbols-outlined`, `item-checkbox`);
        icon.innerText = `check_box_outline_blank`;
        //check if item is completed when bringing in from localstorage

        const itemText = document.createElement(`span`);
        itemText.classList.add(`item-text`);
        itemText.innerText = itemName;

        //Add due date functionality
        const dueDate = document.createElement(`p`);
        dueDate.classList.add(`item-dueDate`);
        dueDate.innerText = `--/--/--`;

        const itemOptions = document.createElement(`span`);
        itemOptions.classList.add(`material-symbols-outlined`, `item-options`);
        itemOptions.innerText = `delete`;

        ul.insertBefore(li, document.getElementById(`addItem`));
        li.appendChild(icon);
        li.appendChild(itemText);
        li.appendChild(dueDate);
        li.appendChild(itemOptions);

        setItemListener(icon, itemOptions);
    };

    function addItem() {
        const list = listManager.getActiveList();
        let itemName = prompt(`New List Item:`);
        if (!itemName) return;

        let invalid = list.items.find(item => item.name === itemName);
        let counter = 0;
        while (invalid) {
            itemName = prompt(`Item already exists. Please enter a different item:`);
            invalid = list.items.find(item => item.name === itemName);
            counter++;
            if (counter >= 5) {
                window.alert(`Error creating item. Please try again`);
                return;
            }
        };

        setupNewItem(itemName, false);
        listManager.manageItems(itemName, `new`);
    };

    function initListeners() {
        const menuButton = document.getElementById(`menuBtn`);
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);
        const addItemBtn = document.getElementById(`addItem`);
        const listOptions = document.getElementById(`listOptions`);

        menuButton.addEventListener(`click`, function() {
            if (!menuContainer.classList.contains(`active`)) menuContainer.classList.add(`active`);
            if (!menuBg.classList.contains(`active`)) menuBg.classList.add(`active`);
        });
        menuBg.addEventListener(`click`, function() {
            menuContainer.classList.remove(`active`);
            menuBg.classList.remove(`active`);
        });
        addItemBtn.addEventListener(`click`, addItem);
        listOptions.addEventListener(`click`, listManager.deleteList);
    };

    (function init() {
        initListeners();
        updateActiveList();
    }());
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJxQzs7QUFFckMsd0RBQWdCLHdDQUF3QyxzQ0FBc0M7O0FBRTlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQ3hDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNVOztBQUUvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLDBEQUEwRDtBQUNwRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsc0RBQWM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHNEQUFjO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxzREFBYztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxzREFBYztBQUN0Qjs7QUFFQTtBQUNBLFlBQVksNERBQWU7QUFDM0IsMEJBQTBCLDREQUFlO0FBQ3pDO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksNERBQWU7QUFDM0IsK0JBQStCLDREQUFlO0FBQzlDO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLElBQUksd0RBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGtEQUFrRDtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsQ0FBQzs7QUFFRDtBQUNBLElBQUksd0RBQWdCO0FBQ3BCLElBQUksd0RBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHtcbiAgICBldmVudHM6IHt9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IHsgZXZlbnRzIH0iLCJpbXBvcnQgeyBldmVudHMgfSBmcm9tIFwiLi9wdWJzdWIuanNcIjtcblxuZXZlbnRzLnN1YnNjcmliZSgndXBkYXRlTG9jYWxTdG9yYWdlJywgZnVuY3Rpb24oZGF0YSkgeyB1cGRhdGVMb2NhbFN0b3JhZ2UoZGF0YVswXSwgZGF0YVsxXSkgfSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZShuYW1lLCBkYXRhKSB7XG4gICAgaWYgKF9zdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2UoZGF0YSkge1xuICAgIGlmIChfc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJykpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGRhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9zdG9yYWdlQXZhaWxhYmxlKHR5cGUpIHtcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgICBsZXQgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAgICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBnZXRMb2NhbFN0b3JhZ2UgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi9wdWJzdWIuanMnO1xuaW1wb3J0IHsgZ2V0TG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlLmpzJztcblxuLy9VcGRhdGUgY2hlY2tib3ggd2hlbiBzZXR0aW5nIHVwIGxpc3QgaXRlbXMgcmVhZCBmcm9tIGxvY2FsIHN0b3JhZ2Vcbi8vQWRkIGZ1bmN0aW9uYWxpdHkgZm9yIGR1ZSBkYXRlc1xuLy9VcGRhdGUgZHVlIGRhdGUgd2hlbiBzZXR0aW5nIHVwIGxpc3RzIGl0ZW1zIHJlYWQgZnJvbSBsb2NhbCBzdG9yYWdlXG5cbmNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLFxuICAgICAgICBpdGVtcyA9IFtdLFxuICAgICAgICBpY29uID0gYGNoZWNrbGlzdGAsXG4gICAgICAgIGN1c3RvbSA9IHRydWUsXG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXNcbiAgICAgICAgdGhpcy5pY29uID0gaWNvblxuICAgICAgICB0aGlzLmN1c3RvbSA9IGN1c3RvbVxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZVxuICAgIH07XG5cbiAgICBzZXQgaXNBY3RpdmUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGVsc2UgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgfTtcblxuICAgIG5ld0l0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHsgbmFtZTogaXRlbU5hbWUsIG5vdGVzOiBgYCwgZHVlRGF0ZTogYGAsIGNvbXBsZXRlZDogZmFsc2UgfSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZUl0ZW1TdGF0dXMoaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBpdGVtLmNvbXBsZXRlZCA9ICFpdGVtLmNvbXBsZXRlZDtcbiAgICB9O1xuXG4gICAgZGVsZXRlSXRlbShpdGVtTmFtZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xufVxuY29uc3QgbGlzdE1hbmFnZXIgPSAoKCkgPT4ge1xuICAgIGxldCBMSVNUUyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKG5hbWUsIGRhdGEpIHtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYHVwZGF0ZUxvY2FsU3RvcmFnZWAsIFtuYW1lLCBkYXRhXSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNyZWF0ZU5ld0xpc3QgPSAodGl0bGUsIGl0ZW1zID0gW10sIGljb24gPSBgY2hlY2tsaXN0YCwgY3VzdG9tID0gdHJ1ZSwgYWN0aXZlID0gZmFsc2UpID0+IHtcbiAgICAgICAgbGV0IGxpc3QgPSBuZXcgTGlzdCh0aXRsZSwgaXRlbXMsIGljb24sIGN1c3RvbSwgYWN0aXZlKTtcbiAgICAgICAgTElTVFMucHVzaChsaXN0KTtcbiAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBMSVNUU2AsIExJU1RTKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0QWN0aXZlTGlzdCA9IChldmVudCwgZnJvbVN0b3JhZ2UgPSBudWxsKSA9PiB7XG4gICAgICAgIGxldCBzZWxlY3RlZExpc3Q7XG4gICAgICAgIGlmIChldmVudCkgc2VsZWN0ZWRMaXN0ID0gZXZlbnQudGFyZ2V0Lm5hbWU7XG4gICAgICAgIGVsc2UgaWYgKGZyb21TdG9yYWdlKSBzZWxlY3RlZExpc3QgPSBmcm9tU3RvcmFnZS50aXRsZTtcbiAgICAgICAgZWxzZSBzZWxlY3RlZExpc3QgPSBMSVNUU1swXS50aXRsZTtcblxuICAgICAgICBMSVNUUy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgbGlzdC5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT0gc2VsZWN0ZWRMaXN0KTtcbiAgICAgICAgYWN0aXZlTGlzdC5pc0FjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBhY3RpdmVMaXN0YCwgYWN0aXZlTGlzdCk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKGB1cGRhdGVBY3RpdmVMaXN0YCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEFjdGl2ZUxpc3QgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QuaXNBY3RpdmUgPT0gdHJ1ZSk7XG4gICAgICAgIGlmICghYWN0aXZlTGlzdCkgYWN0aXZlTGlzdCA9IExJU1RTWzBdO1xuICAgICAgICByZXR1cm4gYWN0aXZlTGlzdDtcbiAgICB9O1xuXG4gICAgY29uc3QgbWFuYWdlSXRlbXMgPSAoaXRlbU5hbWUsIGFjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBsaXN0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBpZiAoYWN0aW9uID09PSBgbmV3YCkgbGlzdC5uZXdJdGVtKGl0ZW1OYW1lKTtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gYHN0YXR1c0NoYW5nZWApIGxpc3QudXBkYXRlSXRlbVN0YXR1cyhpdGVtTmFtZSk7XG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgTElTVFNgLCBMSVNUUyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldExpc3RzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gTElTVFM7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZUxpc3QgPSAoKSA9PiB7XG4gICAgICAgIGlmICghd2luZG93LmNvbmZpcm0oJ0RlbGV0ZSBMaXN0PycpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBnZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gTElTVFMuZmluZEluZGV4KGxpc3QgPT4gbGlzdC50aXRsZSA9PT0gYWN0aXZlTGlzdC50aXRsZSk7XG4gICAgICAgIExJU1RTLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBMSVNUU2AsIExJU1RTKTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYGRlbGV0ZUxpc3RgLCBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlSXRlbSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKCdEZWxldGUgSXRlbT8nKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBsaXN0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBjb25zdCBpdGVtTmFtZSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmNoaWxkTm9kZXNbMV0uaW5uZXJUZXh0O1xuICAgICAgICBsaXN0LmRlbGV0ZUl0ZW0oaXRlbU5hbWUpO1xuXG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgTElTVFNgLCBMSVNUUyk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKGBkZWxldGVJdGVtYCwgaXRlbU5hbWUpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdHMoKSB7XG4gICAgICAgIGlmIChnZXRMb2NhbFN0b3JhZ2UoJ0xJU1RTJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RzID0gZ2V0TG9jYWxTdG9yYWdlKCdMSVNUUycpO1xuICAgICAgICAgICAgbGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGxpc3QudGl0bGUsIGxpc3QuaXRlbXMsIGxpc3QuaWNvbiwgbGlzdC5jdXN0b20sIGxpc3QuYWN0aXZlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGBUb2RheWAsIFtdLCBgdG9kYXlgLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgY3JlYXRlTmV3TGlzdChgVG9tb3Jyb3dgLCBbXSwgYGV2ZW50YCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRoaXMgV2Vla2AsIFtdLCBgZGF0ZV9yYW5nZWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGBUby1Eb2AsIFtdLCBgY2hlY2tsaXN0YCwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0QWN0aXZlTGlzdCgpIHtcbiAgICAgICAgaWYgKGdldExvY2FsU3RvcmFnZSgnYWN0aXZlTGlzdCcpKSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gZ2V0TG9jYWxTdG9yYWdlKCdhY3RpdmVMaXN0Jyk7XG4gICAgICAgICAgICBzZXRBY3RpdmVMaXN0KG51bGwsIGFjdGl2ZUxpc3QpO1xuICAgICAgICB9IGVsc2Uge307XG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdHMoKTtcbiAgICAgICAgaW5pdEFjdGl2ZUxpc3QoKTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTmV3TGlzdCxcbiAgICAgICAgZ2V0TGlzdHMsXG4gICAgICAgIHNldEFjdGl2ZUxpc3QsXG4gICAgICAgIGdldEFjdGl2ZUxpc3QsXG4gICAgICAgIG1hbmFnZUl0ZW1zLFxuICAgICAgICBkZWxldGVMaXN0LFxuICAgICAgICBkZWxldGVJdGVtXG4gICAgfVxufSkoKTtcblxuY29uc3QgbWVudU1vZHVsZSA9ICgoKSA9PiB7XG4gICAgZXZlbnRzLnN1YnNjcmliZShgZGVsZXRlTGlzdGAsIHJlc2V0TGlzdHMpO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRMaXN0cyhsaXN0TmFtZSkge1xuICAgICAgICBjb25zdCBtZW51TGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubWVudS1idXR0b25zYCk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKG1lbnVMaXN0cykuZmluZChsaXN0ID0+IGxpc3QubmFtZSA9PT0gbGlzdE5hbWUpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICBsaXN0TWFuYWdlci5zZXRBY3RpdmVMaXN0KCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcbiAgICAgICAgY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG4gICAgICAgIGNvbnN0IG1lbnVCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QmdgKTtcblxuICAgICAgICBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQnRuKGV2ZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZExpc3Q7XG4gICAgICAgIGlmIChldmVudCkgc2VsZWN0ZWRMaXN0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgICAgICBjb25zdCBtZW51TGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubWVudS1idXR0b25zYCk7XG4gICAgICAgICAgICBzZWxlY3RlZExpc3QgPSBBcnJheS5mcm9tKG1lbnVMaXN0cykuZmluZChsaXN0ID0+IGxpc3QubmFtZSA9PT0gYWN0aXZlTGlzdC50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNlbGVjdGVkYCkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGBzZWxlY3RlZGApO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmNsYXNzTGlzdC5hZGQoYHNlbGVjdGVkYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUxpc3RDbGljayhldmVudCkge1xuICAgICAgICBsaXN0TWFuYWdlci5zZXRBY3RpdmVMaXN0KGV2ZW50KTtcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRCdG4oZXZlbnQpO1xuICAgICAgICBjbG9zZU1lbnUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QnRuTGlzdGVuZXIoYnRuKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGhhbmRsZUxpc3RDbGljayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChsaXN0LmN1c3RvbSA9PSBmYWxzZSkgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByZW1hZGVMaXN0c2ApO1xuICAgICAgICBlbHNlIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjdXN0b21MaXN0c2ApO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChgbWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bi5pZCA9IGxpc3QudGl0bGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBidG4ubmFtZSA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gbGlzdC5pY29uO1xuXG4gICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGJ0blRleHQuaW5uZXJUZXh0ID0gbGlzdC50aXRsZTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGljb25TcGFuKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGJ0blRleHQpO1xuXG4gICAgICAgIHNldEJ0bkxpc3RlbmVyKGJ0bik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZE5ld0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpc3RzID0gbGlzdE1hbmFnZXIuZ2V0TGlzdHMoKTtcbiAgICAgICAgbGV0IGxpc3ROYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBOYW1lOmApO1xuICAgICAgICBpZiAoIWxpc3ROYW1lKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGludmFsaWQgPSBsaXN0cy5maW5kKGxpc3QgPT4gbGlzdC50aXRsZSA9PT0gbGlzdE5hbWUpO1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChpbnZhbGlkKSB7XG4gICAgICAgICAgICBsaXN0TmFtZSA9IHByb21wdChgTGlzdCBOYW1lIGFscmVhZHkgdXNlZC4gUGxlYXNlIHVzZSBhIGRpZmZlcmVudCBsaXN0IG5hbWU6YCk7XG4gICAgICAgICAgICBpbnZhbGlkID0gbGlzdHMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT09IGxpc3ROYW1lKTtcbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IDUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoYEVycm9yIGNyZWF0aW5nIGxpc3QuIFBsZWFzZSB0cnkgYWdhaW5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGlzdE1hbmFnZXIuY3JlYXRlTmV3TGlzdChsaXN0TmFtZSwgW10sIGBjaGVja2xpc3RgLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgIG1ha2VCdG4oeyB0aXRsZTogbGlzdE5hbWUsIGljb246IGBjaGVja2xpc3RgLCBjdXN0b206IHRydWUgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZExpc3RMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgYWRkTGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRMaXN0YCk7XG4gICAgICAgIGFkZExpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGROZXdMaXN0KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RzKCkge1xuICAgICAgICBjb25zdCBsaXN0cyA9IGxpc3RNYW5hZ2VyLmdldExpc3RzKCk7XG4gICAgICAgIGxpc3RzLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBtYWtlQnRuKGxpc3QpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgICAgICBhZGRMaXN0TGlzdGVuZXIoKTtcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRCdG4oKTtcbiAgICB9KCkpO1xuXG59KSgpO1xuXG5jb25zdCBtYWluU2NyZWVuTW9kdWxlID0gKCgpID0+IHtcbiAgICBldmVudHMuc3Vic2NyaWJlKGB1cGRhdGVBY3RpdmVMaXN0YCwgdXBkYXRlQWN0aXZlTGlzdCk7XG4gICAgZXZlbnRzLnN1YnNjcmliZShgZGVsZXRlSXRlbWAsIGRlbGV0ZUxpc3RJdGVtKTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUxpc3RJdGVtKGl0ZW1OYW1lKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmxpc3QtaXRlbWApO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShpdGVtcykuZmluZChpdGVtID0+IGl0ZW0uY2hpbGROb2Rlc1sxXS5pbm5lclRleHQgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlSGVhZGVyKGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyTGlzdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaGVhZGVyTGlzdE5hbWVgKTtcbiAgICAgICAgaGVhZGVyTGlzdE5hbWUuaW5uZXJUZXh0ID0gYWN0aXZlTGlzdC50aXRsZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlzdEl0ZW1zKGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBsaXN0LWl0ZW1gKTtcbiAgICAgICAgd2hpbGUgKGxpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxpWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZlTGlzdC5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgc2V0dXBOZXdJdGVtKGl0ZW0ubmFtZSwgaXRlbS5jb21wbGV0ZWQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hlY2tDdXN0b21MaXN0KGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgYWRkSXRlbUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRJdGVtYCk7XG4gICAgICAgIGNvbnN0IGxpc3RPcHRpb25zSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsaXN0T3B0aW9uc2ApO1xuXG4gICAgICAgIGlmIChhY3RpdmVMaXN0LmN1c3RvbSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgYWRkSXRlbUJ0bi5jbGFzc0xpc3QuYWRkKGByZW1vdmVkYCk7XG4gICAgICAgICAgICBsaXN0T3B0aW9uc0ljb24uY2xhc3NMaXN0LmFkZChgcmVtb3ZlZGApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkSXRlbUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGByZW1vdmVkYCk7XG4gICAgICAgICAgICBsaXN0T3B0aW9uc0ljb24uY2xhc3NMaXN0LnJlbW92ZShgcmVtb3ZlZGApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZUxpc3QoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIHVwZGF0ZUhlYWRlcihhY3RpdmVMaXN0KTtcbiAgICAgICAgdXBkYXRlTGlzdEl0ZW1zKGFjdGl2ZUxpc3QpO1xuICAgICAgICBjaGVja0N1c3RvbUxpc3QoYWN0aXZlTGlzdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoZWNrYm94KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBsaSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCB0ZXh0ID0gbGkuY2hpbGRyZW5bMV07XG5cbiAgICAgICAgaWYgKGNoZWNrYm94LmlubmVyVGV4dCA9PT0gYGNoZWNrX2JveF9vdXRsaW5lX2JsYW5rYCkge1xuICAgICAgICAgICAgY2hlY2tib3guaW5uZXJUZXh0ID0gYGNoZWNrX2JveGA7XG4gICAgICAgICAgICB0ZXh0LnN0eWxlLnNldFByb3BlcnR5KGB0ZXh0LWRlY29yYXRpb25gLCBgbGluZS10aHJvdWdoYCk7XG4gICAgICAgICAgICBsaS5zdHlsZS5zZXRQcm9wZXJ0eShgb3BhY2l0eWAsIGA1MCVgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2A7XG4gICAgICAgICAgICB0ZXh0LnN0eWxlLnNldFByb3BlcnR5KGB0ZXh0LWRlY29yYXRpb25gLCBgbm9uZWApO1xuICAgICAgICAgICAgbGkuc3R5bGUuc2V0UHJvcGVydHkoYG9wYWNpdHlgLCBgMTAwJWApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdE1hbmFnZXIubWFuYWdlSXRlbXModGV4dC5pbm5lclRleHQsIGBzdGF0dXNDaGFuZ2VgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXhwYW5kSXRlbShldmVudCkge1xuICAgICAgICAvL3N0aWxsIHRvZG9cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cblxuXG4gICAgZnVuY3Rpb24gc2V0SXRlbUxpc3RlbmVyKGljb24sIGl0ZW1PcHRpb25zKSB7XG4gICAgICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVDaGVja2JveCk7XG4gICAgICAgIGl0ZW1PcHRpb25zLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgbGlzdE1hbmFnZXIuZGVsZXRlSXRlbSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwTmV3SXRlbShpdGVtTmFtZSwgY29tcGxldGVkKSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxpc3RJdGVtc2ApO1xuXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgbGlgKTtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChgbGlzdC1pdGVtYCk7XG5cbiAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKGBtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkYCwgYGl0ZW0tY2hlY2tib3hgKTtcbiAgICAgICAgaWNvbi5pbm5lclRleHQgPSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgO1xuICAgICAgICAvL2NoZWNrIGlmIGl0ZW0gaXMgY29tcGxldGVkIHdoZW4gYnJpbmdpbmcgaW4gZnJvbSBsb2NhbHN0b3JhZ2VcblxuICAgICAgICBjb25zdCBpdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgaXRlbVRleHQuY2xhc3NMaXN0LmFkZChgaXRlbS10ZXh0YCk7XG4gICAgICAgIGl0ZW1UZXh0LmlubmVyVGV4dCA9IGl0ZW1OYW1lO1xuXG4gICAgICAgIC8vQWRkIGR1ZSBkYXRlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKGBpdGVtLWR1ZURhdGVgKTtcbiAgICAgICAgZHVlRGF0ZS5pbm5lclRleHQgPSBgLS0vLS0vLS1gO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1PcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBpdGVtT3B0aW9ucy5jbGFzc0xpc3QuYWRkKGBtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkYCwgYGl0ZW0tb3B0aW9uc2ApO1xuICAgICAgICBpdGVtT3B0aW9ucy5pbm5lclRleHQgPSBgZGVsZXRlYDtcblxuICAgICAgICB1bC5pbnNlcnRCZWZvcmUobGksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRJdGVtYCkpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaXRlbVRleHQpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaXRlbU9wdGlvbnMpO1xuXG4gICAgICAgIHNldEl0ZW1MaXN0ZW5lcihpY29uLCBpdGVtT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZEl0ZW0oKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGxldCBpdGVtTmFtZSA9IHByb21wdChgTmV3IExpc3QgSXRlbTpgKTtcbiAgICAgICAgaWYgKCFpdGVtTmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBpbnZhbGlkID0gbGlzdC5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgd2hpbGUgKGludmFsaWQpIHtcbiAgICAgICAgICAgIGl0ZW1OYW1lID0gcHJvbXB0KGBJdGVtIGFscmVhZHkgZXhpc3RzLiBQbGVhc2UgZW50ZXIgYSBkaWZmZXJlbnQgaXRlbTpgKTtcbiAgICAgICAgICAgIGludmFsaWQgPSBsaXN0Lml0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IDUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoYEVycm9yIGNyZWF0aW5nIGl0ZW0uIFBsZWFzZSB0cnkgYWdhaW5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0dXBOZXdJdGVtKGl0ZW1OYW1lLCBmYWxzZSk7XG4gICAgICAgIGxpc3RNYW5hZ2VyLm1hbmFnZUl0ZW1zKGl0ZW1OYW1lLCBgbmV3YCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJ0bmApO1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuICAgICAgICBjb25zdCBhZGRJdGVtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKTtcbiAgICAgICAgY29uc3QgbGlzdE9wdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdE9wdGlvbnNgKTtcblxuICAgICAgICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIW1lbnVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIGlmICghbWVudUJnLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVCZy5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lbnVCZy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZEl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGRJdGVtKTtcbiAgICAgICAgbGlzdE9wdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBsaXN0TWFuYWdlci5kZWxldGVMaXN0KTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdXBkYXRlQWN0aXZlTGlzdCgpO1xuICAgIH0oKSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==