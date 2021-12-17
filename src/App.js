import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Layout>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;