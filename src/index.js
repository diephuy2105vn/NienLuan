import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configStore from "./reduxs/config";
import App from "./App";
import { AuthUserProvider } from "./contexts/AuthUserContext";
import { CookiesProvider } from "react-cookie";
import GlobalStyle from "./components/GlobalStyles";
import reportWebVitals from "./reportWebVitals";
const store = configStore;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <CookiesProvider>
        <AuthUserProvider>
            <Provider store={store}>
                <GlobalStyle>
                    <App />
                </GlobalStyle>
            </Provider>
        </AuthUserProvider>
    </CookiesProvider>
);
reportWebVitals();
