import { NavLink } from 'react-router-dom'
import { routes } from '../pages/pages'
import Logo from '../../assets/N.svg'

const NavMenu = () => {
    return (
        <aside className="fixed top-0 left-0 h-full w-60 bg-black/30 text-white flex flex-col items-center py-6 z-50 backdrop-blur-sm">
            <img src={Logo} alt="Logo" className="w-12 h-12 mb-6" />

            <div className="w-full px-5">
                <hr className="text-[#B886F9] opacity-40 shadow-lg mb-6" />

                <ul className="font-primary list-disc list-outside pl-6 space-y-4 text-sm font-medium">
                    {routes.map(({ path, name }) => {
                        const isDeposit = name === 'Deposit/Withdraw'
                        return (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        [
                                            'block italic text-lg text-white',
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