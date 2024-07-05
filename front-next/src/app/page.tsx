
"use client";
import Image from 'next/image';
import React, { useState, useEffect } from "react";
//import Preloader from "../../layout/preLoader/PreLoader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Main.css';
import moldura from './img/moldura_final-removebg-preview.png';
import pergaminho from './img/pergaminho.png';
import { createBrowserHistory } from 'history';
import Link from 'next/link';

interface Settings {
    dots: boolean;
    dotsClass: string;
    infinite: boolean;
    slidesToShow: number;
    slidesToScroll: number;
}

const Main = () => {
    const [expandIntro, setExpandIntro] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        
            // Supondo que createBrowserHistory seja uma função que você precisa chamar
            const history = createBrowserHistory();
            // Agora voc pode usar o objeto history aqui
        

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    const settings: Settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const nextImage = (side: number): void => {
        console.log(side);
        const passSlide: HTMLElement | null = side === 1 ? document.querySelector(".slick-next") : document.querySelector(".slick-prev");
        passSlide?.click();
    };

    const redirect = (): void => {
        const goPage: HTMLElement | null = document.querySelector(".slick-current .imgSlider");
        goPage?.click();
    };

    return (
        <>

            <div className="page-home" data-aos="zoom-in" >
                <div className="button-right" onClick={e => nextImage(1)}></div>
                <div className="button-left" onClick={e => nextImage(2)}></div>

                <div className="header" >
                    <div className='hide-intro' onClick={e => setExpandIntro(!expandIntro)} style={{ display: expandIntro == true ? 'none' : 'flex' }}>
                        <p>This project was designed as an experience for people who wanted to see and understand a little more about the great painters, buildings and sculptors who have passed through our history, the navigation is a tour guided by the options you choose, so i recommend that you select other paths from this home page again after find the end.</p>
                    </div>
                    <Image src={pergaminho} alt="Example" onClick={e => setExpandIntro(!expandIntro)} className={expandIntro ? 'info-intro' : ' expandido'} />
                </div>


                <div className="row frame-intro ">

                    <div >
                        <div className="redirectarea" onClick={e => redirect()}></div>
                        <div className="slider-container">
                            <Slider {...settings}>

                                <Link href="/paintings" >
                                    <div className='imgSlider slide1 '>
                                        <h1 className='imgTitle d-flex justify-content-center align-items-center'>PAINTINGS</h1>
                                    </div>
                                </Link>
                                <Link href="/paintings" >
                                    <div className='imgSlider slide2 '>
                                        <h1 className='imgTitle d-flex justify-content-center align-items-center'>BUILDINGS</h1>
                                    </div>
                                </Link>
                                <Link href="/paintings" >
                                    <div className='imgSlider slide3 '>
                                        <h1 className='imgTitle d-flex justify-content-center align-items-center'>CENTURYS</h1>
                                    </div>
                                </Link>
                                <Link href="/paintings" >
                                    <div className='imgSlider slide4 '>
                                        <h1 className='imgTitle d-flex justify-content-center align-items-center'>SCULPTURES</h1>
                                    </div>
                                </Link>
                                <Link href="/paintings" >
                                    <div className='imgSlider slide5 '>
                                        <h1 className='imgTitle d-flex justify-content-center align-items-center'>ARTISTS</h1>
                                    </div>
                                </Link>
                            </Slider>
                        </div>
                        <Image src={moldura} alt="." className="moldura-h" />
                      


                    </div>



                </div>

            </div>


        </>
    );
};

export default Main;