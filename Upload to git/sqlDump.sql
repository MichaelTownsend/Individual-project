-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 21, 2021 at 11:28 PM
-- Server version: 10.3.28-MariaDB-log
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mtownonl_TermProject`
--

-- --------------------------------------------------------

--
-- Table structure for table `lab01`
--

CREATE TABLE `lab01` (
  `quetionID` int(11) NOT NULL,
  `question` varchar(256) DEFAULT NULL,
  `answer` varchar(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lab01`
--

INSERT INTO `lab01` (`quetionID`, `question`, `answer`) VALUES
(7, 'how tall is kiro?', 'C'),
(6, 'what is 5 + 6', 'A'),
(3, 'what is josh hair color', 'D'),
(11, 'what will the console print?     const foo = function(a,b){         a += b;         return a*(a-b);     }     const num = foo(2,3);     console.log(num);', 'B'),
(13, 'what will the console print?     const arr = [1,2,3,4,5];     const obj = {1:arr.length};     console.log(obj[1]);', 'C'),
(15, 'what is 2+2', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `lab02`
--

CREATE TABLE `lab02` (
  `ansID` int(11) NOT NULL,
  `quetionID` int(11) DEFAULT NULL,
  `ans` varchar(256) DEFAULT NULL,
  `ansL` varchar(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lab02`
--

INSERT INTO `lab02` (`ansID`, `quetionID`, `ans`, `ansL`) VALUES
(106, 6, '2', 'D'),
(105, 6, '9', 'C'),
(104, 6, '12', 'B'),
(146, 15, '4', 'A'),
(145, 13, '5', 'C'),
(144, 13, 'Not defined', 'B'),
(103, 6, '11', 'A'),
(102, 7, '3 foot 1', 'D'),
(101, 7, '5 foot 10', 'C'),
(100, 7, '6 foot 1', 'B'),
(99, 7, '5 foot 2', 'A'),
(94, 3, 'brown', 'D'),
(93, 3, 'yellow', 'C'),
(92, 3, 'blue', 'B'),
(91, 3, 'green', 'A'),
(142, 11, '-25', 'D'),
(141, 11, '-10', 'C'),
(139, 11, '25', 'A'),
(140, 11, '10', 'B'),
(143, 13, 'underfined', 'A'),
(147, 15, '5', 'B');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lab01`
--
ALTER TABLE `lab01`
  ADD PRIMARY KEY (`quetionID`);

--
-- Indexes for table `lab02`
--
ALTER TABLE `lab02`
  ADD PRIMARY KEY (`ansID`),
  ADD KEY `quetionID` (`quetionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lab01`
--
ALTER TABLE `lab01`
  MODIFY `quetionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `lab02`
--
ALTER TABLE `lab02`
  MODIFY `ansID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
