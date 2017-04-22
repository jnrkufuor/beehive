<?php

class entry {
 var $id;
 var $department;
 var $course;
 var $lecturer;
 var $meetingTime;
 var $room;

 /**
  * [[Constructor of the class]]
  * @param [[Integer]] $id         [[Description]]
  * @param [[Department]] $department [[Department Object]]
  * @param [[Course]] $course     [[Course Object]]
  */
 function entry($id,$department,$course)
 {
  $this->id= $id;
  $this->department= $department; 
  $this->course= $course;
 }

 /**
  * [[Function to set Lecturer]]
  * @param [[Lec]] $lec [[Description]]
  */
 function setLecturer($lec){$this->lecturer=$lec;}
 /**
  * [[Function to set Time]]
  * @param [[meetingTime]] $mtime [[meetingTime object]]
  */
 function setTime($mtime){$this->meetingTime=$mtime;}
 /**
  * [[Function to set room]]
  * @param [[room]] $room [[room object]]
  */
 function setRoom($room){$this->room=$room;}
 /**
  * [[Function to get ID]]
  * @return [[Integer]] [Id of class]]
  */
 function getId(){
  return $this->id;}
 /**
  * [[Function to get Department]]
  * @return [Department]] [[Department object ]]
  */
 function getDep(){
  return $this->department;}
 /**
  * [[Function to get course]]
  * @return [[Course]] [[Course object]]
  */
 function getCourse(){
  return $this->course;}
 /**
  * [[Function to get Lecturer]]
  * @return [[Lecturer]] [[Lecturer object]]
  */
 function getLec(){
  return $this->lecturer;}
 /**
  * [[Function to get Time slot]]
  * @return [[meetingTime]] [[meetingTime object]]
  */
 function getTime(){
  return $this->meetingTime;}
 /**
  * [[Function to get Room]]
  * @return [[Room]] [[Room object]]
  */
 function getRoom(){
  return $this->room;}


}

?>