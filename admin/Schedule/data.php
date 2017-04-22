<?php
include_once("../ajaxAdmin/users.php");
include_once("entry.php");
include_once("course.php");
include_once("department.php");
include_once("lecturer.php");
include_once("meetingTime.php");
include_once("room.php");

class data {
 var $course=array();
 var $department=array();
 var $meetingTime=array();
 var $rooms=array();
 var $classNo;
 var $lecs= array();
 var $username ="ernie";
 // var $username = $_SESSION['user'];

 /**
    * [[Constructor of the class]]
    */
 function data(){ $this->init();}

 /**
    * [[Function to initialize data]]
    * @return [[data]] [[data object]]
    */
 function init()
 {
  $this->fillRooms();
  $this->fillCourses();
  $this->fillTimes();
  $this->fillLecs();
  $this->fillDep();
  $this->classNo = count($this->course);
  return $this;
 }

 /**
  * [[Function to get departments]]
  * @return [[Department]] [[Array of departments]]
  */
 function getDep(){
  return $this->department;}
 /**
  * [[Function to get classes]]
  * @return [[Course]] [[Array of courses]]
  */
 function getCourse(){
  return $this->course;}
 
 /**
  * [[Function to get meetingTime]]
  * @return [[meetingTime]] [[Array of meeting times]]
  */
 function getTime(){
  return $this->meetingTime;}
 /**
  * [[Function to get rooms]]
  * @return [[room]] [[Array of rooms]]
  */
 function getRoom(){
  return $this->rooms;}
 /**
  * [[Function to get the class number]]
  * @return [[Integer]] [[Number of classes within the schedule.]]
  */
 function getClassNumber(){
  return $this->classNo;}

 /**
  * [[Function to get Lec array]]
  * @return [[Lecturer]] [[Array of Lecturer Objects]]
  */
 function getLec(){
  return $this->lecs;
 }
 /**
    * [[Function to fill the room array]]
    */
 function fillRooms()
 {
  $user = new users();
  $result = $user->getRoom($this->username);
  while($one=$user->fetch())
  { 
   $array[]=$one;  
  }
  foreach($array as $one)
  {
   $room = new room($one['room'],$one['capacity']);
   array_push($this->rooms, $room);
  }
 }

 /**
  * [[Function to get one Lecturer object]]
  * @param  [[String]] $name [[name of lecturer]]
  * @return [[Lecturer]] [[Lecturer Object]]
  */
 function getOneLec($name)
 {
  for ($i=0;$i<count($this->lecs);$i++)
  {
   if( $this->lecs[$i]->getName()==$name)
   {
    return $this->lecs[$i];
   }
  }
  return null;
 }

 
 function fillLecs()
 {
  $user = new users();
  $result = $user->getLec($this->username);
  while($one=$user->fetch())
  { 
   $array[]=$one;  
  }
  
  foreach($array as $one)
  {
   $lec = new Lecturer($one['id'],$one['lecturer'],$one['Inavailable']);
   array_push($this->lecs, $lec);
  }
 }
 /**
    * [[Function to fill the department array]]
    */
 function fillDep()
 {
  $user = new users();
  $result = $user->getDep($this->username);
  while($one=$user->fetch())
  { 
   $array[]=$one;  
  }
  $current = null;
  foreach($array as $one)
  {
   $obj = new users();
   $result = $obj->getCourseByDep($this->username,$one['department']);
   if($current ==null){
    $set =array();
    while($single=$obj->fetch())
    { 
     $set[]=new course($single["courseName"],$single['courseNo'],$single['lecturer'],$single['size']
                       ,$single['yeargroup'],$single['roomreq']);

    }
    $dep = new department($one['department'],$set);
    array_push($this->department, $dep);
    $current = $one['department'];
   }
   else if($current!=$one['department']){
    $set =array();
    while($single=$obj->fetch())
    { 

     $set[]=new course($single["courseName"],$single['courseNo'],$single['lecturer'],$single['size']
                       ,$single['yeargroup'],$single['roomreq']); 

    }
    $dep = new department($one['department'],$set);
    array_push($this->department, $dep);
    $current=$one['department'];
   }
  }
 }


 /**
    * [[Function to fill the course array]]
    */
 function fillCourses()
 {
  $user = new users();
  $result = $user->getCourse($this->username);
  while($one=$user->fetch())
  { 
   $array[]=$one;  
  }
  foreach($array as $one)
  {
   $courses = new course($one['courseName'],$one['courseNo'],$one['lecturer'],$one['size']
                         ,$one['yeargroup'],$one['roomreq']);
   array_push($this->course, $courses);
  }
 }




 /**
    * [[Function to fill the meeting Time array]]
    */
 function fillTimes() {
  $hours;
  $minutes;
  $ampm;
  $interval = intval($_SESSION['interval']);
  $i =  intval(substr($_SESSION['dayBegin'],0,2));
  $index=60*$i;  
  $brk =intval($_SESSION['break']);
  $count =1;
  $day = array("MW","TH","F");
  for ($j = 0 ; $j < count($day);$j++){
   for( $i = $index; $i <= 1140; $i += $interval){
    $hours = floor($i / 60);

    $minutes = $i % 60;
    if ($minutes < 10){
     $minutes = '0'.$minutes; 
    }

    $hours = $hours % 24;
    if ($hours === 0){
     $hours = 12;
    }
    if ($hours < 10){
     $hours = '0'.$hours; 
    }
    $slot = ($hours.":".$minutes);
    $mtime = new meetingTime($slot,$day[$j]);
    array_push($this->meetingTime,$mtime);
    $i+=$brk;
    $count += 1;
   }
  }
 }
}

?>