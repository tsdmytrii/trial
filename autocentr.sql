-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Мар 24 2013 г., 10:47
-- Версия сервера: 5.5.28
-- Версия PHP: 5.4.6-1ubuntu1.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `autocentr`
--

-- --------------------------------------------------------

--
-- Структура таблицы `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `articles`
--

INSERT INTO `articles` (`id`, `component_id`) VALUES
(1, 3),
(2, 7),
(3, 8),
(5, 14);

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `article_behaviors`
--

INSERT INTO `article_behaviors` (`id`, `article_id`, `mini_block_id`, `quantity`) VALUES
(1, 3, 1, 1),
(2, 2, 2, 1);

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

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
(7, 5, '2013-03-06', '17:00', 1, 0, 'articleitem/');

-- --------------------------------------------------------

--
-- Структура таблицы `article_items_links`
--

CREATE TABLE IF NOT EXISTS `article_items_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_item_id` int(11) NOT NULL,
  `link_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `article_items_links`
--

INSERT INTO `article_items_links` (`id`, `article_item_id`, `link_id`) VALUES
(2, 2, 6),
(3, 3, 7),
(5, 4, 9),
(10, 5, 14),
(7, 6, 11),
(9, 7, 13);

-- --------------------------------------------------------

--
-- Структура таблицы `article_item_images`
--

CREATE TABLE IF NOT EXISTS `article_item_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_item_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

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
(7, 7, 2, 'Андрей', 'Супер акция', '<p>Не пропустите две машини по цене одной!!! Не пропустите две машини по цене одной!!! Не пропустите две машини по цене одной!!!</p>', 'Не пропустите две машини по цене одной!!! Не пропустите две машини по цене одной!!! Не пропустите две машини по цене одной!!!\n', '', '', '');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `article_languages`
--

INSERT INTO `article_languages` (`id`, `article_id`, `language_id`, `description`, `description_btm`, `description_search`, `seo_title`, `key_words`, `seo_description`) VALUES
(1, 2, 2, '<p>Рихтовка автомобиля - это один из сложных, трудоёмких и дорогостоящих процессов ремонта автомобиля. Повреждения бывают лёгкие и сложные.<br />\n<br />\nВ лёгких повреждениях это вмятины, изгибы, порывы и другие повреждения на одной детали кузова и места их крепления (сварка, винтовое соединение) не повреждены. В таком случае рихтуется или меняется только одна деталь и не требует дополнительной разборки и подгонки детали. Деталь не разбирается от навесных компонентов (ручки, молдинги, поворотник', '<p>Кузовной ремонт - это устранение самых разнообразных дефектов кузова автомобиля. В кузовном ремонте, прежде всего сложный и трудоёмкий процесс это восстановления геометрии кузова. Геометрия кузова выполняется на стапеле.Кузовной ремонт выполняется с соблюдением требований и рекомендаций завода изготовителя.<br />\n<br />\nВ сложных повреждениях, где повреждены не только отдельная деталь, а много деталей и посадочные места и крепления повреждены или разрушены их сложно выставлять и подгонять друг к другу. Повреждённые детали по необходимости демонтируются (срезаются, отвинчиваются), разбираются, снимаются навесные детали (ручки, молдинги и другие встроенные механизмы, обшивка). Автомобиль закрепляется на массивной раме стапеля, четырьмя крепежами за пороги автомобиля и с помощью гидравлики вытягиваются все повреждённые места в определённой очерёдности используя специальные зажимы, зацепы, растяжки. При искривлениях геометрии кузова используется измерительная система, с помощью которой производятся замеры габаритов и расположения деталей кузова. И выставляются все восстановленные детали кузова по точному размеру избегая перекосом и неровностей.</p>', 'Рихтовка автомобиля - это один из сложных, трудоёмких и дорогостоящих процессов ремонта автомобиля. Повреждения бывают лёгкие и сложные.\n\nВ лёгких повреждениях это вмятины, изгибы, порывы и другие повреждения на одной детали кузова и места их крепления (сварка, винтовое соединение) не повреждены. В таком случае рихтуется или меняется только одна деталь и не требует дополнительной разборки и подгонки детали. Деталь не разбирается от навесных компонентов (ручки, молдинги, поворотник\n Кузовной ремонт - это устранение самых разнообразных дефектов кузова автомобиля. В кузовном ремонте, прежде всего сложный и трудоёмкий процесс это восстановления геометрии кузова. Геометрия кузова выполняется на стапеле.Кузовной ремонт выполняется с соблюдением требований и рекомендаций завода изготовителя.\n\nВ сложных повреждениях, где повреждены не только отдельная деталь, а много деталей и посадочные места и крепления повреждены или разрушены их сложно выставлять и подгонять друг к другу. Повреждённые детали по необходимости демонтируются (срезаются, отвинчиваются), разбираются, снимаются навесные детали (ручки, молдинги и другие встроенные механизмы, обшивка). Автомобиль закрепляется на массивной раме стапеля, четырьмя крепежами за пороги автомобиля и с помощью гидравлики вытягиваются все повреждённые места в определённой очерёдности используя специальные зажимы, зацепы, растяжки. При искривлениях геометрии кузова используется измерительная система, с помощью которой производятся замеры габаритов и расположения деталей кузова. И выставляются все восстановленные детали кузова по точному размеру избегая перекосом и неровностей.\n', 'Кузовной ремонт сео', 'ключевые слова кузовной ремонт', 'Короткое описание кузовного ремонта'),
(4, 5, 2, '<p>Акции нашей компании. Акции нашей компании.</p>', '<p>Акции нашей компании. Акции нашей компании.</p>', 'Акции нашей компании. Акции нашей компании.\n Акции нашей компании. Акции нашей компании.\n', 'Акции нашей компании.', 'Акции нашей компании.Акции нашей компании.', 'Акции нашей компании.Акции нашей компании.Акции нашей компании.Акции нашей компании.'),
(2, 3, 2, '<p>Уважаемые клиенты!</p>\n\n<p>Приобретение автомобиля для каждого из нас является если не значительным, то обязательно приятным и радостным событием. И, конечно, нам хочется, чтобы все было максимально комфортно и быстро. Поэтому мы постарались сделать в нашем автосалоне возможными все сопутствующие услуги, в которых у клиента может появиться необходимость при покупке авто. Без сомнения, приоритетными в данном случае являются финансовые услуги, а именно:</p>', '<p>При предоставлении данных улуг мы сотрудничаем с самыми надежными и профессиональными компаниями, с помощью которых мы имеем возможность предложить наиболее выгодные и удобные условия для наших клиентов.</p>\n\n<p>В данном разделе Вы можете найти всю информацию, которая Вас интересует по вопросам покупки автомобиля в кредит, в лизинг либострахованию авто. А если данная информация оказалась для Вас не исчерпывающей либо Вы уже выбрали наиболее подходящий для себя вариант той или иной услуги, с радостью проконсультируем Вас по телефонам 207-07-05 .</p>\n\n<p>С уважением, компания &quot;Автоцентр на Московском&quot;.</p>', 'Уважаемые клиенты!\n\nПриобретение автомобиля для каждого из нас является если не значительным, то обязательно приятным и радостным событием. И, конечно, нам хочется, чтобы все было максимально комфортно и быстро. Поэтому мы постарались сделать в нашем автосалоне возможными все сопутствующие услуги, в которых у клиента может появиться необходимость при покупке авто. Без сомнения, приоритетными в данном случае являются финансовые услуги, а именно:\n При предоставлении данных улуг мы сотрудничаем с самыми надежными и профессиональными компаниями, с помощью которых мы имеем возможность предложить наиболее выгодные и удобные условия для наших клиентов.\n\nВ данном разделе Вы можете найти всю информацию, которая Вас интересует по вопросам покупки автомобиля в кредит, в лизинг либострахованию авто. А если данная информация оказалась для Вас не исчерпывающей либо Вы уже выбрали наиболее подходящий для себя вариант той или иной услуги, с радостью проконсультируем Вас по телефонам 207-07-05 .\n\nС уважением, компания &quot;Автоцентр на Московском&quot;.\n', 'Финансовые услуги сео заголовок', 'Ключевые слова по сео заголовку', 'Описание странички с финансовыми услугами');

-- --------------------------------------------------------

--
-- Структура таблицы `autobrends`
--

CREATE TABLE IF NOT EXISTS `autobrends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(18) NOT NULL,
  `price` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `autobrends`
--

INSERT INTO `autobrends` (`id`, `date`, `price`) VALUES
(3, '05-03-2013 15:48:4', '120 000'),
(4, '05-03-2013 16:41:0', '340 400'),
(5, '04-03-2013 21:50:0', ''),
(6, '04-03-2013 21:54:1', '');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

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
(17, 6, 2, 'Amulet', '<p>Chery Automobile&nbsp;&mdash; <a href="http://ru.wikipedia.org/wiki/%D0%9A%D0%B8%D1%82%D0%B0%D0%B9" title="Китай">китайская</a> автомобилестроительная компания. Основана в <a href="http://ru.wikipedia.org/wiki/1997_%D0%B3%D0%BE%D0%B4" title="1997 год">1997 году</a>.</p>\n\n<p>Chery (в переводе с китайского это нечто вроде &laquo;особого благословения&raquo;) была основана в 1997 году по инициативе мэрии города <a href="http://ru.wikipedia.org/wiki/%D0%A3%D1%85%D1%83" title="Уху">Уху</a> (Wuhu) в провинции <a href="http://ru.wikipedia.org/wiki/%D0%90%D0%BD%D1%8C%D1%85%D0%BE%D0%B9" title="Аньхой">Аньхой</a>. Акционерами компании стало несколько государственных компаний и холдингов провинции <a href="http://ru.wikipedia.org/wiki/%D0%90%D0%BD%D1%8C%D1%85%D0%BE%D0%B9" title="Аньхой">Аньхой</a>, а также мелкие инвесторы. Было приобретено оборудование европейского завода <a href="http://ru.wikipedia.org/wiki/Ford" title="Ford">Ford</a> за $25&nbsp;млн. Производство <a href="http://ru.wikipedia.org/wiki/%D0%9B%D0%B5%D0%B3%D0%BA%D0%BE%D0%B2%D0%BE%D0%B9_%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C" title="Легковой автомобиль">автомобилей</a> началось в <a href="http://ru.wikipedia.org/wiki/1999_%D0%B3%D0%BE%D0%B4" title="1999 год">1999 году</a> после приобретения лицензии на шасси Toledo компании <a href="http://ru.wikipedia.org/wiki/Seat" title="Seat">Seat</a>.</p>', ' Chery Automobile&nbsp;&mdash; китайская автомобилестроительная компания. Основана в 1997 году.\n\nChery (в переводе с китайского это нечто вроде &laquo;особого благословения&raquo;) была основана в 1997 году по инициативе мэрии города Уху (Wuhu) в провинции Аньхой. Акционерами компании стало несколько государственных компаний и холдингов провинции Аньхой, а также мелкие инвесторы. Было приобретено оборудование европейского завода Ford за $25&nbsp;млн. Производство автомобилей началось в 1999 году после приобретения лицензии на шасси Toledo компании Seat.\n', '', '', 'Сео заголовок Amulet', 'Ключевые слова для Amulet', 'Наше описание для поисковых ботов Amulet'),
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
(14, 3, 'a0d60c42ffd9081cee6a7157c2aa848ebd61fb8f.jpg'),
(15, 3, '4e4a38208c58cb5ab2941dd2f9e129741530d933.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `automodels`
--

CREATE TABLE IF NOT EXISTS `automodels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autobrend_id` int(11) NOT NULL,
  `price` varchar(20) NOT NULL,
  `date` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `automodels`
--

INSERT INTO `automodels` (`id`, `autobrend_id`, `price`, `date`) VALUES
(12, 3, '80 000', '15-03-2013 15:44:53'),
(13, 4, '360 000', '05-03-2013 18:19:47'),
(14, 5, '150 000', '05-03-2013 18:20:49'),
(15, 6, '200 000', '05-03-2013 18:21:27');

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
  `seo_title` varchar(200) NOT NULL,
  `key_words` varchar(500) NOT NULL,
  `seo_description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `automodel_languages`
--

INSERT INTO `automodel_languages` (`id`, `automodel_id`, `language_id`, `name`, `description`, `seo_title`, `key_words`, `seo_description`) VALUES
(1, 12, 2, 'запорожец', '<p>Супер кар))))))))))))))))))))))))))))))))</p>\n\n<p>Автомоби́ль (от др.-греч. &alpha;ὐ&tau;&omicron; &mdash; сам и лат. mobilis &mdash; движущийся), автомаши́на, автотранспортное средство, , в совокупности автотехника, автотранспорт &mdash; моторное безрельсовое дорожное транспортное средство минимум с 4 колёсами. Термин включает легковой автомобиль, грузовой автомобиль, автобус, троллейбус, бронетранспортёр, но не включает сельскохозяйственный трактор и мотоцикл. Точного перевода на английский язык нет; рекомендуется использовать слово automobile, хотя оно в английском обычно обозначает легковой автомобиль.<br />\nМеханическое транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов. Этот термин охватывает троллейбусы, то есть нерельсовые транспортные средства, соединённые с электрическим проводом; он не охватывает такие транспортные средства, как сельскохозяйственные тракторы, использование которых для перевозки людей или грузов является лишь вспомогательной функцией.<br />\n&mdash; Ст. 1, Конвенция о дорожном движении (Вена, 8 ноября 1968 года)<br />\nЛюбое механическое самоходное транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов; этот термин не включает сельскохозяйственные тракторы.<br />\n&mdash; Ст. 1, Европейское соглашение, касающееся работы экипажей транспортных средств, производящих международные автомобильные перевозки (ЕСТР) Женева, 1 июля 1970 года<br />\nНаземное транспортное средство, продвигаемое его собственными средствами, движущееся по крайней мере на четырёх колесах, не находящихся на одной линии, которые должны всегда быть в контакте с землей; управление должно быть обеспечено по крайней мере двумя из колес, и движение &mdash; по крайней мере двумя из колес.<br />\n&mdash; Международный спортивный кодекс ФИА, ст. 13</p>', 'Запорожец сео заголовок', 'Запорожец, суперкар.', 'Описание запорожца'),
(2, 13, 2, 'camaro', '<p>la;kf j;asldfkj ;aslf jal;sf ja;sdfj as;df jpowqi ;kvn lask</p>', '', '', ''),
(3, 14, 2, 'astra', '<p>asdf asdf asdf asdf asdf asf asd asdf asdf asdf asdf</p>', '', '', ''),
(4, 14, 2, 'astra', '<p>asdf asdf asdf asdf asdf asf asd asdf asdf asdf asdf</p>', '', '', ''),
(5, 15, 2, 'cherry', '<p>cherry amulet new car for you and me)</p>', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `automodel_logoes`
--

CREATE TABLE IF NOT EXISTS `automodel_logoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `automodel_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Дамп данных таблицы `automodel_logoes`
--

INSERT INTO `automodel_logoes` (`id`, `automodel_id`, `name`) VALUES
(14, 12, 'a230db3b1fe0a4948dcd329f287c4b97e85def7b.jpg'),
(15, 13, 'a38300c617340eef63ed9dffd0ff9f22f96e40f2.jpg'),
(16, 14, '1f26ea86798ded7ed97d0aa7f61629fabd9eb451.jpg'),
(17, 15, '1b2664c6cc6b749c0f2f55bd9659703bcbbd6d92.jpg');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=40 ;

--
-- Дамп данных таблицы `automodel_photoes`
--

INSERT INTO `automodel_photoes` (`id`, `automodel_id`, `name`, `name_mini`) VALUES
(35, 12, '5df1182955e32c81aa8d0b2e45078c508c100be9.jpg', '5df1182955e32c81aa8d0b2e45078c508c100be9_m.jpg'),
(34, 12, '812e82e1ccae0a6c84aff859a0794999394b65a4.jpg', '812e82e1ccae0a6c84aff859a0794999394b65a4_m.jpg'),
(32, 12, '58700e48491d55b5be9805392dac2fa2942382bf.png', '58700e48491d55b5be9805392dac2fa2942382bf_m.png'),
(36, 12, 'f0117c0f739934a03b3388f9f2ef8ca9cb30c8e0.jpg', 'f0117c0f739934a03b3388f9f2ef8ca9cb30c8e0_m.jpg'),
(37, 12, 'd7f9c23165e7dda3e042f4066dbd9c0183883252.jpg', 'd7f9c23165e7dda3e042f4066dbd9c0183883252_m.jpg'),
(39, 12, 'afc959847b8adab2790dd68e1ebcce4a09d1ab6d.jpg', 'afc959847b8adab2790dd68e1ebcce4a09d1ab6d_m.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `characteristics`
--

CREATE TABLE IF NOT EXISTS `characteristics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `automodel_id` int(11) NOT NULL,
  `type_id` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

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
(15, 12, 1);

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

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
(14, 17, 2, 'Диски', '<p>Диск (от <a href="http://ru.wikipedia.org/wiki/%D0%93%D1%80%D0%B5%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9_%D1%8F%D0%B7%D1%8B%D0%BA" title="Греческий язык">греч.</a> &delta;ί&sigma;&kappa;&omicron;&sigmaf;(Дискос)&nbsp;&mdash; &laquo;круглое блюдо&raquo;)&nbsp;&mdash; <a href="http://ru.wikipedia.org/wiki/%D0%9A%D1%80%D1%83%D0%B3" title="Круг">круг</a> (низкий <a href="http://ru.wikipedia.org/wiki/%D0%A6%D0%B8%D0%BB%D0%B8%D0%BD%D0%B4%D1%80" title="Цилиндр">цилиндр</a>) или предмет в виде круга.</p>\n\n<div>В <a href="http://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C" title="Викисловарь">Викисловаре</a> есть статья&laquo;<a href="http://ru.wiktionary.org/wiki/%D0%B4%D0%B8%D1%81%D0%BA" title="wikt:диск">диск</a>&raquo;</div>');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `complectations`
--

INSERT INTO `complectations` (`id`, `automodel_id`, `year`, `price`, `position`, `date`) VALUES
(8, 12, '2012', '100 000', 1, '07-03-2013 16:15:45'),
(9, 12, '2013', '120 000', 2, '07-03-2013 16:17:53'),
(10, 12, '2012', '150 000', 4, '07-03-2013 16:20:03'),
(11, 12, '2012', '152 000', 3, '07-03-2013 16:20:36');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `complectation_languages`
--

INSERT INTO `complectation_languages` (`id`, `complectation_id`, `language_id`, `name`, `description`) VALUES
(11, 11, 2, '3 complectation', '<p>asdfasdf qwefpshv ajsd qwioeu asnczbxouy h,dbazvpuhaf</p>'),
(8, 8, 2, '1 complectation', '<p>asdfasdf asdf asdf asd asdf asdf asdf</p>'),
(9, 9, 2, '2 complectation', '<p>asdfas dfaslk asldkfhj aslkfh jaskldfh jaskldfh askldfh jasdf asdf asfda</p>'),
(10, 10, 2, '4 complectation', '<p>as;dfkj as;dklfja;sldf a;skldf al;sf jal;sdf jasdl;f jasdfpqwk fznilhuqwjamchghwqiouje mfsdhv</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `complectation_logoes`
--

CREATE TABLE IF NOT EXISTS `complectation_logoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `complectation_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

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
(17, 1, 4, 'Дополнительная информация', '2013-03-12 18:54:44'),
(24, 26, 0, 'Автомобили', '2013-03-18 19:19:19');

-- --------------------------------------------------------

--
-- Структура таблицы `component_types`
--

CREATE TABLE IF NOT EXISTS `component_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `psevdo_name` varchar(100) NOT NULL,
  `display` tinyint(1) NOT NULL,
  `library` varchar(100) NOT NULL,
  `admin_server_controller` varchar(100) NOT NULL,
  `admin_client_controller` varchar(100) NOT NULL,
  `client_controller` varchar(100) NOT NULL,
  `server_controller` varchar(100) NOT NULL,
  `button_panel` tinyint(1) NOT NULL,
  `settings` tinyint(1) NOT NULL,
  `minimise` tinyint(1) NOT NULL,
  `maximise` tinyint(1) NOT NULL,
  `multi` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- Дамп данных таблицы `component_types`
--

INSERT INTO `component_types` (`id`, `name`, `psevdo_name`, `display`, `library`, `admin_server_controller`, `admin_client_controller`, `client_controller`, `server_controller`, `button_panel`, `settings`, `minimise`, `maximise`, `multi`) VALUES
(7, 'article', 'Статьи', 1, 'Article', 'admin/article_controller', 'components/admin/article', 'components/user/article', 'user_controller/get_all_article', 1, 0, 1, 1, 1),
(13, 'articleitem', 'Статьи', 0, 'Article', 'admin/article_controller', 'components/admin/article', 'components/user/article', 'user_controller/get_article', 1, 0, 1, 1, 1),
(1, 'staticcomp', 'Статика', 1, 'Static_component', 'admin/static_component_controller', 'components/admin/static', 'components/user/static', 'user_controller/get_static_component', 1, 0, 1, 1, 1),
(26, 'automodels', 'Автомобили', 1, 'Automodel', 'admin/automodel_controller', 'components/admin/automodel', 'components/user/automodels', 'user/automodel_controller/get_automodels', 1, 0, 1, 0, 0),
(27, 'mini_block', 'Мини-блоки', 0, 'Mini_block', 'admin/mini_block_controller', 'components/admin/mini_block', '-', '-', 1, 0, 0, 0, 0),
(25, 'autobrend', 'Автобренды', 1, 'Autobrend', 'admin/autobrend_controller', 'components/admin/autobrend', 'components/user/autobrend', 'autobrend_controller/get_autobrend', 1, 0, 1, 1, 1),
(23, 'menu_item', 'Пункты меню', 0, 'Menu_item', 'admin/menu_item_controller', 'components/admin/menu_item', 'components/user/menu_item', 'user_controller/get_menu_item', 1, 0, 1, 1, 1),
(24, 'pages', 'Страницы', 0, 'Components', 'admin/pages_controller', 'components/admin/pages', 'components/user/pages', 'user_controller/get_pages', 1, 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`) VALUES
(1, 'admin', 'Administrator'),
(2, 'members', 'General User');

-- --------------------------------------------------------

--
-- Структура таблицы `languages`
--

CREATE TABLE IF NOT EXISTS `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `iso_code` varchar(3) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `languages`
--

INSERT INTO `languages` (`id`, `name`, `iso_code`) VALUES
(1, 'Engilsh', 'en'),
(2, 'Русский', 'ru'),
(3, 'Українська', 'ua');

-- --------------------------------------------------------

--
-- Структура таблицы `links`
--

CREATE TABLE IF NOT EXISTS `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(1000) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `server_method` varchar(1000) NOT NULL,
  `main` int(1) NOT NULL,
  `language_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Дамп данных таблицы `links`
--

INSERT INTO `links` (`id`, `link`, `url`, `server_method`, `main`, `language_id`) VALUES
(3, 'servis_i_garantija', 'staticcomp/3/3/0/2', 'user_controller/get_static_component/3/3/0/2', 0, 2),
(4, 'kuzovnoj_remont', 'article/2/4/1/2', 'user_controller/get_all_article/2/4/1/2', 1, 2),
(5, 'finansovye_uslugi', 'article/3/5/0/2', 'user_controller/get_all_article/3/5/0/2', 0, 2),
(6, 'rihtovka', 'articleitem/2/0/0/2', 'user_controller/get_article/2/0/0/2', 0, 2),
(7, 'zamena', 'articleitem/3/0/0/2', 'user_controller/get_article/3/0/0/2', 0, 2),
(9, 'kredit', 'articleitem/4/0/0/2', 'user_controller/get_article/4/0/0/2', 0, 2),
(14, 'strahovanie', 'articleitem/5/5/0/2', 'user_controller/get_article/5/5/0/2', 0, 2),
(11, 'lizing', 'articleitem/6/0/0/2', 'user_controller/get_article/6/0/0/2', 0, 2),
(13, 'super_aktsija', 'articleitem/7/1/0/2', 'user_controller/get_article/7/1/0/2', 0, 2),
(20, 'avtomobili', 'automodels/0/9/1/2', 'user/automodel_controller/get_automodels/0/9/1/2', 1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `links_menu_items`
--

CREATE TABLE IF NOT EXISTS `links_menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `links_menu_items`
--

INSERT INTO `links_menu_items` (`id`, `link_id`, `menu_item_id`) VALUES
(7, 17, 8),
(2, 3, 3),
(3, 4, 4),
(4, 5, 5),
(10, 20, 9);

-- --------------------------------------------------------

--
-- Структура таблицы `menu_blocks`
--

CREATE TABLE IF NOT EXISTS `menu_blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `menu_blocks`
--

INSERT INTO `menu_blocks` (`id`, `name`, `position`) VALUES
(1, 'Главное меню', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `menu_blocks_menu_items`
--

CREATE TABLE IF NOT EXISTS `menu_blocks_menu_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_block_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `menu_blocks_menu_items`
--

INSERT INTO `menu_blocks_menu_items` (`id`, `menu_block_id`, `menu_item_id`) VALUES
(8, 1, 9),
(2, 1, 3),
(3, 1, 4),
(4, 1, 5);

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
  `href` varchar(150) NOT NULL,
  `default_item` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `menu_items`
--

INSERT INTO `menu_items` (`id`, `parent_id`, `component_id`, `window`, `main`, `position`, `href`, `default_item`) VALUES
(9, 0, 24, 0, 1, 1, 'automodels/0', 1),
(3, 0, 6, 1, 0, 2, 'staticcomp/3', 1),
(4, 0, 7, 0, 1, 3, 'article/2', 1),
(5, 0, 8, 1, 0, 4, 'article/3', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `menu_item_languages`
--

CREATE TABLE IF NOT EXISTS `menu_item_languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_item_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `value` varchar(100) NOT NULL,
  `display` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Дамп данных таблицы `menu_item_languages`
--

INSERT INTO `menu_item_languages` (`id`, `menu_item_id`, `language_id`, `value`, `display`) VALUES
(14, 9, 2, 'Автомобили', 0),
(2, 3, 2, 'Сервис и гарантия', 0),
(3, 4, 2, 'Кузовной ремонт', 0),
(4, 5, 2, 'Финансовые услуги', 0);

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
-- Структура таблицы `mini_blocks`
--

CREATE TABLE IF NOT EXISTS `mini_blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` int(11) NOT NULL,
  `component_id` int(11) NOT NULL,
  `img` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `mini_blocks`
--

INSERT INTO `mini_blocks` (`id`, `position`, `component_id`, `img`) VALUES
(1, 1, 8, 1),
(2, 2, 7, 1),
(5, 4, 17, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `mini_block_images`
--

CREATE TABLE IF NOT EXISTS `mini_block_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mini_block_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `mini_block_images`
--

INSERT INTO `mini_block_images` (`id`, `mini_block_id`, `name`) VALUES
(9, 1, '85e84d9da757b8b1e68a51114f39d2a580592bef.png'),
(7, 2, '280ed8005549f81dd3a2574ff2cce936445a106b.png'),
(8, 0, '11a60ae0f0f2b099b6809c9389fc443ecddd08f1.png');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `mini_block_languages`
--

INSERT INTO `mini_block_languages` (`id`, `language_id`, `mini_block_id`, `name`, `button_name`) VALUES
(1, 2, 1, 'Первый новостной блок', 'Все фин. услуги'),
(2, 2, 2, 'Второй новостной блок', 'Кузовной ремонт'),
(5, 2, 5, 'Текстовый блочок', 'Название из заголовка'),
(6, 2, 5, 'Текстовый блочок', 'Название из заголовка'),
(7, 2, 5, 'Текстовый блочок', 'Название из заголовка'),
(8, 2, 5, 'Текстовый блочок', 'Название из заголовка'),
(11, 2, 1, 'Первый новостной блок', 'Все фин. услуги'),
(12, 2, 1, 'Первый новостной блок', 'Все фин. услуги'),
(13, 2, 1, 'Первый новостной блок', 'Все фин. услуги'),
(14, 2, 2, 'Второй новостной блок', 'Кузовной ремонт');

-- --------------------------------------------------------

--
-- Структура таблицы `static_components`
--

CREATE TABLE IF NOT EXISTS `static_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `static_components`
--

INSERT INTO `static_components` (`id`, `date`) VALUES
(4, '12-03-2013'),
(2, '04-03-2013'),
(3, '04-03-2013');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Дамп данных таблицы `static_components_languages`
--

INSERT INTO `static_components_languages` (`id`, `static_component_id`, `language_id`, `title`, `description`, `description_search`, `author`, `seo_title`, `key_words`, `seo_description`) VALUES
(12, 4, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(11, 4, 2, 'Дополнительная информация', '<p>этот символ U<strong>nicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности ht</strong>ml код ему не н<strike>ужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html к</strike>од ему не нужен. И<em>щи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. </em></p>\n\n<h1 style="color:#AD2118;"><em>Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбрау</em>зерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре.</h1>', 'этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. Поэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре. этот символ Unicode появился недавно и еще не включен во все шрифты. \n\nПоэтому при верстке этот символ нужно внимательно тестировать (и на кроссбраузерность тоже) из-за своей популярности html код ему не нужен. Ищи символ на своей клавиатуре.\n', 'Андрей', '', '', ''),
(10, 4, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(4, 2, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(5, 2, 2, 'Автомобили', '<p>Автомоби́ль (от др.-греч. &alpha;ὐ&tau;&omicron; &mdash; сам и лат. mobilis &mdash; движущийся), автомаши́на, автотранспортное средство, , в совокупности автотехника, автотранспорт &mdash; моторное безрельсовое дорожное транспортное средство минимум с 4 колёсами. Термин включает легковой автомобиль, грузовой автомобиль, автобус, троллейбус, бронетранспортёр, но не включает сельскохозяйственный трактор и мотоцикл. Точного перевода на английский язык нет; рекомендуется использовать слово automobile, хотя оно в английском обычно обозначает легковой автомобиль.<br />\nМеханическое транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов. Этот термин охватывает троллейбусы, то есть нерельсовые транспортные средства, соединённые с электрическим проводом; он не охватывает такие транспортные средства, как сельскохозяйственные тракторы, использование которых для перевозки людей или грузов является лишь вспомогательной функцией.<br />\n&mdash; Ст. 1, Конвенция о дорожном движении (Вена, 8 ноября 1968 года)<br />\nЛюбое механическое самоходное транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов; этот термин не включает сельскохозяйственные тракторы.<br />\n&mdash; Ст. 1, Европейское соглашение, касающееся работы экипажей транспортных средств, производящих международные автомобильные перевозки (ЕСТР) Женева, 1 июля 1970 года<br />\nНаземное транспортное средство, продвигаемое его собственными средствами, движущееся по крайней мере на четырёх колесах, не находящихся на одной линии, которые должны всегда быть в контакте с землей; управление должно быть обеспечено по крайней мере двумя из колес, и движение &mdash; по крайней мере двумя из колес.<br />\n&mdash; Международный спортивный кодекс ФИА, ст. 13</p>', 'Автомоби́ль (от др.-греч. &alpha;ὐ&tau;&omicron; &mdash; сам и лат. mobilis &mdash; движущийся), автомаши́на, автотранспортное средство, , в совокупности автотехника, автотранспорт &mdash; моторное безрельсовое дорожное транспортное средство минимум с 4 колёсами. Термин включает легковой автомобиль, грузовой автомобиль, автобус, троллейбус, бронетранспортёр, но не включает сельскохозяйственный трактор и мотоцикл. Точного перевода на английский язык нет; рекомендуется использовать слово automobile, хотя оно в английском обычно обозначает легковой автомобиль.\nМеханическое транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов. Этот термин охватывает троллейбусы, то есть нерельсовые транспортные средства, соединённые с электрическим проводом; он не охватывает такие транспортные средства, как сельскохозяйственные тракторы, использование которых для перевозки людей или грузов является лишь вспомогательной функцией.\n&mdash; Ст. 1, Конвенция о дорожном движении (Вена, 8 ноября 1968 года)\nЛюбое механическое самоходное транспортное средство, используемое обычно для перевозки по дорогам людей или грузов или для буксировки по дорогам транспортных средств, используемых для перевозки людей или грузов; этот термин не включает сельскохозяйственные тракторы.\n&mdash; Ст. 1, Европейское соглашение, касающееся работы экипажей транспортных средств, производящих международные автомобильные перевозки (ЕСТР) Женева, 1 июля 1970 года\nНаземное транспортное средство, продвигаемое его собственными средствами, движущееся по крайней мере на четырёх колесах, не находящихся на одной линии, которые должны всегда быть в контакте с землей; управление должно быть обеспечено по крайней мере двумя из колес, и движение &mdash; по крайней мере двумя из колес.\n&mdash; Международный спортивный кодекс ФИА, ст. 13\n', 'Андрей', 'Сео заголовок для автомобилей', 'автомобили, автомобиль, и другие ключевые слова', 'Небольшое описание странички с автомобилями)))'),
(6, 2, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(7, 3, 1, 'New title title', 'New description New description New description', '', 'Author', '', '', ''),
(8, 3, 2, 'Сервис и гарантия', '<p><span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Мы ценим выбор клиентов, приобретающих нашу продукцию. Она разрабатывается с учетом самых современных технологий и отвечает высочайшим стандартам качества. </span><br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Наши изделия разрабатываются с мыслью об удовлетворении высоких требований к технике и качеству. В целях еще большего обеспечения качества мы предоставляем конечным клиентам гарантию на нашу продукцию, воспользоваться которой клиент вправе в случае обнаружения в нашей продукции дефектов. </span><br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Точные сведения о типе и длительности гарантии для приобретенного изделия приведены в документе &laquo;Обзорная информация по гарантии&raquo;, который прилагается к изделию. Если устройство было приобретено в одной из стран, для которых в &laquo;Обзорной информации по гарантиям&raquo; отсутствует регламентация, то тип и срок гарантии должен быть указан на чеке-счете, выставленном для конечного клиента при первичном приобретении изделия, или на накладной доставки. </span><br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Предоставленная гарантия подтверждает собственное добровольное обязательство компании Fujitsu Technology Solutions поддерживать проданное оборудование в качестве производителя по отношению к первичным покупателям новых устройств. </span><br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<br style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px;" />\n<span style="color: rgb(0, 0, 0); font-family: Arial, Verdana, ''Lucida Grande'', sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 19px; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; display: inline !important; float: none;">Претензии по качеству изделия в течение гарантийного срока должны быть предъявлены незамедлительно после обнаружения дефекта либо через службу технической поддержки Help Desk компании Fujitsu Technology Solutions, либо непорсредственно партнеру Fujitsu Technology Solutions по сервису.</span></p>', 'Мы ценим выбор клиентов, приобретающих нашу продукцию. Она разрабатывается с учетом самых современных технологий и отвечает высочайшим стандартам качества. \n\nНаши изделия разрабатываются с мыслью об удовлетворении высоких требований к технике и качеству. В целях еще большего обеспечения качества мы предоставляем конечным клиентам гарантию на нашу продукцию, воспользоваться которой клиент вправе в случае обнаружения в нашей продукции дефектов. \n\nТочные сведения о типе и длительности гарантии для приобретенного изделия приведены в документе &laquo;Обзорная информация по гарантии&raquo;, который прилагается к изделию. Если устройство было приобретено в одной из стран, для которых в &laquo;Обзорной информации по гарантиям&raquo; отсутствует регламентация, то тип и срок гарантии должен быть указан на чеке-счете, выставленном для конечного клиента при первичном приобретении изделия, или на накладной доставки. \n\nПредоставленная гарантия подтверждает собственное добровольное обязательство компании Fujitsu Technology Solutions поддерживать проданное оборудование в качестве производителя по отношению к первичным покупателям новых устройств. \n\nПретензии по качеству изделия в течение гарантийного срока должны быть предъявлены незамедлительно после обнаружения дефекта либо через службу технической поддержки Help Desk компании Fujitsu Technology Solutions, либо непорсредственно партнеру Fujitsu Technology Solutions по сервису.\n', 'Андрей', 'Сервис и гарантия сео тайтл', 'Сервис и гарантия и другое', 'Короткое описание...'),
(9, 3, 3, 'New title title', 'New description New description New description', '', 'Author', '', '', '');

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
-- Структура таблицы `tab`
--

CREATE TABLE IF NOT EXISTS `tab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `controller_name` varchar(50) NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `tab`
--

INSERT INTO `tab` (`id`, `parent_id`, `controller_name`, `position`) VALUES
(1, 0, 'menu', 1),
(2, 0, 'component', 2),
(3, 0, 'layout', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `tab_lang`
--

CREATE TABLE IF NOT EXISTS `tab_lang` (
  `tab_id` int(11) NOT NULL,
  `lang_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`tab_id`,`lang_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tab_lang`
--

INSERT INTO `tab_lang` (`tab_id`, `lang_id`, `name`) VALUES
(1, 2, 'Меню'),
(1, 1, 'Menu'),
(2, 2, 'Страницы'),
(2, 1, 'Pages'),
(3, 1, 'Layout'),
(3, 2, 'Разметка');

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
  `prognose_line` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `ip_address`, `username`, `password`, `salt`, `email`, `activation_code`, `forgotten_password_code`, `remember_code`, `created_on`, `last_login`, `active`, `first_name`, `last_name`, `company`, `phone`, `prognose_line`) VALUES
(1, 2130706433, 'administrator', '2fb682a58b7e290870e8f70b31fb85202a5a3335', '9462e8eee0', 'arsenal@arsenal.com', '', NULL, NULL, 1268889823, 1363881745, 1, 'Admin', 'istrator', 'ADMIN', '0', 1),
(6, 2130706433, 'Test username', '3a4d2664f1c6ce6869f09166a01a3c40605d51aa', NULL, 'test@email.com', NULL, NULL, NULL, 1335651494, 1335651494, 1, 'Ivan', 'Bolvan', NULL, '123321', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users_groups`
--

CREATE TABLE IF NOT EXISTS `users_groups` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `group_id` mediumint(8) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `users_groups`
--

INSERT INTO `users_groups` (`id`, `user_id`, `group_id`) VALUES
(1, 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
