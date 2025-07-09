import Logo from '../../assets/N.svg'

const NavMenu = () => {
    return (
        <aside className="fixed top-0 left-0 h-full w-64 bg-black/30 text-white flex flex-col items-center py-6 z-50 backdrop-blur-sm">
            {/* Логотип */}
            <img src={Logo} alt="Logo" className="w-12 h-12 mb-6" />

            <div className="w-full px-6">
                <hr className="text-[#B886F9] opacity-40 shadow-lg mb-6" />

                <ul className="font-primary list-disc list-outside pl-6 space-y-4 text-sm font-medium">
                    <li className="font-primary text-[#B886F9] opacity-50 font-light italic text-lg">ACCOUNT</li>
                    <li className="font-primary text-[#B886F9] opacity-50 font-light italic text-lg">TRADING</li>
                    <li className="font-primary text-white uppercase font-bold italic text-lg leading-none">
                        DEPOSIT/ <br />WITHDRAW
                    </li>
                    <li className=" font-primary text-[#B886F9] opacity-50 font-light italic text-lg">EXTRA</li>
                </ul>
            </div>
        </aside>
    );
}

export default NavMenu;