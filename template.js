/*  This file is part of Lime Survey Template : SkeletonQuest

  Copyright (C) 2010-2013 Denis Chenu for http://sondages.pro
  Distributed under GPL 3 licence
  Distributed under MIT licence
  Inspiration by Skeleton V1.1, Copyright 2011, Dave Gamache, http://www.getskeleton.com under open-source MIT license
  Inspiration by Spip-dist http://www.spip.net/ , Collectif SPIP distributed under GPL licence
  Inspiration by THE CSS NINJA http://cssn.in/ja/023, Ryan Seddon
  Inspiration by Bootstrap http://getbootstrap.com/ under Apache License.
  Inspiration by jquery mobile http://jquerymobile.com/ under Dual licensed under the MIT or GPL Version 2 licenses.
  Tango Icon Project http://tango.freedesktop.org/ distributed under Public Domain
*/
// Some var to enable/disable some function
useDefaultProgress=false; // Use the default progress-wrapper from LimeSurvey core
replaceJavascriptAlert=true; // Replace common alert with jquery-ui dialog
bMoveLanguageSelect=true // Move the language selector to the top
bCloneNavigator=true // Clone the navigator in the header
bMoveIndex=true // Move index in a fixed bix at rigth of the survey
bHeaderFixed=true; // Fix the header
/* Some global tools */
$(document).on("click",".menu-collapse",function(event){
	var thismenu=$(this).next(".menu");
	$("menu").not(thismenu).slideUp("fast");
	$(thismenu).slideToggle("fast");
	event.stopPropagation();
});
$(document).on("click",":not(.menu-collapse)",function(){
	$(".menu").slideUp("fast");
});
$(document).ready(function(){
	if(bMoveLanguageSelect || bCloneNavigator){$("<div class='tools cloned-tools' />").appendTo("#head .wrapper");}
	if(bCloneNavigator){cloneNavigator();}
	if(bMoveLanguageSelect){moveLanguageSelect();}
	if(bHeaderFixed){headerFixed();}
	if(bMoveIndex){updateIndex();}
	hovercolumn();
	tableinput();
	movePrevButton();
	// Opera mini labelling touch
	operamini = window.operamini && ({}).toString.call( window.operamini ) === "[object OperaMini]";
	if(operamini){
		$('label > input:checkbox, label > input:radio, input:radio + label, input:checkbox + label').bind('click', function(){
		});
	}
})

function navbuttonsJqueryUi(){
    // Do our own button (not jquery default)
    $("#movenextbtn").wrapInner("<span class='btn-text ui-button-text' />").append(" <i class='btn-icon ui-icon ui-icon-arrowthick-1-e'>   </i>");
    $("#moveprevbtn").wrapInner("<span class='btn-text ui-button-text' />").prepend("<i class='btn-icon ui-icon ui-icon-arrowthick-1-w'>   </i> ");
    $("#movesubmitbtn").wrapInner("<span class='btn-text ui-button-text' />").append(" <i class='btn-icon ui-icon ui-icon-arrowthickstop-1-s'>   </i>");
}

// Replace common alert with jquery-ui dialog
if(replaceJavascriptAlert){
	function alert(text) {
		var $dialog = $('<div></div>')
			.html(text)
			.dialog({
				title: '',
				dialogClass: 'alert',
				buttons: { "Ok": function() { $(this).dialog("close"); } },
				show: { effect: "highlight", duration: 800 },
				hide: {effect: "fade",duration: 500},
				modal: true
			});
		$dialog.dialog('open');
	}
}
/* Adapt column hover */
function hovercolumn(){
    $(document).on('mouseover mouseleave',':not(.array-flexible-duel-scale) table.question td',function(event){
        if (event.type == 'mouseover') {
          $(this).closest("table.question").find("col").eq($(this).index()).addClass("hover");
          $(this).closest("table.question").find("thead tr").children().eq($(this).index()).addClass("hover");
        }
        else {
          $(this).closest("table.question").find("col").eq($(this).index()).removeClass("hover");
          $(this).closest("table.question").find("thead tr").children().eq($(this).index()).removeClass("hover");
        }
    });
    $(document).on('mouseover mouseleave','.array-flexible-duel-scale table.question td',function(event){
        if (event.type == 'mouseover') {
          $(this).closest("table.question").find("col").eq($(this).index()).addClass("hover");
          $(this).closest("table.question").find("thead tr:not(.groups)").children().eq($(this).index()).addClass("hover");
        }
        else {
          $(this).closest("table.question").find("col").eq($(this).index()).removeClass("hover");
          $(this).closest("table.question").find("thead tr:not(.groups)").children().eq($(this).index()).removeClass("hover");
        }
    });
}
function tableinput(){
    $(document).on('focusin focusout','.array-flexible-duel-scale table.question input',function(event){
        activeindex=$(this).parents('td').index();
        if (event.type == 'focusin') {
          $(this).closest("td").addClass("focus");
          $(this).closest("tr").addClass("focus");
          $(this).closest("table.question").find("col").eq(activeindex).addClass("focus");
          $(this).closest("table.question").find("thead tr:not(.groups)").children().eq(activeindex).addClass("focus");
        }
        else {
          $(this).closest("td").removeClass("focus");
          $(this).closest("tr").removeClass("focus");
          $(this).closest("table.question").find("col").eq(activeindex).removeClass("focus");
          $(this).closest("table.question").find("thead tr:not(.groups)").children().eq(activeindex).removeClass("focus");
        }
    });
}
function movePrevButton(){
    if ((screen.width<440)) {
        $('#moveprevbtn').insertAfter('#movenextbtn');
        $('<br />').insertAfter('#movenextbtn');
    }
}
/* Clone the language selector (if exist) in the header*/
function moveLanguageSelect(){
	if($("#changelangbtn").length){
		$(document).on("click",".menu-lang :not(.ui-state-disabled) a",function(){
			$("#lang").val($(this).parent('li').data("lang")).trigger('change');
		});
		var selectedLang=$("#lang").val();
		var maxWidth=1;
		newLanguageMenu="<div class='menu-wrapper tool'><a class='ui-button menu-collapse'><span class='ui-button-text menu-text'>"+$("#changelangbtn").text()+"</span><span class='ui-icon menu-icon ui-icon-triangle-1-s'>   </span></a>"
						+"<ul class='menu-lang menu'>";
		$("#lang option").each(function(){
			var stateClass="";
			if($(this).attr("value")==selectedLang){
				stateClass="ui-state-disabled";
			}
			newLanguageMenu=newLanguageMenu+"<li class='"+stateClass+"' data-lang='"+$(this).attr("value")+"'>"
							+"<a>"+$(this).text()+"</a>"
							+"</li>";
			if($(this).text().length>maxWidth){maxWidth=$(this).text().length;}
		});
		newLanguageMenu=newLanguageMenu+"</ul></div>";
		$(newLanguageMenu).appendTo(".cloned-tools");
		$(".menu-lang").css("width",maxWidth+"em");
		$(".menu-lang").menu();
		$("#lang").hide();
	}
}

/* Move the index (and accordion it) */
function updateIndex(){
    if($("#index").length){
        //$("#limesurvey").wrapInner("<div id='indexed' />");
        $("#index").appendTo("#content").wrap("<div class='aside aside-index' />");
        $("#content").addClass("with-aside");
        var mainOffset= $("#main").offset().top-$(window).scrollTop();
        minOffset=0+$(".head.affix").outerHeight();
        $("#index").css("top",Math.max(mainOffset,minOffset)+"px");
        $(window).on('scroll',function(){
            mainOffset= $("#main").offset().top-$(window).scrollTop();
            newOffset=Math.max(mainOffset,minOffset);
            $("#index").css("top",Math.max(mainOffset,minOffset)+"px");
        });
        $(document).on('click','#index :submit',function(){
            $(this).clone().removeAttr('id').appendTo("#limesurvey").click();
        });
        // Fix for ranking question type
        if(typeof doDragDropRank!="undefined" && $.isFunction( doDragDropRank )){
            $('.dragDropTable').each(function(){
                var bSameListHeigth=$(this).find(".dragDropChoiceList[style]").length;
                var bSameChoiceHeigth=$(this).find(".choice[style]").length;
                if(bSameListHeigth || bSameChoiceHeigth){
                    $(this).find(".choice[style]").removeAttr('style');
                    var qID=$(this).closest(".question-wrapper").data('qid');
                    fixChoiceListHeight(qID,bSameChoiceHeigth,bSameListHeigth);
                }
            });
        }
//        $(document).on('click','#index .container',function(){
//            $(this).find('ol').toggle();
//        });
    accordionIndex();
    }
}
/* Set accordion to index */
function accordionIndex(){
  if( $('#index .container h3').length > 0 )
  {
    $('#index').addClass('accordion');
    $('#index .container h3').each(function(index){
      $(this).addClass("grouptitle");
      $(this).attr("id",'grouptitle-'+index);
      $(this).after("<div class='group' id='groupindex-"+index+"'></div>");
      $(this).nextUntil("h3",'.row').appendTo($("#groupindex-"+index))
    });
    // Don't find a good way to use .accordion() then redo it
    $("#index .container .current").closest(".group").addClass("current");
    thiscurrent=$("#index .container .group.current")
    currentindex=$("#index .container .group").index(thiscurrent);
    // Calculate heiht/maxheight
    maxheight=0;
    $("#index .container .group").each(function(){
      if($(this).height()>maxheight){maxheight=$(this).height();}
    });

    //$("#index .container .group").height(maxheight);
    $("#index .container .group.current").addClass("active");
    $("#index .container .group:not(.current)").addClass("inactive");
    //$("<b class='more seemore ui-icon ui-icon-plus' />").prependTo(("#index .container h3"));
    $("#index .container h3").each(function(index){
        number=parseInt(index)+1;
        $("<i class='more seemore ui-icon ui-icon-plus'>"+number+"</i>").prependTo($(this));
    });
    $("#index .container .active").prev("h3").find(".more").toggleClass('seemore seeless').toggleClass('ui-icon-plus ui-icon-minus');
    $("#index .container .group:not(.active)").hide(0);
    //System to set haven't submit button moving
    containerheight=maxheight*1;
    $("#index .container h3").each(function(){
        containerheight+= $(this).outerHeight()*1;
    });
    $("#index .container > .row").each(function(){
        containerheight+= $(this).outerHeight()*1;
    });
    containerheight+= $("#index .container h2").outerHeight()*1;
    containerheight+=$("#index p.navigator").outerHeight()*1;
    containerheight+=40;// A 40px more 
//    $("#index .container").height(containerheight);
    $("#index .container").css('min-height', containerheight+'px');
    $("#content").css('min-height', containerheight+'px');
    $("#index .container h3").click(function(){
      if(!$(this).next(".group").hasClass('active')){
        $("#index .container .group").slideUp(150);
        $(this).next(".group").slideDown(150);
        $("#index .container .group").removeClass('active');
        $(this).next(".group").addClass('active');
        $("#index .container h3 .more").removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
        $(this).find('.more').removeClass('seemore ui-icon-plus').addClass('seeless ui-icon-minus');
        $("#index .toggleall").removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
      }else{
        $(this).next(".group").slideUp(150);
        $("#index .container h3 .more").removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
        $(this).next(".group").removeClass('active');
        $("#index .toggleall").removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
      }
    });
    $("<div class='toggleall seemore ui-icon ui-icon-plus' />").prependTo("#index h2");
    $("#index h2").click(function(){
      if($(this).find('.toggleall').hasClass("seemore")){
        $("#index .group").slideDown(150);
        $("#index .group").addClass('active');
        $('#index h3 .more').removeClass('seemore ui-icon-plus').addClass('seeless ui-icon-minus');
        $(this).find('.toggleall').removeClass('seemore ui-icon-plus').addClass('seeless ui-icon-minus');
      }else{
        $("#index .group").slideUp(150);
        $("#index .group").removeClass('active');
        $('#index h3 .more').removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
        $(this).find('.toggleall').removeClass('seeless ui-icon-minus').addClass('seemore ui-icon-plus');
      }
    });
  }
}
/* Clone the navigator */
function cloneNavigator(){
	$(document).on('click','.navigator-clone :submit',function(event){
		event.preventDefault();
		var cloneOf=$(":submit[name='"+$(this).attr('value')+"']").filter(":first");
		$(cloneOf).removeProp('disabled').removeClass('disabled').click();
	});
	$("<div class='navigator-clone tool'/>").appendTo(".cloned-tools");
	$(".navigator button").each(function(){
		$(this).clone().removeAttr("id").removeAttr("name").removeAttr("accesskey").appendTo('.navigator-clone');
	});
}
/* Fix the header */
function headerFixed(){
	$("#head").wrap( "<div class='head affix'></div>" );;// Use same class than bootstrap
	$("#container .pagetitle").css("padding-top",$("#head").outerHeight());
}
/* Replace jquery ui progressbar */
if(!useDefaultProgress){
	jQuery(function($) {
		$.fn.progressbar = function(option) {
			return $(this).each(function() {
			var obj = $(this);
			if(typeof option.value== "number"){
				htmlProgress="<div class='progress-bar'><div class='progress-value' style='width:"+option.value+"%'>"+option.value+"%</div><div class='progress-over' />";
				position=0;
				for (i = 100; i > 0; i-=10)
				{
					htmlProgress+="<div class='progress-range range-"+i+"' style='right:"+position+"%'>"+i+"%</div>";
					position+=10;
				}
				htmlProgress+="</div>";
				$(this).parent().addClass("skeletonprogress");
				$(this).append(htmlProgress).addClass("skeletonprogress");
			}
			// Move preprogress
			txtPreprogress=$("#progress-wrapper > .hide").text();
			txtPreprogress=false;//comment to activate
			if(txtPreprogress){
				$(this).prepend("<div class='preprogress' style='float:left'>"+txtPreprogress+"</div>");
				$(this).find(".progress-bar").css("margin-left",$(this).find(".preprogress").outerWidth()+"px");
			}
			});
		}
	});
}
/* Fire event hide and show for "Expression Manager" hide/show */
jQuery(function($) {
    var _oldShow = $.fn.show;
    $.fn.show = function(speed, oldCallback) {
        return $(this).each(function() {
        var obj = $(this),
        newShowCallback = function() {
            //console.log('afterShow');
            obj.trigger('afterShow');
        };
        obj.trigger('beforeShow');
        _oldShow.apply(obj, [speed, newShowCallback]);
        });
    }
    var _oldHide = $.fn.hide;
    $.fn.hide = function(speed, oldCallback) {
        return $(this).each(function() {
        var obj = $(this),
        newHideCallback = function(obj) {
            if ($.isFunction(oldCallback)) {
              oldCallback.apply(obj);
            }
            //console.log('afterHide');
            obj.trigger('afterHide');
        };
        obj.trigger('beforeHide');
        _oldHide.apply(obj, [speed, newHideCallback]);
        });
    }
});
