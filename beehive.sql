-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2017 at 02:38 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beehive`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `activity` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `user`, `activity`, `date`) VALUES
(1, 'ernie', 'Room Creation Success:Name301', '2017-04-27 04:19:48'),
(2, 'Emile', 'Group Lec Import Success', '2017-04-27 04:56:31'),
(3, 'Emile', 'Group Lec Import Success', '2017-04-27 05:00:42'),
(4, 'Emile', 'Group Course Import Success', '2017-04-27 05:03:13'),
(5, 'Emile', 'Constraint Add Success', '2017-04-27 05:06:43');

-- --------------------------------------------------------

--
-- Table structure for table `constraints`
--

CREATE TABLE `constraints` (
  `user` varchar(255) NOT NULL,
  `day_start` varchar(255) NOT NULL,
  `break` bigint(20) NOT NULL,
  `slot_length` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `constraints`
--

INSERT INTO `constraints` (`user`, `day_start`, `break`, `slot_length`) VALUES
('david', '08:00', 10, 90),
('Emile', '08:00', 10, 30),
('ernie', '08:00', 10, 90),
('jaycuffs', '08:30', 10, 90);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `department` enum('Computer Science','Business Administration','Engineering','Arts and Sciences') NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `courseNo` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `lecturer` varchar(255) NOT NULL,
  `yeargroup` set('YEAR1','YEAR2','YEAR3','YEAR4','NONE') NOT NULL,
  `roomreq` varchar(255) DEFAULT NULL,
  `type` enum('Dis','Lec','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `user`, `department`, `courseName`, `courseNo`, `size`, `lecturer`, `yeargroup`, `roomreq`, `type`) VALUES
(10, 'ernie', 'Computer Science', 'Introduction To Programming', 'CS101', 32, 'Aelaf Dafla', 'YEAR1', 'null', 'Dis'),
(13, 'ernie', 'Computer Science', 'Networks', 'CS414', 78, 'David Sampah', 'YEAR2', '217', 'Lec'),
(14, 'ernie', 'Computer Science', 'Intermediate Programming', 'CS212', 30, 'Ayokor Korsah', 'YEAR3', 'null', 'Lec'),
(15, 'ernie', 'Business Administration', 'Business Law', 'BA441', 70, 'Nathan Amanquah', 'YEAR4', '218', 'Lec'),
(16, 'ernie', 'Engineering', 'Physics', 'EE101', 40, 'Aelaf Dafla', 'YEAR1', 'null', 'Dis'),
(20, 'ernie', 'Computer Science', 'Negotiation', 'BA121', 40, 'Sena Baeta', 'YEAR2', 'null', 'Lec'),
(21, 'ernie', 'Business Administration', 'Branding', 'BA222', 30, 'Joojo Spio', 'YEAR4', 'null', 'Lec'),
(22, 'ernie', 'Business Administration', 'Operations Management', 'BA331', 40, 'Joojo Spio', 'NONE', 'null', 'Lec'),
(23, 'ernie', 'Arts and Sciences', 'Music and Dance', 'BA123', 40, 'Sena Baeta', 'NONE', 'null', 'Dis');

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

CREATE TABLE `lecturers` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `lecturer` varchar(255) NOT NULL,
  `Department` varchar(255) NOT NULL,
  `Inavailable` enum('MW','TH','F','') NOT NULL,
  `after_five` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`id`, `user`, `lecturer`, `Department`, `Inavailable`, `after_five`) VALUES
(26, 'ernie', 'Ayokor Korsah', 'CS', 'F', 0),
(27, 'ernie', 'Nathan Amanquah', 'CS', 'MW', 0),
(29, 'ernie', 'Aelaf Dafla', 'CS', '', 0),
(30, 'ernie', 'David Sampah', 'CS', 'F', 0),
(33, 'ernie', 'Joojo Spio', 'BA', 'TH', 0),
(34, 'ernie', 'Sena Baeta', 'BA', '', 0),
(37, 'ernie', 'Jeffrey Somuah', 'Computer Science', 'TH', 0),
(38, 'ernie', 'Mr Robert Kiyosaki', 'Computer Science', 'F', 0);

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `USERNAME` varchar(255) NOT NULL,
  `info` text NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `USERNAME`, `info`, `Date`) VALUES
(1, '', 'User Created Successfully. Username:username', '2017-02-06 14:47:26'),
(2, '', 'User Created Successfully. Username:username', '2017-02-06 17:59:12'),
(3, '', 'User Created Successfully. Username:Ernest', '2017-02-08 16:09:49'),
(4, '', 'User Add Attempt Fail', '2017-02-08 16:15:03'),
(5, '', 'User Add Attempt Fail', '2017-02-08 16:15:26'),
(6, '', 'Login Attempt Fail. Username', '2017-02-08 16:25:57'),
(7, '', 'User Add Attempt Fail', '2017-02-08 16:28:12'),
(8, '', 'User Add Attempt Fail', '2017-02-08 16:28:14'),
(9, '', 'User Add Attempt Fail', '2017-02-08 16:28:29'),
(10, '', 'Login Attempt Fail. Username', '2017-02-08 16:29:31'),
(11, '', 'User Created Successfully. Username:ernie', '2017-02-08 16:30:16'),
(12, '', 'Login Attempt Fail. Username', '2017-02-08 16:30:27'),
(13, '', 'Login Attempt Fail. Username', '2017-02-08 16:31:51'),
(14, '', 'Login Attempt Fail. Username', '2017-02-08 16:32:00'),
(15, '', 'Login Attempt Fail. Username', '2017-02-08 16:32:39'),
(16, '', 'Login Attempt Success', '2017-02-08 16:34:12'),
(17, '', 'Login Attempt Success', '2017-02-08 16:35:47'),
(18, '', 'Login Attempt Success', '2017-02-08 16:49:14'),
(19, '', 'Login Attempt Success', '2017-02-08 16:49:36'),
(20, '', 'Login Attempt Success', '2017-02-08 17:01:46'),
(21, '', 'Login Attempt Success', '2017-02-08 17:02:35'),
(22, '', 'Login Attempt Success', '2017-02-08 17:02:49'),
(23, '', 'Login Attempt Success', '2017-02-08 17:10:26'),
(24, '', 'Login Attempt Success', '2017-02-08 18:25:12'),
(25, '', 'Login Attempt Success', '2017-02-08 18:25:23'),
(26, '', 'Login Attempt Success', '2017-02-08 22:39:34'),
(27, '', 'Login Attempt Success', '2017-02-09 16:16:55'),
(28, '', 'Login Attempt Success', '2017-02-11 15:10:40'),
(29, '', 'Login Attempt Success', '2017-02-13 12:39:19'),
(30, '', 'Login Attempt Success', '2017-02-13 12:40:21'),
(31, '', 'Login Attempt Success', '2017-02-13 12:40:23'),
(32, '', 'Login Attempt Success', '2017-02-13 12:40:32'),
(33, '', 'Login Attempt Success', '2017-02-13 12:44:12'),
(34, '', 'Login Attempt Success', '2017-02-13 12:44:54'),
(35, '', 'Login Attempt Success', '2017-02-13 12:45:35'),
(36, '', 'Login Attempt Success', '2017-02-13 12:46:10'),
(37, '', 'Login Attempt Success', '2017-02-13 12:46:57'),
(38, '', 'Login Attempt Success', '2017-02-13 12:47:19'),
(39, '', 'Login Attempt Success', '2017-02-13 12:47:32'),
(40, '', 'Login Attempt Success', '2017-02-13 13:02:50'),
(41, '', 'Login Attempt Success', '2017-02-13 13:03:13'),
(42, '', 'Login Attempt Success', '2017-02-13 13:03:59'),
(43, '', 'Login Attempt Success', '2017-02-13 13:04:15'),
(44, '', 'Login Attempt Success', '2017-02-13 13:04:42'),
(45, '', 'Login Attempt Success', '2017-02-13 13:04:57'),
(46, '', 'Login Attempt Success', '2017-02-13 14:02:19'),
(47, '', 'Login Attempt Success', '2017-02-13 22:26:31'),
(48, '', 'Login Attempt Success', '2017-02-13 22:36:18'),
(49, '', 'Login Attempt Success', '2017-02-17 11:55:25'),
(50, '', 'Room Creation Success:Name', '2017-02-17 14:01:11'),
(51, '', 'Room Creation Success:Name', '2017-02-17 14:01:15'),
(52, '', 'Room Creation Success:Name', '2017-02-17 14:01:17'),
(53, '', 'Room Creation Success:Name116', '2017-02-17 14:05:20'),
(54, '', 'Room Creation Success:NameMutolsky Hall', '2017-02-17 14:06:46'),
(55, 'ernie', 'Room Creation Success:NameLH 117', '2017-02-17 14:17:33'),
(59, 'ernie', 'Room Creation Success:NameLH 218', '2017-02-17 14:36:16'),
(60, 'ernie', 'Room Creation Success:Name204', '2017-02-17 14:36:52'),
(61, 'ernie', 'Course Creation Success:CoursenumberCS201', '2017-02-17 15:17:49'),
(62, 'ernie', 'Course Creation Fail:CoursenumberCS201', '2017-02-17 15:19:29'),
(63, 'ernie', 'Course Creation Fail:CoursenumberCS201', '2017-02-17 15:20:05'),
(64, 'ernie', 'Room Creation Success:Name', '2017-02-17 15:26:54'),
(65, 'ernie', 'Room Creation Fail:Name', '2017-02-17 15:37:25'),
(66, 'ernie', 'Room Creation Fail:Name', '2017-02-17 15:37:28'),
(67, 'ernie', 'Room Creation Fail:Name', '2017-02-17 15:37:41'),
(68, 'ernie', 'Room Creation Fail:NameLH 218', '2017-02-17 15:38:27'),
(69, 'ernie', 'Lecturer Creation Success:NameMrs. Akoa Mensah', '2017-02-17 15:49:16'),
(70, 'ernie', 'Course Creation Fail:CoursenumberCS201', '2017-02-17 15:50:21'),
(71, 'ernie', 'Login Attempt Success', '2017-02-19 16:06:29'),
(72, 'ernie', 'Login Attempt Success', '2017-02-19 19:09:52'),
(73, 'ernie', 'Login Attempt Success', '2017-02-19 22:30:40'),
(74, 'ernie', 'Login Attempt Success', '2017-02-19 22:32:53'),
(75, '', 'Lecturer Creation Success:Name', '2017-02-20 02:11:01'),
(76, '', 'Course Creation Success:Coursenumber', '2017-02-20 02:11:01'),
(77, 'ernie', 'Schedule Entry Add Success: Yeargroup2017-02-21T19:40:00', '2017-02-20 02:44:56'),
(78, 'ernie', 'Schedule Entry Add Success: YeargroupYear 3', '2017-02-20 02:48:02'),
(79, 'ernie', 'Schedule Entry Add Success: YeargroupYear 3', '2017-02-20 03:16:16'),
(80, 'ernie', 'Schedule Entry Add Success: YeargroupYear 4', '2017-02-20 03:21:32'),
(81, 'ernie', 'Login Attempt Success', '2017-02-20 11:38:07'),
(82, 'ernie', 'Login Attempt Success', '2017-02-20 11:52:49'),
(83, 'ernie', 'Login Attempt Success', '2017-02-20 12:00:20'),
(84, 'ernie', 'Room Creation Success:NameLH 116', '2017-02-20 12:43:07'),
(85, 'ernie', 'Room Creation Success:NameLH 217', '2017-02-20 12:47:23'),
(86, 'ernie', 'Course Creation Success:CoursenumberCS 301', '2017-02-20 13:06:51'),
(87, 'ernie', 'Course Creation Success:CoursenumberCS441', '2017-02-20 13:07:13'),
(88, 'ernie', 'Course Creation Success:CoursenumberBA221', '2017-02-20 13:08:01'),
(89, 'ernie', 'Course Creation Success:CoursenumberBA443', '2017-02-20 13:08:18'),
(90, 'ernie', 'Course Creation Success:CoursenumberBA332', '2017-02-20 13:08:31'),
(91, 'ernie', 'Course Creation Success:CoursenumberENG112', '2017-02-20 13:09:13'),
(92, 'ernie', 'Schedule Entry Add Success: YeargroupYear 2', '2017-02-20 13:11:03'),
(93, 'ernie', 'Schedule Entry Add Success: YeargroupYear 2', '2017-02-20 13:11:11'),
(94, 'ernie', 'Schedule Entry Add Success: YeargroupYear 2', '2017-02-20 13:11:23'),
(95, 'ernie', 'Schedule Entry Add Success: YeargroupYear 2', '2017-02-20 13:11:38'),
(96, 'ernie', 'Schedule Entry Add Success: YeargroupYear 4', '2017-02-20 13:11:50'),
(97, 'ernie', 'Schedule Entry Add Success: YeargroupYear 4', '2017-02-20 13:12:03'),
(98, 'ernie', 'Schedule Entry Add Success: YeargroupYear 3', '2017-02-20 13:12:16'),
(99, 'david', 'Login Attempt Success', '2017-02-20 15:00:27'),
(100, 'david', 'Login Attempt Success', '2017-02-20 15:00:37'),
(101, 'ernie', 'Login Attempt Fail. Username', '2017-02-20 15:01:16'),
(102, 'ernie', 'Login Attempt Success', '2017-02-20 15:01:20'),
(103, 'ernie', 'Login Attempt Success', '2017-02-20 15:02:04'),
(104, 'ernie', 'Login Attempt Success', '2017-02-20 16:07:47'),
(105, 'ernie', 'Login Attempt Success', '2017-02-20 16:38:03'),
(106, 'ernie', 'Schedule Entry Add Success: YeargroupYear 2', '2017-02-20 16:41:24'),
(107, 'ernie', 'Schedule Entry Add Success: YeargroupYear 2', '2017-02-20 16:41:33'),
(108, 'ernie', 'Schedule Entry Add Success: YeargroupYear 4', '2017-02-20 22:43:57'),
(109, 'ernie', 'Schedule Entry Add Success: YeargroupYear 4', '2017-02-20 22:44:15'),
(110, 'ernie', 'Schedule Entry Add Success: YeargroupYear 3', '2017-02-22 00:48:03'),
(111, 'ernie', 'Login Attempt Success', '2017-02-22 19:57:53'),
(112, 'ernie', 'Group Room Import Fail', '2017-02-23 00:53:31'),
(113, 'ernie', 'Login Attempt Success', '2017-03-06 13:38:10'),
(114, 'ernie', 'Login Attempt Fail. Username', '2017-03-06 13:38:52'),
(115, 'ernie', 'Login Attempt Success', '2017-03-06 13:38:57'),
(116, 'ernie', 'Group Room Import Fail', '2017-03-06 14:05:31'),
(117, 'ernie', 'Group Room Import Fail', '2017-03-06 14:06:18'),
(118, 'ernie', 'Group Room Import Fail', '2017-03-06 14:08:21'),
(119, 'ernie', 'Group Room Import Fail', '2017-03-06 14:16:18'),
(120, 'ernie', 'Group Room Import Fail', '2017-03-06 14:17:23'),
(121, 'ernie', 'Group Room Import Fail', '2017-03-06 14:18:14'),
(122, 'ernie', 'Group Room Import Fail', '2017-03-06 14:19:13'),
(123, 'ernie', 'Group Room Import Fail', '2017-03-06 14:19:47'),
(124, 'ernie', 'Group Room Import Fail', '2017-03-06 14:28:02'),
(125, 'ernie', 'Group Room Import Fail', '2017-03-06 14:35:56'),
(126, 'ernie', 'Group Room Import Fail', '2017-03-06 14:36:21'),
(127, 'ernie', 'Group Room Import Fail', '2017-03-06 14:37:29'),
(128, 'ernie', 'Group Room Import Fail', '2017-03-06 14:38:24'),
(129, 'ernie', 'Group Room Import Fail', '2017-03-06 14:40:01'),
(130, 'ernie', 'Group Room Import Fail', '2017-03-06 14:41:37'),
(131, 'ernie', 'Group Room Import Fail', '2017-03-06 14:44:11'),
(132, 'ernie', 'Group Room Import Fail', '2017-03-06 14:44:59'),
(133, 'ernie', 'Group Room Import Fail', '2017-03-06 14:47:33'),
(134, 'ernie', 'Group Room Import Fail', '2017-03-06 14:48:25'),
(135, 'ernie', 'Group Room Import Fail', '2017-03-06 14:50:45'),
(136, 'ernie', 'Group Room Import Fail', '2017-03-06 15:02:22'),
(137, 'ernie', 'Group Room Import Fail', '2017-03-06 15:08:39'),
(138, 'ernie', 'Group Room Import Fail', '2017-03-06 15:13:55'),
(139, 'ernie', 'Group Room Import Fail', '2017-03-06 15:14:52'),
(140, 'ernie', 'Group Room Import Success', '2017-03-06 15:20:12'),
(141, 'ernie', 'Group Lec Import Fail', '2017-03-06 15:21:06'),
(142, 'ernie', 'Login Attempt Success', '2017-03-06 19:04:39'),
(143, 'ernie', 'Group Lec Import Fail', '2017-03-06 21:13:26'),
(144, 'ernie', 'Group Lec Import Fail', '2017-03-06 21:15:25'),
(145, 'ernie', 'Group Lec Import Fail', '2017-03-06 21:32:31'),
(146, 'ernie', 'Group Lec Import Fail', '2017-03-06 21:32:43'),
(147, 'ernie', 'Group Lec Import Success', '2017-03-06 21:32:54'),
(148, 'ernie', 'Login Attempt Success', '2017-03-06 22:51:51'),
(149, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 2', '2017-03-07 00:03:22'),
(150, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 1', '2017-03-07 00:03:59'),
(151, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 1', '2017-03-07 00:04:12'),
(152, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 1', '2017-03-07 00:04:21'),
(153, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 1', '2017-03-07 12:53:10'),
(154, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 1', '2017-03-07 12:53:26'),
(155, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 1', '2017-03-07 12:54:14'),
(156, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 1', '2017-03-07 12:54:55'),
(157, 'undefined', 'Schedule Entry Add Fail:YeargroupYear 2', '2017-03-09 13:30:39'),
(158, 'undefined', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 14:31:07'),
(159, 'undefined', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 14:31:51'),
(160, 'undefined', 'Schedule Entry Add Fail:YeargroupYear 2', '2017-03-09 14:35:43'),
(161, 'undefined', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 14:37:07'),
(162, 'undefined', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 14:42:39'),
(163, 'ernie', 'Login Attempt Success', '2017-03-09 15:02:27'),
(164, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 15:03:44'),
(165, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 15:05:33'),
(166, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 15:05:35'),
(167, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 15:50:29'),
(168, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 15:52:59'),
(169, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 15:53:28'),
(170, 'ernie', 'Schedule Entry Add Fail:YeargroupYear 3', '2017-03-09 15:58:37'),
(171, 'ernie', 'Schedule Entry Add Success: YeargroupYear 4', '2017-03-09 15:59:40'),
(172, 'ernie', 'Login Attempt Success', '2017-03-10 12:44:27'),
(173, 'ernie', 'Login Attempt Success', '2017-03-10 13:48:26'),
(174, 'ernie', 'Schedule Entry Add Fail:Yeargroup', '2017-03-10 13:49:04'),
(175, 'ernie', 'Schedule Entry Add Fail:Yeargroup', '2017-03-10 13:49:07'),
(176, 'ernie', 'Schedule Entry Add Fail:Yeargroup', '2017-03-10 13:49:30'),
(177, 'ernie', 'Login Attempt Fail. Username', '2017-03-10 14:10:42'),
(178, 'ernie', 'Login Attempt Fail. Username', '2017-03-10 14:13:29'),
(179, 'ernie', 'Login Attempt Fail. Username', '2017-03-10 14:13:32'),
(180, 'ernie', 'Login Attempt Success', '2017-03-10 14:35:44'),
(181, 'ernie', 'Login Attempt Success', '2017-03-10 14:36:51'),
(182, 'ernie', 'Login Attempt Success', '2017-03-10 14:37:37'),
(183, 'ernie', 'Login Attempt Success', '2017-03-10 14:38:36'),
(184, 'ernie', 'Login Attempt Success', '2017-03-10 14:38:41'),
(185, 'ernie', 'Login Attempt Fail. Username', '2017-03-10 14:39:46'),
(186, 'ernie', 'Login Attempt Success', '2017-03-10 14:39:49'),
(187, 'ernie', 'Login Attempt Success', '2017-03-10 14:40:12'),
(188, 'ernie', 'Login Attempt Success', '2017-03-10 14:53:03'),
(189, 'david', 'Login Attempt Success', '2017-03-10 14:55:30'),
(190, 'david', 'Login Attempt Success', '2017-03-10 15:00:54'),
(191, 'jaycuffs', 'Login Attempt Success', '2017-03-10 15:01:39'),
(192, 'ernie', 'Login Attempt Success', '2017-03-10 15:03:40'),
(193, 'ernie', 'Login Attempt Success', '2017-03-10 15:24:53'),
(194, 'jaycuffs', 'Login Attempt Fail. Username', '2017-03-10 15:37:45'),
(195, 'jaycuffs', 'Login Attempt Success', '2017-03-10 15:37:51'),
(196, 'david', 'Login Attempt Success', '2017-03-10 15:39:03'),
(197, 'ernie', 'Login Attempt Success', '2017-03-10 15:39:58'),
(198, 'ernie', 'Course Creation Success:CoursenumberCS221', '2017-03-10 16:27:41'),
(199, 'ernie', 'Lecturer Creation Success:NameDr Ezer Yeboah-Boateng', '2017-03-10 16:34:49'),
(200, 'ernie', 'Group Lec Import Fail', '2017-03-10 16:35:09'),
(201, 'ernie', 'Group Lec Import Fail', '2017-03-10 16:36:26'),
(202, 'ernie', 'Group Lec Import Fail', '2017-03-10 16:38:50'),
(203, 'ernie', 'Group Lec Import Success', '2017-03-10 16:40:18'),
(204, 'ernie', 'Room Creation Success:NameLH 201', '2017-03-10 16:44:46'),
(205, 'ernie', 'Group Lec Import Success', '2017-03-10 16:45:46'),
(206, 'ernie', 'Schedule Entry Add Success: YeargroupYear 1', '2017-03-10 16:56:07'),
(207, 'david', 'Login Attempt Success', '2017-03-10 17:04:15'),
(208, 'david', 'Group Lec Import Fail', '2017-03-10 17:05:33'),
(209, 'david', 'Group Lec Import Fail', '2017-03-10 17:06:32'),
(210, 'david', 'Group Lec Import Fail', '2017-03-10 17:07:59'),
(211, 'david', 'Group Lec Import Success', '2017-03-10 18:28:54'),
(212, 'david', 'Course Creation Success:CoursenumberCS112`', '2017-03-10 18:29:20'),
(213, 'david', 'Room Creation Success:NameLH 212', '2017-03-10 18:29:49'),
(214, 'david', 'Schedule Entry Add Success: YeargroupYear 1', '2017-03-10 18:30:27'),
(215, 'ernie', 'Login Attempt Success', '2017-03-10 18:36:56'),
(216, 'ernie', 'Group Lec Import Success', '2017-03-10 18:37:09'),
(217, 'ernie', 'Group Lec Import Success', '2017-03-10 18:44:10'),
(218, 'ernie', 'Group Lec Import Fail', '2017-03-10 18:52:45'),
(219, 'ernie', 'Group Lec Import Success', '2017-03-10 18:54:25'),
(220, 'ernie', 'Group Lec Import Success', '2017-03-10 18:59:50'),
(221, 'ernie', 'Group Lec Import Fail', '2017-03-10 19:10:45'),
(222, 'ernie', 'Group Lec Import Fail', '2017-03-10 19:12:40'),
(223, 'ernie', 'Login Attempt Success', '2017-03-10 19:15:56'),
(224, 'ernie', 'Group Lec Import Fail', '2017-03-10 19:16:05'),
(225, 'ernie', 'Group Lec Import Fail', '2017-03-10 19:16:12'),
(226, 'ernie', 'Group Lec Import Success', '2017-03-10 19:16:36'),
(227, 'ernie', 'Group Lec Import Success', '2017-03-10 19:16:42'),
(228, 'ernie', 'Group Lec Import Success', '2017-03-10 19:32:49'),
(229, 'ernie', 'Login Attempt Success', '2017-03-21 20:38:41'),
(230, 'ernie', 'Login Attempt Success', '2017-03-21 20:57:22'),
(231, 'david', 'Login Attempt Success', '2017-03-21 22:46:41'),
(232, 'ernie', 'Login Attempt Success', '2017-03-22 14:02:57'),
(233, 'ernie', 'Room Creation Success:NameLH 217', '2017-03-22 14:06:24'),
(234, 'ernie', 'Course Creation Success:CoursenumberCS101', '2017-03-22 14:07:27'),
(235, 'ernie', 'Course Creation Success:CoursenumberCS201', '2017-03-22 14:07:50'),
(236, 'ernie', 'Course Creation Success:CoursenumberCS 414', '2017-03-22 14:08:11'),
(237, 'ernie', 'Schedule Entry Add Success: YeargroupNone', '2017-03-22 14:10:32'),
(238, 'ernie', 'Schedule Entry Add Success: YeargroupYear 3', '2017-03-22 14:12:58'),
(239, 'ernie', 'Schedule Entry Add Success: YeargroupYear 3', '2017-03-22 14:13:36'),
(240, 'ernie', 'Schedule Entry Add Success: YeargroupYear 3', '2017-03-22 14:13:36'),
(241, 'henry', 'User Creation Success', '2017-03-22 14:16:06'),
(242, 'henry', 'Login Attempt Success', '2017-03-22 14:16:16'),
(243, 'ernie', 'Login Attempt Success', '2017-03-23 01:30:11'),
(244, 'ernie', 'Login Attempt Success', '2017-03-23 02:52:13'),
(245, 'ernie', 'Login Attempt Success', '2017-03-23 03:30:34'),
(246, 'ernie', 'Login Attempt Success', '2017-03-29 13:54:37'),
(247, 'ernie', 'Group Lec Import Fail', '2017-03-29 13:54:50'),
(248, 'ernie', 'Login Attempt Success', '2017-03-29 13:55:36'),
(249, 'ernie', 'Group Lec Import Fail', '2017-03-29 13:55:55'),
(250, 'ernie', 'Group Lec Import Success', '2017-03-29 13:57:08'),
(251, 'ernie', 'Group Course Import Fail', '2017-03-29 13:57:58'),
(252, 'ernie', 'Group Course Import Fail', '2017-03-29 13:58:56'),
(253, 'ernie', 'Group Course Import Success', '2017-03-29 13:59:49'),
(254, 'ernest', 'User Creation Failure', '2017-03-29 14:51:26'),
(255, 'ernest', 'User Creation Failure', '2017-03-29 14:51:31'),
(256, 'ernie', 'Login Attempt Success', '2017-03-29 14:51:41'),
(257, 'ernie', 'Room Creation Success:Name200', '2017-03-29 14:53:25'),
(258, 'ernie', 'Schedule Entry Add Success: YeargroupYear 2', '2017-03-29 14:54:19'),
(259, 'ernie', 'Login Attempt Success', '2017-04-01 17:09:42'),
(260, 'ernie', 'Login Attempt Success', '2017-04-11 22:42:25'),
(261, 'ernie', 'Login Attempt Success', '2017-04-11 23:15:57'),
(262, 'ernie', 'Login Attempt Success', '2017-04-11 23:58:46'),
(263, 'ernie', 'Login Attempt Success', '2017-04-16 12:33:58'),
(264, 'ernie', 'Login Attempt Success', '2017-04-21 00:04:59'),
(265, 'ernie', 'Course Creation Success:CoursenumberBA123', '2017-04-21 21:25:33'),
(266, 'ernie', 'Lecturer Creation Success:NameJeffrey Somuah', '2017-04-21 21:39:19'),
(267, 'ernie', 'Lecturer Creation Success:NameJeffrey Somuah', '2017-04-21 21:39:20'),
(268, 'ernie', 'Lecturer Creation Success:NameJeffrey Somuah', '2017-04-21 21:40:47'),
(269, 'ernie', 'Lecturer Creation Success:Nameaksdn', '2017-04-21 21:54:37'),
(270, 'ernie', 'Lecturer Creation Success:Nameaksdn', '2017-04-21 21:54:56'),
(271, 'ernie', 'Lecturer Creation Success:Namekjadsn', '2017-04-21 21:55:24'),
(272, 'ernie', 'Lecturer Creation Success:Namekjn', '2017-04-21 21:55:52'),
(273, 'ernie', 'Lecturer Creation Success:Namenjkn', '2017-04-21 21:56:14'),
(274, 'ernie', 'Login Attempt Success', '2017-04-21 22:10:51'),
(275, 'ernie', 'Login Attempt Success', '2017-04-21 22:25:31'),
(276, 'ernie', 'Lecturer Creation Success:Namekjbbjk', '2017-04-21 22:29:06'),
(277, 'ernie', 'Login Attempt Success', '2017-04-21 22:30:28'),
(278, 'steph', 'User Creation Success', '2017-04-21 22:34:05'),
(279, 'steph', 'Login Attempt Success', '2017-04-21 22:34:18'),
(280, 'ernie', 'Login Attempt Success', '2017-04-21 22:35:24'),
(281, 'ernie', 'Login Attempt Success', '2017-04-22 12:22:50'),
(282, 'ernie', 'Login Attempt Success', '2017-04-22 14:39:19'),
(283, 'ernie', 'Login Attempt Success', '2017-04-25 15:27:50'),
(284, 'ernie', 'Login Attempt Success', '2017-04-25 16:52:18'),
(285, 'ernie', 'Login Attempt Success', '2017-04-25 21:05:44'),
(286, 'ernie', 'Login Attempt Success', '2017-04-26 20:27:26'),
(287, 'ernie', 'Room Creation Success:Name208', '2017-04-26 20:49:15'),
(288, 'ernie', 'Course Creation Fail:Coursenumberasdkj ', '2017-04-26 20:50:46'),
(289, 'ernie', 'Course Creation Success:Coursenumberasdkj ', '2017-04-26 20:52:10'),
(290, 'ernie', 'Course Creation Success:Coursenumberdsksn1lk', '2017-04-26 20:53:24'),
(291, 'ernie', 'Group Sch Import Fail', '2017-04-27 02:33:06'),
(292, 'ernie', 'Group Sch Import Success', '2017-04-27 02:34:22'),
(293, 'ernie', 'Group Sch Import Success', '2017-04-27 03:40:35'),
(294, 'Emile', 'User Creation Success', '2017-04-27 04:35:02'),
(295, 'emile', 'Login Attempt Success', '2017-04-27 04:35:14'),
(296, 'Emile', 'Login Attempt Success', '2017-04-27 05:10:28'),
(297, 'ernie', 'Login Attempt Success', '2017-04-27 05:11:03'),
(298, 'ernie', 'Login Attempt Success', '2017-04-27 05:12:49'),
(299, 'Emile', 'Login Attempt Fail. Username', '2017-04-27 05:13:07'),
(300, 'Emile', 'Login Attempt Success', '2017-04-27 05:13:12'),
(301, 'Emile', 'Login Attempt Success', '2017-04-27 05:16:53'),
(302, 'ernie', 'Login Attempt Success', '2017-04-27 05:19:25'),
(303, 'ernie', 'Login Attempt Success', '2017-04-27 05:22:41'),
(304, 'Emile', 'Login Attempt Success', '2017-04-27 05:26:57'),
(305, 'ernie', 'Login Attempt Success', '2017-04-27 05:36:43'),
(306, 'ernie', 'Login Attempt Success', '2017-04-27 05:37:40'),
(307, 'Emile', 'Login Attempt Success', '2017-04-27 05:41:40'),
(308, 'ernie', 'Login Attempt Success', '2017-04-27 11:08:13'),
(309, 'ernie', 'Login Attempt Success', '2017-04-27 12:34:14');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `room` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `room`, `user`, `department`, `capacity`) VALUES
(13, '204', 'ernie', 'Engineering', 81),
(14, '202', 'ernie', 'Engineering', 30),
(15, '217', 'ernie', 'Main Block', 90),
(16, '216', 'ernie', 'Main Block', 90),
(17, '218', 'ernie', 'Main Block', 90),
(18, '200', 'ernie', 'Engineering', 30),
(19, '208', 'ernie', 'Engineering', 45),
(20, '301', 'ernie', 'Main Building', 90);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `room` varchar(255) NOT NULL,
  `lecturer` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `yeargroup` varchar(255) NOT NULL,
  `days` enum('M','T','W','TH','F','MW','H') NOT NULL,
  `day_start` varchar(255) NOT NULL,
  `day_end` varchar(255) NOT NULL,
  `hour` int(11) NOT NULL,
  `minute` int(11) NOT NULL,
  `Type` enum('Lec','Dis','Other') NOT NULL,
  `Term` enum('Fall Semester','Spring Semester') NOT NULL,
  `period` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `user`, `room`, `lecturer`, `course`, `yeargroup`, `days`, `day_start`, `day_end`, `hour`, `minute`, `Type`, `Term`, `period`) VALUES
(22, 'david', 'LH 212', 'Nathan Amanquah', 'Introduction to Programming', 'Year 1', 'MW', '2017-02-20T08:00:00', '2017-02-20T08:30:00', 8, 0, 'Dis', 'Fall Semester', 'onep'),
(45, 'ernie', '204', 'Aelaf Dafla', 'Introduction To Programming', 'YEAR1', 'TH', '2017-02-21T08:00:00', '2017-02-21T09:30:00', 8, 0, 'Dis', 'Fall Semester', 'onep'),
(46, 'ernie', '204', 'Aelaf Dafla', 'Introduction To Programming', 'YEAR1', 'TH', '2017-02-23T08:00:00', '2017-02-23T09:30:00', 8, 0, 'Dis', 'Fall Semester', 'onep'),
(47, 'ernie', '217', 'David Sampah', 'Networks', 'YEAR2', 'MW', '2017-02-20T11:20:00', '2017-02-20T12:50:00', 11, 20, 'Lec', 'Fall Semester', 'onep'),
(48, 'ernie', '217', 'David Sampah', 'Networks', 'YEAR2', 'MW', '2017-02-22T11:20:00', '2017-02-22T12:50:00', 11, 20, 'Lec', 'Fall Semester', 'onep'),
(49, 'ernie', '216', 'Ayokor Korsah', 'Intermediate Programming', 'YEAR3', 'MW', '2017-02-20T14:40:00', '2017-02-20T16:10:00', 14, 40, 'Lec', 'Fall Semester', 'onep'),
(50, 'ernie', '216', 'Ayokor Korsah', 'Intermediate Programming', 'YEAR3', 'MW', '2017-02-22T14:40:00', '2017-02-22T16:10:00', 14, 40, 'Lec', 'Fall Semester', 'onep'),
(51, 'ernie', '218', 'Sena Baeta', 'Negotiation', 'YEAR2', 'TH', '2017-02-21T11:20:00', '2017-02-21T12:50:00', 11, 20, 'Lec', 'Fall Semester', 'onep'),
(52, 'ernie', '218', 'Sena Baeta', 'Negotiation', 'YEAR2', 'TH', '2017-02-23T11:20:00', '2017-02-23T12:50:00', 11, 20, 'Lec', 'Fall Semester', 'onep'),
(53, 'ernie', '218', 'Nathan Amanquah', 'Business Law', 'YEAR4', 'TH', '2017-02-21T14:40:00', '2017-02-21T16:10:00', 14, 40, 'Lec', 'Fall Semester', 'onep'),
(54, 'ernie', '218', 'Nathan Amanquah', 'Business Law', 'YEAR4', 'TH', '2017-02-23T14:40:00', '2017-02-23T16:10:00', 14, 40, 'Lec', 'Fall Semester', 'onep'),
(55, 'ernie', '216', 'Joojo Spio', 'Branding', 'YEAR4', 'MW', '2017-02-20T09:40:00', '2017-02-20T11:10:00', 9, 40, 'Lec', 'Fall Semester', 'onep'),
(56, 'ernie', '216', 'Joojo Spio', 'Branding', 'YEAR4', 'MW', '2017-02-22T09:40:00', '2017-02-22T11:10:00', 9, 40, 'Lec', 'Fall Semester', 'onep'),
(57, 'ernie', '204', 'Joojo Spio', 'Operations Management', 'NONE', 'MW', '2017-02-20T16:20:00', '2017-02-20T17:50:00', 16, 20, 'Lec', 'Fall Semester', 'onep'),
(58, 'ernie', '204', 'Joojo Spio', 'Operations Management', 'NONE', 'MW', '2017-02-22T16:20:00', '2017-02-22T17:50:00', 16, 20, 'Lec', 'Fall Semester', 'onep'),
(59, 'ernie', '204', 'Aelaf Dafla', 'Physics', 'YEAR1', 'MW', '2017-02-20T14:40:00', '2017-02-20T16:10:00', 14, 40, 'Dis', 'Fall Semester', 'onep'),
(60, 'ernie', '204', 'Aelaf Dafla', 'Physics', 'YEAR1', 'MW', '2017-02-22T14:40:00', '2017-02-22T16:10:00', 14, 40, 'Dis', 'Fall Semester', 'onep'),
(61, 'ernie', '217', 'Sena Baeta', 'Music and Dance', 'NONE', 'F', '2017-02-24T09:40:00', '2017-02-24T11:10:00', 9, 40, 'Dis', 'Fall Semester', 'onep');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES
(12, 'Ernest', 'Ernest', 'jaycuffs@gmail.com'),
(18, 'ernie', 'ernie', 'ernie'),
(19, 'jaycuffs', 'jaycuffs@gmail.com', 'jaycuffs'),
(20, 'david', 'david@gmail.com', 'david'),
(21, 'henry', 'henry@gmail.com', 'henry'),
(22, 'steph', 'steph@gmail.com', 'steph'),
(23, 'Emile', 'joseph@gmail.com', 'joseph');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `constraints`
--
ALTER TABLE `constraints`
  ADD PRIMARY KEY (`user`),
  ADD UNIQUE KEY `user_2` (`user`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`,`user`,`courseName`,`courseNo`),
  ADD KEY `user` (`user`),
  ADD KEY `courseName` (`courseName`),
  ADD KEY `lecturer` (`lecturer`),
  ADD KEY `roomreq` (`roomreq`);

--
-- Indexes for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`id`,`user`,`lecturer`,`Department`),
  ADD KEY `user` (`user`),
  ADD KEY `lecturer` (`lecturer`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`,`room`,`user`,`department`),
  ADD KEY `user` (`user`),
  ADD KEY `room` (`room`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `room` (`room`,`lecturer`,`course`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;
--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`);

--
-- Constraints for table `constraints`
--
ALTER TABLE `constraints`
  ADD CONSTRAINT `constraints_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`lecturer`) REFERENCES `lecturers` (`lecturer`);

--
-- Constraints for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `lecturers_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
