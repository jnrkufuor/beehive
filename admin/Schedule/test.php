<?php
ini_set("max_execution_time", 0);
include_once("data.php");
include_once("population.php");
include_once("schedule.php");
include_once("algorithm.php");
session_start();
$_SESSION['user']='ernie';
$_SESSION['interval']= 90;
$_SESSION['dayBegin']= 8;
$_SESSION['break']= 10;

$da = new data();
$sc = new schedule($da);
$algo = new algorithm($da);
$pop = new population(8,$da);
$pop =$pop->sortByFitness();
$generation =0;
while($pop->getSchedule()[0]->getFitness()!=1.0)
{
 echo "Generation: ".$generation++. "<br>";
 echo "Fitness:".$pop->getSchedule()[0]->getFitness()." Conflicts:".$pop->getSchedule()[0]->getNumberOfConflicts(). "<br>";
 $pop = $algo->evolve($pop)->sortByFitness();
}
//echo '{"message":"Schedule was Successfully generated","result":"0"}';
print_r(json_encode($pop->getSchedule()[0]->getEntries()));

?>