import React, { useState, useEffect } from 'react';
import './styles.css';

const PptComponent = ({ url }) => {

    const [isVisible, setIsVisible] = useState(true);
    const slides = [
        { content: <div style={{height:"100%",width:"100%",minWidth:"100%",flexDirection:"row",borderWidth:4,alignContent:"center",justifyContent:"center",backgroundColor:"red",flex:1,alignItems:"center"}}><h2 style={{textAlign:"center",borderWidth:4,borderColor:"cyan",backgroundColor:"green"}}>Welcome to my website</h2><p>This is a mimic of windows Desktop.</p></div> },
        { content: <div style={{borderWidth:4,backgroundColor:"red",flex:1}}><h2>Windows Desktop Mimic</h2><p>This app is made with ReactJs + vite.js.</p></div> },
        { content: <div><h2>Many things to do</h2><p>There are some apps implemented, so just check them out.</p></div> },
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const goToNextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const goToPreviousSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };
    // Control visibility of slide content to prevent fading in/out too quickly
    useEffect(() => {
        setIsVisible(x => !x);  // Start by hiding the content of the current slide
        const timer = setTimeout(() => {
            setIsVisible(x => true);  // Show the next slide content after 500ms (fade-out duration)
        }, 500);  // Matches the fade-out duration

        return () => clearTimeout(timer);  // Clean up timer on unmount
    }, [currentSlide]);
    return (
        <div className="window-pptx-content">
            <div
                className={`presentation-content ${isVisible ? 'visible' : ''}`}
                style={{
                    //transform: `translateX(-${currentSlide * 100}%)`,
                    //transition: 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.8s ease-in-out',
                }}
            >
                {slides[currentSlide].content}
            </div>
            <div className="navigation-buttons">
                <button onClick={goToPreviousSlide} disabled={currentSlide === 0}>Previous</button>
                <button onClick={goToNextSlide} disabled={currentSlide === slides.length - 1}>Next</button>
            </div>
        </div>
    );
};

export default PptComponent;
