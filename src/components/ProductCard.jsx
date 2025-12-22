import React from 'react';

export default function ProductCard({ title, description, image, price }) {
    return (
        <div className="card">
            <div className="card-image">
                {image ? (
                    <img src={image} alt={title} />
                ) : (
                    <div className="placeholder-image">{title[0]}</div>
                )}
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-desc">{description}</p>
                <div className="card-footer">
                    <span className="price">{price}</span>
                    <button className="btn btn-secondary">Details</button>
                </div>
            </div>

        </div>
    );
}
