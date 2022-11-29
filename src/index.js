import events from './pubsub.js';
import getLocalStorage from './storage.js';

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
        events.publish('updateLocalStorage', [name, data]);
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
        events.publish('updateActiveList');
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
        events.publish('updateActiveList');
    };

    const getLists = () => LISTS;

    const deleteList = () => {
        if (!window.confirm('Delete List?')) return;
        const activeList = getActiveList();
        const index = LISTS.findIndex((list) => list.title === activeList.title);
        LISTS.splice(index, 1);

        updateLocalStorage('LISTS', LISTS);
        events.publish('deleteList', activeList.title);
    };

    const deleteItem = (event) => {
        if (!window.confirm('Delete Item?')) return;
        const list = getActiveList();
        const itemName = event.target.parentNode.childNodes[1].innerText;
        list.deleteItem(itemName);

        updateLocalStorage('LISTS', LISTS);
        events.publish('deleteItem', itemName);
    };

    function initLists() {
        if (getLocalStorage('LISTS')) {
            const lists = getLocalStorage('LISTS');
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
        if (getLocalStorage('activeList')) {
            const activeList = getLocalStorage('activeList');
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

    events.subscribe('deleteList', resetLists);

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

    events.subscribe('updateActiveList', updateActiveList);
    events.subscribe('deleteItem', deleteListItem);

    (function init() {
        initListeners();
        updateActiveList();
    }());
})();