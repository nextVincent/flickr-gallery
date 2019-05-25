import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GalleryItem from '../GalleryItem'

export default class Gallery extends Component {
    static defaultProps = {
        columns: 3,
        items: [],
        showNext: true,
        nextPage: () => {}
    };

    static propTypes = {
        columns: PropTypes.number.isRequired,
        items: PropTypes.array.isRequired,
        showNext: PropTypes.bool,
        nextPage: PropTypes.func.isRequired
    };

    onLoadMore = (e) => {
        e.preventDefault();
        this.props.nextPage();
    }

    render() {

        const {items, showNext, columns} = this.props;
        const columnsQueue = {}, masonry = [];
        //Spilit into differernt column grid
        for (let i = 0; i < columns; i++) {
            columnsQueue[`column${i}`] = [];
        }
        //put items into each grid
        items.forEach((item, i) => {
            const columnIndex = i % columns;
            columnsQueue[`column${columnIndex}`].push(
                <div className="masonry-item" key={`${columnIndex}-${i}`}>
                  {
                  <GalleryItem 
                      title={item.title}
                      link={item.link}
                      author={item.author}
                      authorId={item.author_id}
                      media={item.media}
                      publish={item.published}
                      tags={item.tags}
                   />
                  }
                </div>
            );
        })
        //put three column dom into one dom
        for (let i = 0; i < columns; i++) {
            masonry.push(
                <div key={i} className={'masonry-column' + (i === 0 ? ' first' :'')}>
                    {columnsQueue[`column${i}`]}
                </div>
            );
        }

        return (
            <section className={'gallery' + (items.length > 0 ? '' : ' noItem')}>
                <div className="container">
                    {
                        items.length > 0 ? 
                        <React.Fragment>
                            <div className="masonry-wrapper">
                            {masonry}
                            </div>
                            <div className="loadmore">
                                {
                                    showNext && <button onClick={this.onLoadMore}>Load More</button>
                                }
                            </div>
                        </React.Fragment>
                         : <div className="msg-noItem">Opps, No Results Found. Try Again.</div>
                    }
                    
                </div>
            </section>
        )
    }
}