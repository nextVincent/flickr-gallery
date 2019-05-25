import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ProgressImage from '../ProgressImage';

const TAGS_LIMIT = 3;

export default class GalleryItem extends PureComponent {
    static defaultProps = {
        title: "",
        media: {},
        publish: "",
        author: "",
        authorId: "",
        link: "",
        tags:""
    };

    static propTypes = {
        title: PropTypes.string,
        media: PropTypes.object,
        publish: PropTypes.string,
        author: PropTypes.string,
        authorId: PropTypes.string,
        link: PropTypes.string,
        tags: PropTypes.string
    };

    state = {
        shownTags: this.props.tags && this.props.tags.length > 0 ? this.props.tags.split(" ").slice(0, TAGS_LIMIT) : [],
    }

   
    displayTags = () => {
        this.setState({
            shownTags: this.props.tags.split(" ")
        })
    }

    //Get full image from _m.jpg srouce
    fullsizeImage= (thumbUrl) => {
        return thumbUrl.replace('_m.jpg', '.jpg');
    }

    //get Author Name Only
    getAuthName = (author) => {
        const matches = author.match(/\("(.*?)"\)/)
        return matches.length > 0 ? matches[1] : "Unknown Author";
    }

    getDate = (date) => {
        return  date.slice(0,10);
    }

    getTagsArray = (tags) => {
        return tags.split(" ");
    }


    render() {
        const {title, media, publish, author, link, tags} = this.props;
        const { shownTags } = this.state;
        const authorName = this.getAuthName(author);
        const date = this.getDate(publish);
        const aTags = this.getTagsArray(tags);
        const coverImg = media.m ? media.m  : 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png';
        const fullImage = media.m ? this.fullsizeImage(media.m) : 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png';
        return (
            <div className="gallery-item ">
                <ProgressImage cover={coverImg} source={fullImage}>
                    <div className="overlay-icon">
                    {link &&  <a className="centerized" href={link} alt="title" rel="noopener noreferrer" target="_blank"> <i className="fa fa-eye" aria-hidden="true"></i> </a>}
                    {publish && <p className="published-date centerized"><i className="fa fa-calendar-alt" aria-hidden="true"></i>{date}</p>}
                    </div>
                </ProgressImage>
                
                <div className="gallery-info">
                    { title && <h4>{title}</h4> }
                    { authorName && <p>By: <span>{authorName}</span></p> }
                    { shownTags.length > 0 && <ul className="tags">
                        {shownTags.map( (el,index) => <li className="tag" key={index}><span>{el}</span></li>)}
                        {aTags.length > shownTags.length && <button className="tag-more" onClick={this.displayTags}><span>{aTags.length - TAGS_LIMIT} more</span></button>}
                    </ul>}
                </div>
            </div>
        )
    }
}