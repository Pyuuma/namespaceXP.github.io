var iframeLoaded = function (iframe) {
    if (iframe.src.length > 0) {
        if (!iframe.readyState || iframe.readyState == "complete") {
            var bHeight = 
            iframe.contentWindow.document.body.innerHeight;
            var dHeight = 
            iframe.contentWindow.document.documentElement.innerHeight;
            var height = Math.max(bHeight, dHeight);
            iframe.height = height;
        }
    }
}