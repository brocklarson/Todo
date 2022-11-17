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


//set code to handle if console.prompt is cancelled

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

    /*change item name */
}

const listManager = (() => {
    let LISTS = [];

    const createNewList = (title, icon = `checklist`, custom = true) => {
        let list = new List(title, [], icon, custom);
        LISTS.push(list);
    };

    const setActiveList = (event) => {
        let selectedList;
        if (event) selectedList = event.target.name;
        else selectedList = LISTS[0].title;

        LISTS.forEach(list => {
            list.isActive = false;
        });
        const activeList = LISTS.find(list => list.title == selectedList);
        activeList.isActive = true;

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
    };

    const getLists = () => {
        return LISTS;
    };

    const deleteList = () => {
        if (!window.confirm('Delete List?')) return;
        const activeList = getActiveList();
        const index = LISTS.findIndex(list => list.title === activeList.title);
        LISTS.splice(index, 1);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`deleteList`, activeList.title);
    }

    const deleteItem = (event) => {
        if (!window.confirm('Delete Item?')) return;
        const list = getActiveList();
        const itemName = event.target.parentNode.childNodes[1].innerText;
        list.deleteItem(itemName);
        _pubsub_js__WEBPACK_IMPORTED_MODULE_0__.events.publish(`deleteItem`, itemName);
    }

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
        let listName = prompt(`New List Name:`);
        const lists = listManager.getLists();

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
        //check if item is completed here

        const itemText = document.createElement(`span`);
        itemText.classList.add(`item-text`);
        itemText.innerText = itemName;

        const itemOptions = document.createElement(`span`);
        itemOptions.classList.add(`material-symbols-outlined`, `item-options`);
        itemOptions.innerText = `more_vert`;

        ul.insertBefore(li, document.getElementById(`addItem`));
        li.appendChild(icon);
        li.appendChild(itemText);
        li.appendChild(itemOptions);

        setItemListener(icon, itemOptions);
    };

    function addItem() {
        const list = listManager.getActiveList();
        let itemName = prompt(`New List Item:`);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7Ozs7Ozs7O1VDdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOcUM7O0FBRXJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQiwwREFBMEQ7QUFDcEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQSxRQUFRLHNEQUFjO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxJQUFJLHdEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isa0RBQWtEO0FBQ3BFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxDQUFDOztBQUVEO0FBQ0EsSUFBSSx3REFBZ0I7QUFDcEIsSUFBSSx3REFBZ0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsSSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvcHVic3ViLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHtcbiAgICBldmVudHM6IHt9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IHsgZXZlbnRzIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gJy4vcHVic3ViLmpzJztcblxuLy9zZXQgY29kZSB0byBoYW5kbGUgaWYgY29uc29sZS5wcm9tcHQgaXMgY2FuY2VsbGVkXG5cbmNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLFxuICAgICAgICBpdGVtcyA9IFtdLFxuICAgICAgICBpY29uID0gYGNoZWNrbGlzdGAsXG4gICAgICAgIGN1c3RvbSA9IHRydWUsXG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXNcbiAgICAgICAgdGhpcy5pY29uID0gaWNvblxuICAgICAgICB0aGlzLmN1c3RvbSA9IGN1c3RvbVxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZVxuICAgIH07XG5cbiAgICBzZXQgaXNBY3RpdmUodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGVsc2UgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgZ2V0IGlzQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XG4gICAgfTtcblxuICAgIG5ld0l0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHsgbmFtZTogaXRlbU5hbWUsIG5vdGVzOiBgYCwgZHVlRGF0ZTogYGAsIGNvbXBsZXRlZDogZmFsc2UgfSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZUl0ZW1TdGF0dXMoaXRlbU5hbWUpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBpdGVtLmNvbXBsZXRlZCA9ICFpdGVtLmNvbXBsZXRlZDtcbiAgICB9O1xuXG4gICAgZGVsZXRlSXRlbShpdGVtTmFtZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuXG4gICAgLypjaGFuZ2UgaXRlbSBuYW1lICovXG59XG5cbmNvbnN0IGxpc3RNYW5hZ2VyID0gKCgpID0+IHtcbiAgICBsZXQgTElTVFMgPSBbXTtcblxuICAgIGNvbnN0IGNyZWF0ZU5ld0xpc3QgPSAodGl0bGUsIGljb24gPSBgY2hlY2tsaXN0YCwgY3VzdG9tID0gdHJ1ZSkgPT4ge1xuICAgICAgICBsZXQgbGlzdCA9IG5ldyBMaXN0KHRpdGxlLCBbXSwgaWNvbiwgY3VzdG9tKTtcbiAgICAgICAgTElTVFMucHVzaChsaXN0KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0QWN0aXZlTGlzdCA9IChldmVudCkgPT4ge1xuICAgICAgICBsZXQgc2VsZWN0ZWRMaXN0O1xuICAgICAgICBpZiAoZXZlbnQpIHNlbGVjdGVkTGlzdCA9IGV2ZW50LnRhcmdldC5uYW1lO1xuICAgICAgICBlbHNlIHNlbGVjdGVkTGlzdCA9IExJU1RTWzBdLnRpdGxlO1xuXG4gICAgICAgIExJU1RTLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBsaXN0LmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT0gc2VsZWN0ZWRMaXN0KTtcbiAgICAgICAgYWN0aXZlTGlzdC5pc0FjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYHVwZGF0ZUFjdGl2ZUxpc3RgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0QWN0aXZlTGlzdCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFjdGl2ZUxpc3QgPSBMSVNUUy5maW5kKGxpc3QgPT4gbGlzdC5pc0FjdGl2ZSA9PSB0cnVlKTtcbiAgICAgICAgaWYgKCFhY3RpdmVMaXN0KSBhY3RpdmVMaXN0ID0gTElTVFNbMF07XG4gICAgICAgIHJldHVybiBhY3RpdmVMaXN0O1xuICAgIH07XG5cbiAgICBjb25zdCBtYW5hZ2VJdGVtcyA9IChpdGVtTmFtZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBnZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IGBuZXdgKSBsaXN0Lm5ld0l0ZW0oaXRlbU5hbWUpO1xuICAgICAgICBpZiAoYWN0aW9uID09PSBgc3RhdHVzQ2hhbmdlYCkgbGlzdC51cGRhdGVJdGVtU3RhdHVzKGl0ZW1OYW1lKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0TGlzdHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBMSVNUUztcbiAgICB9O1xuXG4gICAgY29uc3QgZGVsZXRlTGlzdCA9ICgpID0+IHtcbiAgICAgICAgaWYgKCF3aW5kb3cuY29uZmlybSgnRGVsZXRlIExpc3Q/JykpIHJldHVybjtcbiAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IGdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBMSVNUUy5maW5kSW5kZXgobGlzdCA9PiBsaXN0LnRpdGxlID09PSBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgICAgICAgTElTVFMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYGRlbGV0ZUxpc3RgLCBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVJdGVtID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghd2luZG93LmNvbmZpcm0oJ0RlbGV0ZSBJdGVtPycpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGxpc3QgPSBnZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGNvbnN0IGl0ZW1OYW1lID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuY2hpbGROb2Rlc1sxXS5pbm5lclRleHQ7XG4gICAgICAgIGxpc3QuZGVsZXRlSXRlbShpdGVtTmFtZSk7XG4gICAgICAgIGV2ZW50cy5wdWJsaXNoKGBkZWxldGVJdGVtYCwgaXRlbU5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0cygpIHtcbiAgICAgICAgY3JlYXRlTmV3TGlzdChgVG9kYXlgLCBgdG9kYXlgLCBmYWxzZSk7XG4gICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRvbW9ycm93YCwgYGV2ZW50YCwgZmFsc2UpO1xuICAgICAgICBjcmVhdGVOZXdMaXN0KGBUaGlzIFdlZWtgLCBgZGF0ZV9yYW5nZWAsIGZhbHNlKTtcblxuICAgICAgICBjcmVhdGVOZXdMaXN0KGBUby1Eb2AsIGBjaGVja2xpc3RgLCB0cnVlKTtcbiAgICAgICAgLy8vL1NlYXJjaCBsb2NhbCBzdG9yYWdlIGFuZCBhZGQgYW55IGxpc3RzIHRvIGN1c3RvbUxpc3RzIGhlcmVcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGluaXRMaXN0cygpO1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVOZXdMaXN0LFxuICAgICAgICBnZXRMaXN0cyxcbiAgICAgICAgc2V0QWN0aXZlTGlzdCxcbiAgICAgICAgZ2V0QWN0aXZlTGlzdCxcbiAgICAgICAgbWFuYWdlSXRlbXMsXG4gICAgICAgIGRlbGV0ZUxpc3QsXG4gICAgICAgIGRlbGV0ZUl0ZW1cbiAgICB9XG59KSgpO1xuXG5jb25zdCBtZW51TW9kdWxlID0gKCgpID0+IHtcbiAgICBldmVudHMuc3Vic2NyaWJlKGBkZWxldGVMaXN0YCwgcmVzZXRMaXN0cyk7XG5cbiAgICBmdW5jdGlvbiByZXNldExpc3RzKGxpc3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IG1lbnVMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20obWVudUxpc3RzKS5maW5kKGxpc3QgPT4gbGlzdC5uYW1lID09PSBsaXN0TmFtZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIGxpc3RNYW5hZ2VyLnNldEFjdGl2ZUxpc3QoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2VNZW51KCkge1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuXG4gICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRCdG4oZXZlbnQpIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkTGlzdDtcbiAgICAgICAgaWYgKGV2ZW50KSBzZWxlY3RlZExpc3QgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlTGlzdCA9IGxpc3RNYW5hZ2VyLmdldEFjdGl2ZUxpc3QoKTtcbiAgICAgICAgICAgIGNvbnN0IG1lbnVMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgICAgIHNlbGVjdGVkTGlzdCA9IEFycmF5LmZyb20obWVudUxpc3RzKS5maW5kKGxpc3QgPT4gbGlzdC5uYW1lID09PSBhY3RpdmVMaXN0LnRpdGxlKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuc2VsZWN0ZWRgKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYHNlbGVjdGVkYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxlY3RlZExpc3QuY2xhc3NMaXN0LmFkZChgc2VsZWN0ZWRgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTGlzdENsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxpc3RNYW5hZ2VyLnNldEFjdGl2ZUxpc3QoZXZlbnQpO1xuICAgICAgICB1cGRhdGVTZWxlY3RlZEJ0bihldmVudCk7XG4gICAgICAgIGNsb3NlTWVudSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRCdG5MaXN0ZW5lcihidG4pIHtcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgaGFuZGxlTGlzdENsaWNrKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFrZUJ0bihsaXN0KSB7XG4gICAgICAgIGxldCBjb250YWluZXI7XG5cbiAgICAgICAgaWYgKGxpc3QuY3VzdG9tID09IGZhbHNlKSBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJlbWFkZUxpc3RzYCk7XG4gICAgICAgIGVsc2UgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGN1c3RvbUxpc3RzYCk7XG5cbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKGBtZW51LWJ1dHRvbnNgKTtcbiAgICAgICAgYnRuLmlkID0gbGlzdC50aXRsZS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICAgIGJ0bi5uYW1lID0gbGlzdC50aXRsZTtcblxuICAgICAgICBjb25zdCBpY29uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgaWNvblNwYW4uY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGApO1xuICAgICAgICBpY29uU3Bhbi5pbm5lclRleHQgPSBsaXN0Lmljb247XG5cbiAgICAgICAgY29uc3QgYnRuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgYnRuVGV4dC5pbm5lclRleHQgPSBsaXN0LnRpdGxlO1xuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaWNvblNwYW4pO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG5cbiAgICAgICAgc2V0QnRuTGlzdGVuZXIoYnRuKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkTmV3TGlzdCgpIHtcbiAgICAgICAgbGV0IGxpc3ROYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBOYW1lOmApO1xuICAgICAgICBjb25zdCBsaXN0cyA9IGxpc3RNYW5hZ2VyLmdldExpc3RzKCk7XG5cbiAgICAgICAgbGV0IGludmFsaWQgPSBsaXN0cy5maW5kKGxpc3QgPT4gbGlzdC50aXRsZSA9PT0gbGlzdE5hbWUpO1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChpbnZhbGlkKSB7XG4gICAgICAgICAgICBsaXN0TmFtZSA9IHByb21wdChgTGlzdCBOYW1lIGFscmVhZHkgdXNlZC4gUGxlYXNlIHVzZSBhIGRpZmZlcmVudCBsaXN0IG5hbWU6YCk7XG4gICAgICAgICAgICBpbnZhbGlkID0gbGlzdHMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT09IGxpc3ROYW1lKTtcbiAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IDUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoYEVycm9yIGNyZWF0aW5nIGxpc3QuIFBsZWFzZSB0cnkgYWdhaW5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbGlzdE1hbmFnZXIuY3JlYXRlTmV3TGlzdChsaXN0TmFtZSwgYGNoZWNrbGlzdGAsIHRydWUpO1xuICAgICAgICBtYWtlQnRuKHsgdGl0bGU6IGxpc3ROYW1lLCBpY29uOiBgY2hlY2tsaXN0YCwgY3VzdG9tOiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGRMaXN0TGlzdGVuZXIoKSB7XG4gICAgICAgIGNvbnN0IGFkZExpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWRkTGlzdGApO1xuICAgICAgICBhZGRMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgYWRkTmV3TGlzdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0cygpIHtcbiAgICAgICAgY29uc3QgbGlzdHMgPSBsaXN0TWFuYWdlci5nZXRMaXN0cygpO1xuICAgICAgICBsaXN0cy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgbWFrZUJ0bihsaXN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdHMoKTtcbiAgICAgICAgYWRkTGlzdExpc3RlbmVyKCk7XG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkQnRuKCk7XG4gICAgfSgpKTtcblxufSkoKTtcblxuY29uc3QgbWFpblNjcmVlbk1vZHVsZSA9ICgoKSA9PiB7XG4gICAgZXZlbnRzLnN1YnNjcmliZShgdXBkYXRlQWN0aXZlTGlzdGAsIHVwZGF0ZUFjdGl2ZUxpc3QpO1xuICAgIGV2ZW50cy5zdWJzY3JpYmUoYGRlbGV0ZUl0ZW1gLCBkZWxldGVMaXN0SXRlbSk7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVMaXN0SXRlbShpdGVtTmFtZSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5saXN0LWl0ZW1gKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IEFycmF5LmZyb20oaXRlbXMpLmZpbmQoaXRlbSA9PiBpdGVtLmNoaWxkTm9kZXNbMV0uaW5uZXJUZXh0ID09PSBpdGVtTmFtZSk7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUhlYWRlcihhY3RpdmVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckxpc3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGhlYWRlckxpc3ROYW1lYCk7XG4gICAgICAgIGhlYWRlckxpc3ROYW1lLmlubmVyVGV4dCA9IGFjdGl2ZUxpc3QudGl0bGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpc3RJdGVtcyhhY3RpdmVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgbGlzdC1pdGVtYCk7XG4gICAgICAgIHdoaWxlIChsaS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaVswXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGl2ZUxpc3QuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHNldHVwTmV3SXRlbShpdGVtLm5hbWUsIGl0ZW0uY29tcGxldGVkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrQ3VzdG9tTGlzdChhY3RpdmVMaXN0KSB7XG4gICAgICAgIGNvbnN0IGFkZEl0ZW1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWRkSXRlbWApO1xuICAgICAgICBjb25zdCBsaXN0T3B0aW9uc0ljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdE9wdGlvbnNgKTtcblxuICAgICAgICBpZiAoYWN0aXZlTGlzdC5jdXN0b20gPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGFkZEl0ZW1CdG4uY2xhc3NMaXN0LmFkZChgcmVtb3ZlZGApO1xuICAgICAgICAgICAgbGlzdE9wdGlvbnNJY29uLmNsYXNzTGlzdC5hZGQoYHJlbW92ZWRgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZEl0ZW1CdG4uY2xhc3NMaXN0LnJlbW92ZShgcmVtb3ZlZGApO1xuICAgICAgICAgICAgbGlzdE9wdGlvbnNJY29uLmNsYXNzTGlzdC5yZW1vdmUoYHJlbW92ZWRgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVMaXN0KCkge1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gbGlzdE1hbmFnZXIuZ2V0QWN0aXZlTGlzdCgpO1xuICAgICAgICB1cGRhdGVIZWFkZXIoYWN0aXZlTGlzdCk7XG4gICAgICAgIHVwZGF0ZUxpc3RJdGVtcyhhY3RpdmVMaXN0KTtcbiAgICAgICAgY2hlY2tDdXN0b21MaXN0KGFjdGl2ZUxpc3QpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDaGVja2JveChldmVudCkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgbGkgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgY29uc3QgdGV4dCA9IGxpLmNoaWxkcmVuWzFdO1xuXG4gICAgICAgIGlmIChjaGVja2JveC5pbm5lclRleHQgPT09IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2ApIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IGBjaGVja19ib3hgO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYGxpbmUtdGhyb3VnaGApO1xuICAgICAgICAgICAgbGkuc3R5bGUuc2V0UHJvcGVydHkoYG9wYWNpdHlgLCBgNTAlYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGVja2JveC5pbm5lclRleHQgPSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgO1xuICAgICAgICAgICAgdGV4dC5zdHlsZS5zZXRQcm9wZXJ0eShgdGV4dC1kZWNvcmF0aW9uYCwgYG5vbmVgKTtcbiAgICAgICAgICAgIGxpLnN0eWxlLnNldFByb3BlcnR5KGBvcGFjaXR5YCwgYDEwMCVgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RNYW5hZ2VyLm1hbmFnZUl0ZW1zKHRleHQuaW5uZXJUZXh0LCBgc3RhdHVzQ2hhbmdlYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4cGFuZEl0ZW0oZXZlbnQpIHtcbiAgICAgICAgLy9zdGlsbCB0b2RvXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuXG5cblxuICAgIGZ1bmN0aW9uIHNldEl0ZW1MaXN0ZW5lcihpY29uLCBpdGVtT3B0aW9ucykge1xuICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdXBkYXRlQ2hlY2tib3gpO1xuICAgICAgICBpdGVtT3B0aW9ucy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGxpc3RNYW5hZ2VyLmRlbGV0ZUl0ZW0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXR1cE5ld0l0ZW0oaXRlbU5hbWUsIGNvbXBsZXRlZCkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsaXN0SXRlbXNgKTtcblxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGxpYCk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoYGxpc3QtaXRlbWApO1xuXG4gICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb24uY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGAsIGBpdGVtLWNoZWNrYm94YCk7XG4gICAgICAgIGljb24uaW5uZXJUZXh0ID0gYGNoZWNrX2JveF9vdXRsaW5lX2JsYW5rYDtcbiAgICAgICAgLy9jaGVjayBpZiBpdGVtIGlzIGNvbXBsZXRlZCBoZXJlXG5cbiAgICAgICAgY29uc3QgaXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGl0ZW1UZXh0LmNsYXNzTGlzdC5hZGQoYGl0ZW0tdGV4dGApO1xuICAgICAgICBpdGVtVGV4dC5pbm5lclRleHQgPSBpdGVtTmFtZTtcblxuICAgICAgICBjb25zdCBpdGVtT3B0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHNwYW5gKTtcbiAgICAgICAgaXRlbU9wdGlvbnMuY2xhc3NMaXN0LmFkZChgbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZGAsIGBpdGVtLW9wdGlvbnNgKTtcbiAgICAgICAgaXRlbU9wdGlvbnMuaW5uZXJUZXh0ID0gYG1vcmVfdmVydGA7XG5cbiAgICAgICAgdWwuaW5zZXJ0QmVmb3JlKGxpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWRkSXRlbWApKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGl0ZW1UZXh0KTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaXRlbU9wdGlvbnMpO1xuXG4gICAgICAgIHNldEl0ZW1MaXN0ZW5lcihpY29uLCBpdGVtT3B0aW9ucyk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZEl0ZW0oKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGxldCBpdGVtTmFtZSA9IHByb21wdChgTmV3IExpc3QgSXRlbTpgKTtcblxuICAgICAgICBsZXQgaW52YWxpZCA9IGxpc3QuaXRlbXMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gaXRlbU5hbWUpO1xuICAgICAgICBsZXQgY291bnRlciA9IDA7XG4gICAgICAgIHdoaWxlIChpbnZhbGlkKSB7XG4gICAgICAgICAgICBpdGVtTmFtZSA9IHByb21wdChgSXRlbSBhbHJlYWR5IGV4aXN0cy4gUGxlYXNlIGVudGVyIGEgZGlmZmVyZW50IGl0ZW06YCk7XG4gICAgICAgICAgICBpbnZhbGlkID0gbGlzdC5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBpdGVtTmFtZSk7XG4gICAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgICBpZiAoY291bnRlciA+PSA1KSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KGBFcnJvciBjcmVhdGluZyBpdGVtLiBQbGVhc2UgdHJ5IGFnYWluYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHNldHVwTmV3SXRlbShpdGVtTmFtZSwgZmFsc2UpO1xuICAgICAgICBsaXN0TWFuYWdlci5tYW5hZ2VJdGVtcyhpdGVtTmFtZSwgYG5ld2ApO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBtZW51QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCdG5gKTtcbiAgICAgICAgY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51YCk7XG4gICAgICAgIGNvbnN0IG1lbnVCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBtZW51QmdgKTtcbiAgICAgICAgY29uc3QgYWRkSXRlbUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRJdGVtYCk7XG4gICAgICAgIGNvbnN0IGxpc3RPcHRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGxpc3RPcHRpb25zYCk7XG5cbiAgICAgICAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFtZW51Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgICAgICBpZiAoIW1lbnVCZy5jbGFzc0xpc3QuY29udGFpbnMoYGFjdGl2ZWApKSBtZW51QmcuY2xhc3NMaXN0LmFkZChgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBtZW51QmcuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgICAgICBtZW51QmcuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgYWRkSXRlbSk7XG4gICAgICAgIGxpc3RPcHRpb25zLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgbGlzdE1hbmFnZXIuZGVsZXRlTGlzdCk7XG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdGVuZXJzKCk7XG4gICAgICAgIHVwZGF0ZUFjdGl2ZUxpc3QoKTtcbiAgICB9KCkpO1xufSkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=