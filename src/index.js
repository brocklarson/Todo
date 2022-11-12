import { events } from './pubsub.js';

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
        events.publish(`updateActiveList`, event)
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
    events.subscribe(`updateActiveList`, updateActiveList);

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

    function updateActiveList() {
        const activeList = listManager.getActiveList();
        updateHeader(activeList);
        updateListItems(activeList);
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