-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 13, 2017 lúc 03:26 PM
-- Phiên bản máy phục vụ: 10.1.28-MariaDB
-- Phiên bản PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `chat`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `conversations`
--

CREATE TABLE `conversations` (
  `conversation_id` int(11) NOT NULL,
  `conversation_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `member` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'name of all member- seperate by '',''',
  `creator` varchar(12) COLLATE utf8_unicode_ci NOT NULL COMMENT 'phone',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` tinyint(4) NOT NULL COMMENT '0 -- chat2; 1 -- chat group'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `conversations`
--

INSERT INTO `conversations` (`conversation_id`, `conversation_name`, `member`, `creator`, `created_at`, `updated_at`, `type`) VALUES
(5, 'zerozx', '0924493220,01657595705,', '0924493220', '2017-12-13 21:04:38', '2017-12-13 21:04:38', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `friend_phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL DEFAULT '1990-01-01',
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT '0',
  `image_source` text COLLATE utf8_unicode_ci NOT NULL,
  `add_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `friends`
--

INSERT INTO `friends` (`id`, `phone`, `friend_phone`, `email`, `birthday`, `username`, `gender`, `image_source`, `add_at`) VALUES
(70, '0924493220', '01657595705', 'gardonzx@gmail.com', '0000-00-00', '01657595705', 0, 'http://192.168.1.69/chat/image_user/01657595705_20171213212225.jpg', '2017-12-13 20:52:45'),
(71, '01657595705', '0924493220', 'zerozx@gmail.com', '0000-00-00', 'zerozx', 0, '', '2017-12-13 20:52:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invite_friend`
--

CREATE TABLE `invite_friend` (
  `from_phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `from_user` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `to_phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `invited_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `image_source` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `creator` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `message` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `is_send` tinyint(4) NOT NULL COMMENT '0: dont send |  1: sent'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `messages`
--

INSERT INTO `messages` (`message_id`, `conversation_id`, `creator`, `message`, `created_at`, `is_send`) VALUES
(19, 5, '0924493220', 'dsa', '2017-12-13 21:04:39', 0),
(20, 5, '01657595705', 'asdsd', '2017-12-13 21:04:44', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages_seen`
--

CREATE TABLE `messages_seen` (
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `message_id` int(11) NOT NULL,
  `is_seen` tinyint(4) NOT NULL,
  `seen_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0: Female - 1:Male',
  `image_source` text COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL DEFAULT '1990-01-01',
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `conversations` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'conversationid cach nhau '',''',
  `friends` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`phone`, `password`, `username`, `gender`, `image_source`, `status`, `birthday`, `email`, `conversations`, `friends`) VALUES
('01657595705', '1', '01657595705', 0, 'http://192.168.1.69/chat/image_user/01657595705_20171213212225.jpg', '', '0000-00-00', 'gardonzx@gmail.com', '5,', ''),
('0924493220', '1', 'zerozx', 0, '', '', '0000-00-00', 'zerozx@gmail.com', '5,', '');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`conversation_id`);

--
-- Chỉ mục cho bảng `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`,`phone`,`friend_phone`);

--
-- Chỉ mục cho bảng `invite_friend`
--
ALTER TABLE `invite_friend`
  ADD PRIMARY KEY (`from_phone`,`to_phone`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`,`conversation_id`);

--
-- Chỉ mục cho bảng `messages_seen`
--
ALTER TABLE `messages_seen`
  ADD PRIMARY KEY (`phone`,`message_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`phone`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `conversations`
--
ALTER TABLE `conversations`
  MODIFY `conversation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
