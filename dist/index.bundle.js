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
            setupNewItem(item);
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

    function updateCheckbox(event, data) {
        let checkbox;

        if (event) checkbox = event.target;
        else checkbox = data;
        const li = checkbox.parentNode;
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

        if (event) listManager.manageItems(text.innerText, `statusChange`);
    };

    function setItemListener(icon, itemOptions) {
        icon.addEventListener('click', updateCheckbox);
        itemOptions.addEventListener(`click`, listManager.deleteItem);
    };

    function setupNewItem(item) {
        const ul = document.getElementById(`listItems`);

        const li = document.createElement(`li`);
        li.classList.add(`list-item`);

        const icon = document.createElement(`span`);
        icon.classList.add(`material-symbols-outlined`, `item-checkbox`);
        icon.innerText = `check_box_outline_blank`;

        const itemText = document.createElement(`span`);
        itemText.classList.add(`item-text`);
        itemText.innerText = item.name;

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

        if (item.completed) updateCheckbox(null, icon);
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

        setupNewItem({ name: itemName, notes: ``, dueDate: ``, completed: false });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJxQzs7QUFFckMsd0RBQWdCLHdDQUF3QyxzQ0FBc0M7O0FBRTlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQ3hDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNVOztBQUUvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQiwwREFBMEQ7QUFDcEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHNEQUFjO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0EsUUFBUSxzREFBYztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsc0RBQWM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsc0RBQWM7QUFDdEI7O0FBRUE7QUFDQSxZQUFZLDREQUFlO0FBQzNCLDBCQUEwQiw0REFBZTtBQUN6QztBQUNBO0FBQ0EsYUFBYTtBQUNiLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLDREQUFlO0FBQzNCLCtCQUErQiw0REFBZTtBQUM5QztBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxJQUFJLHdEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isa0RBQWtEO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOztBQUVEO0FBQ0EsSUFBSSx3REFBZ0I7QUFDcEIsSUFBSSx3REFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsMERBQTBEO0FBQ2pGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0ge1xuICAgIGV2ZW50czoge30sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgIH0sXG4gICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdW2ldID09PSBmbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwdWJsaXNoOiBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgeyBldmVudHMgfSIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gXCIuL3B1YnN1Yi5qc1wiO1xuXG5ldmVudHMuc3Vic2NyaWJlKCd1cGRhdGVMb2NhbFN0b3JhZ2UnLCBmdW5jdGlvbihkYXRhKSB7IHVwZGF0ZUxvY2FsU3RvcmFnZShkYXRhWzBdLCBkYXRhWzFdKSB9KTtcblxuZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKG5hbWUsIGRhdGEpIHtcbiAgICBpZiAoX3N0b3JhZ2VBdmFpbGFibGUoJ2xvY2FsU3RvcmFnZScpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZShkYXRhKSB7XG4gICAgaWYgKF9zdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKSkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oZGF0YSkpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gX3N0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgIGxldCB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgICAgIGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgICAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgICAgIChzdG9yYWdlICYmIHN0b3JhZ2UubGVuZ3RoICE9PSAwKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IGdldExvY2FsU3RvcmFnZSB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBldmVudHMgfSBmcm9tICcuL3B1YnN1Yi5qcyc7XG5pbXBvcnQgeyBnZXRMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuXG4vL0FkZCBmdW5jdGlvbmFsaXR5IGZvciBkdWUgZGF0ZXNcbi8vVXBkYXRlIGR1ZSBkYXRlIHdoZW4gc2V0dGluZyB1cCBsaXN0cyBpdGVtcyByZWFkIGZyb20gbG9jYWwgc3RvcmFnZVxuXG5jbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSxcbiAgICAgICAgaXRlbXMgPSBbXSxcbiAgICAgICAgaWNvbiA9IGBjaGVja2xpc3RgLFxuICAgICAgICBjdXN0b20gPSB0cnVlLFxuICAgICAgICBhY3RpdmUgPSBmYWxzZVxuICAgICkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zXG4gICAgICAgIHRoaXMuaWNvbiA9IGljb25cbiAgICAgICAgdGhpcy5jdXN0b20gPSBjdXN0b21cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmVcbiAgICB9O1xuXG4gICAgc2V0IGlzQWN0aXZlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBlbHNlIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGdldCBpc0FjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xuICAgIH07XG5cbiAgICBuZXdJdGVtKGl0ZW1OYW1lKSB7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCh7IG5hbWU6IGl0ZW1OYW1lLCBub3RlczogYGAsIGR1ZURhdGU6IGBgLCBjb21wbGV0ZWQ6IGZhbHNlIH0pO1xuICAgIH07XG5cbiAgICB1cGRhdGVJdGVtU3RhdHVzKGl0ZW1OYW1lKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgaXRlbS5jb21wbGV0ZWQgPSAhaXRlbS5jb21wbGV0ZWQ7XG4gICAgfTtcblxuICAgIGRlbGV0ZUl0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbn1cbmNvbnN0IGxpc3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgICBsZXQgTElTVFMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZShuYW1lLCBkYXRhKSB7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKGB1cGRhdGVMb2NhbFN0b3JhZ2VgLCBbbmFtZSwgZGF0YV0pO1xuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVOZXdMaXN0ID0gKHRpdGxlLCBpdGVtcyA9IFtdLCBpY29uID0gYGNoZWNrbGlzdGAsIGN1c3RvbSA9IHRydWUsIGFjdGl2ZSA9IGZhbHNlKSA9PiB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QodGl0bGUsIGl0ZW1zLCBpY29uLCBjdXN0b20sIGFjdGl2ZSk7XG4gICAgICAgIExJU1RTLnB1c2gobGlzdCk7XG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgTElTVFNgLCBMSVNUUyk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEFjdGl2ZUxpc3QgPSAoZXZlbnQsIGZyb21TdG9yYWdlID0gbnVsbCkgPT4ge1xuICAgICAgICBsZXQgc2VsZWN0ZWRMaXN0O1xuICAgICAgICBpZiAoZXZlbnQpIHNlbGVjdGVkTGlzdCA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgICAgICBlbHNlIGlmIChmcm9tU3RvcmFnZSkgc2VsZWN0ZWRMaXN0ID0gZnJvbVN0b3JhZ2UudGl0bGU7XG4gICAgICAgIGVsc2Ugc2VsZWN0ZWRMaXN0ID0gTElTVFNbMF0udGl0bGU7XG5cbiAgICAgICAgTElTVFMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgIGxpc3QuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IExJU1RTLmZpbmQobGlzdCA9PiBsaXN0LnRpdGxlID09IHNlbGVjdGVkTGlzdCk7XG4gICAgICAgIGFjdGl2ZUxpc3QuaXNBY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgYWN0aXZlTGlzdGAsIGFjdGl2ZUxpc3QpO1xuICAgICAgICBldmVudHMucHVibGlzaChgdXBkYXRlQWN0aXZlTGlzdGApO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRBY3RpdmVMaXN0ID0gKCkgPT4ge1xuICAgICAgICBsZXQgYWN0aXZlTGlzdCA9IExJU1RTLmZpbmQobGlzdCA9PiBsaXN0LmlzQWN0aXZlID09IHRydWUpO1xuICAgICAgICBpZiAoIWFjdGl2ZUxpc3QpIGFjdGl2ZUxpc3QgPSBMSVNUU1swXTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZUxpc3Q7XG4gICAgfTtcblxuICAgIGNvbnN0IG1hbmFnZUl0ZW1zID0gKGl0ZW1OYW1lLCBhY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gYG5ld2ApIGxpc3QubmV3SXRlbShpdGVtTmFtZSk7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IGBzdGF0dXNDaGFuZ2VgKSBsaXN0LnVwZGF0ZUl0ZW1TdGF0dXMoaXRlbU5hbWUpO1xuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYExJU1RTYCwgTElTVFMpO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRMaXN0cyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIExJU1RTO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVMaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKCdEZWxldGUgTGlzdD8nKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IExJU1RTLmZpbmRJbmRleChsaXN0ID0+IGxpc3QudGl0bGUgPT09IGFjdGl2ZUxpc3QudGl0bGUpO1xuICAgICAgICBMSVNUUy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgTElTVFNgLCBMSVNUUyk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKGBkZWxldGVMaXN0YCwgYWN0aXZlTGlzdC50aXRsZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZUl0ZW0gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF3aW5kb3cuY29uZmlybSgnRGVsZXRlIEl0ZW0/JykpIHJldHVybjtcbiAgICAgICAgY29uc3QgbGlzdCA9IGdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgY29uc3QgaXRlbU5hbWUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzFdLmlubmVyVGV4dDtcbiAgICAgICAgbGlzdC5kZWxldGVJdGVtKGl0ZW1OYW1lKTtcblxuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYExJU1RTYCwgTElTVFMpO1xuICAgICAgICBldmVudHMucHVibGlzaChgZGVsZXRlSXRlbWAsIGl0ZW1OYW1lKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RzKCkge1xuICAgICAgICBpZiAoZ2V0TG9jYWxTdG9yYWdlKCdMSVNUUycpKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0cyA9IGdldExvY2FsU3RvcmFnZSgnTElTVFMnKTtcbiAgICAgICAgICAgIGxpc3RzLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlTmV3TGlzdChsaXN0LnRpdGxlLCBsaXN0Lml0ZW1zLCBsaXN0Lmljb24sIGxpc3QuY3VzdG9tLCBsaXN0LmFjdGl2ZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3JlYXRlTmV3TGlzdChgVG9kYXlgLCBbXSwgYHRvZGF5YCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRvbW9ycm93YCwgW10sIGBldmVudGAsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGBUaGlzIFdlZWtgLCBbXSwgYGRhdGVfcmFuZ2VgLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgY3JlYXRlTmV3TGlzdChgVG8tRG9gLCBbXSwgYGNoZWNrbGlzdGAsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdEFjdGl2ZUxpc3QoKSB7XG4gICAgICAgIGlmIChnZXRMb2NhbFN0b3JhZ2UoJ2FjdGl2ZUxpc3QnKSkge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IGdldExvY2FsU3RvcmFnZSgnYWN0aXZlTGlzdCcpO1xuICAgICAgICAgICAgc2V0QWN0aXZlTGlzdChudWxsLCBhY3RpdmVMaXN0KTtcbiAgICAgICAgfSBlbHNlIHt9O1xuICAgIH07XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RzKCk7XG4gICAgICAgIGluaXRBY3RpdmVMaXN0KCk7XG4gICAgfSkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZU5ld0xpc3QsXG4gICAgICAgIGdldExpc3RzLFxuICAgICAgICBzZXRBY3RpdmVMaXN0LFxuICAgICAgICBnZXRBY3RpdmVMaXN0LFxuICAgICAgICBtYW5hZ2VJdGVtcyxcbiAgICAgICAgZGVsZXRlTGlzdCxcbiAgICAgICAgZGVsZXRlSXRlbVxuICAgIH1cbn0pKCk7XG5cbmNvbnN0IG1lbnVNb2R1bGUgPSAoKCkgPT4ge1xuICAgIGV2ZW50cy5zdWJzY3JpYmUoYGRlbGV0ZUxpc3RgLCByZXNldExpc3RzKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0TGlzdHMobGlzdE5hbWUpIHtcbiAgICAgICAgY29uc3QgbWVudUxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm1lbnUtYnV0dG9uc2ApO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShtZW51TGlzdHMpLmZpbmQobGlzdCA9PiBsaXN0Lm5hbWUgPT09IGxpc3ROYW1lKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgbGlzdE1hbmFnZXIuc2V0QWN0aXZlTGlzdCgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1lbnUoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJnYCk7XG5cbiAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgbWVudUJnLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZEJ0bihldmVudCkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRMaXN0O1xuICAgICAgICBpZiAoZXZlbnQpIHNlbGVjdGVkTGlzdCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gbGlzdE1hbmFnZXIuZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICAgICAgY29uc3QgbWVudUxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm1lbnUtYnV0dG9uc2ApO1xuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0ID0gQXJyYXkuZnJvbShtZW51TGlzdHMpLmZpbmQobGlzdCA9PiBsaXN0Lm5hbWUgPT09IGFjdGl2ZUxpc3QudGl0bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNlbGVjdGVkYCkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGBzZWxlY3RlZGApO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmNsYXNzTGlzdC5hZGQoYHNlbGVjdGVkYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUxpc3RDbGljayhldmVudCkge1xuICAgICAgICBsaXN0TWFuYWdlci5zZXRBY3RpdmVMaXN0KGV2ZW50KTtcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRCdG4oZXZlbnQpO1xuICAgICAgICBjbG9zZU1lbnUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QnRuTGlzdGVuZXIoYnRuKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGhhbmRsZUxpc3RDbGljayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChsaXN0LmN1c3RvbSA9PSBmYWxzZSkgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByZW1hZGVMaXN0c2ApO1xuICAgICAgICBlbHNlIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjdXN0b21MaXN0c2ApO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChgbWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bi5pZCA9IGxpc3QudGl0bGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBidG4ubmFtZSA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gbGlzdC5pY29uO1xuXG4gICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGJ0blRleHQuaW5uZXJUZXh0ID0gbGlzdC50aXRsZTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGljb25TcGFuKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGJ0blRleHQpO1xuXG4gICAgICAgIHNldEJ0bkxpc3RlbmVyKGJ0bik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZE5ld0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpc3RzID0gbGlzdE1hbmFnZXIuZ2V0TGlzdHMoKTtcbiAgICAgICAgbGV0IGxpc3ROYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBOYW1lOmApO1xuICAgICAgICBpZiAoIWxpc3ROYW1lKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGludmFsaWQgPSBsaXN0cy5maW5kKGxpc3QgPT4gbGlzdC50aXRsZSA9PT0gbGlzdE5hbWUpO1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChpbnZhbGlkKSB7XG4gICAgICAgICAgICBsaXN0TmFtZSA9IHByb21wdChgTGlzdCBOYW1lIGFscmVhZHkgdXNlZC4gUGxlYXNlIHVzZSBhIGRpZmZlcmVudCBsaXN0IG5hbWU6YCk7XG4gICAgICAgICAgICBpbnZhbGlkID0gbGlzdHMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT09IGxpc3ROYW1lKTtcbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IDUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoYEVycm9yIGNyZWF0aW5nIGxpc3QuIFBsZWFzZSB0cnkgYWdhaW5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGlzdE1hbmFnZXIuY3JlYXRlTmV3TGlzdChsaXN0TmFtZSwgW10sIGBjaGVja2xpc3RgLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgIG1ha2VCdG4oeyB0aXRsZTogbGlzdE5hbWUsIGljb246IGBjaGVja2xpc3RgLCBjdXN0b206IHRydWUgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZExpc3RMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgYWRkTGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRMaXN0YCk7XG4gICAgICAgIGFkZExpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGROZXdMaXN0KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RzKCkge1xuICAgICAgICBjb25zdCBsaXN0cyA9IGxpc3RNYW5hZ2VyLmdldExpc3RzKCk7XG4gICAgICAgIGxpc3RzLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBtYWtlQnRuKGxpc3QpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgICAgICBhZGRMaXN0TGlzdGVuZXIoKTtcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRCdG4oKTtcbiAgICB9KCkpO1xuXG59KSgpO1xuXG5jb25zdCBtYWluU2NyZWVuTW9kdWxlID0gKCgpID0+IHtcbiAgICBldmVudHMuc3Vic2NyaWJlKGB1cGRhdGVBY3RpdmVMaXN0YCwgdXBkYXRlQWN0aXZlTGlzdCk7XG4gICAgZXZlbnRzLnN1YnNjcmliZShgZGVsZXRlSXRlbWAsIGRlbGV0ZUxpc3RJdGVtKTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUxpc3RJdGVtKGl0ZW1OYW1lKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmxpc3QtaXRlbWApO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gQXJyYXkuZnJvbShpdGVtcykuZmluZChpdGVtID0+IGl0ZW0uY2hpbGROb2Rlc1sxXS5pbm5lclRleHQgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlSGVhZGVyKGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyTGlzdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaGVhZGVyTGlzdE5hbWVgKTtcbiAgICAgICAgaGVhZGVyTGlzdE5hbWUuaW5uZXJUZXh0ID0gYWN0aXZlTGlzdC50aXRsZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlzdEl0ZW1zKGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBsaXN0LWl0ZW1gKTtcbiAgICAgICAgd2hpbGUgKGxpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxpWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZlTGlzdC5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgc2V0dXBOZXdJdGVtKGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hlY2tDdXN0b21MaXN0KGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgYWRkSXRlbUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRJdGVtYCk7XG4gICAgICAgIGNvbnN0IGxpc3RPcHRpb25zSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsaXN0T3B0aW9uc2ApO1xuXG4gICAgICAgIGlmIChhY3RpdmVMaXN0LmN1c3RvbSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgYWRkSXRlbUJ0bi5jbGFzc0xpc3QuYWRkKGByZW1vdmVkYCk7XG4gICAgICAgICAgICBsaXN0T3B0aW9uc0ljb24uY2xhc3NMaXN0LmFkZChgcmVtb3ZlZGApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkSXRlbUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGByZW1vdmVkYCk7XG4gICAgICAgICAgICBsaXN0T3B0aW9uc0ljb24uY2xhc3NMaXN0LnJlbW92ZShgcmVtb3ZlZGApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZUxpc3QoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIHVwZGF0ZUhlYWRlcihhY3RpdmVMaXN0KTtcbiAgICAgICAgdXBkYXRlTGlzdEl0ZW1zKGFjdGl2ZUxpc3QpO1xuICAgICAgICBjaGVja0N1c3RvbUxpc3QoYWN0aXZlTGlzdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoZWNrYm94KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIGxldCBjaGVja2JveDtcblxuICAgICAgICBpZiAoZXZlbnQpIGNoZWNrYm94ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBlbHNlIGNoZWNrYm94ID0gZGF0YTtcbiAgICAgICAgY29uc3QgbGkgPSBjaGVja2JveC5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCB0ZXh0ID0gbGkuY2hpbGRyZW5bMV07XG5cbiAgICAgICAgaWYgKGNoZWNrYm94LmlubmVyVGV4dCA9PT0gYGNoZWNrX2JveF9vdXRsaW5lX2JsYW5rYCkge1xuICAgICAgICAgICAgY2hlY2tib3guaW5uZXJUZXh0ID0gYGNoZWNrX2JveGA7XG4gICAgICAgICAgICB0ZXh0LnN0eWxlLnNldFByb3BlcnR5KGB0ZXh0LWRlY29yYXRpb25gLCBgbGluZS10aHJvdWdoYCk7XG4gICAgICAgICAgICBsaS5zdHlsZS5zZXRQcm9wZXJ0eShgb3BhY2l0eWAsIGA1MCVgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2A7XG4gICAgICAgICAgICB0ZXh0LnN0eWxlLnNldFByb3BlcnR5KGB0ZXh0LWRlY29yYXRpb25gLCBgbm9uZWApO1xuICAgICAgICAgICAgbGkuc3R5bGUuc2V0UHJvcGVydHkoYG9wYWNpdHlgLCBgMTAwJWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50KSBsaXN0TWFuYWdlci5tYW5hZ2VJdGVtcyh0ZXh0LmlubmVyVGV4dCwgYHN0YXR1c0NoYW5nZWApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRJdGVtTGlzdGVuZXIoaWNvbiwgaXRlbU9wdGlvbnMpIHtcbiAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZUNoZWNrYm94KTtcbiAgICAgICAgaXRlbU9wdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBsaXN0TWFuYWdlci5kZWxldGVJdGVtKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBOZXdJdGVtKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdEl0ZW1zYCk7XG5cbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBsaWApO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKGBsaXN0LWl0ZW1gKTtcblxuICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgLCBgaXRlbS1jaGVja2JveGApO1xuICAgICAgICBpY29uLmlubmVyVGV4dCA9IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2A7XG5cbiAgICAgICAgY29uc3QgaXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGl0ZW1UZXh0LmNsYXNzTGlzdC5hZGQoYGl0ZW0tdGV4dGApO1xuICAgICAgICBpdGVtVGV4dC5pbm5lclRleHQgPSBpdGVtLm5hbWU7XG5cbiAgICAgICAgLy9BZGQgZHVlIGRhdGUgZnVuY3Rpb25hbGl0eVxuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoYGl0ZW0tZHVlRGF0ZWApO1xuICAgICAgICBkdWVEYXRlLmlubmVyVGV4dCA9IGAtLS8tLS8tLWA7XG5cbiAgICAgICAgY29uc3QgaXRlbU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGl0ZW1PcHRpb25zLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgLCBgaXRlbS1vcHRpb25zYCk7XG4gICAgICAgIGl0ZW1PcHRpb25zLmlubmVyVGV4dCA9IGBkZWxldGVgO1xuXG4gICAgICAgIHVsLmluc2VydEJlZm9yZShsaSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKSk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpdGVtVGV4dCk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGR1ZURhdGUpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpdGVtT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tcGxldGVkKSB1cGRhdGVDaGVja2JveChudWxsLCBpY29uKTtcbiAgICAgICAgc2V0SXRlbUxpc3RlbmVyKGljb24sIGl0ZW1PcHRpb25zKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkSXRlbSgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGxpc3RNYW5hZ2VyLmdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgbGV0IGl0ZW1OYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBJdGVtOmApO1xuICAgICAgICBpZiAoIWl0ZW1OYW1lKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGludmFsaWQgPSBsaXN0Lml0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICB3aGlsZSAoaW52YWxpZCkge1xuICAgICAgICAgICAgaXRlbU5hbWUgPSBwcm9tcHQoYEl0ZW0gYWxyZWFkeSBleGlzdHMuIFBsZWFzZSBlbnRlciBhIGRpZmZlcmVudCBpdGVtOmApO1xuICAgICAgICAgICAgaW52YWxpZCA9IGxpc3QuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gNSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChgRXJyb3IgY3JlYXRpbmcgaXRlbS4gUGxlYXNlIHRyeSBhZ2FpbmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZXR1cE5ld0l0ZW0oeyBuYW1lOiBpdGVtTmFtZSwgbm90ZXM6IGBgLCBkdWVEYXRlOiBgYCwgY29tcGxldGVkOiBmYWxzZSB9KTtcbiAgICAgICAgbGlzdE1hbmFnZXIubWFuYWdlSXRlbXMoaXRlbU5hbWUsIGBuZXdgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QnRuYCk7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudWApO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJnYCk7XG4gICAgICAgIGNvbnN0IGFkZEl0ZW1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWRkSXRlbWApO1xuICAgICAgICBjb25zdCBsaXN0T3B0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsaXN0T3B0aW9uc2ApO1xuXG4gICAgICAgIG1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApO1xuICAgICAgICAgICAgaWYgKCFtZW51QmcuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUJnLmNsYXNzTGlzdC5hZGQoYGFjdGl2ZWApO1xuICAgICAgICB9KTtcbiAgICAgICAgbWVudUJnLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICAgICAgbWVudUJnLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICB9KTtcbiAgICAgICAgYWRkSXRlbUJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGFkZEl0ZW0pO1xuICAgICAgICBsaXN0T3B0aW9ucy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGxpc3RNYW5hZ2VyLmRlbGV0ZUxpc3QpO1xuICAgIH07XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RlbmVycygpO1xuICAgICAgICB1cGRhdGVBY3RpdmVMaXN0KCk7XG4gICAgfSgpKTtcbn0pKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9