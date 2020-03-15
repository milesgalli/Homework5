// define jquery variables 
var $timeBlock = $('.time-segment')
var $currentDay = $('#currentDay'); 
var $scheduleArea = $(".schedule");

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");


// create a start schedule button to loop through the timeblocks 


// makesure schedule items in an empty array. 
var scheduleItems = []; 


function startSchedule (){

// console.log(scheduleItems)

      $timeBlock.each(function (){
         var $thisSegment = $(this);
         var thisSegmentHr = parseInt($thisSegment.attr("data-hour"));

         var scheduleobj = {
            // text that the user enters, to accept as a string 
               text: "", 
            // set the schdule hour related to hour
               hour: thisSegmentHr
         }   

      scheduleItems.push(scheduleobj);

      });
//once we have looped thru timeblocks, save this array of objects to local storage by stringifying it first 

localStorage.setItem("event", JSON.stringify(scheduleItems));

// console.log(scheduleItems)
};

//chabe time blocks depending on time 
function colorTimeBlocks () {

            $timeBlock.each(function (){
            var $thisSegment = $(this);
            var thisSegmentHr = parseInt($thisSegment.attr("data-hour"));

            if(thisSegmentHr === currentHour){
            $thisSegment.addClass("present").removeClass("past future")
            }

            if(thisSegmentHr < currentHour){
            $thisSegment.addClass("past").removeClass(" present future ")
            }
            if(thisSegmentHr > currentHour){
            $thisSegment.addClass("future").removeClass("past present")
            }
      });

}

function addSchedule (){

      var scheduleItems = localStorage.getItem("event"); 
      var scheduleItems = JSON.parse(scheduleItems);
      
      
      // for loop to loop through shcedule items 
      
      for (let i = 0; i < scheduleItems.length; i++) {

            var scheduleHour = scheduleItems[i].hour; 
            var itemText = scheduleItems[i].text ;

            // step 1 - target the correct element. 
             // check that these items match schedule time

           var alignTime =  $(`[data-hour="${scheduleHour}"` )[0]

            //append to the dom element 
           var textarea = $(alignTime).children("textarea")[0]
           $(textarea).text(itemText);
      }


      
}

// create a function to colour timeblocks based on shcedule 
 
       function saveEvent(){
            var $thisBlock = $(this).parent(); 

            var hourToUpdate = $thisBlock.attr("data-hour"); 
            var itemToAdd =  $thisBlock.children("textarea").val(); 

            for (var j = 0; j < scheduleItems.length; j++) {
                  if (scheduleItems[j].hour === hourToUpdate) {
            
                         scheduleItems[j].text = itemToAdd
            
                  }
            }

            localStorage.setItem("event", JSON.stringify(scheduleItems));
            addSchedule();
            }

//   Final Fucntion to put together all the peices 

$(document).ready(function(){

      colorTimeBlocks(); 

      if(!localStorage.getItem("events")){
      startSchedule(); 
      }

      $currentDay.text(currentDate)
      addSchedule();
      $scheduleArea.on("click", "button", saveEvent )


}); 