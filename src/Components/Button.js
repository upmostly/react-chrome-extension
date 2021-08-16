import React, { useState } from 'react';
import classes from '../App.module.css';

const Bookmark = () => {
	return(
		<svg style={{ marginLeft: '2px' }} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15 19L8 14L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19Z" stroke="#8E8E93" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	)
}

const Tag = () => {
	return(
		<svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M19.59 12.41L12.42 19.58C12.2343 19.766 12.0137 19.9135 11.7709 20.0141C11.5281 20.1148 11.2678 20.1666 11.005 20.1666C10.7422 20.1666 10.4819 20.1148 10.2391 20.0141C9.99632 19.9135 9.77575 19.766 9.59 19.58L1 11V1H11L19.59 9.59C19.9625 9.96473 20.1716 10.4716 20.1716 11C20.1716 11.5284 19.9625 12.0353 19.59 12.41V12.41Z" stroke="#8E8E93" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	)
}

const Plus = () => {
	return(
		<svg style={{ marginTop: '2px', marginRight: '-6px' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="10"></circle>
			<line x1="12" y1="8" x2="12" y2="16"></line>
			<line x1="8" y1="12" x2="16" y2="12"></line>
		</svg>
	)
}

const Button = (props) => {

	let svg;
	if(props.icon == 'tag') {
		svg = <Tag />
	}else if(props.icon == 'bookmark'){
		svg = <Bookmark />
	}else if(props.icon == 'plus'){
		svg = <Plus />
	}

	let selected = 'slate-button-selected';

	const saveIt = (e) => {
		e.preventDefault();
		window.postMessage({ type: "SAVE_LINK", url: props.data.url }, "*");
	}

	return(
		<>
			<div
				onClick={saveIt}
				className={classes.modalButtonMain}
				style={{ display: 'table', width: '100%' }}
			>
				<div style={{ display: 'table-cell', paddingLeft: '14px', paddingTop: '6px' }}>
					{svg}
				</div>
				<div style={{ display: 'table-cell', left: '0px', marginBotton: '8px' }}>
					{props.text}
				</div>
				{/*
				<div>
					{props.shortcut}
				</div>
				*/}
			</div>
		</>
	);
};

export default Button;

