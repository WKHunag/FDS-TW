if (document.querySelector('.sidenav')){
    let sideNav = document.querySelector('.sidenav');
    let windowWidth = document.querySelector('body').clientWidth;

    if (windowWidth > 750) {
        sideNav.className = 'sidenav'
    } else {
        sideNav.className = 'sidenav-sm'
    }};

function loadScript(url, callback, callbackError) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    try {
        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  
            //其餘瀏覽器支援onload
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.querySelector("body").appendChild(script);
    } catch (e) {
        if (null !== callbackError) callbackError(e);
    }
}

if (document.querySelector('.container').id === "documentation"){
    // loadScript("../static/mains/fetchData.js");
    loadScript("../static/mains/getDocumentationData.js");
}else if(document.querySelector('.container').id === 'quickfacks'){
    loadScript("../static/mains/getQuickFactData.js");
}