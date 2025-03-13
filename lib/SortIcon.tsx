type Icon = {
    fill?: string;
    className?: string;
    divProps?: React.DOMAttributes<HTMLDivElement>;
    width?: string;
    height?: string;
    mode?: string;
    sortId?: string;
  };
  function SortIcon({
    fill = "#ffff",
    className = "",
    divProps = {},
    width = "37px",
    height = "37px",
    sortId="idSort",
    mode = "black",
  }: Icon) {
    return (
      <div {...divProps} className={className} id={sortId}>
        {mode === "black" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={fill}
            version="1.1"
            viewBox="0 0 490 490"
            xmlSpace="preserve"
          >
            <path d="M85.877 154.014L85.877 428.309 131.706 428.309 131.706 154.014 180.497 221.213 217.584 194.27 108.792 44.46 0 194.27 37.087 221.213z"></path>
            <path d="M404.13 335.988L404.13 61.691 358.301 61.691 358.301 335.99 309.503 268.787 272.416 295.73 381.216 445.54 490 295.715 452.913 268.802z"></path>
          </svg>
        )}
  
        {mode !== "black" && <img src={"/sorticon.png"} />}
      </div>
    );
  }
  
  export default SortIcon;
  