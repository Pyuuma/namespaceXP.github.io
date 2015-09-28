var iframeLoaded = function (iframe) {
    if (iframe.src.length > 0) {
        if (!iframe.readyState || iframe.readyState == "complete") {
            var bHeight = 
            iframe.contentWindow.document.body.scrollHeight;
            var dHeight = 
            iframe.contentWindow.document.documentElement.scrollHeight;
            var height = Math.max(bHeight, dHeight);
            iframe.height = height;
        }
    }
}