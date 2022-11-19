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
    }

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

        LISTS[2].items.sort((a, b) => a.dueDate > b.dueDate ? 1 : -1);
    }

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
        setDueDate
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qiw0REFBNEQ7QUFDbkY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsSSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvcHVic3ViLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSB7XG4gICAgZXZlbnRzOiB7fSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfSxcbiAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCB7IGV2ZW50cyB9IiwiaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSBcIi4vcHVic3ViLmpzXCI7XG5cbmV2ZW50cy5zdWJzY3JpYmUoJ3VwZGF0ZUxvY2FsU3RvcmFnZScsIGZ1bmN0aW9uKGRhdGEpIHsgdXBkYXRlTG9jYWxTdG9yYWdlKGRhdGFbMF0sIGRhdGFbMV0pIH0pO1xuXG5mdW5jdGlvbiB1cGRhdGVMb2NhbFN0b3JhZ2UobmFtZSwgZGF0YSkge1xuICAgIGlmIChfc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJykpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0TG9jYWxTdG9yYWdlKGRhdGEpIHtcbiAgICBpZiAoX3N0b3JhZ2VBdmFpbGFibGUoJ2xvY2FsU3RvcmFnZScpKSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShkYXRhKSkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBfc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgdHJ5IHtcbiAgICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgICAgbGV0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICAgICAgKHN0b3JhZ2UgJiYgc3RvcmFnZS5sZW5ndGggIT09IDApO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgZ2V0TG9jYWxTdG9yYWdlIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gJy4vcHVic3ViLmpzJztcbmltcG9ydCB7IGdldExvY2FsU3RvcmFnZSB9IGZyb20gJy4vc3RvcmFnZS5qcyc7XG5cbmNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLFxuICAgICAgICBpdGVtcyA9IFtdLFxuICAgICAgICBpY29uID0gYGNoZWNrbGlzdGAsXG4gICAgICAgIGN1c3RvbSA9IHRydWUsXG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXNcbiAgICAgICAgdGhpcy5pY29uID0gaWNvblxuICAgICAgICB0aGlzLmN1c3RvbSA9IGN1c3RvbVxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZVxuICAgIH07XG5cbiAgICBzZXQgaXNBY3RpdmUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGVsc2UgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgfTtcblxuICAgIG5ld0l0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHsgbmFtZTogaXRlbU5hbWUsIG5vdGVzOiBgYCwgZHVlRGF0ZTogbnVsbCwgY29tcGxldGVkOiBmYWxzZSB9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlSXRlbUNvbXBsZXRpb24oaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBpdGVtLmNvbXBsZXRlZCA9ICFpdGVtLmNvbXBsZXRlZDtcbiAgICB9O1xuXG4gICAgZGVsZXRlSXRlbShpdGVtTmFtZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuXG4gICAgc2V0RHVlRGF0ZShpdGVtTmFtZSwgZGF0ZSkge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgIGl0ZW0uZHVlRGF0ZSA9IGRhdGU7XG4gICAgfVxufVxuXG5jb25zdCBsaXN0TWFuYWdlciA9ICgoKSA9PiB7XG4gICAgbGV0IExJU1RTID0gW107XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbFN0b3JhZ2UobmFtZSwgZGF0YSkge1xuICAgICAgICBldmVudHMucHVibGlzaChgdXBkYXRlTG9jYWxTdG9yYWdlYCwgW25hbWUsIGRhdGFdKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3JlYXRlTmV3TGlzdCA9ICh0aXRsZSwgaXRlbXMgPSBbXSwgaWNvbiA9IGBjaGVja2xpc3RgLCBjdXN0b20gPSB0cnVlLCBhY3RpdmUgPSBmYWxzZSkgPT4ge1xuICAgICAgICBsZXQgbGlzdCA9IG5ldyBMaXN0KHRpdGxlLCBpdGVtcywgaWNvbiwgY3VzdG9tLCBhY3RpdmUpO1xuICAgICAgICBMSVNUUy5wdXNoKGxpc3QpO1xuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYExJU1RTYCwgTElTVFMpO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRBY3RpdmVMaXN0ID0gKGV2ZW50LCBmcm9tU3RvcmFnZSA9IG51bGwpID0+IHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTGlzdDtcbiAgICAgICAgaWYgKGV2ZW50KSBzZWxlY3RlZExpc3QgPSBldmVudC50YXJnZXQubmFtZTtcbiAgICAgICAgZWxzZSBpZiAoZnJvbVN0b3JhZ2UpIHNlbGVjdGVkTGlzdCA9IGZyb21TdG9yYWdlLnRpdGxlO1xuICAgICAgICBlbHNlIHNlbGVjdGVkTGlzdCA9IExJU1RTWzBdLnRpdGxlO1xuXG4gICAgICAgIExJU1RTLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBsaXN0LmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBMSVNUUy5maW5kKGxpc3QgPT4gbGlzdC50aXRsZSA9PSBzZWxlY3RlZExpc3QpO1xuICAgICAgICBhY3RpdmVMaXN0LmlzQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICBpZiAoYWN0aXZlTGlzdC50aXRsZSA9PT0gYFRvZGF5YCkgc2V0dXBUb2RheSgpO1xuICAgICAgICBpZiAoYWN0aXZlTGlzdC50aXRsZSA9PT0gYFRvbW9ycm93YCkgc2V0dXBUb21vcnJvdygpO1xuICAgICAgICBpZiAoYWN0aXZlTGlzdC50aXRsZSA9PT0gYFRoaXMgV2Vla2ApIHNldHVwVGhpc1dlZWsoKTtcblxuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYGFjdGl2ZUxpc3RgLCBhY3RpdmVMaXN0KTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYHVwZGF0ZUFjdGl2ZUxpc3RgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0QWN0aXZlTGlzdCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFjdGl2ZUxpc3QgPSBMSVNUUy5maW5kKGxpc3QgPT4gbGlzdC5pc0FjdGl2ZSA9PSB0cnVlKTtcbiAgICAgICAgaWYgKCFhY3RpdmVMaXN0KSBhY3RpdmVMaXN0ID0gTElTVFNbMF07XG4gICAgICAgIHJldHVybiBhY3RpdmVMaXN0O1xuICAgIH07XG5cbiAgICBjb25zdCBtYW5hZ2VJdGVtcyA9IChpdGVtTmFtZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBnZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IGBuZXdgKSBsaXN0Lm5ld0l0ZW0oaXRlbU5hbWUpO1xuICAgICAgICBpZiAoYWN0aW9uID09PSBgc3RhdHVzQ2hhbmdlYCkgbGlzdC51cGRhdGVJdGVtQ29tcGxldGlvbihpdGVtTmFtZSk7XG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgTElTVFNgLCBMSVNUUyk7XG4gICAgfTtcblxuICAgIGNvbnN0IHNldER1ZURhdGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgY29uc3QgaXRlbU5hbWUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzFdLmlubmVyVGV4dDtcbiAgICAgICAgbGlzdC5zZXREdWVEYXRlKGl0ZW1OYW1lLCBkYXRlKTtcbiAgICAgICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBMSVNUU2AsIExJU1RTKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRMaXN0cyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIExJU1RTO1xuICAgIH07XG5cbiAgICBjb25zdCBkZWxldGVMaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKCdEZWxldGUgTGlzdD8nKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IExJU1RTLmZpbmRJbmRleChsaXN0ID0+IGxpc3QudGl0bGUgPT09IGFjdGl2ZUxpc3QudGl0bGUpO1xuICAgICAgICBMSVNUUy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgIHVwZGF0ZUxvY2FsU3RvcmFnZShgTElTVFNgLCBMSVNUUyk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKGBkZWxldGVMaXN0YCwgYWN0aXZlTGlzdC50aXRsZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRlbGV0ZUl0ZW0gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF3aW5kb3cuY29uZmlybSgnRGVsZXRlIEl0ZW0/JykpIHJldHVybjtcbiAgICAgICAgY29uc3QgbGlzdCA9IGdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgY29uc3QgaXRlbU5hbWUgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzFdLmlubmVyVGV4dDtcbiAgICAgICAgbGlzdC5kZWxldGVJdGVtKGl0ZW1OYW1lKTtcblxuICAgICAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYExJU1RTYCwgTElTVFMpO1xuICAgICAgICBldmVudHMucHVibGlzaChgZGVsZXRlSXRlbWAsIGl0ZW1OYW1lKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY29udmVydERhdGVUb1N0cmluZyhkYXRlKSB7XG4gICAgICAgIGNvbnN0IGRkID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgICAgICBjb25zdCBtbSA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgICAgICBjb25zdCB5eXl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldHVwVG9kYXkoKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBMSVNUU1swXTtcbiAgICAgICAgbGlzdC5pdGVtcyA9IFtdO1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBjb252ZXJ0RGF0ZVRvU3RyaW5nKGRhdGUpO1xuXG4gICAgICAgIC8vU3RhcnQgYXQgaT0zIHRvIHNraXAgdGhlIHByZW1hZGUgbGlzdHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBMSVNUUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTElTVFNbaV0uaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kdWVEYXRlID09IHRvZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIExJU1RTWzBdLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXR1cFRvbW9ycm93KCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gTElTVFNbMV07XG4gICAgICAgIGxpc3QuaXRlbXMgPSBbXTtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgY29uc3QgdG9tb3Jyb3cgPSBjb252ZXJ0RGF0ZVRvU3RyaW5nKGRhdGUpO1xuXG4gICAgICAgIC8vU3RhcnQgYXQgaT0zIHRvIHNraXAgdGhlIHByZW1hZGUgbGlzdHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDM7IGkgPCBMSVNUUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTElTVFNbaV0uaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5kdWVEYXRlID09IHRvbW9ycm93KSB7XG4gICAgICAgICAgICAgICAgICAgIExJU1RTWzFdLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXR1cFRoaXNXZWVrKCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gTElTVFNbMl07XG4gICAgICAgIGxpc3QuaXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gY29udmVydERhdGVUb1N0cmluZyhkYXRlKTtcbiAgICAgICAgbGV0IHdlZWsgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB3ZWVrLnNldERhdGUod2Vlay5nZXREYXRlKCkgKyA3KTtcbiAgICAgICAgd2VlayA9IGNvbnZlcnREYXRlVG9TdHJpbmcod2Vlayk7XG5cbiAgICAgICAgLy9TdGFydCBhdCBpPTMgdG8gc2tpcCB0aGUgcHJlbWFkZSBsaXN0c1xuICAgICAgICBmb3IgKGxldCBpID0gMzsgaSA8IExJU1RTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBMSVNUU1tpXS5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmR1ZURhdGUgPj0gdG9kYXkgJiYgaXRlbS5kdWVEYXRlIDw9IHdlZWspIHtcbiAgICAgICAgICAgICAgICAgICAgTElTVFNbMl0uaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgTElTVFNbMl0uaXRlbXMuc29ydCgoYSwgYikgPT4gYS5kdWVEYXRlID4gYi5kdWVEYXRlID8gMSA6IC0xKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdHMoKSB7XG4gICAgICAgIGlmIChnZXRMb2NhbFN0b3JhZ2UoJ0xJU1RTJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RzID0gZ2V0TG9jYWxTdG9yYWdlKCdMSVNUUycpO1xuICAgICAgICAgICAgbGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGxpc3QudGl0bGUsIGxpc3QuaXRlbXMsIGxpc3QuaWNvbiwgbGlzdC5jdXN0b20sIGxpc3QuYWN0aXZlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGBUb2RheWAsIFtdLCBgdG9kYXlgLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgY3JlYXRlTmV3TGlzdChgVG9tb3Jyb3dgLCBbXSwgYGV2ZW50YCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRoaXMgV2Vla2AsIFtdLCBgZGF0ZV9yYW5nZWAsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICBjcmVhdGVOZXdMaXN0KGBUby1Eb2AsIFtdLCBgY2hlY2tsaXN0YCwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICB9O1xuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRBY3RpdmVMaXN0KCkge1xuICAgICAgICBpZiAoZ2V0TG9jYWxTdG9yYWdlKCdhY3RpdmVMaXN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBnZXRMb2NhbFN0b3JhZ2UoJ2FjdGl2ZUxpc3QnKTtcbiAgICAgICAgICAgIHNldEFjdGl2ZUxpc3QobnVsbCwgYWN0aXZlTGlzdCk7XG4gICAgICAgIH0gZWxzZSB7fTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgICAgICBpbml0QWN0aXZlTGlzdCgpO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVOZXdMaXN0LFxuICAgICAgICBnZXRMaXN0cyxcbiAgICAgICAgc2V0QWN0aXZlTGlzdCxcbiAgICAgICAgZ2V0QWN0aXZlTGlzdCxcbiAgICAgICAgbWFuYWdlSXRlbXMsXG4gICAgICAgIGRlbGV0ZUxpc3QsXG4gICAgICAgIGRlbGV0ZUl0ZW0sXG4gICAgICAgIHNldER1ZURhdGVcbiAgICB9XG59KSgpO1xuXG5jb25zdCBtZW51TW9kdWxlID0gKCgpID0+IHtcbiAgICBldmVudHMuc3Vic2NyaWJlKGBkZWxldGVMaXN0YCwgcmVzZXRMaXN0cyk7XG5cbiAgICBmdW5jdGlvbiByZXNldExpc3RzKGxpc3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IG1lbnVMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20obWVudUxpc3RzKS5maW5kKGxpc3QgPT4gbGlzdC5uYW1lID09PSBsaXN0TmFtZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIGxpc3RNYW5hZ2VyLnNldEFjdGl2ZUxpc3QoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2VNZW51KCkge1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuXG4gICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRCdG4oZXZlbnQpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTGlzdDtcbiAgICAgICAgaWYgKGV2ZW50KSBzZWxlY3RlZExpc3QgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IGxpc3RNYW5hZ2VyLmdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG1lbnVMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgICAgIHNlbGVjdGVkTGlzdCA9IEFycmF5LmZyb20obWVudUxpc3RzKS5maW5kKGxpc3QgPT4gbGlzdC5uYW1lID09PSBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zZWxlY3RlZGApLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShgc2VsZWN0ZWRgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGVjdGVkTGlzdC5jbGFzc0xpc3QuYWRkKGBzZWxlY3RlZGApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVMaXN0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGlzdE1hbmFnZXIuc2V0QWN0aXZlTGlzdChldmVudCk7XG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkQnRuKGV2ZW50KTtcbiAgICAgICAgY2xvc2VNZW51KCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldEJ0bkxpc3RlbmVyKGJ0bikge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBoYW5kbGVMaXN0Q2xpY2spO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWtlQnRuKGxpc3QpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjtcblxuICAgICAgICBpZiAobGlzdC5jdXN0b20gPT0gZmFsc2UpIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcmVtYWRlTGlzdHNgKTtcbiAgICAgICAgZWxzZSBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY3VzdG9tTGlzdHNgKTtcblxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoYG1lbnUtYnV0dG9uc2ApO1xuICAgICAgICBidG4uaWQgPSBsaXN0LnRpdGxlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgYnRuLm5hbWUgPSBsaXN0LnRpdGxlO1xuXG4gICAgICAgIGNvbnN0IGljb25TcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBpY29uU3Bhbi5jbGFzc0xpc3QuYWRkKGBtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkYCk7XG4gICAgICAgIGljb25TcGFuLmlubmVyVGV4dCA9IGxpc3QuaWNvbjtcblxuICAgICAgICBjb25zdCBidG5UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBidG5UZXh0LmlubmVyVGV4dCA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChpY29uU3Bhbik7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChidG5UZXh0KTtcblxuICAgICAgICBzZXRCdG5MaXN0ZW5lcihidG4pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGROZXdMaXN0KCkge1xuICAgICAgICBjb25zdCBsaXN0cyA9IGxpc3RNYW5hZ2VyLmdldExpc3RzKCk7XG4gICAgICAgIGxldCBsaXN0TmFtZSA9IHByb21wdChgTmV3IExpc3QgTmFtZTpgKTtcbiAgICAgICAgaWYgKCFsaXN0TmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBpbnZhbGlkID0gbGlzdHMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT09IGxpc3ROYW1lKTtcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICB3aGlsZSAoaW52YWxpZCkge1xuICAgICAgICAgICAgbGlzdE5hbWUgPSBwcm9tcHQoYExpc3QgTmFtZSBhbHJlYWR5IHVzZWQuIFBsZWFzZSB1c2UgYSBkaWZmZXJlbnQgbGlzdCBuYW1lOmApO1xuICAgICAgICAgICAgaW52YWxpZCA9IGxpc3RzLmZpbmQobGlzdCA9PiBsaXN0LnRpdGxlID09PSBsaXN0TmFtZSk7XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICBpZiAoY291bnRlciA+PSA1KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KGBFcnJvciBjcmVhdGluZyBsaXN0LiBQbGVhc2UgdHJ5IGFnYWluYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxpc3RNYW5hZ2VyLmNyZWF0ZU5ld0xpc3QobGlzdE5hbWUsIFtdLCBgY2hlY2tsaXN0YCwgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICBtYWtlQnRuKHsgdGl0bGU6IGxpc3ROYW1lLCBpY29uOiBgY2hlY2tsaXN0YCwgY3VzdG9tOiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGRMaXN0TGlzdGVuZXIoKSB7XG4gICAgICAgIGNvbnN0IGFkZExpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWRkTGlzdGApO1xuICAgICAgICBhZGRMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgYWRkTmV3TGlzdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0cygpIHtcbiAgICAgICAgY29uc3QgbGlzdHMgPSBsaXN0TWFuYWdlci5nZXRMaXN0cygpO1xuICAgICAgICBsaXN0cy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgbWFrZUJ0bihsaXN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdHMoKTtcbiAgICAgICAgYWRkTGlzdExpc3RlbmVyKCk7XG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkQnRuKCk7XG4gICAgfSgpKTtcblxufSkoKTtcblxuY29uc3QgbWFpblNjcmVlbk1vZHVsZSA9ICgoKSA9PiB7XG4gICAgZXZlbnRzLnN1YnNjcmliZShgdXBkYXRlQWN0aXZlTGlzdGAsIHVwZGF0ZUFjdGl2ZUxpc3QpO1xuICAgIGV2ZW50cy5zdWJzY3JpYmUoYGRlbGV0ZUl0ZW1gLCBkZWxldGVMaXN0SXRlbSk7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVMaXN0SXRlbShpdGVtTmFtZSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5saXN0LWl0ZW1gKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20oaXRlbXMpLmZpbmQoaXRlbSA9PiBpdGVtLmNoaWxkTm9kZXNbMV0uaW5uZXJUZXh0ID09PSBpdGVtTmFtZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUhlYWRlcihhY3RpdmVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckxpc3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGhlYWRlckxpc3ROYW1lYCk7XG4gICAgICAgIGhlYWRlckxpc3ROYW1lLmlubmVyVGV4dCA9IGFjdGl2ZUxpc3QudGl0bGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpc3RJdGVtcyhhY3RpdmVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgbGlzdC1pdGVtYCk7XG4gICAgICAgIHdoaWxlIChsaS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaVswXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGl2ZUxpc3QuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHNldHVwTmV3SXRlbShpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrQ3VzdG9tTGlzdChhY3RpdmVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGFkZEl0ZW1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWRkSXRlbWApO1xuICAgICAgICBjb25zdCBsaXN0T3B0aW9uc0ljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdE9wdGlvbnNgKTtcblxuICAgICAgICBpZiAoYWN0aXZlTGlzdC5jdXN0b20gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGFkZEl0ZW1CdG4uY2xhc3NMaXN0LmFkZChgcmVtb3ZlZGApO1xuICAgICAgICAgICAgbGlzdE9wdGlvbnNJY29uLmNsYXNzTGlzdC5hZGQoYHJlbW92ZWRgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZEl0ZW1CdG4uY2xhc3NMaXN0LnJlbW92ZShgcmVtb3ZlZGApO1xuICAgICAgICAgICAgbGlzdE9wdGlvbnNJY29uLmNsYXNzTGlzdC5yZW1vdmUoYHJlbW92ZWRgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVMaXN0KCkge1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gbGlzdE1hbmFnZXIuZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICB1cGRhdGVIZWFkZXIoYWN0aXZlTGlzdCk7XG4gICAgICAgIHVwZGF0ZUxpc3RJdGVtcyhhY3RpdmVMaXN0KTtcbiAgICAgICAgY2hlY2tDdXN0b21MaXN0KGFjdGl2ZUxpc3QpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGVja2JveChldmVudCwgZGF0YSkge1xuICAgICAgICBsZXQgY2hlY2tib3g7XG5cbiAgICAgICAgaWYgKGV2ZW50KSBjaGVja2JveCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgZWxzZSBjaGVja2JveCA9IGRhdGE7XG4gICAgICAgIGNvbnN0IGxpID0gY2hlY2tib3gucGFyZW50Tm9kZTtcbiAgICAgICAgY29uc3QgdGV4dCA9IGxpLmNoaWxkcmVuWzFdO1xuXG4gICAgICAgIGlmIChjaGVja2JveC5pbm5lclRleHQgPT09IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2ApIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IGBjaGVja19ib3hgO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYGxpbmUtdGhyb3VnaGApO1xuICAgICAgICAgICAgbGkuc3R5bGUuc2V0UHJvcGVydHkoYG9wYWNpdHlgLCBgNTAlYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5pbm5lclRleHQgPSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYG5vbmVgKTtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNldFByb3BlcnR5KGBvcGFjaXR5YCwgYDEwMCVgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCkgbGlzdE1hbmFnZXIubWFuYWdlSXRlbXModGV4dC5pbm5lclRleHQsIGBzdGF0dXNDaGFuZ2VgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0SXRlbUxpc3RlbmVyKGljb24sIGl0ZW1PcHRpb25zLCBkdWVEYXRlKSB7XG4gICAgICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1cGRhdGVDaGVja2JveCk7XG4gICAgICAgIGl0ZW1PcHRpb25zLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgbGlzdE1hbmFnZXIuZGVsZXRlSXRlbSk7XG4gICAgICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcihgY2hhbmdlYCwgbGlzdE1hbmFnZXIuc2V0RHVlRGF0ZSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwTmV3SXRlbShpdGVtKSB7XG4gICAgICAgIGNvbnN0IHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxpc3RJdGVtc2ApO1xuXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgbGlgKTtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChgbGlzdC1pdGVtYCk7XG5cbiAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgaWNvbi5jbGFzc0xpc3QuYWRkKGBtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkYCwgYGl0ZW0tY2hlY2tib3hgKTtcbiAgICAgICAgaWNvbi5pbm5lclRleHQgPSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBpdGVtVGV4dC5jbGFzc0xpc3QuYWRkKGBpdGVtLXRleHRgKTtcbiAgICAgICAgaXRlbVRleHQuaW5uZXJUZXh0ID0gaXRlbS5uYW1lO1xuXG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkdWVEYXRlLnR5cGUgPSBgZGF0ZWA7XG4gICAgICAgIGR1ZURhdGUuY2xhc3NMaXN0LmFkZChgaXRlbS1kdWVEYXRlYCk7XG4gICAgICAgIGR1ZURhdGUudmFsdWUgPSBpdGVtLmR1ZURhdGU7XG5cbiAgICAgICAgY29uc3QgaXRlbU9wdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGl0ZW1PcHRpb25zLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgLCBgaXRlbS1vcHRpb25zYCk7XG4gICAgICAgIGl0ZW1PcHRpb25zLmlubmVyVGV4dCA9IGBkZWxldGVgO1xuXG4gICAgICAgIHVsLmluc2VydEJlZm9yZShsaSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKSk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGljb24pO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpdGVtVGV4dCk7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGR1ZURhdGUpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpdGVtT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKGl0ZW0uY29tcGxldGVkKSB1cGRhdGVDaGVja2JveChudWxsLCBpY29uKTtcbiAgICAgICAgc2V0SXRlbUxpc3RlbmVyKGljb24sIGl0ZW1PcHRpb25zLCBkdWVEYXRlKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkSXRlbSgpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGxpc3RNYW5hZ2VyLmdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgbGV0IGl0ZW1OYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBJdGVtOmApO1xuICAgICAgICBpZiAoIWl0ZW1OYW1lKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGludmFsaWQgPSBsaXN0Lml0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICB3aGlsZSAoaW52YWxpZCkge1xuICAgICAgICAgICAgaXRlbU5hbWUgPSBwcm9tcHQoYEl0ZW0gYWxyZWFkeSBleGlzdHMuIFBsZWFzZSBlbnRlciBhIGRpZmZlcmVudCBpdGVtOmApO1xuICAgICAgICAgICAgaW52YWxpZCA9IGxpc3QuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gNSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChgRXJyb3IgY3JlYXRpbmcgaXRlbS4gUGxlYXNlIHRyeSBhZ2FpbmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBzZXR1cE5ld0l0ZW0oeyBuYW1lOiBpdGVtTmFtZSwgbm90ZXM6IGBgLCBkdWVEYXRlOiBudWxsLCBjb21wbGV0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICBsaXN0TWFuYWdlci5tYW5hZ2VJdGVtcyhpdGVtTmFtZSwgYG5ld2ApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBtZW51QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCdG5gKTtcbiAgICAgICAgY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG4gICAgICAgIGNvbnN0IG1lbnVCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QmdgKTtcbiAgICAgICAgY29uc3QgYWRkSXRlbUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRJdGVtYCk7XG4gICAgICAgIGNvbnN0IGxpc3RPcHRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxpc3RPcHRpb25zYCk7XG5cbiAgICAgICAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgICAgICBpZiAoIW1lbnVCZy5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51QmcuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBtZW51QmcuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgYWRkSXRlbSk7XG4gICAgICAgIGxpc3RPcHRpb25zLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgbGlzdE1hbmFnZXIuZGVsZXRlTGlzdCk7XG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdGVuZXJzKCk7XG4gICAgICAgIHVwZGF0ZUFjdGl2ZUxpc3QoKTtcbiAgICB9KCkpO1xufSkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=