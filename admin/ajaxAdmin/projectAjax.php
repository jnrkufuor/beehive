<?php
session_start();
include_once('users.php');
ini_set("max_execution_time", 0);
include_once("../Schedule/data.php");
include_once("../Schedule/population.php");
include_once("../Schedule/schedule.php");
include_once("../Schedule/algorithm.php");
$obj = new users();

if ($_REQUEST['cmd']!=null)
{
    $cmd=$_REQUEST['cmd'];

    if($cmd==1)
    {   
        $username=$_REQUEST['username'];
        $result=$obj->getLec($username);
        $num=$obj->fetch();

        if($num==null){
            $ob = new users();
            $details='Login Attempt Fail. username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            $results=$ob->getLec($username);
            while($one=$ob->fetch())
            { 
                $array[]=$one;  
            }
            echo json_encode($array);
        }
    }
    else if($cmd==2)
    {  
        $username=$_REQUEST['username'];
        $result=$obj->getCourse($username);
        $num=$obj->fetch();

        if($num==null){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            $results=$ob->getCourse($username);
            while($one=$ob->fetch())
            { 
                $array[]=$one;  
            }
            echo json_encode($array);
        }
    }
    else if($cmd==3)
    {  
        $username=$_REQUEST['username'];
        $result=$obj->getRoom($username);
        $num=$obj->fetch();

        if($num==null){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            $results=$ob->getRoom($username);
            while($one=$ob->fetch())
            { 
                $array[]=$one;  
            }
            echo json_encode($array);
        }
    }
    else if($cmd==4)
    {  
        $cName=$_REQUEST['cName'];
        $dep=$_REQUEST['dep'];
        $lec=$_REQUEST['lec'];
        $room=$_REQUEST['room'];
        $size=$_REQUEST['size'];
        $yg=$_REQUEST['yeargroup'];
        $cNo=$_REQUEST['cNo'];
        $username=$_REQUEST['username'];
        $result=$obj->addCourse($username,$cName,$cNo,$dep,$lec,$size,$room,$yg);
        if($result==0){
            $ob = new users();
            $details='Course Creation Fail:Coursenumber'.$cNo;
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Course Creation Success:Coursenumber'.$cNo;
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }
    else if($cmd==5)
    {  
        $lec=$_REQUEST['lec'];
        $dep=$_REQUEST['department'];
        $username=$_REQUEST['username'];
        $inavailable=$_REQUEST['inavailable'];
        $result=$obj->addLec($username,$lec,$dep,$inavailable);
        if($result==0){
            $ob = new users();
            $details='Lecturer Creation Fail:Name'.$lec;
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Lecturer Creation Success:Name'.$lec;
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }

    }
    else if($cmd==6){
        $room=$_REQUEST['room'];
        $dep=$_REQUEST['department'];
        $username=$_REQUEST['username'];
        $result=$obj->addRoom($username,$room,$dep);
        if($result==0){
            $ob = new users();
            $details='Room Creation Fail:Name'.$room;
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Room Creation Success:Name'.$room;
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }

    else if($cmd==7){
        $room=$_REQUEST['room'];
        $course=$_REQUEST['course'];
        $lec=$_REQUEST['lec'];
        $yeargroup=$_REQUEST['yeargroup'];
        $days=$_REQUEST['days'];
        $ds=$_REQUEST['day_start'];
        $de=$_REQUEST['day_end'];
        $hour=$_REQUEST['hour'];
        $minute=$_REQUEST['minute'];
        $username=$_REQUEST['username'];
        $term=$_REQUEST['term'];
        $type=$_REQUEST['type'];
        $period=$_REQUEST['period'];
        $result=$obj->addSchedule($username,$room,$course,$lec,$yeargroup,$days,$ds,$de,$hour,$minute,$type,$term,$period);
        if($result==0){
            $ob = new users();
            $details='Schedule Entry Add Fail:Yeargroup'.$yeargroup;
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Schedule Entry Add Success: Yeargroup'.$yeargroup;
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }
    else if($cmd==8)
    {  
        $username=$_REQUEST['username'];
        $result=$obj->getSchedules($username);
        $num=$obj->fetch();
        if($num==null){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            $results=$ob->getSchedules($username);
            while($one=$ob->fetch())
            { 
                $array[]=$one;  
            }
            echo json_encode($array);
        }
    }
    else if($cmd==9)
    {  
        $id= $_REQUEST['id'];
        $result=$obj->delLec($id);
        if($result==0){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }

    else if($cmd==10)
    {  
        $id= $_REQUEST['id'];
        $result=$obj->delCourse($id);
        if($result==0){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }
    else if($cmd==11)
    {  
        $id= $_REQUEST['id'];
        $result=$obj->delRoom($id);
        if($result==0){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }
    else if($cmd==12)
    {  
        $data=array();
        $data=$_REQUEST['data'];
        $username=$_REQUEST['username'];
        $result=$obj->addLecGroup($data,$username);

        if($result==0){
            $ob = new users();
            $details='Group Lec Import Fail';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Group Lec Import Success';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }

    }
    else if($cmd==13)
    {  
        $username=$_REQUEST['username'];
        $result=$obj->getSchedules($username);
        $num=$obj->fetch();

        if($num==null){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            $results=$ob->getSchedules($username);
            while($one=$ob->fetch())
            { 
                $array[]=$one;  
            }
            echo json_encode($array);
        }

    }
    else if($cmd==14)
    {  
        $data=array();
        $data=$_REQUEST['data'];
        $username=$_REQUEST['username'];
        $result=$obj->addRoomGroup($data,$username);

        if($result==0){
            $ob = new users();
            $details='Group Lec Import Fail';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Group Lec Import Success';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }

    }
    else if($cmd==15)
    {  
        $data=array();
        $data=$_REQUEST['data'];
        $username=$_REQUEST['username'];
        $result=$obj->addCourseGroup($data,$username);

        if($result==0){
            $ob = new users();
            $details='Group Course Import Fail';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Group Course Import Success';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }

    }
    else if($cmd==16)
    {  
        $id= $_REQUEST['id'];
        $result=$obj->delEntry($id);
        if($result==0){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Login Attempt Success';
            //$result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }
    else if($cmd==17){
        $ds=$_REQUEST['day_start'];
        $brk=$_REQUEST['brk'];
        $sl=$_REQUEST['slot_length'];
        $username=$_REQUEST['username'];
        $result=$obj->addCon($username,$ds,$brk,$sl);
        if($result==0){
            $ob = new users();
            $details='Constraint Add Fail';
            $result=$ob->logActivity($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Constraint Add Success';
            $result=$ob->logActivity($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }
    else if($cmd==18){
        $ds=$_REQUEST['day_start'];
        $brk=$_REQUEST['brk'];
        $sl=$_REQUEST['slot_length'];
        $username=$_REQUEST['username'];
        $result=$obj->updateCon($username,$ds,$brk,$sl);
        if($result==0){
            $ob = new users();
            $details='Constraint Update Fail';
            $result=$ob->logActivity($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='Constraint Update Success';
            $result=$ob->logActivity($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }
    else if($cmd==19){  
        $_SESSION['interval']= $_REQUEST['int'];
        $_SESSION['dayBegin']= $_REQUEST['day'];
        $_SESSION['break']= $_REQUEST['brk'];
        $_SESSION['user']= $_REQUEST['username'];
        $da = new data();
        $algo = new algorithm($da);
        $pop = new population(12,$da);
        $pop =$pop->sortByFitness();
        $generation =0;
        $successful = false;
        while($pop->getSchedule()[0]->getFitness()!=1.0)
        {
            $pop = $algo->evolve($pop)->sortByFitness();
        }
        //print_r($pop->getSchedule()[0]->getEntries());
        $successful = true;
        if($successful == true)
           echo json_encode($pop->getSchedule()[0]->getEntries());
        else
            echo '{"message":"false"}';
    }
}
?>