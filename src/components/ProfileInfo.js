import React, { useContext, useEffect, useState } from "react";
import style from "../styles/leftsidebar.module.css";
import defaultImg from "../assets/defaultProfilePicture.jpg";
import { Context } from "..";
import { fetchOneUser } from "../http/userAPI";
import { observer } from "mobx-react-lite";

const ProfileInfo = ({ userId }) => {
	const { user } = useContext(Context);
	const [userInfo, setUserInfo] = useState("");

	useEffect(() => {
		fetchOneUser(userId).then((data) => setUserInfo(data));
	}, []);

	let roleText = userInfo.role === "TEACHER" ? "Викладач" : "Адміністратор";
	if (!user.isAuth) {
		roleText = "Гість";
	}

	return (
		<div className={style.profile}>
			<img
				src={
					userInfo.image
						? process.env.REACT_APP_API_URL + userInfo.image
						: defaultImg
				}
				className={style.image}
				alt="profilePicture"
			/>
			<p className={style.pName}>{userInfo.fullName}</p>
			<p className={style.pInfo}>{roleText}</p>
		</div>
	);
};

export default observer(ProfileInfo);
