import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from '../pages/pages'
import NavMenu from "../NavMenu/NavMenu.tsx";
import {useTelegramUser} from "../../hooks/useTelegramUser.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchUserData, setTelegramUser} from '../../store/userSlice.ts';
import {fetchApiKey} from "../../store/apiKeySlice.ts";

const App = () => {
    const tgUser = useTelegramUser();
    const dispatch = useAppDispatch();
    const { key } = useAppSelector((state) => state.apiKey);
    
    useEffect(() => {
        if(tgUser) {
            dispatch(fetchApiKey(tgUser.id.toString()));
        }
    }, [dispatch, tgUser]);

    useEffect(() => {
        if (tgUser) {
            dispatch(setTelegramUser(tgUser));
            dispatch(fetchUserData({
                telegramUser: tgUser, 
                apiKey: key
            }));
        }
    }, [dispatch, key, tgUser]);

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
