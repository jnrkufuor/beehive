<?php
/**
*/
include_once("adb.php");
/**
*Users  class
*/
class users extends adb{

	/**
	 * [[Description]]
	 * @param  [[Type]] $username [[Description]]
	 * @param  [[Type]] $password [[Description]]
	 * @param  [[Type]] $email    [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addUser($username,$password,$email){
		$strQuery="insert into user set
						USERNAME='$username',
						EMAIL='$email',
						PASSWORD='$password'";
		return $this->query($strQuery);				
	}



	/**
	 * [[Description]]
	 * @param  [[Type]] $user  [[Description]]
	 * @param  [[Type]] $cName [[Description]]
	 * @param  [[Type]] $cNo   [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addCourse($user,$cName,$cNo,$dep,$lec,$size,$room,$yg){
		$strQuery="insert into course set
						USER='$user',
						COURSENO='$cNo',
						COURSENAME='$cName',
						DEPARTMENT='$dep',
						LECTURER='$lec',
						SIZE='$size',
						ROOMREQ='$room',
						YEARGROUP='$yg'";
		return $this->query($strQuery);				
	}
	/**
	 * [[Description]]
	 * @param  [[Type]] $user [[Description]]
	 * @param  [[Type]] $lec  [[Description]]
	 * @param  [[Type]] $dep  [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addLec($user,$lec,$dep,$days){
		$strQuery="insert into lecturers set
						USER='$user',
						LECTURER='$lec',
						DEPARTMENT='$dep',
						INAVAILABLE='$days'";
		return $this->query($strQuery);				
	}
	/**
	 * [[Description]]
	 * @param  [[Type]] $user [[Description]]
	 * @param  [[Type]] $room [[Description]]
	 * @param  [[Type]] $dep  [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addRoom($user,$room,$dep){
		$strQuery="insert into room set
		                USER='$user',
						ROOM='$room',
						DEPARTMENT='$dep'";
		return $this->query($strQuery);				
	}
	/**
	 * [[Description]]
	 * @param  [[Type]] $user [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function getLec($user)
	{
		$strQuery= "select * from lecturers where user='$user' order by department ";
		return $this->query($strQuery);	
	}
	/**
	 * [[Description]]
	 * @param  [[Type]] $user [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function getRoom($user)
	{
		$strQuery= "select * from room where user='$user' order by  department ";
		return $this->query($strQuery);	
	}
	/**
	 * [[Description]]
	 * @param  [[Type]] $user [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function getCourse($user)
	{
		$strQuery= "select * from course where user='$user' order by courseNo ";
		return $this->query($strQuery);	
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $username [[Description]]
	 * @param  [[Type]] $activity [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function log($username,$activity)
	{
		$strQuery="insert into logs set
						USERNAME='$username',
						INFO='$activity'";
		return $this->query($strQuery);	
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $user      [[Description]]
	 * @param  [[Type]] $room      [[Description]]
	 * @param  [[Type]] $course    [[Description]]
	 * @param  [[Type]] $lec       [[Description]]
	 * @param  [[Type]] $yeargroup [[Description]]
	 * @param  [[Type]] $days      [[Description]]
	 * @param  [[Type]] $day_start [[Description]]
	 * @param  [[Type]] $day_end   [[Description]]
	 * @param  [[Type]] $hour      [[Description]]
	 * @param  [[Type]] $minute    [[Description]]
	 * @param  [[Type]] $type      [[Description]]
	 * @param  [[Type]] $term      [[Description]]
	 * @param  [[Type]] $period    [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addSchedule($user,$room,$course,$lec,$yeargroup,$days,$day_start,$day_end,$hour,$minute,$type,$term,$period){
		$strQuery="insert into schedule set
						ROOM='$room',
						USER='$user',
						COURSE='$course',
						LECTURER='$lec',
						YEARGROUP='$yeargroup',
						DAYS='$days',
						DAY_START='$day_start',
						DAY_END='$day_end',
						HOUR='$hour',
						MINUTE='$minute',
						TYPE='$type',
						TERM='$term',
						PERIOD='$period'";
		echo $strQuery;
		return $this->query($strQuery);				
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $user           [[Description]]
	 * @param  [[Type]] [$filter=false] [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function getSchedules($user,$filter=false)
	{
		if($filter){
			$strQuery= "select *,schedule.id from schedule,course where yeargroup='$filter'and schedule.course= course.CourseName and schedule.user='$$user' ";
		}
		else 
			$strQuery= "select *,schedule.id from schedule,course where schedule.course= course.CourseName and schedule.user='$user' ";
		return $this->query($strQuery);	
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $id [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function delLec($id)
	{
		$strQuery= "DELETE FROM lecturers WHERE id = '$id'";
		return $this->query($strQuery);	
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $id [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function delCourse($id)
	{
		$strQuery= "DELETE FROM course WHERE id = '$id'";
		return $this->query($strQuery);	
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $id [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function delEntry($id)
	{
		$strQuery= "DELETE FROM schedule WHERE id = '$id'";
		return $this->query($strQuery);	
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $data [[Description]]
	 * @param  [[Type]] $user [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addLecGroup($data,$user)
	{
		$sql = array(); 
		foreach( $data as $row ) {
			$sql[] = '("'.$user.'","'.$row[0].'", "'.$row[1].'")';
		}
		$strQuery='INSERT INTO lecturers (user,lecturer, department,inavailable) VALUES '.implode(',', $sql);
		return $this->query($strQuery);
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $data [[Description]]
	 * @param  [[Type]] $user [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addRoomGroup($data,$user)
	{
		$sql = array(); 
		foreach( $data as $row ) {
			$sql[] = '("'.$user.'","'.$row[0].'", "'.$row[1].'")';
		}
		$strQuery='INSERT INTO room (user,room, department) VALUES '.implode(',', $sql);
		return $this->query($strQuery);
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $data [[Description]]
	 * @param  [[Type]] $user [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addCourseGroup($data,$user)
	{
		$sql = array(); 
		foreach( $data as $row ) {
			$sql[] = '("'.$user.'","'.$row[0].'", "'.$row[1].'")';
		}
		$strQuery='INSERT INTO course (user,courseNo, courseName,lecturer,department,size,yeargroup,roomreq) VALUES '.implode(',', $sql);
		return $this->query($strQuery);
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $id [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function delRoom($id)
	{
		$strQuery= "DELETE FROM room WHERE id = '$id'";
		return $this->query($strQuery);	
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $username [[Description]]
	 * @param  [[Type]] $ds       [[Description]]
	 * @param  [[Type]] $brk      [[Description]]
	 * @param  [[Type]] $sl       [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function addCon($username,$ds,$brk,$sl)
	{
		$strQuery="insert into constraints set
		                USER='$username',
						DAY_START='$ds',
						BREAK='$brk',
						SLOT_LENGTH='$sl'";
		return $this->query($strQuery);		
	}

	/**
	 * [[Description]]
	 * @param  [[Type]] $id  [[Description]]
	 * @param  [[Type]] $ds  [[Description]]
	 * @param  [[Type]] $brk [[Description]]
	 * @param  [[Type]] $sl  [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function updateCon($id,$ds,$brk,$sl)
	{
		$strQuery="UPDATE constraints SET 
						day_start = '$ds', 
						break = '$brk',
						slot_length= '$sl' WHERE constraints.user = '$id'";
		return $this->query($strQuery);		
	}
/**
 * [[Description]]
 * @param  [[Type]] $username [[Description]]
 * @param  [[Type]] $activity [[Description]]
 * @return [[Type]] [[Description]]
 */
	function logActivity($username,$activity)
	{
		$strQuery="insert into activity set
						USER='$username',
						INFO='$activity'";
		return $this->query($strQuery);	
	}
	
	/**
	 * [[Description]]
	 * @param  [[Type]] $username [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function getDep($username)
	{
		$strQuery="SELECT department FROM course where user ='$username' order by department";
		return $this->query($strQuery);	
	}
		
	/**
	 * [[Description]]
	 * @param  [[Type]] $username [[Description]]
	 * @param  [[Type]] $dep      [[Description]]
	 * @return [[Type]] [[Description]]
	 */
	function getCourseByDep($username,$dep){
		$strQuery="SELECT * FROM course where user ='$username' and department ='$dep' order by department";
		
		return $this->query($strQuery);	
	}

	
}


?>




