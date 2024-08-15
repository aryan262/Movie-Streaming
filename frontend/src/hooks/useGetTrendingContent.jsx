import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
const BASEURL = 'https://movie-streaming-three.vercel.app'

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();

	useEffect(() => {
		const getTrendingContent = async () => {
			const res = await axios.get(BASEURL+`/api/v1/${contentType}/trending`);
			setTrendingContent(res.data.content);
		};

		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
};
export default useGetTrendingContent;
