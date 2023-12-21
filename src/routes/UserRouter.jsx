import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Public from "../components/public/Public";
import Private from "../components/private/Private";
import TodoListPage from "../pages/TodoListPage";
import ProfilePage from "../pages/ProfilePage";

function UserRouter() {
	return (
		<Routes>
			<Route element={<Outlet />}>
				<Route path="/" element={<LandingPage />} />
				<Route element={<Public />}>
					<Route path="login" element={<LoginPage />} />
					<Route path="signup" element={<SignupPage />} />
				</Route>
				<Route element={<Private />}>
					<Route path="todo" element={<TodoListPage />} />
					<Route path="profile" element={<ProfilePage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default UserRouter;
