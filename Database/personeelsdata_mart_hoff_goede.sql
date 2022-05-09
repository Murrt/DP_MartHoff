-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2022 at 07:30 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dp_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `personeelsdata_mart_hoff_goede`
--

CREATE TABLE `personeelsdata_mart_hoff_goede` (
  `SSN` varchar(200) NOT NULL,
  `lastname` varchar(999) DEFAULT NULL,
  `firstname` varchar(999) DEFAULT NULL,
  `hiredate` varchar(999) DEFAULT NULL,
  `salary` varchar(999) DEFAULT NULL,
  `gender` varchar(999) DEFAULT NULL,
  `performance` varchar(999) DEFAULT NULL,
  `position` varchar(999) DEFAULT NULL,
  `location` varchar(999) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `personeelsdata_mart_hoff_goede`
--

INSERT INTO `personeelsdata_mart_hoff_goede` (`SSN`, `lastname`, `firstname`, `hiredate`, `salary`, `gender`, `performance`, `position`, `location`) VALUES
('000-01-0000', 'Milgrom', 'Patricia', '10/1/2004', '$57,500.00 ', 'F', 'Average', 'Manager', 'Boston'),
('000-02-2222', 'Adams', 'Sandy', '1/15/2001', '$19,500.00 ', 'F', 'Average', 'Trainee', 'Atlanta'),
('100-01-0000', 'Maats', 'Tessa', '2020-08-12', '22500', 'G', 'Good', 'CFO', 'Klazienaveen'),
('109-87-6543', 'Wood', 'Emily', '3/12/1997', '$69,000.00 ', 'F', 'Average', 'Manager', 'New York City'),
('109-87-6544', 'Foster', 'Harold', '8/14/2005', '$55,000.00 ', 'M', 'Good', 'Account Representative', 'Chicago'),
('111-12-1111', 'Johnson', 'James', '5/3/1996', '$47,500.00 ', 'M', 'Good', 'Account Representative', 'Chicago'),
('123-45-6789', 'Coulter', 'Tracy', '2/14/1993', '$100,000.00 ', 'Good', 'Manager', 'Atlanta', ''),
('222-23-2222', 'Marlin', 'Bill', '3/28/1977', '$125,000.00 ', 'M', 'Manager', 'Miami', ''),
('222-52-5555', 'Smith', 'Mary', '1/1/2006', '$42,500.00 ', 'F', 'Average', 'Account Representative', 'Chicago'),
('245-67-8910', 'Johanson', 'Sandy', '6/2/2005', '$69,000.00 ', 'F', 'Account Representative', 'Denver', ''),
('312-63-1271', 'Hoff', 'Tessa', '2020-08-12', '22,500.00', 'G', 'Good', 'CFO', 'Klazienaveen'),
('333-34-3333', 'Manin', 'Emily', '12/1/2000', '$49,500.00 ', 'F', 'Average', 'Account Representative', 'Boston'),
('333-43-4444', 'Smith', 'Frank', '1/29/1991', '$65,000.00 ', 'M', 'Good', 'Account Representative', 'Atlanta'),
('333-66-1234', 'Brown', 'Marietta', '3/7/2001', '$18,500.00 ', 'F', 'Poor', 'Trainee', 'Atlanta'),
('335-55-5533', 'Jones', 'Holly', '4/8/1986', '$65,000.00 ', 'F', 'Good', 'Manager', 'New York City'),
('432-19-8765', 'Bronson', 'Paul', '11/20/2003', '$58,000.00 ', 'M', 'Good', 'Manager', 'Denver'),
('444-45-4444', 'Frank', 'Vernon', '4/10/1985', '$75,000.00 ', 'M', 'Good', 'Account Representative', 'Miami'),
('464-64-4466', 'Webster', 'David', '1/29/1991', '$58,500.00 ', 'M', 'Poor', 'Manager', 'Salt Lake City'),
('500-50-0505', 'Rodriguez', 'Jose', '7/16/1998', '$150,000.00 ', 'M', 'Good', 'Regional Manager', 'New York City'),
('555-22-3333', 'Rubin', 'Patricia', '7/25/2003', '$45,000.00 ', 'F', 'Average', 'Account Representative', 'Boston'),
('555-56-5555', 'Charles', 'Kenneth', '6/18/1998', '$40,000.00 ', 'M', 'Poor', 'Account Representative', 'Boston'),
('612-99-1111', 'Roberts', 'Melissa', '5/14/1984', '$79,000.00 ', 'F', 'Good', 'Manager', 'Chicago'),
('625-62-6262', 'Holmes', 'Holly', '6/15/1992', '$55,000.00 ', 'F', 'Average', 'Manager', 'Miami'),
('767-74-7373', 'Martin', 'William', '8/26/2006', '$23,000.00 ', 'M', 'Good', 'Trainee', 'New York City'),
('776-67-6666', 'Adamson', 'David', '10/4/2002', '$52,000.00 ', 'M', 'Poor', 'Manager', 'Chicago'),
('777-78-7777', 'Marder', 'Kelly', '9/25/1997', '$38,500.00 ', 'F', 'Average', 'Account Representative', 'Chicago'),
('925-45-7116', 'Whitehead', 'David', '7/25/1980', '$175,000.00 ', 'M', 'Good', 'Regional Manager', 'Boston');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `personeelsdata_mart_hoff_goede`
--
ALTER TABLE `personeelsdata_mart_hoff_goede`
  ADD PRIMARY KEY (`SSN`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
