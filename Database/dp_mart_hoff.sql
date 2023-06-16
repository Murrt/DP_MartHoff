-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2023 at 03:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dp_mart_hoff`
--

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `LocationID` int(8) NOT NULL,
  `LocationCity` varchar(14) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  `state` varchar(5) DEFAULT NULL,
  `zipcode` varchar(7) DEFAULT NULL,
  `officephone` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`LocationID`, `LocationCity`, `address`, `state`, `zipcode`, `officephone`) VALUES
(1, 'Atlanta', '450 Peachtree Rd', 'GA', '30316', '(404)333-5555'),
(2, 'Boston', '3 Commons Blvd', 'MA', '02190', '(617)123-4444'),
(3, 'Chicago', '500 Loop Highway', 'IL', '60620', '(312)444-6666'),
(4, 'Miami', '210 Biscayne Blvd', 'FL', '33103', '(305)787-9999'),
(5, 'New York City', '1650 Washington Blvd', 'NY', '15648', '(518)256-3100'),
(6, 'Denver', '312 Mount View Dr', 'CO', '54657', '(205)607-5289'),
(7, 'Salt Lake City', '316 S. State St', 'UT', '84125', '(801)459-6652'),
(8, 'Los Angeles', '1400 Main St', 'CA', '94235', '(705)639-0227');

-- --------------------------------------------------------

--
-- Table structure for table `personnel`
--

CREATE TABLE `personnel` (
  `SSN` varchar(200) NOT NULL,
  `lastname` varchar(999) DEFAULT NULL,
  `firstname` varchar(999) DEFAULT NULL,
  `hiredate` varchar(999) DEFAULT NULL,
  `salary` varchar(999) DEFAULT NULL,
  `gender` varchar(999) DEFAULT NULL,
  `performance` varchar(999) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `personnel`
--

INSERT INTO `personnel` (`SSN`, `lastname`, `firstname`, `hiredate`, `salary`, `gender`, `performance`) VALUES
('000-01-0000', 'Milgrom', 'Patricia', '10/1/2004', '57500.00 ', 'F', 'Average'),
('000-02-2222', 'Adams', 'Sandy', '1/15/2001', '19500.00 ', 'F', 'Average'),
('333-34-3333', 'Manin', 'Emily', '12/1/2000', '49500.00 ', 'F', 'Average'),
('333-43-4444', 'Smith', 'Frank', '1/29/1991', '65000.00 ', 'M', 'Good'),
('333-66-1234', 'Brown', 'Marietta', '3/7/2001', '18500.00 ', 'F', 'Poor'),
('335-55-5533', 'Jones', 'Holly', '4/8/1986', '65000.00 ', 'F', 'Good'),
('432-19-8765', 'Bronson', 'Paul', '11/20/2003', '58000.00 ', 'M', 'Good'),
('444-45-4444', 'Frank', 'Vernon', '4/10/1985', '75000.00 ', 'M', 'Good'),
('464-64-4466', 'Webster', 'David', '1/29/1991', '58500.00 ', 'M', 'Poor'),
('500-50-0505', 'Rodriguez', 'Jose', '7/16/1998', '150000.00 ', 'M', 'Good'),
('555-22-3333', 'Rubin', 'Patricia', '7/25/2003', '45000.00 ', 'F', 'Average'),
('555-56-5555', 'Charles', 'Kenneth', '6/18/1998', '40000.00 ', 'M', 'Poor'),
('612-99-1111', 'Roberts', 'Melissa', '5/14/1984', '79000.00 ', 'F', 'Good'),
('625-62-6262', 'Holmes', 'Holly', '6/15/1992', '55000.00 ', 'F', 'Average'),
('767-74-7373', 'Martin', 'William', '8/26/2006', '23000.00 ', 'M', 'Good'),
('776-67-6666', 'Adamson', 'David', '10/4/2002', '52000.00 ', 'M', 'Poor'),
('777-78-7777', 'Marder', 'Kelly', '9/25/1997', '38500.00 ', 'F', 'Average'),
('925-45-7116', 'Whitehead', 'David', '7/25/1980', '175000.00 ', 'M', 'Good');

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `PositionID` int(8) NOT NULL,
  `PositionTitle` varchar(22) DEFAULT NULL,
  `education` varchar(30) DEFAULT NULL,
  `minSalary` varchar(9) DEFAULT NULL,
  `maxSalary` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`PositionID`, `PositionTitle`, `education`, `minSalary`, `maxSalary`) VALUES
(1, 'Account Representative', 'HBO Accounting ', '25000', '75000'),
(2, 'Manager', 'MBO marketing', '50000', '150000'),
(3, 'Trainee', 'MBO Techniek', '18000', '25000'),
(4, 'Regional Manager', 'University market', '100000', '250000'),
(5, 'ICT manager', 'Informatica', '1997', '78911'),
(8, 'Manager Sales', 'HBO Sales', '10000', '20000'),
(9, 'Manager Marketing', 'Marketing', '10000', '25000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`LocationID`),
  ADD UNIQUE KEY `address` (`address`);

--
-- Indexes for table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`SSN`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`PositionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `LocationID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `PositionID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
