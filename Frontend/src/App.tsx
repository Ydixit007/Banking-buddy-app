import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/Login';
import SignUpPage from './routes/SignUpPage';
import LandingPage from './routes/LandingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

function App() {

  return (
    <div className="dark antialiased">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
