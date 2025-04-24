import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className='br2 shadow-2 tilt'>
				<div className='pa3'>
					<img className='image' alt='brain' src={brain} />
				</div>
		    </Tilt>
	    </div>
	);
}

export default Logo;