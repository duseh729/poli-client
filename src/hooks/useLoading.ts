import { useEffect, useState } from "react";
import { useLoadingStore } from "@/stores";

const useLoading = () => {
	const { isLoading } = useLoadingStore();
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (isLoading) {
			timer = setTimeout(() => {
				setShowLoader(true);
			}, 500);
		} else {
			setShowLoader(false);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [isLoading]);

	return showLoader;
};

export default useLoading;
