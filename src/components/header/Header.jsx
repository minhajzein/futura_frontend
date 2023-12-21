import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../redux/apiSlices/authApiService";
const withoutAuth = [
	{ name: "login", link: "/login" },
	{ name: "signup", link: "/signup" },
];
const withAuth = [
	{ name: "tasks", link: "/todo" },
	{ name: "profile", link: "/profile" },
];

//=================================================================================================================================================================

function Header() {
	const [open, setOpen] = useState(false);
	const [logout, { isLoading }] = useSendLogoutMutation();
	const token = useSelector(state => state.auth.token);
	const user = useSelector(state => state.user.value);
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className="w-full z-50 sticky top-0 flex justify-between items-center p-1 bg-gray-500">
			<div>
				<i
					onClick={() => setOpen(!open)}
					className="fa-solid fa-bars text-lg ml-1 lg:ml-5 text-yellow-100 mr-1 lg:mr-5 cursor-pointer hover:scale-105 duration-300"
				></i>
				{token ? (
					<div
						className={`${
							open ? "left-0" : "-left-full"
						} absolute gap-1  top-10 z-40 flex flex-col duration-500 w-full sm:w-[40%] md:w-[30%] lg:w-[20%]`}
					>
						{withAuth.map((page, i) => {
							return (
								<div
									key={i}
									onClick={() => navigate(page.link)}
									className="w-full bg-black border-b border-white text-white flex justify-center py-1 rounded-lg font-mono hover:scale-105 duration-300 cursor-pointer"
								>
									{page.name}
								</div>
							);
						})}
						{isLoading ? (
							<i className="fa-solid fa-spinner animate-spin"></i>
						) : (
							<div
								onClick={() => logout()}
								className="w-full bg-red-700 border-b border-white text-white flex justify-center py-1 rounded-lg font-mono hover:scale-105 duration-300 cursor-pointer"
							>
								logout
							</div>
						)}
					</div>
				) : (
					<div
						className={`${
							open ? "left-0" : "-left-full"
						} absolute gap-1 top-10 z-40 flex flex-col duration-500 w-full sm:w-[40%] md:w-[30%] lg:w-[20%]`}
					>
						{withoutAuth.map((page, i) => {
							return (
								<div
									key={i}
									onClick={() => navigate(page.link)}
									className="w-full bg-black border-b border-white text-white flex justify-center py-1 rounded-lg font-mono hover:scale-105 duration-300 cursor-pointer"
								>
									{page.name}
								</div>
							);
						})}
					</div>
				)}
			</div>
			<div>
				<div
					onClick={() => navigate("/")}
					className="flex gap-1 justify-center items-center cursor-pointer"
				>
					<img
						className="lg:h-8 h-6 rounded-full hover:animate-spin"
						src="https://static.vecteezy.com/system/resources/previews/009/970/456/original/eps10-orange-quotation-mark-icon-isolated-on-white-background-double-quotes-symbol-in-a-simple-flat-trendy-modern-style-for-your-website-design-logo-ui-pictogram-and-mobile-application-vector.jpg"
						alt="logo"
					/>
					<h1 className="text-white font-extrabold text-2xl">ToDo</h1>
				</div>
			</div>
			<div>
				{token ? (
					<>
						{location.pathname === "/profile" ? (
							<i
								onClick={() => navigate("/")}
								className="fa-solid fa-house text-lg text-yellow-100 mr-1 lg:mr-5 cursor-pointer hover:scale-105 duration-300"
							></i>
						) : (
							<img
								className="rounded-full hover:scale-105 duration-300 mr-1 lg:mr-5 cursor-pointer h-6 lg:h-8"
								src={
									user?.avatar && user.avatar !== null
										? user.avatar
										: "https://www.eirim.ie/eirim2017/wp-content/uploads/2016/09/dummy-profile-pic.jpg"
								}
								alt="Profile"
								title="Profile"
								onClick={() => navigate("/profile")}
							/>
						)}
					</>
				) : (
					<>
						{location.pathname === "/login" || location.pathname === "/signup" ? (
							<i
								onClick={() => navigate("/")}
								className="fa-solid fa-house  text-lg text-yellow-100 mr-1 lg:mr-5 cursor-pointer hover:scale-105 duration-300"
							></i>
						) : (
							<i
								onClick={() => navigate("/login")}
								className="fa-solid fa-right-to-bracket text-lg text-yellow-100 mr-1 lg:mr-5 cursor-pointer hover:scale-105 duration-300"
							></i>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
