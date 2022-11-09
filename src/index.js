class List {
    constructor(title,
        items = [],
        icon = `checklist`
    ) {
        this.title = title
        this.items = items
        this.icon = icon
    };
    /* add item, remove item */
}

const menuModule = () => {
    const menu = document.getElementById(`menu`);
    let premadeLists = [];
    let customLists = [];
    let activeList = `To-Do`;

    function addList(list) {
        const menu = document.getElementById(`menu`);
        const btn = document.createElement(`button`);

        btn.classList.add(`menu-buttons`);
        btn.id = list.title.replace(/\s/g, "");
        btn.name = list.title;

        const iconSpan = document.createElement(`span`);
        iconSpan.classList.add(`material-symbols-outlined`);
        iconSpan.innerText = list.icon;

        const btnText = document.createElement(`span`);
        btnText.innerText = list.title;
        //return btn here instead and move appendChild to other function
        menu.appendChild(btn);
        btn.appendChild(iconSpan);
        btn.appendChild(btnText);

    };

    function createLists() {
        premadeLists.push(new List(`Today`, [], `today`));
        premadeLists.push(new List(`Tomorrow`, [], `event`));
        premadeLists.push(new List(`This Week`, [], `date_range`));

        customLists.push(new List(`To-Do`, [], `checklist`));
        ////Search local storage and add any lists to customLists here
    }

    function setupTitle() {
        const title = document.createElement(`h1`);
        title.classList.add(`app-title`);
        title.innerText = `Tracker`;
        menu.appendChild(title);
    };

    function setupListHeading() {
        const listsHeading = document.createElement(`p`);
        listsHeading.classList.add(`menu-lists`);
        listsHeading.innerText = `Lists`;
        menu.appendChild(listsHeading);
    };

    function setupPremadeLists() {
        premadeLists.forEach(list => addList(list));
    };

    function setupCustomLists() {
        customLists.forEach(list => addList(list));
    };

    function setActiveList(e) {
        activeList = e.target.id;
    };

    function getActiveList() {
        console.log(activeList);
        return activeList;
    };

    function createEventListeners() {
        const btns = document.querySelectorAll(`.menu-buttons`);
        btns.forEach(btn => btn.addEventListener(`click`, setActiveList));
    };

    (function setupMenu() {
        createLists();
        setupTitle();
        setupPremadeLists();
        setupListHeading();
        setupCustomLists();
        createEventListeners();
    }());

};

menuModule();

(function initEvents() {
    const menuButton = document.getElementById(`menuBtn`);
    const menuContainer = document.getElementById(`menu`);
    const menuBg = document.getElementById(`menuBg`);
    const addListBtn = document.getElementById(`AddList`);

    menuButton.addEventListener(`click`, function() {
        if (!menuContainer.classList.contains(`active`)) menuContainer.classList.add(`active`);
        if (!menuBg.classList.contains(`active`)) menuBg.classList.add(`active`);
    });
    menuBg.addEventListener(`click`, function() {
        if (menuContainer.classList.contains(`active`)) menuContainer.classList.remove(`active`);
        if (menuBg.classList.contains(`active`)) menuBg.classList.remove(`active`);
    });
    //addListBtn.addEventListener(`click`, addNewList);

}());