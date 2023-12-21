import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshMutation } from "../../redux/apiSlices/authApiService";
import { setUserData } from "../../redux/slices/userSlice";
import {
	selectCurrentToken,
	setCredentials,
} from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import Loading from "../loading/Loading";

//=========================================================================================

function Persist() {
	const [persist] = usePersist();
	const token = useSelector(selectCurrentToken);
	const [truePersist, setTruePersist] = useState(false);
	const effectRan = useRef(false);
	const dispatch = useDispatch();

	const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
		useRefreshMutation();
	useEffect(() => {
		if (effectRan.current === true) {
			const verifyRefreshToken = async () => {
				try {
					const { data } = await refresh();
					if (data === undefined) {
						toast.error("Sign in for the better experience", {
							position: "top-center",
							theme: "colored",
						});
					} else {
						dispatch(setUserData(data?.user));
						dispatch(setCredentials({ token: data?.accessToken }));
						setTruePersist(true);
					}
				} catch (error) {
					console.log(error);
				}
			};
			if (!token && persist) verifyRefreshToken();
		}
		const setEffectRan = () => {
			effectRan.current = true;
		};

		return setEffectRan;
	}, []);

	let content;
	if (!persist) {
		content = <Outlet />;
	} else if (isLoading) {
		content = <Loading />;
	} else if (isError) {
		content = <Outlet />;
	} else if (isSuccess && truePersist) {
		content = <Outlet />;
	} else if (token && isUninitialized) {
		content = <Outlet />;
	}

	return content;
}

export default Persist;
