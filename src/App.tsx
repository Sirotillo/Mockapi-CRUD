import { useRoutes } from "react-router-dom"
import About from "./pages/about"

const App = () => {
  return (
    <div>
      {
        useRoutes([
          {path:"/", element:<About/>},
          {path:"/about", element:<About/>},
        ])
      }
    </div>
  )
}

export default App