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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const events = {
    events: {},
    subscribe(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    unsubscribe(eventName, fn) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((fn) => {
                fn(data);
            });
        }
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (events);

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub.js */ "./src/pubsub.js");


function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
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

function updateLocalStorage(name, data) {
    if (storageAvailable('localStorage')) {
        localStorage.setItem(name, JSON.stringify(data));
    }
}

function getLocalStorage(data) {
    if (storageAvailable('localStorage')) {
        if (localStorage.getItem(data)) {
            return JSON.parse(localStorage.getItem(data));
        }
    }
    return false;
}

_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateLocalStorage', (data) => { updateLocalStorage(data[0], data[1]) });

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getLocalStorage);

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
    constructor(
        title,
        items = [],
        icon = 'checklist',
        custom = true,
        active = false,
    ) {
        this.title = title;
        this.items = items;
        this.icon = icon;
        this.custom = custom;
        this.active = active;
    }

    set isActive(value) {
        if (value) this.active = true;
        else this.active = false;
    }

    get isActive() {
        return this.active;
    }

    newItem(itemName) {
        this.items.push({
            name: itemName,
            notes: '',
            dueDate: null,
            completed: false,
        });
    }

    updateItemCompletion(itemName) {
        const item = this.items.find((a) => a.name === itemName);
        item.completed = !item.completed;
    }

    deleteItem(itemName) {
        const index = this.items.findIndex((item) => item.name === itemName);
        this.items.splice(index, 1);
    }

    setDueDate(itemName, date) {
        const item = this.items.find((a) => a.name === itemName);
        item.dueDate = date;
    }

    sortItems() {
        this.items.sort((a, b) => {
            // sort completed items at end of list
            if (a.completed > b.completed) return 1;
            if (a.completed < b.completed) return -1;

            // sort by due date
            if (a.dueDate > b.dueDate) return 1;
            if (a.dueDate < b.dueDate) return -1;

            return 0;
        });
    }
}

const listManager = (() => {
    const LISTS = [];

    function updateLocalStorage(name, data) {
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateLocalStorage', [name, data]);
    }

    const createNewList = (title, items = [], icon = 'checklist', custom = true, active = false) => {
        const list = new List(title, items, icon, custom, active);
        LISTS.push(list);
        updateLocalStorage('LISTS', LISTS);
    };

    function convertDateToString(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    };

    function setupToday() {
        const list = LISTS[0];
        list.items = [];
        const date = new Date();
        const today = convertDateToString(date);

        // Start at i=3 to skip the premade lists
        for (let i = 3; i < LISTS.length; i++) {
            LISTS[i].items.forEach((item) => {
                if (item.dueDate === today) {
                    LISTS[0].items.push(item);
                }
            });
        }
    };

    function setupTomorrow() {
        const list = LISTS[1];
        list.items = [];
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const tomorrow = convertDateToString(date);

        // Start at i=3 to skip the premade lists
        for (let i = 3; i < LISTS.length; i++) {
            LISTS[i].items.forEach((item) => {
                if (item.dueDate === tomorrow) {
                    LISTS[1].items.push(item);
                }
            });
        }
    };

    function setupThisWeek() {
        const list = LISTS[2];
        list.items = [];
        const date = new Date();
        const today = convertDateToString(date);
        let week = new Date();
        week.setDate(week.getDate() + 7);
        week = convertDateToString(week);

        // Start at i=3 to skip the premade lists
        for (let i = 3; i < LISTS.length; i++) {
            LISTS[i].items.forEach((item) => {
                if (item.dueDate >= today && item.dueDate <= week) {
                    LISTS[2].items.push(item);
                }
            });
        }
    };

    const setActiveList = (event, fromStorage = null) => {
        let selectedList;
        if (event) selectedList = event.target.name;
        else if (fromStorage) selectedList = fromStorage.title;
        else selectedList = LISTS[0].title;

        LISTS.forEach((list) => {
            list.isActive = false;
        });

        const activeList = LISTS.find((list) => list.title === selectedList);
        activeList.isActive = true;

        if (activeList.title === 'Today') setupToday();
        if (activeList.title === 'Tomorrow') setupTomorrow();
        if (activeList.title === 'This Week') setupThisWeek();

        updateLocalStorage('activeList', activeList);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateActiveList');
    };

    const getActiveList = () => {
        let activeList = LISTS.find((list) => list.isActive === true);
        if (!activeList) activeList = LISTS[0];
        return activeList;
    };

    const manageItems = (itemName, action) => {
        const list = getActiveList();
        if (action === 'new') list.newItem(itemName);
        if (action === 'statusChange') list.updateItemCompletion(itemName);
        updateLocalStorage('LISTS', LISTS);
    };

    const setDueDate = (event) => {
        const list = getActiveList();
        const date = event.target.value;
        const itemName = event.target.parentNode.childNodes[1].innerText;
        list.setDueDate(itemName, date);
        updateLocalStorage('LISTS', LISTS);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateActiveList');
    };

    const getLists = () => LISTS;

    const deleteList = () => {
        if (!window.confirm('Delete List?')) return;
        const activeList = getActiveList();
        const index = LISTS.findIndex((list) => list.title === activeList.title);
        LISTS.splice(index, 1);

        updateLocalStorage('LISTS', LISTS);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].publish('deleteList', activeList.title);
    };

    const deleteItem = (event) => {
        if (!window.confirm('Delete Item?')) return;
        const list = getActiveList();
        const itemName = event.target.parentNode.childNodes[1].innerText;
        list.deleteItem(itemName);

        updateLocalStorage('LISTS', LISTS);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].publish('deleteItem', itemName);
    };

    function initLists() {
        if ((0,_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"])('LISTS')) {
            const lists = (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"])('LISTS');
            lists.forEach((list) => {
                createNewList(list.title, list.items, list.icon, list.custom, list.active);
            });
        } else {
            createNewList('Today', [], 'today', false, false);
            createNewList('Tomorrow', [], 'event', false, false);
            createNewList('This Week', [], 'date_range', false, false);
            createNewList('To-Do', [], 'checklist', true, false);
        }
    };

    function initActiveList() {
        if ((0,_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"])('activeList')) {
            const activeList = (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__["default"])('activeList');
            setActiveList(null, activeList);
        }
    };

    (function init() {
        initLists();
        initActiveList();
    }());

    return {
        createNewList,
        getLists,
        setActiveList,
        getActiveList,
        manageItems,
        deleteList,
        deleteItem,
        setDueDate,
    };
})();

const menuModule = (() => {

    function resetLists(listName) {
        const menuLists = document.querySelectorAll('.menu-buttons');
        const element = Array.from(menuLists).find((list) => list.name === listName);
        element.remove();
        listManager.setActiveList();
    }

    function closeMenu() {
        const menuContainer = document.getElementById('menu');
        const menuBg = document.getElementById('menuBg');

        menuContainer.classList.remove('active');
        menuBg.classList.remove('active');
    }

    function updateSelectedBtn(event) {
        let selectedList;
        if (event) selectedList = event.target;
        else {
            const activeList = listManager.getActiveList();
            const menuLists = document.querySelectorAll('.menu-buttons');
            selectedList = Array.from(menuLists).find((list) => list.name === activeList.title);
        }

        document.querySelectorAll('.selected').forEach((el) => {
            el.classList.remove('selected');
        });
        selectedList.classList.add('selected');
    }

    function handleListClick(event) {
        listManager.setActiveList(event);
        updateSelectedBtn(event);
        closeMenu();
    }

    function setBtnListener(btn) {
        btn.addEventListener('click', handleListClick);
    }

    function makeBtn(list) {
        let container;

        if (list.custom === false) container = document.getElementById('premadeLists');
        else container = document.getElementById('customLists');

        const btn = document.createElement('button');
        btn.classList.add('menu-buttons');
        btn.id = list.title.replace(/\s/g, '');
        btn.name = list.title;

        const iconSpan = document.createElement('span');
        iconSpan.classList.add('material-symbols-outlined');
        iconSpan.innerText = list.icon;

        const btnText = document.createElement('span');
        btnText.innerText = list.title;

        container.appendChild(btn);
        btn.appendChild(iconSpan);
        btn.appendChild(btnText);

        setBtnListener(btn);
    }

    function addNewList() {
        const lists = listManager.getLists();
        let listName = prompt('New List Name:');
        if (!listName) return;

        let invalid = lists.find((list) => list.title === listName);
        let counter = 0;
        while (invalid) {
            listName = prompt('List Name already used. Please use a different list name:');
            invalid = lists.find((list) => list.title === listName);
            counter += 1;
            if (counter >= 5) {
                window.alert('Error creating list. Please try again');
                return;
            }
        }

        listManager.createNewList(listName, [], 'checklist', true, false);
        makeBtn({ title: listName, icon: 'checklist', custom: true });
    }

    function addListListener() {
        const addListBtn = document.getElementById('addList');
        addListBtn.addEventListener('click', addNewList);
    }

    function initLists() {
        const lists = listManager.getLists();
        lists.forEach((list) => {
            makeBtn(list);
        });
    }

    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('deleteList', resetLists);

    (function init() {
        initLists();
        addListListener();
        updateSelectedBtn();
    }());
})();

const mainScreenModule = (() => {

    function deleteListItem(itemName) {
        const items = document.querySelectorAll('.list-item');
        const element = Array.from(items).find((item) => item.childNodes[1].innerText === itemName);
        element.remove();
    };

    function updateCheckbox(event, data) {
        let checkbox;

        if (event) checkbox = event.target;
        else checkbox = data;
        const li = checkbox.parentNode;
        const text = li.children[1];
        const dueDate = li.children[2];

        if (checkbox.innerText === 'check_box_outline_blank') {
            checkbox.innerText = 'check_box';
            text.style.setProperty('text-decoration', 'line-through');
            li.style.setProperty('opacity', '50%');
            dueDate.style.setProperty('text-decoration', 'line-through');
        } else {
            checkbox.innerText = 'check_box_outline_blank';
            text.style.setProperty('text-decoration', 'none');
            li.style.setProperty('opacity', '100%');
            dueDate.style.setProperty('text-decoration', 'none');
        }
        if (event) {
            listManager.manageItems(text.innerText, 'statusChange');
            updateActiveList();
        }
    };

    function setItemListener(icon, itemOptions, dueDate) {
        icon.addEventListener('click', updateCheckbox);
        itemOptions.addEventListener('click', listManager.deleteItem);
        dueDate.addEventListener('change', listManager.setDueDate);
    };

    function setupNewItem(item) {
        const ul = document.getElementById('listItems');

        const li = document.createElement('li');
        li.classList.add('list-item');

        const icon = document.createElement('span');
        icon.classList.add('material-symbols-outlined', 'item-checkbox');
        icon.innerText = 'check_box_outline_blank';

        const itemText = document.createElement('span');
        itemText.classList.add('item-text');
        itemText.innerText = item.name;

        const dueDate = document.createElement('input');
        dueDate.type = 'date';
        dueDate.classList.add('item-dueDate');
        dueDate.value = item.dueDate;

        const itemOptions = document.createElement('span');
        itemOptions.classList.add('material-symbols-outlined', 'item-options');
        itemOptions.innerText = 'delete';

        ul.insertBefore(li, document.getElementById('addItem'));
        li.appendChild(icon);
        li.appendChild(itemText);
        li.appendChild(dueDate);
        li.appendChild(itemOptions);

        if (item.completed) updateCheckbox(null, icon);
        setItemListener(icon, itemOptions, dueDate);
    };

    function updateHeader(activeList) {
        const headerListName = document.getElementById('headerListName');
        headerListName.innerText = activeList.title;
    };

    function checkCustomList(activeList) {
        const addItemBtn = document.getElementById('addItem');
        const listOptionsIcon = document.getElementById('listOptions');

        if (activeList.custom === false) {
            addItemBtn.classList.add('removed');
            listOptionsIcon.classList.add('removed');
        } else {
            addItemBtn.classList.remove('removed');
            listOptionsIcon.classList.remove('removed');
        }
    };

    function updateListItems(activeList) {
        const li = document.getElementsByClassName('list-item');
        while (li.length > 0) {
            li[0].parentNode.removeChild(li[0]);
        }

        activeList.items.forEach((item) => {
            setupNewItem(item);
        });
    };

    function updateActiveList() {
        const activeList = listManager.getActiveList();
        activeList.sortItems(activeList);
        updateHeader(activeList);
        updateListItems(activeList);
        checkCustomList(activeList);
    };

    function addItem() {
        const list = listManager.getActiveList();
        let itemName = prompt('New List Item:');
        if (!itemName) return;

        let invalid = list.items.find((item) => item.name === itemName);
        let counter = 0;
        while (invalid) {
            itemName = prompt('Item already exists. Please enter a different item:');
            invalid = list.items.find((item) => item.name === itemName);
            counter += 1;
            if (counter >= 5) {
                window.alert('Error creating item. Please try again');
                return;
            }
        }

        setupNewItem({
            name: itemName,
            notes: '',
            dueDate: null,
            completed: false,
        });
        listManager.manageItems(itemName, 'new');
    }

    function initListeners() {
        const menuButton = document.getElementById('menuBtn');
        const menuContainer = document.getElementById('menu');
        const menuBg = document.getElementById('menuBg');
        const addItemBtn = document.getElementById('addItem');
        const listOptions = document.getElementById('listOptions');

        menuButton.addEventListener('click', () => {
            if (!menuContainer.classList.contains('active')) menuContainer.classList.add('active');
            if (!menuBg.classList.contains('active')) menuBg.classList.add('active');
        });
        menuBg.addEventListener('click', () => {
            menuContainer.classList.remove('active');
            menuBg.classList.remove('active');
        });
        addItemBtn.addEventListener('click', addItem);
        listOptions.addEventListener('click', listManager.deleteList);
    }

    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateActiveList', updateActiveList);
    _pubsub_js__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('deleteItem', deleteListItem);

    (function init() {
        initListeners();
        updateActiveList();
    }());
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsSUFBSSw0REFBZ0I7QUFDcEIsSUFBSSw0REFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDLEkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0ge1xuICAgIGV2ZW50czoge30sXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfSxcbiAgICB1bnN1YnNjcmliZShldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IHtcbiAgICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzOyIsImltcG9ydCBldmVudHMgZnJvbSBcIi4vcHVic3ViLmpzXCI7XG5cbmZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICAgICAgKHN0b3JhZ2UgJiYgc3RvcmFnZS5sZW5ndGggIT09IDApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKG5hbWUsIGRhdGEpIHtcbiAgICBpZiAoc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJykpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKGRhdGEpIHtcbiAgICBpZiAoc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJykpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGRhdGEpKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5ldmVudHMuc3Vic2NyaWJlKCd1cGRhdGVMb2NhbFN0b3JhZ2UnLCAoZGF0YSkgPT4geyB1cGRhdGVMb2NhbFN0b3JhZ2UoZGF0YVswXSwgZGF0YVsxXSkgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldExvY2FsU3RvcmFnZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBldmVudHMgZnJvbSAnLi9wdWJzdWIuanMnO1xuaW1wb3J0IGdldExvY2FsU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuXG5jbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGl0ZW1zID0gW10sXG4gICAgICAgIGljb24gPSAnY2hlY2tsaXN0JyxcbiAgICAgICAgY3VzdG9tID0gdHJ1ZSxcbiAgICAgICAgYWN0aXZlID0gZmFsc2UsXG4gICAgKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgICB0aGlzLmN1c3RvbSA9IGN1c3RvbTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XG4gICAgfVxuXG4gICAgc2V0IGlzQWN0aXZlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBlbHNlIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgfVxuXG4gICAgbmV3SXRlbShpdGVtTmFtZSkge1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogaXRlbU5hbWUsXG4gICAgICAgICAgICBub3RlczogJycsXG4gICAgICAgICAgICBkdWVEYXRlOiBudWxsLFxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbUNvbXBsZXRpb24oaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXMuZmluZCgoYSkgPT4gYS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgIGl0ZW0uY29tcGxldGVkID0gIWl0ZW0uY29tcGxldGVkO1xuICAgIH1cblxuICAgIGRlbGV0ZUl0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICBzZXREdWVEYXRlKGl0ZW1OYW1lLCBkYXRlKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zLmZpbmQoKGEpID0+IGEubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBpdGVtLmR1ZURhdGUgPSBkYXRlO1xuICAgIH1cblxuICAgIHNvcnRJdGVtcygpIHtcbiAgICAgICAgdGhpcy5pdGVtcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAvLyBzb3J0IGNvbXBsZXRlZCBpdGVtcyBhdCBlbmQgb2YgbGlzdFxuICAgICAgICAgICAgaWYgKGEuY29tcGxldGVkID4gYi5jb21wbGV0ZWQpIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGEuY29tcGxldGVkIDwgYi5jb21wbGV0ZWQpIHJldHVybiAtMTtcblxuICAgICAgICAgICAgLy8gc29ydCBieSBkdWUgZGF0ZVxuICAgICAgICAgICAgaWYgKGEuZHVlRGF0ZSA+IGIuZHVlRGF0ZSkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAoYS5kdWVEYXRlIDwgYi5kdWVEYXRlKSByZXR1cm4gLTE7XG5cbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGxpc3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgICBjb25zdCBMSVNUUyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKG5hbWUsIGRhdGEpIHtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goJ3VwZGF0ZUxvY2FsU3RvcmFnZScsIFtuYW1lLCBkYXRhXSk7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlTmV3TGlzdCA9ICh0aXRsZSwgaXRlbXMgPSBbXSwgaWNvbiA9ICdjaGVja2xpc3QnLCBjdXN0b20gPSB0cnVlLCBhY3RpdmUgPSBmYWxzZSkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0ID0gbmV3IExpc3QodGl0bGUsIGl0ZW1zLCBpY29uLCBjdXN0b20sIGFjdGl2ZSk7XG4gICAgICAgIExJU1RTLnB1c2gobGlzdCk7XG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgnTElTVFMnLCBMSVNUUyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNvbnZlcnREYXRlVG9TdHJpbmcoZGF0ZSkge1xuICAgICAgICBjb25zdCBkZCA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgY29uc3QgeXl5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcmV0dXJuIGAke3l5eXl9LSR7bW19LSR7ZGR9YDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBUb2RheSgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IExJU1RTWzBdO1xuICAgICAgICBsaXN0Lml0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0b2RheSA9IGNvbnZlcnREYXRlVG9TdHJpbmcoZGF0ZSk7XG5cbiAgICAgICAgLy8gU3RhcnQgYXQgaT0zIHRvIHNraXAgdGhlIHByZW1hZGUgbGlzdHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBMSVNUUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTElTVFNbaV0uaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmR1ZURhdGUgPT09IHRvZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIExJU1RTWzBdLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBUb21vcnJvdygpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IExJU1RTWzFdO1xuICAgICAgICBsaXN0Lml0ZW1zID0gW107XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgY29uc3QgdG9tb3Jyb3cgPSBjb252ZXJ0RGF0ZVRvU3RyaW5nKGRhdGUpO1xuXG4gICAgICAgIC8vIFN0YXJ0IGF0IGk9MyB0byBza2lwIHRoZSBwcmVtYWRlIGxpc3RzXG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpIDwgTElTVFMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIExJU1RTW2ldLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kdWVEYXRlID09PSB0b21vcnJvdykge1xuICAgICAgICAgICAgICAgICAgICBMSVNUU1sxXS5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwVGhpc1dlZWsoKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBMSVNUU1syXTtcbiAgICAgICAgbGlzdC5pdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBjb252ZXJ0RGF0ZVRvU3RyaW5nKGRhdGUpO1xuICAgICAgICBsZXQgd2VlayA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHdlZWsuc2V0RGF0ZSh3ZWVrLmdldERhdGUoKSArIDcpO1xuICAgICAgICB3ZWVrID0gY29udmVydERhdGVUb1N0cmluZyh3ZWVrKTtcblxuICAgICAgICAvLyBTdGFydCBhdCBpPTMgdG8gc2tpcCB0aGUgcHJlbWFkZSBsaXN0c1xuICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA8IExJU1RTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBMSVNUU1tpXS5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZHVlRGF0ZSA+PSB0b2RheSAmJiBpdGVtLmR1ZURhdGUgPD0gd2Vlaykge1xuICAgICAgICAgICAgICAgICAgICBMSVNUU1syXS5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNldEFjdGl2ZUxpc3QgPSAoZXZlbnQsIGZyb21TdG9yYWdlID0gbnVsbCkgPT4ge1xuICAgICAgICBsZXQgc2VsZWN0ZWRMaXN0O1xuICAgICAgICBpZiAoZXZlbnQpIHNlbGVjdGVkTGlzdCA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgICAgICBlbHNlIGlmIChmcm9tU3RvcmFnZSkgc2VsZWN0ZWRMaXN0ID0gZnJvbVN0b3JhZ2UudGl0bGU7XG4gICAgICAgIGVsc2Ugc2VsZWN0ZWRMaXN0ID0gTElTVFNbMF0udGl0bGU7XG5cbiAgICAgICAgTElTVFMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgICAgICAgICAgbGlzdC5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZCgobGlzdCkgPT4gbGlzdC50aXRsZSA9PT0gc2VsZWN0ZWRMaXN0KTtcbiAgICAgICAgYWN0aXZlTGlzdC5pc0FjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKGFjdGl2ZUxpc3QudGl0bGUgPT09ICdUb2RheScpIHNldHVwVG9kYXkoKTtcbiAgICAgICAgaWYgKGFjdGl2ZUxpc3QudGl0bGUgPT09ICdUb21vcnJvdycpIHNldHVwVG9tb3Jyb3coKTtcbiAgICAgICAgaWYgKGFjdGl2ZUxpc3QudGl0bGUgPT09ICdUaGlzIFdlZWsnKSBzZXR1cFRoaXNXZWVrKCk7XG5cbiAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKCdhY3RpdmVMaXN0JywgYWN0aXZlTGlzdCk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKCd1cGRhdGVBY3RpdmVMaXN0Jyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldEFjdGl2ZUxpc3QgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZCgobGlzdCkgPT4gbGlzdC5pc0FjdGl2ZSA9PT0gdHJ1ZSk7XG4gICAgICAgIGlmICghYWN0aXZlTGlzdCkgYWN0aXZlTGlzdCA9IExJU1RTWzBdO1xuICAgICAgICByZXR1cm4gYWN0aXZlTGlzdDtcbiAgICB9O1xuXG4gICAgY29uc3QgbWFuYWdlSXRlbXMgPSAoaXRlbU5hbWUsIGFjdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBsaXN0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBpZiAoYWN0aW9uID09PSAnbmV3JykgbGlzdC5uZXdJdGVtKGl0ZW1OYW1lKTtcbiAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3N0YXR1c0NoYW5nZScpIGxpc3QudXBkYXRlSXRlbUNvbXBsZXRpb24oaXRlbU5hbWUpO1xuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoJ0xJU1RTJywgTElTVFMpO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXREdWVEYXRlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBnZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0IGl0ZW1OYW1lID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuY2hpbGROb2Rlc1sxXS5pbm5lclRleHQ7XG4gICAgICAgIGxpc3Quc2V0RHVlRGF0ZShpdGVtTmFtZSwgZGF0ZSk7XG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgnTElTVFMnLCBMSVNUUyk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKCd1cGRhdGVBY3RpdmVMaXN0Jyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldExpc3RzID0gKCkgPT4gTElTVFM7XG5cbiAgICBjb25zdCBkZWxldGVMaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKCdEZWxldGUgTGlzdD8nKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IExJU1RTLmZpbmRJbmRleCgobGlzdCkgPT4gbGlzdC50aXRsZSA9PT0gYWN0aXZlTGlzdC50aXRsZSk7XG4gICAgICAgIExJU1RTLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKCdMSVNUUycsIExJU1RTKTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goJ2RlbGV0ZUxpc3QnLCBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlSXRlbSA9IChldmVudCkgPT4ge1xuICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKCdEZWxldGUgSXRlbT8nKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBsaXN0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBjb25zdCBpdGVtTmFtZSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmNoaWxkTm9kZXNbMV0uaW5uZXJUZXh0O1xuICAgICAgICBsaXN0LmRlbGV0ZUl0ZW0oaXRlbU5hbWUpO1xuXG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZSgnTElTVFMnLCBMSVNUUyk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKCdkZWxldGVJdGVtJywgaXRlbU5hbWUpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdHMoKSB7XG4gICAgICAgIGlmIChnZXRMb2NhbFN0b3JhZ2UoJ0xJU1RTJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RzID0gZ2V0TG9jYWxTdG9yYWdlKCdMSVNUUycpO1xuICAgICAgICAgICAgbGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNyZWF0ZU5ld0xpc3QobGlzdC50aXRsZSwgbGlzdC5pdGVtcywgbGlzdC5pY29uLCBsaXN0LmN1c3RvbSwgbGlzdC5hY3RpdmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KCdUb2RheScsIFtdLCAndG9kYXknLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgY3JlYXRlTmV3TGlzdCgnVG9tb3Jyb3cnLCBbXSwgJ2V2ZW50JywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGNyZWF0ZU5ld0xpc3QoJ1RoaXMgV2VlaycsIFtdLCAnZGF0ZV9yYW5nZScsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KCdUby1EbycsIFtdLCAnY2hlY2tsaXN0JywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRBY3RpdmVMaXN0KCkge1xuICAgICAgICBpZiAoZ2V0TG9jYWxTdG9yYWdlKCdhY3RpdmVMaXN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBnZXRMb2NhbFN0b3JhZ2UoJ2FjdGl2ZUxpc3QnKTtcbiAgICAgICAgICAgIHNldEFjdGl2ZUxpc3QobnVsbCwgYWN0aXZlTGlzdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgICAgICBpbml0QWN0aXZlTGlzdCgpO1xuICAgIH0oKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVOZXdMaXN0LFxuICAgICAgICBnZXRMaXN0cyxcbiAgICAgICAgc2V0QWN0aXZlTGlzdCxcbiAgICAgICAgZ2V0QWN0aXZlTGlzdCxcbiAgICAgICAgbWFuYWdlSXRlbXMsXG4gICAgICAgIGRlbGV0ZUxpc3QsXG4gICAgICAgIGRlbGV0ZUl0ZW0sXG4gICAgICAgIHNldER1ZURhdGUsXG4gICAgfTtcbn0pKCk7XG5cbmNvbnN0IG1lbnVNb2R1bGUgPSAoKCkgPT4ge1xuXG4gICAgZnVuY3Rpb24gcmVzZXRMaXN0cyhsaXN0TmFtZSkge1xuICAgICAgICBjb25zdCBtZW51TGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1idXR0b25zJyk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBBcnJheS5mcm9tKG1lbnVMaXN0cykuZmluZCgobGlzdCkgPT4gbGlzdC5uYW1lID09PSBsaXN0TmFtZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIGxpc3RNYW5hZ2VyLnNldEFjdGl2ZUxpc3QoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1lbnUoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudScpO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudUJnJyk7XG5cbiAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgbWVudUJnLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkQnRuKGV2ZW50KSB7XG4gICAgICAgIGxldCBzZWxlY3RlZExpc3Q7XG4gICAgICAgIGlmIChldmVudCkgc2VsZWN0ZWRMaXN0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgICAgICBjb25zdCBtZW51TGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1idXR0b25zJyk7XG4gICAgICAgICAgICBzZWxlY3RlZExpc3QgPSBBcnJheS5mcm9tKG1lbnVMaXN0cykuZmluZCgobGlzdCkgPT4gbGlzdC5uYW1lID09PSBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3RlZCcpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlTGlzdENsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxpc3RNYW5hZ2VyLnNldEFjdGl2ZUxpc3QoZXZlbnQpO1xuICAgICAgICB1cGRhdGVTZWxlY3RlZEJ0bihldmVudCk7XG4gICAgICAgIGNsb3NlTWVudSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEJ0bkxpc3RlbmVyKGJ0bikge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVMaXN0Q2xpY2spO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChsaXN0LmN1c3RvbSA9PT0gZmFsc2UpIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVtYWRlTGlzdHMnKTtcbiAgICAgICAgZWxzZSBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tTGlzdHMnKTtcblxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ21lbnUtYnV0dG9ucycpO1xuICAgICAgICBidG4uaWQgPSBsaXN0LnRpdGxlLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgIGJ0bi5uYW1lID0gbGlzdC50aXRsZTtcblxuICAgICAgICBjb25zdCBpY29uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgaWNvblNwYW4uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xuICAgICAgICBpY29uU3Bhbi5pbm5lclRleHQgPSBsaXN0Lmljb247XG5cbiAgICAgICAgY29uc3QgYnRuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgYnRuVGV4dC5pbm5lclRleHQgPSBsaXN0LnRpdGxlO1xuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaWNvblNwYW4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG5cbiAgICAgICAgc2V0QnRuTGlzdGVuZXIoYnRuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGROZXdMaXN0KCkge1xuICAgICAgICBjb25zdCBsaXN0cyA9IGxpc3RNYW5hZ2VyLmdldExpc3RzKCk7XG4gICAgICAgIGxldCBsaXN0TmFtZSA9IHByb21wdCgnTmV3IExpc3QgTmFtZTonKTtcbiAgICAgICAgaWYgKCFsaXN0TmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBpbnZhbGlkID0gbGlzdHMuZmluZCgobGlzdCkgPT4gbGlzdC50aXRsZSA9PT0gbGlzdE5hbWUpO1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChpbnZhbGlkKSB7XG4gICAgICAgICAgICBsaXN0TmFtZSA9IHByb21wdCgnTGlzdCBOYW1lIGFscmVhZHkgdXNlZC4gUGxlYXNlIHVzZSBhIGRpZmZlcmVudCBsaXN0IG5hbWU6Jyk7XG4gICAgICAgICAgICBpbnZhbGlkID0gbGlzdHMuZmluZCgobGlzdCkgPT4gbGlzdC50aXRsZSA9PT0gbGlzdE5hbWUpO1xuICAgICAgICAgICAgY291bnRlciArPSAxO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gNSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnRXJyb3IgY3JlYXRpbmcgbGlzdC4gUGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RNYW5hZ2VyLmNyZWF0ZU5ld0xpc3QobGlzdE5hbWUsIFtdLCAnY2hlY2tsaXN0JywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICBtYWtlQnRuKHsgdGl0bGU6IGxpc3ROYW1lLCBpY29uOiAnY2hlY2tsaXN0JywgY3VzdG9tOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZExpc3RMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgYWRkTGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRMaXN0Jyk7XG4gICAgICAgIGFkZExpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGROZXdMaXN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdHMoKSB7XG4gICAgICAgIGNvbnN0IGxpc3RzID0gbGlzdE1hbmFnZXIuZ2V0TGlzdHMoKTtcbiAgICAgICAgbGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgICAgICAgICAgbWFrZUJ0bihsaXN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXZlbnRzLnN1YnNjcmliZSgnZGVsZXRlTGlzdCcsIHJlc2V0TGlzdHMpO1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgICAgICBhZGRMaXN0TGlzdGVuZXIoKTtcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRCdG4oKTtcbiAgICB9KCkpO1xufSkoKTtcblxuY29uc3QgbWFpblNjcmVlbk1vZHVsZSA9ICgoKSA9PiB7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVMaXN0SXRlbShpdGVtTmFtZSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0LWl0ZW0nKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20oaXRlbXMpLmZpbmQoKGl0ZW0pID0+IGl0ZW0uY2hpbGROb2Rlc1sxXS5pbm5lclRleHQgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2hlY2tib3goZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgbGV0IGNoZWNrYm94O1xuXG4gICAgICAgIGlmIChldmVudCkgY2hlY2tib3ggPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGVsc2UgY2hlY2tib3ggPSBkYXRhO1xuICAgICAgICBjb25zdCBsaSA9IGNoZWNrYm94LnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IHRleHQgPSBsaS5jaGlsZHJlblsxXTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGxpLmNoaWxkcmVuWzJdO1xuXG4gICAgICAgIGlmIChjaGVja2JveC5pbm5lclRleHQgPT09ICdjaGVja19ib3hfb3V0bGluZV9ibGFuaycpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9ICdjaGVja19ib3gnO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eSgndGV4dC1kZWNvcmF0aW9uJywgJ2xpbmUtdGhyb3VnaCcpO1xuICAgICAgICAgICAgbGkuc3R5bGUuc2V0UHJvcGVydHkoJ29wYWNpdHknLCAnNTAlJyk7XG4gICAgICAgICAgICBkdWVEYXRlLnN0eWxlLnNldFByb3BlcnR5KCd0ZXh0LWRlY29yYXRpb24nLCAnbGluZS10aHJvdWdoJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5pbm5lclRleHQgPSAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eSgndGV4dC1kZWNvcmF0aW9uJywgJ25vbmUnKTtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNldFByb3BlcnR5KCdvcGFjaXR5JywgJzEwMCUnKTtcbiAgICAgICAgICAgIGR1ZURhdGUuc3R5bGUuc2V0UHJvcGVydHkoJ3RleHQtZGVjb3JhdGlvbicsICdub25lJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBsaXN0TWFuYWdlci5tYW5hZ2VJdGVtcyh0ZXh0LmlubmVyVGV4dCwgJ3N0YXR1c0NoYW5nZScpO1xuICAgICAgICAgICAgdXBkYXRlQWN0aXZlTGlzdCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldEl0ZW1MaXN0ZW5lcihpY29uLCBpdGVtT3B0aW9ucywgZHVlRGF0ZSkge1xuICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXBkYXRlQ2hlY2tib3gpO1xuICAgICAgICBpdGVtT3B0aW9ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RNYW5hZ2VyLmRlbGV0ZUl0ZW0pO1xuICAgICAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGxpc3RNYW5hZ2VyLnNldER1ZURhdGUpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXR1cE5ld0l0ZW0oaXRlbSkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0SXRlbXMnKTtcblxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2xpc3QtaXRlbScpO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcsICdpdGVtLWNoZWNrYm94Jyk7XG4gICAgICAgIGljb24uaW5uZXJUZXh0ID0gJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJztcblxuICAgICAgICBjb25zdCBpdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgaXRlbVRleHQuY2xhc3NMaXN0LmFkZCgnaXRlbS10ZXh0Jyk7XG4gICAgICAgIGl0ZW1UZXh0LmlubmVyVGV4dCA9IGl0ZW0ubmFtZTtcblxuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2l0ZW0tZHVlRGF0ZScpO1xuICAgICAgICBkdWVEYXRlLnZhbHVlID0gaXRlbS5kdWVEYXRlO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1PcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBpdGVtT3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJywgJ2l0ZW0tb3B0aW9ucycpO1xuICAgICAgICBpdGVtT3B0aW9ucy5pbm5lclRleHQgPSAnZGVsZXRlJztcblxuICAgICAgICB1bC5pbnNlcnRCZWZvcmUobGksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRJdGVtJykpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaXRlbVRleHQpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChkdWVEYXRlKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaXRlbU9wdGlvbnMpO1xuXG4gICAgICAgIGlmIChpdGVtLmNvbXBsZXRlZCkgdXBkYXRlQ2hlY2tib3gobnVsbCwgaWNvbik7XG4gICAgICAgIHNldEl0ZW1MaXN0ZW5lcihpY29uLCBpdGVtT3B0aW9ucywgZHVlRGF0ZSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUhlYWRlcihhY3RpdmVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckxpc3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlckxpc3ROYW1lJyk7XG4gICAgICAgIGhlYWRlckxpc3ROYW1lLmlubmVyVGV4dCA9IGFjdGl2ZUxpc3QudGl0bGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrQ3VzdG9tTGlzdChhY3RpdmVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGFkZEl0ZW1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkSXRlbScpO1xuICAgICAgICBjb25zdCBsaXN0T3B0aW9uc0ljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdE9wdGlvbnMnKTtcblxuICAgICAgICBpZiAoYWN0aXZlTGlzdC5jdXN0b20gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhZGRJdGVtQnRuLmNsYXNzTGlzdC5hZGQoJ3JlbW92ZWQnKTtcbiAgICAgICAgICAgIGxpc3RPcHRpb25zSWNvbi5jbGFzc0xpc3QuYWRkKCdyZW1vdmVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRJdGVtQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbW92ZWQnKTtcbiAgICAgICAgICAgIGxpc3RPcHRpb25zSWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdyZW1vdmVkJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlzdEl0ZW1zKGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsaXN0LWl0ZW0nKTtcbiAgICAgICAgd2hpbGUgKGxpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxpWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZlTGlzdC5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzZXR1cE5ld0l0ZW0oaXRlbSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVMaXN0KCkge1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gbGlzdE1hbmFnZXIuZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBhY3RpdmVMaXN0LnNvcnRJdGVtcyhhY3RpdmVMaXN0KTtcbiAgICAgICAgdXBkYXRlSGVhZGVyKGFjdGl2ZUxpc3QpO1xuICAgICAgICB1cGRhdGVMaXN0SXRlbXMoYWN0aXZlTGlzdCk7XG4gICAgICAgIGNoZWNrQ3VzdG9tTGlzdChhY3RpdmVMaXN0KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkSXRlbSgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGxpc3RNYW5hZ2VyLmdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgbGV0IGl0ZW1OYW1lID0gcHJvbXB0KCdOZXcgTGlzdCBJdGVtOicpO1xuICAgICAgICBpZiAoIWl0ZW1OYW1lKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGludmFsaWQgPSBsaXN0Lml0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChpbnZhbGlkKSB7XG4gICAgICAgICAgICBpdGVtTmFtZSA9IHByb21wdCgnSXRlbSBhbHJlYWR5IGV4aXN0cy4gUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGl0ZW06Jyk7XG4gICAgICAgICAgICBpbnZhbGlkID0gbGlzdC5pdGVtcy5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgICAgIGNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IDUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0Vycm9yIGNyZWF0aW5nIGl0ZW0uIFBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXR1cE5ld0l0ZW0oe1xuICAgICAgICAgICAgbmFtZTogaXRlbU5hbWUsXG4gICAgICAgICAgICBub3RlczogJycsXG4gICAgICAgICAgICBkdWVEYXRlOiBudWxsLFxuICAgICAgICAgICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGxpc3RNYW5hZ2VyLm1hbmFnZUl0ZW1zKGl0ZW1OYW1lLCAnbmV3Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgbWVudUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51QnRuJyk7XG4gICAgICAgIGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudScpO1xuICAgICAgICBjb25zdCBtZW51QmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudUJnJyk7XG4gICAgICAgIGNvbnN0IGFkZEl0ZW1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkSXRlbScpO1xuICAgICAgICBjb25zdCBsaXN0T3B0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0T3B0aW9ucycpO1xuXG4gICAgICAgIG1lbnVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW1lbnVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGlmICghbWVudUJnLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIG1lbnVCZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lbnVCZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkSXRlbSk7XG4gICAgICAgIGxpc3RPcHRpb25zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdE1hbmFnZXIuZGVsZXRlTGlzdCk7XG4gICAgfVxuXG4gICAgZXZlbnRzLnN1YnNjcmliZSgndXBkYXRlQWN0aXZlTGlzdCcsIHVwZGF0ZUFjdGl2ZUxpc3QpO1xuICAgIGV2ZW50cy5zdWJzY3JpYmUoJ2RlbGV0ZUl0ZW0nLCBkZWxldGVMaXN0SXRlbSk7XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RlbmVycygpO1xuICAgICAgICB1cGRhdGVBY3RpdmVMaXN0KCk7XG4gICAgfSgpKTtcbn0pKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9