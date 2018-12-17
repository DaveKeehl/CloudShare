//Functions to allow the acquisition of the link of a specific file, and its effects visible on the web page.

$('.getDirectoryLink').tooltip({
    trigger: 'click',
    placement: 'bottom'
});

$('.getLink').tooltip({
    trigger: 'click',
    placement: 'bottom'
});

function setTooltipDirectory(message) {
    $('.getDirectoryLink').tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function setTooltipFile(message) {
    $('.getLink').tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltipDirectory() {
    setTimeout(function() {
        $('.getDirectoryLink').tooltip('hide');
    }, 1000);
}

function hideTooltipFile() {
    setTimeout(function() {
        $('.getLink').tooltip('hide');
    }, 1000);
}

var clipboardDir = new ClipboardJS('.getDirectoryLink');
var clipboardFile = new ClipboardJS('.getLink');

clipboardDir.on('success', function(e) {
    alert("Copied!");
});

clipboardFile.on('success', function(e) {
    alert("Copied!");
});

clipboardDir.on('error', function(e) {
    alert("Failed!");
});

clipboardFile.on('error', function(e) {
    alert("Failed!");
});
