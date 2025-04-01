import type { Metadata } from "next";
import { Nunito, Montserrat } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "Memora",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${nunito.className} antialiased`}>
				<QueryProvider>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryProvider>
			</body>
		</html>
	);
}
