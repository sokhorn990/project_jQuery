function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    requestApi();
    $("#recipe").on('change', function () {
        var id = $("#recipe").val();
        recipe(id);
        $('#h2').hide();
    })
})
function requestApi() {
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Error"),
    })
}
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(item => {
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $("#recipe").append(option);
}

//  get old guest
var getQuanlities = [];
var oldGuest = 0;

function recipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            eachRrecipe(item.name, item.iconUrl,item.nbGuests);
            eachIngredient(item.ingredients);
            eachInstruction(item.instructions);
            
            getQuanlities = item.ingredients;
            oldGuest = item.nbGuests;
        }
    });
}

function eachRrecipe(name, img,nbGuests) {
    var result = "";
    result += `
    <div class="row">
    <div class="col-6">
        <h3>${name}</h3>
    </div>
    <div class="col-6">
        <img src="${img}" class="img-fluid" width="270px" alt="">
    </div>

    <form action="#">
        <div class="row"> 
        <div class="input-group mb-3">
        <p class="mt-5">Number of person</p>
            <div class="input-group-prepend" style="margin-left: 150px; margin-top: -35px;">
                    <button class="btn btn-primary" id="decrease" type="button">-</button>
                    <input type="text" id="person" style="width:115px" class="text-center" value="${nbGuests}" disabled>
                <div class="input-group-append">
                    <button class="btn btn-success" id="increase" type="button">+</button>
                </div>
            </div>
        </div>
    </form>
    
    </div>
    <div class="row">
        <h3  style="margin-left: -230px;">Ingredients</h3>
        <h3  style="margin-left: 460px;">instructions</h3>
    </div>
    `;
    $("#recipe_result").html(result);
}
//loop for get each ingredient
function eachIngredient(ingredients) {
    var result_ingradient = "";
    ingredients.forEach(el => {
        result_ingradient += ` 
        <div class="row">
        <div class="col-md-2">
             <img src="${el.iconUrl}" width="40px"><br><br>
        </div>
        <div class="col-md-2">
            ${el.quantity} 
            ${el.unit[0]}
        </div>
        <div class="col-md-2">
         ${el.name}
        </div>
    </div>
    <div class="border-left d-sm-none d-md-block" style="width: 0px;"></div>
      `;
    });
    $("#result_ingradient").html(result_ingradient);
    
    $("#decrease").on('click', function () {
        var value = parseInt($('#person').val());
        descrease(value);
    })
    $("#increase").on("click", function () {
        var value = parseInt($('#person').val());
        increase(value);
    });
    
}

//get Instruction of recipe
function eachInstruction(instructions) {
    var instruction = "";
    var steb = instructions.split("<step>");
    for (let i = 1; i < steb.length; i++) {
        instruction += `
      <h4 class="text-primary"> step ${i}</h4>
  ${steb[i]}
        `;
    }
    $('#instruction').html(instruction);
}

//increase of number person
function increase(number) {
   var add = parseInt(number) + 1;
    if (add <= 15) {
        $("#person").val(add);
        getPerson($("#person").val());
    }
}   
 //decrease of number person
function descrease(number) {
  var  value_person = parseInt(number) - 1;
    if (value_person >= 1) {
        $("#person").val(value_person);
        getPerson($("#person").val());
    }
}

$(document).ready(function () {
    $("#recipe").on('change', function () {
        var id = $("#recipe").val();
        recipe(id);
    })
});

//update ingredient 
function getPerson(person) {
    var result = "";
    var quantities;
    var newQuanlity;
    getQuanlities.forEach(element => {
        const { quantity, iconUrl, name, unit } = element;
        quantities = quantity / oldGuest;
        newQuanlity = quantities * person;
        result += `
        <div class="row">
        <div class="col-md-2">
             <img src="${iconUrl}" width="40px"><br><br>
        </div>
        <div class="col-md-2">
            ${newQuanlity} 
            ${unit[0]}
        </div>
        <div class="col-md-2">
         ${name}
        </div>
    </div>
    <div class="border-left d-sm-none d-md-block" style="width: 0px;"></div>
      `;
    });
     $("#result_ingradient").html(result);
}