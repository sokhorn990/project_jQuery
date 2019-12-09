

//get data
function getDefaultRecipe() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => defaultRecipe(data),
        error: () => getError(),
    });
}
function updateRecipe() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getRecipe(data),
        error: () => getError(),
    });
}
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}



function getError() { console.log("Error") }
function getRecipe(cake) {
    var result = "";
    cake.recipes.forEach(recipe => {
        if (recipe.id == $('#select').val()) {
            result += `
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3">
                <h3>${recipe.name}</h3>
            </div>
            <div class="col-6">
                <img src="${recipe.iconUrl}" class="img-fluid" width="270px" alt="">
            </div>
           
        </div>
        `;
            updateIngredient(recipe.ingredients);
        }
    });
    printOut("recipe", result);
}

var member;
$(document).ready(function () {
    $('#select').on('change', function () {
        getDefaultRecipe();
        $("#input").fadeIn(100);

        $("#decrease").on('click', function () {
            var number_person = $('#person').val();
            if (number_person > 1) {
                updateRecipe();
                member = parseInt(number_person) - 1;
            }
            descrease();
        })
        $("#increase").on("click", function () {
            var number_person = $('#person').val();
            if (number_person < 15) {
                updateRecipe();
                member = parseInt(number_person) + 1;
            }
            increase();
        });
    })
});
//end increase and decrease



function defaultRecipe(cake) {
    var result = "";
    cake.recipes.forEach(recipe => {
        if (recipe.id == $('#select').val()) {
            defaultIngredient(recipe.ingredients);
            result += `
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3">
                <h3>${recipe.name}</h3>
            </div>
            <div class="col-6">
                <img src="${recipe.iconUrl}" class="img-fluid" width="270px" alt="">
            </div>
           
        </div>
        `;
        }
    });
    printOut("recipe", result);
}
function defaultIngredient(ing) {
    result = "";
    ing.forEach(item => {
        result += `
        <div class="row">
        <div class="col-md-2">
        <img src="${item.iconUrl}" width="50px"><br><br><br>
        </div>
        <div class="col-md-2">
            ${item.quantity}
            ${item.unit.slice(0, 1).toUpperCase()}
            </div>
            <div class="col-md-2">
            ${item.name}
            </div>
            <div class="border-left d-sm-none d-md-block" style="width: 0px;"></div>
            <div class="col-md-6" style="margin-left: -1px;">
            <hr class="d-sm-block d-md-none">
            </div>
            </div>
        `;
    });
    printOut('ingredient', result);
}
function updateIngredient(ing) {
    result = "";
    ing.forEach(item => {
        result += `
        <div class="row">
        <div class="col-md-2">
        <img src="${item.iconUrl}" width="50px"><br><br><br>
        </div>
        <div class="col-md-2">
            ${item.quantity * addMember(member)}
            ${item.unit.slice(0, 1).toUpperCase()}
            </div>
            <div class="col-md-2">
            ${item.name}
            </div>
            <div class="border-left d-sm-none d-md-block" style="width:0 px;"></div>
            <div class="col-md-6" style="margin-left: -1px;">
            <hr class="d-sm-block d-md-none">
            
            </div>
            </div>
        `;
    });
    printOut('ingredient', result);
}

function printOut(elmentId, out) {
    $('#' + elmentId).html(out);
}
function increase() {
    var value = $("#person").val();
    var inputValue = parseInt(value) + 1;
    if (inputValue <= 15) {
        $("#person").val(inputValue);
    }
}
function descrease() {
    var value = $("#person").val();
    var inputValue = parseInt(value) - 1;
    if (inputValue >= 1) {
        $("#person").val(inputValue);
    }
}
function addMember(member) {
    return parseInt(member);
}