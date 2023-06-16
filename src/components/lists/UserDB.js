import React, { useContext, useState } from "react";
import { Context } from "../..";
import { deleteUser } from "../../http/userAPI";
import style from "../../styles/adminpanel.module.css";
import EditUser from "../modals/EditUser";

const UserDB = ({ query }) => {
	const { user } = useContext(Context);
	const [isOpen, setIsOpen] = useState(false);
	const [userToEdit, setUserToEdit] = useState(null);

	const handleDeleteUser = (id) => {
		deleteUser(id)
			.then((response) => {
				window.location.reload();
			})
			.catch((error) => {
				alert("Помилка при видаленні користувача з БД!");
			});
	};

	const handleEditUser = (user) => {
		setUserToEdit(user);
		setIsOpen(true);
	};

	const filteredUsers = user.users.filter((user) => {
		return user.fullName.toLowerCase().includes(query.toLowerCase());
	});

	return (
		<>
			{filteredUsers.map((user) => (
				<li key={user.id}>
					<p onClick={() => handleEditUser(user)} className={style.edit}>
						{user.fullName}
					</p>
					<button
						className={`${style.btnDB} ${style.btn}`}
						key={user.id}
						onClick={() => handleDeleteUser(user.id)}
					>
						Видалити
					</button>
				</li>
			))}
			{userToEdit && isOpen && (
				<EditUser user={userToEdit} setIsOpen={setIsOpen} />
			)}
		</>
	);
};

export default UserDB;
