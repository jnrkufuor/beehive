<?php
include_once("course.php");

class department {
  var $name ;
  var $course = array();

  /**
   * [[Constructor]]
   * @param [[String]] $name   [[Name of Department]]
   * @param [[Course]] $course [[Array of Courses]]
   */
  public function department($name,$course)
  {
    $this->name = $name;
    $this->course =$course;
  }

  /**
   * [[Function to return the department name]]
   * @return [[String]] [Name of department]]
   */
  function getName(){
   return $this->name;}
  /**
   * [[Function to return the courses ]]
   * @return [[Course]] [[Array of courses]]
   */
  function getCourse(){
   return $this->course;}
}

?>