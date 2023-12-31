export function MockupSmartwatch({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-t-[2.5rem] h-[63px] max-w-[133px]"></div>
			<div className="relative mx-auto border-gray-900 dark:bg-gray-800 dark:border-gray-800 border-[10px] rounded-[2.5rem] h-[213px] w-[208px]">
				<div className="h-[41px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -right-[16px] top-[40px] rounded-r-lg"></div>
				<div className="h-[32px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -right-[16px] top-[88px] rounded-r-lg"></div>
				<div className="rounded-[2rem] overflow-hidden h-[193px] w-[188px]">
					{children}
				</div>
			</div>
			<div className="relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-b-[2.5rem] h-[63px] max-w-[133px]"></div>
		</>
	);
}
