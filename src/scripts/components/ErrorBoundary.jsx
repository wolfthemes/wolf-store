import { Component } from 'react';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='wolf-store-error'>
					Something went wrong loading this content.
				</div>
			);
		}
		return this.props.children;
	}
}
