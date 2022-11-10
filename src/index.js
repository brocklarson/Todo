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
    let premadeLists = [];
    let customLists = [];
    let activeList = `To-Do`;

    function initLists() {
        premadeLists.push(new List(`Today`, [], `today`));
        premadeLists.push(new List(`Tomorrow`, [], `event`));
        premadeLists.push(new List(`This Week`, [], `date_range`));

        customLists.push(new List(`To-Do`, [], `checklist`));
        ////Search local storage and add any lists to customLists here
    }

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

        return btn;
    };

    function setupLists(lists) {
        const container = document.getElementById(lists);

        eval(lists).forEach(list => {
            const btn = makeBtn(list);
            container.appendChild(btn);

            if (lists === `customLists`) {
                const removeIcon = document.createElement(`span`);
                removeIcon.classList.add(`material-symbols-outlined`, `remove-icon`);
                removeIcon.innerText = `close`;

                btn.appendChild(removeIcon)
            }
        });
    };

    function addNewList() {
        const listName = prompt(`New List Name:`);
        customLists.push(new List(listName, [], `checklist`));

        const btn = makeBtn(customLists.at(-1));
        document.getElementById(`customLists`).appendChild(btn);
        //Need add new list to have a remove icon. Maybe change this function to just remove lists and the reset up each time? Or make another function that makes that icon?
    }

    function setActiveList(e) {
        activeList = e.target.id;
    };

    function initListeners() {
        const btns = document.querySelectorAll(`.menu-buttons`);
        const addListBtn = document.getElementById(`addList`);

        btns.forEach(btn => btn.addEventListener(`click`, setActiveList));
        addListBtn.addEventListener(`click`, addNewList);
    };

    (function initMenu() {
        initLists();
        setupLists(`premadeLists`);
        setupLists(`customLists`);
        initListeners();
    }());
};

const mainScreenModule = () => {

    function initListeners() {
        const menuButton = document.getElementById(`menuBtn`);
        const menuContainer = document.getElementById(`menu`);
        const menuBg = document.getElementById(`menuBg`);

        menuButton.addEventListener(`click`, function() {
            if (!menuContainer.classList.contains(`active`)) menuContainer.classList.add(`active`);
            if (!menuBg.classList.contains(`active`)) menuBg.classList.add(`active`);
        });
        menuBg.addEventListener(`click`, function() {
            if (menuContainer.classList.contains(`active`)) menuContainer.classList.remove(`active`);
            if (menuBg.classList.contains(`active`)) menuBg.classList.remove(`active`);
        });

    };

    (function init() {
        initListeners();
    }());
}

mainScreenModule();
menuModule();