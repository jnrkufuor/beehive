<?php

class lecturer {

  var $id;
  var $name;
  var $days;
  /**
   * [[Constructor]]
   * @param [[Integer]] $id   [[Id of the lecturer]]
   * @param [[String]]  $name [[Name of the lecturer]]
   * @param [[String]]    $days [[Days Lecturer is not available]]
   */
  public function lecturer($id,$name,$days)
  {
    $this->id=$id;
    $this->name=$name;
    $this->days=$days;
  }

  /**
   * [[Function to return the id of the lecturer]]
   * @return [[Integer]] [[Lecturer id]]
   */
  function getId(){
   return $this->id;}
  /**
   * [[Function to return the name of the lecturer]]
   * @return [[String]] [[Name of the lecturer]]
   */
  function getName(){
   return $this->name;}
 
 /**
  * [[Function to return days lecturer is not available]]
  * @return [[String]] [[Days lecturer is not available]]
  */
 function getDays(){
  return $this->days;
 }
}


?>