$(document).ready(function() {
 tab = $("#inptTab").val();

 $tabs = $("#tabs_events").tabs({
  select: function(event, ui) {
   $(".thumb").remove();
   page = 1;
  },
  load: function(event, ui) {
   $(".event").colorbox({width:"50%", height:"50%"});
  },
  add: function(event, ui) {
   var name = "#" + ui.panel.id;
   if (ui.tab.firstChild.textContent == tab) {
    $tabs.tabs('select', '#' + ui.panel.id);
   }
  }
  });

 page = 1;
 add_monitors();
 setup_is();


 // PAGE STUFF //
  $("#inptHideShow").click(function(){
   if ($(this).attr("value") == 'Hide') {
    $("#sidebarHistory").toggle();
    $("#sidebar").css("width", "25px");
    $("#tabs_events").css("width", "95%");
    $(this).attr("value", "Show"); 
   } else {
    $("#sidebarHistory").toggle();
    $("#sidebar").css("width", "180px");
    $("#tabs_events").css("width", "85%");
    $(this).attr("value", "Hide"); 
   }
  });
 // PAGE STUFF //
 

 //FUNCTIONS//
 function add_monitors(){
  $.post("skins/new/includes/getMonitors.php", function(data){
   var monitors = data.split(","); // Put monitors into array
   monitors.pop(); // Pop off last monitor (it is blank)
   var x = monitors.length; // Number of monitors
   for (var i=0;i<x;i++){
    var monitor = monitors[i];
    $tabs.tabs('add', "skins/new/includes/getEvents.php?MonitorName="+monitor, monitor);
   }
  });
 };

 function setup_is(){
  $(window).scroll(function(){
   if ($(window).scrollTop() >= (($(document).height() - $(window).height())-400)){
    FetchMore();
   }
  });
 }

 function FetchMore(){
  var MonitorName = $('li.ui-state-active a span').text(); // Currently selected monitor
  $.post("skins/new/includes/getEvents.php?MonitorName="+MonitorName+"&page="+page, function(data){ // Get more events
   if (data != "") {
    var ui_tab = $("li.ui-state-active a").attr("href");
    $(".ui-tabs-panel .clearfix").remove(); // Remove the clearfix div so events display correctly
    $(ui_tab).append(data);} // Append next page of events
  });
  page = page + 1;
 }
 //FUNCTIONS//
});
