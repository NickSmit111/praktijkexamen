$(document).ready(function () {
    init();
});

function init() {
    laadOverzicht();
    laadDetail();
    initForm();
}

function laadOverzicht() {
    const overzichtContainer = $("#blog-overzicht");
    if (!overzichtContainer.length) return;

    $.ajax({
        url: "blog-data.html",
        method: "GET",
        success: function (data) {
            const tempContainer = $("<div></div>").html(data);
            const artikelen = tempContainer.find(".blog-item").slice(0, 3);

            overzichtContainer.empty();

            artikelen.each(function (index) {
                const artikel = $(this);

                const inhoudElement = artikel.find(".inhoud");
                const volledigeTekst = inhoudElement.text();

                if (volledigeTekst.length > 100) {
                    const verkorteTekst = volledigeTekst.substring(0, 100) + "...";
                    inhoudElement.text(verkorteTekst);
                }

                artikel.attr("title", "Klik hier om naar het artikel te gaan");

                artikel.hide();
                overzichtContainer.append(artikel);
                artikel.delay(index * 200).fadeIn(800);
            });

            voegKlikEventToe();
        },
        error: function () {
            overzichtContainer.text("Kon blog-items niet laden.");
        }
    });
}

function laadDetail() {
    const detailContainer = $("#blog-detail");
    if (!detailContainer.length) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    $.ajax({
        url: "blog-data.html",
        method: "GET",
        success: function (data) {

            const tempContainer = $("<div></div>").html(data);

            const artikel = tempContainer.find(".blog-item").filter(function () {
                return $(this).data("id") == id;
            });

            if (artikel.length) {
                detailContainer.empty().append(artikel);
            } else {
                detailContainer.text("Artikel niet gevonden.");
            }
        },
        error: function () {
            detailContainer.text("Kon blog-items niet laden.");
        }
    });
}

function voegKlikEventToe() {
    $(".blog-item").off("click").on("click", function () {
        const id = $(this).data("id");
        window.location.href = "blog-detail.html?id=" + id;
    });
}

function initForm() {
    const form = $("#blogForm");
    if (!form.length) return;

    $("#datum").datepicker();

    $("#titel").attr("title", "Typ hier de titel van het blogartikel");
    $("#datum").attr("title", "Selecteer een datum");
    $("#inhoud").attr("title", "Schrijf hier de inhoud van het artikel");

    $(document).tooltip({
        items: "#titel, #datum, #inhoud, .terug",
        content: function () {
            return $(this).attr("title");
        },
        show: { effect: "fadeIn", duration: 200 },
        hide: { effect: "fadeOut", duration: 200 },
        track: true
    });

    form.submit(function (e) {
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