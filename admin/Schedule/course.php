<?php

class course {
    var $courseName;
    var $courseNo ;
    var $maxSize;
    var $instructors ;
    var $yg;
    var $room; 
    /**
     * [[Constructor]]
     * @param [[String]] $name       [[Name of the course]]
     * @param [[String]] $number     [[Course Number]]
     * @param [[String]] $instructor [[Lecturer for that course]]
     * @param [[Integer]] $size       [[Size of the class]]
     * @param [[String]] $yg         [[Yeargroup for the course]]
     * @param [[String]] $roomreq    [[Room Requirement]]
     */
    public function course($name, $number, $instructor,$size,$yg,$roomreq )
    {
        $this->courseName = $name;
        $this->courseNo= $number;
        $this->maxSize = $size;
        $this->instructors= $instructor;
        $this->yg = $yg;
        $this->room = $roomreq;
    }

    /**
     * [[Function to get the name of the lecturer]]
     * @return [[String]] [[Lecturer Name]]
     */
    function getName(){
     return $this->courseName;}
    /**
     * [[Function to get the course number]]
     * @return [[String]] [[Course Number]]
     */
    function getNumber(){
     return $this->courseNo;}
    /**
     * [[Function to get Class Size]]
     * @return [[Integer]] [[Class size]]
     */
    function getSize(){
     return $this->maxSize;}
    /**
     * [[Function to get the lecturer of the course]]
     * @return [[String]] [[lecturer of the course]]
     */
    function getLecturer(){
     return $this->instructors;}
    /**
     * [[Function to return the yeargroup]]
     * @return [[String]] [[Yeargroup taking the course]]
     */
    function getGroup(){
     return $this->yg;}
    /**
     * [[Function to return the room request]]
     * @return [[String]] [[Room request]]
     */
    function getRequest(){
     return $this->room;}

}

?>