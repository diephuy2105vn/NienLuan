import { BrowserRouter, Routes, Route } from "react-router-dom";
import publicRoutes from "./routes/index";
import DefaultLayout from "./components/layouts/DefaultLayout";
import AuthUserContext from "./contexts/AuthUserContext";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useContext, useEffect } from "react";
import { getCart } from "./reduxs/cart";
import instance from "./axios";
function App() {
    const [cookies, setCookie] = useCookies("token");
    const { _user, setUser } = useContext(AuthUserContext);
    const dispatch = useDispatch();
    useEffect(() => {
        if (cookies.accessToken) {
            instance
                .post("/auth/refresh")
                .then((res) => {
                    setUser(res.data.user);
                    setCookie("accessToken", res.data.accessToken);
                    dispatch(getCart(res.data.user._id));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, index) => {
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
