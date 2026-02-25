$(document).ready(function () {

    init();

});


function init() {
    laadOverzicht();
    laadDetail();
    initForm();
}


function laadOverzicht() {

    if (!$("#blog-overzicht").length) return;

    $.ajax({
        url: "blog-data.html",
        method: "GET",
        success: function (data) {

            let artikelen = $(data).find(".blog-item").slice(0, 3);

            $("#blog-overzicht").html(artikelen.hide());

            artikelen.fadeIn(1000);

            voegKlikEventToe();
        }
    });
}


function laadDetail() {

    if (!$("#blog-detail").length) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    $.ajax({
        url: "blog-data.html",
        method: "GET",
        success: function (data) {

            let artikel = $(data).find(".blog-item[data-id='" + id + "']");

            $("#blog-detail").html(artikel.hide().slideDown(800));
        }
    });
}


function voegKlikEventToe() {

    $(".blog-item").click(function () {
        let id = $(this).data("id");
        window.location.href = "blog-detail.html?id=" + id;
    });
}


function initForm() {

    if (!$("#blogForm").length) return;

    $("#datum").datepicker();

    $("#blogForm").submit(function (e) {

        e.preventDefault();

        let titel = $("#titel").val();
        let datum = $("#datum").val();
        let inhoud = $("#inhoud").val();

        if (titel === "" || datum === "" || inhoud === "") {

            $("#melding")
                .text("Alle velden zijn verplicht!")
                .css("color", "red")
                .fadeIn();

            return;
        }

        $("#melding")
            .text("Artikel zou nu toegevoegd worden (simulatie).")
            .css("color", "green")
            .fadeIn();
    });
}