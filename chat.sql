-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 24, 2017 lúc 11:08 AM
-- Phiên bản máy phục vụ: 10.1.25-MariaDB
-- Phiên bản PHP: 5.6.31

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
(1, '123', '1,2,3', '1', '2017-10-18 00:00:00', '2017-10-24 09:16:37', 0),
(2, '123', '1,2', '2', '2017-10-10 00:00:00', '2017-10-10 00:00:00', 0),
(3, '123', '1,2,3', '11', '2017-10-24 09:22:26', '2017-10-24 09:22:26', 0);

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
  `add_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `friends`
--

INSERT INTO `friends` (`id`, `phone`, `friend_phone`, `email`, `birthday`, `username`, `add_at`) VALUES
(1, '01685574968', '01685574967', '', '2017-10-01', '', '2017-09-11 00:00:00'),
(2, '01685574969', '01685574968', '', '2017-10-08', '', '2017-09-11 00:00:00'),
(3, '1', '01685574967', '', '2017-10-01', '', '2017-09-11 00:00:00'),
(4, '1', '01685574968', '', '2017-10-01', '', '2017-09-11 00:00:00'),
(6, '1', '2', '', '0000-00-00', '', '2017-11-24 15:10:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invite_friend`
--

CREATE TABLE `invite_friend` (
  `from_phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `from_user` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `to_phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `invited_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `invite_friend`
--

INSERT INTO `invite_friend` (`from_phone`, `from_user`, `to_phone`, `invited_at`, `status`) VALUES
('1', '', '1', '2017-09-18 00:00:00', 0),
('1', '', '2', '2017-09-28 10:26:27', 0),
('2', '', '1', '2017-10-18 00:00:00', 0);

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
(1, 1, '1', 'dsfsdfsdf', '2017-10-19 00:00:00', 1),
(2, 1, '1', 'qưeqweqwwe', '2017-10-19 00:00:00', 1),
(3, 1, '1', '123321123', '2017-11-02 23:57:16', 0),
(4, 1, '1', 'hihi', '2017-11-03 00:02:25', 0),
(5, 1, '1', '123321', '2017-11-03 00:13:29', 0),
(6, 1, '1', 'huhu', '2017-11-03 00:15:01', 0),
(7, 1, '1', '123321', '2017-11-03 00:17:53', 0),
(8, 1, '1', '123321123321123321', '2017-11-03 00:19:19', 0),
(9, 1, '1', '123321123321123321', '2017-11-03 00:24:38', 0);

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
  `image_source` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL DEFAULT '1990-01-01',
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `conversations` text COLLATE utf8_unicode_ci NOT NULL COMMENT 'conversationid cach nhau '','''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`phone`, `password`, `username`, `image_source`, `status`, `birthday`, `email`, `conversations`) VALUES
('1', '1', '2', '', '', '0000-00-00', NULL, '1,2,'),
('123123123123', '1', 'user1', '', '', '2017-10-01', NULL, '1,'),
('1685574968', '123321', '1685574968', '', '', '1990-01-01', NULL, ''),
('2', '1', '1', '', '', '0000-00-00', NULL, '1,2,');

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
  MODIFY `conversation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
