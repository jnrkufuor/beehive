<?php
include_once("schedule.php");
class population{
  var $schedules;
  /**
   * [[Constructor of the class]]
   * @param [[Integer]] $size [[Size of the population]]
   * @param [[Array]] $data [[Array of Data]]
   */
  function population($size, $data)
  {
    $this->schedules =  array();
    for($i=0;$i< $size;$i++)
    {
      $sch = new schedule($data);
      array_push($this->schedules,$sch);
    }
  }
  /**
   * [[Returns the array of schedules ]]
   * @return [[Schedule]] [[Array of Schedules]]
   */
  function getSchedule(){
    return $this->schedules;
  }
  
  /**
   * [[Sort Function]]
   * @param  [[Integer]] $a [[Fitness of schedule]]
   * @param  [[Integer]] $b [[Fitness of schedule]]
   * @return [[Integer]] [[Result of comparison]]
   */
  function sortFit($a,$b)
  {
    if ($a->getFitness() == $b->getFitness()) return 0;
    return ($a->getFitness() > $b->getFitness())?-1:1;
  }
  
  /**
   * [[Function to sort schedules by Fitness]]
   * @return [[Schedule]] [[Array of scedules]]
   */
  function sortByFitness()
  {
     usort($this->schedules,array($this,"sortFit"));
    return $this;
  }
}

?>