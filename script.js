// define jquery variables 
var $timeBlock = $('.time-block')
var $currentDay = $('#currentDay'); 
var $scheduleArea = $(".schedule");

var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");


// create a start schedule button to loop through the timeblocks 


// makesure schedule items in an empty array. 
var scheduleItems = []; 

// add Schedule Items 



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

console.log(scheduleItems)
}

function addSchedule (){

      var scheduleItems = storage.getItem("events"); 
      var scheduleItems = JSON.parse(scheduleItems);
      
      
      // for loop to loop through shcedule items 
      
      for (let i = 0; i < scheduleItems.length; index++) {
            var scheduleHour = scheduleItems[i].hour; 
            var itemText = scheduleItems[i].text ;
      }

      


      
      }


 

// create a function to colour timeblocks based on shcedule 
 
function colorTimeBlocks () {

      $timeBlock.each(function (){
            var $thisSegment = $(this);
            var thisSegmentHr = parseInt($thisSegment.attr("data-hour"));

            if(thisSegmentHr === currentHour){
            $thisSegment.addClass("present").removeClass("past future")
            }

            if(thisSegmentHr < currentHour){
            $this.addClass("past").removeClass("future present ")
            }
            if(thisSegmentHr > currentHour){
            $this.addClass("future").removeClass("past present")
            }
      })

}


