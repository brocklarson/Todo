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
        this.items.push({ name: itemName, notes: ``, dueDate: null, completed: false });
    };

    updateItemCompletion(itemName) {
        const item = this.items.find(item => item.name === itemName);
        item.completed = !item.completed;
    };

    deleteItem(itemName) {
        const index = this.items.findIndex(item => item.name === itemName);
        this.items.splice(index, 1);
    };

    setDueDate(itemName, date) {
        const item = this.items.find(item => item.name === itemName);
        item.dueDate = date;
    }

    sortItems() {
        console.log('here');
        this.items.sort((a, b) => {
            //sort completed items at end of list
            if (a.completed > b.completed) return 1;
            if (a.completed < b.completed) return -1;

            //sort by due date
            if (a.dueDate > b.dueDate) return 1;
            if (a.dueDate < b.dueDate) return -1;
        });
    }
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

        if (activeList.title === `Today`) setupToday();
        if (activeList.title === `Tomorrow`) setupTomorrow();
        if (activeList.title === `This Week`) setupThisWeek();

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
        if (action === `statusChange`) list.updateItemCompletion(itemName);
        updateLocalStorage(`LISTS`, LISTS);
    };

    const setDueDate = (event) => {
        const list = getActiveList();
        const date = event.target.value;
        const itemName = event.target.parentNode.childNodes[1].innerText;
        list.setDueDate(itemName, date);
        updateLocalStorage(`LISTS`, LISTS);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`updateActiveList`);
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

    function convertDateToString(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    function setupToday() {
        const list = LISTS[0];
        list.items = [];
        const date = new Date();
        const today = convertDateToString(date);

        //Start at i=3 to skip the premade lists
        for (let i = 3; i < LISTS.length; i++) {
            LISTS[i].items.forEach(item => {
                if (item.dueDate == today) {
                    LISTS[0].items.push(item);
                };
            });
        };
    };

    function setupTomorrow() {
        const list = LISTS[1];
        list.items = [];
        let date = new Date();
        date.setDate(date.getDate() + 1);
        const tomorrow = convertDateToString(date);

        //Start at i=3 to skip the premade lists
        for (let i = 3; i < LISTS.length; i++) {
            LISTS[i].items.forEach(item => {
                if (item.dueDate == tomorrow) {
                    LISTS[1].items.push(item);
                };
            });
        };
    };

    function setupThisWeek() {
        const list = LISTS[2];
        list.items = [];
        const date = new Date();
        const today = convertDateToString(date);
        let week = new Date();
        week.setDate(week.getDate() + 7);
        week = convertDateToString(week);

        //Start at i=3 to skip the premade lists
        for (let i = 3; i < LISTS.length; i++) {
            LISTS[i].items.forEach(item => {
                if (item.dueDate >= today && item.dueDate <= week) {
                    LISTS[2].items.push(item);
                };
            });
        };
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
        deleteItem,
        setDueDate,
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
        activeList.sortItems(activeList);
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
        const dueDate = li.children[2];

        if (checkbox.innerText === `check_box_outline_blank`) {
            checkbox.innerText = `check_box`;
            text.style.setProperty(`text-decoration`, `line-through`);
            li.style.setProperty(`opacity`, `50%`);
            dueDate.style.setProperty(`text-decoration`, `line-through`);
        } else {
            checkbox.innerText = `check_box_outline_blank`;
            text.style.setProperty(`text-decoration`, `none`);
            li.style.setProperty(`opacity`, `100%`);
            dueDate.style.setProperty(`text-decoration`, `none`);
        }
        if (event) {
            listManager.manageItems(text.innerText, `statusChange`);
            updateActiveList();
        }
    };

    function setItemListener(icon, itemOptions, dueDate) {
        icon.addEventListener('click', updateCheckbox);
        itemOptions.addEventListener(`click`, listManager.deleteItem);
        dueDate.addEventListener(`change`, listManager.setDueDate);
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

        const dueDate = document.createElement('input');
        dueDate.type = `date`;
        dueDate.classList.add(`item-dueDate`);
        dueDate.value = item.dueDate;

        const itemOptions = document.createElement(`span`);
        itemOptions.classList.add(`material-symbols-outlined`, `item-options`);
        itemOptions.innerText = `delete`;

        ul.insertBefore(li, document.getElementById(`addItem`));
        li.appendChild(icon);
        li.appendChild(itemText);
        li.appendChild(dueDate);
        li.appendChild(itemOptions);

        if (item.completed) updateCheckbox(null, icon);
        setItemListener(icon, itemOptions, dueDate);
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

        setupNewItem({ name: itemName, notes: ``, dueDate: null, completed: false });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLGFBQWE7QUFDYixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFlBQVksNERBQWU7QUFDM0IsK0JBQStCLDREQUFlO0FBQzlDO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsSUFBSSx3REFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGtEQUFrRDtBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsQ0FBQzs7QUFFRDtBQUNBLElBQUksd0RBQWdCO0FBQ3BCLElBQUksd0RBQWdCOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDREQUE0RDtBQUNuRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQyxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHtcbiAgICBldmVudHM6IHt9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IHsgZXZlbnRzIH0iLCJpbXBvcnQgeyBldmVudHMgfSBmcm9tIFwiLi9wdWJzdWIuanNcIjtcblxuZXZlbnRzLnN1YnNjcmliZSgndXBkYXRlTG9jYWxTdG9yYWdlJywgZnVuY3Rpb24oZGF0YSkgeyB1cGRhdGVMb2NhbFN0b3JhZ2UoZGF0YVswXSwgZGF0YVsxXSkgfSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZShuYW1lLCBkYXRhKSB7XG4gICAgaWYgKF9zdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRMb2NhbFN0b3JhZ2UoZGF0YSkge1xuICAgIGlmIChfc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJykpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGRhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIF9zdG9yYWdlQXZhaWxhYmxlKHR5cGUpIHtcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgICBsZXQgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAgICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBnZXRMb2NhbFN0b3JhZ2UgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi9wdWJzdWIuanMnO1xuaW1wb3J0IHsgZ2V0TG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlLmpzJztcblxuY2xhc3MgTGlzdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsXG4gICAgICAgIGl0ZW1zID0gW10sXG4gICAgICAgIGljb24gPSBgY2hlY2tsaXN0YCxcbiAgICAgICAgY3VzdG9tID0gdHJ1ZSxcbiAgICAgICAgYWN0aXZlID0gZmFsc2VcbiAgICApIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtc1xuICAgICAgICB0aGlzLmljb24gPSBpY29uXG4gICAgICAgIHRoaXMuY3VzdG9tID0gY3VzdG9tXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlXG4gICAgfTtcblxuICAgIHNldCBpc0FjdGl2ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZWxzZSB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBnZXQgaXNBY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZTtcbiAgICB9O1xuXG4gICAgbmV3SXRlbShpdGVtTmFtZSkge1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goeyBuYW1lOiBpdGVtTmFtZSwgbm90ZXM6IGBgLCBkdWVEYXRlOiBudWxsLCBjb21wbGV0ZWQ6IGZhbHNlIH0pO1xuICAgIH07XG5cbiAgICB1cGRhdGVJdGVtQ29tcGxldGlvbihpdGVtTmFtZSkge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgIGl0ZW0uY29tcGxldGVkID0gIWl0ZW0uY29tcGxldGVkO1xuICAgIH07XG5cbiAgICBkZWxldGVJdGVtKGl0ZW1OYW1lKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG5cbiAgICBzZXREdWVEYXRlKGl0ZW1OYW1lLCBkYXRlKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgaXRlbS5kdWVEYXRlID0gZGF0ZTtcbiAgICB9XG5cbiAgICBzb3J0SXRlbXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZXJlJyk7XG4gICAgICAgIHRoaXMuaXRlbXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgLy9zb3J0IGNvbXBsZXRlZCBpdGVtcyBhdCBlbmQgb2YgbGlzdFxuICAgICAgICAgICAgaWYgKGEuY29tcGxldGVkID4gYi5jb21wbGV0ZWQpIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGEuY29tcGxldGVkIDwgYi5jb21wbGV0ZWQpIHJldHVybiAtMTtcblxuICAgICAgICAgICAgLy9zb3J0IGJ5IGR1ZSBkYXRlXG4gICAgICAgICAgICBpZiAoYS5kdWVEYXRlID4gYi5kdWVEYXRlKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmIChhLmR1ZURhdGUgPCBiLmR1ZURhdGUpIHJldHVybiAtMTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCBsaXN0TWFuYWdlciA9ICgoKSA9PiB7XG4gICAgbGV0IExJU1RTID0gW107XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbFN0b3JhZ2UobmFtZSwgZGF0YSkge1xuICAgICAgICBldmVudHMucHVibGlzaChgdXBkYXRlTG9jYWxTdG9yYWdlYCwgW25hbWUsIGRhdGFdKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3JlYXRlTmV3TGlzdCA9ICh0aXRsZSwgaXRlbXMgPSBbXSwgaWNvbiA9IGBjaGVja2xpc3RgLCBjdXN0b20gPSB0cnVlLCBhY3RpdmUgPSBmYWxzZSkgPT4ge1xuICAgICAgICBsZXQgbGlzdCA9IG5ldyBMaXN0KHRpdGxlLCBpdGVtcywgaWNvbiwgY3VzdG9tLCBhY3RpdmUpO1xuICAgICAgICBMSVNUUy5wdXNoKGxpc3QpO1xuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYExJU1RTYCwgTElTVFMpO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRBY3RpdmVMaXN0ID0gKGV2ZW50LCBmcm9tU3RvcmFnZSA9IG51bGwpID0+IHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTGlzdDtcbiAgICAgICAgaWYgKGV2ZW50KSBzZWxlY3RlZExpc3QgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgZWxzZSBpZiAoZnJvbVN0b3JhZ2UpIHNlbGVjdGVkTGlzdCA9IGZyb21TdG9yYWdlLnRpdGxlO1xuICAgICAgICBlbHNlIHNlbGVjdGVkTGlzdCA9IExJU1RTWzBdLnRpdGxlO1xuXG4gICAgICAgIExJU1RTLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBsaXN0LmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBMSVNUUy5maW5kKGxpc3QgPT4gbGlzdC50aXRsZSA9PSBzZWxlY3RlZExpc3QpO1xuICAgICAgICBhY3RpdmVMaXN0LmlzQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoYWN0aXZlTGlzdC50aXRsZSA9PT0gYFRvZGF5YCkgc2V0dXBUb2RheSgpO1xuICAgICAgICBpZiAoYWN0aXZlTGlzdC50aXRsZSA9PT0gYFRvbW9ycm93YCkgc2V0dXBUb21vcnJvdygpO1xuICAgICAgICBpZiAoYWN0aXZlTGlzdC50aXRsZSA9PT0gYFRoaXMgV2Vla2ApIHNldHVwVGhpc1dlZWsoKTtcblxuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYGFjdGl2ZUxpc3RgLCBhY3RpdmVMaXN0KTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYHVwZGF0ZUFjdGl2ZUxpc3RgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0QWN0aXZlTGlzdCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFjdGl2ZUxpc3QgPSBMSVNUUy5maW5kKGxpc3QgPT4gbGlzdC5pc0FjdGl2ZSA9PSB0cnVlKTtcbiAgICAgICAgaWYgKCFhY3RpdmVMaXN0KSBhY3RpdmVMaXN0ID0gTElTVFNbMF07XG4gICAgICAgIHJldHVybiBhY3RpdmVMaXN0O1xuICAgIH07XG5cbiAgICBjb25zdCBtYW5hZ2VJdGVtcyA9IChpdGVtTmFtZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBnZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IGBuZXdgKSBsaXN0Lm5ld0l0ZW0oaXRlbU5hbWUpO1xuICAgICAgICBpZiAoYWN0aW9uID09PSBgc3RhdHVzQ2hhbmdlYCkgbGlzdC51cGRhdGVJdGVtQ29tcGxldGlvbihpdGVtTmFtZSk7XG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgTElTVFNgLCBMSVNUUyk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldER1ZURhdGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgY29uc3QgaXRlbU5hbWUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzFdLmlubmVyVGV4dDtcbiAgICAgICAgbGlzdC5zZXREdWVEYXRlKGl0ZW1OYW1lLCBkYXRlKTtcbiAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBMSVNUU2AsIExJU1RTKTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYHVwZGF0ZUFjdGl2ZUxpc3RgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0TGlzdHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBMSVNUUztcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlTGlzdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF3aW5kb3cuY29uZmlybSgnRGVsZXRlIExpc3Q/JykpIHJldHVybjtcbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IGdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBMSVNUUy5maW5kSW5kZXgobGlzdCA9PiBsaXN0LnRpdGxlID09PSBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgICAgICAgTElTVFMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYExJU1RTYCwgTElTVFMpO1xuICAgICAgICBldmVudHMucHVibGlzaChgZGVsZXRlTGlzdGAsIGFjdGl2ZUxpc3QudGl0bGUpO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVJdGVtID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghd2luZG93LmNvbmZpcm0oJ0RlbGV0ZSBJdGVtPycpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGxpc3QgPSBnZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGNvbnN0IGl0ZW1OYW1lID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuY2hpbGROb2Rlc1sxXS5pbm5lclRleHQ7XG4gICAgICAgIGxpc3QuZGVsZXRlSXRlbShpdGVtTmFtZSk7XG5cbiAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBMSVNUU2AsIExJU1RTKTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYGRlbGV0ZUl0ZW1gLCBpdGVtTmFtZSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNvbnZlcnREYXRlVG9TdHJpbmcoZGF0ZSkge1xuICAgICAgICBjb25zdCBkZCA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgY29uc3QgeXl5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFRvZGF5KCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gTElTVFNbMF07XG4gICAgICAgIGxpc3QuaXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gY29udmVydERhdGVUb1N0cmluZyhkYXRlKTtcblxuICAgICAgICAvL1N0YXJ0IGF0IGk9MyB0byBza2lwIHRoZSBwcmVtYWRlIGxpc3RzXG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpIDwgTElTVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIExJU1RTW2ldLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZHVlRGF0ZSA9PSB0b2RheSkge1xuICAgICAgICAgICAgICAgICAgICBMSVNUU1swXS5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBUb21vcnJvdygpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IExJU1RTWzFdO1xuICAgICAgICBsaXN0Lml0ZW1zID0gW107XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgIGNvbnN0IHRvbW9ycm93ID0gY29udmVydERhdGVUb1N0cmluZyhkYXRlKTtcblxuICAgICAgICAvL1N0YXJ0IGF0IGk9MyB0byBza2lwIHRoZSBwcmVtYWRlIGxpc3RzXG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpIDwgTElTVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIExJU1RTW2ldLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZHVlRGF0ZSA9PSB0b21vcnJvdykge1xuICAgICAgICAgICAgICAgICAgICBMSVNUU1sxXS5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBUaGlzV2VlaygpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IExJU1RTWzJdO1xuICAgICAgICBsaXN0Lml0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0b2RheSA9IGNvbnZlcnREYXRlVG9TdHJpbmcoZGF0ZSk7XG4gICAgICAgIGxldCB3ZWVrID0gbmV3IERhdGUoKTtcbiAgICAgICAgd2Vlay5zZXREYXRlKHdlZWsuZ2V0RGF0ZSgpICsgNyk7XG4gICAgICAgIHdlZWsgPSBjb252ZXJ0RGF0ZVRvU3RyaW5nKHdlZWspO1xuXG4gICAgICAgIC8vU3RhcnQgYXQgaT0zIHRvIHNraXAgdGhlIHByZW1hZGUgbGlzdHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBMSVNUUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTElTVFNbaV0uaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kdWVEYXRlID49IHRvZGF5ICYmIGl0ZW0uZHVlRGF0ZSA8PSB3ZWVrKSB7XG4gICAgICAgICAgICAgICAgICAgIExJU1RTWzJdLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdHMoKSB7XG4gICAgICAgIGlmIChnZXRMb2NhbFN0b3JhZ2UoJ0xJU1RTJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RzID0gZ2V0TG9jYWxTdG9yYWdlKCdMSVNUUycpO1xuICAgICAgICAgICAgbGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGxpc3QudGl0bGUsIGxpc3QuaXRlbXMsIGxpc3QuaWNvbiwgbGlzdC5jdXN0b20sIGxpc3QuYWN0aXZlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGBUb2RheWAsIFtdLCBgdG9kYXlgLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgY3JlYXRlTmV3TGlzdChgVG9tb3Jyb3dgLCBbXSwgYGV2ZW50YCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRoaXMgV2Vla2AsIFtdLCBgZGF0ZV9yYW5nZWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGBUby1Eb2AsIFtdLCBgY2hlY2tsaXN0YCwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9O1xuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRBY3RpdmVMaXN0KCkge1xuICAgICAgICBpZiAoZ2V0TG9jYWxTdG9yYWdlKCdhY3RpdmVMaXN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBnZXRMb2NhbFN0b3JhZ2UoJ2FjdGl2ZUxpc3QnKTtcbiAgICAgICAgICAgIHNldEFjdGl2ZUxpc3QobnVsbCwgYWN0aXZlTGlzdCk7XG4gICAgICAgIH0gZWxzZSB7fTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgICAgICBpbml0QWN0aXZlTGlzdCgpO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVOZXdMaXN0LFxuICAgICAgICBnZXRMaXN0cyxcbiAgICAgICAgc2V0QWN0aXZlTGlzdCxcbiAgICAgICAgZ2V0QWN0aXZlTGlzdCxcbiAgICAgICAgbWFuYWdlSXRlbXMsXG4gICAgICAgIGRlbGV0ZUxpc3QsXG4gICAgICAgIGRlbGV0ZUl0ZW0sXG4gICAgICAgIHNldER1ZURhdGUsXG4gICAgfVxufSkoKTtcblxuY29uc3QgbWVudU1vZHVsZSA9ICgoKSA9PiB7XG4gICAgZXZlbnRzLnN1YnNjcmliZShgZGVsZXRlTGlzdGAsIHJlc2V0TGlzdHMpO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRMaXN0cyhsaXN0TmFtZSkge1xuICAgICAgICBjb25zdCBtZW51TGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubWVudS1idXR0b25zYCk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKG1lbnVMaXN0cykuZmluZChsaXN0ID0+IGxpc3QubmFtZSA9PT0gbGlzdE5hbWUpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICBsaXN0TWFuYWdlci5zZXRBY3RpdmVMaXN0KCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcbiAgICAgICAgY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG4gICAgICAgIGNvbnN0IG1lbnVCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QmdgKTtcblxuICAgICAgICBtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoYGFjdGl2ZWApO1xuICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQnRuKGV2ZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZExpc3Q7XG4gICAgICAgIGlmIChldmVudCkgc2VsZWN0ZWRMaXN0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgICAgICBjb25zdCBtZW51TGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubWVudS1idXR0b25zYCk7XG4gICAgICAgICAgICBzZWxlY3RlZExpc3QgPSBBcnJheS5mcm9tKG1lbnVMaXN0cykuZmluZChsaXN0ID0+IGxpc3QubmFtZSA9PT0gYWN0aXZlTGlzdC50aXRsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2VsZWN0ZWRgKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYHNlbGVjdGVkYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxlY3RlZExpc3QuY2xhc3NMaXN0LmFkZChgc2VsZWN0ZWRgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTGlzdENsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxpc3RNYW5hZ2VyLnNldEFjdGl2ZUxpc3QoZXZlbnQpO1xuICAgICAgICB1cGRhdGVTZWxlY3RlZEJ0bihldmVudCk7XG4gICAgICAgIGNsb3NlTWVudSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRCdG5MaXN0ZW5lcihidG4pIHtcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgaGFuZGxlTGlzdENsaWNrKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFrZUJ0bihsaXN0KSB7XG4gICAgICAgIGxldCBjb250YWluZXI7XG5cbiAgICAgICAgaWYgKGxpc3QuY3VzdG9tID09IGZhbHNlKSBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJlbWFkZUxpc3RzYCk7XG4gICAgICAgIGVsc2UgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGN1c3RvbUxpc3RzYCk7XG5cbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKGBtZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgYnRuLmlkID0gbGlzdC50aXRsZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICAgIGJ0bi5uYW1lID0gbGlzdC50aXRsZTtcblxuICAgICAgICBjb25zdCBpY29uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgaWNvblNwYW4uY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGApO1xuICAgICAgICBpY29uU3Bhbi5pbm5lclRleHQgPSBsaXN0Lmljb247XG5cbiAgICAgICAgY29uc3QgYnRuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgYnRuVGV4dC5pbm5lclRleHQgPSBsaXN0LnRpdGxlO1xuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaWNvblNwYW4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG5cbiAgICAgICAgc2V0QnRuTGlzdGVuZXIoYnRuKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkTmV3TGlzdCgpIHtcbiAgICAgICAgY29uc3QgbGlzdHMgPSBsaXN0TWFuYWdlci5nZXRMaXN0cygpO1xuICAgICAgICBsZXQgbGlzdE5hbWUgPSBwcm9tcHQoYE5ldyBMaXN0IE5hbWU6YCk7XG4gICAgICAgIGlmICghbGlzdE5hbWUpIHJldHVybjtcblxuICAgICAgICBsZXQgaW52YWxpZCA9IGxpc3RzLmZpbmQobGlzdCA9PiBsaXN0LnRpdGxlID09PSBsaXN0TmFtZSk7XG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgd2hpbGUgKGludmFsaWQpIHtcbiAgICAgICAgICAgIGxpc3ROYW1lID0gcHJvbXB0KGBMaXN0IE5hbWUgYWxyZWFkeSB1c2VkLiBQbGVhc2UgdXNlIGEgZGlmZmVyZW50IGxpc3QgbmFtZTpgKTtcbiAgICAgICAgICAgIGludmFsaWQgPSBsaXN0cy5maW5kKGxpc3QgPT4gbGlzdC50aXRsZSA9PT0gbGlzdE5hbWUpO1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gNSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChgRXJyb3IgY3JlYXRpbmcgbGlzdC4gUGxlYXNlIHRyeSBhZ2FpbmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsaXN0TWFuYWdlci5jcmVhdGVOZXdMaXN0KGxpc3ROYW1lLCBbXSwgYGNoZWNrbGlzdGAsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgbWFrZUJ0bih7IHRpdGxlOiBsaXN0TmFtZSwgaWNvbjogYGNoZWNrbGlzdGAsIGN1c3RvbTogdHJ1ZSB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkTGlzdExpc3RlbmVyKCkge1xuICAgICAgICBjb25zdCBhZGRMaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZExpc3RgKTtcbiAgICAgICAgYWRkTGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGFkZE5ld0xpc3QpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdHMoKSB7XG4gICAgICAgIGNvbnN0IGxpc3RzID0gbGlzdE1hbmFnZXIuZ2V0TGlzdHMoKTtcbiAgICAgICAgbGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgIG1ha2VCdG4obGlzdCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RzKCk7XG4gICAgICAgIGFkZExpc3RMaXN0ZW5lcigpO1xuICAgICAgICB1cGRhdGVTZWxlY3RlZEJ0bigpO1xuICAgIH0oKSk7XG5cbn0pKCk7XG5cbmNvbnN0IG1haW5TY3JlZW5Nb2R1bGUgPSAoKCkgPT4ge1xuICAgIGV2ZW50cy5zdWJzY3JpYmUoYHVwZGF0ZUFjdGl2ZUxpc3RgLCB1cGRhdGVBY3RpdmVMaXN0KTtcbiAgICBldmVudHMuc3Vic2NyaWJlKGBkZWxldGVJdGVtYCwgZGVsZXRlTGlzdEl0ZW0pO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlTGlzdEl0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubGlzdC1pdGVtYCk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKGl0ZW1zKS5maW5kKGl0ZW0gPT4gaXRlbS5jaGlsZE5vZGVzWzFdLmlubmVyVGV4dCA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVIZWFkZXIoYWN0aXZlTGlzdCkge1xuICAgICAgICBjb25zdCBoZWFkZXJMaXN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBoZWFkZXJMaXN0TmFtZWApO1xuICAgICAgICBoZWFkZXJMaXN0TmFtZS5pbm5lclRleHQgPSBhY3RpdmVMaXN0LnRpdGxlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMaXN0SXRlbXMoYWN0aXZlTGlzdCkge1xuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYGxpc3QtaXRlbWApO1xuICAgICAgICB3aGlsZSAobGkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGlbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsaVswXSk7XG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmVMaXN0Lml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBzZXR1cE5ld0l0ZW0oaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjaGVja0N1c3RvbUxpc3QoYWN0aXZlTGlzdCkge1xuICAgICAgICBjb25zdCBhZGRJdGVtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKTtcbiAgICAgICAgY29uc3QgbGlzdE9wdGlvbnNJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxpc3RPcHRpb25zYCk7XG5cbiAgICAgICAgaWYgKGFjdGl2ZUxpc3QuY3VzdG9tID09IGZhbHNlKSB7XG4gICAgICAgICAgICBhZGRJdGVtQnRuLmNsYXNzTGlzdC5hZGQoYHJlbW92ZWRgKTtcbiAgICAgICAgICAgIGxpc3RPcHRpb25zSWNvbi5jbGFzc0xpc3QuYWRkKGByZW1vdmVkYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRJdGVtQnRuLmNsYXNzTGlzdC5yZW1vdmUoYHJlbW92ZWRgKTtcbiAgICAgICAgICAgIGxpc3RPcHRpb25zSWNvbi5jbGFzc0xpc3QucmVtb3ZlKGByZW1vdmVkYCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlQWN0aXZlTGlzdCgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IGxpc3RNYW5hZ2VyLmdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgYWN0aXZlTGlzdC5zb3J0SXRlbXMoYWN0aXZlTGlzdCk7XG4gICAgICAgIHVwZGF0ZUhlYWRlcihhY3RpdmVMaXN0KTtcbiAgICAgICAgdXBkYXRlTGlzdEl0ZW1zKGFjdGl2ZUxpc3QpO1xuICAgICAgICBjaGVja0N1c3RvbUxpc3QoYWN0aXZlTGlzdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoZWNrYm94KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIGxldCBjaGVja2JveDtcblxuICAgICAgICBpZiAoZXZlbnQpIGNoZWNrYm94ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBlbHNlIGNoZWNrYm94ID0gZGF0YTtcbiAgICAgICAgY29uc3QgbGkgPSBjaGVja2JveC5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCB0ZXh0ID0gbGkuY2hpbGRyZW5bMV07XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBsaS5jaGlsZHJlblsyXTtcblxuICAgICAgICBpZiAoY2hlY2tib3guaW5uZXJUZXh0ID09PSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgKSB7XG4gICAgICAgICAgICBjaGVja2JveC5pbm5lclRleHQgPSBgY2hlY2tfYm94YDtcbiAgICAgICAgICAgIHRleHQuc3R5bGUuc2V0UHJvcGVydHkoYHRleHQtZGVjb3JhdGlvbmAsIGBsaW5lLXRocm91Z2hgKTtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNldFByb3BlcnR5KGBvcGFjaXR5YCwgYDUwJWApO1xuICAgICAgICAgICAgZHVlRGF0ZS5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYGxpbmUtdGhyb3VnaGApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tib3guaW5uZXJUZXh0ID0gYGNoZWNrX2JveF9vdXRsaW5lX2JsYW5rYDtcbiAgICAgICAgICAgIHRleHQuc3R5bGUuc2V0UHJvcGVydHkoYHRleHQtZGVjb3JhdGlvbmAsIGBub25lYCk7XG4gICAgICAgICAgICBsaS5zdHlsZS5zZXRQcm9wZXJ0eShgb3BhY2l0eWAsIGAxMDAlYCk7XG4gICAgICAgICAgICBkdWVEYXRlLnN0eWxlLnNldFByb3BlcnR5KGB0ZXh0LWRlY29yYXRpb25gLCBgbm9uZWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgbGlzdE1hbmFnZXIubWFuYWdlSXRlbXModGV4dC5pbm5lclRleHQsIGBzdGF0dXNDaGFuZ2VgKTtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZUxpc3QoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRJdGVtTGlzdGVuZXIoaWNvbiwgaXRlbU9wdGlvbnMsIGR1ZURhdGUpIHtcbiAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZUNoZWNrYm94KTtcbiAgICAgICAgaXRlbU9wdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBsaXN0TWFuYWdlci5kZWxldGVJdGVtKTtcbiAgICAgICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKGBjaGFuZ2VgLCBsaXN0TWFuYWdlci5zZXREdWVEYXRlKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBOZXdJdGVtKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdEl0ZW1zYCk7XG5cbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBsaWApO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKGBsaXN0LWl0ZW1gKTtcblxuICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgLCBgaXRlbS1jaGVja2JveGApO1xuICAgICAgICBpY29uLmlubmVyVGV4dCA9IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2A7XG5cbiAgICAgICAgY29uc3QgaXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGl0ZW1UZXh0LmNsYXNzTGlzdC5hZGQoYGl0ZW0tdGV4dGApO1xuICAgICAgICBpdGVtVGV4dC5pbm5lclRleHQgPSBpdGVtLm5hbWU7XG5cbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGR1ZURhdGUudHlwZSA9IGBkYXRlYDtcbiAgICAgICAgZHVlRGF0ZS5jbGFzc0xpc3QuYWRkKGBpdGVtLWR1ZURhdGVgKTtcbiAgICAgICAgZHVlRGF0ZS52YWx1ZSA9IGl0ZW0uZHVlRGF0ZTtcblxuICAgICAgICBjb25zdCBpdGVtT3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgaXRlbU9wdGlvbnMuY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGAsIGBpdGVtLW9wdGlvbnNgKTtcbiAgICAgICAgaXRlbU9wdGlvbnMuaW5uZXJUZXh0ID0gYGRlbGV0ZWA7XG5cbiAgICAgICAgdWwuaW5zZXJ0QmVmb3JlKGxpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWRkSXRlbWApKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGl0ZW1UZXh0KTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoZHVlRGF0ZSk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGl0ZW1PcHRpb25zKTtcblxuICAgICAgICBpZiAoaXRlbS5jb21wbGV0ZWQpIHVwZGF0ZUNoZWNrYm94KG51bGwsIGljb24pO1xuICAgICAgICBzZXRJdGVtTGlzdGVuZXIoaWNvbiwgaXRlbU9wdGlvbnMsIGR1ZURhdGUpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGRJdGVtKCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gbGlzdE1hbmFnZXIuZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBsZXQgaXRlbU5hbWUgPSBwcm9tcHQoYE5ldyBMaXN0IEl0ZW06YCk7XG4gICAgICAgIGlmICghaXRlbU5hbWUpIHJldHVybjtcblxuICAgICAgICBsZXQgaW52YWxpZCA9IGxpc3QuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChpbnZhbGlkKSB7XG4gICAgICAgICAgICBpdGVtTmFtZSA9IHByb21wdChgSXRlbSBhbHJlYWR5IGV4aXN0cy4gUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGl0ZW06YCk7XG4gICAgICAgICAgICBpbnZhbGlkID0gbGlzdC5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICBpZiAoY291bnRlciA+PSA1KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KGBFcnJvciBjcmVhdGluZyBpdGVtLiBQbGVhc2UgdHJ5IGFnYWluYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNldHVwTmV3SXRlbSh7IG5hbWU6IGl0ZW1OYW1lLCBub3RlczogYGAsIGR1ZURhdGU6IG51bGwsIGNvbXBsZXRlZDogZmFsc2UgfSk7XG4gICAgICAgIGxpc3RNYW5hZ2VyLm1hbmFnZUl0ZW1zKGl0ZW1OYW1lLCBgbmV3YCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJ0bmApO1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuICAgICAgICBjb25zdCBhZGRJdGVtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKTtcbiAgICAgICAgY29uc3QgbGlzdE9wdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdE9wdGlvbnNgKTtcblxuICAgICAgICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIW1lbnVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIGlmICghbWVudUJnLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVCZy5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lbnVCZy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZEl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGRJdGVtKTtcbiAgICAgICAgbGlzdE9wdGlvbnMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBsaXN0TWFuYWdlci5kZWxldGVMaXN0KTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdXBkYXRlQWN0aXZlTGlzdCgpO1xuICAgIH0oKSk7XG59KSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==