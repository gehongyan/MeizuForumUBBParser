// ==UserScript==
// @name         魅族社区审核图片解析
// @namespace    https://greasyfork.org/zh-CN/users/188666-gehongyan
// @version      1.1.0
// @description  to parse the img tag to show images directly
// @author       gehongyan
// @grant        none
// @include      https://bbs.meizu.cn/forum.php?mod=modcp&action=moderate*
// ==/UserScript==

(function() {
    'use strict';
    var allDivs, thisDiv;
    allDivs = document.evaluate(
        "//div[@style=\"overflow: auto; overflow-x: hidden; height:112px; word-break: break-all;\"]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        var altText = thisDiv.innerHTML;
        //console.log(altText);
        var altHTML = altText.replace(/\[img\](.+?)\[\/img\]/ig,"<img src=$1 style=\"max-width:60%; max-height:60%;\" >");
        var newImgTag = document.createElement("div");
        newImgTag.innerHTML = altHTML;
        thisDiv.parentNode.replaceChild(newImgTag, thisDiv);
    }
    var imgLinks = document.getElementsByTagName('img');
    for (i = 0; i < imgLinks.length; i++) {
        var imgLink = imgLinks[i];
        var altImgLink = imgLink.src.replace(/https:\/\/bbs.meizu.cn\/data\/attachment\/forum\/(.+)/ig, "https://bbsimage.res.meizu.com/forum/$1");
        imgLink.src = altImgLink;
    }

})();

function parseToDOM(str){
   var div = document.createElement("div");
   if(typeof str == "string"){
       div.innerHTML = str;
   }
   return div.childNodes;
}
