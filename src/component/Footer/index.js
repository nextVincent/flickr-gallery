import React, { PureComponent } from 'react';

export default class Footer extends PureComponent {
    render() {
        return (
            <footer>
                <div className="container">
                    <p className="centerized">All copyrights belong to Flickr. This is a react practice based on Flickr public feed API.</p>
                </div>
            </footer>
        )
    }
}