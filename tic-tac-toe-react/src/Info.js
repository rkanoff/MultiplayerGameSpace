// Importing the css for the info
import "./css/info.css";

const Info = ({player1, player2}) => {
	
	return (
		<div className="info">
			<div className="player">{player1}: X</div>
			<div className="player">{player2}: O</div>
		</div>
	)
}

export default Info;
