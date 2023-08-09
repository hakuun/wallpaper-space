import { toast } from "react-hot-toast";

export async function api(url: string, options?: RequestInit) {
	try {
		const fetchUrl = `http://127.0.0.1:3001${
			url.startsWith("/") ? "" : "/"
		}${url}`;
		
		const res = await fetch(fetchUrl, options);
		if (!res.ok) {
			toast.error("Something went wrong!");
			return null;
		}
		return await res.json();
	} catch (error) {
		console.error(error);
		toast.error("Something went wrong!");
	}
}
