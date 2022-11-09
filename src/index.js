function createMenuLists(listTitle, icon) {
    const menu = document.getElementById(`menu`);
    const button = document.createElement(`button`);
    button.classList.add(`menu-buttons`);
    button.id = listTitle.replace(/\s/g, "");
    button.name = listTitle;

    const iconSpan = document.createElement(`span`);
    iconSpan.classList.add(`material-symbols-outlined`);
    iconSpan.innerText = icon;

    const buttonText = document.createElement(`span`);
    buttonText.innerText = listTitle;

    menu.appendChild(button);
    button.appendChild(iconSpan);
    button.appendChild(buttonText);
};

const menuSetup = () => {
    const menu = document.getElementById(`menu`);

    const title = document.createElement(`h1`);
    title.classList.add(`app-title`);
    title.innerText = `Tracker`;
    menu.appendChild(title);

    createMenuLists(`Today`, `today`);
    createMenuLists(`Tomorrow`, `event`);
    createMenuLists(`This Week`, `date_range`);

    let customLists = [`To-Do`];
    ////Search local storage and add any lists to customLists here

    const listsHeading = document.createElement(`p`);
    listsHeading.classList.add(`menu-lists`);
    listsHeading.innerText = `Lists`;
    menu.appendChild(listsHeading);

    customLists.forEach(item => createMenuLists(item, `checklist`));

    createMenuLists(`Add List`, `add`)

    const background = document.createElement(`div`);
    background.classList.add(`menu-bg`);
    background.id = `menuBg`
    document.body.appendChild(background);
};

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
    addListBtn.addEventListener(`click`, addNewList);

}());

function addNewList() {
    const listName = prompt(`New List Name:`);
    createMenuLists(listName, `checkList`);
}