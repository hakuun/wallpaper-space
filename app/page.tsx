import Script from "next/script";

import Gallery from "@/components/gallery";
import { Navbar } from "@/components/navbar";

export default async function HomePage() {
	return (
		<main className="bg-inherit">
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-H275ER5KMB" />
			<Script id="google-analytics">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-H275ER5KMB');
        `}
			</Script>
			<Navbar />
			<div className="p-4 pt-[80px]">
				<Gallery />
			</div>
		</main>
	);
}
