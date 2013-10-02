-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Авг 14 2013 г., 11:26
-- Версия сервера: 5.5.28
-- Версия PHP: 5.4.6-1ubuntu1.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `cms2.0`
--
CREATE DATABASE `cms2.0` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cms2.0`;

-- --------------------------------------------------------

--
-- Структура таблицы `article_behaviors`
--

CREATE TABLE IF NOT EXISTS `article_behaviors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `mini_block_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `article_behaviors`
--

INSERT INTO `article_behaviors` (`id`, `article_id`, `mini_block_id`, `quantity`) VALUES
(1, 3, 1, 1),
(2, 2, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `article_item_images`
--

CREATE TABLE IF NOT EXISTS `article_item_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_item_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `article_item_images`
--

INSERT INTO `article_item_images` (`id`, `article_item_id`, `name`) VALUES
(1, 4, '00abeb267cfd2dac24cf5e276a4342bae09a22d4.png'),
(2, 5, '9c586c823c248b5b10a702b0ec7e3cbcf0b9edad.png'),
(3, 6, '6eb563eb2d24ce3dde2629eae7704385af06363f.png'),
(4, 8, 'df8afa367f1f2e7ac5090469bcb97a81f241e96b.png'),
(5, 9, '68f9b1bab3c5f78c95299692da7f242c83191dbf.png'),
(6, 10, '26beeed99c80b8c518e33d73a2484303994fa0b4.png'),
(7, 11, '2ed99aedc9c3b5d4d13ec121d51133b4925caa84.png'),
(8, 2, 'ad351f94cef6986d4188582c3c4863d8030f8407.jpg'),
(9, 3, '716878d7e384301482ba9814e53034fea3032d4e.jpg'),
(10, 12, 'e30ca3327a17e8dd1b3984f478a55b3a43c3fc42.png');

-- --------------------------------------------------------

--
-- Структура таблицы `article_item_languages`
--

CREATE TABLE IF NOT EXISTS `article_item_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_item_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `author` varchar(100) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(12000) NOT NULL,
  `description_search` text NOT NULL,
  `seo_title` varchar(500) NOT NULL,
  `key_words` varchar(1000) NOT NULL,
  `seo_description` varchar(4000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Дамп данных таблицы `article_item_languages`
--

INSERT INTO `article_item_languages` (`id`, `article_item_id`, `language_id`, `author`, `title`, `description`, `description_search`, `seo_title`, `key_words`, `seo_description`) VALUES
(1, 1, 2, 'Андрей', 'Короткая статья про мазду', '<p>фыаф ыва фыва фыва фыва фыв фыва фыва фываф ыва фыва фывафыва фыва фыва фывафыва фыва фыафыва фывафывалор длфущзафгщртюфьыватдф лаотфцуалортюбьфытваюлотфцыдлотцаждлтаьшыойта в</p>', 'фыаф ыва фыва фыва фыва фыв фыва фыва фываф ыва фыва фывафыва фыва фыва фывафыва фыва фыафыва фывафывалор длфущзафгщртюфьыватдф лаотфцуалортюбьфытваюлотфцыдлотцаждлтаьшыойта в\n', 'Сео заголовок статьи', 'Ключевые слова для статьи', 'Коротокое сео описание статьи про мазду.'),
(2, 2, 2, 'Андрей', 'Рихтовка', '<table border="0" cellspacing="10" style="margin: 0px; padding: 0px; border: 0px; border-collapse: collapse; border-spacing: 0px; empty-cells: show; font-size: 12px; color: rgb(0, 0, 0); font-family: tahoma, sans-serif; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);" width="100%">\n	<tbody style="margin: 0px; padding: 0px;">\n		<tr style="margin: 0px; padding: 0px;">\n			<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 34px;" width="7%">\n			<div align="center" style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">№</strong></div>\n			</td>\n			<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 100px;" width="23%">\n			<div align="center" style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Наименование работ</strong></div>\n			</td>\n			<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 200px;" width="35%">\n			<div align="center" style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Деталь</strong></div>\n			</td>\n			<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 160px;" width="35%">\n			<div align="center" style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Цена, грн.</strong></div>\n			</td>\n		</tr>\n		<tr style="margin: 0px; padding: 0px;">\n			<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 34px;"><img alt="" height="1" src="http://sto-tvi.com.ua/images/spacer.gif" style="margin: 0px; padding: 0px; border: 0px; vertical-align: top;" width="25" /></td>\n			<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 100px;"><img alt="" height="1" src="http://sto-tvi.com.ua/images/spacer.gif" style="margin: 0px; padding: 0px; border: 0px; vertical-align: top;" width="100" /></td>\n			<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 200px;"><img alt="" height="1" src="http://sto-tvi.com.ua/images/spacer.gif" style="margin: 0px; padding: 0px; border: 0px; vertical-align: top;" width="120" /></td>\n			<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 160px;"><img alt="" height="1" src="http://sto-tvi.com.ua/images/spacer.gif" style="margin: 0px; padding: 0px; border: 0px; vertical-align: top;" width="70" /></td>\n		</tr>\n		<tr style="margin: 0px; padding: 0px;">\n			<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 34px;" valign="top"><strong style="margin: 0px; padding: 0px; font-weight: bold;">1</strong></td>\n			<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 100px;" valign="top">\n			<p style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Рихтовка</strong></p>\n			</td>\n			<td colspan="2" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 360px;" valign="top">\n			<table border="0" cellspacing="5" style="margin: 0px; padding: 0px; border: 0px; border-collapse: collapse; border-spacing: 0px; empty-cells: show; font-size: 12px;" width="100%">\n				<tbody style="margin: 0px; padding: 0px;">\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Капота</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">50 - 300</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Переднего крыла</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">50 - 200</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Передних дверей</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">90 - 500</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Задних дверей</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">90 - 500</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Заднего&nbsp; крыла</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">90 - 1300</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Крышки багажника</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">90 - 700</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Порога</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">50 - 700</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Передних ланжеронов</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">600 - 1500</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Задних ланжеронов</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">800 - 3500</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Крыши</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">150 - 1200</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;"><img alt="" height="1" src="http://sto-tvi.com.ua/images/spacer.gif" style="margin: 0px; padding: 0px; border: 0px; vertical-align: top;" width="200" /></td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;"><img alt="" height="1" src="http://sto-tvi.com.ua/images/spacer.gif" style="margin: 0px; padding: 0px; border: 0px; vertical-align: top;" width="120" /></td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>', '\n	\n		\n			\n			№\n			\n			\n			Наименование работ\n			\n			\n			Деталь\n			\n			\n			Цена, грн.\n			\n		\n		\n			\n			\n			\n			\n		\n		\n			1\n			\n			Рихтовка\n			\n			\n			\n				\n					\n						Капота\n						50 - 300\n					\n					\n						Переднего крыла\n						50 - 200\n					\n					\n						Передних дверей\n						90 - 500\n					\n					\n						Задних дверей\n						90 - 500\n					\n					\n						Заднего&nbsp; крыла\n						90 - 1300\n					\n					\n						Крышки багажника\n						90 - 700\n					\n					\n						Порога\n						50 - 700\n					\n					\n						Передних ланжеронов\n						600 - 1500\n					\n					\n						Задних ланжеронов\n						800 - 3500\n					\n					\n						Крыши\n						150 - 1200\n					\n					\n						\n						\n					\n				\n			\n			\n		\n	\n\n', 'Рихтовка сео', 'Ключевые слова для рихтовки автомобиля', 'Короткое но содержательно описание'),
(3, 3, 2, 'Андрей', 'Замена', '<table border="0" cellspacing="10" style="margin: 0px; padding: 0px; border: 0px; border-collapse: collapse; border-spacing: 0px; empty-cells: show; font-size: 12px; color: rgb(0, 0, 0); font-family: tahoma, sans-serif; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);" width="100%">\n	<tbody style="margin: 0px; padding: 0px;">\n		<tr style="margin: 0px; padding: 0px;">\n			<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 34px;" width="7%">\n			<div align="center" style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">№</strong></div>\n			</td>\n			<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 100px;" width="23%">\n			<div align="center" style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Наименование работ</strong></div>\n			</td>\n			<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 200px;" width="35%">\n			<div align="center" style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Деталь</strong></div>\n			</td>\n			<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 160px;" width="35%">\n			<div align="center" style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Цена, грн.</strong></div>\n			</td>\n		</tr>\n		<tr style="margin: 0px; padding: 0px;">\n			<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 34px;" valign="top"><strong style="margin: 0px; padding: 0px; font-weight: bold;">1</strong></td>\n			<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 100px;" valign="top">\n			<p style="margin: 0px; padding: 0px;"><strong style="margin: 0px; padding: 0px; font-weight: bold;">Замена</strong></p>\n			</td>\n			<td colspan="2" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 360px;" valign="top">\n			<table border="0" cellspacing="5" style="margin: 0px; padding: 0px; border: 0px; border-collapse: collapse; border-spacing: 0px; empty-cells: show; font-size: 12px;" width="100%">\n				<tbody style="margin: 0px; padding: 0px;">\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Передней панели</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">200 - 800</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Порога&nbsp; (сваривание)</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">500</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Переднего крыла (сваривание)</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">600</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Заднего крыла (сваривание)</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">1200</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Филенка дверей (сваривание)</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">90 - 600</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Филенки крыши</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">400 - 1200</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Задней панели</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">200 - 1200</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Задней части кузова</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">3000 - 7000</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Передней части кузова</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">4000 - 8000</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Лобового стекла</td>\n						<td style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">100 - 250</td>\n					</tr>\n					<tr style="margin: 0px; padding: 0px;">\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 220px;">Заднего стекла</td>\n						<td bgcolor="#F4F4F4" style="margin: 0px; padding: 0px; vertical-align: top; text-align: left; font-weight: normal; width: 140px;">100 - 250</td>\n					</tr>\n				</tbody>\n			</table>\n			</td>\n		</tr>\n	</tbody>\n</table>', '\n	\n		\n			\n			№\n			\n			\n			Наименование работ\n			\n			\n			Деталь\n			\n			\n			Цена, грн.\n			\n		\n		\n			1\n			\n			Замена\n			\n			\n			\n				\n					\n						Передней панели\n						200 - 800\n					\n					\n						Порога&nbsp; (сваривание)\n						500\n					\n					\n						Переднего крыла (сваривание)\n						600\n					\n					\n						Заднего крыла (сваривание)\n						1200\n					\n					\n						Филенка дверей (сваривание)\n						90 - 600\n					\n					\n						Филенки крыши\n						400 - 1200\n					\n					\n						Задней панели\n						200 - 1200\n					\n					\n						Задней части кузова\n						3000 - 7000\n					\n					\n						Передней части кузова\n						4000 - 8000\n					\n					\n						Лобового стекла\n						100 - 250\n					\n					\n						Заднего стекла\n						100 - 250\n					\n				\n			\n			\n		\n	\n\n', 'Замена сео', 'ключевые слова для замены', 'Короткое описание замены для поисковых ботов'),
(4, 4, 2, 'Андрей', 'Кредит', '<p>Уважаемые клиенты!<br />\n<br />\nОтдел кредита компании &quot;Автосоюз&quot; предлагает Вам оформление кредита на покупку автомобиля непосредственно в автосалоне.<br />\n<br />\nКредит от PORSCHE FINANCE GROUP</p>\n\n<table border="1" cellpadding="4" cellspacing="0" id="kr">\n	<tbody>\n		<tr id="hd">\n			<td>PORSCHE FINANCE GROUP</td>\n			<td>Размер авансового платежа</td>\n			<td>Годовая процентная ставка, USD/EURO</td>\n			<td>Срок кредита</td>\n			<td>Разовая комиссия от суммы кредита</td>\n			<td>Досрочное погашение</td>\n			<td>Страхование жизни</td>\n			<td>Ежемесячная комиссия</td>\n		</tr>\n		<tr>\n			<td>для юридических лиц</td>\n			<td>от 20%</td>\n			<td rowspan="3">9,9%</td>\n			<td>1 &ndash; 5 лет</td>\n			<td rowspan="3">2,5%</td>\n			<td rowspan="3">Без штрафных санкций</td>\n			<td rowspan="3">нет</td>\n			<td rowspan="3">нет</td>\n		</tr>\n		<tr>\n			<td>для СПД</td>\n			<td>от 20%</td>\n			<td>1 &ndash; 5 лет</td>\n		</tr>\n		<tr>\n			<td>для физических лиц</td>\n			<td>от 20%</td>\n			<td>1 &ndash; 5 лет</td>\n		</tr>\n	</tbody>\n</table>\n\n<p><br />\nДокументы для оформления кредита:</p>\n\n<ul type="square">\n	<li>Паспорт гражданина Украины;</li>\n	<li>Справка о присвоении идентификационного кода (оригинал);</li>\n	<li>Свидетельство о браке;</li>\n	<li>Паспорт мужа (жены) гражданина Украины;</li>\n	<li>Справка о присвоении идентификационного кода (оригинал) мужа/жены;</li>\n	<li>Справка с места работы с указанием сроков работы на данном предприятии, занимаемой должности и среднемесячной суммы дохода за последние 6 месяцев (наличие печати предприятия обязательно);</li>\n	<li>Копия трудовой книжки (первая страница и две последние страницы);</li>\n	<li>Документы, удостоверяющие право собственности на движимое и недвижимое имущество.</li>\n	<li>Водительское удостоверение</li>\n</ul>\n\n<p><br />\nНаши преимущества:</p>\n\n<ul type="square">\n	<li>индивидуальный подход к каждому Клиенту;</li>\n	<li>подбор самого оптимального варианта Вашего финансироания или финансирования Вашей компании;</li>\n	<li>акционные условия банков/лизинговых компаний - партнеров для Вас;</li>\n	<li>кредитная сделка проходит прямо у нас в салоне;</li>\n</ul>', 'Уважаемые клиенты!\n\nОтдел кредита компании &quot;Автосоюз&quot; предлагает Вам оформление кредита на покупку автомобиля непосредственно в автосалоне.\n\nКредит от PORSCHE FINANCE GROUP\n\n\n	\n		\n			PORSCHE FINANCE GROUP\n			Размер авансового платежа\n			Годовая процентная ставка, USD/EURO\n			Срок кредита\n			Разовая комиссия от суммы кредита\n			Досрочное погашение\n			Страхование жизни\n			Ежемесячная комиссия\n		\n		\n			для юридических лиц\n			от 20%\n			9,9%\n			1 &ndash; 5 лет\n			2,5%\n			Без штрафных санкций\n			нет\n			нет\n		\n		\n			для СПД\n			от 20%\n			1 &ndash; 5 лет\n		\n		\n			для физических лиц\n			от 20%\n			1 &ndash; 5 лет\n		\n	\n\n\n\nДокументы для оформления кредита:\n\n\n	Паспорт гражданина Украины;\n	Справка о присвоении идентификационного кода (оригинал);\n	Свидетельство о браке;\n	Паспорт мужа (жены) гражданина Украины;\n	Справка о присвоении идентификационного кода (оригинал) мужа/жены;\n	Справка с места работы с указанием сроков работы на данном предприятии, занимаемой должности и среднемесячной суммы дохода за последние 6 месяцев (наличие печати предприятия обязательно);\n	Копия трудовой книжки (первая страница и две последние страницы);\n	Документы, удостоверяющие право собственности на движимое и недвижимое имущество.\n	Водительское удостоверение\n\n\n\nНаши преимущества:\n\n\n	индивидуальный подход к каждому Клиенту;\n	подбор самого оптимального варианта Вашего финансироания или финансирования Вашей компании;\n	акционные условия банков/лизинговых компаний - партнеров для Вас;\n	кредитная сделка проходит прямо у нас в салоне;\n\n', 'Кредит и его сео заголовок', 'Кредит, покупка авто в кредит и т.д.', 'Кредит - безграничные возможности, особенно с автоцентром на московском'),
(5, 5, 2, 'Андрей', 'Страхование', '<div>Страхование КАСКО в автоцентре &quot;Автосоюз&quot;<br />\nПреимущества:</div>\n\n<table border="0" cellpadding="5" cellspacing="0">\n	<tbody>\n		<tr>\n			<td>\n			<p>Услуга &quot;УДАЛЕНОЕ УРЕГУЛИРОВАНИЕ&quot;</p>\n\n			<ul>\n				<li>все документарное оформление страхового события происходит у нас в Автоцентре &quot;Автосоюз&quot; (заявление, акт осмотра, копии всех необходимых документов и т.п.).</li>\n				<li>Вам не надо тратить время на езду по городу между страховой компанией и СТО.</li>\n				<li>Вы не останетесь один-на-один со страховой компанией.</li>\n			</ul>\n\n			<p>Только в автосалоне</p>\n\n			<p>&laquo;Автосоюз&raquo; сумма по страховому</p>\n\n			<p>возмещению за ремонт автомобиля идет в зачет Ваших накопительных бонусов, и Вы получаете максимальный</p>\n\n			<p>дисконт на дальнейшее обслуживание на нашем сервисе.</p>\n\n			<p>Восстановление авто не дожидаясь денег от страховой компании.<br />\n			это означает, что</p>\n\n			<p>благодаря нашим договоренностям с партнерами - страховыми компаниями, Вы можете оставить автомобиль на ремонт на нашем</p>\n\n			<p>СТО не дожидаясь полного перечисления страхового возмещения от СК на расчетный счет СТО, мы лишь получаем, подтверждение, что СК признала случай страховым.</p>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<div>Партнеры по страхованию:</div>\n\n<table border="0" cellpadding="5" cellspacing="0">\n	<tbody>\n		<tr>\n			<td>\n			<ul>\n				<li>&quot;УСГ&quot;</li>\n				<li>&quot;ПРО100&quot;</li>\n				<li>&quot;ИНГО&quot;</li>\n				<li>&quot;Провидна&quot;</li>\n				<li>&quot;Финекс&quot;</li>\n				<li>&quot;Uniqa&quot;</li>\n				<li>&quot;НАСТА&quot;</li>\n			</ul>\n			</td>\n		</tr>\n	</tbody>\n</table>\n\n<div>Основные условия страхования:</div>\n\n<table border="0" cellpadding="3" cellspacing="0">\n	<tbody>\n		<tr>\n			<td>Страховое возмещение без справок из ГАИ</td>\n		</tr>\n		<tr>\n			<td>Страховое возмещение&nbsp; в результате грубого нарушения правил дорожного движение&nbsp;</td>\n		</tr>\n		<tr>\n			<td>Страховое возмещение по&nbsp; стеклу без справки из ГАИ, франшиза 0.</td>\n		</tr>\n		<tr>\n			<td>Страховая сумма не агрегатная (не уменьшается после страхового случая)</td>\n		</tr>\n		<tr>\n			<td>Страхование без учета износа и без огарничение по ночному месту хранения</td>\n		</tr>\n		<tr>\n			<td>Страхование с разбивкой платежа</td>\n		</tr>\n		<tr>\n			<td>Договор покрывает расходы на эвакуатор</td>\n		</tr>\n	</tbody>\n</table>', 'Страхование КАСКО в автоцентре &quot;Автосоюз&quot;\nПреимущества:\n\n\n	\n		\n			\n			Услуга &quot;УДАЛЕНОЕ УРЕГУЛИРОВАНИЕ&quot;\n\n			\n				все документарное оформление страхового события происходит у нас в Автоцентре &quot;Автосоюз&quot; (заявление, акт осмотра, копии всех необходимых документов и т.п.).\n				Вам не надо тратить время на езду по городу между страховой компанией и СТО.\n				Вы не останетесь один-на-один со страховой компанией.\n			\n\n			Только в автосалоне\n\n			&laquo;Автосоюз&raquo; сумма по страховому\n\n			возмещению за ремонт автомобиля идет в зачет Ваших накопительных бонусов, и Вы получаете максимальный\n\n			дисконт на дальнейшее обслуживание на нашем сервисе.\n\n			Восстановление авто не дожидаясь денег от страховой компании.\n			это означает, что\n\n			благодаря нашим договоренностям с партнерами - страховыми компаниями, Вы можете оставить автомобиль на ремонт на нашем\n\n			СТО не дожидаясь полного перечисления страхового возмещения от СК на расчетный счет СТО, мы лишь получаем, подтверждение, что СК признала случай страховым.\n			\n		\n	\n\n\nПартнеры по страхованию:\n\n\n	\n		\n			\n			\n				&quot;УСГ&quot;\n				&quot;ПРО100&quot;\n				&quot;ИНГО&quot;\n				&quot;Провидна&quot;\n				&quot;Финекс&quot;\n				&quot;Uniqa&quot;\n				&quot;НАСТА&quot;\n			\n			\n		\n	\n\n\nОсновные условия страхования:\n\n\n	\n		\n			Страховое возмещение без справок из ГАИ\n		\n		\n			Страховое возмещение&nbsp; в результате грубого нарушения правил дорожного движение&nbsp;\n		\n		\n			Страховое возмещение по&nbsp; стеклу без справки из ГАИ, франшиза 0.\n		\n		\n			Страховая сумма не агрегатная (не уменьшается после страхового случая)\n		\n		\n			Страхование без учета износа и без огарничение по ночному месту хранения\n		\n		\n			Страхование с разбивкой платежа\n		\n		\n			Договор покрывает расходы на эвакуатор\n		\n	\n\n', 'Сео заголовок для страхование', 'Ключевые слова по страхованию', 'Страхование очень важный момент при покупке автомобииииииииля)))'),
(6, 6, 2, 'Андрей', 'Лизинг', '<p align="justify" style="padding: 0px 0px 10px; margin: 0px; line-height: 18px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><b style="padding: 0px; margin: 0px;">Лизинг автомобиля </b>&ndash; это современный эффективный способ приобретения автомобиля. Сущность его состоит в долгосрочной аренде автомобиля с обязательным выкупом в конце срока лизинга. Компания &laquo;Автосоюз&raquo; предоставляет возможность приобретения автомобиля в лизинг. Воспользоваться этой услугой могут не только юридические лица и частные предприниматели, но и физические лица, имеющие стабильное финансовое положение и постоянный источник доходов.</p>\n\n<p style="padding: 0px 0px 10px; margin: 0px; line-height: 18px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><strong style="padding: 0px; margin: 0px;">П</strong><b style="padding: 0px; margin: 0px;">реимущества приобретения автомобиля в Лизинг по сравнению с кредитом <span style="padding: 0px; margin: 0px;">для физических лиц:</span></b></p>\n\n<ul style="padding: 0px 0px 10px; margin: 0px; list-style: none; line-height: 18px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">более низкие первоначальные затраты по сравнению с договором кредита (КАСКО, оплата Пенсионного Фонда распределяется на весь срок Лизинга),</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">нет необходимости оформлять Договор Залога, оплачивать Госпошлину и нотариальные услуги,</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">автомобиль не может быть предметом налогового ареста и на него не могут быть наложены претензии третьих лиц,</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">нет региональной зависимости (прописка или регистрация),</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">нет необходимости получать и нотариально оформлять согласие супруги или мужа на приобретение автомобиля в Лизинг и передачи его в Залог</li>\n</ul>\n\n<p style="padding: 0px 0px 10px; margin: 0px; line-height: 18px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">&nbsp;</p>\n\n<p style="padding: 0px 0px 10px; margin: 0px; line-height: 18px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><b style="padding: 0px; margin: 0px;">Преимущества приобретения автомобиля в Лизинг по сравнению с кредитом </b><span style="padding: 0px; margin: 0px;"><b style="padding: 0px; margin: 0px;">для юридических лиц:</b></span></p>\n\n<ul style="padding: 0px 0px 10px; margin: 0px; list-style: none; line-height: 18px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">нет необходимости создания собственного автохозяйства,</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">автомобиль не может быть предметом налогового ареста и на него не могут быть наложены претензии третьих лиц,</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">нет региональной зависимости (регистрация предприятия),</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">налоговый кредит на всю сумму стоимости лизинга возникает в момент передачи собственности (кроме легковых авто)</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">комиссионные платежи в пределах Договора Лизинга относятся на валовые затраты и уменьшают налогооблагаемую базу,</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">возможность приобретения активов без отвлечения оборотных средств компании,</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">нет необходимости оформлять Договор Залога, оплачивать Госпошлину и нотариальные услуги,</li>\n	<li style="padding: 0px 0px 0px 10px; margin: 0px; background-image: url(http://www.avtosojuz.ua/img/sys/new/li.gif); background-position: 0px 5px; background-repeat: no-repeat no-repeat;">возможность более четко планировать свои денежные потоки и удобство в работе Вашей бухгалтерии.</li>\n</ul>\n\n<p style="padding: 0px 0px 10px; margin: 0px; line-height: 18px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><b style="padding: 0px; margin: 0px;">В автосалоне компании &quot;Автосоюз&quot; Вы имеете возможность приобрести в лизинг </b><span style="padding: 0px; margin: 0px;"><b style="padding: 0px; margin: 0px;">любой автомобиль!</b></span></p>\n\n<p style="padding: 0px 0px 10px; margin: 0px; line-height: 18px; color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">Сделка полностью осуществляется прямо в салоне компании &quot;Автосоюз&quot;.</p>', 'Лизинг автомобиля &ndash; это современный эффективный способ приобретения автомобиля. Сущность его состоит в долгосрочной аренде автомобиля с обязательным выкупом в конце срока лизинга. Компания &laquo;Автосоюз&raquo; предоставляет возможность приобретения автомобиля в лизинг. Воспользоваться этой услугой могут не только юридические лица и частные предприниматели, но и физические лица, имеющие стабильное финансовое положение и постоянный источник доходов.\n\nПреимущества приобретения автомобиля в Лизинг по сравнению с кредитом для физических лиц:\n\n\n	более низкие первоначальные затраты по сравнению с договором кредита (КАСКО, оплата Пенсионного Фонда распределяется на весь срок Лизинга),\n	нет необходимости оформлять Договор Залога, оплачивать Госпошлину и нотариальные услуги,\n	автомобиль не может быть предметом налогового ареста и на него не могут быть наложены претензии третьих лиц,\n	нет региональной зависимости (прописка или регистрация),\n	нет необходимости получать и нотариально оформлять согласие супруги или мужа на приобретение автомобиля в Лизинг и передачи его в Залог\n\n\n&nbsp;\n\nПреимущества приобретения автомобиля в Лизинг по сравнению с кредитом для юридических лиц:\n\n\n	нет необходимости создания собственного автохозяйства,\n	автомобиль не может быть предметом налогового ареста и на него не могут быть наложены претензии третьих лиц,\n	нет региональной зависимости (регистрация предприятия),\n	налоговый кредит на всю сумму стоимости лизинга возникает в момент передачи собственности (кроме легковых авто)\n	комиссионные платежи в пределах Договора Лизинга относятся на валовые затраты и уменьшают налогооблагаемую базу,\n	возможность приобретения активов без отвлечения оборотных средств компании,\n	нет необходимости оформлять Договор Залога, оплачивать Госпошлину и нотариальные услуги,\n	возможность более четко планировать свои денежные потоки и удобство в работе Вашей бухгалтерии.\n\n\nВ автосалоне компании &quot;Автосоюз&quot; Вы имеете возможность приобрести в лизинг любой автомобиль!\n\nСделка полностью осуществляется прямо в салоне компании &quot;Автосоюз&quot;.\n', 'Лизинг - удобный способ купить автомобиль', 'Ключевые слова для лизинга', 'Короткое описание лизинга.....'),
(7, 7, 2, 'Андрей', 'Супер акция', '<p>Не пропустите две машини по цене одной!!! Не пропустите две машини по цене одной!!! Не пропустите две машини по цене одной!!!</p>', 'Не пропустите две машини по цене одной!!! Не пропустите две машини по цене одной!!! Не пропустите две машини по цене одной!!!\n', '', '', ''),
(8, 8, 2, 'Андрей', 'Прокат', '<p>Если Вы являетесь гостем нашего города, туристом или находитесь в Киеве в командировке, если Ваше авто в ремонте или трудовая деятельность связана с постоянными разъездами, то можно, конечно, воспользоваться для поездок по Киеву общественным транспортом или дорогим такси.</p>\n\n<p>Копирования всех составляющих частей сайта без разрешения владельца авторских прав запрещено. BLS зарегистрированная торговая марка с 2009 года. Автопрокатная компания BLS предоставляет качественные услуги по прокату автомобилей в Киеве и Крыму</p>', 'Если Вы являетесь гостем нашего города, туристом или находитесь в Киеве в командировке, если Ваше авто в ремонте или трудовая деятельность связана с постоянными разъездами, то можно, конечно, воспользоваться для поездок по Киеву общественным транспортом или дорогим такси.\n\nКопирования всех составляющих частей сайта без разрешения владельца авторских прав запрещено. BLS зарегистрированная торговая марка с 2009 года. Автопрокатная компания BLS предоставляет качественные услуги по прокату автомобилей в Киеве и Крыму\n', 'Сео заголовок', 'фывалдофыждва', 'дылва джфыоажфдылов афжыдваф');
INSERT INTO `article_item_languages` (`id`, `article_item_id`, `language_id`, `author`, `title`, `description`, `description_search`, `seo_title`, `key_words`, `seo_description`) VALUES
(9, 9, 2, 'Андрей', 'Еще одна статья', '<p>Один&nbsp;из&nbsp;самых широко используемых встроенных методов это&nbsp;&laquo;indexOf&raquo;. Каждый символ имеет свой индекс, содержащий номер его&nbsp;позиции в&nbsp;строке. Заметим,&nbsp;что индекс первого символа&nbsp;&mdash; 0, второго&nbsp;&mdash; 1 и&nbsp;т.&nbsp;д. Таким&nbsp;образом, индекс символа</p>', 'Один&nbsp;из&nbsp;самых широко используемых встроенных методов это&nbsp;&laquo;indexOf&raquo;. Каждый символ имеет свой индекс, содержащий номер его&nbsp;позиции в&nbsp;строке. Заметим,&nbsp;что индекс первого символа&nbsp;&mdash; 0, второго&nbsp;&mdash; 1 и&nbsp;т.&nbsp;д. Таким&nbsp;образом, индекс символа\n', '', '', ''),
(10, 10, 2, 'Андрей', 'И еще одна статья', '<p>Когда Вы объявляете строки в&nbsp;JavaScript или работаете с&nbsp;ними, всегда заключайте их&nbsp;в&nbsp;одинарные или&nbsp;двойные кавычки. Этим&nbsp;Вы объясняете браузеру, что&nbsp;он&nbsp;имеет дело со&nbsp;строкой. Не смешивайте использование кавычек в&nbsp;коде, если Вы&nbsp;начали строку с&nbsp;одинарной кавычки, а&nbsp;закончили двойной, JavaScript не&nbsp;поймет, что&nbsp;Вы&nbsp;имели в&nbsp;виду. Как правило, я&nbsp;использую одинарные кавычки для работы со&nbsp;строками, так&nbsp;как&nbsp;двойные кавычки я&nbsp;решил использовать для <abbr title="Hypertext Markup Language">HTML</abbr>, а&nbsp;одинарные&nbsp;&mdash; для JavaScript. Конечно,&nbsp;Вы&nbsp;можете делать все&nbsp;по-другому, но&nbsp;я&nbsp;советую вам&nbsp;придумать подобное правило для&nbsp;себя.</p>', 'Когда Вы объявляете строки в&nbsp;JavaScript или работаете с&nbsp;ними, всегда заключайте их&nbsp;в&nbsp;одинарные или&nbsp;двойные кавычки. Этим&nbsp;Вы объясняете браузеру, что&nbsp;он&nbsp;имеет дело со&nbsp;строкой. Не смешивайте использование кавычек в&nbsp;коде, если Вы&nbsp;начали строку с&nbsp;одинарной кавычки, а&nbsp;закончили двойной, JavaScript не&nbsp;поймет, что&nbsp;Вы&nbsp;имели в&nbsp;виду. Как правило, я&nbsp;использую одинарные кавычки для работы со&nbsp;строками, так&nbsp;как&nbsp;двойные кавычки я&nbsp;решил использовать для HTML, а&nbsp;одинарные&nbsp;&mdash; для JavaScript. Конечно,&nbsp;Вы&nbsp;можете делать все&nbsp;по-другому, но&nbsp;я&nbsp;советую вам&nbsp;придумать подобное правило для&nbsp;себя.\n', 'Mazda seo', 'ФЫваф ыва ы', 'фы вафыв фывафы'),
(11, 11, 2, 'Андрей', 'Нужно авто премиум-класса?', '<p>Наша компания предлагает под запросы своим клиентам пакет услуг по аренде автомобилей с водителем.</p>\n\n<p>Все ваши пожелания будут учтены, а мы всегда подскажем лучший вариант с учетом ваших целей и приоритетов. Аренда автомобилей в Киеве осуществляется круглосуточно в любое время года. Воспользовавшись услугами нашей компании всего лишь раз, вы станете нашим постоянным клиентом.</p>', 'Наша компания предлагает под запросы своим клиентам пакет услуг по аренде автомобилей с водителем.\n\nВсе ваши пожелания будут учтены, а мы всегда подскажем лучший вариант с учетом ваших целей и приоритетов. Аренда автомобилей в Киеве осуществляется круглосуточно в любое время года. Воспользовавшись услугами нашей компании всего лишь раз, вы станете нашим постоянным клиентом.\n', 'ывафва', 'фы ва фыв афыва фва ф', 'фы афыва фыв фыв афыа'),
(12, 12, 2, 'Андрюша', 'Новая статья изм', '<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><b>Описание:</b><br />\n<font color="#042000">В новом сезоне авторы подготовили для зрителя несколько сюрпризов.</font></p>\n\n<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><font color="#042000">За 16 серий сваты проживут перед камерами не только сезоны каникул и отпусков, но и полноценный годичный цикл. Кроме того, несколько серий будут посвящены большим праздникам.</font></p>\n\n<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><font color="#042000">Сваты успеют отправить Женю учиться в институт, задержать беглого преступника, женить Берковича, пережить с Митяем все трудности беременности Ларисы и побывать в Париже. И это только начало!</font></p>\n\n<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><font color="#042000">Также в сериале появятся и новые лица: к примеру, в одной из серий сыграла Татьяна Васильева.</font></p>\n\n<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><b>Качество:</b> <font color="#040420">SATRip</font><br />\n<b>Формат:</b> <font color="#040420">AVI</font><br />\n<b>Видео кодек:</b> <font color="#040420">DivX</font><br />\n<b>Аудио кодек:</b> <font color="#040420">MP3</font><br />\n<b>Видео:</b> <font color="#040420">DivX, 1500 Кбит/с, 720х400</font><br />\n<b>Аудио:</b> <font color="#040420">MP3, 2 ch, 128 Кбит/с</font></p>', 'Описание:\nВ новом сезоне авторы подготовили для зрителя несколько сюрпризов.\n\nЗа 16 серий сваты проживут перед камерами не только сезоны каникул и отпусков, но и полноценный годичный цикл. Кроме того, несколько серий будут посвящены большим праздникам.\n\nСваты успеют отправить Женю учиться в институт, задержать беглого преступника, женить Берковича, пережить с Митяем все трудности беременности Ларисы и побывать в Париже. И это только начало!\n\nТакже в сериале появятся и новые лица: к примеру, в одной из серий сыграла Татьяна Васильева.\n\nКачество: SATRip\nФормат: AVI\nВидео кодек: DivX\nАудио кодек: MP3\nВидео: DivX, 1500 Кбит/с, 720х400\nАудио: MP3, 2 ch, 128 Кбит/с\n', 'Сео заголовок Новая статья', 'Новая статья Новая статья', 'Новая статья Новая статья Новая статья'),
(14, 14, 2, 'Андрей', 'Тестовая статья', '<p>фва ы пывпа цук цупыи ыавмывапывап ывап ывпа ывап ывап ывап ывп ыв</p>', 'фва ы пывпа цук цупыи ыавмывапывап ывап ывпа ывап ывап ывап ывп ыв\n', 'фап авп ывпа', 'ывпа ывап а', 'фап ывап ц ыаичсмиыапр ыкп');

-- --------------------------------------------------------

--
-- Структура таблицы `article_items`
--

CREATE TABLE IF NOT EXISTS `article_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(8) NOT NULL,
  `display` tinyint(1) NOT NULL,
  `main` tinyint(1) NOT NULL,
  `href` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Дамп данных таблицы `article_items`
--

INSERT INTO `article_items` (`id`, `article_id`, `date`, `time`, `display`, `main`, `href`) VALUES
(1, 1, '2013-02-25', '16:05', 1, 0, 'articleitem/'),
(2, 2, '2013-03-04', '20:50', 1, 0, 'articleitem/'),
(3, 2, '2013-03-03', '20:55', 1, 0, 'articleitem/'),
(4, 3, '2013-03-04', '21:05', 1, 0, 'articleitem/'),
(5, 3, '2013-03-04', '21:10', 1, 0, 'articleitem/'),
(6, 3, '2013-03-04', '21:10', 1, 0, 'articleitem/'),
(7, 5, '2013-03-06', '17:00', 1, 0, 'articleitem/'),
(8, 3, '2013-04-01', '', 1, 0, 'articleitem/'),
(9, 3, '2013-03-20', '', 1, 0, 'articleitem/'),
(10, 3, '2013-03-29', '', 1, 0, 'articleitem/'),
(11, 3, '2013-04-01', '', 1, 0, 'articleitem/'),
(12, 8, '2013-05-27', '23:20', 1, 0, 'articleitem/'),
(14, 8, '0000-00-00', '18:40', 1, 1, 'articleitem/');

-- --------------------------------------------------------

--
-- Структура таблицы `article_items_links`
--

CREATE TABLE IF NOT EXISTS `article_items_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_item_id` int(11) NOT NULL,
  `link_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Дамп данных таблицы `article_items_links`
--

INSERT INTO `article_items_links` (`id`, `article_item_id`, `link_id`) VALUES
(2, 2, 6),
(3, 3, 7),
(5, 4, 9),
(10, 5, 14),
(7, 6, 11),
(9, 7, 13),
(12, 9, 31),
(16, 10, 35),
(15, 11, 34),
(19, 12, 99),
(21, 14, 101);

-- --------------------------------------------------------

--
-- Структура таблицы `article_languages`
--

CREATE TABLE IF NOT EXISTS `article_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `description_btm` varchar(4000) NOT NULL,
  `description_search` text NOT NULL,
  `seo_title` varchar(500) NOT NULL,
  `key_words` varchar(1000) NOT NULL,
  `seo_description` varchar(4000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `article_languages`
--

INSERT INTO `article_languages` (`id`, `article_id`, `language_id`, `description`, `description_btm`, `description_search`, `seo_title`, `key_words`, `seo_description`) VALUES
(1, 2, 2, '<p>Рихтовка автомобиля - это один из сложных, трудоёмких и дорогостоящих процессов ремонта автомобиля. Повреждения бывают лёгкие и сложные.<br />\n<br />\nВ лёгких повреждениях это вмятины, изгибы, порывы и другие повреждения на одной детали кузова и места их крепления (сварка, винтовое соединение) не повреждены. В таком случае рихтуется или меняется только одна деталь и не требует дополнительной разборки и подгонки детали. Деталь не разбирается от навесных компонентов (ручки, молдинги, поворотник', '<p>Кузовной ремонт - это устранение самых разнообразных дефектов кузова автомобиля. В кузовном ремонте, прежде всего сложный и трудоёмкий процесс это восстановления геометрии кузова. Геометрия кузова выполняется на стапеле.Кузовной ремонт выполняется с соблюдением требований и рекомендаций завода изготовителя.<br />\n<br />\nВ сложных повреждениях, где повреждены не только отдельная деталь, а много деталей и посадочные места и крепления повреждены или разрушены их сложно выставлять и подгонять друг к другу. Повреждённые детали по необходимости демонтируются (срезаются, отвинчиваются), разбираются, снимаются навесные детали (ручки, молдинги и другие встроенные механизмы, обшивка). Автомобиль закрепляется на массивной раме стапеля, четырьмя крепежами за пороги автомобиля и с помощью гидравлики вытягиваются все повреждённые места в определённой очерёдности используя специальные зажимы, зацепы, растяжки. При искривлениях геометрии кузова используется измерительная система, с помощью которой производятся замеры габаритов и расположения деталей кузова. И выставляются все восстановленные детали кузова по точному размеру избегая перекосом и неровностей.</p>', 'Рихтовка автомобиля - это один из сложных, трудоёмких и дорогостоящих процессов ремонта автомобиля. Повреждения бывают лёгкие и сложные.\n\nВ лёгких повреждениях это вмятины, изгибы, порывы и другие повреждения на одной детали кузова и места их крепления (сварка, винтовое соединение) не повреждены. В таком случае рихтуется или меняется только одна деталь и не требует дополнительной разборки и подгонки детали. Деталь не разбирается от навесных компонентов (ручки, молдинги, поворотник\n Кузовной ремонт - это устранение самых разнообразных дефектов кузова автомобиля. В кузовном ремонте, прежде всего сложный и трудоёмкий процесс это восстановления геометрии кузова. Геометрия кузова выполняется на стапеле.Кузовной ремонт выполняется с соблюдением требований и рекомендаций завода изготовителя.\n\nВ сложных повреждениях, где повреждены не только отдельная деталь, а много деталей и посадочные места и крепления повреждены или разрушены их сложно выставлять и подгонять друг к другу. Повреждённые детали по необходимости демонтируются (срезаются, отвинчиваются), разбираются, снимаются навесные детали (ручки, молдинги и другие встроенные механизмы, обшивка). Автомобиль закрепляется на массивной раме стапеля, четырьмя крепежами за пороги автомобиля и с помощью гидравлики вытягиваются все повреждённые места в определённой очерёдности используя специальные зажимы, зацепы, растяжки. При искривлениях геометрии кузова используется измерительная система, с помощью которой производятся замеры габаритов и расположения деталей кузова. И выставляются все восстановленные детали кузова по точному размеру избегая перекосом и неровностей.\n', 'Кузовной ремонт сео', 'ключевые слова кузовной ремонт', 'Короткое описание кузовного ремонта'),
(4, 5, 2, '<p>Акции нашей компании. Акции нашей компании.</p>', '<p>Акции нашей компании. Акции нашей компании.</p>', 'Акции нашей компании. Акции нашей компании.\n Акции нашей компании. Акции нашей компании.\n', 'Акции нашей компании.', 'Акции нашей компании.Акции нашей компании.', 'Акции нашей компании.Акции нашей компании.Акции нашей компании.Акции нашей компании.'),
(2, 3, 2, '', '', ' ', 'Финансовые услуги сео заголовок', 'Ключевые слова по сео заголовку', 'Описание странички с финансовыми услугами'),
(5, 8, 2, '<p>Год выпуска: 2012<br />\nЖанр:&amp;lawdfa sdf</p>', '<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><b>В ролях:<br />\n<font color="#430E08">Фёдор Добронравов, Татьяна Кравченко, Людмила Артемьева, Анна Кошмал, Александр Феклистов, Анна Полищук, Костя Чернокрылюк, Олеся Железняк, Николай Добрынин, Владимир Зельдин, Ольга Аросева, Даниил Белых, Инна Королёва, Эммануил Виторган, Елена Сафонова, Роман Лукьянов, Евгений Капорин, Фёдор Гуринец, Алексей Смолка, Денис Шепотинник, Татьяна Васильева, Мария Кочур, Екатерина Варченко и др.</font></b></p>\n\n<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><b>Описание:</b><br />\n<font color="#042000">В новом сезоне авторы подготовили для зрителя несколько сюрпризов.</font></p>\n\n<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><font color="#042000">За 16 серий сваты проживут перед камерами не только сезоны каникул и отпусков, но и полноценный годичный цикл. Кроме того, несколько серий будут посвящены большим праздникам.</font></p>\n\n<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><font color="#042000">Сваты успеют отправить Женю учиться в институт, задержать беглого преступника, женить Берковича, пережить с Митяем все трудности беременности Ларисы и побывать в Париже. И это только начало!</font></p>\n\n<p style="color: rgb(34, 34, 34); font-family: tahoma, sans-serif, verdana; font-size: 12px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);"><font color="#042000">Также в сериале появятся и новые лица: к примеру, в одной из серий сыграла Татьяна Васильева.</font></p>', 'Год выпуска: 2012\nЖанр:&amp;lawdfa sdf\n В ролях:\nФёдор Добронравов, Татьяна Кравченко, Людмила Артемьева, Анна Кошмал, Александр Феклистов, Анна Полищук, Костя Чернокрылюк, Олеся Железняк, Николай Добрынин, Владимир Зельдин, Ольга Аросева, Даниил Белых, Инна Королёва, Эммануил Виторган, Елена Сафонова, Роман Лукьянов, Евгений Капорин, Фёдор Гуринец, Алексей Смолка, Денис Шепотинник, Татьяна Васильева, Мария Кочур, Екатерина Варченко и др.\n\nОписание:\nВ новом сезоне авторы подготовили для зрителя несколько сюрпризов.\n\nЗа 16 серий сваты проживут перед камерами не только сезоны каникул и отпусков, но и полноценный годичный цикл. Кроме того, несколько серий будут посвящены большим праздникам.\n\nСваты успеют отправить Женю учиться в институт, задержать беглого преступника, женить Берковича, пережить с Митяем все трудности беременности Ларисы и побывать в Париже. И это только начало!\n\nТакже в сериале появятся и новые лица: к примеру, в одной из серий сыграла Татьяна Васильева.\n', 'Сео заголовокasdf', 'Ключевые словаasdf', 'Описание странички))))asd f'),
(6, 8, 1, '<p>vsdfgs dgsgf sdgf sgfsdiush lkjl sj dgfpsk,xoh welr,nsldfii jsklgj nl</p>', '<p><br />\nvsdfgs dgsgf sdgf sgfsdiush lkjl sj dgfpsk,xoh welr,nsldfii jsklgj nl sdf dfgsdfg</p>', 'vsdfgs dgsgf sdgf sgfsdiush lkjl sj dgfpsk,xoh welr,nsldfii jsklgj nl\n \nvsdfgs dgsgf sdgf sgfsdiush lkjl sj dgfpsk,xoh welr,nsldfii jsklgj nl sdf dfgsdfg\n', 'vsdfgs dgsgf sdgf', 'vsdfgs dgsgf sdgfvsdfgs dgsgf sdgfvsdfgs dgsgf sdgfvsdfgs dgsgf sdgf', 'vsdfgs dgsgf sdgfvsdfgs dgsgf sdgfvsdfgs dgsgf sdgfvsdfgs dgsgf sdgfvsdfgs dgsgf sdgfvsdfgs dgsgf sdgf');

-- --------------------------------------------------------

--
-- Структура таблицы `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `articles`
--

INSERT INTO `articles` (`id`, `component_id`) VALUES
(1, 3),
(2, 7),
(3, 8),
(5, 14),
(8, 46);

-- --------------------------------------------------------

--
-- Структура таблицы `articles_links`
--

CREATE TABLE IF NOT EXISTS `articles_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `link_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Структура таблицы `autobrend_autologoes`
--

CREATE TABLE IF NOT EXISTS `autobrend_autologoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autobrend_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `autobrend_autologoes`
--

INSERT INTO `autobrend_autologoes` (`id`, `autobrend_id`, `name`) VALUES
(3, 3, '7acd64ef150babfa2e2605640b5db71b9f186d3c.png'),
(4, 4, 'a62b53d433804f0b75d8f8edfc30d71db51478cb.png'),
(5, 5, 'b5d106b07a11b6b9abba25cec1c760bd5ec2426a.png'),
(6, 6, '1bca4fc30f92f2a4164189665b61143d1d1abbe6.png');

-- --------------------------------------------------------

--
-- Структура таблицы `autobrend_languages`
--

CREATE TABLE IF NOT EXISTS `autobrend_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autobrend_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `description_search` varchar(3000) NOT NULL,
  `moto` varchar(200) NOT NULL,
  `baner_name` varchar(200) NOT NULL,
  `seo_title` varchar(200) NOT NULL,
  `key_words` varchar(500) NOT NULL,
  `seo_description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Дамп данных таблицы `autobrend_languages`
--

INSERT INTO `autobrend_languages` (`id`, `autobrend_id`, `language_id`, `name`, `description`, `description_search`, `moto`, `baner_name`, `seo_title`, `key_words`, `seo_description`) VALUES
(12, 4, 3, 'New title title', 'New description New description New description', '', '', '', '', '', ''),
(13, 5, 1, 'New title title', 'New description New description New description', '', '', '', '', '', ''),
(14, 5, 2, 'Opel', '<p>Компания Opel сделает все возможное для обеспечения достоверности и актуальности информации, представленной на данном веб-сайте, но при этом не несет никакой ответственности в отношении претензий или убытков, понесенных в результате использования такой информации. Некоторая информация, представленная на сайте, может быть неточной ввиду изменений характеристик продукции. Некоторое оборудование, описанное или представленное на сайте, может быть доступно только в определенных странах или только за дополнительную плату. Компания Opel оставляет за собой право в любой момент вносить изменения в технические характеристики продукции. Для получения точной информации по актуальным техническим характеристикам соответствующей продукции в вашей стране обращайтесь к вашему местному дилеру Opel.</p>', ' Компания Opel сделает все возможное для обеспечения достоверности и актуальности информации, представленной на данном веб-сайте, но при этом не несет никакой ответственности в отношении претензий или убытков, понесенных в результате использования такой информации. Некоторая информация, представленная на сайте, может быть неточной ввиду изменений характеристик продукции. Некоторое оборудование, описанное или представленное на сайте, может быть доступно только в определенных странах или только за дополнительную плату. Компания Opel оставляет за собой право в любой момент вносить изменения в технические характеристики продукции. Для получения точной информации по актуальным техническим характеристикам соответствующей продукции в вашей стране обращайтесь к вашему местному дилеру Opel.\n', '', '', 'Сео заголовок Opel', 'Ключевые слова для опеля))', 'сео описание страницы опеля'),
(15, 5, 3, 'New title title', 'New description New description New description', '', '', '', '', '', ''),
(7, 3, 1, 'New title title', 'New description New description New description', '', '', '', '', '', ''),
(8, 3, 2, 'Авто ЗАЗ', '<p>Филия &laquo;АвтоЗАЗ-сервис&raquo; - эксклюзивный дистрибьютор автомобилей ЗАЗ в Украине (входит в состав Корпорации УкрАВТО). Компания имеет многочисленную дилерскую сеть и обеспечивает полный комплекс услуг, начиная с продажи автомобилей, тест-драйва, страхования, кредитования и заканчивая официальным гарантийным и послегарантийным сервисным обслуживанием.</p>', ' Филия &laquo;АвтоЗАЗ-сервис&raquo; - эксклюзивный дистрибьютор автомобилей ЗАЗ в Украине (входит в состав Корпорации УкрАВТО). Компания имеет многочисленную дилерскую сеть и обеспечивает полный комплекс услуг, начиная с продажи автомобилей, тест-драйва, страхования, кредитования и заканчивая официальным гарантийным и послегарантийным сервисным обслуживанием.\n', 'Автозаз покупай у наз', 'Супер турбо мега машина', 'Авто заз сео', 'Ключевые слова', 'Описание для поисковых ботов'),
(9, 3, 3, 'New title title', 'New description New description New description', '', '', '', '', '', ''),
(10, 4, 1, 'New title title', 'New description New description New description', '', '', '', '', '', ''),
(11, 4, 2, 'Chevrolet', '<p>Chevrolet (<a href="http://ru.wikipedia.org/wiki/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA" title="Русский язык">рус.</a> Шевроле́, МФА <a href="http://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D0%B4%D1%83%D0%BD%D0%B0%D1%80%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9_%D1%84%D0%BE%D0%BD%D0%B5%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D0%B0%D0%BB%D1%84%D0%B0%D0%B2%D0%B8%D1%82" title="Международный фонетический алфавит">[ˈʃɛvrəleɪ]</a><a href="http://ru.wikipedia.org/wiki/Chevrolet#cite_note-1">[1]</a>, в США также Chevy, <a href="http://ru.wikipedia.org/wiki/%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA" title="Русский язык">рус.</a> Ше́ви)&nbsp;&mdash; марка <a href="http://ru.wikipedia.org/wiki/%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C" title="Автомобиль">автомобилей</a>, производимых и реализуемых одноимённым экономически самостоятельным подразделением корпорации <a href="http://ru.wikipedia.org/wiki/General_Motors" title="General Motors">General Motors</a>.</p>\n\n<p>Шевроле является самой популярной среди марок концерна, в <a href="http://ru.wikipedia.org/wiki/2007_%D0%B3%D0%BE%D0%B4" title="2007 год">2007 году</a> было реализовано около 2,6&nbsp;млн автомобилей.</p>', ' Chevrolet (рус. Шевроле́, МФА [ˈʃɛvrəleɪ][1], в США также Chevy, рус. Ше́ви)&nbsp;&mdash; марка автомобилей, производимых и реализуемых одноимённым экономически самостоятельным подразделением корпорации General Motors.\n\nШевроле является самой популярной среди марок концерна, в 2007 году было реализовано около 2,6&nbsp;млн автомобилей.\n', 'The workhorse that''s also up for the getaway', '2013 silvereado 1500', 'Сео заголовок Chevrolet', 'Ключевые слова для Chevrolet', 'Наше описание для поисковых ботов Chevrolet'),
(16, 6, 1, 'New title title', 'New description New description New description', '', '', '', '', '', ''),
(17, 6, 2, 'Cherry', '<p>Chery Automobile&nbsp;&mdash; <a href="http://ru.wikipedia.org/wiki/%D0%9A%D0%B8%D1%82%D0%B0%D0%B9" title="Китай">китайская</a> автомобилестроительная компания. Основана в <a href="http://ru.wikipedia.org/wiki/1997_%D0%B3%D0%BE%D0%B4" title="1997 год">1997 году</a>.</p>\n\n<p>Chery (в переводе с китайского это нечто вроде &laquo;особого благословения&raquo;) была основана в 1997 году по инициативе мэрии города <a href="http://ru.wikipedia.org/wiki/%D0%A3%D1%85%D1%83" title="Уху">Уху</a> (Wuhu) в провинции <a href="http://ru.wikipedia.org/wiki/%D0%90%D0%BD%D1%8C%D1%85%D0%BE%D0%B9" title="Аньхой">Аньхой</a>. Акционерами компании стало несколько государственных компаний и холдингов провинции <a href="http://ru.wikipedia.org/wiki/%D0%90%D0%BD%D1%8C%D1%85%D0%BE%D0%B9" title="Аньхой">Аньхой</a>, а также мелкие инвесторы. Было приобретено оборудование европейского завода <a href="http://ru.wikipedia.org/wiki/Ford" title="Ford">Ford</a> за $25&nbsp;млн. Производство <a href="http://ru.wikipedia.org/wiki/%D0%9B%D0%B5%D0%B3%D0%BA%D0%BE%D0%B2%D0%BE%D0%B9_%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C" title="Легковой автомобиль">автомобилей</a> началось в <a href="http://ru.wikipedia.org/wiki/1999_%D0%B3%D0%BE%D0%B4" title="1999 год">1999 году</a> после приобретения лицензии на шасси Toledo компании <a href="http://ru.wikipedia.org/wiki/Seat" title="Seat">Seat</a>.</p>', ' Chery Automobile&nbsp;&mdash; китайская автомобилестроительная компания. Основана в 1997 году.\n\nChery (в переводе с китайского это нечто вроде &laquo;особого благословения&raquo;) была основана в 1997 году по инициативе мэрии города Уху (Wuhu) в провинции Аньхой. Акционерами компании стало несколько государственных компаний и холдингов провинции Аньхой, а также мелкие инвесторы. Было приобретено оборудование европейского завода Ford за $25&nbsp;млн. Производство автомобилей началось в 1999 году после приобретения лицензии на шасси Toledo компании Seat.\n', 'Акционные предложения', '', 'Сео заголовок Amulet', 'Ключевые слова для Amulet', 'Наше описание для поисковых ботов Amulet'),
(18, 6, 3, 'New title title', 'New description New description New description', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `autobrend_logoes`
--

CREATE TABLE IF NOT EXISTS `autobrend_logoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autobrend_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Дамп данных таблицы `autobrend_logoes`
--

INSERT INTO `autobrend_logoes` (`id`, `autobrend_id`, `name`) VALUES
(27, 3, 'b80f6153a0afc8745adcd9f93fbe6aad42a99666.png'),
(31, 6, '932bc5a1e61b0d8766357b79e886323d019106c9.png'),
(30, 5, 'b39b6647b4fcb984dd3d915f0ab13930e4098c1a.png'),
(29, 4, 'b1fcae11c3f040564981c4f074334d155d0686c9.png');

-- --------------------------------------------------------

--
-- Структура таблицы `autobrend_pictures`
--

CREATE TABLE IF NOT EXISTS `autobrend_pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autobrend_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Дамп данных таблицы `autobrend_pictures`
--

INSERT INTO `autobrend_pictures` (`id`, `autobrend_id`, `name`) VALUES
(9, 6, '40013499f580f87f09a73e386d98063573583bfd.jpg'),
(8, 6, '8cfcf9ef1e3c8beb5729fbeeb8e788406b8941e5.jpg'),
(16, 4, '972fcfa3247a2856aeeb902ce6730f9dfba1b6e1.jpg'),
(12, 5, '1e7497c5499e904320dd429d30ad28cfcd91af33.jpg'),
(13, 5, '9988a544b717b0281dd326ba1ee4b017250c4e7f.jpg'),
(14, 3, 'a0d60c42ffd9081cee6a7157c2aa848ebd61fb8f.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `autobrends`
--

CREATE TABLE IF NOT EXISTS `autobrends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(18) NOT NULL,
  `price` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `autobrends`
--

INSERT INTO `autobrends` (`id`, `date`, `price`) VALUES
(3, '05-03-2013 15:48:4', '120 000'),
(4, '05-03-2013 16:41:0', '340 400'),
(5, '04-03-2013 21:50:0', ''),
(6, '04-04-2013 12:36:3', '120 000');

-- --------------------------------------------------------

--
-- Структура таблицы `autogroups`
--

CREATE TABLE IF NOT EXISTS `autogroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(19) NOT NULL,
  `date` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `autogroups`
--

INSERT INTO `autogroups` (`id`, `name`, `date`) VALUES
(2, 'Первая группа', '15-04-2013 16:37:51'),
(4, 'Вторая группа', '15-04-2013 16:33:50'),
(5, 'Третья группа', '15-04-2013 17:10:18');

-- --------------------------------------------------------

--
-- Структура таблицы `autogroups_automodels`
--

CREATE TABLE IF NOT EXISTS `autogroups_automodels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autogroup_id` int(11) NOT NULL,
  `automodel_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `autogroups_automodels`
--

INSERT INTO `autogroups_automodels` (`id`, `autogroup_id`, `automodel_id`) VALUES
(1, 2, 12),
(13, 5, 21),
(12, 2, 26),
(10, 4, 30),
(17, 5, 19),
(18, 5, 28),
(19, 5, 29);

-- --------------------------------------------------------

--
-- Структура таблицы `automodel_languages`
--

CREATE TABLE IF NOT EXISTS `automodel_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `automodel_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `description_search` text NOT NULL,
  `seo_title` varchar(200) NOT NULL,
  `key_words` varchar(500) NOT NULL,
  `seo_description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Дамп данных таблицы `automodel_languages`
--

INSERT INTO `automodel_languages` (`id`, `automodel_id`, `language_id`, `name`, `description`, `description_search`, `seo_title`, `key_words`, `seo_description`) VALUES
(1, 12, 2, 'Vida', '<p>Описание Vida</p>\n\n<p>ЗАЗ VIDA продолжает историю всем хорошо известного Chevrolet Aveo, в котором гармонично сочетаются корейское качество, мировые стандарты безопасности и украинская цена!</p>\n\n<p>ДИЗАЙН автомобиля разработал известный дизайнер Джорджетто Джуджаро итальянского ателье ItalDesign, работавший над созданием новых моделей для целого ряда ведущих автомобильных компаний и представил миру множество бестселлеров.&nbsp;Вот почему ЗАЗ VIDA имеет неповторимый современный стиль и выразительный дизайн.&nbsp;</p>\n\n<p>КОМФОРТ И УДОВОЛЬСТВИЕ обеспечивает богатый набор опций и удобных функций. Кондиционер, гидроусилитель руля, электростеклоподъемники, противотуманные фары, внешние зеркала с обогревом и электронным регулированием - все это далеко не полный перечень составляющих комфорта.</p>\n\n<p>БЕЗОПАСНОСТЬ чувствуется в каждой детали - автомобиль&nbsp; спроектирован с учетом фактора надежности и выносливости. Благодаря повышенному вниманию производителей к безопасности автомобиля, новый ЗАЗ VIDA получил обширный перечень систем активной и пассивной безопасности.</p>\n\n<p>ДОСТУПНОСТЬ обеспечивает организация производства в Украине. Высокий уровень локализации, эффективная логистика позволяет предложить украинским покупателям автомобили по самым лояльным ценам в сегменте. Поэтому, будьте уверены: ЗАЗ VIDA - воплощение максимальной функциональности и комфорта по приемлемой цене.</p>\n\n<p>ЗАЗ Vida добавит ярких красок в повседневность! С ним Вы почувствуете новые эмоции в бурном водовороте жизни!</p>', 'Описание Vida\n\nЗАЗ VIDA продолжает историю всем хорошо известного Chevrolet Aveo, в котором гармонично сочетаются корейское качество, мировые стандарты безопасности и украинская цена!\n\nДИЗАЙН автомобиля разработал известный дизайнер Джорджетто Джуджаро итальянского ателье ItalDesign, работавший над созданием новых моделей для целого ряда ведущих автомобильных компаний и представил миру множество бестселлеров.&nbsp;Вот почему ЗАЗ VIDA имеет неповторимый современный стиль и выразительный дизайн.&nbsp;\n\nКОМФОРТ И УДОВОЛЬСТВИЕ обеспечивает богатый набор опций и удобных функций. Кондиционер, гидроусилитель руля, электростеклоподъемники, противотуманные фары, внешние зеркала с обогревом и электронным регулированием - все это далеко не полный перечень составляющих комфорта.\n\nБЕЗОПАСНОСТЬ чувствуется в каждой детали - автомобиль&nbsp; спроектирован с учетом фактора надежности и выносливости. Благодаря повышенному вниманию производителей к безопасности автомобиля, новый ЗАЗ VIDA получил обширный перечень систем активной и пассивной безопасности.\n\nДОСТУПНОСТЬ обеспечивает организация производства в Украине. Высокий уровень локализации, эффективная логистика позволяет предложить украинским покупателям автомобили по самым лояльным ценам в сегменте. Поэтому, будьте уверены: ЗАЗ VIDA - воплощение максимальной функциональности и комфорта по приемлемой цене.\n\nЗАЗ Vida добавит ярких красок в повседневность! С ним Вы почувствуете новые эмоции в бурном водовороте жизни!\n', 'Запорожец сео заголовок', 'Запорожец, суперкар.', 'Описание запорожца'),
(2, 13, 2, 'Camaro', '<p>Chevrolet Camaro (&laquo;Шевроле́ Кама́ро&raquo;)&nbsp;&mdash; культовый <a href="http://ru.wikipedia.org/wiki/%D0%A1%D0%A8%D0%90" title="США">американский</a> <a href="http://ru.wikipedia.org/wiki/%D0%9B%D0%B5%D0%B3%D0%BA%D0%BE%D0%B2%D0%BE%D0%B9_%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C" title="Легковой автомобиль">легковой автомобиль</a>, выпускающийся подразделением<a href="http://ru.wikipedia.org/wiki/Chevrolet" title="Chevrolet">Chevrolet</a> корпорации <a href="http://ru.wikipedia.org/wiki/General_Motors" title="General Motors">GM</a> с <a href="http://ru.wikipedia.org/wiki/1967" title="1967">1967</a> по сегодняшний день.</p>\n\n<p>Под названием &laquo;Камаро&raquo; выпускалось несколько моделей, не связанных друг с другом технологически. Chevrolet Camaro SS и Chevrolet Camaro Concept присутствуют в играх <a href="http://ru.wikipedia.org/wiki/Need_for_Speed:_Carbon" title="Need for Speed: Carbon">Need for Speed: Carbon</a>, <a href="http://ru.wikipedia.org/wiki/Need_for_Speed:_Shift" title="Need for Speed: Shift">NFS: Shift</a>, <a href="http://ru.wikipedia.org/wiki/Need_for_Speed:_Hot_Pursuit_(2010)" title="Need for Speed: Hot Pursuit (2010)">NFS: Hot Pursuit (2010)</a>, <a href="http://ru.wikipedia.org/wiki/Need_for_Speed:_The_Run" title="Need for Speed: The Run">NFS: The Run</a> и <a href="http://ru.wikipedia.org/wiki/Need_for_Speed:_Most_Wanted_(2012)" title="Need for Speed: Most Wanted (2012)">NFS: Most Wanted (2012)</a>. Облик &laquo;Камаро&raquo; принимал трансформер <a href="http://ru.wikipedia.org/wiki/%D0%A8%D0%B5%D1%80%D1%88%D0%B5%D0%BD%D1%8C_(%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%BE%D1%80%D0%BC%D0%B5%D1%80)" title="Шершень (трансформер)">Бамблби</a> в кинотрилогии Майкла Бэя <a href="http://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%BE%D1%80%D0%BC%D0%B5%D1%80%D1%8B_(%D1%84%D0%B8%D0%BB%D1%8C%D0%BC)" title="Трансформеры (фильм)">Трансформеры</a>(2007,2009,2011).</p>', 'Chevrolet Camaro (&laquo;Шевроле́ Кама́ро&raquo;)&nbsp;&mdash; культовый американский легковой автомобиль, выпускающийся подразделениемChevrolet корпорации GM с 1967 по сегодняшний день.\n\nПод названием &laquo;Камаро&raquo; выпускалось несколько моделей, не связанных друг с другом технологически. Chevrolet Camaro SS и Chevrolet Camaro Concept присутствуют в играх Need for Speed: Carbon, NFS: Shift, NFS: Hot Pursuit (2010), NFS: The Run и NFS: Most Wanted (2012). Облик &laquo;Камаро&raquo; принимал трансформер Бамблби в кинотрилогии Майкла Бэя Трансформеры(2007,2009,2011).\n', 'camaro seo', 'camaro ключевые слова', 'camaro описание'),
(3, 14, 2, 'astra', '<p>asdf asdf asdf asdf asdf asf asd asdf asdf asdf asdf</p>', '', '', '', ''),
(4, 14, 2, 'astra', '<p>asdf asdf asdf asdf asdf asf asd asdf asdf asdf asdf</p>', 'asdf asdf asdf asdf asdf asf asd asdf asdf asdf asdf\n', '', '', ''),
(5, 15, 2, 'cherry', '<p>cherry amulet new car for you and me)</p>', 'cherry amulet new car for you and me)\n', '', '', ''),
(6, 18, 2, 'Forza', '<h1>Описание Forza</h1>\n\n<p>Новый яркий дизайн<br />\nОтечественный новичок ЗАЗ Forza, серийное производство которого стартовало в этот же день, оказался ярким не только по названию - стильный свежий дизайн от итальянского ателье Torino Design ощущается в каждой детали. Цветовая гамма автомобиля, интерьер и экстерьер порадует даже самых заядлых потребителей, ведь благородные черты Forza заметны с первого взгляда.<br />\nПри более детальном изучении к преимуществам ЗАЗ Forza необходимо отнести: мощный двигатель (109 л.с.) австрийской разработки ACTECO, соответствующий стандарту Евро-4, достаточно широкий набор опций как для автомобиля бюджетного сегмента, конкурентная цена.</p>\n\n<p>Функциональность<br />\nТеперь детально. Двигатель автомобиля ЗАЗ Forza - 16-тиклапанний бензиновый силовой агрегат объемом 1497 куб.см. с расходом топлива 7,2 л/100 км в смешанном цикле, 5,8 л/100 км - загородном, 9,7 л/100 км - городском. Сердце модели агрегатируется с пятиступенчатой механической трансмиссией и обеспечивает хорошую динамику. Передняя подвеска - независимый Mc Pherson - и задняя - полузависимая с пружинами-амортизаторами - дают отличные показатели управляемости. Максимальный крутящий момент - 140 Нм при 4500 об/мин. Уже в базовой комплектации имеется гидроусилитель руля, рулевая колонка с регулировкой наклона и кондиционер. Авто может смело претендовать не только на достойное место среди других железных коней для сильных мужских рук, но и на звание &laquo;леди-мобиль&raquo; - благодаря легкости и комфортабельности! Центральный замок с дистанционным управлением и дистанционное управление открыванием багажника уже в начальной комплектации - еще один плюс в перечне достоинств данного новичка среди одноклассников.</p>', 'Описание Forza\n\nНовый яркий дизайн\nОтечественный новичок ЗАЗ Forza, серийное производство которого стартовало в этот же день, оказался ярким не только по названию - стильный свежий дизайн от итальянского ателье Torino Design ощущается в каждой детали. Цветовая гамма автомобиля, интерьер и экстерьер порадует даже самых заядлых потребителей, ведь благородные черты Forza заметны с первого взгляда.\nПри более детальном изучении к преимуществам ЗАЗ Forza необходимо отнести: мощный двигатель (109 л.с.) австрийской разработки ACTECO, соответствующий стандарту Евро-4, достаточно широкий набор опций как для автомобиля бюджетного сегмента, конкурентная цена.\n\nФункциональность\nТеперь детально. Двигатель автомобиля ЗАЗ Forza - 16-тиклапанний бензиновый силовой агрегат объемом 1497 куб.см. с расходом топлива 7,2 л/100 км в смешанном цикле, 5,8 л/100 км - загородном, 9,7 л/100 км - городском. Сердце модели агрегатируется с пятиступенчатой механической трансмиссией и обеспечивает хорошую динамику. Передняя подвеска - независимый Mc Pherson - и задняя - полузависимая с пружинами-амортизаторами - дают отличные показатели управляемости. Максимальный крутящий момент - 140 Нм при 4500 об/мин. Уже в базовой комплектации имеется гидроусилитель руля, рулевая колонка с регулировкой наклона и кондиционер. Авто может смело претендовать не только на достойное место среди других железных коней для сильных мужских рук, но и на звание &laquo;леди-мобиль&raquo; - благодаря легкости и комфортабельности! Центральный замок с дистанционным управлением и дистанционное управление открыванием багажника уже в начальной комплектации - еще один плюс в перечне достоинств данного новичка среди одноклассников.\n', '', '', ''),
(7, 19, 2, 'Lanos AT', '<p>asasdf asdf asdf asdfas</p>', 'asasdf asdf asdf asdfas\n', '', '', ''),
(8, 21, 2, 'Lanos', '<p>safd asdf asd asd f</p>', 'safd asdf asd asd f\n', '', '', ''),
(12, 25, 2, 'Sens hatchback', '<p>asdf asdf asdf asdf asdf asdf asdfasdfa saf&nbsp;</p>', 'asdf asdf asdf asdf asdf asdf asdfasdfa saf&nbsp;\n', '', '', ''),
(13, 26, 2, 'Vida hatchback', '<p>asf asd fasdf asdf asd fasdf asdfa s</p>', 'asf asd fasdf asdf asd fasdf asdfa s\n', '', '', ''),
(14, 27, 2, 'Forza hatchback', '<p>asd fasdf asdf asdf adf asf asdf asf asdf asdf asdf asdf asdf asdf asdf a</p>', 'asd fasdf asdf asdf adf asf asdf asf asdf asdf asdf asdf asdf asdf asdf a\n', '', '', ''),
(15, 28, 2, 'Lanos hatchback', '<p>asdf as fasdf asd asd asdf asd asdf asdf a</p>', 'asdf as fasdf asd asd asdf asd asdf asdf a\n', '', '', ''),
(16, 29, 2, 'Lanos pick-up', '<p>asfa sdf asdf asdf asdfasd asdf a</p>', 'asfa sdf asdf asdf asdfasd asdf a\n', '', '', ''),
(17, 30, 2, 'Sens', '<p>asdf asd fasd asd asd asd asd asdfa</p>', 'asdf asd fasd asd asd asd asd asdfa\n', '', '', ''),
(18, 31, 2, 'Aveo hatchback', '<p>asdf adf as das asd asa</p>', 'asdf adf as das asd asa\n', '', '', ''),
(19, 32, 2, 'Aveo new sedan', '<p>asdf asdf asdf asf asdf asdf a</p>', 'asdf asdf asdf asf asdf asdf a\n', '', '', ''),
(20, 33, 2, 'Malibu', '<p>adf asd asd ad asdf asdf df</p>', 'adf asd asd ad asdf asdf df\n', '', '', ''),
(21, 34, 2, 'Cruse facelift wagon', '<p>asdf asdf asd asd af asdf as</p>', 'asdf asdf asd asd af asdf as\n', '', '', ''),
(22, 35, 2, 'Cruse facelift sedan', '<p>asfa sd fas as fas asd f asdf asdf adf&nbsp;</p>', 'asfa sd fas as fas asd f asdf asdf adf&nbsp;\n', '', '', ''),
(23, 36, 2, 'Cruze facelift hatchback', '<p>asdf asdf as fasdf asd asasf asdf asf</p>', 'asdf asdf as fasdf asd asasf asdf asf\n', '', '', ''),
(24, 37, 2, 'New Captiva', '<p>sadf sdf as das a adf asdf asdf</p>', 'sadf sdf as das a adf asdf asdf\n', '', '', ''),
(25, 38, 2, 'Cruze hatchback', '<p>asfda &nbsp;sdasd asd asdf as</p>', 'asfda &nbsp;sdasd asd asdf as\n', '', '', ''),
(26, 39, 2, 'Cruze', '<p>asf asdf asdf as asd asdf</p>', 'asf asdf asdf as asd asdf\n', '', '', ''),
(27, 40, 2, 'Orlando', '<p>asdf asdf asdf asd asdf asd adf</p>', 'asdf asdf asdf asd asdf asd adf\n', '', '', ''),
(28, 41, 2, 'Spark', '<p>asdf asdf asdf adf asd fasdf a</p>', 'asdf asdf asdf adf asd fasdf a\n', '', '', ''),
(29, 42, 2, 'Lacetti sedan', '<p>asdf asd asdf asdf asdf asdf&nbsp;</p>', 'asdf asd asdf asdf asdf asdf&nbsp;\n', '', '', ''),
(30, 43, 2, 'Lacetti hatchback', '<p>asdf asdf asdf asdf asfd asdf</p>', 'asdf asdf asdf asdf asfd asdf\n', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `automodel_logoes`
--

CREATE TABLE IF NOT EXISTS `automodel_logoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `automodel_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=42 ;

--
-- Дамп данных таблицы `automodel_logoes`
--

INSERT INTO `automodel_logoes` (`id`, `automodel_id`, `name`) VALUES
(18, 12, '1a72e2bfd60ffa545d229f53d4599c3e5ffa61de.png'),
(28, 13, 'd7fd7134e2b924e1ea8a34911413056e9a382a6d.png'),
(16, 14, '1f26ea86798ded7ed97d0aa7f61629fabd9eb451.jpg'),
(17, 15, '1b2664c6cc6b749c0f2f55bd9659703bcbbd6d92.jpg'),
(19, 18, '6b8179f18f8c860cb6bfaf118a1f74c4cd08539f.png'),
(20, 19, 'b8cceb6314f9a3a39b2bf6da22a5f03a819d2469.png'),
(21, 21, 'cf21bdb2db677083868b2f0771f3be80cc3ed405.png'),
(22, 25, 'e58e11ed866b08e395cbf25ae725d7a41b758aad.png'),
(23, 26, '07a9c333b656212014a0d870b13496e0e99f3192.png'),
(24, 27, '475059a4ba26d5b74c9d2b9fd007de0d7c1078bb.png'),
(25, 28, '2e6a54e4d6fd6eaac3dce0196262fde39b164078.png'),
(26, 29, '70d787c8124ee216b45871a611f0c83a9802a2b8.png'),
(27, 30, '9a2504fb2f3fc425529393179d24be070ae49cd8.png'),
(29, 31, 'b391ca5b15d4336f91014a9c848593fbcf790c0a.png'),
(30, 32, '8c9fe4aeff07e9141bbd98c7a931f5cd0a75040d.png'),
(31, 33, 'd9da6a01c10bfd7ef5b5fc71c529af469fa28f6a.png'),
(32, 34, '567cec625d681a409c7cf9ad93f6974e78403b0e.png'),
(33, 35, '02b1a21e22e443ab0c4563e44a1a065cab630d81.png'),
(34, 36, 'd8a7d293d858ece69312a305d344cc5d7406ca9d.png'),
(35, 37, '62f81ded4278900ca4d4d5b15b3f161caf90124e.png'),
(36, 38, 'a1e09a4c37c4c08cee80ce5588e5fac286c0ffa6.png'),
(37, 39, '08fa5705e9b28816c652ef0f0f0fc9e0b98ceb3e.png'),
(38, 40, '0d568a8424888cd1acaf357e5f51b5d989ee1d0d.png'),
(39, 41, 'cf6c75001945e5db61553b4ca9a73e909e2d8d41.png'),
(40, 42, 'e4dfaffc64f44fc13946036d79271e9ac34ee37d.png'),
(41, 43, '4fc42ff12d0fde2aab3d36d615bd111fc6ff74ca.png');

-- --------------------------------------------------------

--
-- Структура таблицы `automodel_photoes`
--

CREATE TABLE IF NOT EXISTS `automodel_photoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `automodel_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_mini` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=53 ;

--
-- Дамп данных таблицы `automodel_photoes`
--

INSERT INTO `automodel_photoes` (`id`, `automodel_id`, `name`, `name_mini`) VALUES
(51, 12, '4aa2988e210c048eb228665d356c7ccd63206b45.JPG', '4aa2988e210c048eb228665d356c7ccd63206b45_m.JPG'),
(50, 12, '72d7527a7de66fbf9b84283356037f6f136b9037.jpg', '72d7527a7de66fbf9b84283356037f6f136b9037_m.jpg'),
(49, 12, '987a71aae69a6aa001aadb77d46613172b514fce.jpg', '987a71aae69a6aa001aadb77d46613172b514fce_m.jpg'),
(48, 12, 'b9d343f022339257ec162098e68b6fdb1038ffde.jpg', 'b9d343f022339257ec162098e68b6fdb1038ffde_m.jpg'),
(46, 12, 'bd46ee8cfaabf51b85da6dd2a0cb2cfad727f25b.jpg', 'bd46ee8cfaabf51b85da6dd2a0cb2cfad727f25b_m.jpg'),
(41, 13, 'aeb405c77727f3db2d2e7aa01b940fea3c6b30b1.jpg', 'aeb405c77727f3db2d2e7aa01b940fea3c6b30b1_m.jpg'),
(42, 13, 'eca03cd6ce774d73d049d2649591dc73bb8c8142.jpg', 'eca03cd6ce774d73d049d2649591dc73bb8c8142_m.jpg'),
(43, 13, 'ab93f99067971df79acbe20b5774376ae5c19dca.jpg', 'ab93f99067971df79acbe20b5774376ae5c19dca_m.jpg'),
(44, 13, '87a1b2acad46d45ee93f4a2320eb2ff00620ac74.jpg', '87a1b2acad46d45ee93f4a2320eb2ff00620ac74_m.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `automodels`
--

CREATE TABLE IF NOT EXISTS `automodels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autobrend_id` int(11) NOT NULL,
  `price` varchar(20) NOT NULL,
  `main` int(1) NOT NULL,
  `date` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=44 ;

--
-- Дамп данных таблицы `automodels`
--

INSERT INTO `automodels` (`id`, `autobrend_id`, `price`, `main`, `date`) VALUES
(12, 3, '82 200', 0, '04-04-2013 01:57:18'),
(13, 4, '558 625', 1, '04-04-2013 02:31:32'),
(14, 5, '150 000', 0, '29-03-2013 17:19:18'),
(15, 6, '200 000', 0, '29-03-2013 17:19:39'),
(21, 3, '75 000', 0, '04-04-2013 02:06:03'),
(19, 3, '92 000', 0, '04-04-2013 02:03:16'),
(18, 3, '84 700', 0, '04-04-2013 02:01:01'),
(27, 3, '84 700', 0, '04-04-2013 02:23:22'),
(25, 3, '66 800', 0, '04-04-2013 02:19:39'),
(26, 3, '85 300', 0, '04-04-2013 02:21:08'),
(28, 3, '82 100', 0, '04-04-2013 02:24:04'),
(29, 3, '73 400', 0, '04-04-2013 02:26:17'),
(30, 3, '59 900', 0, '04-04-2013 02:27:31'),
(31, 4, '125 990', 0, '04-04-2013 02:35:45'),
(32, 4, '124 700', 0, '04-04-2013 02:36:20'),
(33, 4, '203 600', 0, '04-04-2013 02:39:36'),
(34, 4, '160 800', 0, '04-04-2013 02:40:58'),
(35, 4, '158 600', 0, '04-04-2013 02:41:33'),
(36, 4, '157 709', 0, '04-04-2013 02:42:33'),
(37, 4, '245 900', 0, '04-04-2013 02:43:19'),
(38, 4, '144 500', 0, '04-04-2013 02:44:01'),
(39, 4, '144 900', 0, '04-04-2013 02:44:39'),
(40, 4, '180 900', 0, '04-04-2013 02:45:18'),
(41, 4, '100 860', 0, '04-04-2013 02:46:18'),
(42, 4, '115 900', 0, '04-04-2013 02:46:45'),
(43, 4, '115 500', 0, '04-04-2013 02:47:49');

-- --------------------------------------------------------

--
-- Структура таблицы `automodels_links`
--

CREATE TABLE IF NOT EXISTS `automodels_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `automodel_id` int(11) NOT NULL,
  `link_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=42 ;

--
-- Дамп данных таблицы `automodels_links`
--

INSERT INTO `automodels_links` (`id`, `automodel_id`, `link_id`) VALUES
(11, 12, 54),
(27, 13, 70),
(3, 14, 24),
(4, 15, 25),
(15, 19, 58),
(14, 18, 57),
(17, 21, 60),
(23, 27, 66),
(21, 25, 64),
(22, 26, 65),
(24, 28, 67),
(25, 29, 68),
(26, 30, 69),
(29, 31, 72),
(30, 32, 73),
(31, 33, 74),
(32, 34, 75),
(33, 35, 76),
(34, 36, 77),
(35, 37, 78),
(36, 38, 79),
(37, 39, 80),
(38, 40, 81),
(39, 41, 82),
(40, 42, 83),
(41, 43, 84);

-- --------------------------------------------------------

--
-- Структура таблицы `autoservice_languages`
--

CREATE TABLE IF NOT EXISTS `autoservice_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autoservice_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `contacts` varchar(1000) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `seo_title` varchar(200) NOT NULL,
  `key_words` varchar(500) NOT NULL,
  `seo_description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `autoservice_languages`
--

INSERT INTO `autoservice_languages` (`id`, `autoservice_id`, `language_id`, `contacts`, `description`, `seo_title`, `key_words`, `seo_description`) VALUES
(1, 1, 2, '<p>Сервис Mercedes-Benz &nbsp;<br />\n(044) 206 20 02&nbsp; &nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>Режим работы &nbsp;<br />\nПН-СБ&nbsp;&nbsp; 8:30 - 20:30<br />\nВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 17:00</p>\n\n<p>&nbsp;</p>\n\n<p>Центр кузовного ремонта<br />\n(044) 206-35-05</p>\n\n<p>&nbsp;</p>\n\n<p>Режим работы &nbsp;<br />\nПН-СБ&nbsp;&nbsp; 8:30 - 20:30<br />\nВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 17:00</p>', '<table border="0" cellpadding="10" cellspacing="0" style="width: 100%;">\n	<tbody>\n		<tr>\n			<td style="text-align: left; vertical-align: top; width: 50%;">\n			<p>Официальный сервис &laquo;Петровка-Авто&raquo; предоставляет весь спектр сервисных услуг для марок отечественного и иностранного производства: OPEL, CHEVROLET, CHERY, LANOS, ZAZ, LADA.</p>\n\n			<p>Высококвалифицированные специалисты нашего автосервиса быстро и качественно, используя современное оборудование, выполнят:</p>\n\n			<ul>\n				<li>Компьютерную диагностику</li>\n				<li>Компьютерную регулировку углов развала и схождения</li>\n				<li>Ремонт ходовой части любой сложности</li>\n				<li>Капитальный ремонт двигателей</li>\n				<li>Обслуживание кондиционеров&nbsp;</li>\n				<li>Проточку тормозных дисков</li>\n				<li>Промывку инжекторов</li>\n				<li>Замену технических жидкостей</li>\n				<li>Комплексное косметическое обслуживание (автомойка, уборка салона, химчистка, полировка)</li>\n				<li>Установгу ГБО с сохранением заводской гарантии</li>\n				<li>Замер компрессии в цилиндрах двигателя</li>\n				<li>Шиномонтаж и балансировку</li>\n				<li>Регулировку направления света фар</li>\n				<li>Установку дополнительного оборудования</li>\n			</ul>\n			</td>\n			<td style="text-align: left; vertical-align: top; width: 50%;">\n			<p>Наши преимущества:</p>\n\n			<p>1.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Большой опыт работы на рынке сервисных услуг.</p>\n\n			<p>2.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Выполняем ремонты любой сложности.</p>\n\n			<p>3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Идеальная чистота и порядок в цеху.</p>\n\n			<p>4.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Новейшее оборудование и технологии.</p>\n\n			<p>5.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Сертифицированные мастера высокого класса с большим опытом работы.</p>\n\n			<p>6.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Индивидуальный подход к каждому клиенту.</p>\n\n			<p>7.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Накопительная система скидок</p>\n\n			<p>8.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Постоянные акции, включая сезонные</p>\n\n			<p>9.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Обслуживание без предварительной записи</p>\n\n			<p>10.&nbsp;&nbsp; Касса, автомагазин, комната отдыха, стол заказов, сервис, гарантия, запчасти &ndash; все в одном месте.</p>\n			</td>\n		</tr>\n	</tbody>\n</table>', 'seo title', 'seo key words', 'seo description');

-- --------------------------------------------------------

--
-- Структура таблицы `autoservice_pictures`
--

CREATE TABLE IF NOT EXISTS `autoservice_pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autoservice_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `position` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `autoservice_pictures`
--

INSERT INTO `autoservice_pictures` (`id`, `autoservice_id`, `name`, `position`) VALUES
(3, 1, '113e01d602b3ee454a4a0f39a80e4b4cbc30b092.jpg', 1),
(4, 1, '87f4245a1eee5dbfba6b0ebec55ceec9ac008717.jpg', 0),
(5, 1, 'e58aa2e6ec86ff1e793825e36fbbddeca698ba30.jpg', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `autoservices`
--

CREATE TABLE IF NOT EXISTS `autoservices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_block_id` int(11) NOT NULL,
  `date` varchar(19) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `autoservices`
--

INSERT INTO `autoservices` (`id`, `menu_block_id`, `date`) VALUES
(1, 2, '02-04-2013 17:48:42');

-- --------------------------------------------------------

--
-- Структура таблицы `banner_images`
--

CREATE TABLE IF NOT EXISTS `banner_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banner_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `banner_images`
--

INSERT INTO `banner_images` (`id`, `banner_id`, `name`) VALUES
(6, 2, 'f75df15918f3e6f4bfe28f3fe7e0b6b0b5815ef6.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `banner_languages`
--

CREATE TABLE IF NOT EXISTS `banner_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banner_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(3000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `banner_languages`
--

INSERT INTO `banner_languages` (`id`, `banner_id`, `language_id`, `title`, `description`) VALUES
(2, 2, 2, 'Первый баннер', '<p>жывалофыждва офжываофыва</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `banners`
--

CREATE TABLE IF NOT EXISTS `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display` tinyint(1) NOT NULL,
  `position` tinyint(2) NOT NULL,
  `date` varchar(19) NOT NULL,
  `top` varchar(5) NOT NULL,
  `left` varchar(5) NOT NULL,
  `width` varchar(5) NOT NULL,
  `height` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `banners`
--

INSERT INTO `banners` (`id`, `display`, `position`, `date`, `top`, `left`, `width`, `height`) VALUES
(2, 1, 1, '01-08-2013 13:44:21', '10%', '10%', '10%', '10%');

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `date` varchar(19) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `position`, `date`) VALUES
(1, 0, 1, '13-05-2013 01:15:17'),
(2, 1, 2, '13-05-2013 03:24:19');

-- --------------------------------------------------------

--
-- Структура таблицы `categories_products`
--

CREATE TABLE IF NOT EXISTS `categories_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Дамп данных таблицы `categories_products`
--

INSERT INTO `categories_products` (`id`, `category_id`, `product_id`) VALUES
(12, 2, 5),
(2, 1, 2),
(14, 2, 8),
(13, 2, 7),
(9, 1, 5),
(11, 1, 6),
(15, 2, 9),
(16, 2, 10);

-- --------------------------------------------------------

--
-- Структура таблицы `category_attribute_languages`
--

CREATE TABLE IF NOT EXISTS `category_attribute_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_attribute_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `category_attribute_languages`
--

INSERT INTO `category_attribute_languages` (`id`, `category_attribute_id`, `language_id`, `name`) VALUES
(2, 4, 2, 'Атрибут'),
(3, 5, 2, 'Мощность'),
(4, 6, 2, 'Не строгий атрибут!!!');

-- --------------------------------------------------------

--
-- Структура таблицы `category_attribute_ranges`
--

CREATE TABLE IF NOT EXISTS `category_attribute_ranges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_attribute_id` int(11) NOT NULL,
  `min` float NOT NULL,
  `max` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `category_attribute_ranges`
--

INSERT INTO `category_attribute_ranges` (`id`, `category_attribute_id`, `min`, `max`) VALUES
(3, 5, 10, 100);

-- --------------------------------------------------------

--
-- Структура таблицы `category_attributes`
--

CREATE TABLE IF NOT EXISTS `category_attributes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `type` int(1) NOT NULL,
  `direct` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `category_attributes`
--

INSERT INTO `category_attributes` (`id`, `category_id`, `type`, `direct`) VALUES
(5, 2, 1, 0),
(4, 2, 2, 1),
(6, 2, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `category_languages`
--

CREATE TABLE IF NOT EXISTS `category_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `category_languages`
--

INSERT INTO `category_languages` (`id`, `category_id`, `language_id`, `name`, `description`) VALUES
(1, 1, 2, 'Первая категория', 'Короткое описание'),
(2, 2, 2, 'Вторая категория', 'Короткое описание');

-- --------------------------------------------------------

--
-- Структура таблицы `category_logoes`
--

CREATE TABLE IF NOT EXISTS `category_logoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `category_logoes`
--

INSERT INTO `category_logoes` (`id`, `category_id`, `name`) VALUES
(1, 2, '42a8fe1eaae5ee0d59e5e73845bc4d179699f4a4.jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `characteristic_languages`
--

CREATE TABLE IF NOT EXISTS `characteristic_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `characteristic_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Дамп данных таблицы `characteristic_languages`
--

INSERT INTO `characteristic_languages` (`id`, `characteristic_id`, `language_id`, `name`, `description`) VALUES
(1, 1, 2, 'Двигатель', '<p>Дви́гатель, мотор (от <a href="http://ru.wikipedia.org/wiki/%D0%9B%D0%B0%D1%82%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA" title="Латинский язык">лат.</a>&nbsp;motor приводящий в движение)&nbsp;&mdash; устройство, преобразующее какой-либо вид <a href="http://ru.wikipedia.org/wiki/%D0%AD%D0%BD%D0%B5%D1%80%D0%B3%D0%B8%D1%8F" title="Энергия">энергии</a> в механическую. Этот термин используется с конца XIX века наряду со словом &laquo;мотор&raquo;, которым с середины XX века чаще называют <a href="http://ru.wikipedia.org/wiki/%D0%AD%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D0%B4%D0%B2%D0%B8%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D1%8C" title="Электрический двигатель">электродвигатели</a> и двигатели внутреннего сгорания (<a href="http://ru.wikipedia.org/wiki/%D0%94%D0%B2%D0%B8%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D1%8C_%D0%B2%D0%BD%D1%83%D1%82%D1%80%D0%B5%D0%BD%D0%BD%D0%B5%D0%B3%D0%BE_%D1%81%D0%B3%D0%BE%D1%80%D0%B0%D0%BD%D0%B8%D1%8F" title="Двигатель внутреннего сгорания">ДВС</a>).</p>\n\n<p>Двигатели подразделяют на первичные и вторичные. К первичным относят непосредственно преобразующие природные энергетические ресурсы в <a href="http://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%85%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0" title="Механическая работа">механическую работу</a>, а ко вторичным&nbsp;&mdash; преобразующие <a href="http://ru.wikipedia.org/wiki/%D0%AD%D0%BD%D0%B5%D1%80%D0%B3%D0%B8%D1%8F" title="Энергия">энергию</a>, выработанную или накопленную другими источниками.</p>'),
(2, 2, 2, 'Двигатель', '<table>\n	<tbody>\n		<tr>\n			<td>Колесные диски R16 стальные с колпаками, резина 205/55</td>\n			<td>+</td>\n			<td>+</td>\n			<td>-</td>\n			<td>-</td>\n			<td>-</td>\n		</tr>\n		<tr>\n			<td>Колесные диски R16 легкосплавные литые, резина 205/55</td>\n			<td>-</td>\n			<td>-</td>\n			<td>+</td>\n			<td>+</td>\n			<td>+</td>\n		</tr>\n		<tr>\n			<td>Полноразмерное запасное колесо, стальной диск</td>\n			<td>+</td>\n			<td>+</td>\n			<td>+</td>\n			<td>+</td>\n			<td>+</td>\n		</tr>\n	</tbody>\n</table>'),
(3, 3, 2, 'Трансмисия', '<p>Трансмисия характеристикаТрансмисия характеристика Трансмисия характеристика Трансмисия характеристика Трансмисия характеристикаТрансмисия характеристика</p>'),
(4, 4, 2, 'Трансмисия', '<p>Трансмисия комплектация Трансмисия комплектация Трансмисия комплектация Трансмисия комплектация Трансмисия комплектация</p>'),
(9, 9, 2, 'Скоростные хар.', '<p>Скоростные хар. Скоростные хар. Скоростные хар. Скоростные хар. Скоростные хар.</p>'),
(10, 10, 2, 'Скоростные хар.', '<p>Скоростные хар. хавыфлаофжы&nbsp;</p>\n\n<p>Скоростные хар. хавыфлаофжы<br />\n&nbsp;</p>\n\n<p>Скоростные хар. хавыфлаофжы<br />\n&nbsp;</p>\n\n<p>&nbsp;</p>'),
(11, 12, 2, 'Расход топлива', '<p>Расход топлива&nbsp;&mdash; количество израсходованного <a href="http://ru.wikipedia.org/wiki/%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C" title="Автомобиль">автомобилем</a> <a href="http://ru.wikipedia.org/wiki/%D0%A2%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%BE" title="Топливо">топлива</a>.</p>\n\n<p>В настоящие время является одной из важных характеристик автомобиля и его <a href="http://ru.wikipedia.org/wiki/%D0%94%D0%B2%D0%B8%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D1%8C" title="Двигатель">двигателя</a>, в первую очередь, в странах <a href="http://ru.wikipedia.org/wiki/%D0%95%D0%B2%D1%80%D0%BE%D0%BF%D0%B0" title="Европа">Европы</a> и развитых странах других <a href="http://ru.wikipedia.org/wiki/%D0%A7%D0%B0%D1%81%D1%82%D0%B8_%D1%81%D0%B2%D0%B5%D1%82%D0%B0" title="Части света">частей света</a>. На протяжении последних десятилетий ведущими инженерами и конструкторами всего мира решается проблема снижения расхода топлива.</p>\n\n<p>За рубежом эту проблему решают за счёт применения <a href="http://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B6%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%BF%D0%BE%D0%B4%D0%B0%D1%87%D0%B8_%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%B0" title="Инжекторная система подачи топлива">инжекторных систем смесеобразования</a>, в СССР и странах СНГ были разработаны адаптивные системы управления ДВС и <a href="http://ru.wikipedia.org/wiki/%D0%A1%D0%B2%D0%B5%D1%87%D0%B8_%D0%B7%D0%B0%D0%B6%D0%B8%D0%B3%D0%B0%D0%BD%D0%B8%D1%8F" title="Свечи зажигания">свечи зажигания</a> нового поколения с форкамерой и, применение которых позволяет без переделок ДВС снизить потребление топлива и токсичность бензинового двигателя<a href="http://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%BF%D0%B5%D0%B4%D0%B8%D1%8F:%D0%A1%D1%81%D1%8B%D0%BB%D0%BA%D0%B8_%D0%BD%D0%B0_%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B8" title="Википедия:Ссылки на источники">[источник&nbsp;не&nbsp;указан&nbsp;392&nbsp;дня]</a>.</p>'),
(12, 13, 2, 'Расход топлива', '<p>Комплектация расход</p>\n\n<p>В настоящие время является одной из важных характеристик автомобиля и его <a href="http://ru.wikipedia.org/wiki/%D0%94%D0%B2%D0%B8%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D1%8C" title="Двигатель">двигателя</a>, в первую очередь, в странах <a href="http://ru.wikipedia.org/wiki/%D0%95%D0%B2%D1%80%D0%BE%D0%BF%D0%B0" title="Европа">Европы</a> и развитых странах других <a href="http://ru.wikipedia.org/wiki/%D0%A7%D0%B0%D1%81%D1%82%D0%B8_%D1%81%D0%B2%D0%B5%D1%82%D0%B0" title="Части света">частей света</a>. На протяжении последних десятилетий ведущими инженерами и конструкторами всего мира решается проблема снижения расхода топлива.</p>\n\n<p>За рубежом эту проблему решают за счёт применения <a href="http://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B6%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%BF%D0%BE%D0%B4%D0%B0%D1%87%D0%B8_%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%B2%D0%B0" title="Инжекторная система подачи топлива">инжекторных систем смесеобразования</a>, в СССР и странах СНГ были разработаны адаптивные системы управления ДВС и <a href="http://ru.wikipedia.org/wiki/%D0%A1%D0%B2%D0%B5%D1%87%D0%B8_%D0%B7%D0%B0%D0%B6%D0%B8%D0%B3%D0%B0%D0%BD%D0%B8%D1%8F" title="Свечи зажигания">свечи зажигания</a> нового поколения с форкамерой и, применение которых позволяет без переделок ДВС снизить потребление топлива и токсичность бензинового двигателя<a href="http://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D0%BF%D0%B5%D0%B4%D0%B8%D1%8F:%D0%A1%D1%81%D1%8B%D0%BB%D0%BA%D0%B8_%D0%BD%D0%B0_%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA%D0%B8" title="Википедия:Ссылки на источники">[источник&nbsp;не&nbsp;указан&nbsp;392&nbsp;дня]</a>.</p>'),
(13, 15, 2, 'Диски', '<p>Диск (от <a href="http://ru.wikipedia.org/wiki/%D0%93%D1%80%D0%B5%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA" title="Греческий язык">греч.</a> &delta;ί&sigma;&kappa;&omicron;&sigmaf;(Дискос)&nbsp;&mdash; &laquo;круглое блюдо&raquo;)&nbsp;&mdash; <a href="http://ru.wikipedia.org/wiki/%D0%9A%D1%80%D1%83%D0%B3" title="Круг">круг</a> (низкий <a href="http://ru.wikipedia.org/wiki/%D0%A6%D0%B8%D0%BB%D0%B8%D0%BD%D0%B4%D1%80" title="Цилиндр">цилиндр</a>) или предмет в виде круга.</p>\n\n<div>\n<div><a href="http://commons.wikimedia.org/wiki/File:Wiktionary-logo-ru.png?uselang=ru" title="Логотип Викисловаря"><img alt="Логотип Викисловаря" src="http://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Wiktionary-logo-ru.png/50px-Wiktionary-logo-ru.png" /></a></div>\nВ <a href="http://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C" title="Викисловарь">Викисловаре</a> есть статья&laquo;<a href="http://ru.wiktionary.org/wiki/%D0%B4%D0%B8%D1%81%D0%BA" title="wikt:диск">диск</a>&raquo;</div>\n\n<ul>\n	<li><a href="http://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BB%D1%91%D1%81%D0%BD%D1%8B%D0%B5_%D0%B4%D0%B8%D1%81%D0%BA%D0%B8" title="Колёсные диски">Колёсный диск</a> (с ободом), на который монтируется <a href="http://ru.wikipedia.org/wiki/%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%88%D0%B8%D0%BD%D0%B0" title="Автомобильная шина">автомобильная шина</a>;</li>\n</ul>'),
(14, 17, 2, 'Диски', '<p>Диск (от <a href="http://ru.wikipedia.org/wiki/%D0%93%D1%80%D0%B5%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA" title="Греческий язык">греч.</a> &delta;ί&sigma;&kappa;&omicron;&sigmaf;(Дискос)&nbsp;&mdash; &laquo;круглое блюдо&raquo;)&nbsp;&mdash; <a href="http://ru.wikipedia.org/wiki/%D0%9A%D1%80%D1%83%D0%B3" title="Круг">круг</a> (низкий <a href="http://ru.wikipedia.org/wiki/%D0%A6%D0%B8%D0%BB%D0%B8%D0%BD%D0%B4%D1%80" title="Цилиндр">цилиндр</a>) или предмет в виде круга.</p>\n\n<div>В <a href="http://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C" title="Викисловарь">Викисловаре</a> есть статья&laquo;<a href="http://ru.wiktionary.org/wiki/%D0%B4%D0%B8%D1%81%D0%BA" title="wikt:диск">диск</a>&raquo;</div>'),
(15, 18, 2, 'Двигатель', '<p>На Чикагском автосалоне Chevrolet представил новую модель Camaro, ZL1, оснащённого <a href="http://ru.wikipedia.org/wiki/%D0%A2%D1%83%D1%80%D0%B1%D0%BE%D0%BD%D0%B0%D0%B4%D0%B4%D1%83%D0%B2" title="Турбонаддув">турбонаддувом</a> и промежуточным 6.2L V-8 двигателем, который имеет мощность примерно 550 лошадиных сил, шестиступенчатой ​​механической коробкой передач с двойным сцеплением, активной подвеской MagneRide, которая ранее использовались в линейке <a href="http://ru.wikipedia.org/wiki/Corvette" title="Corvette">Corvette</a>, 20-дюймовыми шинами <a href="http://ru.wikipedia.org/wiki/Goodyear" title="Goodyear">Goodyear</a> Supercar F2 с алюминиевыми колесами и 14.4/14.6 дюймовыми тормозами Brembo. Автомобиль поступит в продажу в начале 2012 года. Цена ZL1 - $54 095.</p>'),
(16, 19, 2, 'Двигатель', '<p>На Чикагском автосалоне Chevrolet представил новую модель Camaro, ZL1, оснащённого <a href="http://ru.wikipedia.org/wiki/%D0%A2%D1%83%D1%80%D0%B1%D0%BE%D0%BD%D0%B0%D0%B4%D0%B4%D1%83%D0%B2" title="Турбонаддув">турбонаддувом</a> и промежуточным 6.2L V-8 двигателем, который имеет мощность примерно 550 лошадиных сил, шестиступенчатой ​​механической коробкой передач с двойным сцеплением, активной подвеской MagneRide, которая ранее использовались в линейке <a href="http://ru.wikipedia.org/wiki/Corvette" title="Corvette">Corvette</a>, 20-дюймовыми шинами <a href="http://ru.wikipedia.org/wiki/Goodyear" title="Goodyear">Goodyear</a> Supercar F2 с алюминиевыми колесами и 14.4/14.6 дюймовыми тормозами Brembo. Автомобиль поступит в продажу в начале 2012 года. Цена ZL1 - $54 095.</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `characteristics`
--

CREATE TABLE IF NOT EXISTS `characteristics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `automodel_id` int(11) NOT NULL,
  `type_id` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `characteristics`
--

INSERT INTO `characteristics` (`id`, `automodel_id`, `type_id`) VALUES
(1, 12, 2),
(2, 12, 1),
(3, 12, 1),
(4, 12, 2),
(9, 12, 1),
(10, 12, 2),
(13, 12, 2),
(12, 12, 1),
(17, 12, 2),
(15, 12, 1),
(18, 13, 1),
(19, 13, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `complectation_languages`
--

CREATE TABLE IF NOT EXISTS `complectation_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `complectation_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(3000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Дамп данных таблицы `complectation_languages`
--

INSERT INTO `complectation_languages` (`id`, `complectation_id`, `language_id`, `name`, `description`) VALUES
(11, 11, 2, '3 complectation', '<p>asdfasdf qwefpshv ajsd qwioeu asnczbxouy h,dbazvpuhaf</p>'),
(8, 8, 2, '1 complectation', '<p>asdfasdf asdf asdf asd asdf asdf asdf</p>'),
(9, 9, 2, '2 complectation', '<p>asdfas dfaslk asldkfhj aslkfh jaskldfh jaskldfh askldfh jasdf asdf asfda</p>'),
(10, 10, 2, '4 complectation', '<p>as;dfkj as;dklfja;sldf a;skldf al;sf jal;sdf jasdl;f jasdfpqwk fznilhuqwjamchghwqiouje mfsdhv</p>'),
(12, 12, 2, '1 complectation', '<p>dfasdf asdf asdf asdf asfd asdf asdf a</p>'),
(13, 13, 2, '2 complectation', '<p>sadf asdf asf asd as fasf asdf asdfa</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `complectation_logoes`
--

CREATE TABLE IF NOT EXISTS `complectation_logoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `complectation_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `complectation_logoes`
--

INSERT INTO `complectation_logoes` (`id`, `complectation_id`, `name`) VALUES
(9, 8, 'c7b158e420c8f5fa60b43abc9df48e1896904888.jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `complectations`
--

CREATE TABLE IF NOT EXISTS `complectations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `automodel_id` int(11) NOT NULL,
  `year` varchar(12) NOT NULL,
  `price` varchar(12) NOT NULL,
  `position` int(11) NOT NULL,
  `date` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Дамп данных таблицы `complectations`
--

INSERT INTO `complectations` (`id`, `automodel_id`, `year`, `price`, `position`, `date`) VALUES
(8, 12, '2012', '100 000', 1, '07-03-2013 16:15:45'),
(9, 12, '2013', '120 000', 2, '07-03-2013 16:17:53'),
(10, 12, '2012', '150 000', 4, '07-03-2013 16:20:03'),
(11, 12, '2012', '152 000', 3, '07-03-2013 16:20:36'),
(12, 13, '2013', '400 000', 1, '28-03-2013 16:13:38'),
(13, 13, '2013', '400 400', 2, '28-03-2013 16:13:59');

-- --------------------------------------------------------

--
-- Структура таблицы `component_functions`
--

CREATE TABLE IF NOT EXISTS `component_functions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_type_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `clear_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=147 ;

--
-- Дамп данных таблицы `component_functions`
--

INSERT INTO `component_functions` (`id`, `component_type_id`, `name`, `clear_name`) VALUES
(1, 1, 'get_static_component', 'Достать статью'),
(3, 1, 'set_static_component', 'Задать статью'),
(4, 1, 'delete_static_component', 'Удалить статью'),
(5, 2, 'get_menu_block', 'Достать меню-блок'),
(6, 2, 'get_all_menu_blocks', 'Достать все меню-блоки'),
(7, 2, 'set_menu_block', 'Задать меню-блок'),
(8, 2, 'delete_menu_block', 'Удалить меню-блок'),
(9, 3, 'get_placeholder', 'Достать плейсхолдер'),
(10, 3, 'get_all_placeholders', 'Достать все плейсхолдеры'),
(11, 3, 'set_placeholder', 'Задать плейсхолдер'),
(12, 3, 'delete_placeholder', 'Удалить плейсхолдер'),
(13, 4, 'get_category_by_id', 'Достать категорию'),
(14, 4, 'get_all_categories', 'Достать все категории'),
(15, 4, 'set_category', 'Задать категорию'),
(16, 4, 'delete_category', 'Удалить категорию'),
(17, 5, 'get_producer', 'Достать производителя'),
(18, 5, 'get_all_producers', 'Достать всех производителей'),
(19, 5, 'set_producer', 'Задать производителя'),
(20, 5, 'delete_producer', 'Удалить производителя'),
(21, 7, 'get_article_seo', 'Достать сео списка статей'),
(23, 7, 'set_article_lang', 'Сохранить сео списка статей'),
(24, 7, 'delete_article', 'Удалить список статей'),
(25, 13, 'get_article_item', 'Достать статью'),
(27, 13, 'set_article_item', 'Задать статью'),
(28, 13, 'delete_article_item', 'Удалить статью'),
(29, 23, 'get_menu_item', 'Достать пункт меню'),
(30, 23, 'get_menu_item_by_block', 'Достать все пункты меню'),
(31, 23, 'set_menu_item', 'Задать пункт меню'),
(32, 23, 'disconect_menu_item', 'Отвязать пункт меню от страницы'),
(33, 24, 'get_component_by_id', 'Достать страницу/компонент'),
(34, 24, 'get_components', 'Достать все страницы/компоненты'),
(35, 24, 'set_component', 'Задать страницу/компонент'),
(36, 24, 'delete_component', 'Удалить страницу/компонент'),
(37, 25, 'get_autobrend', 'Достать автобренд'),
(39, 25, 'set_autobrend', 'Задать автобренд'),
(40, 25, 'delete_autobrend', 'Удалить автобренд'),
(45, 27, 'get_mini_block_by_id', 'Достать мини-блок'),
(46, 27, 'get_all_mini_blocks', 'Достать все мини-блоки'),
(47, 27, 'set_mini_block', 'Задать мини-блок'),
(48, 27, 'delete_mini_block', 'Удалить мини-блок'),
(49, 28, 'get_contacts', 'Достать контакты'),
(51, 28, 'set_conacts', 'Задать контакты'),
(53, 29, 'get_automodel', 'Достать автомодель'),
(54, 29, 'get_all_automodels', 'Достать все автомодели'),
(55, 29, 'set_automodel', 'Задать автомодель'),
(56, 29, 'delete_automodel', 'Удалить автомодель'),
(57, 30, 'get_autoservice', 'Достать автосервис'),
(59, 30, 'set_autoservice', 'Задать автосервис'),
(60, 30, 'delete_autoservice', 'Удалить автосервис'),
(61, 31, 'get_question_variant_by_id', 'Достать вариант вопроса'),
(62, 31, 'get_question_variant', 'Достать все варианты вопросов'),
(63, 31, 'set_question_variant', 'Задать вариант вопроса'),
(64, 31, 'delete_question_variant', 'Удалить вариант вопроса'),
(65, 32, 'get_marking', 'Достать разметку главной'),
(67, 32, 'set_marking', 'Задать разметку главной'),
(71, 33, 'set_seo', 'Задать сео главной'),
(100, 33, 'get_seo', 'Достать сео главной'),
(106, 35, 'set_category', 'Задать категорию для товара'),
(75, 35, 'set_product', 'Задать продукт'),
(77, 36, 'get_product_block_by_id', 'Достать блок с продуктом'),
(78, 36, 'get_all_product_blocks', 'Достать все блоки с продуктами'),
(79, 36, 'set_product_block', 'Задать блок с продуктами'),
(80, 36, 'delete_product_block', 'Удалить блок с продуктами'),
(81, 37, 'get_unit', 'Достать еденицу измерения'),
(82, 37, 'get_all_units', 'Достать все еденицы измерения'),
(83, 37, 'set_unit', 'Задать еденицу измерения'),
(84, 37, 'delete_unit', 'Удалить еденицу измерения'),
(85, 38, 'get_group', 'Достать группу'),
(86, 38, 'get_all_group', 'Достать все группы'),
(87, 38, 'set_group', 'Задать группу'),
(88, 38, 'delete_group', 'Удалить группу'),
(89, 39, 'get_user', 'Достать пользователя'),
(90, 39, 'get_all_user', 'Достать всех пользователей'),
(91, 39, 'set_user', 'Добавить/изменить пользоветеля'),
(92, 39, 'delete_user', 'Удалить пользователя'),
(93, 40, 'get_component_type', 'Достать тип компонента'),
(94, 40, 'get_all_component_type', 'Достать список типов компонентов'),
(95, 40, 'set_component_type', 'Задать компонент'),
(101, 7, 'get_all_articles', 'Достать список статей'),
(97, 40, 'get_all_component_function', 'Достать все фукции компонента'),
(98, 40, 'set_component_function', 'Задать функцию компонента'),
(99, 40, 'delete_component_function', 'Удалить фукцию компонента'),
(102, 31, 'set_email', 'Задать електронный адрес'),
(103, 31, 'get_emails', 'Достать список електронных адресов'),
(104, 31, 'get_email_by_id', 'Достать електронный адрес'),
(105, 31, 'delete_email', 'Удалить електронный адрес'),
(107, 35, 'set_attribute_value', 'Задать атрибут категории товара'),
(108, 35, 'get_product', 'Достать продукт'),
(109, 35, 'get_product_category_attribute', 'Достать атрибут категории товара'),
(110, 35, 'get_all_products', 'Достать все продукты'),
(111, 35, 'delete_product', 'Удалить продукт'),
(112, 35, 'delete_product_category', 'Удалить категорию товара'),
(114, 3, 'set_placeholder_mini_block', 'Задать связь между мини-блоком и плейсхолдером'),
(115, 3, 'delete_placeholder_miniblock', 'Удалить связь между мини-блоком и плейсхолдером '),
(116, 3, 'set_placeholder_product_block', 'Задать связь между блоком с товарами и плейсхолдером'),
(117, 3, 'delete_placeholder_product_block', 'Удалить связь между блоком с товарами и плейсхолдером'),
(118, 3, 'set_placeholder_attribute', 'Задать CSS атрибут плейсхолдера'),
(119, 3, 'delete_placeholder_attribute', 'Удалить CSS атрибут плейсхолдера'),
(120, 23, 'set_related_menu_item', 'Задать связь между пунктами меню'),
(121, 4, 'set_category_attribute', 'Задать атрибут категории'),
(122, 4, 'delete_category_attribute', 'Удалить атрибут категории'),
(123, 4, 'set_quality_variant', 'Задать качественный вариант атрибута'),
(124, 4, 'delete_quality_variant', 'Удалить качественный вариант атрибута'),
(125, 30, 'set_autoservice_picture_order', 'Задать порядок картинок автосервиса'),
(126, 29, 'delete_automodel_from_group', 'Удалить автомодель из автогруппы'),
(130, 29, 'set_characteristic', 'Задать характеристику'),
(128, 29, 'get_autogroup', 'Достать автогруппы автомодели'),
(129, 29, 'set_autogroup', 'Задать автогруппу'),
(131, 29, 'get_characteristic', 'Достать характеристику'),
(132, 29, 'get_all_characteristics', 'Достать лист характеристик'),
(133, 29, 'delete_characteristic', 'Удалить характеристику'),
(134, 29, 'set_complectation', 'Задать комплектацию'),
(135, 29, 'get_complectation', 'Достать комплектацию'),
(136, 29, 'get_all_complectations', 'Достать все комплектации автомодели'),
(137, 29, 'delete_component_content', 'Удалить комплектацию автомодели'),
(138, 48, 'get_language', 'Достать язык'),
(139, 48, 'get_all_languages', 'Достать все языки'),
(140, 48, 'set_language', 'Задать язык'),
(141, 48, 'delete_language', 'Удалить язык'),
(142, 49, 'get_baner', ''),
(143, 49, 'get_all_baner', ''),
(144, 49, 'set_baner', ''),
(145, 49, 'delete_baner', '');

-- --------------------------------------------------------

--
-- Структура таблицы `component_functions_groups`
--

CREATE TABLE IF NOT EXISTS `component_functions_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_function_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=573 ;

--
-- Дамп данных таблицы `component_functions_groups`
--

INSERT INTO `component_functions_groups` (`id`, `component_function_id`, `group_id`) VALUES
(572, 110, 3),
(571, 108, 3),
(570, 99, 3),
(569, 97, 3),
(568, 101, 3),
(567, 95, 3),
(566, 100, 3),
(565, 71, 3),
(564, 35, 3),
(563, 34, 3),
(562, 33, 3),
(561, 32, 3),
(560, 31, 3),
(559, 30, 3),
(558, 29, 3),
(557, 21, 3),
(556, 20, 3),
(555, 19, 3),
(554, 18, 3),
(553, 17, 3),
(552, 8, 3),
(551, 7, 3),
(550, 6, 3),
(549, 5, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `component_types`
--

CREATE TABLE IF NOT EXISTS `component_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tab_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `psevdo_name` varchar(100) NOT NULL,
  `display` tinyint(1) NOT NULL,
  `library` varchar(100) NOT NULL,
  `admin_client_controller` varchar(100) NOT NULL,
  `client_controller` varchar(100) NOT NULL,
  `server_controller` varchar(200) NOT NULL,
  `button_panel` tinyint(1) NOT NULL,
  `settings` tinyint(1) NOT NULL,
  `minimise` tinyint(1) NOT NULL,
  `maximise` tinyint(1) NOT NULL,
  `multi` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=50 ;

--
-- Дамп данных таблицы `component_types`
--

INSERT INTO `component_types` (`id`, `tab_id`, `name`, `psevdo_name`, `display`, `library`, `admin_client_controller`, `client_controller`, `server_controller`, `button_panel`, `settings`, `minimise`, `maximise`, `multi`) VALUES
(33, 16, 'seo', 'Сео главной страницы', 1, 'Seo', 'components/admin/seo', '-', '', 0, 0, 0, 0, 0),
(7, 0, 'articles', 'Статьи', 0, 'Article', 'components/admin/article', 'components/user/article', 'user/user_controller/get_article', 1, 0, 1, 1, 1),
(13, 0, 'articleitem', 'Статья', 2, 'Article_item', 'components/admin/article', 'components/user/article', 'user/user_controller/get_article_item', 1, 0, 1, 1, 1),
(31, 0, 'question', 'Вопросы', 1, 'Question_variant', 'components/admin/question', '-', '', 0, 0, 0, 0, 0),
(32, 5, 'marking', 'Разметка страницы', 0, 'Marking', 'components/admin/marking', '-', '', 0, 0, 0, 0, 0),
(1, 0, 'staticcomp', 'Статика', 1, 'Static_component', 'components/admin/static', 'components/user/static', 'user/user_controller/get_static_component', 1, 0, 1, 1, 1),
(30, 0, 'autoservice', 'Автосервис', 1, 'Autoservice', 'components/admin/autoservice', 'components/user/autoservice', '', 1, 0, 1, 0, 0),
(29, 0, 'automodels', 'Автомобиль', 0, 'Automodel', 'components/admin/automodel', 'components/user/automodel', '', 1, 0, 1, 0, 1),
(28, 0, 'contacts', 'Контакты', 1, 'Contact', 'components/admin/contacts', 'components/user/contacts', '', 1, 0, 1, 1, 0),
(26, 0, '-', 'Автомобили', 0, 'Automodel', '-', 'components/user/automodels', '', 1, 0, 1, 0, 0),
(27, 7, 'mini_blocks', 'Мини-блоки', 0, 'Mini_block', 'components/admin/mini_block', '-', '', 1, 0, 0, 0, 0),
(25, 0, 'autobrend', 'Автобренды', 1, 'Autobrend', 'components/admin/autobrend', 'components/user/autobrend', '', 1, 0, 1, 1, 1),
(23, 0, 'menu_items', 'Пункты меню', 0, 'Menu_item', 'components/admin/menu_item', 'components/user/menu_item', '', 1, 0, 1, 1, 1),
(24, 9, 'pages', 'Страницы', 0, 'Components', 'components/admin/pages', 'components/user/pages', '', 1, 0, 1, 0, 0),
(2, 10, 'menu', 'Меню', 0, 'Menu_item', 'components/admin/menu', 'components/user/menu', '', 1, 0, 1, 1, 0),
(3, 6, 'placeholders', 'Блок с контентом', 0, 'Placeholder', 'components/admin/placeholder', 'components/user/placeholder', '', 0, 0, 0, 0, 1),
(4, 12, 'categories', 'Категория', 0, 'Category', 'components/admin/category', '-', '', 0, 0, 0, 0, 0),
(5, 13, 'producers', 'Производители', 0, 'Producer', 'components/admin/producer', '-', '', 0, 0, 0, 0, 0),
(35, 15, 'products', 'Продукты', 0, 'Product', 'components/admin/product', '-', '', 0, 0, 0, 0, 0),
(36, 8, 'product_blocks', 'Блок с товарами', 0, 'Product_block', 'components/admin/product_block', '-', '', 0, 0, 0, 0, 0),
(37, 14, 'units', 'Еденицы измерения', 0, 'Unit', 'components/admin/unit', '-', '', 0, 0, 0, 0, 0),
(38, 17, 'groups', 'Группы пользователей', 0, 'Group', 'components/admin/group', '-', '', 0, 0, 0, 0, 0),
(39, 11, 'users', 'Пользователи', 0, 'User', 'components/admin/users', '-', '', 0, 0, 0, 0, 0),
(40, 18, 'component_types', 'Типы компонентов', 0, 'Component_type', 'components/admin/component_type', '-', '', 0, 0, 0, 0, 0),
(48, 0, 'languages', 'Управление языками', 0, 'Language', 'components/admin/language', '---', '', 1, 0, 0, 0, 0),
(49, 0, 'img_banners', 'Банер', 0, 'Baner', 'components/admin/img_banners', 'components/user/baner', '', 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `components`
--

CREATE TABLE IF NOT EXISTS `components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_type_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=63 ;

--
-- Дамп данных таблицы `components`
--

INSERT INTO `components` (`id`, `component_type_id`, `content_id`, `name`, `update_date`) VALUES
(14, 7, 5, 'Акции', '2013-03-06 17:57:26'),
(9, 25, 3, 'ЗАЗ', '2013-03-04 21:12:55'),
(5, 1, 2, 'Автомобили', '2013-03-04 17:43:19'),
(6, 1, 3, 'Сервис и гарантия', '2013-03-04 17:43:53'),
(7, 7, 2, 'Кузовной ремонт', '2013-03-04 17:44:50'),
(8, 7, 3, 'Финансовые услуги', '2013-03-04 19:59:42'),
(12, 25, 5, 'Opel', '2013-03-04 21:14:58'),
(11, 25, 4, 'Chevrolet', '2013-03-04 21:14:38'),
(13, 25, 6, 'Amulet', '2013-03-04 21:16:09'),
(44, 31, 0, 'Раздел вопросов', '2013-04-16 12:24:04'),
(17, 1, 4, 'Дополнительная информация', '2013-03-12 18:54:44'),
(24, 26, 0, 'Автомобили', '2013-03-18 19:19:19'),
(45, 32, 0, 'Разметка страницы', '2013-04-18 14:08:15'),
(28, 28, 2, 'Страница контактов', '2013-03-25 13:54:22'),
(32, 30, 1, 'Автосервис страница', '2013-04-01 11:49:21'),
(35, 1, 7, 'Mercedes', '2013-04-02 22:36:40'),
(36, 1, 8, 'Multibrand', '2013-04-02 22:39:15'),
(37, 1, 9, 'Кузовной ремонт', '2013-04-02 22:39:46'),
(38, 1, 10, 'Стоимость ТО', '2013-04-03 11:26:21'),
(39, 1, 11, 'Запись на ТО', '2013-04-03 11:26:47'),
(40, 1, 12, 'Экспесс-сервис', '2013-04-03 11:27:07'),
(41, 1, 13, 'Автоэвакуатор', '2013-04-03 11:29:26'),
(42, 1, 14, 'Корпоративныи клиентам', '2013-04-03 11:33:04'),
(46, 7, 8, 'Список статей', '2013-04-18 17:08:34'),
(47, 1, 15, 'Новая статья2', '2013-04-18 17:41:45'),
(59, 1, 19, 'Тест', '2013-06-17 17:41:02'),
(49, 33, 0, 'Сео параметры главной страницы', '2013-04-22 13:05:05'),
(50, 4, 0, 'Все категории', '2013-05-12 23:39:05'),
(51, 5, 0, 'Производители', '2013-05-13 13:51:16'),
(52, 35, 0, 'Все продукты', '2013-05-14 15:42:50'),
(53, 37, 0, 'Еденицы измерения', '2013-05-22 14:23:30'),
(54, 38, 0, 'Группы пользователей', '2013-05-23 13:01:39'),
(55, 40, 0, 'Типы компонентов', '2013-05-30 11:42:42'),
(61, 1, 20, 'О нас', '2013-08-14 10:34:33'),
(60, 49, 0, 'Банера', '2013-07-31 15:38:26'),
(62, 1, 21, 'Бренды', '2013-08-14 10:34:42');

-- --------------------------------------------------------

--
-- Структура таблицы `contact_languages`
--

CREATE TABLE IF NOT EXISTS `contact_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `description_short` varchar(2000) NOT NULL,
  `description_search` text NOT NULL,
  `author` varchar(100) NOT NULL,
  `seo_title` varchar(200) NOT NULL,
  `key_words` varchar(500) NOT NULL,
  `seo_description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `contact_languages`
--

INSERT INTO `contact_languages` (`id`, `contact_id`, `language_id`, `title`, `description`, `description_short`, `description_search`, `author`, `seo_title`, `key_words`, `seo_description`) VALUES
(5, 2, 2, 'Контакты', '<table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">\n	<tbody>\n		<tr>\n			<td style="text-align: left; vertical-align: top;">\n			<p>Автоцентр на Московском<br />\n			пр. Московский, 22</p>\n\n			<p>&nbsp;</p>\n\n			<p>Автосалон Mercedes-Benz<br />\n			Chrysler, Jeep, Dodge<br />\n			(044) 206-20-02</p>\n\n			<p>&nbsp;</p>\n\n			<p>Автосалон Opel, Chevrolet<br />\n			(044) 206-32-00</p>\n\n			<p>&nbsp;</p>\n\n			<p>Автосалон ZAZ, Chery<br />\n			(044) 206-32-00, (044) 451-45-37<br />\n			(095) 26-24-702</p>\n\n			<p>&nbsp;</p>\n			</td>\n			<td style="text-align: left; vertical-align: top;">\n			<p>Режим работы:<br />\n			ПН-ПТ&nbsp; 9:00 -20:00<br />\n			СБ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 -19:00<br />\n			ВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 16:30</p>\n			</td>\n			<td style="text-align: left; vertical-align: top;">\n			<p>Ремонт, обслуживание, гарантия<br />\n			(044) 206-32-02</p>\n\n			<p>&nbsp;</p>\n\n			<p>Запчасти, материалы<br />\n			(044) 537-25-81</p>\n\n			<p>&nbsp;</p>\n\n			<p>Сервис Mercedes-Benz<br />\n			(044) 206 20 02</p>\n			</td>\n		</tr>\n		<tr>\n			<td style="text-align: left; vertical-align: top;">\n			<p>Режим работы<br />\n			ПН-СБ&nbsp;&nbsp; 8:30 - 20:30<br />\n			ВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 17:00</p>\n			</td>\n			<td style="text-align: left; vertical-align: top;">\n			<p>Центр Кузовного ремонта<br />\n			(044) 206-35-05</p>\n			</td>\n			<td style="text-align: left; vertical-align: top;">\n			<p>Режим работы:<br />\n			ПН-СБ&nbsp;&nbsp; 8:30 - 20:30<br />\n			ВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 17:00</p>\n			</td>\n		</tr>\n	</tbody>\n</table>', '<table align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">\n	<tbody>\n		<tr>\n			<td style="vertical-align: top;">\n			<p>Автоцентр на Московском</p>\n\n			<p>пр. Московский, 22</p>\n\n			<p>&nbsp;</p>\n\n			<p>Автосалон Opel, Chevrolet</p>\n\n			<p>(044) 206-32-00</p>\n\n			<p>&nbsp;</p>\n\n			<p>Автосалон ZAZ, Chery</p>\n\n			<p>(044) 206-32-00</p>\n\n			<p>(044) 451-45-37</p>\n\n			<p>(095) 26-24-702</p>\n			</td>\n			<td style="vertical-align: bottom;">\n			<p><span style="color:#FFFFFF;">Режим работы</span></p>\n\n			<p><span style="color:#FFFFFF;">ПН-ПТ 9:00 - 20:00</span></p>\n\n			<p><span style="color:#FFFFFF;">СБ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 19:00</span></p>\n\n			<p><span style="color:#FFFFFF;">ВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 16:30</span></p>\n			</td>\n		</tr>\n	</tbody>\n</table>', '\n	\n		\n			\n			Автоцентр на Московском\n			пр. Московский, 22\n\n			&nbsp;\n\n			Автосалон Mercedes-Benz\n			Chrysler, Jeep, Dodge\n			(044) 206-20-02\n\n			&nbsp;\n\n			Автосалон Opel, Chevrolet\n			(044) 206-32-00\n\n			&nbsp;\n\n			Автосалон ZAZ, Chery\n			(044) 206-32-00, (044) 451-45-37\n			(095) 26-24-702\n\n			&nbsp;\n			\n			\n			Режим работы:\n			ПН-ПТ&nbsp; 9:00 -20:00\n			СБ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 -19:00\n			ВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 16:30\n			\n			\n			Ремонт, обслуживание, гарантия\n			(044) 206-32-02\n\n			&nbsp;\n\n			Запчасти, материалы\n			(044) 537-25-81\n\n			&nbsp;\n\n			Сервис Mercedes-Benz\n			(044) 206 20 02\n			\n		\n		\n			\n			Режим работы\n			ПН-СБ&nbsp;&nbsp; 8:30 - 20:30\n			ВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 17:00\n			\n			\n			Центр Кузовного ремонта\n			(044) 206-35-05\n			\n			\n			Режим работы:\n			ПН-СБ&nbsp;&nbsp; 8:30 - 20:30\n			ВС&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9:00 - 17:00\n			\n		\n	\n\n', 'Андрей', 'New description New description New description!!!!!!!!!!!!!!!!!', 'New description New description New description!!!!!!!!!!!!!!!!!New description New description New description!!!!!!!!!!!!!!!!!', 'New description New description New description!!!!!!!!!!!!!!!!!New description New description New description!!!!!!!!!!!!!!!!!New description New description New description!!!!!!!!!!!!!!!!!'),
(4, 2, 1, 'New title title', 'New description New description New description', 'Short description in popUp block', '', 'Author', '', '', ''),
(6, 2, 3, 'New title title', 'New description New description New description', 'Short description in popUp block', '', 'Author', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `contacts`
--

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `contacts`
--

INSERT INTO `contacts` (`id`, `date`) VALUES
(2, '25-03-2013');

-- --------------------------------------------------------

--
-- Структура таблицы `emails`
--

CREATE TABLE IF NOT EXISTS `emails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(19) NOT NULL,
  `email` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `emails`
--

INSERT INTO `emails` (`id`, `date`, `email`, `department`, `description`) VALUES
(1, '16-04-2013 16:54:59', 'andrew.sygyda@gmail.com', 'Финансовый отдел', 'Для служебных связей изм');

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `clear_name` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `admin_access` int(1) NOT NULL,
  `removed` int(1) NOT NULL,
  `date` varchar(19) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`id`, `name`, `clear_name`, `description`, `admin_access`, `removed`, `date`) VALUES
(1, 'admin', 'Администратор', 'Имеет права доступа ко всем функциям', 1, 0, ''),
(2, 'members', 'Обычный пользователь', 'General User', 0, 1, '31-05-2013 13:30:58'),
(3, 'Группа сеошников', 'Сеошники', 'Занимается расскруткой сайтов', 1, 1, '31-05-2013 18:50:29');

-- --------------------------------------------------------

--
-- Структура таблицы `groups_users`
--

CREATE TABLE IF NOT EXISTS `groups_users` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `groups_users`
--

INSERT INTO `groups_users` (`id`, `user_id`, `group_id`) VALUES
(1, 1, 1),
(19, 9, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `languages`
--

CREATE TABLE IF NOT EXISTS `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `iso_code` varchar(3) NOT NULL,
  `position` int(2) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `languages`
--

INSERT INTO `languages` (`id`, `name`, `iso_code`, `position`) VALUES
(1, 'Engilsh', 'en', 2),
(2, 'Русский', 'ru', 1),
(3, 'Українська', 'ua', 3),
(6, 'Арабский', 'ar', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `links`
--

CREATE TABLE IF NOT EXISTS `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(1000) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `server_method` varchar(1000) NOT NULL,
  `pref` varchar(4) NOT NULL,
  `main` int(1) NOT NULL,
  `language_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=108 ;

--
-- Дамп данных таблицы `links`
--

INSERT INTO `links` (`id`, `link`, `url`, `server_method`, `pref`, `main`, `language_id`) VALUES
(4, 'kuzovnoj_remont', 'article/2/4/1/2', 'user/article_controller/get_article_list/2/4/1/2', '', 1, 2),
(6, 'rihtovka', 'articleitem/2/11/0/2', 'user/article_controller/get_article/2/11/0/2', '', 0, 2),
(7, 'zamena', 'articleitem/3/11/0/2', 'user/article_controller/get_article/3/11/0/2', '', 0, 2),
(9, 'kredit', 'articleitem/4/11/0/2', 'user/article_controller/get_article/4/11/0/2', '', 0, 2),
(14, 'strahovanie', 'articleitem/5/11/0/2', 'user/article_controller/get_article/5/11/0/2', '', 0, 2),
(11, 'lizing', 'articleitem/6/11/0/2', 'user/article_controller/get_article/6/11/0/2', '', 0, 2),
(13, 'super_aktsija', 'articleitem/7/11/0/2', 'user/article_controller/get_article/7/11/0/2', '', 0, 2),
(20, 'avtomobili', 'automodels/0/9/1/2', 'user/automodel_controller/get_automodels/0/9/1/2', '', 1, 2),
(21, 'kontaktnaja_informatsija', 'contacts/2/12/1/2', 'user/contacts_controller/get_contacts/2/12/1/2', '', 1, 2),
(54, 'vida', 'automodel/12/3/0/2', 'user/automodel_controller/get_automodel/12/3/0/2', '', 0, 2),
(70, 'camaro', 'automodel/13/4/1/2', 'user/automodel_controller/get_automodel/13/4/1/2', '', 1, 2),
(24, 'astra', 'automodel/14/5/0/2', 'user/automodel_controller/get_automodel/14/5/0/2', '', 0, 2),
(25, 'cherry', 'automodel/15/6/0/2', 'user/automodel_controller/get_automodel/15/6/0/2', '', 0, 2),
(105, 'spisok_statey', 'articles/8/0/0/1', 'user/user_controller/get_article/8/0/0/1', 'en/', 0, 1),
(31, 'esche_odna_statja', 'articleitem/9/5/0/2', 'user/article_controller/get_article/9/5/0/2', '', 0, 2),
(35, 'i_esche_odna_statja', 'articleitem/10/5/0/2', 'user/article_controller/get_article/10/5/0/2', '', 0, 2),
(34, 'nuzhno_avto_premium_klassa', 'articleitem/11/5/0/2', 'user/article_controller/get_article/11/5/0/2', '', 0, 2),
(51, 'finansovye_uslugi', 'article/3/5/1/2', 'user/article_controller/get_article_list/3/5/1/2', '', 1, 2),
(37, 'servis_i_garantija', 'autoservice/1/3/1/2', 'user/autoservice_controller/get_autoservice/1/3/1/2', '', 1, 2),
(49, 'multibrand', 'staticcomp/8/16/0/2', 'user/staticcomp_controller/get_staticcomp/8/16/0/2', '', 0, 2),
(50, 'kuzovnoj_remont_', 'staticcomp/9/17/0/2', 'user/staticcomp_controller/get_staticcomp/9/17/0/2', '', 0, 2),
(90, 'ekspess_servis', 'staticcomp/12/20/0/2', 'user/staticcomp_controller/get_staticcomp/12/20/0/2', '', 0, 2),
(88, 'avtoevakuator', 'staticcomp/13/21/0/2', 'user/staticcomp_controller/get_staticcomp/13/21/0/2', '', 0, 2),
(92, 'stoimost_to', 'staticcomp/10/18/0/2', 'user/staticcomp_controller/get_staticcomp/10/18/0/2', '', 0, 2),
(91, 'zapis_na_to', 'staticcomp/11/19/0/2', 'user/staticcomp_controller/get_staticcomp/11/19/0/2', '', 0, 2),
(89, 'korporativnyi_klientam', 'staticcomp/14/22/0/2', 'user/staticcomp_controller/get_staticcomp/14/22/0/2', '', 0, 2),
(93, 'mercedes', 'staticcomp/7/15/0/2', 'user/staticcomp_controller/get_staticcomp/7/15/0/2', '', 0, 2),
(58, 'lanos_at', 'automodel/19/3/0/2', 'user/automodel_controller/get_automodel/19/3/0/2', '', 0, 2),
(57, 'forza_', 'automodel/18/3/0/2', 'user/automodel_controller/get_automodel/18/3/0/2', '', 0, 2),
(60, 'lanos', 'automodel/21/3/0/2', 'user/automodel_controller/get_automodel/21/3/0/2', '', 0, 2),
(64, 'sens_hatchback', 'automodel/25/3/0/2', 'user/automodel_controller/get_automodel/25/3/0/2', '', 0, 2),
(65, 'vida_hatchback', 'automodel/26/3/0/2', 'user/automodel_controller/get_automodel/26/3/0/2', '', 0, 2),
(66, 'forza_hatchback', 'automodel/27/3/0/2', 'user/automodel_controller/get_automodel/27/3/0/2', '', 0, 2),
(67, 'lanos_hatchback', 'automodel/28/3/0/2', 'user/automodel_controller/get_automodel/28/3/0/2', '', 0, 2),
(68, 'lanos_pick_up', 'automodel/29/3/0/2', 'user/automodel_controller/get_automodel/29/3/0/2', '', 0, 2),
(69, 'sens', 'automodel/30/3/0/2', 'user/automodel_controller/get_automodel/30/3/0/2', '', 0, 2),
(72, 'aveo_hatchback', 'automodel/31/4/0/2', 'user/automodel_controller/get_automodel/31/4/0/2', '', 0, 2),
(73, 'aveo_new_sedan', 'automodel/32/4/0/2', 'user/automodel_controller/get_automodel/32/4/0/2', '', 0, 2),
(74, 'malibu', 'automodel/33/4/0/2', 'user/automodel_controller/get_automodel/33/4/0/2', '', 0, 2),
(75, 'cruse_facelift_wagon', 'automodel/34/4/0/2', 'user/automodel_controller/get_automodel/34/4/0/2', '', 0, 2),
(76, 'cruse_facelift_sedan', 'automodel/35/4/0/2', 'user/automodel_controller/get_automodel/35/4/0/2', '', 0, 2),
(77, 'cruze_facelift_hatchback', 'automodel/36/4/0/2', 'user/automodel_controller/get_automodel/36/4/0/2', '', 0, 2),
(78, 'new_captiva', 'automodel/37/4/0/2', 'user/automodel_controller/get_automodel/37/4/0/2', '', 0, 2),
(79, 'cruze_hatchback', 'automodel/38/4/0/2', 'user/automodel_controller/get_automodel/38/4/0/2', '', 0, 2),
(80, 'cruze', 'automodel/39/4/0/2', 'user/automodel_controller/get_automodel/39/4/0/2', '', 0, 2),
(81, 'orlando', 'automodel/40/4/0/2', 'user/automodel_controller/get_automodel/40/4/0/2', '', 0, 2),
(82, 'spark', 'automodel/41/4/0/2', 'user/automodel_controller/get_automodel/41/4/0/2', '', 0, 2),
(83, 'lacetti_sedan', 'automodel/42/4/0/2', 'user/automodel_controller/get_automodel/42/4/0/2', '', 0, 2),
(84, 'lacetti_hatchback', 'automodel/43/4/0/2', 'user/automodel_controller/get_automodel/43/4/0/2', '', 0, 2),
(104, 'spisok_statey', 'articles/8/0/0/2', 'user/user_controller/get_article/8/0/0/2', 'ru/', 0, 2),
(96, 'novaja_statja2', 'staticcomp/15/24/0/2', 'user/staticcomp_controller/get_staticcomp/15/24/0/2', '', 0, 2),
(97, 'novaja_statja3', 'staticcomp/16/25/0/2', 'user/staticcomp_controller/get_staticcomp/16/25/0/2', '', 0, 2),
(99, 'novaja_statja_upd', 'articleitem/12/23/0/2', 'user/article_controller/get_article/12/23/0/2', '', 0, 2),
(101, 'testovaja_statja', 'articleitem/14/23/1/2', '/14/23/1/2', '', 1, 2),
(106, 'test111', 'staticcomp/19/0/0/2', 'user/user_controller/get_static_component/19/0/0/2', 'ru/', 0, 2),
(107, 'test111', 'staticcomp/19/0/0/1', 'user/user_controller/get_static_component/19/0/0/1', 'en/', 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `links_menu_items`
--

CREATE TABLE IF NOT EXISTS `links_menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

--
-- Дамп данных таблицы `links_menu_items`
--

INSERT INTO `links_menu_items` (`id`, `link_id`, `menu_item_id`) VALUES
(7, 17, 8),
(13, 37, 3),
(3, 4, 4),
(27, 51, 5),
(10, 20, 9),
(11, 21, 12),
(36, 93, 15),
(25, 49, 16),
(26, 50, 17),
(35, 92, 18),
(34, 91, 19),
(33, 90, 20),
(31, 88, 21),
(32, 89, 22),
(37, 94, 23),
(38, 96, 24),
(39, 97, 25);

-- --------------------------------------------------------

--
-- Структура таблицы `links_static_components`
--

CREATE TABLE IF NOT EXISTS `links_static_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `static_component_id` int(11) NOT NULL,
  `link_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `links_static_components`
--

INSERT INTO `links_static_components` (`id`, `static_component_id`, `link_id`) VALUES
(1, 19, 106),
(2, 19, 107);

-- --------------------------------------------------------

--
-- Структура таблицы `markings`
--

CREATE TABLE IF NOT EXISTS `markings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `min_width` int(11) NOT NULL,
  `max_width` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `min_font_size` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `markings`
--

INSERT INTO `markings` (`id`, `min_width`, `max_width`, `width`, `height`, `min_font_size`) VALUES
(1, 1024, 1500, 1366, 760, 9);

-- --------------------------------------------------------

--
-- Структура таблицы `menu_blocks`
--

CREATE TABLE IF NOT EXISTS `menu_blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `menu_blocks`
--

INSERT INTO `menu_blocks` (`id`, `name`, `position`) VALUES
(1, 'Главное меню', 1),
(2, 'Меню сервиса', 2),
(5, 'footer', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `menu_blocks_menu_items`
--

CREATE TABLE IF NOT EXISTS `menu_blocks_menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_block_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Дамп данных таблицы `menu_blocks_menu_items`
--

INSERT INTO `menu_blocks_menu_items` (`id`, `menu_block_id`, `menu_item_id`) VALUES
(8, 1, 9),
(2, 1, 3),
(3, 1, 4),
(4, 1, 5),
(11, 1, 12),
(14, 2, 15),
(15, 2, 16),
(16, 2, 17),
(17, 2, 18),
(18, 2, 19),
(19, 2, 20),
(20, 2, 21),
(21, 2, 22),
(22, 2, 23),
(23, 2, 24),
(24, 2, 25),
(25, 2, 26),
(26, 2, 27),
(27, 2, 28),
(28, 5, 29),
(29, 5, 30),
(30, 5, 31);

-- --------------------------------------------------------

--
-- Структура таблицы `menu_item_languages`
--

CREATE TABLE IF NOT EXISTS `menu_item_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_item_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `value` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=51 ;

--
-- Дамп данных таблицы `menu_item_languages`
--

INSERT INTO `menu_item_languages` (`id`, `menu_item_id`, `language_id`, `value`) VALUES
(14, 9, 2, 'Автомобили'),
(20, 3, 2, 'Сервис и гарантия'),
(3, 4, 2, 'Кузовной ремонт'),
(34, 5, 2, 'Финансовые услуги'),
(18, 12, 2, 'Контактная информация'),
(43, 15, 2, 'Mercedes'),
(32, 16, 2, 'Multibrand'),
(33, 17, 2, 'Кузовной ремонт'),
(42, 18, 2, 'Стоимость ТО'),
(41, 19, 2, 'Запись на ТО'),
(40, 20, 2, 'Экспесс-сервис'),
(38, 21, 2, 'Автоэвакуатор'),
(39, 22, 2, 'Корпоративныи клиентам'),
(44, 23, 2, 'Список статей'),
(45, 24, 2, 'Новая статья2'),
(46, 25, 2, 'Новая статья3'),
(47, 28, 2, 'Тест111'),
(48, 29, 2, 'О нас'),
(49, 30, 2, 'Бренды'),
(50, 31, 2, 'О нас 2');

-- --------------------------------------------------------

--
-- Структура таблицы `menu_item_relations`
--

CREATE TABLE IF NOT EXISTS `menu_item_relations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_item_id` int(11) NOT NULL,
  `related_menu_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `menu_items`
--

CREATE TABLE IF NOT EXISTS `menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `component_id` int(11) NOT NULL,
  `window` tinyint(1) NOT NULL,
  `main` tinyint(1) NOT NULL,
  `position` int(11) NOT NULL,
  `default_item` int(1) NOT NULL,
  `inner_navigation` int(1) NOT NULL,
  `child_inner_navigation` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Дамп данных таблицы `menu_items`
--

INSERT INTO `menu_items` (`id`, `parent_id`, `component_id`, `window`, `main`, `position`, `default_item`, `inner_navigation`, `child_inner_navigation`) VALUES
(12, 0, 28, 0, 1, 5, 1, 0, 0),
(9, 0, 24, 0, 1, 1, 1, 0, 0),
(3, 0, 32, 0, 1, 2, 1, 0, 0),
(4, 0, 7, 0, 1, 3, 1, 0, 0),
(5, 0, 8, 0, 1, 4, 1, 0, 0),
(16, 0, 36, 1, 0, 1, 1, 0, 0),
(15, 0, 35, 1, 0, 0, 1, 1, 1),
(17, 0, 37, 1, 0, 2, 1, 0, 0),
(18, 15, 38, 1, 0, 1, 1, 1, 0),
(19, 15, 39, 1, 0, 2, 1, 1, 0),
(20, 15, 40, 1, 0, 3, 1, 1, 1),
(21, 15, 41, 1, 0, 4, 1, 1, 1),
(22, 15, 42, 1, 0, 5, 1, 1, 1),
(23, 16, 46, 1, 0, 1, 1, 1, 1),
(24, 16, 47, 1, 0, 2, 1, 1, 1),
(25, 16, 0, 1, 0, 3, 0, 0, 0),
(28, 17, 59, 0, 1, 1, 1, 0, 0),
(29, 0, 61, 1, 0, 1, 0, 0, 0),
(30, 0, 62, 1, 0, 2, 1, 0, 0),
(31, 0, 61, 0, 1, 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `mini_block_images`
--

CREATE TABLE IF NOT EXISTS `mini_block_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mini_block_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Дамп данных таблицы `mini_block_images`
--

INSERT INTO `mini_block_images` (`id`, `mini_block_id`, `name`) VALUES
(11, 1, '5d62b0be2afcf43157ca09bbf14f88db404cef06.png'),
(7, 2, '280ed8005549f81dd3a2574ff2cce936445a106b.png'),
(8, 0, '11a60ae0f0f2b099b6809c9389fc443ecddd08f1.png'),
(12, 0, '6e4d142c47ee2782495961f805cd48d2429d6a40.jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `mini_block_languages`
--

CREATE TABLE IF NOT EXISTS `mini_block_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language_id` int(11) NOT NULL,
  `mini_block_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `button_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Дамп данных таблицы `mini_block_languages`
--

INSERT INTO `mini_block_languages` (`id`, `language_id`, `mini_block_id`, `name`, `button_name`) VALUES
(1, 2, 1, 'Первый новостной блок', 'Все фин. услуги'),
(2, 2, 2, 'Второй новостной блок', 'Кузовной ремонт'),
(5, 2, 5, 'Текстовый блочок', 'Название из заголовка'),
(19, 2, 9, 'Автоцентр фенси-бокс', 'без кнопки'),
(20, 2, 10, 'Сервис и гарантия', 'Сервис и гарантия');

-- --------------------------------------------------------

--
-- Структура таблицы `mini_block_tooltips`
--

CREATE TABLE IF NOT EXISTS `mini_block_tooltips` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mini_block_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `mini_block_tooltips`
--

INSERT INTO `mini_block_tooltips` (`id`, `mini_block_id`, `name`) VALUES
(4, 1, 'a0ab032ae5d220e52159401f2226188a7e58862d.jpg'),
(5, 2, '37318e426081c601267fd7fdd4fa4985429435af.jpg'),
(6, 0, 'b954edf7ff9ef6aa83af59a72fbe15a2dd255a5a.png'),
(7, 0, '38987179a82bfb0a3e5bbc4c00ec6b46a16f0e2c.jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `mini_blocks`
--

CREATE TABLE IF NOT EXISTS `mini_blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` int(11) NOT NULL,
  `component_id` int(11) NOT NULL,
  `img` int(1) NOT NULL,
  `view` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `mini_blocks`
--

INSERT INTO `mini_blocks` (`id`, `position`, `component_id`, `img`, `view`) VALUES
(1, 1, 8, 1, ''),
(2, 2, 7, 1, ''),
(5, 4, 17, 0, ''),
(9, 0, 0, 0, 'views/user/mini_block/autocentr.php'),
(10, 3, 0, 0, 'views/user/mini_block/service.php');

-- --------------------------------------------------------

--
-- Структура таблицы `mini_blocks_placeholders`
--

CREATE TABLE IF NOT EXISTS `mini_blocks_placeholders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mini_block_id` int(11) NOT NULL,
  `placeholder_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `mini_blocks_placeholders`
--

INSERT INTO `mini_blocks_placeholders` (`id`, `mini_block_id`, `placeholder_id`) VALUES
(2, 1, 3),
(3, 2, 3),
(5, 5, 6),
(6, 9, 3),
(7, 10, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `placeholder_attributes`
--

CREATE TABLE IF NOT EXISTS `placeholder_attributes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placeholder_id` int(11) NOT NULL,
  `key` varchar(50) NOT NULL,
  `value` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `placeholder_attributes`
--

INSERT INTO `placeholder_attributes` (`id`, `placeholder_id`, `key`, `value`) VALUES
(10, 3, 'margin-left', '1%'),
(9, 3, 'float', 'left'),
(11, 4, 'float', 'left'),
(12, 5, 'float', 'left'),
(13, 6, 'float', 'left'),
(14, 6, 'margin', '0.3% 0 0 1%'),
(15, 3, 'position', 'relative');

-- --------------------------------------------------------

--
-- Структура таблицы `placeholders`
--

CREATE TABLE IF NOT EXISTS `placeholders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `identificator` varchar(20) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `position` int(3) NOT NULL,
  `width` float NOT NULL,
  `height` float NOT NULL,
  `width_param` int(1) NOT NULL,
  `height_param` int(1) NOT NULL,
  `view` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `placeholders`
--

INSERT INTO `placeholders` (`id`, `name`, `identificator`, `description`, `position`, `width`, `height`, `width_param`, `height_param`, `view`) VALUES
(1, 'Хедер', 'header', 'Блок который находится вверху страницы', 0, 100, 5, 0, 0, 'views/user/placeholder/header.php'),
(3, 'Правая колонка', 'rightColumn', 'Правая колонка с новостями', 2, 18, 70, 0, 0, ''),
(4, 'Банер с автобрендами', 'autoWrap', 'Содержит 4 автобренда с возможностью переключения активного пункта', 1, 80, 70, 0, 0, 'views/user/placeholder/autobrends.php'),
(5, 'Автомодели', 'autoModelWrap', 'Блок содержит автомодели всех брендов', 3, 80, 0, 0, 2, 'views/user/placeholder/automodels.php'),
(6, 'Блок с небольшим текстом', 'advText', 'Содержится информация про любую новость на выбор администратора', 4, 18, 0, 0, 2, ''),
(7, 'Футер', 'footer', 'Блок с кнопками для окон', 5, 100, 3, 0, 0, 'views/user/placeholder/footer.php');

-- --------------------------------------------------------

--
-- Структура таблицы `placeholders_product_blocks`
--

CREATE TABLE IF NOT EXISTS `placeholders_product_blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `placeholder_id` int(11) NOT NULL,
  `product_block_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `placeholders_product_blocks`
--

INSERT INTO `placeholders_product_blocks` (`id`, `placeholder_id`, `product_block_id`) VALUES
(2, 5, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `producer_languages`
--

CREATE TABLE IF NOT EXISTS `producer_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producer_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `producer_languages`
--

INSERT INTO `producer_languages` (`id`, `producer_id`, `language_id`, `name`, `description`) VALUES
(2, 2, 2, 'Coca-Cola', 'Первый производитель'),
(3, 3, 2, 'Mazda', 'Суперкары от мазда'),
(4, 4, 2, 'ЗАЗ', 'Автокомпания будущего и прошлого'),
(5, 5, 2, 'Chevrolet', 'Крутая фирма, выпускает хорошие автомобили');

-- --------------------------------------------------------

--
-- Структура таблицы `producer_logoes`
--

CREATE TABLE IF NOT EXISTS `producer_logoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producer_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Структура таблицы `producer_photoes`
--

CREATE TABLE IF NOT EXISTS `producer_photoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producer_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Структура таблицы `producers`
--

CREATE TABLE IF NOT EXISTS `producers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(19) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `producers`
--

INSERT INTO `producers` (`id`, `date`) VALUES
(2, '14-05-2013 19:32:24'),
(3, '14-05-2013 19:32:45'),
(4, '22-05-2013 11:56:53'),
(5, '22-05-2013 11:57:28');

-- --------------------------------------------------------

--
-- Структура таблицы `product_block_languages`
--

CREATE TABLE IF NOT EXISTS `product_block_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_block_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `product_block_languages`
--

INSERT INTO `product_block_languages` (`id`, `product_block_id`, `language_id`, `name`, `description`) VALUES
(1, 1, 2, 'Заз', 'В этом блоке будут ЗАЗ машинки');

-- --------------------------------------------------------

--
-- Структура таблицы `product_blocks`
--

CREATE TABLE IF NOT EXISTS `product_blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `row_quantity` int(3) NOT NULL,
  `column_quantity` int(2) NOT NULL,
  `category` int(1) NOT NULL,
  `producer` int(1) NOT NULL,
  `short_description` int(1) NOT NULL,
  `price` int(1) NOT NULL,
  `sale_price` int(1) NOT NULL,
  `view` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `product_blocks`
--

INSERT INTO `product_blocks` (`id`, `row_quantity`, `column_quantity`, `category`, `producer`, `short_description`, `price`, `sale_price`, `view`) VALUES
(1, 3, 2, 1, 1, 1, 1, 0, 'views/user/product_block/automodels.php');

-- --------------------------------------------------------

--
-- Структура таблицы `product_blocks_products`
--

CREATE TABLE IF NOT EXISTS `product_blocks_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `product_block_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `product_blocks_products`
--

INSERT INTO `product_blocks_products` (`id`, `product_id`, `product_block_id`) VALUES
(6, 9, 1),
(5, 7, 1),
(7, 8, 1),
(8, 10, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `product_languages`
--

CREATE TABLE IF NOT EXISTS `product_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `description` varchar(3000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Дамп данных таблицы `product_languages`
--

INSERT INTO `product_languages` (`id`, `product_id`, `language_id`, `name`, `description`) VALUES
(11, 6, 2, 'Mazda RX-5', 'sdfasdf asdf asf asdf asdf asd fasdf asd f'),
(2, 2, 2, 'Mazda', 'Мощная машина))))'),
(3, 3, 2, 'Mazda2', 'Супер Карррррррррррр'),
(12, 7, 2, 'Vida', 'Хорошая и не дорогая машина'),
(13, 8, 2, 'Lanos', 'Lanos super car ))))))))))))))))))))))))))))))))))))))))))'),
(14, 9, 2, 'Forza', 'Forza Forza Forza Forza Forza Forza Forza Forza Forza Forza Forza Forza Forza Forza Forza'),
(15, 10, 2, 'Sens hatchback', 'Sens hatchback Sens hatchback Sens hatchback Sens hatchback Sens hatchback Sens hatchback Sens hatchback'),
(10, 5, 2, 'Coca-Cola', 'zsfasdfasdfasdfaasdf asdf asdf asdf asdf asdf');

-- --------------------------------------------------------

--
-- Структура таблицы `product_logoes`
--

CREATE TABLE IF NOT EXISTS `product_logoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `product_logoes`
--

INSERT INTO `product_logoes` (`id`, `product_id`, `name`) VALUES
(4, 5, 'b5302d5468b4c3159cf3ce567c42429fe8556d0c.jpeg'),
(5, 7, 'aaa354df4279d69f7b9ebd4fe0c07a31f3d0641d.png'),
(6, 8, '3cf6e801b18b2b3487eced49eaf18e3b7a79befd.png'),
(8, 9, '958d80069c4530364e65831ea7398461a75092a7.png'),
(9, 10, 'f89d7c86e6d2edf01dbeda3105ca256f85ca4037.png');

-- --------------------------------------------------------

--
-- Структура таблицы `product_photoes`
--

CREATE TABLE IF NOT EXISTS `product_photoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `product_photoes`
--

INSERT INTO `product_photoes` (`id`, `product_id`, `name`) VALUES
(4, 5, '266be54c234fc94ecc38c3d29b26e2590bb287af.png'),
(3, 5, '5e574bcd7cb02794a583403894fdb0f3d2a7874e.png');

-- --------------------------------------------------------

--
-- Структура таблицы `product_quantity_values`
--

CREATE TABLE IF NOT EXISTS `product_quantity_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `category_attribute_id` int(11) NOT NULL,
  `value` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `product_quantity_values`
--

INSERT INTO `product_quantity_values` (`id`, `product_id`, `category_attribute_id`, `value`) VALUES
(6, 8, 5, 90),
(2, 3, 5, 85),
(5, 7, 5, 10),
(7, 9, 5, 70),
(8, 10, 5, 65);

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producer_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `discount_price` float NOT NULL,
  `new_product` int(1) NOT NULL,
  `top_product` int(1) NOT NULL,
  `wait_product` int(1) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `producer_id`, `unit_id`, `price`, `discount_price`, `new_product`, `top_product`, `wait_product`, `quantity`) VALUES
(5, 2, 1, 50, 45, 1, 1, 0, 300),
(2, 3, 0, 500000, 450000, 1, 1, 0, 3),
(3, 3, 0, 175000, 120000, 1, 1, 0, 6),
(7, 4, 0, 82200, 0, 1, 0, 0, 5),
(6, 3, 0, 360000, 320000, 0, 0, 1, 0),
(8, 4, 0, 75000, 0, 1, 1, 0, 3),
(9, 4, 0, 84750, 0, 1, 1, 0, 5),
(10, 4, 0, 66800, 0, 1, 1, 0, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `products_quality_variants`
--

CREATE TABLE IF NOT EXISTS `products_quality_variants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quality_variant_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Дамп данных таблицы `products_quality_variants`
--

INSERT INTO `products_quality_variants` (`id`, `product_id`, `quality_variant_id`) VALUES
(12, 7, 10),
(10, 7, 5),
(11, 7, 9),
(13, 8, 7),
(14, 8, 8),
(15, 8, 11),
(16, 9, 5),
(17, 9, 8),
(18, 9, 11),
(19, 10, 7),
(20, 10, 10),
(21, 10, 11);

-- --------------------------------------------------------

--
-- Структура таблицы `quality_variant_languages`
--

CREATE TABLE IF NOT EXISTS `quality_variant_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quality_variant_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `value` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `quality_variant_languages`
--

INSERT INTO `quality_variant_languages` (`id`, `quality_variant_id`, `language_id`, `value`) VALUES
(3, 3, 2, 'второе значение атриб'),
(5, 5, 2, 'Первое значение атрибута'),
(6, 6, 2, 'Второе значение атрибута'),
(7, 7, 2, 'Второе значение аттрибу'),
(8, 8, 2, 'Красный'),
(9, 9, 2, 'Желтый'),
(10, 10, 2, 'Фиолетовый'),
(11, 11, 2, 'Зеленый');

-- --------------------------------------------------------

--
-- Структура таблицы `quality_variants`
--

CREATE TABLE IF NOT EXISTS `quality_variants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_attribute_id` int(11) NOT NULL,
  `date` varchar(19) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `quality_variants`
--

INSERT INTO `quality_variants` (`id`, `category_attribute_id`, `date`) VALUES
(5, 4, '15-05-2013 17:58:48'),
(8, 6, '16-05-2013 13:50:04'),
(7, 4, '15-05-2013 18:19:20'),
(9, 6, '16-05-2013 13:50:09'),
(10, 6, '16-05-2013 13:50:15'),
(11, 6, '16-05-2013 14:00:55');

-- --------------------------------------------------------

--
-- Структура таблицы `question_variants`
--

CREATE TABLE IF NOT EXISTS `question_variants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `question_theme` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `question_variants`
--

INSERT INTO `question_variants` (`id`, `email_id`, `date`, `question_theme`) VALUES
(1, 1, 16, 'Кредитный калькулятор изм'),
(4, 1, 16, 'Тестовый вопрос');

-- --------------------------------------------------------

--
-- Структура таблицы `seo_languages`
--

CREATE TABLE IF NOT EXISTS `seo_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seo_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `key_words` varchar(500) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `seo_languages`
--

INSERT INTO `seo_languages` (`id`, `seo_id`, `language_id`, `key_words`, `title`, `description`) VALUES
(1, 1, 2, 'Автоцентр, Автоцентр на Московском, автомобили', 'Автоцентр на Московском', '«Автоцентр на Московском» - это Автомобильный супермаркет услуг, который стремительно развивает спектр сервисных услуг и выбор брендов автомобилей на покупку.  Мы гарантируем, что в одном месте, вы получите ответы на все вопросы и решите любую проблему, связанную с автомобилем.  Покупка нового автомобиля, установка дополнительного оборудования,  официальный сервис, гарантия, автомагазин, запчасти и даже Центр кузовного ремонта, все это ждет Вас по адресу Московский пр.22 (Киев, Оболонский район.)');

-- --------------------------------------------------------

--
-- Структура таблицы `seoes`
--

CREATE TABLE IF NOT EXISTS `seoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(19) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `seoes`
--

INSERT INTO `seoes` (`id`, `date`) VALUES
(1, '29-05-2013 17:19:11');

-- --------------------------------------------------------

--
-- Структура таблицы `static_component_behaviors`
--

CREATE TABLE IF NOT EXISTS `static_component_behaviors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `static_component_id` int(11) NOT NULL,
  `mini_block_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `static_component_behaviors`
--

INSERT INTO `static_component_behaviors` (`id`, `static_component_id`, `mini_block_id`, `quantity`) VALUES
(1, 4, 5, 300);

-- --------------------------------------------------------

--
-- Структура таблицы `static_components`
--

CREATE TABLE IF NOT EXISTS `static_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Дамп данных таблицы `static_components`
--

INSERT INTO `static_components` (`id`, `date`) VALUES
(4, '03-04-2013'),
(2, '04-03-2013'),
(3, '04-03-2013'),
(16, '18-04-2013'),
(15, '18-04-2013'),
(7, '02-04-2013'),
(8, '02-04-2013'),
(9, '02-04-2013'),
(10, '03-04-2013'),
(11, '03-04-2013'),
(12, '03-04-2013'),
(13, '03-04-2013'),
(14, '03-04-2013'),
(17, '17-06-2013'),
(18, '17-06-2013'),
(19, '17-06-2013'),
(20, '14-08-2013'),
(21, '14-08-2013');

-- --------------------------------------------------------

--
-- Структура таблицы `static_components_languages`
--

CREATE TABLE IF NOT EXISTS `static_components_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `static_component_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(12000) NOT NULL,
  `description_search` text NOT NULL,
  `author` varchar(100) NOT NULL,
  `seo_title` varchar(500) NOT NULL,
  `key_words` varchar(1000) NOT NULL,
  `seo_description` varchar(4000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=64 ;

--
-- Дамп данных таблицы `static_components_languages`
--

INSERT INTO `static_components_languages` (`id`, `static_component_id`, `language_id`, `title`, `description`, `description_search`, `author`, `seo_title`, `key_words`, `seo_description`) VALUES
(12, 4, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(11, 4, 2, 'Дополнительная информация', '<p>этот символ U<strong>nicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности ht</strong>ml код ему не н<strike>ужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html к</strike>од ему не нужен. И<em>щи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. </em></p>\n\n<h1 style="color:#AD2118;"><em>Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбрау</em>зерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре.</h1>', 'этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. \n\nПоэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре.\n', 'Андрей', 'Дополнительная информация', 'Ключевые слова для дополнительной информации', 'Описание страницы дополнительной информации)))'),
(10, 4, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(4, 2, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(5, 2, 2, 'Автомобили', '<p>Автомоби́ль (от др.-греч. &alpha;ὐ&tau;&omicron; &mdash; сам и лат. mobilis &mdash; движущийся), автомаши́на, автотранспортное средство, , в совокупности автотехника, автотранспорт &mdash; моторное безрельсовое дорожное транспортное средство минимум с 4 колёсами. Термин включает легковой автомобиль, грузовой автомобиль, автобус, троллейбус, бронетранспортёр, но не включает сельскохозяйственный трактор и мотоцикл. Точного перевода на английский язык нет; рекомендуется использовать слово automobile, хотя оно в английском обычно обозначает легковой автомобиль.<br />\nМеханическое транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов. Этот термин охватывает троллейбусы, то есть нерельсовые транспортные средства, соединённые с электрическим проводом; он не охватывает такие транспортные средства, как сельскохозяйственные тракторы, использование которых для перевозки людей или грузов является лишь вспомогательной функцией.<br />\n&mdash; Ст. 1, Конвенция о дорожном движении (Вена, 8 ноября 1968 года)<br />\nЛюбое механическое самоходное транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов; этот термин не включает сельскохозяйственные тракторы.<br />\n&mdash; Ст. 1, Европейское соглашение, касающееся работы экипажей транспортных средств, производящих международные автомобильные перевозки (ЕСТР) Женева, 1 июля 1970 года<br />\nНаземное транспортное средство, продвигаемое его собственными средствами, движущееся по крайней мере на четырёх колесах, не находящихся на одной линии, которые должны всегда быть в контакте с землей; управление должно быть обеспечено по крайней мере двумя из колес, и движение &mdash; по крайней мере двумя из колес.<br />\n&mdash; Международный спортивный кодекс ФИА, ст. 13</p>', 'Автомоби́ль (от др.-греч. &alpha;ὐ&tau;&omicron; &mdash; сам и лат. mobilis &mdash; движущийся), автомаши́на, автотранспортное средство, , в совокупности автотехника, автотранспорт &mdash; моторное безрельсовое дорожное транспортное средство минимум с 4 колёсами. Термин включает легковой автомобиль, грузовой автомобиль, автобус, троллейбус, бронетранспортёр, но не включает сельскохозяйственный трактор и мотоцикл. Точного перевода на английский язык нет; рекомендуется использовать слово automobile, хотя оно в английском обычно обозначает легковой автомобиль.\nМеханическое транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов. Этот термин охватывает троллейбусы, то есть нерельсовые транспортные средства, соединённые с электрическим проводом; он не охватывает такие транспортные средства, как сельскохозяйственные тракторы, использование которых для перевозки людей или грузов является лишь вспомогательной функцией.\n&mdash; Ст. 1, Конвенция о дорожном движении (Вена, 8 ноября 1968 года)\nЛюбое механическое самоходное транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов; этот термин не включает сельскохозяйственные тракторы.\n&mdash; Ст. 1, Европейское соглашение, касающееся работы экипажей транспортных средств, производящих международные автомобильные перевозки (ЕСТР) Женева, 1 июля 1970 года\nНаземное транспортное средство, продвигаемое его собственными средствами, движущееся по крайней мере на четырёх колесах, не находящихся на одной линии, которые должны всегда быть в контакте с землей; управление должно быть обеспечено по крайней мере двумя из колес, и движение &mdash; по крайней мере двумя из колес.\n&mdash; Международный спортивный кодекс ФИА, ст. 13\n', 'Андрей', 'Сео заголовок для автомобилей', 'автомобили, автомобиль, и другие ключевые слова', 'Небольшое описание странички с автомобилями)))'),
(6, 2, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(7, 3, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(8, 3, 2, 'Сервис и гарантия', '<p><span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Мы ценим выбор клиентов, приобретающих нашу продукцию. Она разрабатывается с учетом самых современных технологий и отвечает высочайшим стандартам качества. </span><br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Наши изделия разрабатываются с мыслью об удовлетворении высоких требований к технике и качеству. В целях еще большего обеспечения качества мы предоставляем конечным клиентам гарантию на нашу продукцию, воспользоваться которой клиент вправе в случае обнаружения в нашей продукции дефектов. </span><br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Точные сведения о типе и длительности гарантии для приобретенного изделия приведены в документе &laquo;Обзорная информация по гарантии&raquo;, который прилагается к изделию. Если устройство было приобретено в одной из стран, для которых в &laquo;Обзорной информации по гарантиям&raquo; отсутствует регламентация, то тип и срок гарантии должен быть указан на чеке-счете, выставленном для конечного клиента при первичном приобретении изделия, или на накладной доставки. </span><br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Предоставленная гарантия подтверждает собственное добровольное обязательство компании Fujitsu Technology Solutions поддерживать проданное оборудование в качестве производителя по отношению к первичным покупателям новых устройств. </span><br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Претензии по качеству изделия в течение гарантийного срока должны быть предъявлены незамедлительно после обнаружения дефекта либо через службу технической поддержки Help Desk компании Fujitsu Technology Solutions, либо непорсредственно партнеру Fujitsu Technology Solutions по сервису.</span></p>', 'Мы ценим выбор клиентов, приобретающих нашу продукцию. Она разрабатывается с учетом самых современных технологий и отвечает высочайшим стандартам качества. \n\nНаши изделия разрабатываются с мыслью об удовлетворении высоких требований к технике и качеству. В целях еще большего обеспечения качества мы предоставляем конечным клиентам гарантию на нашу продукцию, воспользоваться которой клиент вправе в случае обнаружения в нашей продукции дефектов. \n\nТочные сведения о типе и длительности гарантии для приобретенного изделия приведены в документе &laquo;Обзорная информация по гарантии&raquo;, который прилагается к изделию. Если устройство было приобретено в одной из стран, для которых в &laquo;Обзорной информации по гарантиям&raquo; отсутствует регламентация, то тип и срок гарантии должен быть указан на чеке-счете, выставленном для конечного клиента при первичном приобретении изделия, или на накладной доставки. \n\nПредоставленная гарантия подтверждает собственное добровольное обязательство компании Fujitsu Technology Solutions поддерживать проданное оборудование в качестве производителя по отношению к первичным покупателям новых устройств. \n\nПретензии по качеству изделия в течение гарантийного срока должны быть предъявлены незамедлительно после обнаружения дефекта либо через службу технической поддержки Help Desk компании Fujitsu Technology Solutions, либо непорсредственно партнеру Fujitsu Technology Solutions по сервису.\n', 'Андрей', 'Сервис и гарантия сео тайтл', 'Сервис и гарантия и другое', 'Короткое описание...'),
(9, 3, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(19, 7, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(20, 7, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(21, 7, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(22, 8, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(23, 8, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(24, 8, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(25, 9, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(26, 9, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(27, 9, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(28, 10, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(29, 10, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(30, 10, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(31, 11, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(32, 11, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(33, 11, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(34, 12, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(35, 12, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(36, 12, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(37, 13, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(38, 13, 2, 'Автоэвакуатор', '<p><img alt="" src="http://localhost/autocentr/uploads/images/0325d37a34cbd82cd96b4a58a7b8e37a.jpg" style="width: 283px; height: 188px; float: left; margin-right: 20px;" /> <strong>Вызвать Автоэвакуатор</strong> вы можете обратившись в Call-центр Корпорации &laquo;УкрАВТО&raquo; <strong>по телефону: </strong></p>\n\n<p><strong>0 800&ndash;507&ndash;71&ndash;70</strong>, или на ближайшее предприятие Корпорации &laquo;УкрАВТО&raquo;.</p>\n\n<p>По Вашему запросу оператор Call-центра сообщит Вам всю необходимую контактную информацию относительно <strong>ближайшего СТО на территории Украины</strong>, которое обслуживает бренд Вашего автомобиля и имеет эвакуатор.</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p class="citate">Обращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.</p>\n\n<h1>Вызов авто эвакуатора по всей территории Украины: 0-800&ndash;507&ndash;71&ndash;70</h1>\n\n<p>&nbsp;</p>\n\n<p class="citate">Обращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.</p>\n\n<p>&nbsp;</p>\n\n<p class="citate">Обращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.</p>\n\n<p>&nbsp;</p>\n\n<p class="citate">Обращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.</p>\n\n<p>&nbsp;</p>\n\n<p class="citate">Обращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.</p>\n\n<p>&nbsp;</p>\n\n<p class="citate">Обращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.</p>\n\n<p>&nbsp;</p>\n\n<p class="citate">Обращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.</p>\n\n<p>&nbsp;</p>\n\n<p class="citate">Обращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.</p>', ' Вызвать Автоэвакуатор вы можете обратившись в Call-центр Корпорации &laquo;УкрАВТО&raquo; по телефону: \n\n0 800&ndash;507&ndash;71&ndash;70, или на ближайшее предприятие Корпорации &laquo;УкрАВТО&raquo;.\n\nПо Вашему запросу оператор Call-центра сообщит Вам всю необходимую контактную информацию относительно ближайшего СТО на территории Украины, которое обслуживает бренд Вашего автомобиля и имеет эвакуатор.\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\n&nbsp;\n\nОбращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.\n\nВызов авто эвакуатора по всей территории Украины: 0-800&ndash;507&ndash;71&ndash;70\n\n&nbsp;\n\nОбращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.\n\n&nbsp;\n\nОбращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.\n\n&nbsp;\n\nОбращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.\n\n&nbsp;\n\nОбращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.\n\n&nbsp;\n\nОбращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.\n\n&nbsp;\n\nОбращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.\n\n&nbsp;\n\nОбращаем Ваше внимание, что авто эвакуаторы предприятий нашей сети на территории Украины работают по различному графику, который необходимо уточнять у оператора кол-центра.\n', 'Андрей', 'Автоэвакуатор', 'Автоэвакуатор, авария, эвакуация.', 'Контакты при аварии и автоэвакуации.'),
(39, 13, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(40, 14, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(41, 14, 2, 'Лучший сервис в сети УкрАВТО', '<p>Корпорация&nbsp;УкрАВТО&nbsp;-&nbsp;надежный, проверенным временем&nbsp;партнер&nbsp;многих бизнес-структур и государственных организаций.&nbsp;</p>\n\n<p style="text-align: left;">Сегодня&nbsp;уже более 10&nbsp;000 компаний&nbsp;стали&nbsp;клиентами&nbsp;УкрАВТО.&nbsp;</p>\n\n<p style="text-align: left;">Каждый&nbsp;корпоративный&nbsp;клиент&nbsp;УкрАВТО получает множество&nbsp;преимуществ&nbsp;</p>\n\n<p style="text-align: left;">и&nbsp;может&nbsp;оценить&nbsp;высокое качество обслуживания.<br />\n<br />\n<strong><span class="spisok">Для&nbsp;корпоративных клиентов&nbsp;мы&nbsp;предлагаем:</span></strong></p>\n\n<ul>\n</ul>\n\n<ul>\n	<li>Полный спектр услуг, от установки дополнительного оборудования до самых сложных восстановительных ремонтов.</li>\n	<li>Современное оборудование и квалифицированный персонал.</li>\n	<li>Высококачественное обслуживание на сертифицированных сервисных центрах по всей территории Украины..</li>\n	<li>Гарантия на все виды работ, согласно законодательства Украины.</li>\n	<li>Поддержка гарантии на весь спектр моделей, представленных Корпорацией &laquo;УкрАвто&raquo;.</li>\n	<li>Скидки на услуги и запасные части в зависимости от размера обслуживаемого автопарка.</li>\n	<li>Отсрочка платежа.</li>\n	<li>Круглосуточная поддержка.</li>\n	<li>Ежемесячная отчетность в разрезе областей и регионов по выполненным работам консолидировано по всей территории Украины.</li>\n	<li>Все предприятия Корпорации &laquo;УкрАвто&raquo; являются плательщиками налога на прибыль на общих основаниях и предоставляют полный пакет документов, согласно законодательства Украины.</li>\n</ul>\n\n<p>Наши специалисты,&nbsp;которые&nbsp;работают&nbsp;во всех регионах Украины,&nbsp;окажут Вам квалифицированную&nbsp;консультацию,&nbsp;а&nbsp;также&nbsp;помогут&nbsp;при&nbsp;решении всех вопросов&nbsp;в&nbsp;процессе эксплуатации.<br />\n<br />\n<strong>Контактная информация:</strong><br />\n<strong>e-mail:&nbsp;d.kiselyov@ukravto.ua;</strong><br />\n<strong>тел.&nbsp;206-82-07</strong></p>', 'Корпорация&nbsp;УкрАВТО&nbsp;-&nbsp;надежный, проверенным временем&nbsp;партнер&nbsp;многих бизнес-структур и государственных организаций.&nbsp;\n\nСегодня&nbsp;уже более 10&nbsp;000 компаний&nbsp;стали&nbsp;клиентами&nbsp;УкрАВТО.&nbsp;\n\nКаждый&nbsp;корпоративный&nbsp;клиент&nbsp;УкрАВТО получает множество&nbsp;преимуществ&nbsp;\n\nи&nbsp;может&nbsp;оценить&nbsp;высокое качество обслуживания.\n\nДля&nbsp;корпоративных клиентов&nbsp;мы&nbsp;предлагаем:\n\n\n\n\n\n	Полный спектр услуг, от установки дополнительного оборудования до самых сложных восстановительных ремонтов.\n	Современное оборудование и квалифицированный персонал.\n	Высококачественное обслуживание на сертифицированных сервисных центрах по всей территории Украины..\n	Гарантия на все виды работ, согласно законодательства Украины.\n	Поддержка гарантии на весь спектр моделей, представленных Корпорацией &laquo;УкрАвто&raquo;.\n	Скидки на услуги и запасные части в зависимости от размера обслуживаемого автопарка.\n	Отсрочка платежа.\n	Круглосуточная поддержка.\n	Ежемесячная отчетность в разрезе областей и регионов по выполненным работам консолидировано по всей территории Украины.\n	Все предприятия Корпорации &laquo;УкрАвто&raquo; являются плательщиками налога на прибыль на общих основаниях и предоставляют полный пакет документов, согласно законодательства Украины.\n\n\nНаши специалисты,&nbsp;которые&nbsp;работают&nbsp;во всех регионах Украины,&nbsp;окажут Вам квалифицированную&nbsp;консультацию,&nbsp;а&nbsp;также&nbsp;помогут&nbsp;при&nbsp;решении всех вопросов&nbsp;в&nbsp;процессе эксплуатации.\n\nКонтактная информация:\ne-mail:&nbsp;d.kiselyov@ukravto.ua;\nтел.&nbsp;206-82-07\n', 'Андрей', 'Корпоративным клиентам', 'Корпоративным клиентам', 'Корпоративным клиентам'),
(42, 14, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(43, 15, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(44, 15, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(45, 15, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(46, 16, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(47, 16, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(48, 16, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(49, 17, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(50, 17, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(51, 17, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(52, 18, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(53, 18, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(54, 18, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(55, 19, 1, 'New title title', '<p>New description New description New description</p>', 'New description New description New description\n', 'Author', 'New description New description New description', 'New description New description New descriptionNew description New description New description', 'New description New description New descriptionNew description New description New descriptionNew description New description New description'),
(56, 19, 2, 'New title title', '<p>New description New description New description</p>', 'New description New description New description\n', 'Author', 'New description New description New description', 'New description New description New descriptionNew description New description New description', 'New description New description New descriptionNew description New description New descriptionNew description New description New description'),
(57, 19, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(58, 20, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(59, 20, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(60, 20, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(61, 21, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(62, 21, 2, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(63, 21, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `tab_languages`
--

CREATE TABLE IF NOT EXISTS `tab_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tab_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `tab_languages`
--

INSERT INTO `tab_languages` (`id`, `tab_id`, `language_id`, `name`) VALUES
(1, 1, 2, 'Разметка'),
(2, 2, 2, 'Административная область'),
(3, 3, 2, 'Товары'),
(4, 4, 2, 'Служебные пункты'),
(5, 5, 2, 'Разметка страницы'),
(6, 6, 2, 'Конструктор'),
(7, 7, 2, 'Мини-блоки'),
(8, 8, 2, 'Блоки с товарами'),
(9, 9, 2, 'Страницы'),
(10, 10, 2, 'Меню'),
(11, 11, 2, 'Пользователи'),
(12, 12, 2, 'Категории'),
(13, 13, 2, 'Производители'),
(14, 14, 2, 'Еденицы измерения'),
(15, 15, 2, 'Продукты'),
(16, 16, 2, 'Сео главной страницы'),
(17, 17, 2, 'Группы пользователей'),
(18, 18, 2, 'Типы компонентов'),
(19, 19, 2, 'Управление языками');

-- --------------------------------------------------------

--
-- Структура таблицы `tabs`
--

CREATE TABLE IF NOT EXISTS `tabs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `position` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- Дамп данных таблицы `tabs`
--

INSERT INTO `tabs` (`id`, `name`, `position`, `parent_id`, `url`) VALUES
(1, 'layout', 1, 0, ''),
(2, 'admin_area', 2, 0, ''),
(3, 'goods', 3, 0, ''),
(4, 'service', 4, 0, ''),
(5, 'marking', 1, 1, 'admin/marking'),
(6, 'placeholders', 2, 1, 'admin/placeholders'),
(7, 'mini_blocks', 3, 1, 'admin/mini_blocks'),
(8, 'product_blocks', 4, 1, 'admin/product_blocks'),
(9, 'pages', 1, 2, 'admin/pages'),
(10, 'menu', 2, 2, 'admin/menu'),
(11, 'users', 3, 2, 'admin/users'),
(12, 'categories', 1, 3, 'admin/categories'),
(13, 'producers', 2, 3, 'admin/producers'),
(14, 'units', 3, 3, 'admin/units'),
(15, 'products', 4, 3, 'admin/products'),
(16, 'seo', 1, 4, 'admin/seo'),
(17, 'groups', 4, 2, 'admin/groups'),
(18, 'component_types', 2, 2, 'admin/component_types'),
(19, 'languages', 6, 2, 'admin/languages');

-- --------------------------------------------------------

--
-- Структура таблицы `unit_languages`
--

CREATE TABLE IF NOT EXISTS `unit_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `short_name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `unit_languages`
--

INSERT INTO `unit_languages` (`id`, `unit_id`, `language_id`, `name`, `short_name`, `description`) VALUES
(1, 1, 2, 'Штука', 'шт.', 'Штучная еденица измерения'),
(2, 3, 2, 'Килограмм', 'кг.', 'Еденица измерения веса');

-- --------------------------------------------------------

--
-- Структура таблицы `units`
--

CREATE TABLE IF NOT EXISTS `units` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` int(3) NOT NULL,
  `date` varchar(19) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `units`
--

INSERT INTO `units` (`id`, `position`, `date`) VALUES
(1, 1, '22-05-2013 14:35:00'),
(3, 2, '22-05-2013 14:33:26');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` int(10) unsigned NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(40) NOT NULL,
  `salt` varchar(40) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `activation_code` varchar(40) DEFAULT NULL,
  `forgotten_password_code` varchar(40) DEFAULT NULL,
  `remember_code` varchar(40) DEFAULT NULL,
  `created_on` int(11) unsigned NOT NULL,
  `last_login` int(11) unsigned DEFAULT NULL,
  `active` tinyint(1) unsigned DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `ip_address`, `username`, `password`, `salt`, `email`, `activation_code`, `forgotten_password_code`, `remember_code`, `created_on`, `last_login`, `active`, `first_name`, `last_name`, `company`, `phone`) VALUES
(1, 2130706433, 'admin', 'dbb91d5682604c3ce58547d75f5914fd41b64c42', '9462e8eee0', 'arsenal@arsenal.com', '', NULL, '48e1f06457136792a4051317fdf11b2b001e7879', 1268889823, 1376464319, 1, 'Admin', 'Admin', 'ADMIN', '063 851 55 73'),
(9, 0, 'andrew', '6de454716f60dc7b7e8674e3376260035eed6b6d', 'ee849137bd', 'andrew@gmail.com', '5398db33c755f957b51289265b2ff502c7602beb', NULL, '065dd87bc6b358efa3e86902e5512431d02c894d', 1370013587, 1372933605, 1, 'Андрей', 'Сигида', NULL, '+38 063 851 55 73');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
