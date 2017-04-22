<?php

class room{

 var $name;
 var $capacity;

 /**
  * [[Constructor]]
  * @param [[String]] $name     [[Name of the room]]
  * @param [[Integer]] $capacity [[Capacity of the room]]
  */
 public function room($name,$capacity)
 {
  $this->name= $name;
  $this->capacity= $capacity;
 }

 /**
  * [[Function to get the name of the room]]
  * @return [[String]] [[Name of the room]]
  */
 function getName(){
  return $this->name;}
 /**
  * [[Function to get the room capacity]]
  * @return [[Integer]] [[Room Capacity]]
  */
 function getCacpacity(){
  return $this->capacity;}

}

?>