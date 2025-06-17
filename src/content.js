browser.runtime.onMessage.addListener((message) => {
    if (message.action === "amplify" && message.imageUrl) {
        amplifyImage(message.imageUrl, message.size);
    }
});

// add random string to avoid removing content on the original page
function generateRandomId(prefix) {
    const randomString = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${randomString}`;
}
const idRefs = {
    dialog: generateRandomId('amplify-dialog'),
    image: generateRandomId('amplify-image')
};

const dialogStyle = {
    padding: "20px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    zIndex: "3000",
    boxSizing: "border-box", // to take padding into acc for size calculations
    outline: "none", // outline that shows when dialog is focused
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
};

const imgStyle = {
    height: "auto",
    objectFit: "contain",
    cursor: "pointer",
    display: "block",
    margin: "0",
};

const sizeConfigs = { // using 45px to leave some breathing room
    '50%': {
        dialogMaxWidth: '50vw',
        dialogMaxHeight: '50vh',
        imageWidth: '100%',
        imageMaxWidth: 'calc(50vw - 45px)',
        imageMaxHeight: 'calc(50vh - 45px)'
    },
    '75%': {
        dialogMaxWidth: '75vw',
        dialogMaxHeight: '75vh',
        imageWidth: '100%',
        imageMaxWidth: 'calc(75vw - 45px)',
        imageMaxHeight: 'calc(75vh - 45px)'
    },
    '100%': {
        dialogMaxWidth: '90vw',
        dialogMaxHeight: '90vh',
        imageWidth: '100%',
        imageMaxWidth: 'calc(90vw - 45px)',
        imageMaxHeight: 'calc(90vh - 45px)'
    }
};

function closeDialog() {
    dialog = document.getElementById(idRefs.dialog);
    if (dialog) {
        dialog.close();
        dialog.remove();
    }
}

function amplifyImage(imageUrl, size = '100%') {
    const existingDialog = document.getElementById(idRefs.dialog);
    if (existingDialog) {
        existingDialog.remove();
    }

    // default to 100% although the code path should be unreachable
    const config = sizeConfigs[size] || sizeConfigs['100%'];

    const dialog = document.createElement("dialog");
    dialog.id = idRefs.dialog;
    Object.assign(dialog.style, dialogStyle);
    dialog.style.maxWidth = config.dialogMaxWidth; // size-specific
    dialog.style.maxHeight = config.dialogMaxHeight;

    const img = document.createElement("img");
    img.id = idRefs.image;
    img.src = imageUrl;
    Object.assign(img.style, imgStyle);
    img.style.width = config.imageWidth; // size-specific
    img.style.maxWidth = config.imageMaxWidth;
    img.style.maxHeight = config.imageMaxHeight;

    img.addEventListener("click", closeDialog);
    dialog.addEventListener("click", closeDialog);

    dialog.appendChild(img);
    document.body.appendChild(dialog);

    document.body.style.overflow = 'hidden';
    dialog.addEventListener('close', () => {
        document.body.style.overflow = '';
    });
    dialog.showModal();
}
