
-- ----------------------------
-- Table structure for `cod_lenguaje_pais`
-- ----------------------------
DROP TABLE IF EXISTS `cod_lenguaje_pais`;
CREATE TABLE `cod_lenguaje_pais` (
  `idx` int(10) unsigned NOT NULL auto_increment,
  `cod_LP` varchar(5) default NULL,
  `descripcion` varchar(60) default NULL,
  PRIMARY KEY  (`idx`),
  UNIQUE KEY `idx` (`idx`),
  UNIQUE KEY `cod_LP` USING BTREE (`cod_LP`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cod_lenguaje_pais
-- ----------------------------
INSERT INTO `cod_lenguaje_pais` VALUES ('1', 'ar', 'árabe');
INSERT INTO `cod_lenguaje_pais` VALUES ('2', 'ar_AE', 'árabe [Emiratos Árabes Unidos]');
INSERT INTO `cod_lenguaje_pais` VALUES ('3', 'ar_BH', 'árabe [Bahráin]');
INSERT INTO `cod_lenguaje_pais` VALUES ('4', 'ar_DZ', 'árabe [Argelia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('5', 'ar_EG', 'árabe [Egipto]');
INSERT INTO `cod_lenguaje_pais` VALUES ('6', 'ar_IQ', 'árabe [Iraq]');
INSERT INTO `cod_lenguaje_pais` VALUES ('7', 'ar_JO', 'árabe [Jordania]');
INSERT INTO `cod_lenguaje_pais` VALUES ('8', 'ar_KW', 'árabe [Kuwait]');
INSERT INTO `cod_lenguaje_pais` VALUES ('9', 'ar_LB', 'árabe [Líbano]');
INSERT INTO `cod_lenguaje_pais` VALUES ('10', 'ar_LY', 'árabe [Libia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('11', 'ar_MA', 'árabe [Marruecos]');
INSERT INTO `cod_lenguaje_pais` VALUES ('12', 'ar_OM', 'árabe [Omán]');
INSERT INTO `cod_lenguaje_pais` VALUES ('13', 'ar_QA', 'árabe [Qatar]');
INSERT INTO `cod_lenguaje_pais` VALUES ('14', 'ar_SA', 'árabe [Arabia Saudita]');
INSERT INTO `cod_lenguaje_pais` VALUES ('15', 'ar_SD', 'árabe [Sudán]');
INSERT INTO `cod_lenguaje_pais` VALUES ('16', 'ar_SY', 'árabe [Siria]');
INSERT INTO `cod_lenguaje_pais` VALUES ('17', 'ar_TN', 'árabe [Túnez]');
INSERT INTO `cod_lenguaje_pais` VALUES ('18', 'ar_YE', 'árabe [Yemen]');
INSERT INTO `cod_lenguaje_pais` VALUES ('19', 'be', 'bielorruso');
INSERT INTO `cod_lenguaje_pais` VALUES ('20', 'be_BY', 'bielorruso [Bielorrusia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('21', 'bg', 'búlgaro');
INSERT INTO `cod_lenguaje_pais` VALUES ('22', 'bg_BG', 'búlgaro [Bulgaria]');
INSERT INTO `cod_lenguaje_pais` VALUES ('23', 'ca', 'catalán');
INSERT INTO `cod_lenguaje_pais` VALUES ('24', 'ca_ES', 'catalán [España]');
INSERT INTO `cod_lenguaje_pais` VALUES ('25', 'cs', 'checo');
INSERT INTO `cod_lenguaje_pais` VALUES ('26', 'cs_CZ', 'checo [Chequia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('27', 'da', 'danés');
INSERT INTO `cod_lenguaje_pais` VALUES ('28', 'da_DK', 'danés [Dinamarca]');
INSERT INTO `cod_lenguaje_pais` VALUES ('29', 'de', 'alemán');
INSERT INTO `cod_lenguaje_pais` VALUES ('30', 'de_AT', 'alemán [Austria]');
INSERT INTO `cod_lenguaje_pais` VALUES ('31', 'de_CH', 'alemán [Suiza]');
INSERT INTO `cod_lenguaje_pais` VALUES ('32', 'de_DE', 'alemán [Alemania]');
INSERT INTO `cod_lenguaje_pais` VALUES ('33', 'de_LU', 'alemán [Luxemburgo]');
INSERT INTO `cod_lenguaje_pais` VALUES ('34', 'el', 'griego');
INSERT INTO `cod_lenguaje_pais` VALUES ('35', 'el_CY', 'griego [Chipre]');
INSERT INTO `cod_lenguaje_pais` VALUES ('36', 'el_GR', 'griego [Grecia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('37', 'en', 'inglés');
INSERT INTO `cod_lenguaje_pais` VALUES ('38', 'en_AU', 'inglés [Australia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('39', 'en_CA', 'inglés [Canadá]');
INSERT INTO `cod_lenguaje_pais` VALUES ('40', 'en_GB', 'inglés [Reino Unido]');
INSERT INTO `cod_lenguaje_pais` VALUES ('41', 'en_IE', 'inglés [Irlanda]');
INSERT INTO `cod_lenguaje_pais` VALUES ('42', 'en_IN', 'inglés [India]');
INSERT INTO `cod_lenguaje_pais` VALUES ('43', 'en_MT', 'inglés [Malta]');
INSERT INTO `cod_lenguaje_pais` VALUES ('44', 'en_NZ', 'inglés [Nueva Zelanda]');
INSERT INTO `cod_lenguaje_pais` VALUES ('45', 'en_PH', 'inglés [Filipinas]');
INSERT INTO `cod_lenguaje_pais` VALUES ('46', 'en_SG', 'inglés [Singapur]');
INSERT INTO `cod_lenguaje_pais` VALUES ('47', 'en_US', 'inglés [Estados Unidos]');
INSERT INTO `cod_lenguaje_pais` VALUES ('48', 'en_ZA', 'inglés [Sudáfrica]');
INSERT INTO `cod_lenguaje_pais` VALUES ('49', 'es', 'español');
INSERT INTO `cod_lenguaje_pais` VALUES ('50', 'es_AR', 'español [Argentina]');
INSERT INTO `cod_lenguaje_pais` VALUES ('51', 'es_BO', 'español [Bolivia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('52', 'es_CL', 'español [Chile]');
INSERT INTO `cod_lenguaje_pais` VALUES ('53', 'es_CO', 'español [Colombia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('54', 'es_CR', 'español [Costa Rica]');
INSERT INTO `cod_lenguaje_pais` VALUES ('55', 'es_DO', 'español [República Dominicana]');
INSERT INTO `cod_lenguaje_pais` VALUES ('56', 'es_EC', 'español [Ecuador]');
INSERT INTO `cod_lenguaje_pais` VALUES ('57', 'es_ES', 'español [España]');
INSERT INTO `cod_lenguaje_pais` VALUES ('58', 'es_GT', 'español [Guatemala]');
INSERT INTO `cod_lenguaje_pais` VALUES ('59', 'es_HN', 'español [Honduras]');
INSERT INTO `cod_lenguaje_pais` VALUES ('60', 'es_MX', 'español [México]');
INSERT INTO `cod_lenguaje_pais` VALUES ('61', 'es_NI', 'español [Nicaragua]');
INSERT INTO `cod_lenguaje_pais` VALUES ('62', 'es_PA', 'español [Panamá]');
INSERT INTO `cod_lenguaje_pais` VALUES ('63', 'es_PE', 'español [Perú]');
INSERT INTO `cod_lenguaje_pais` VALUES ('64', 'es_PR', 'español [Puerto Rico]');
INSERT INTO `cod_lenguaje_pais` VALUES ('65', 'es_PY', 'español [Paraguay]');
INSERT INTO `cod_lenguaje_pais` VALUES ('66', 'es_SV', 'español [El Salvador]');
INSERT INTO `cod_lenguaje_pais` VALUES ('67', 'es_US', 'español [Estados Unidos]');
INSERT INTO `cod_lenguaje_pais` VALUES ('68', 'es_UY', 'español [Uruguay]');
INSERT INTO `cod_lenguaje_pais` VALUES ('69', 'es_VE', 'español [Venezuela]');
INSERT INTO `cod_lenguaje_pais` VALUES ('70', 'et', 'estonio');
INSERT INTO `cod_lenguaje_pais` VALUES ('71', 'et_EE', 'estonio [Estonia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('72', 'fi', 'finés');
INSERT INTO `cod_lenguaje_pais` VALUES ('73', 'fi_FI', 'finés [Finlandia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('74', 'fr', 'francés');
INSERT INTO `cod_lenguaje_pais` VALUES ('75', 'fr_BE', 'francés [Bélgica]');
INSERT INTO `cod_lenguaje_pais` VALUES ('76', 'fr_CA', 'francés [Canadá]');
INSERT INTO `cod_lenguaje_pais` VALUES ('77', 'fr_CH', 'francés [Suiza]');
INSERT INTO `cod_lenguaje_pais` VALUES ('78', 'fr_FR', 'francés [Francia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('79', 'fr_LU', 'francés [Luxemburgo]');
INSERT INTO `cod_lenguaje_pais` VALUES ('80', 'ga', 'irlandés');
INSERT INTO `cod_lenguaje_pais` VALUES ('81', 'ga_IE', 'irlandés [Irlanda]');
INSERT INTO `cod_lenguaje_pais` VALUES ('82', 'hi_IN', 'hindú [India]');
INSERT INTO `cod_lenguaje_pais` VALUES ('83', 'hr', 'croata');
INSERT INTO `cod_lenguaje_pais` VALUES ('84', 'hr_HR', 'croata [Croacia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('85', 'hu', 'húngaro');
INSERT INTO `cod_lenguaje_pais` VALUES ('86', 'hu_HU', 'húngaro [Hungría]');
INSERT INTO `cod_lenguaje_pais` VALUES ('87', 'in', 'indonesio');
INSERT INTO `cod_lenguaje_pais` VALUES ('88', 'in_ID', 'indonesio [Indonesia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('89', 'is', 'islandés');
INSERT INTO `cod_lenguaje_pais` VALUES ('90', 'is_IS', 'islandés [Islandia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('91', 'it', 'italiano');
INSERT INTO `cod_lenguaje_pais` VALUES ('92', 'it_CH', 'italiano [Suiza]');
INSERT INTO `cod_lenguaje_pais` VALUES ('93', 'it_IT', 'italiano [Italia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('94', 'iw', 'hebreo');
INSERT INTO `cod_lenguaje_pais` VALUES ('95', 'iw_IL', 'hebreo [Israel]');
INSERT INTO `cod_lenguaje_pais` VALUES ('96', 'ja', 'japonés');
INSERT INTO `cod_lenguaje_pais` VALUES ('97', 'ja_JP', 'japonés [Japón]');
INSERT INTO `cod_lenguaje_pais` VALUES ('99', 'ko', 'coreano');
INSERT INTO `cod_lenguaje_pais` VALUES ('100', 'ko_KR', 'coreano [Corea del Sur]');
INSERT INTO `cod_lenguaje_pais` VALUES ('101', 'lt', 'lituano');
INSERT INTO `cod_lenguaje_pais` VALUES ('102', 'lt_LT', 'lituano [Lituania]');
INSERT INTO `cod_lenguaje_pais` VALUES ('103', 'lv', 'letón');
INSERT INTO `cod_lenguaje_pais` VALUES ('104', 'lv_LV', 'letón [Letonia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('105', 'mk', 'macedonio');
INSERT INTO `cod_lenguaje_pais` VALUES ('106', 'mk_MK', 'macedonio [Macedonia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('107', 'ms', 'malayo');
INSERT INTO `cod_lenguaje_pais` VALUES ('108', 'ms_MY', 'malayo [Malasia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('109', 'mt', 'maltés');
INSERT INTO `cod_lenguaje_pais` VALUES ('110', 'mt_MT', 'maltés [Malta]');
INSERT INTO `cod_lenguaje_pais` VALUES ('111', 'nl', 'neerlandés');
INSERT INTO `cod_lenguaje_pais` VALUES ('112', 'nl_BE', 'neerlandés [Bélgica]');
INSERT INTO `cod_lenguaje_pais` VALUES ('113', 'nl_NL', 'neerlandés [Holanda]');
INSERT INTO `cod_lenguaje_pais` VALUES ('114', 'no', 'noruego');
INSERT INTO `cod_lenguaje_pais` VALUES ('115', 'no_NO', 'noruego [Noruega]');
INSERT INTO `cod_lenguaje_pais` VALUES ('117', 'pl', 'polaco');
INSERT INTO `cod_lenguaje_pais` VALUES ('118', 'pl_PL', 'polaco [Polonia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('119', 'pt', 'portugués');
INSERT INTO `cod_lenguaje_pais` VALUES ('120', 'pt_BR', 'portugués [Brasil]');
INSERT INTO `cod_lenguaje_pais` VALUES ('121', 'pt_PT', 'portugués [Portugal]');
INSERT INTO `cod_lenguaje_pais` VALUES ('122', 'ro', 'rumano');
INSERT INTO `cod_lenguaje_pais` VALUES ('123', 'ro_RO', 'rumano [Rumania]');
INSERT INTO `cod_lenguaje_pais` VALUES ('124', 'ru', 'ruso');
INSERT INTO `cod_lenguaje_pais` VALUES ('125', 'ru_RU', 'ruso [Rusia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('126', 'sk', 'eslovaco');
INSERT INTO `cod_lenguaje_pais` VALUES ('127', 'sk_SK', 'eslovaco [Eslovaquia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('128', 'sl', 'eslovenio');
INSERT INTO `cod_lenguaje_pais` VALUES ('129', 'sl_SI', 'eslovenio [Eslovenia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('130', 'sq', 'albanés');
INSERT INTO `cod_lenguaje_pais` VALUES ('131', 'sq_AL', 'albanés [Albania]');
INSERT INTO `cod_lenguaje_pais` VALUES ('132', 'sr', 'serbio');
INSERT INTO `cod_lenguaje_pais` VALUES ('133', 'sr_BA', 'serbio [Bosnia y Hercegovina]');
INSERT INTO `cod_lenguaje_pais` VALUES ('134', 'sr_CS', 'serbio [Serbia y Montenegro]');
INSERT INTO `cod_lenguaje_pais` VALUES ('135', 'sr_ME', 'serbio [Montenegro]');
INSERT INTO `cod_lenguaje_pais` VALUES ('136', 'sr_RS', 'serbio [Serbia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('137', 'sv', 'sueco');
INSERT INTO `cod_lenguaje_pais` VALUES ('138', 'sv_SE', 'sueco [Suecia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('139', 'th', 'tailandés');
INSERT INTO `cod_lenguaje_pais` VALUES ('140', 'th_TH', 'tailandés [Tailandia]');
INSERT INTO `cod_lenguaje_pais` VALUES ('142', 'tr', 'turco');
INSERT INTO `cod_lenguaje_pais` VALUES ('143', 'tr_TR', 'turco [Turquía]');
INSERT INTO `cod_lenguaje_pais` VALUES ('144', 'uk', 'ucranio');
INSERT INTO `cod_lenguaje_pais` VALUES ('145', 'uk_UA', 'ucranio [Ucrania]');
INSERT INTO `cod_lenguaje_pais` VALUES ('146', 'vi', 'vietnamita');
INSERT INTO `cod_lenguaje_pais` VALUES ('147', 'vi_VN', 'vietnamita [Vietnam]');
INSERT INTO `cod_lenguaje_pais` VALUES ('148', 'zh', 'chino');
INSERT INTO `cod_lenguaje_pais` VALUES ('149', 'zh_CN', 'chino [China]');
INSERT INTO `cod_lenguaje_pais` VALUES ('150', 'zh_HK', 'chino [Hong Kong]');
INSERT INTO `cod_lenguaje_pais` VALUES ('151', 'zh_SG', 'chino [Singapur]');
INSERT INTO `cod_lenguaje_pais` VALUES ('152', 'zh_TW', 'chino [Taiwán]');

