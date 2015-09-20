//$(document).ready(function(){
                var names=["Utkarsh", "Luv", "Pawan", "Bhanu","Bhanuj","Nikhil","Shashank","Abhishek","Renu","Divya","Rishabh","Surbhi","Utkarsh","Varun","Chhavi","Kaushik"];
              var coloured_images=["./images/1d.jpg","./images/2d.jpg","./images/3d.jpg","./images/4d.jpg","./images/1d.jpg","./images/2d.jpg","./images/3d.jpg","./images/4d.jpg","./images/2d.jpg","./images/1d.jpg","./images/2d.jpg","./images/3d.jpg","./images/4d.jpg","./images/1d.jpg","./images/3d.jpg","./images/2d.jpg"];
                var images=["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/2.jpg","./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/1.jpg","./images/3.jpg","./images/2.jpg"];
                var description=["Utkarsh Kumar", "Luv Karakoti", "Pawan Kumar", "Bhanu Aggarwal","Bhanuj Verma","Nikhil Singla","Shashank Lakshmi Prasad","Abhishek Goswami","Renu","Divya Mamagai","Rishabh","Surbhi","Utkarsh","Varun Kumar","Chhavi Aggarwal","Kaushik"];
                var no_of_members=names.length;
                var left=3;
                var top=20;
                var width=10;
                var height=30;
                var margin=1;
              var card_array=[];
                var card_array1=[];
              var card_array2=[];
                var zIndex=2;
                var positioning_of_cards=0;
                var tween_slide_slider;
                var tween_rotate_image;
              var tween_hide_name;
                var image_clicked=false;
              var id_of_image_clicked;

                var members_index;
                var txtContainer = $("#txtContainer");
                var tl,txt;
                function create_cards(){
                    for(var i=0;i<no_of_members;i++){
                        var card=document.createElement("div");
                        card.className="cards";
                        card.id="card"+(i+1);

                        var name_div=document.createElement("div");
                        name_div.className="name";
                     
                        var name=document.createElement("p");
                        var name_text=document.createTextNode(names[i]);
                        name.appendChild(name_text);
                        name_div.appendChild(name);

                        var image_div=document.createElement("div");
                        image_div.className="image";
           
                        var image=document.createElement("img");
                        image.src=images[i];
                        image_div.appendChild(image);


                        if(i==8){
                            top=top+height+4*margin;
                        }
                        card.style.cssText="top:"+top+"%;left:"+left+"%;";
                        left=left+width+2*margin;
                        if(i==7)
                            left=3;

                        $("#meet_the_gawds").append(card);
                        card=$("#card"+(i+1));
                        
                        card.append(image_div);
                    card.append(name_div);
                        
                    }
                }
                function create_card_array(){
                    for(i=0;i<no_of_members;i++){
                          var id=$("#card"+(i+1));
                    card_array.push(id);
                    if(i<8){
                        card_array1.push(id);
                    }
                    else{
                        card_array2.push(id);
                    }
                          
                    }
                }
                function positioning_of_cards_completed(){
                    positioning_of_cards++;
                    //console.log(positioning_of_cards);
                }
                function position_cards(){
                
                TweenMax.staggerFrom(card_array1,1,{left:"3%",top:"20%",ease:Back.easeOut},.2);
                    TweenMax.staggerFrom(card_array2,1,{left:"3%",top:"54%",ease:Back.easeOut,onComplete:positioning_of_cards_completed},.2);
                
                /*

                TweenMax.staggerFrom(card_array1,1,{rotationY:"180deg",opacity:0,ease:Back.easeOut},.1);
                TweenMax.staggerFrom(card_array2,1,{rotationY:"180deg",opacity:0,ease:Back.easeOut,onComplete:positioning_of_cards_completed},.1);*/
                
                /*
                TweenMax.staggerFrom(card_array,3,{rotationY:"180deg",opacity:0,ease:Back.easeOut,onComplete:positioning_of_cards_completed},0);
                */
                }
                create_cards();
                create_card_array();
                //console.log(card_array1[7]);
                position_cards();
              function unblur_the_images(){
                  
                  for(var i=0;i<card_array.length;i++){
                      
                         TweenMax.to(card_array[i],1,{filter:"blur(0px)"});
                     
                  }
                  //$(".cards:hover").css("background","#00a99d");
              }
                
             /* 
              $("#slider").click(function(){
                
                //tl.reverse();
                $("txtContainer").css("display","none");
                setTimeout(function(){
                  tween_slide_slider.reverse();
                  
                },500);
                setTimeout(function(){
                  tween_rotate_image.reverse();
                  tween_hide_name.reverse();
                  unblur_the_images();
                  $("#"+id_of_image_clicked+" .image img").attr("src",images[members_index]);
                  txtContainer.text(" ");
                },1000);
                
                image_clicked=false;
                
              });*/

                /* build DOM elements*/
     
               function splitText(phrase) {
                   var prevLetter, sentence,
                       sentence = phrase.split("");
                   $.each(sentence, function(index, val) {
                       if(val === " "){
                          val = "&nbsp;";
                       }
                       var letter = $("<div/>", {
                            id : "txt" + index
                       }).addClass('txt').html(val).appendTo(txtContainer);
    
                       if(prevLetter) {
                            $(letter).css("left", ($(prevLetter).position().left + $(letter).width()) + "px");
                       };
                      prevLetter = letter;
                   });
                    txt = $(".txt");
                }


                function buildTimeline() {
        
         
        
                    TweenLite.set(txtContainer, {css:{perspective:500}});
        
                    tl = new TimelineMax();
                   
                    tl.staggerFrom(txt, 0.2, {alpha:0}, 0.06, "textEffect");
                    tl.staggerFrom(txt, 0.4, {rotationY:"-270deg", top:80, transformOrigin: "50% 50% -80", ease:Back.easeOut}, 0.06, "textEffect");
                    tl.staggerTo(txt, 0.6, {rotationX:"360deg", color:"#90e500", transformOrigin:"50% 50% 10"}, 0.02);  
                }

                function animation_in_description(){
                    var phrase=description[members_index];
                    console.log(phrase);
                    txtContainer.empty();
                  txtContainer.text(phrase);
                    //splitText(phrase);
                      //buildTimeline();
                      console.log("animation_in_description onComplete event fired");
                }

                function set_members_index(id){
                    if(id.length==5){
                        members_index=id[4];

                    }
                    else{
                        members_index=id[4]+id[5];
                    }
                    members_index--;
                    console.log("members index:"+members_index);
                    console.log("description:"+description[members_index]);
                }
             

              function blur_the_images(id){
                  
                  for(var i=0;i<card_array.length;i++){
                      var temp=card_array[i].selector;
                      //console.log(temp);
                      if(('#'+id)!=temp){
                         TweenMax.to(card_array[i],1,{filter:"blur(2px)"});
                         //console.log("id:"+id+"temp:"+temp);
                      }
                  }
                  $(".cards:hover").css("background","transparent");
              }
                /*$('.cards').click(function(event){
                    console.log("image clicked");
                    var id;
                    id=$(this).attr('id');
                id_of_image_clicked=id;
                    set_members_index(id);
                    console.log(id);
                    if(positioning_of_cards==8&&image_clicked==false){
                          //tween_rotate_image=TweenMax.to($('#'+id),0.3,{rotation:360,top:"30%",scale:1.5,zIndex:zIndex++,left:"30%"});
                    tween_rotate_image=TweenMax.to($('#'+id),.45,{top:"23%",width:"20%",height:"60%",zIndex:zIndex++,left:"25%"});
                        tween_slide_slider=TweenMax.to("#slider",1,{width:"100%",opacity:1,display:"block",onComplete:animation_in_description});
                    tween_hide_name=TweenMax.to($("#"+id+" .name"),0,{display:"none"});
                    $("#"+id_of_image_clicked+" .image img").attr("src",coloured_images[members_index]);
                        image_clicked=true;
                    blur_the_images(id);
                        $("txtContainer").css("display","block");
                    }
                    
                });*/


            //});