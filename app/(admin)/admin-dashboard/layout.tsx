import NavBar from '@/components/admin-dashboard/nav';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="w-full h-full flex items-stretch">
            <div className="hidden md:block bg-gray-200 border-[2px] border-r-gray-100 min-w-[15rem] w-[15rem] h-full">
                <NavBar />
            </div>
            <div className="flex-grow overflow-y-auto pb-12">
                {children}
            </div>
        </div>
    )
}