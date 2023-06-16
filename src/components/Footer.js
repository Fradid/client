import React from "react";
import style from "../styles/footer.module.css";

const Footer = () => {
	return (
		<div className={style.footer}>
			<p>Телефон: +38 (0542) 220283 | E-mail: info@mk.sumdu.edu.ua</p>
			<p>
				Адреса: проспект Тараса Шевченка, 17, Суми, тел. +38 0542 220283 © Всі
				права захищені.
			</p>
			<a href="https://mk.sumdu.edu.ua/" target="_blank" className={style.link}>
				Машинобудівний фаховий коледж СумДУ
			</a>
		</div>
	);
};

export default Footer;
