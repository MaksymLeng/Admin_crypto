import { NavLink } from 'react-router-dom'
import { routes } from '../pages/pages'
import Logo from '../../assets/N.svg'

const NavMenu = () => {
    return (
        <aside className="fixed top-0 left-0 lg:h-full w-full lg:w-60 bg-black/30 text-white flex  flex-row lg:flex-col items-center py-4 lg:py-6 gap-4 lg:gap-0 px-2 lg:px-5 z-50 backdrop-blur-sm">
            <img src={Logo} alt="Logo" className="w-14 h-14 lg:mb-6" />

            <div className="w-full">
                <hr className="text-[#B886F9] opacity-40 shadow-lg mb-4 lg:mb-6" />
                <ul className="lg:list-disc list-none list-outside flex lg:flex-col gap-1.5 lg:gap-0 flex-row  lg:pl-6 lg:space-y-4 text-sm font-medium justify-between">
                    {routes.map(({ path, name }) => {
                        const isDeposit = name === 'Deposit/Withdraw'
                        return (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        [
                                            'block italic text-lg text-white font-sans',
                                            isActive ? 'font-extrabold' : 'font-light opacity-30 hover:opacity-100',
                                            isDeposit ? 'leading-none' : '',
                                        ].join(' ')
                                    }
                                >
                                    {isDeposit ? (
                                        <>
                                            DEPOSIT/<br />WITHDRAW
                                        </>
                                    ) : (
                                        name.toUpperCase()
                                    )}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
    )
}

export default NavMenu;