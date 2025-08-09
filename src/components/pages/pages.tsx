import Account from '../Account/Account'
import Trading from '../Trading/Trading'
import SettingsMenu from '../Settings/SettingsMenu.tsx'
import type {AppRoute} from "../../Types/Interface.tsx";

export const routes: AppRoute[] = [
    { path: '/', element: <Account />, name: 'Account' },
    { path: '/trading', element: <Trading />, name: 'Trading' },
    { path: '/settings', element: <SettingsMenu />, name: 'Settings' },
]

