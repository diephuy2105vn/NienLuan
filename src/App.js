import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes } from "./routes/index";
import DefaultLayout from "./components/layouts/DefaultLayout";
import AuthUserContext from "./contexts/AuthUserContext";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useContext, useEffect, useState } from "react";
import { getCart } from "./reduxs/cart";
import instance from "./axios";
function App() {
    const [routes, setRoutes] = useState(publicRoutes);
    const [cookies, setCookie] = useCookies("token");
    const { user, setUser } = useContext(AuthUserContext);
    const dispatch = useDispatch();
    useEffect(() => {
        if (cookies.accessToken) {
            instance
                .post("/auth/refresh")
                .then((res) => {
                    setUser(res.data.user);
                    setCookie("accessToken", res.data.accessToken);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    useEffect(() => {
        if (user) {
            user.role === 1 ? setRoutes(privateRoutes) : setRoutes(adminRoutes);
            dispatch(getCart(user._id));
        } else {
            setRoutes(publicRoutes);
        }
    }, [user]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {
                        const Layouts = DefaultLayout;
                        const Page = route.element;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layouts>
                                        <Page />
                                    </Layouts>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
