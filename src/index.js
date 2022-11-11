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

const menuModule = (() => {
    let LISTS = [];

    function closeMenu() {
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);

        menuContainer.classList.remove(`active`);
        menuBg.classList.remove(`active`);
    };

    function setActiveList(event) {
        LISTS.forEach(list => {
            list.isActive = false;
        });
        const activeList = LISTS.find(list => list.title == event.target.name);
        activeList.isActive = true;

        document.querySelectorAll(`.selected`).forEach(el => {
            el.classList.remove(`selected`);
        });
        event.target.classList.add(`selected`);
    };

    function handleListClick(event) {
        setActiveList(event);
        closeMenu();
    };

    function setBtnListener(btn) {
        btn.addEventListener(`click`, handleListClick);
    };

    function makeBtn(list) {
        const btn = document.createElement(`button`);

        btn.classList.add(`menu-buttons`);
        btn.id = list.title.replace(/\s/g, "");
        btn.name = list.title;

        const iconSpan = document.createElement(`span`);
        iconSpan.classList.add(`material-symbols-outlined`);
        iconSpan.innerText = list.icon;

        const btnText = document.createElement(`span`);
        btnText.innerText = list.title;

        btn.appendChild(iconSpan);
        btn.appendChild(btnText);

        setBtnListener(btn);
        return btn;
    };

    function setupList(title, icon = `checklist`, custom = true) {
        let list = new List(title, [], icon, custom);
        let container;

        if (custom == false) container = document.getElementById(`premadeLists`);
        else container = document.getElementById(`customLists`);

        const btn = makeBtn(list);
        container.appendChild(btn);

        LISTS.push(list);
    };

    function addNewList() {
        const listName = prompt(`New List Name:`);
        setupList(listName, `checklist`, true);
    };

    function initLists() {
        setupList(`Today`, `today`, false);
        setupList(`Tomorrow`, `event`, false);
        setupList(`This Week`, `date_range`, false);

        setupList(`To-Do`, `checklist`, true);
        ////Search local storage and add any lists to customLists here
    };

    function addListListener() {
        const addListBtn = document.getElementById(`addList`);
        addListBtn.addEventListener(`click`, addNewList);
    };

    const getLists = () => {
        return LISTS;
    }

    (function init() {
        initLists();
        addListListener();
    }());

    return { getLists };
})();

const mainScreenModule = (() => {
    let LISTS = menuModule.getLists();

    function initListeners() {
        const menuButton = document.getElementById(`menuBtn`);
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);

        menuButton.addEventListener(`click`, function() {
            if (!menuContainer.classList.contains(`active`)) menuContainer.classList.add(`active`);
            if (!menuBg.classList.contains(`active`)) menuBg.classList.add(`active`);
        });
        menuBg.addEventListener(`click`, function() {
            menuContainer.classList.remove(`active`);
            menuBg.classList.remove(`active`);
        });

    };

    function getActiveList() {
        let activeList = LISTS.find(list => list.active == true);
        if (!activeList) activeList = LISTS[0];
        return activeList.title;
    };

    function setupActiveList() {
        //Update Header Title
        const headerListName = document.getElementById(`headerListName`);
        headerListName.innerText = getActiveList();
    }

    (function init() {
        initListeners();
        setupActiveList();
    }());
})();