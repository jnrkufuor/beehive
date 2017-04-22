<?php

class meetingTime {

 var $slot;
 var $day;
 
 /**
  * [[Constructor]]
  * @param [[String]] $slot [[Slot time]]
  * @param [[String]] $day  [[Day of the week]]
  */
 function meetingTime($slot,$day)
 {
  $this->slot= $slot;
  $this->day= $day;
 }


 /**
  * [[Function to return the slot]]
  * @return [[String]] [[Slot time]]
  */
 function getSlot(){
  return $this->slot;}
 /**
  * [[Function to return the day]]
  * @return [[String]] [[Day of the week]]
  */
 function getDay(){
  return $this->day;}

} 

?>