import React from 'react';
import {Globals} from '../utils';

export default class LoadingIndicator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loadingIndicatorState: 'hidden'
		}
	}

	componentWillMount() {

		this._onShowLoadingIndicator = () => {
			this.setState({
				loadingIndicatorState: 'shown'
			});
		}

		this._onHideLoadingIndicator = () => {
			this.setState({
				loadingIndicatorState: 'hidden'
			});
		}

		Globals.instance().eventEmitter.on('show-loading-indicator', this._onShowLoadingIndicator);
		Globals.instance().eventEmitter.on('hide-loading-indicator', this._onHideLoadingIndicator);
	}

	

	render() {
		
	    return (
	    	<div className={'loading-indicator ' + this.state.loadingIndicatorState}>
	    		<div className='bk'>
		    		<div className='spinner'>
						<div className='rect1'></div>
						<div className='rect2'></div>
						<div className='rect3'></div>
						<div className='rect4'></div>
						<div className='rect5'></div>
					</div>
	    		</div>
	    	</div>
	      
	    );
	}

	componentWillDismount() {
		Globals.instance().eventManager.removeEventListener('show-loading-indicator', this._onShowLoadingIndicator);
		Globals.instance().eventManager.removeEventListener('hide-loading-indicator', this._onHideLoadingIndicator);
	}

}

