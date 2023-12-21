import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

//===============================================================================

export default function Private() {
	const token = useSelector(state => state.auth.token);
	const location = useLocation();

	return token !== null ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}
