import React from "react";
import styles from "../styles/modal.module.css";
import style from "../styles/auth.module.css";

const Modal = ({ setIsOpen, children, title, name, onSubmit }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit();
		}
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>{title}</h5>
					</div>
					<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
						<i className="fa-solid fa-xmark"></i>
					</button>
					<form className={style.forms} onSubmit={handleSubmit}>
						<div className={styles.modalContent}>{children}</div>
						<div className={styles.modalActions}>
							<div className={styles.actionsContainer}>
								<button type="submit" className={styles.confirmBtn}>
									{name}
								</button>
								<button
									type="button"
									className={styles.cancelBtn}
									onClick={() => setIsOpen(false)}
								>
									Відмінити
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Modal;
