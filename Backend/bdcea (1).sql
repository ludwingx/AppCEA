-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-09-2022 a las 00:27:44
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdcea`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblatencion`
--

CREATE TABLE `tblatencion` (
  `id_tatencion` int(10) NOT NULL,
  `ntatencion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblatencion`
--

INSERT INTO `tblatencion` (`id_tatencion`, `ntatencion`) VALUES
(1, 'Entrega'),
(2, 'Rescate'),
(3, 'Decomiso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbledad`
--

CREATE TABLE `tbledad` (
  `id_edad` int(10) NOT NULL,
  `nedad` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbledad`
--

INSERT INTO `tbledad` (`id_edad`, `nedad`) VALUES
(1, 'Nacido'),
(2, 'Infante'),
(3, 'Joven'),
(4, 'Adulto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblespecies`
--

CREATE TABLE `tblespecies` (
  `id_especies` int(10) NOT NULL,
  `nespecies` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblespecies`
--

INSERT INTO `tblespecies` (`id_especies`, `nespecies`) VALUES
(1, 'Mamífero'),
(2, 'Ave'),
(3, 'Reptil'),
(4, 'Pez'),
(5, 'Anfibio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblhstrcli`
--

CREATE TABLE `tblhstrcli` (
  `id_hstrcli` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `id_especies` int(10) NOT NULL,
  `ncomun` int(10) NOT NULL,
  `id_sexo` int(10) NOT NULL,
  `id_edad` int(10) NOT NULL,
  `anamnesis` varchar(150) NOT NULL,
  `id_mucosas` int(10) NOT NULL,
  `obs` varchar(30) NOT NULL,
  `id_revext` int(10) NOT NULL,
  `pruebascompl` varchar(300) NOT NULL,
  `diagconfir` varchar(200) NOT NULL,
  `medico` varchar(30) NOT NULL,
  `firma` longblob NOT NULL,
  `reposicion` varchar(200) NOT NULL,
  `mantenimiento` varchar(200) NOT NULL,
  `perdidas` varchar(200) NOT NULL,
  `tdfarmaco` varchar(100) NOT NULL,
  `tdaccion` varchar(100) NOT NULL,
  `tddosis` varchar(100) NOT NULL,
  `tdvía` varchar(100) NOT NULL,
  `tdhora` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblmucosas`
--

CREATE TABLE `tblmucosas` (
  `id_mucosas` int(10) NOT NULL,
  `nmucosas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblmucosas`
--

INSERT INTO `tblmucosas` (`id_mucosas`, `nmucosas`) VALUES
(1, 'Normal'),
(2, 'Palida'),
(3, 'Icterica'),
(4, 'Congestionada'),
(5, 'Cianotica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblmunicipios`
--

CREATE TABLE `tblmunicipios` (
  `id_municipio` int(10) NOT NULL,
  `nmunicipio` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblmunicipios`
--

INSERT INTO `tblmunicipios` (`id_municipio`, `nmunicipio`) VALUES
(1, 'Santa Cruz de la Sierra'),
(2, 'Montero'),
(3, 'Warnes'),
(4, 'La Guardia'),
(5, 'San Ignacio de Velasco'),
(6, 'Yapacaní'),
(7, 'El Torno'),
(8, ' San Julián'),
(9, 'Cotoca'),
(10, 'Camiri'),
(11, 'Pailón'),
(12, 'Charagua'),
(13, 'San José De Chiquitos'),
(14, 'Ascensión De Guarayos'),
(15, 'Cabezas'),
(16, 'Mineros'),
(17, 'Cuatro Cañadas'),
(18, 'San Carlos'),
(19, 'Puerto Suárez'),
(20, 'Santa Rosa del Sara'),
(21, 'San Pedro'),
(22, 'Concepción'),
(23, 'Portachuelo'),
(24, 'Vallegrande'),
(25, 'Puerto Quijarro'),
(26, 'Comarapa'),
(27, 'Roboré'),
(28, 'Ayacucho-Porongo'),
(29, 'Puerto Fernández Alonso'),
(30, 'San Matías'),
(31, 'General Saavedra'),
(32, 'El puente'),
(33, 'San Javier'),
(34, 'Buena Vista'),
(35, 'Okinawa Uno'),
(36, 'Gutiérrez'),
(37, 'San Miguel De Velasco'),
(38, 'Samaipata'),
(39, 'Mairana'),
(40, 'Pampa Grande'),
(41, 'San Juan De Yapacaní'),
(42, 'San Ramón'),
(43, 'Saipina'),
(44, 'Urubichá'),
(45, 'San Antonio De Lomerío'),
(46, 'Carmen Rivero Torrez'),
(47, 'San Rafael'),
(48, 'Colpa Bélgica'),
(49, 'Lagunillas'),
(50, 'Boyuibe'),
(51, 'Cuevo'),
(52, 'Quirusillas'),
(53, 'Moro Moro'),
(54, 'Postrer Valle'),
(55, 'Trigal'),
(56, 'Pucara');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblrcpt`
--

CREATE TABLE `tblrcpt` (
  `id_rcpt` int(10) NOT NULL,
  `numacta` int(12) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `id_tatencion` int(10) NOT NULL,
  `id_dfmunicipio` int(10) NOT NULL,
  `dfbarrio` varchar(20) NOT NULL,
  `dfcalleavenida` varchar(20) NOT NULL,
  `dfnumcasa` int(10) NOT NULL,
  `id_dpmunicipio` int(10) NOT NULL,
  `dpbarrio` varchar(20) NOT NULL,
  `dpcalleavenida` varchar(20) NOT NULL,
  `dpempreinsti` varchar(20) NOT NULL,
  `dparea` varchar(20) NOT NULL,
  `namerecep` varchar(30) NOT NULL,
  `firmarecep` longblob NOT NULL,
  `cirecep` int(10) NOT NULL,
  `nameperson` int(30) NOT NULL,
  `firmaperson` longblob NOT NULL,
  `telfperson` int(10) NOT NULL,
  `ciperson` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblrcptvet`
--

CREATE TABLE `tblrcptvet` (
  `id_rcptvet` int(10) NOT NULL,
  `num` int(10) NOT NULL,
  `ncientifico` varchar(30) NOT NULL,
  `ncomun` varchar(30) NOT NULL,
  `id_edad` int(10) NOT NULL,
  `id_sexo` int(10) NOT NULL,
  `observaciones` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblrevext`
--

CREATE TABLE `tblrevext` (
  `id_revext` int(10) NOT NULL,
  `nrevext` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblrevext`
--

INSERT INTO `tblrevext` (`id_revext`, `nrevext`) VALUES
(1, 'Traumatismo'),
(2, 'Hemorragia'),
(3, 'Shock'),
(4, 'Convulsiones'),
(5, 'Letargo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblsexo`
--

CREATE TABLE `tblsexo` (
  `id_sexo` int(10) NOT NULL,
  `nsexo` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblsexo`
--

INSERT INTO `tblsexo` (`id_sexo`, `nsexo`) VALUES
(1, 'Macho'),
(2, 'Hembra'),
(3, 'Intersexual');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tblatencion`
--
ALTER TABLE `tblatencion`
  ADD PRIMARY KEY (`id_tatencion`);

--
-- Indices de la tabla `tbledad`
--
ALTER TABLE `tbledad`
  ADD PRIMARY KEY (`id_edad`);

--
-- Indices de la tabla `tblespecies`
--
ALTER TABLE `tblespecies`
  ADD PRIMARY KEY (`id_especies`);

--
-- Indices de la tabla `tblhstrcli`
--
ALTER TABLE `tblhstrcli`
  ADD PRIMARY KEY (`id_hstrcli`),
  ADD UNIQUE KEY `id_especie` (`id_especies`,`id_sexo`,`id_edad`,`id_mucosas`,`id_revext`);

--
-- Indices de la tabla `tblmucosas`
--
ALTER TABLE `tblmucosas`
  ADD PRIMARY KEY (`id_mucosas`);

--
-- Indices de la tabla `tblmunicipios`
--
ALTER TABLE `tblmunicipios`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `tblrcpt`
--
ALTER TABLE `tblrcpt`
  ADD PRIMARY KEY (`id_rcpt`),
  ADD UNIQUE KEY `id_tatencion` (`id_tatencion`,`id_dfmunicipio`,`id_dpmunicipio`),
  ADD KEY `id_dfmunicipio` (`id_dfmunicipio`),
  ADD KEY `id_dpmunicipio` (`id_dpmunicipio`);

--
-- Indices de la tabla `tblrcptvet`
--
ALTER TABLE `tblrcptvet`
  ADD PRIMARY KEY (`id_rcptvet`),
  ADD UNIQUE KEY `id_edad` (`id_edad`,`id_sexo`),
  ADD KEY `id_sexo` (`id_sexo`);

--
-- Indices de la tabla `tblrevext`
--
ALTER TABLE `tblrevext`
  ADD PRIMARY KEY (`id_revext`);

--
-- Indices de la tabla `tblsexo`
--
ALTER TABLE `tblsexo`
  ADD PRIMARY KEY (`id_sexo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tblatencion`
--
ALTER TABLE `tblatencion`
  MODIFY `id_tatencion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbledad`
--
ALTER TABLE `tbledad`
  MODIFY `id_edad` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tblespecies`
--
ALTER TABLE `tblespecies`
  MODIFY `id_especies` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tblhstrcli`
--
ALTER TABLE `tblhstrcli`
  MODIFY `id_hstrcli` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblmucosas`
--
ALTER TABLE `tblmucosas`
  MODIFY `id_mucosas` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tblmunicipios`
--
ALTER TABLE `tblmunicipios`
  MODIFY `id_municipio` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `tblrcpt`
--
ALTER TABLE `tblrcpt`
  MODIFY `id_rcpt` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblrcptvet`
--
ALTER TABLE `tblrcptvet`
  MODIFY `id_rcptvet` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblrevext`
--
ALTER TABLE `tblrevext`
  MODIFY `id_revext` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tblsexo`
--
ALTER TABLE `tblsexo`
  MODIFY `id_sexo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tblrcpt`
--
ALTER TABLE `tblrcpt`
  ADD CONSTRAINT `tblrcpt_ibfk_1` FOREIGN KEY (`id_dfmunicipio`) REFERENCES `tblmunicipios` (`id_municipio`),
  ADD CONSTRAINT `tblrcpt_ibfk_2` FOREIGN KEY (`id_tatencion`) REFERENCES `tblatencion` (`id_tatencion`),
  ADD CONSTRAINT `tblrcpt_ibfk_3` FOREIGN KEY (`id_dpmunicipio`) REFERENCES `tblmunicipios` (`id_municipio`);

--
-- Filtros para la tabla `tblrcptvet`
--
ALTER TABLE `tblrcptvet`
  ADD CONSTRAINT `tblrcptvet_ibfk_1` FOREIGN KEY (`id_sexo`) REFERENCES `tblsexo` (`id_sexo`),
  ADD CONSTRAINT `tblrcptvet_ibfk_2` FOREIGN KEY (`id_edad`) REFERENCES `tbledad` (`id_edad`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
