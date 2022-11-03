const headerSetup = () => {
    const header = document.getElementById(`header`);

    const menuButton = document.createElement(`button`);
    menuButton.classList.add(`hamburger-menu`);
    menuButton.id = `menuButton`;
    menuButton.name = `open menu button`;

    const iconSpan = document.createElement(`span`);
    iconSpan.classList.add(`material-symbols-outlined`, `header-icon`);
    iconSpan.innerText = `menu`;


    const titleSpan = document.createElement(`span`);
    titleSpan.classList.add(`header-title-span`);

    const listName = document.createElement(`h1`);
    listName.classList.add(`header-list-name`);
    listName.id = `headerListName`;
    listName.innerText = `LIST NAME`;

    header.appendChild(menuButton);
    menuButton.appendChild(iconSpan);
    header.appendChild(titleSpan);
    titleSpan.appendChild(listName);

};

function createMenuLists(listTitle, icon) {
    const menu = document.getElementById(`menu`);
    const button = document.createElement(`button`);
    button.classList.add(`menu-buttons`);
    button.id = listTitle;
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

export {
    headerSetup,
    menuSetup,
    createMenuLists
};