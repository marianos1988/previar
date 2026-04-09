
import "../styles/Spinner.css"

export default function Spinner({ state }) {

  return (
    <div className={(state) ? "spinner-dots" : ""}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

