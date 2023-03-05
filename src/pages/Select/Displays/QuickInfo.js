import "./quickInfo.css";

export default function QuickInfo(props) {
  return (
    <div className="quickInfo">
      {" "}
      <img className="imageDisplay" src={props.pic} />
      <div className="singleInfoRow">{props.name}</div>
      <div className="doubleInfoRow">
        <div className="doubleBox">{props.info1}</div>
        <div className="item" />
        <div className="doubleBox">{props.info2}</div>
      </div>
      <div className="hrTag" />
      <div className="doubleInfoRow">
        <div className="doubleBox">{props.info3}</div>
        <div className="item" />
        <div className="doubleBox">{props.info4}</div>
      </div>
    </div>
  );
}
