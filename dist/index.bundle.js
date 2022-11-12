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

    /* remove item, change item name, change list title*/
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
        if (activeList.custom == false) addItemBtn.classList.add(`removed`);
        else addItemBtn.classList.remove(`removed`);
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

    function setItemListener(icon, itemText) {
        icon.addEventListener('click', updateCheckbox);
        itemText.addEventListener('click', expandItem);
    };

    function setupNewItem(itemName, completed) {
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
        setupNewItem(itemName, false);
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
        //Don't include add-item button on premade lists
        initListeners();
        updateActiveList();
    }());
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d2VicGFjazovL3RvZG8vLi9zcmMvcHVic3ViLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHtcbiAgICBldmVudHM6IHt9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbihldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVibGlzaDogZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IHsgZXZlbnRzIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gJy4vcHVic3ViLmpzJztcblxuY2xhc3MgTGlzdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsXG4gICAgICAgIGl0ZW1zID0gW10sXG4gICAgICAgIGljb24gPSBgY2hlY2tsaXN0YCxcbiAgICAgICAgY3VzdG9tID0gdHJ1ZSxcbiAgICAgICAgYWN0aXZlID0gZmFsc2VcbiAgICApIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtc1xuICAgICAgICB0aGlzLmljb24gPSBpY29uXG4gICAgICAgIHRoaXMuY3VzdG9tID0gY3VzdG9tXG4gICAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlXG4gICAgfTtcblxuICAgIHNldCBpc0FjdGl2ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgZWxzZSB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBpc0FjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xuICAgIH1cblxuICAgIG5ld0l0ZW0oaXRlbU5hbWUpIHtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHsgbmFtZTogaXRlbU5hbWUsIG5vdGVzOiBgYCwgY29tcGxldGVkOiBmYWxzZSB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtU3RhdHVzKGl0ZW1OYW1lKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGl0ZW1OYW1lKTtcbiAgICAgICAgaXRlbS5jb21wbGV0ZWQgPSAhaXRlbS5jb21wbGV0ZWQ7XG4gICAgfVxuXG4gICAgLyogcmVtb3ZlIGl0ZW0sIGNoYW5nZSBpdGVtIG5hbWUsIGNoYW5nZSBsaXN0IHRpdGxlKi9cbn1cblxuY29uc3QgbGlzdE1hbmFnZXIgPSAoKCkgPT4ge1xuICAgIGxldCBMSVNUUyA9IFtdO1xuXG4gICAgY29uc3QgY3JlYXRlTmV3TGlzdCA9ICh0aXRsZSwgaWNvbiA9IGBjaGVja2xpc3RgLCBjdXN0b20gPSB0cnVlKSA9PiB7XG4gICAgICAgIGxldCBsaXN0ID0gbmV3IExpc3QodGl0bGUsIFtdLCBpY29uLCBjdXN0b20pO1xuICAgICAgICBMSVNUUy5wdXNoKGxpc3QpO1xuICAgIH07XG5cbiAgICBjb25zdCBzZXRBY3RpdmVMaXN0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIExJU1RTLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBsaXN0LmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhY3RpdmVMaXN0ID0gTElTVFMuZmluZChsaXN0ID0+IGxpc3QudGl0bGUgPT0gZXZlbnQudGFyZ2V0Lm5hbWUpO1xuICAgICAgICBhY3RpdmVMaXN0LmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0QWN0aXZlTGlzdCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFjdGl2ZUxpc3QgPSBMSVNUUy5maW5kKGxpc3QgPT4gbGlzdC5pc0FjdGl2ZSA9PSB0cnVlKTtcbiAgICAgICAgaWYgKCFhY3RpdmVMaXN0KSBhY3RpdmVMaXN0ID0gTElTVFNbMF07XG4gICAgICAgIHJldHVybiBhY3RpdmVMaXN0O1xuICAgIH07XG5cbiAgICBjb25zdCBtYW5hZ2VJdGVtcyA9IChpdGVtTmFtZSwgYWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBnZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIGlmIChhY3Rpb24gPT09IGBuZXdgKSBsaXN0Lm5ld0l0ZW0oaXRlbU5hbWUpO1xuICAgICAgICBpZiAoYWN0aW9uID09PSBgc3RhdHVzQ2hhbmdlYCkgbGlzdC51cGRhdGVJdGVtU3RhdHVzKGl0ZW1OYW1lKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0TGlzdHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBMSVNUUztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdExpc3RzKCkge1xuICAgICAgICBjcmVhdGVOZXdMaXN0KGBUb2RheWAsIGB0b2RheWAsIGZhbHNlKTtcbiAgICAgICAgY3JlYXRlTmV3TGlzdChgVG9tb3Jyb3dgLCBgZXZlbnRgLCBmYWxzZSk7XG4gICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRoaXMgV2Vla2AsIGBkYXRlX3JhbmdlYCwgZmFsc2UpO1xuXG4gICAgICAgIGNyZWF0ZU5ld0xpc3QoYFRvLURvYCwgYGNoZWNrbGlzdGAsIHRydWUpO1xuICAgICAgICAvLy8vU2VhcmNoIGxvY2FsIHN0b3JhZ2UgYW5kIGFkZCBhbnkgbGlzdHMgdG8gY3VzdG9tTGlzdHMgaGVyZVxuICAgIH07XG5cbiAgICAoZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaW5pdExpc3RzKCk7XG4gICAgfSkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZU5ld0xpc3QsXG4gICAgICAgIGdldExpc3RzLFxuICAgICAgICBzZXRBY3RpdmVMaXN0LFxuICAgICAgICBnZXRBY3RpdmVMaXN0LFxuICAgICAgICBtYW5hZ2VJdGVtc1xuICAgIH1cbn0pKCk7XG5cbmNvbnN0IG1lbnVNb2R1bGUgPSAoKCkgPT4ge1xuXG4gICAgZnVuY3Rpb24gY2xvc2VNZW51KCkge1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuXG4gICAgICAgIG1lbnVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShgYWN0aXZlYCk7XG4gICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRCdG4oZXZlbnQpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnNlbGVjdGVkYCkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGBzZWxlY3RlZGApO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoYHNlbGVjdGVkYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUxpc3RDbGljayhldmVudCkge1xuICAgICAgICBsaXN0TWFuYWdlci5zZXRBY3RpdmVMaXN0KGV2ZW50KTtcbiAgICAgICAgZXZlbnRzLnB1Ymxpc2goYHVwZGF0ZUFjdGl2ZUxpc3RgLCBldmVudClcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRCdG4oZXZlbnQpO1xuICAgICAgICBjbG9zZU1lbnUoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0QnRuTGlzdGVuZXIoYnRuKSB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGhhbmRsZUxpc3RDbGljayk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1ha2VCdG4obGlzdCkge1xuICAgICAgICBsZXQgY29udGFpbmVyO1xuXG4gICAgICAgIGlmIChsaXN0LmN1c3RvbSA9PSBmYWxzZSkgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByZW1hZGVMaXN0c2ApO1xuICAgICAgICBlbHNlIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjdXN0b21MaXN0c2ApO1xuXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChgbWVudS1idXR0b25zYCk7XG4gICAgICAgIGJ0bi5pZCA9IGxpc3QudGl0bGUucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICBidG4ubmFtZSA9IGxpc3QudGl0bGU7XG5cbiAgICAgICAgY29uc3QgaWNvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGljb25TcGFuLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvblNwYW4uaW5uZXJUZXh0ID0gbGlzdC5pY29uO1xuXG4gICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBzcGFuYCk7XG4gICAgICAgIGJ0blRleHQuaW5uZXJUZXh0ID0gbGlzdC50aXRsZTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGljb25TcGFuKTtcbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGJ0blRleHQpO1xuXG4gICAgICAgIHNldEJ0bkxpc3RlbmVyKGJ0bik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZE5ld0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpc3ROYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBOYW1lOmApOyAvL1NldHVwIHZhbGlkYXRpb24gdGhhdCB0aGF0IGxpc3QgbmFtZSBkb2Vzbid0IGFscmVhZHkgZXhpc3RcbiAgICAgICAgbGlzdE1hbmFnZXIuY3JlYXRlTmV3TGlzdChsaXN0TmFtZSwgYGNoZWNrbGlzdGAsIHRydWUpO1xuICAgICAgICBtYWtlQnRuKHsgdGl0bGU6IGxpc3ROYW1lLCBpY29uOiBgY2hlY2tsaXN0YCwgY3VzdG9tOiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGRMaXN0TGlzdGVuZXIoKSB7XG4gICAgICAgIGNvbnN0IGFkZExpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWRkTGlzdGApO1xuICAgICAgICBhZGRMaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgYWRkTmV3TGlzdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0cygpIHtcbiAgICAgICAgY29uc3QgbGlzdHMgPSBsaXN0TWFuYWdlci5nZXRMaXN0cygpO1xuICAgICAgICBsaXN0cy5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgbWFrZUJ0bihsaXN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIChmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0TGlzdHMoKTtcbiAgICAgICAgYWRkTGlzdExpc3RlbmVyKCk7XG4gICAgfSgpKTtcblxufSkoKTtcblxuY29uc3QgbWFpblNjcmVlbk1vZHVsZSA9ICgoKSA9PiB7XG4gICAgZXZlbnRzLnN1YnNjcmliZShgdXBkYXRlQWN0aXZlTGlzdGAsIHVwZGF0ZUFjdGl2ZUxpc3QpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlSGVhZGVyKGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyTGlzdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaGVhZGVyTGlzdE5hbWVgKTtcbiAgICAgICAgaGVhZGVyTGlzdE5hbWUuaW5uZXJUZXh0ID0gYWN0aXZlTGlzdC50aXRsZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlzdEl0ZW1zKGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBsaXN0LWl0ZW1gKTtcbiAgICAgICAgd2hpbGUgKGxpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxpWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGlbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZlTGlzdC5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgc2V0dXBOZXdJdGVtKGl0ZW0ubmFtZSwgaXRlbS5jb21wbGV0ZWQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hlY2tDdXN0b21MaXN0KGFjdGl2ZUxpc3QpIHtcbiAgICAgICAgY29uc3QgYWRkSXRlbUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRJdGVtYCk7XG4gICAgICAgIGlmIChhY3RpdmVMaXN0LmN1c3RvbSA9PSBmYWxzZSkgYWRkSXRlbUJ0bi5jbGFzc0xpc3QuYWRkKGByZW1vdmVkYCk7XG4gICAgICAgIGVsc2UgYWRkSXRlbUJ0bi5jbGFzc0xpc3QucmVtb3ZlKGByZW1vdmVkYCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZUxpc3QoKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUxpc3QgPSBsaXN0TWFuYWdlci5nZXRBY3RpdmVMaXN0KCk7XG4gICAgICAgIHVwZGF0ZUhlYWRlcihhY3RpdmVMaXN0KTtcbiAgICAgICAgdXBkYXRlTGlzdEl0ZW1zKGFjdGl2ZUxpc3QpO1xuICAgICAgICBjaGVja0N1c3RvbUxpc3QoYWN0aXZlTGlzdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNoZWNrYm94KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBsaSA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICBjb25zdCB0ZXh0ID0gbGkuY2hpbGRyZW5bMV07XG5cbiAgICAgICAgaWYgKGNoZWNrYm94LmlubmVyVGV4dCA9PT0gYGNoZWNrX2JveF9vdXRsaW5lX2JsYW5rYCkge1xuICAgICAgICAgICAgY2hlY2tib3guaW5uZXJUZXh0ID0gYGNoZWNrX2JveGA7XG4gICAgICAgICAgICB0ZXh0LnN0eWxlLnNldFByb3BlcnR5KGB0ZXh0LWRlY29yYXRpb25gLCBgbGluZS10aHJvdWdoYCk7XG4gICAgICAgICAgICBsaS5zdHlsZS5zZXRQcm9wZXJ0eShgb3BhY2l0eWAsIGA1MCVgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrYm94LmlubmVyVGV4dCA9IGBjaGVja19ib3hfb3V0bGluZV9ibGFua2A7XG4gICAgICAgICAgICB0ZXh0LnN0eWxlLnNldFByb3BlcnR5KGB0ZXh0LWRlY29yYXRpb25gLCBgbm9uZWApO1xuICAgICAgICAgICAgbGkuc3R5bGUuc2V0UHJvcGVydHkoYG9wYWNpdHlgLCBgMTAwJWApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdE1hbmFnZXIubWFuYWdlSXRlbXModGV4dC5pbm5lclRleHQsIGBzdGF0dXNDaGFuZ2VgKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXhwYW5kSXRlbShldmVudCkge1xuICAgICAgICAvL3N0aWxsIHRvZG9cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXRJdGVtTGlzdGVuZXIoaWNvbiwgaXRlbVRleHQpIHtcbiAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZUNoZWNrYm94KTtcbiAgICAgICAgaXRlbVRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBleHBhbmRJdGVtKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBOZXdJdGVtKGl0ZW1OYW1lLCBjb21wbGV0ZWQpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGlzdEl0ZW1zYCk7XG5cbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBsaWApO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKGBsaXN0LWl0ZW1gKTtcblxuICAgICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRgKTtcbiAgICAgICAgaWNvbi5pbm5lclRleHQgPSBgY2hlY2tfYm94X291dGxpbmVfYmxhbmtgO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgc3BhbmApO1xuICAgICAgICBpdGVtVGV4dC5pbm5lclRleHQgPSBpdGVtTmFtZTtcblxuICAgICAgICB1bC5pbnNlcnRCZWZvcmUobGksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhZGRJdGVtYCkpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoaXRlbVRleHQpO1xuXG4gICAgICAgIHNldEl0ZW1MaXN0ZW5lcihpY29uLCBpdGVtVGV4dCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZEl0ZW0oKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1OYW1lID0gcHJvbXB0KGBOZXcgTGlzdCBJdGVtOmApOyAvL1NldHVwIHZhbGlkYXRpb24gdGhhdCB0aGF0IGl0ZW0gbmFtZSBkb2Vzbid0IGFscmVhZHkgZXhpc3RcbiAgICAgICAgc2V0dXBOZXdJdGVtKGl0ZW1OYW1lLCBmYWxzZSk7XG4gICAgICAgIGxpc3RNYW5hZ2VyLm1hbmFnZUl0ZW1zKGl0ZW1OYW1lLCBgbmV3YCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1lbnVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbWVudUJ0bmApO1xuICAgICAgICBjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVgKTtcbiAgICAgICAgY29uc3QgbWVudUJnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG1lbnVCZ2ApO1xuICAgICAgICBjb25zdCBhZGRJdGVtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGFkZEl0ZW1gKTtcblxuICAgICAgICBtZW51QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIW1lbnVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGBhY3RpdmVgKSkgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIGlmICghbWVudUJnLmNsYXNzTGlzdC5jb250YWlucyhgYWN0aXZlYCkpIG1lbnVCZy5jbGFzc0xpc3QuYWRkKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lbnVCZy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWVudUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgICAgIG1lbnVCZy5jbGFzc0xpc3QucmVtb3ZlKGBhY3RpdmVgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZEl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBhZGRJdGVtKTtcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIC8vRG9uJ3QgaW5jbHVkZSBhZGQtaXRlbSBidXR0b24gb24gcHJlbWFkZSBsaXN0c1xuICAgICAgICBpbml0TGlzdGVuZXJzKCk7XG4gICAgICAgIHVwZGF0ZUFjdGl2ZUxpc3QoKTtcbiAgICB9KCkpO1xufSkoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=