			function start_animating_gawds_logo(){
          console.log("animation in logo started");
          one_parent();
      }
      function one_parent(){
          TweenMax.to($("#work"),1,{opacity:1});
          TweenMax.to($("#one"),1.4,{width:"100%",onComplete:two_parent});
      }
      function two_parent(){
          TweenMax.to($("#two"),1.4,{height:"100%",onComplete:three_parent});
      }
      function three_parent(){
          
          TweenMax.to($("#three"),1.4,{width:"100%",onComplete:four_parent});
      }
      function four_parent(){
          
          TweenMax.to($("#four"),1.8,{height:"100%",onComplete:five_parent});
      }
      function five_parent(){
          TweenMax.to($("#believe"),1,{opacity:1});
          TweenMax.to($("#five"),1.6,{width:"100%",onComplete:six_parent});
      }
      function six_parent(){
          TweenMax.to($("#develop"),1,{opacity:1});
          TweenMax.to($("#six"),2,{height:"100%",onComplete:seven_parent});
      }
      function seven_parent(){
          TweenMax.to($("#gawds"),1,{opacity:1});
          TweenMax.to($("#seven"),2,{width:"100%",onComplete:eight_parent});
      }
      function eight_parent(){
          
          TweenMax.to($("#eight"),1.6,{height:"100%",onComplete:nine_parent});
      }
      function nine_parent(){
        
          TweenMax.to($("#nine"),.8,{width:"100%"});
      }
      $(document).ready(function(){





              function init_home(){
                  var width_of_section_content=$(".section_content").width();
                  var height_of_boxes=width_of_section_content*15.073/100;
                  console.log("height of boxes"+height_of_boxes);
                  $(".home_box").css("height",height_of_boxes+"px");
                  $("#logo").css("top",height_of_boxes+"px");
                  $("#work").css("top",2*height_of_boxes+"px");
                  $("#believe").css("top",2*height_of_boxes+"px");
              }

              init_home();


            	var names=["Utkarsh", "Luv", "Pawan", "Bhanu","Bhanuj","Nikhil","Shashank","Abhishek","Renu","Divya","Rishabh","Surbhi","Utkarsh","Varun","Chhavi","Kaushik"];
                var coloured_images=["./images/1d.jpg","./images/2d.jpg","./images/3d.jpg","./images/4d.jpg","./images/1d.jpg","./images/2d.jpg","./images/3d.jpg","./images/4d.jpg","./images/2d.jpg","./images/1d.jpg","./images/2d.jpg","./images/3d.jpg","./images/4d.jpg","./images/1d.jpg","./images/3d.jpg","./images/2d.jpg"];
            	var images=["./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/2.jpg","./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/1.jpg","./images/3.jpg","./images/2.jpg"];
            	var description_heading=["Utkarsh Kumar", "Luv Karakoti", "Pawan Kumar", "Bhanu Aggarwal","Bhanuj Verma","Nikhil Singla","Shashank Lakshmi Prasad","Abhishek Goswami","Renu","Divya Mamagai","Rishabh","Surbhi","Utkarsh","Varun Kumar","Chhavi Aggarwal","Kaushik"];
            	var description_details=["Utkarsh Kumar", "Luv Karakoti", "Pawan Kumar", "Bhanu Aggarwal","Bhanuj Verma","Nikhil Singla","Shashank Lakshmi Prasad","Abhishek Goswami","Renu","Divya Mamagai","Rishabh","Surbhi","Utkarsh","Varun Kumar","Chhavi Aggarwal","Kaushik"];
            	var no_of_members=names.length;
            	var left=3;
            	var top=12;
            	var width=10;
            	var height=30;
            	var margin=1;
                var card_array=[];
            	var card_array1=[];
                var card_array2=[];
            	var zIndex=3;
            	var positioning_of_cards=0;
            	var tween_slide_slider;
            	var tween_rotate_image;
                var tween_hide_name;
            	var image_clicked=false;
                var id_of_image_clicked;
                var tween_animate_description1;
                var tween_animate_description2;
                var tween_animate_description3;
            	var members_index;
            	var txtContainer = $("#txtContainer");
            	var tl,txt;
            	$(".cards").hover(
            		function(event){
            		    var id=$(this).attr('id');
            		    $("#"+id+" .card_name").css("background","#00a99d");
            	    },function(event){
            	    	var id=$(this).attr('id');
            	    	$("#"+id+" .card_name").css("background","transparent");
            	    }
            	);
            	function create_cards(){
            		for(var i=0;i<no_of_members;i++){
            		    
            		    var card_id="card"+(i+1);
            		 
            	
            		    var name_text=document.createTextNode(names[i]);
            		 
            		    $("#"+card_id+" .card_name").append(name_text);
           
            		    var image=document.createElement("img");
            		    image.src=images[i];
            		    $("#"+card_id+" .card_content .card_image").append(image);

            		    var card_description_heading=document.createElement("p");
            		    var card_description_heading_text=document.createTextNode(description_heading[i]);
            		    card_description_heading.appendChild(card_description_heading_text);
            		    $("#"+card_id+" .card_content .card_description .card_description_heading").append(card_description_heading);

            		    var card_description_details=document.createElement("p");
            		    var card_description_details_text=document.createTextNode(description_details[i]+" some more description");
            		    card_description_details.appendChild(card_description_details_text);
            		    $("#"+card_id+" .card_content .card_description .card_description_details").append(card_description_details);


            		    if(i==8){
            		    	top=top+5+height+4*margin;
            		    }
            		    document.getElementById(card_id).style.cssText="top:"+top+"%;left:"+left+"%;";

            		    left=left+width+2*margin;
            		    if(i==7)
            		    	left=3;

            		    
            		    
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
                    TweenMax.staggerFrom(card_array1,1,{left:"3%",top:"12%",ease:Back.easeOut},.2);
            	    TweenMax.staggerFrom(card_array2,1,{left:"3%",top:"51%",ease:Back.easeOut,onComplete:positioning_of_cards_completed},.2);
                
                
            	}
            	create_cards();
            	create_card_array();
            
            	position_cards();
              function unblur_the_images(){
                  /*
                  for(var i=0;i<card_array.length;i++){
                      
                         TweenMax.to(card_array[i],1,{filter:"blur(0px)"});
                     
                  }*/
                  for(var i=0;i<card_array.length;i++){
                      var temp=card_array[i].selector;
                      //console.log(temp);
                      //if(('#'+id)!=temp){
                         //TweenMax.to(card_array[i],1,{filter:"blur(2px)"});
                         $(temp).css("filter","blur(0px)");
                         $(temp).css("-webkit-filter","blur(0px)");
                         $(temp).css("-moz-filter","blur(0px)");
                         $(temp).css("-ms-filter","blur(0px)");
                         $(temp).css("-o-filter","blur(0px)");
                         //console.log("id:"+id+"temp:"+temp);
                      //}
                  }
       
              }
            	
              
              $(".cross").click(function(){
                
                tween_animate_description2.reverse();
                tween_animate_description3.reverse();
                setTimeout(function(){
                  tween_slide_slider.reverse();
                  tween_animate_description1.reverse();
                },500);
                setTimeout(function(){
                  tween_rotate_image.reverse();
                  
                  unblur_the_images();
                  setTimeout(function(){
                    $("#"+id_of_image_clicked+" .card_content .card_image img").attr("src",images[members_index]);
                    tween_hide_name.reverse();
                  },1000);
                  image_clicked=false;
                },500); 
                
              });

              $("#slider").click(function(){
                
                tween_animate_description2.reverse();
                tween_animate_description3.reverse();
                setTimeout(function(){
                  tween_slide_slider.reverse();
                  tween_animate_description1.reverse();
                },500);
                setTimeout(function(){
                  tween_rotate_image.reverse();
                  
                  unblur_the_images();
                  setTimeout(function(){
                    $("#"+id_of_image_clicked+" .card_content .card_image img").attr("src",images[members_index]);
                    tween_hide_name.reverse();
                  },1000);
                  image_clicked=false;
                },500); 
                
              });

               function show_cross(){
               	    tween_animate_description3=TweenMax.to($("#"+id_of_image_clicked+" .card_content .card_description .cross"),0.3,{display:"block"});
               }
                function animation_in_description(){
                	tween_animate_description1=TweenMax.to($("#"+id_of_image_clicked+" .card_content .card_description"),0,{display:"block",height:"101.9%"});
                	tween_animate_description2=TweenMax.to($("#"+id_of_image_clicked+" .card_content .card_description"),.5,{left:"100%",onComplete:show_cross});
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
                	console.log("description heading:"+description_heading[members_index]);
                }
             

              function blur_the_images(id){
                  
                  for(var i=0;i<card_array.length;i++){
                      var temp=card_array[i].selector;
                      //console.log(temp);
                      if(('#'+id)!=temp){
                         //TweenMax.to(card_array[i],1,{filter:"blur(2px)"});
                         $(temp).css("filter","blur(2px)");
                         $(temp).css("-webkit-filter","blur(2px)");
                         $(temp).css("-moz-filter","blur(2px)");
                         $(temp).css("-ms-filter","blur(2px)");
                         $(temp).css("-o-filter","blur(2px)");
                         //console.log("id:"+id+"temp:"+temp);
                      }
                  }
                  $(".cards:hover").css("background","transparent");
              }
	            $('.cards').click(function(event){
            		console.log("image clicked");
            		var id;
            		id=$(this).attr('id');
                    id_of_image_clicked=id;
            		set_members_index(id);
            		console.log(id);
            		if(positioning_of_cards==8&&image_clicked==false){
            
                    tween_rotate_image=TweenMax.to($('#'+id),1,{top:"23%",width:"20%",height:"60%",zIndex:zIndex++,left:"25%",ease:Back.easeOut.config(.6)});
            		    tween_slide_slider=TweenMax.to("#slider",1,{width:"100%",opacity:0,display:"block",onComplete:animation_in_description});
                    tween_hide_name=TweenMax.to($("#"+id+" .card_name"),0,{display:"none"});
                    $("#"+id_of_image_clicked+" .card_content .card_image img").attr("src",coloured_images[members_index]);
            		    image_clicked=true;
                    blur_the_images(id);
            		    $("txtContainer").css("display","block");
            		}
            		
            	});






    
    var shrink_static_tv_tween;
    var scale_animated_portion_inside
    var text_description=$("#text_description");
    var animated_portion=$("#animated_portion_inside");

    function display_earth(){
      TweenMax.to(".earth span",1.3,{display:"block",opacity:1,onComplete:tv});
    }



    function display_solar(){
      TweenMax.to(".earth",1.3,{display:"block",opacity:1,onComplete:display_earth});
    }
    function animation(){
      
      setTimeout(function(){
      	  text_description.text("Animations");
      	  TweenMax.to($("#circle3"),1,{scale:10,border:"0px solid black",ease:Back.easeOut,onComplete:display_solar});
      },500);

    }

    function rotate_three_circles(){
      setTimeout(function(){
      	  scale_animated_portion_inside=TweenMax.to($("#animated_portion_inside"),1.2,{rotationZ:"1440deg",scale:.1,onComplete:animation});
          TweenMax.to($("#circle1"),1,{display:"none"});
          TweenMax.to($("#circle2"),1,{display:"none"});
      },500);
    }
    function separate_three_circles(){

      setTimeout(function(){
      	  TweenMax.to($("#circle1"),.8,{top:"-=10%",border:"1px solid black",ease:Back.easeOut,onComplete:rotate_three_circles});
          TweenMax.to($("#circle2"),.8,{left:"-=10%",border:"1px solid black ",ease:Back.easeOut});
          TweenMax.to($("#circle3"),.8,{top:"+=10%",border:"1px solid black",ease:Back.easeOut});
      },500);
    }

    function add_three_circles(){
      var dot=document.createElement("div");
      dot.className="dot";
      dot.id="circle2";
      animated_portion.append(dot);
      dot=document.createElement("div");
      dot.className="dot";
      dot.id="circle3";
      animated_portion.append(dot);
    }
    function graphics_designing(){
      setTimeout(function(){
      	  text_description.text("Graphics Designing");
      },800);
      TweenMax.to($("#left_bracket"),1,{left:"48%",scale:0,display:"none",ease:Back.easeOut});
      TweenMax.to($("#right_bracket"),1,{right:"48%",scale:0,display:"none",ease:Back.easeOut});
      add_three_circles();
      TweenMax.to($('.dot'),1,{width:"80px",height:"80px",left:"-=7%",top:"-=10%",ease:Back.easeOut,onComplete:separate_three_circles});
    }
    function add_slash(){
      setTimeout(function(){
      	$("#left_bracket ").append("<span> /</span>");
        TweenMax.fromTo($("#left_bracket span"),1,{opacity:0},{opacity:1,onComplete:graphics_designing});
      },400);
    }
    function web_development(){
      text_description.text("Web Development");
      var dot=document.createElement("div");
      dot.className="dot";
      dot.id="circle1";
      animated_portion.append(dot);

      var left_bracket=document.createElement("div");
      left_bracket.id="left_bracket";
      left_bracket.style.cssText="opacity:0;";
      animated_portion.append(left_bracket);

      var right_bracket=document.createElement("div");
      right_bracket.id="right_bracket";
      right_bracket.style.cssText="opacity:0;";
      animated_portion.append(right_bracket);

      //var left_bracket_h1=document.createElement("h1");
      var left_bracket_text=document.createTextNode("<");
      //left_bracket_h1.appendChild(left_bracket_text);
      //left_bracket.appendChild(left_bracket_h1);
      left_bracket.appendChild(left_bracket_text);

      //var right_bracket_h1=document.createElement("h1");
      var right_bracket_text=document.createTextNode(">");
      //right_bracket_h1.appendChild(right_bracket_text);
      //right_bracket.appendChild(right_bracket_h1);
      right_bracket.appendChild(right_bracket_text);

      TweenMax.fromTo(left_bracket,1,{opacity:1,width:"10%",height:"10%",position:"absolute",left:"10%",top:"44%"},{opacity:1,left:"35%",top:"44%",width:"10%",height:"10%",position:"absolute",onComplete:add_slash,ease:Back.easeOut});
      TweenMax.fromTo(right_bracket,1,{opacity:1,width:"10%",height:"10%",position:"absolute",right:"10%",top:"44%"},{opacity:1,right:"36%",top:"44%",width:"10%",height:"10%",position:"absolute",ease:Back.easeOut});

    }

    function tv(){
      TweenMax.to(".earth span",0.5,{opacity:0,delay:2.0})
      TweenMax.to(".earth",0.5,{opacity:0,delay:2.1});
      TweenMax.to(".varun",0.5,{opacity:1,borderRadius:"0%",height:230,width:380,ease:Bounce.easeOut,borderWidth:"3",top:"60px",x:"-55px",transformOrigin:"50% 50%",onComplete:playTv,delay:2.2});
      $("#path").addClass("tv-frame");
    }
    function playTv(){
      /*TweenMax.to("#cover",0,{backgroundColor:"#424242"});
      TweenMax.to(".dot",0.2,{borderRadius:"0%",rotation:"45deg",x:-20,onComplete:disappear});
      */
      text_description.text("Video-editing");
      TweenMax.to("#play-btn",0.5,{opacity:1,onComplete:disappear});
    }
    function disappear(){
    /*  TweenMax.to(".dot",0.1,{opacity:0,delay:1,onComplete:make_lap});*/

        TweenMax.to("#play-btn",0.5,{opacity:0,onComplete:remove_sun});
        TweenMax.to("#play-btn",0.4,{display:"none",delay:0.5});
    }
    function remove_sun(){
      TweenMax.to(".dot",0.7,{opacity:0});
      TweenMax.to(".dot",0.1,{display:"none",delay:0.8,onComplete:make_lap});
    }
    function make_lap(){
      TweenMax.to("#path",0.5,{y:200,borderWidth:5,borderRadius:"0%",height:0,zIndex:9999,onComplete:make_base});
    }
    function make_base(){
      text_description.text("Workshops");
      TweenMax.to("#path",0.5,{borderWidth:5,width:230,onComplete:visib,x:20,onComplete:visib});

    }
    function visib(){
      TweenMax.to("#path",1,{transformOrigin:"0% 0%"});
      TweenMax.to("#base",1,{opacity:1,onComplete:rotat});
    }
    function print_three(){
        console.log("printing three");
        TweenMax.staggerTo(".flying_text",0.7,{y:-155,opacity:1,scale:1.5},0.7);
        TweenMax.staggerTo(".flying_text",0.7,{delay:0.7,opacity:0},0.7);
        make_dot();
    }
    function rotat(){

      TweenMax.to(".varun",1,{width:"150px",y:"+=2.7"});
      TweenMax.to(".varun",1,{rotationZ:"-110deg",borderWidth:"4"});
       TweenMax.to(".bse",0.6,{width:200,onComplete:showlight});
      TweenMax.to(".jak",0.3,{opacity:1,delay:1});
      TweenMax.to("#rec",0.3,{opacity:1,delay:1,onComplete:print_three});

      
      
    }
    function showlight(){
      TweenMax.to("#img",1,{opacity:1,zIndex:1,delay:0.2});
    }
    
  function make_dot(){
    TweenMax.to("#img",0.5,{opacity:0,delay:2.5});
    TweenMax.to(".varun",1,{rotationZ:"0deg",width:"200px",delay:3.2,onComplete:dot});
   }
  function dot(){
      TweenMax.to(".bse",0.1,{opacity:0,onComplete:final_dot});
  }
  function final_dot(){
      TweenMax.to(".varun",0.7,{width:"5px",x:"100px",backgroundColor:"white",onComplete:dot_again}); 
  }
  function dot_again(){
      TweenMax.to(".varun",0.1,{borderRadius:"50%",height:"5px",onComplete:show_static_tv}); 
  }
  function show_static_tv(){
      $("#path").css("display","none");
      text_description.text("");/*
      shrink_static_tv_tween.reverse();

      document.getElementById("animated_portion_inside").innerHTML="";
      var li=document.createElement("li");
      li.id="path";
      li.class="varun";
      $("#solars .solarsystem .earth").append(li);
      scale_animated_portion_inside.reverse();*/

      TweenMax.to($("#list_of_what_we_did"),2,{display:"block"});
  }

    
    
    $("#circle").click(function(){
    	shrink_static_tv_tween=TweenMax.to($("#static_tv"),.8,{scale:"0",onComplete:web_development});
    });
  var scroll_top=$(window).scrollTop();
  var window_height=$(window).height();
  var count=0; 
  var flag=1;
  function check_scroll(){
      if(flag==1){
            //$(window).scroll(function(){
                flag=0;
                console.log("window.scrollTop:"+$(window).scrollTop());
                var temp_scroll_top=$(window).scrollTop();
                if(temp_scroll_top>scroll_top){
                    count++;
                    $('html, body').animate({
                        scrollTop: count*window_height
                    },
                    {
                        duration:800,

                    });
                    
                    console.log("scrolled down and count="+count);
                }
                else{
                    count--;
                    $('html, body').animate({
                        scrollTop: count*window_height
                    },
                    {
                        duration:800,
                    });
                    console.log("scrolled up and count="+count);
                }
                setTimeout(function(){
                    flag=1;
                    scroll_top=$(window).scrollTop();
                },900);
                
            //window.scrollTo(0,1600);
            
          //});
      }
  }            
  $(window).scroll(function(){
      check_scroll();
      
  });
  

  $(document).mousemove(function(event){
            
      var mouse_x_position=event.pageX;
      var mouse_y_position=event.pageY;
      //console.log("mouse_x_position "+mouse_x_position);
      //console.log("mouse_y_position "+mouse_y_position);

      if(mouse_x_position<=55){
        TweenMax.to($("#navigation"),.4,{left:"0%"});
      }
      else{
        TweenMax.to($("#navigation"),.4,{left:"-4.5%"});
      }
  });

  $('a').click(function(){
      flag=0;
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top - 0
      }, 500);
      setTimeout(function(){
          flag=1;
      },600);
      return false;
  });




});