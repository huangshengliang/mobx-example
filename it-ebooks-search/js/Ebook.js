import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

class Ebook extends Component {
    render() {
        let { id, title, subtitle, description, image, isbn } = this.props;
        return (
            <div className="book-item">
                <Link to={`/${id}`} className="book-image-link">
                    <img className="book-image" src={image} title={title} alt=""/>
                </Link>
                <div className="book-info">
                    <Link to={`/${id}`} className="book-title">
                        <span>{title}</span>
                    </Link>
                    <p className="book-subtitle">{subtitle}</p>
                    <p className="book-desc">{description}</p>
                </div>
            </div>
        );
    }
}

export default Ebook;
