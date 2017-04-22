<?php
/**
*/
include_once("adb.php");
/**
*Users  class
*/
class users extends adb{

	function addUser($username,$password,$email){
		$strQuery="insert into user set
						USERNAME='$username',
						EMAIL='$email',
						PASSWORD='$password'";
		return $this->query($strQuery);				
	}
	
	function login($username,$password)
	{
		$strQuery= "SELECT username,user.id,day_start,break,slot_length FROM user LEFT JOIN constraints ON user.username=constraints.user WHERE username='$username' and password='$password'";
		return $this->query($strQuery);	
	}
    
    function getLec()
    {
    	$strQuery= "select * from lecturers";
		return $this->query($strQuery);	
    }

	function log($username,$activity)
	{
		$strQuery="insert into logs set
						USERNAME='$username',
						INFO='$activity'";
		return $this->query($strQuery);	
	}

	
}


?>




