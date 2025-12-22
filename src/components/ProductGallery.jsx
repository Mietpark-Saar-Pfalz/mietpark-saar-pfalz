import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring'; // eslint-disable-line no-unused-vars

const ProductGallery = ({ images, title }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const imageProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { mass: 1, tension: 180, friction: 12 },
        reset: true,
        key: currentImageIndex, // Trigger animation on image change
    });

    if (!images || images.length === 0) {
        return <p>Keine Bilder verfügbar.</p>;
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    return (
        <div className="gallery-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
                style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    aspectRatio: '16/9',
                    backgroundColor: '#eee',
                    cursor: 'zoom-in',
                }}
                onClick={toggleZoom}
            >
                <animated.img
                    src={images[currentImageIndex]}
                    alt={title}
                    loading="lazy"
                    style={{ ...imageProps, width: '100%', height: '100%', objectFit: 'contain' }}
                />
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >‹</button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                zIndex: 10
                            }}
                        >›</button>
                    </>
                )}
            </div>
            {images.length > 1 && (
                <div style={{ display: 'flex', gap: 'var(--spacing-xs)', marginTop: 'var(--spacing-md)', overflowX: 'auto', paddingBottom: 'var(--spacing-xs)', justifyContent: 'center' }}>
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Thumbnail ${idx}`}
                            loading="lazy"
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                            style={{
                                width: '80px',
                                height: '60px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                border: idx === currentImageIndex ? '3px solid var(--accent)' : '2px solid transparent',
                                opacity: idx === currentImageIndex ? 1 : 0.7,
                                transition: 'all 0.2s ease-in-out'
                            }}
                        />
                    ))}
                </div>
            )}

            {isZoomed && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        cursor: 'zoom-out',
                    }}
                    onClick={toggleZoom}
                >
                    <animated.img
                        src={images[currentImageIndex]}
                        alt={title}
                        style={{ ...imageProps, maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
                    />
                </div>
            )}
        </div>
    );
};

export default ProductGallery;

