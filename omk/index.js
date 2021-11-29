// var resource_templates_url = "http://localhost:8888/omeka-s/api/resource_templates";
var resource_templates_url = "./data/resource_templates.json";
// var items_url = "http://localhost:8888/omeka-s/api/items";
var items_url = "./data/items.json";


// function getInfo(info) {
//     console.log(info);
// }

function getDetails(label) {
    console.log('LABEL', label);
    var items_json = d3.json(items_url, () => {
    }).then((data) => {
        data.forEach(r => {
            // console.log(r['o:resource_template']['@id']);
            if(label == r['o:resource_template']['@id']) {
                // if(label['o:label'] == 'Film') {
                    console.log(r);
                    var container_actor = document.getElementById("actorContainer");
                    var container_film = document.getElementById("filmContainer");

                    if(r['mov:hasAge']) {
                        container_film.innerHTML = "<div id='filmContainer'></div>"
                        container_actor.innerHTML += "<div>"
                        + "<p>" + r['o:title'] + "</p>"
                        + "<small><b>Nom</b> : " + r['mov:hasLastname'][0]['@value'] + "</small><br>"
                        + "<small><b>Prénom</b> : " + r['mov:hasFirstname'][0]['@value'] + "</small><br>"
                        + "<small><b>Age</b> : " + r['mov:hasAge'][0]['@value'] + "</small><br>"
                        + "<a href='" + r['foaf:depiction'][0]['@id'] +"'>Photo</a>"
                        + "</div>";

                    }

                    if(r['mov:hasActors']) {
                        container_actor.innerHTML = "<div id='actorContainer'></div>"
                        container_film.innerHTML += "<div>"
                        // + "<p id='filmTitle' onclick='getInfo(" + JSON.stringify(r) + ")'>" + r['o:title'] + "</p>"
                        + "<p id='filmTitle'>" + r['o:title'] + "</p>"
                        + "<small><b>Acteurs principales</b> : " + r['mov:hasActors'][0]['@value'] + "</small><br>"
                        + "<small><b>Durée</b> : " + r['mov:hasDuration'][0]['@value'] + "</small><br>"
                        + "<small><b>Genre</b> : " + r['mov:hasGenre'][0]['@value'] + "</small><br>"
                        + "<small><b>Produit par</b> : " + r['mov:hasProducer'][0]['@value'] + "</small><br>"
                        + "<small><b>Synopsis</b> : " + r['mov:hasSynopsis'][0]['@value'] + "</small><br>"
                        + "<a href="+r['mov:hasTrailer'][0]['@id']+">Lien Youtube Trailer</a><br>"
                        + "</div>";
                    }
                // }
            }
        })
    })
    
}

var rt_json = d3.json(resource_templates_url, () => {
}).then((data) => {
    data.forEach(r => {
        console.log(r);
        var container_row = document.getElementById("rows");
        container_row.innerHTML += `<div id='resource'>`
        + `<p id='` + r['o:label'] + `' onclick='getDetails(` + JSON.stringify(r['@id']) + `)'> ` + r['o:label'] + `</p>`
        + `</div>`;
    })
})


