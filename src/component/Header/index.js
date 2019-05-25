import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SearchForm from '../SearchForm';

export default class Header extends PureComponent {
    static defaultProps = {
        submit: () => {}
    };

    static propTypes = {
        submit: PropTypes.func.isRequired
    };

    render() {
        return (
            <header>
                <div className="container">
                    <a className="header-logo" href="http://www.flickr.com" target="_blank" rel="noopener noreferrer"><img src="https://cdn2.techadvisor.co.uk/cmsdata/features/3637023/flickr-thumb_thumb800.png" alt="Flickr" /></a>
                    <SearchForm submit={this.props.submit}/>
                </div>
            </header>
        )
    }
}