-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 15-09-2022 a las 21:07:16
-- Versión del servidor: 10.5.16-MariaDB
-- Versión de PHP: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id19414251_bdcea`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblcargos`
--

CREATE TABLE `tblcargos` (
  `id_cargo` int(10) NOT NULL,
  `ncargo` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tblcargos`
--

INSERT INTO `tblcargos` (`id_cargo`, `ncargo`) VALUES
(1, 'Recepcionista'),
(2, 'Veterinario'),
(3, 'Derivador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblusers`
--

CREATE TABLE `tblusers` (
  `id_user` int(10) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `id_cargo` int(10) NOT NULL,
  `estado` char(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tblusers`
--

INSERT INTO `tblusers` (`id_user`, `name`, `email`, `password`, `id_cargo`, `estado`) VALUES
(1, 'Ludwing Armijo Saavedra', 'ludwingytx@gmail.com', 'ludwing', 2, '1'),
(2, 'Andrea', 'andrea@gmail.com', '123456', 1, '1'),
(3, 'Carlos', 'carlos@gmail.com', '123456', 3, '1'),
(4, 'prueba', 'prueba@gmail.com', 'prueba', 2, '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tblcargos`
--
ALTER TABLE `tblcargos`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_cargo` (`id_cargo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tblcargos`
--
ALTER TABLE `tblcargos`
  MODIFY `id_cargo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tblusers`
--
ALTER TABLE `tblusers`
  ADD CONSTRAINT `tblusers_ibfk_1` FOREIGN KEY (`id_cargo`) REFERENCES `tblcargos` (`id_cargo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
