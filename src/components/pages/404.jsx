import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <h3>
        404 <br />
        <mark>
          <i>
            <Link to="/">Back to home</Link>
          </i>
        </mark>
      </h3>
    </div>
  )
}

export default Page404