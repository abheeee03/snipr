  export default function Logo(props: {
    size: "sm" | "lg"
  }) {
    return (
      <div 
      style={{
        width: props.size == "sm" ? "32px" : "40px",
      }}
      className="bg-blue-600 px-2 py-2 rounded-md">
      <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.61 98.39">
    <defs>
    </defs>
    <g id="Layer_1-2" data-name="Layer 1">
      <g>
        <polygon fill="white" className="cls-1" points="56.8 49.19 28.4 98.39 85.21 98.39 113.61 49.19 56.8 49.19"/>
        <polygon fill="white" className="cls-1" points="28.4 0 0 49.19 56.8 49.19 85.21 0 28.4 0"/>
      </g>
    </g>
  </svg>
      </div>
    )
  }


