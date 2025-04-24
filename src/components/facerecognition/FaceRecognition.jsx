import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageUrl }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} height='auto' width='500px' />
				<div className='bounding-box' style={{top: box.topRow, right: box.rightColumn, bottom: box.bottomRow, left: box.leftColumn}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;