export default function NavBar() {
    return (
        <nav className="px-5 flex flex-col items-stretch gap-y-4 w-full h-full pt-20">
            <button className="bg-orange-50 text-orange-600 px-5 py-2 rounded-full">Dasboard</button>
            <button className="bg-orange-50 text-orange-600 px-5 py-2 rounded-full">Search Trasactions</button>
            <button className="bg-orange-50 text-orange-600 px-5 py-2 rounded-full">Logout</button>
        </nav>
    )
}