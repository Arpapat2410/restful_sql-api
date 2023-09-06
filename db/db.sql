-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 05:54 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` varchar(100) NOT NULL,
  `img` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `type`, `img`) VALUES
(1, 'รสเด็ดอร่อยตามสั่ง - บางซื่อ', 'Coupon, อาหารทะเล, อาหารตามสั่ง, ยำ', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2N2EY6FTXTHKA/hero/6709b61f83504e22a8b1f5a2ea5851e1_1623751631792385157.webp'),
(2, 'Got\'s Chicken ไก่ทอดเยาวราช - สัมพันธวงศ์', 'ไก่ทอด', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C3UZR74DWCKWSE/hero/e264d85ce3514197b75d3f34bf160a96_1663737161826424675.webp'),
(3, 'Hachiban Ramen (ฮะจิบัง ราเมน) - บางลำพู', 'Rice noodles, อาหารเส้น, ราเมน', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2TGFFWWTKVAC6/hero/e6274f90fec14f85826f4aed91f41f47_1645981740553211506.webp'),
(4, 'ขนมจีนข้ามศาล - จรัญสนิทวงศ์46', 'Coupon, อาหารสุขภาพ', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2VEAVLTA3TET2/hero/3a459d92-b269-4b4f-8671-00e31e8c85e5__store_cover__2023__03__23__08__06__53.webp'),
(5, 'แฮมเบอร์เร่อ - ประชาราษฎร์ ซอย 30', 'แฮมเบอร์เกอร์', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C343GN6KVVEHKA/hero/bfc24dad92ac472c90de61101414e4fe_1676004451554570823.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
