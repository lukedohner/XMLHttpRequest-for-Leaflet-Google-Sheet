function init() {
    console.log("init");
    getthejason();
}
//Here is the XMLHttpRequest to ask the server for the file//
var url = 'https://api.myjson.com/bins/11b55d';
getthejason = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "text";
    xhr.send();

    //Is the XMLHttpRequest succesfull? /
    xhr.onload = function() {
        console.log("onload + function");
        if (xhr.status === 200) {
            //sucessfull load of json
            alert("Here is the data in a alert window " + xhr.responseText);

            var respText = xhr.responseText;

            xhrText = JSON.parse(respText); // convert it to an object

            console.log(
                "json data: xhrText.length >>>>>>>> " +
                    Object.keys(xhrText.mysheet).length
            );
            console.log(
                "Object.keys(xhrText) >>>>>>>> " + Object.keys(xhrText)
            );

            var i = -1;

            for (var mykey in xhrText.mysheet) {
                //In case you want to check to see it there is a null value -property
                if (xhrText.mysheet.hasOwnProperty(mykey)) {
                    i++;
                    window["card" + i] = mykey + " -> " + xhrText[mykey];
                }
            }
        } else {
            // not sucessfull load of json
            alert("Request failed.  Returned status of " + xhr.status);
        }
        createhooks();
    };
};
var ch = {}; // create a var namespace
createhooks = function() {
    var mysheetlenght = Object.keys(xhrText.mysheet).length;
    for (var j = 0; j < mysheetlenght; j++) {
        //console.log(" xhrText.title >>>>>>>> " + j + " " + xhrText.mysheet[j].title);
        ch["title" + j] = xhrText.mysheet[j].title;
        ch["subtitle" + j] = xhrText.mysheet[j].subtitle;
        ch["copy" + j] = xhrText.mysheet[j].copy;
        ch["imagename" + j] = xhrText.mysheet[j].imagename;

        console.log("title" + j + " is " + ch["title" + j]);
        console.log("subtitle" + j + " is " + ch["subtitle" + j]);
        console.log("copy" + j + " is " + ch["copy" + j]);
        console.log("imagename" + j + " is " + ch["imagename" + j]);
        console.log("~~~~~ " + "~~~~~ ");
        //create vars for addLElement function - Display it is the DOM
        titleindex = "ch.title" + j;
        addElement("Title " + j, ch["title" + j]);

        subtitleindex = ["ch.subtitle" + j];
        addElement("Subtitle " + j, ch["subtitle" + j]);

        copyindex = ["ch.copy" + j];
        addElement("Copy " + j, ch["copy" + j]);

        imagenameindex = ["ch.imagename" + j];
        addElement("Image Name " + j, ch["imagename" + j]);

        addElement("~~~~~ ", "~~~~~");
    }
    ch_callback();
};
function ch_callback() {// Use ch.title1, ch.title1, ch.title1, ch.title1, ch.title1... in your add addElement function or in the Leaflet.js L.control.window method
    console.log("callback " + ch.copy1);
}
function addElement(indexnumber, rowname) {
    // create a new div element
    var newDiv = document.createElement("div");
    // and give it some content
    var newContent = document.createTextNode(
        "Name of key:  " + indexnumber + " value: " + rowname
    );
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    // add the newly created element and its content into the DOM
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
}

r(function() {
    console.log("DOM Ready!");
    init();
});
//checks to see if the document is ready//                               
function r(f) { /in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f();
}
