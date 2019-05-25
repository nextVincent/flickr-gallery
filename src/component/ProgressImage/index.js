import React, { PureComponent } from 'react';
import styled from 'styled-components';

const CoverImage = styled.img`
    position: relative;
    opacity: 1;
    z-index: 1;
    top: 0;
    filter: blur(50px);
    width: 100%;
    /* this is needed so Safari keeps sharp edges */
    transform: scale(1);
`;
const FullImage = styled.img`
    opacity: 0;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    transition: opacity 1s linear;
`;


export default class ProgressImage extends PureComponent {
    supportable = 'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;

    static defaultProps = {
        cover: "",
        source: "",
        description: "",
        className: ""
    };
    
    state = {
        loaded: false
    };

    imageReference = React.createRef();
    image = new Image();
    
    handleObserve = (entries, observer) => {
        const { source } = this.props;

        const filtered = entries.filter(entry => entry.intersectionRatio > 0);
        if (filtered.length > 0) {
            this.image.src = source;
            this.image.onload = () => {
               this.supportable && this.observer.unobserve(this.imageReference.current);
                this.setState({loaded: true}, () => {
                    //todo maybe invoke onfinishloading for parent
                })
                
            }
            this.image.onerror = () => {
               console.error('Image loading failed');
            }
        }
    };

    observer = this.supportable ? new IntersectionObserver(this.handleObserve, {
        root: null,
        rootMargin: "0px",
        threshold: this.props.threshold,
    }) : null;

    componentDidMount() {
        this.supportable && this.observer.observe(this.imageReference.current);
    }

    componentWillUnmount() {
        this.supportable && this.observer.unobserve(this.imageReference.current);
    }

    render() {
        const {cover, source, description} = this.props;
        const {loaded} = this.state;
        return (
            this.supportable ? 
            <figure className={'progress-image ' + (loaded ? 'done' : '')} ref={this.imageReference}>
                {cover !== "" && <CoverImage className="cover" src={cover} alt={description} />}
                {source !== "" && <FullImage className="full" ref={r => this.image = r} alt={description} />}
                <noscript className="notsupported"><img src={source} alt={description} /></noscript>
                {
                    this.props.children
                }
            </figure>
            : 
            <img src={source} alt={description} />
        )
    }
};