<?php

include_once("population.php");
class algorithm {
 var $poulationSize;
 var $mutationRate;
 var $crossoverRate;
 var $tournamentSize;
 var $eliteSch;
 var $data;
 /**
  * [[Constructor of the class]]
  * @param [[data]] $data [[Array of data ]]
  */
 function algorithm($data){
  $this->data = $data;
  $this->poulationSize = 12;
  $this->mutationRate =0.15;
  $this->crossoverRate =0.9;
  $this->tournamentSize =3;
  $this->eliteSch =1;
 }

 /**
  * [[Function to crossover population]]
  * @param  [population]] $population [[population object]]
  * @return [[population]] [[crossover population object]]
  */
 function crossoverPopulation($population)
 {
  $crossoverpopulation = new population(count($population->getSchedule()),$this->data);
  for($i =0; $i <  $this->eliteSch ; $i++){
   $crossoverpopulation->getSchedule()[$i]=$population->getSchedule()[$i];
  }

  for($i =$this->eliteSch; $i < count($population->getSchedule())  ; $i++)
  {
   if ( $this->crossoverRate > (mt_rand()/mt_getrandmax()) )
   {
    $schedule1= $this->selectTournamentPopulation($population)->sortByFitness()->getSchedule()[0];
    $schedule2=$this->selectTournamentPopulation($population)->sortByFitness()->getSchedule()[0];
    $crossoverpopulation->getSchedule()[$i] = $this->crossoverSchedule($schedule1,$schedule2);
   }
   else
   {
    $crossoverpopulation->getSchedule()[$i]=$population->getSchedule()[$i];
   }
  }
  return $crossoverpopulation;
 }

 /**
  * [[Function to crossover schedules]]
  * @param  [[schedule]] $sch1 [[schedule object]]
  * @param  [[schedule]] $sch2 [[schedule object]]
  * @return [[schedule]] [[crossover schedule object]]
  */
 function crossoverSchedule($sch1,$sch2)
 {
  $crossoversch = new schedule($this->data);
  for($i=0; $i < count($crossoversch->getEntries()); $i++)
  {
   if ( 0.5 < (mt_rand()/mt_getrandmax()) )
    $crossoversch->getEntries()[$i]=$sch1->getEntries()[$i];
   else
    $crossoversch->getEntries()[$i]=$sch2->getEntries()[$i];
  }
  return $crossoversch;
 }

 /**
  * [[Function to mutate population]]
  * @param  [[population]] $population [[population object]]
  * @return [[population]] [[mutated population object]]
  */
 function mutatePopulation($population)
 {
  $mpopulation = new population(count($population->getSchedule()),$this->data);
  $schedules =  $mpopulation->getSchedule();
  for($i =0; $i <  $this->eliteSch ; $i++){
   $schedules[$i]=$population->getSchedule()[$i];
  }
  for($i =$this->eliteSch; $i <  count($population->getSchedule()) ; $i++){
   $schedules[$i]=$this->mutateSchedule($population->getSchedule()[$i]);
  }
  return $mpopulation;
 }

 /**
  * [[Function to mutate schedules]]
  * @param  [[schedule]] $sch [[schedule object]]
  * @return [[schedule]] [[mutated schedule object]]
  */
 function mutateSchedule($sch)
 {
  $mschedule = new schedule($this->data);
  for($i =0; $i < count($sch->getEntries()) ; $i++){
   if($this->mutationRate > (mt_rand()/mt_getrandmax()))
    $sch->getEntries()[$i]=$mschedule->getEntries()[$i];
  }
  return $sch;
 }

 /**
  * [[function to evolve population]]
  * @param  [[population]] $population [[population object]]
  * @return [[population]] [[population object]]
  */
 function evolve($population)
 {
  return $this->mutatePopulation($this->crossoverPopulation($population));
 }

 /**
  * [[Function to create tournament population]]
  * @param  [[population]] $population [[population object]]
  * @return [[population]] [[tournament population object]]
  */
 function selectTournamentPopulation($population)
 {
  $tournamentpop = new Population($this->tournamentSize,$this->data );
  for($i=0;$i <  $this->tournamentSize;$i++)
  {
   $index =intval(count($population->getSchedule())*(mt_rand()/mt_getrandmax()));
   $tournamentpop->getSchedule()[$i] = $population->getSchedule()[$index];
  }
  return $tournamentpop;
 }
 
 function populationReductions($population)
 { 
  
 }
}
?>