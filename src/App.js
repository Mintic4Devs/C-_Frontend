import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/Project";

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
                <Route exact path="/project">
                    <Project/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;