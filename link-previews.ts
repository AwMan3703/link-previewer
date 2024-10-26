
// CONSTANTS

// Select elements that hold links to preview
const linkPreviewTargets = document.getElementsByClassName('link-preview');

// Set up a MutationObserver to detect changes in the DOM
const observer = new MutationObserver((mutations) => {
    let needsRefresh = false

    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) needsRefresh = true
        else if (mutation.type === 'attributes' && mutation.attributeName === 'href') needsRefresh = true
    })

    if (needsRefresh) refreshLinkPreviews()
})


// FUNCTIONS

function refreshLinkPreviews() {
    console.log('Updating link favicons...')
    // @ts-ignore
    Array.from(linkPreviewTargets).forEach((element: HTMLElement) => {
        // @ts-ignore
        if (!element.href) return;
        // @ts-ignore
        element.style.setProperty('--favicon-url', `url("https://s2.googleusercontent.com/s2/favicons?domain=${element.href}")`);
    });
}


// SCRIPT

// Initial preview generation
refreshLinkPreviews();

// Start observing the DOM for changes in the subtree where previews might be added or changed
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href'],
});
