import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux";
import store from "./store";
import App from './components/App/App.tsx'
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import './index.css'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <TonConnectUIProvider
            manifestUrl="https://ndeposit.app/tonconnect-manifest.json"
            actionsConfiguration=
                {{
                    twaReturnUrl: 'https://t.me/NdepositPayment_bot'
                }}
        >
            <App />
        </TonConnectUIProvider>
    </Provider>
)
