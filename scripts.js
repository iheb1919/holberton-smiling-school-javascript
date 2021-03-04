$(document).ready(function(){
    $('.loader').hide();
    
       /*******              ***************      quotes    *********************      *************** */
     $.ajax({
        url:'https://smileschool-api.hbtn.info/quotes',
        method : 'GET',
        dataType:'json'
        ,
        beforeSend: function() {
            $('#quotes-loader').show();
        },
        success: function (res) {
        
             let data = res;
            for (let i = 0; i < data.length; i++) {
                
                
                let $html = (`<div class="carousel-item carousel-item-content ${i === 0 ? 'active' : ''}">
                                    <div class="row">
                                    <div class="col-sm-3 text-center">
                                        <img class="rounded-circle" src="${data[i].pic_url}" class="d-block w-100" alt="random person image">
                                    </div>
                                    <div class="col-sm-8 ml-3 d-flex flex-column">
                                        <div>&lt;&lt;   ${data[i].text} </div>
                                        <div class="font-weight-bold mt-3">${data[i].name}</div>
                                        <div>weather presenter</div>
                                    </div>
                                </div>
                                </div> `
                                );
            $("#1carousel-inner").append($html);
              }  
             
              
        }
       
    }); 
      /*******              ***************      tutorials    *********************      *************** */
      $.ajax({
        url:'https://smileschool-api.hbtn.info/popular-tutorials',
        method : 'GET',
        dataType:'json',
        success: function (res) {
            
             let data = res;
            for (let i = 0; i < data.length; i++) {
                let $html = (`<div class="text-center col-12 col-sm-6 col-md-3">
                <div class="carousel-item active">
                    <img class="w-100" src="${data[i].thumb_url}" alt="smile image">
                    <div class="mx-3">
                        <div class="font-weight-bold text-dark text-left mt-3">
                        ${data[i].title}
                        </div>
                        <div class="text-secondary text-left mt-3 mb-3">
                        ${data[i]['sub-title']}
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img src="./images/profile_4.jpg" class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                            <div class="purple-text font-weight-bold">${data[i].author}</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex pt-1" id="star">   
                            `
            );
            for (let index = 0; index < data[i].star; index++) {
                 $html +=  '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="star icon filled in purple">'
                   
            }
          
            for (let index2 = 0; index2 < 5- data[i].star ; index2++) {
                $html += '<img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">'   
            }
            $html += `</div>
                    <div class="purple-text font-weight-bold">
                    ${data[i].duration}
                    </div>
                </div>
                    </div>
                    </div>
                    </div> `
                
            $("#tutos").append($html);
              }  
             
              
        },
        beforeSend: function() {
            $('#tutorials-loader').show();
        }
       
    });
    /*******              ***************      videos    *********************      ***************/
    $.ajax({
        url:'https://smileschool-api.hbtn.info/latest-videos',
        method : 'GET',
        dataType:'json',
        success: function (res) {
            
             let data = res;
            for (let i = 0; i < data.length; i++) {
                let $html = (`<div class="text-center col-12 col-sm-6 col-md-3">
                <div class="carousel-item active">
                    <img class="w-100" src="${data[i].thumb_url}">
                    <div class="mx-3">
                        <div class="font-weight-bold text-dark text-left mt-3">
                        ${data[i].title}
                        </div>
                        <div class="text-secondary text-left mt-3 mb-3">
                        ${data[i]['sub-title']}
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img src="${data[i]['author_pic_url']}" class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                            <div class="purple-text font-weight-bold">Phillip massey</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex pt-1">  
                            `
            );
            for (let index = 0; index < data[i].star; index++) {
                 $html +=  '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="star icon filled in purple">'
                   
            }
          
            for (let index2 = 0; index2 < 5- data[i].star ; index2++) {
                $html += ' <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">'   
            }
            $html += `</div>
                    <div class="purple-text font-weight-bold">
                    ${data[i].duration}
                    </div>
                </div>
            </div>
        </div>
    </div> `
                
            $("#videos").append($html);
              }  
             
              
        },
        beforeSend: function() {
            $('#videos-loader').show();
           
        }
       
    });
    $('#loadercourses').hide();
    let $q = $('.user_search').val();
    let $topic= "all"
    let $sort = "most_popular"
    
    function start () {
        $.ajax({
            url:'https://smileschool-api.hbtn.info/courses',
            method : 'GET',
            dataType:'json',
            data : {
                q: $q,
                topic: $topic,
                sort: $sort
            },
            beforeSend: function() {
                $('#loadercourses').show();
                console.log('shooow');
            },
            success: function (res) {
                console.log(res);
                let data = res;
                /*********************SEARCH SECTION******************** */
                for (let i = 0; i < data.topics.length; i++) {
                    let name = data.topics[i][0].toUpperCase() + data.topics[i].substring(1);
                    let $btntopic = $(` <button class="dropdown-item" type="button" data-value="${data.topics[i]}">${name}</button> ` );
                    $("#topic").append($btntopic); 
                    $btntopic.click(function(event) {
                        $topic = event.target.getAttribute("data-value");
                        $('#dropdownMenu2').text(event.target.textContent);
                        $btntopicvalue = event.target.getAttribute("data-value");
                      
                        getvideos($q,$topic,$sort);
                    }) ;
                } 
                
                for (let i = 0; i < data.sorts.length; i++) {
                    let sortName = data.sorts[i][0].toUpperCase() + data.sorts[i].substr(1,3) + ' ' + data.sorts[i].substr(5, 1).toUpperCase() + data.sorts[i].substr(6);
                    let $btnsort = $(` <button class="dropdown-item" type="button" data-value="${data.sorts[i]}">${sortName}</button>` );
                    $("#sort").append($btnsort);
                    $btnsort.click(function(event) {
                        sort = event.target.getAttribute("data-value");
                        $('#dropdownMenu3').text(event.target.textContent);
                        $btnsortvalue = event.target.getAttribute("data-value");
                       
                        getvideos($q,$topic,$sort);
                    }) ;
                }  
               
    
                /*********************RESULTS SECTION******************** */
                
              $("#user_search").on("change", function(e){
                    $q = e.target.value;
                    getvideos($q,$topic,$sort);
                });
                
            } /* success end*/ 
        
        }); 
        getvideos($q,$topic,$sort);
    }
        
   
    start();
    /***** sort function */
    function getvideos($q,$topic,$sort) {
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/courses',
            type: 'GET',
            dataType: 'json',
            data: {
                
                q: $q,
                topic: $topic,
                sort: $sort
            },
            beforeSend: function() {
                $('#loadercourses').show();
                console.log('shooow2');
            },
            success: function(response){
                
                let data = response;
                if (data.courses.length == 1) {
                    $('#videosnum').text('1 video');
                } else {
                    $('#videosnum').text(`${response.courses.length} videos`);
                }
                $('#loadercourses').hide();
                $('#vidadd').empty();
                for (let j = 0; j < data.courses.length;j++ ) {
                   
                    let $html = `
                    <div class="text-center col-12 col-sm-4 col-md-3 mb-5" >
                    <div class="carousel-item active">
                    <img class="w-100" src="${data.courses[j]['thumb_url']}">
                    <div class="mx-3">
                        <div class="font-weight-bold text-dark text-left mt-3">
                        ${data.courses[j].title}
                        </div>
                        <div class="text-secondary text-left mt-3 mb-3">
                        ${data.courses[j]['sub-title']}
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img src="${data.courses[j]['author_pic_url']}" class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                            <div class="purple-text font-weight-bold">${data.courses[j].author}</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex pt-1">`
                            for (let index = 0; index < data.courses[j].star; index++) {
                                $html +=  '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="star icon filled in purple">'
                                
                        }
                        for (let index2 = 0; index2 < 5- data.courses[j].star ; index2++) {
                            $html += ' <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">'   
                        }
                        $html+=  `</div>
                            <div class="purple-text font-weight-bold">
                            ${data.courses[j].duration}
                            </div>
                        </div>
                    </div>
                </div>
                </div>`
                $('#vidadd').append($html);
                }
            }
        });
    }
    
    
    });
    /*  */