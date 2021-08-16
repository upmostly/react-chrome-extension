import React, { useState } from 'react';
import classes from '../App.module.css';

const Image = (props) => {
	return(
		<>
			<img className={classes.metadataImage} src={props.url} width={props.width} height={props.height} />
		</>
	);
};

export default Image;

