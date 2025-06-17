// Create parent menu item
browser.contextMenus.create({
    id: "amplify-image-parent",
    title: "Amplify Image",
    contexts: ["image"],
    icons: {
        "16": "icons/search-12-48.png"
    }
});

// Create child menu items for different sizes
browser.contextMenus.create({
    id: "amplify-image-50",
    parentId: "amplify-image-parent",
    title: "Add 50%",
    contexts: ["image"],
});

browser.contextMenus.create({
    id: "amplify-image-75",
    parentId: "amplify-image-parent",
    title: "Add 75%",
    contexts: ["image"]
});

browser.contextMenus.create({
    id: "amplify-image-100",
    parentId: "amplify-image-parent",
    title: "Add 100%",
    contexts: ["image"]
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    let size = '100%';
    
    switch(info.menuItemId) {
        case "amplify-image-50":
            size = '50%';
            break;
        case "amplify-image-75":
            size = '75%';
            break;
        case "amplify-image-100":
            size = '100%';
            break;
    }
    
    browser.tabs.sendMessage(tab.id, {
        action: "amplify",
        imageUrl: info.srcUrl,
        size: size
    });
});