<?php
include_once('users.php');
$obj = new users();
if ($_REQUEST['cmd']!=null)
{
    $cmd=$_REQUEST['cmd'];
    if($cmd==2)
    {   

        $username=$_REQUEST['username'];
        $password=$_REQUEST['password'];
        $result=$obj->login($username,$password);
        $num=$obj->fetch();
        if($num==null){
            $ob = new users();
            $details='Login Attempt Fail. Username';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {

            $ob = new users();
            $details='Login Attempt Success';
            $result=$ob->log($username,$details);
            $result=$ob->login($username,$password);
            header('Content-Type:application/json');
            while($one=$ob->fetch())
            { 
                $array[]=$one;  
            }
            echo json_encode($array);
        }
    }
    else if($cmd==1)
    {  
        $username=$_REQUEST['username'];
        $password=$_REQUEST['password'];
        $email=$_REQUEST['email'];
        $result=$obj->addUser($username,$password,$email);
        if($result==0){
            $ob = new users();
            $details='User Creation Failure';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            $ob = new users();
            $details='User Creation Success';
            $result=$ob->log($username,$details);
            header('Content-Type:application/json');
            echo '{"message":"true"}';
        }
    }

}
?>