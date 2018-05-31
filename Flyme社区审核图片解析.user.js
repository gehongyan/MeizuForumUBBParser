// ==UserScript==
// @name         Flyme社区审核图片解析
// @namespace    https://greasyfork.org/zh-CN/users/188666-gehongyan
// @version      1.0.1
// @description  to parse the img tag to show images directly
// @author       gehongyan
// @grant        none
// @include      http://bbs.flyme.cn/forum.php?mod=modcp&action=moderate*
// ==/UserScript==

(function() {
    'use strict';
    var allDivs, thisDiv;
    allDivs = document.evaluate(
        "//div[@style=\"overflow: auto; overflow-x: hidden; height:55px; word-break: break-all;\"]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        var altText = thisDiv.innerHTML;
        var altHTML = altText.replace(/\[img\](.+?)\[\/img\]/ig,"<img src=$1 style=\"max-width:60%; max-height:60%;\" >");
        //document.write(altHTML + "<br /><br />");
        /*var nodeList = parseToDOM(altHTML);
        console.log(nodeList.length);
        for (var j = 0; j < nodeList.length; j++) {
            console.log(j, nodeList[j]);
        }*/
        var newImgTag = document.createElement("div");
        newImgTag.innerHTML = altHTML;
        thisDiv.parentNode.replaceChild(newImgTag, thisDiv);
        //var altTextNode = document.createTextNode(theImage.alt);
        //theImage.parentNode.replaceChild(altText, theImage);
        //var replacement = document.createTextNode(altHTML);
        //document.body.insertBefore(nodeList.innerText, document.body.firstChild);
    }

})();

function parseToDOM(str){
   var div = document.createElement("div");
   if(typeof str == "string"){
       div.innerHTML = str;
   }
   return div.childNodes;
}
