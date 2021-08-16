import React, { useState } from 'react';
import Image from '../Components/Image';
import classes from '../App.module.css';

const Metadata = (props) => {

	let count = 30;
	let title = props.title.slice(0, count) + (props.title.length > count ? "..." : "");

	const getHostname = (url) => {
	  return new URL(url).hostname;
	}

	console.log('props.image from metadata comp', props.image)

	return(
		<>
			<div className={classes.metadata}>
				<div className={classes.metadataBox}>
					<Image 
					  url={props.image}
					  width="48px"
					  height="48px" 
					/>
				</div>
	            <div className={classes.metadataBox2}>
					<div className={classes.metaDataTitle}>{title}</div>
					<div className={classes.metadataUrl}>{getHostname(props.url)}</div>
				</div>
			</div>
		</>
	);
};

export default Metadata;