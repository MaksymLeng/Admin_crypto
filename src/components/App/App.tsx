import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from '../pages/pages'
import NavMenu from "../NavMenu/NavMenu.tsx";
import {useTelegramUser} from "../../hooks/useTelegramUser.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {
    applyReferral, clearRefCandidate,
    fetchDepositHistory,
    fetchUserData,
    setRefCandidate,
    setTelegramUser
} from '../../store/userSlice.ts';
import {fetchApiKey} from "../../store/apiKeySlice.ts";

const App = () => {
    const tgUser = useTelegramUser();
    const dispatch = useAppDispatch();
    const { key } = useAppSelector((state) => state.apiKey);
    const {userData, refCandidate } = useAppSelector((s) => s.user);

    const userId = tgUser?.id ?? null;
    const startParam = tgUser?.startParam ?? null;

    useEffect(() => {
        if(userId) {
            dispatch(fetchApiKey(String(userId)));
        }
    }, []);

    useEffect(() => {
        if (startParam) {
            dispatch(setRefCandidate(startParam));
        }
    }, [dispatch, startParam]);

    useEffect(() => {
        if (tgUser && key !== '') {
            dispatch(setTelegramUser(tgUser));
            dispatch(fetchUserData({
                telegramUser: tgUser, 
                apiKey: key
            }));
        }
    }, [dispatch, key, tgUser]);

    useEffect(() => {
        if(userId && key !== '') {
            dispatch(fetchDepositHistory({userId, apiKey: key}));
        }
    }, [dispatch, key, userId]);

    useEffect(() => {
        if (userData?.id && key && !userData.invitedBy && refCandidate) {
            dispatch(applyReferral({ userId: Number(userData.id), ref: refCandidate, apiKey: key }))
                .finally(() => dispatch(clearRefCandidate()));
        }
    }, [dispatch, key, userData?.id, userData?.invitedBy, refCandidate]);

  return (
      <Router>
          <div className="fixed inset-0 bg-linear-120 lg:overflow-hidden from-[#70139f] from-20% via-[#79156b] via-30% to-[#340575] to-80% overflow-auto">
              <div className="flex h-full w-full">
                  <NavMenu />
                  <main className="lg:ml-64 px-3 md:px-6 py-6 w-full text-white">
                      <Routes>
                          {routes.map(({ path, element }) => (
                              <Route key={path} path={path} element={element} />
                          ))}
                      </Routes>
                  </main>
              </div>
          </div>
      </Router>
  )
}

export default App
