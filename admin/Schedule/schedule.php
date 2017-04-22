<?php
include_once('data.php');

class schedule{
  var $entries;
  var $classnum=0;
  var $fintess=-2;
  var $fitnessChange=true;
  var $data ;
  var $conflicts=0;

  /**
   * [[Constructor]]
   * @param [[Data]] $data [[Data object]]
   */
  function schedule($data){

    $this->data = $data;
    $this->entries = array();
    $this->initialize();

  }

  /**
   * [[Function to get the data object]]
   * @return [[Data]] [[Data object of the class]]
   */
  function getData(){
    return $this->data;}
  /**
   * [[Function to get the number of conflicts]]
   * @return [[Integer]] [[Number of conflicts]]
   */
  function getNumberOfConflicts(){
    return $this->conflicts;}

  /**
   * [[Function to return entries array]]
   * @return [[Entry]] [[Array of entries ]]
   */
  function getEntries()
  {
    $this->fitnessChange = true;
    return $this->entries;
  }

  /**
   * [[Function to randamize class creation in the schedule]]
   */
  function initialize()
  {
    $dep = $this->data->getDep() ;
    foreach($dep as $one)
    {
      foreach($one->getCourse() as $course)
      {
        $class = new entry( $this->classnum++,$one->getName(),$course);
        $class->setTime($this->data->getTime()[intval((count($this->data->getTime()))*(mt_rand()/mt_getrandmax()))]);
        $class->setRoom($this->data->getRoom()[intval((count($this->data->getRoom()))*(mt_rand()/mt_getrandmax()))]);
        $class->setLecturer($this->data->getOneLec($course->getLecturer()));
        array_push($this->entries,$class);
      }
    }
  }

  /**
   * [[Function to get the fitness value]]
   * @return [[Float]] [[Fitness value]]
   */
  function getFitness(){
    if($this->fitnessChange)
    {
      $this->fitness =$this->calculateFitness();
      $this->fitnessChange= false;
    }
    return $this->fitness;
  }


  /**
   * [[Function to calculate fitness of the schedule]]
   * @return [[Float]] [[fitness value]]
   */
  function calculateFitness(){
    for ($i =0; $i<  $this->classnum; $i++)
    {
      if($this->entries[$i]->getRoom()->getCacpacity() < $this->entries[$i]->getCourse()->getSize())
        $this->conflicts++;


      if($this->entries[$i]->getCourse()->getRequest()!="null") 
        if($this->entries[$i]->getCourse()->getRequest()!=$this->entries[$i]->getRoom()->getName())
          $this->conflicts++;

      if($this->entries[$i]->getLec()->getDays()==$this->entries[$i]->getTime()->getDay())
        $this->conflicts++;

      for ($j =1; $j<  $this->classnum; $j++){
        if($this->entries[$i]->getTime()==$this->entries[$j]->getTime() &&
           $this->entries[$i]->getId()!=$this->entries[$j]->getId() ){

          if($this->entries[$i]->getRoom() == $this->entries[$j]->getRoom())
            $this->conflicts++;

          if($this->entries[$i]->getCourse()->getGroup()==$this->entries[$j]->getCourse()->getGroup() &&
             $this->entries[$i]->getDep()==$this->entries[$j]->getDep())
            $this->conflicts++;

          if($this->entries[$i]->getLec() == $this->entries[$j]->getLec())
            $this->conflicts++;
        }
      }
    }
    return pow(1/floatval($this->conflicts + 1),4);

  }

}
?>