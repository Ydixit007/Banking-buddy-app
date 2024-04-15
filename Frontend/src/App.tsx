import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './routes/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
