// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function getBlog() {
    let list = document.getElementById("entry-list");
    list.innerHTML = "";
    jQuery.get(`${_baseUrl}:3000/api/car`, function(data) {
        data.data.forEach((entry) => {
            var newElement = document.createElement("li");
            let edit = `<a href='#' data-entryid='${entry.id}' data-entry='${entry.entry}' data-entrysigniture='${entry.signiture}' onclick='editCar(event)'>edit</a>`;
            let del = `<a href='#' data-entryid='${entry.id}' onclick='delEntry(event)'>delete</a>`;
            newElement.innerHTML = `${entry.id} Signiture: ${entry.entry} Signiture: ${entry.signiture} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function addEntry(e) {
    e.preventDefault();
    let entry = $("#entry");
    let signiture = $("#signiture");
    let entryid = $("#entryid");

    let entryVal = entry.val();
    let signitureVal = signiture.val();

    if(makeVal == "" || modelVal == "") {
        alert('Make and Model cannot be blank');
        return;
    }

    if (+entryid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/car`, { entry: entryVal, signiture: signitureVal}, function(data) {
            getBlog();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/car/${carid.val()}`,
                data: { entry: entry.val(), signiture: signiture.val()}
            })
            .done(function(msg) {
                getBlog();
            });
    }

    entryid.val(0);
    $("#entry-submit").val('Add Entry');
    entry.val("");
    signiture.val("");
}

function editEntry(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let entry = $("#entry");
    let signiture = $("#signiture");
    let id = $("#entryid");


    let entryVal = el.data("carmake");
    let modelVal = el.data("carmodel");
    let idVal = el.data("carid");

    $("#entry-submit").val(`Edit Entry #${idVal}`);
    entry.val(entryVal);
    signiture.val(signitureVal);
    id.val(idVal);
}

function delEntry(e) {
    e.preventDefault();

    let el = $(e.srcElement);
    let entryid = el.data("entryid");
    if(confirm(`Are you sure you want to delete this entry #${entryid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/car/${carid}`
            })
            .done(function(msg) {
                getBlog();
            });
    }
}


// run getCars on
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getBlog();
    $("#add-entry").on('submit', addEntry);

});
