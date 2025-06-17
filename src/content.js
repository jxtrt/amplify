browser.runtime.onMessage.addListener((message) => {
    if (message.action === "amplify" && message.imageUrl) {
        amplifyImage(message.imageUrl, message.size);
    }
});

const dialogStyle = {
    padding: "20px", // Add consistent padding around dialog content
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    zIndex: "3000",
    boxSizing: "border-box", // Include padding in size calculations
    outline: "none", // Remove default outline
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const imgStyle = {
    height: "auto", // Maintain aspect ratio
    objectFit: "contain",
    cursor: "pointer",
    display: "block",
    margin: "0", // Remove margin since we're using dialog padding
};

// Size configurations for different amplification options
const sizeConfigs = {
    '50%': {
        dialogMaxWidth: '50vw',
        dialogMaxHeight: '50vh',
        imageWidth: '100%',
        imageMaxWidth: 'calc(50vw - 45px)', // Account for dialog padding
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
    dialog = document.getElementById("amplify-dialog");
    if (dialog) {
        dialog.close();
        dialog.remove();
    }
}

function amplifyImage(imageUrl, size = '100%') {
    const existingDialog = document.getElementById("amplify-dialog");
    if (existingDialog) {
        existingDialog.remove();
    }

    // Get the size configuration (default to 100% if not found)
    const config = sizeConfigs[size] || sizeConfigs['100%'];

    const dialog = document.createElement("dialog");
    dialog.id = "amplify-dialog";
    
    // Apply base dialog style
    Object.assign(dialog.style, dialogStyle);
    
    // Apply size-specific dialog styles
    dialog.style.maxWidth = config.dialogMaxWidth;
    dialog.style.maxHeight = config.dialogMaxHeight;
    dialog.style.width = 'auto';
    dialog.style.height = 'auto';

    const img = document.createElement("img");
    img.id = "amplify-image";
    img.src = imageUrl;
    
    // Apply base image style
    Object.assign(img.style, imgStyle);
    
    // Apply size-specific image styles
    img.style.width = config.imageWidth;
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
