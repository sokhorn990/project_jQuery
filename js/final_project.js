var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready(() => {
    $('#getData').on('change', () => {
        var recipes = $('#getData').val();
        chooseRecipe(recipes);
    });
});
// get api [arrow function]
var getAPI = (api) => {
    $.ajax({
        dataType: 'json',
        url: api,
        success: (data) => getRecipes(data),
        error: () => console.error("Cannot request data")
    });
}
// get all recipe [name function]
function getRecipes(datas) {
    datas.recipes.forEach(recs => {
        // your recipe can get here example: recs.name
        getIngrediant(recs); // get all ingrediant
    });
}

// get all ingrediant [name function]
function getIngrediant(recipe) {
    recipe.ingredients.forEach(cake => {
        showIngrediantTable(cake);
    });
}

// display ingrediant in table [arrow function]
var showIngrediantTable = (show) => {
    var ingrediant = "";
    ingrediant += `
    <tr>
        <td><img src="${show.iconUrl}" width="25" class="img-fluid"></td>
        <td>${show.quantity}</td>
        <td>${show.unit[0]}</td>
        <td>${show.name}</td>
    </tr>
    `;
    $('#result').append(ingrediant);
}
// choose recipe from select [arrow function]
var chooseRecipe = (myRecipe) => {
    var onlyNumber = parseInt(myRecipe);
    switch (onlyNumber) {
        case 0:
            getAPI(url);
            hideAlert();
            break;
        case 1:
            // your code idea...
            choose1();
            break;
        case 2:
            // your code idea...
            choose2();
            break;
        default: console.warn("You choose nothing");
    }
}
// Demo test click [arrow function] this just the option function I test only
// var choose1 = () => {
//     var show = "";
//     show += `
//         <div class="alert alert-success">
//             <strong>Good luck! </strong> try your best!
//         </div>
//     `;
//     $('#result').html(show);
// }
// var choose2 = () => {
//     var show = "";
//     show += `
//         // <div class="alert alert-warning">
//         //     <strong>Good luck! </strong> try your best!
//         // </div>
//     `;
//     $('#result').html(show);
// }
// var hideAlert = () => {
//     $('.alert').hide();
// }