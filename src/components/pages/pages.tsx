import Account from '../Account/Account'
import Trading from '../Trading/Trading'
import DepositMenu from '../DepositMenu/DepositMenu'
import Extra from '../Extra/Extra'
import type {AppRoute} from "../../Types/Interface.tsx";

export const routes: AppRoute[] = [
    { path: '/', element: <Account />, name: 'Account' },
    { path: '/trading', element: <Trading />, name: 'Trading' },
    { path: '/deposit', element: <DepositMenu />, name: 'Deposit/Withdraw' },
    { path: '/extra', element: <Extra />, name: 'Extra' },
]

