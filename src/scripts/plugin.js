//import './styles/main.scss'
import React from "react";
import { createRoot } from '@wordpress/element';
import AutoBind from "auto-bind";

class WolfStore {

	constructor() {
		AutoBind(this);
		console.log( 'start' )
	}

}
new WolfStore()
