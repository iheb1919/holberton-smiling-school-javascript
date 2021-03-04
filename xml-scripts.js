$(document).ready(function(){
    $('.loader').hide();
    
       /*******              ***************      quotes    *********************      *************** */
     $.ajax({
        url:'https://smileschool-api.hbtn.info/xml/quotes',
        method : 'GET',
        dataType:'xml'
        ,
        beforeSend: function() {
            $('#quotes-loader').show();
        },
        success: function (xml) {
            $('#quotes-loader').hide();
            $.each($(xml).find('quote'), function(i){
                
                
                let $html = (`<div class="carousel-item carousel-item-content ${i === 0 ? 'active' : ''}">
                                    <div class="row">
                                    <div class="col-sm-3 text-center">
                                        <img class="rounded-circle" src="${$(this).find('pic_url').text()}" class="d-block w-100" alt="random person image">
                                    </div>
                                    <div class="col-sm-8 ml-3 d-flex flex-column">
                                        <div>&lt;&lt;  ${$(this).find('text').text()} </div>
                                        <div class="font-weight-bold mt-3">${$(this).find('name').text()}</div>
                                        <div>${$(this).find('title').text()}</div>
                                    </div>
                                </div>
                                </div> `
                                );
            $("#1carousel-inner").append($html);
            })  
            },
            error: function() {
                console.log(`An error occured`);
            }
             
              
        
       
    }); 
      /*******              ***************      tutorials    *********************      *************** */
      $.ajax({
        url:'https://smileschool-api.hbtn.info/xml/popular-tutorials',
        method : 'GET',
        dataType:'xml',
        success: function (xml) {
            
            $('#tutorials-loader').hide();
             $.each($(xml).find('video'), function(i) {
                let $html = (`<div class="text-center col-12 col-sm-6 col-md-3">
                <div class="carousel-item active">
                    <img class="w-100" src="${$(this).find('thumb_url').text()}" alt="smile image">
                    <div class="mx-3">
                        <div class="font-weight-bold text-dark text-left mt-3">
                        ${$(this).find('title').text()}
                        </div>
                        <div class="text-secondary text-left mt-3 mb-3">
                        ${$(this).find('sub-title').text()}
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img src="${$(this).find('author_pic_url').text()}" class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                            <div class="purple-text font-weight-bold">${$(this).find('author').text()}</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex pt-1" id="star">   
                            `
            );
            for (let index = 0; index < $(this).attr('star'); index++) {
                 $html +=  '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="star icon filled in purple">'
                   
            }
          
            for (let index2 = 0; index2 < 5- $(this).attr('star') ; index2++) {
                $html += '<img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">'   
            }
            $html += `</div>
                    <div class="purple-text font-weight-bold">
                    ${$(this).find('duration').text()}
                    </div>
                </div>
                    </div>
                    </div>
                    </div> `
                
            $("#tutos").append($html);
      })  
             
              
        },
        beforeSend: function() {
            $('#tutorials-loader').show();
        },
        error: function() {
            console.log(`An error occured`);
        }
       
    });
    /*******              ***************      videos    *********************      ***************/
    $.ajax({
        url:'https://smileschool-api.hbtn.info/xml/latest-videos',
        method : 'GET',
        dataType:'xml',
        success: function (xml) {
            $('#videos-loader').hide();
             
            $.each($(xml).find('video'), function(i) {
                let $html = (`<div class="text-center col-12 col-sm-6 col-md-3">
                <div class="carousel-item active">
                    <img class="w-100" src="${$(this).find('thumb_url').text()}">
                    <div class="mx-3">
                        <div class="font-weight-bold text-dark text-left mt-3">
                        ${$(this).find('title').text()}
                        </div>
                        <div class="text-secondary text-left mt-3 mb-3">
                        ${$(this).find('sub-title').text()}
                        </div>
                        <div class="d-flex align-items-center mb-3">
                        <img src=${$(this).find('author_pic_url').text()} class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                        <div class="purple-text font-weight-bold">${$(this).find('author').text()}</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex pt-1">  
                            `
            );
            for (let index = 0; index < $(this).attr('star'); index++) {
                 $html +=  '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="star icon filled in purple">'
                   
            }
          
            for (let index2 = 0; index2 < 5- $(this).attr('star') ; index2++) {
                $html += ' <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">'   
            }
            $html += `</div>
                    <div class="purple-text font-weight-bold">
                    ${$(this).find('duration').text()}
                    </div>
                </div>
            </div>
        </div>
    </div> `
                
            $("#videos").append($html);
              })  
             
              
        },
        beforeSend: function() {
            $('#videos-loader').show();
           
        },
        error: function() {
            console.log(`An error occured`);
        }
       
    });
    $('#loadercourses').hide();
    let $q = $('.user_search').val();
    let $topic= "all"
    let $sort = "most_popular"
    
    function start () {
        $.ajax({
            url:'https://smileschool-api.hbtn.info/xml/courses',
            method : 'GET',
            dataType:'xml',
            data : {
                q: $q,
                topic: $topic,
                sort: $sort
            },
            beforeSend: function() {
                $('#loadercourses').show();
                console.log('shooow');
            },
            success: function (xml) {
                
                /*********************SEARCH SECTION******************** */
                $.each($(xml).find('topics').find('topic'), function(){
                    let name = $(this).text()[0].toUpperCase() + $(this).text().substring(1);
                    let $btntopic = $(` <button class="dropdown-item" type="button" data-value="${$(this).text()}">${name}</button> ` );
                    $("#topic").append($btntopic); 
                    $btntopic.click(function(event) {
                        $topic = event.target.getAttribute("data-value");
                        $('#dropdownMenu2').text(event.target.textContent);
                        $btntopicvalue = event.target.getAttribute("data-value");
                      
                        getvideos($q,$topic,$sort);
                    }) ;
                });
                
                $.each($(xml).find('sorts').find('sort'), function() {
                    let sortName = $(this).text()[0].toUpperCase() + $(this).text().substr(1,3) + ' ' + $(this).text().substr(5, 1).toUpperCase() + $(this).text().substr(6);
                    let $btnsort = $(` <button class="dropdown-item" type="button" data-value="${$(this).text()}">${sortName}</button>` );
                    $("#sort").append($btnsort);
                    $btnsort.click(function(event) {
                        sort = event.target.getAttribute("data-value");
                        $('#dropdownMenu3').text(event.target.textContent);
                        $btnsortvalue = event.target.getAttribute("data-value");
                       
                        getvideos($q,$topic,$sort);
                    }) ;
                });  
               
    
                /*********************RESULTS SECTION******************** */
                
              $("#user_search").on("change", function(e){
                    $q = e.target.value;
                    getvideos($q,$topic,$sort);
                });
                
            } ,
            error: function() {
                console.log(`An error occured`);
            } /* success end*/ 
        
        }); 
        getvideos($q,$topic,$sort);
    }
        
   
    start();
    /***** sort function */
    function getvideos($q,$topic,$sort) {
        $.ajax({
            url: 'https://smileschool-api.hbtn.info/xml/courses',
            type: 'GET',
            dataType: 'xml',
            data: {
                
                q: $q,
                topic: $topic,
                sort: $sort
            },
            beforeSend: function() {
                $('#loadercourses').show();
                console.log('shooow2');
            },
            success: function(xml){
                
                let sum = $(xml).find('courses').find('course').length;
                if ( sum == 1) {
                    $('#videosnum').text('1 video');
                } else {
                    $('#videosnum').text(` ${sum} videos`);
                }
                $('#loadercourses').hide();
                $('#vidadd').empty();
                $.each($(xml).find('courses').find('course'), function(i, el) {
                   
                    let $html = `
                    <div class="text-center col-12 col-sm-4 col-md-3 mb-5" >
                    <div class="carousel-item active">
                    <img class="w-100" src="${$(this).find('thumb_url').text()}">
                    <div class="mx-3">
                        <div class="font-weight-bold text-dark text-left mt-3">
                        ${$(this).find('title').text()}
                        </div>
                        <div class="text-secondary text-left mt-3 mb-3">
                        ${$(this).find('sub-title').text()}
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img src="${$(this).find('author_pic_url').text()} " class="rounded-circle mr-3 video-carousel-img-profile" alt="profile image">
                            <div class="purple-text font-weight-bold">${$(this).find('author').text()}</div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex pt-1">`
                            for (let index = 0; index <  $(this).attr('star'); index++) {
                                $html +=  '<img src="./images/star_on.png" class="mr-1 carousel-star-icon" alt="star icon filled in purple">'
                                
                        }
                        for (let index2 = 0; index2 < 5-  $(this).attr('star'); index2++) {
                            $html += ' <img src="./images/star_off.png" class="carousel-star-icon" alt="star icon filled in grey">'   
                        }
                        $html+=  `</div>
                            <div class="purple-text font-weight-bold">
                            ${$(this).find('duration').text()}
                            </div>
                        </div>
                    </div>
                </div>
                </div>`
                $('#vidadd').append($html);
                });
            },
            error: function() {
                console.log(`An error occured`);
            }
        });
    }
    
    
    });
    /*  */