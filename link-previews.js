// Select elements that hold links to preview
var linkPreviewTargets = document.getElementsByClassName('link-preview');
// Set up a MutationObserver to detect changes in the DOM
var observer = new MutationObserver(function (mutations) {
    var needsRefresh = false;
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
            needsRefresh = true;
        else if (mutation.type === 'attributes' && mutation.attributeName === 'href')
            needsRefresh = true;
    });
    if (needsRefresh)
        refreshLinkPreviews();
});
function refreshLinkPreviews() {
    // @ts-ignore
    Array.from(linkPreviewTargets).forEach(function (element) {
        if (!element.href)
            return;
        element.style.setProperty('--favicon-url', "url(\"https://s2.googleusercontent.com/s2/favicons?domain=".concat(element.href, "\")"));
    });
}
// Initial preview generation
refreshLinkPreviews();
// Start observing the DOM for changes in the subtree where previews might be added or changed
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href'],
});
