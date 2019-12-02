$(document).ready(function(){
    url ="https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({
        dataType:'json',
        url:url,
        success:function(data){
            result ="";
            data.recipes.forEach(element => {
             result+=`
             <div class="text-center">
                <h2> ${element.name}</h2>
                <img src="${element.iconUrl}" width="100px" height="90px" alt="" class="text-center">
             </div>
             `;
            });
            $('body').append(result);
        }
    })
})