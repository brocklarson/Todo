const headerSetup = () => {
    const header = document.getElementById(`header`);

    const iconSpan = document.createElement(`span`);
    iconSpan.classList.add(`material-symbols-outlined`, `header-icon`);
    iconSpan.innerText = `menu`;


    const titleSpan = document.createElement(`span`);
    titleSpan.classList.add(`header-title-span`);

    const listName = document.createElement(`h1`);
    listName.classList.add(`header-list-name`);
    listName.id = `headerListName`;
    listName.innerText = `LIST NAME`;

    header.appendChild(iconSpan);
    header.appendChild(titleSpan);
    titleSpan.appendChild(listName);
};

export {
    headerSetup,
};