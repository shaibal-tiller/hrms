import Home from "../components/Home/Home"
import Login from "../components/Login/Login"
import Register from "../components/Login/Register"
import Module from "../components/Modules/Module"


const createRoute = (path, Element) => {
    return { path: path, element: Element }
}

export const routes = [
    createRoute('/', <Home />),
    createRoute('/register', <Register />),
    createRoute('/login', <Login />),
    createRoute('/leave', <Module title={'Leave Portal'} />),
    createRoute('/attn', <Module title={'Attendance'} />),
    createRoute('/profile', <Module title="Profile" />),
    createRoute('/requests', <Module title="Requests" />)
]