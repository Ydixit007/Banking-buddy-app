import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/Login';
import SignUpPage from './routes/SignUpPage';

const router = createBrowserRouter([
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
