import { useState, useEffect } from "react";
import API from '../../api/getData/getData'
import { DropdownList } from 'react-widgets';
import 'react-widgets/styles.css';
import cesar from '/layout/sculp/cesar_boust_nobackground.png';
import Slider from "react-slick";

function SculpPage() {
    const [author, setAuthor] = useState("MICHELANGELO");
    const [loading, setLoading] = useState(false);
    const [comboSculp, setComboSculp] = useState<any[]>([]);
    const [sidebar, setSidebar] = useState(false);
    const [slides, setSlides] = useState<JSX.Element[]>([]);



    useEffect(() => {
        callApis(10, 'MICHELANGELO')
    }, []);



    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const nextImage = (side: number) => {
        console.log(side)
        const passSlide: HTMLElement | null = side === 1 ? document.querySelector(".slick-next") : document.querySelector(".slick-prev");
        passSlide?.click();
    }
    const callApis = async (id_author: number, name: string) => {
        setLoading(true);
        setAuthor(name);
        let paints = await API.getSculpCarousel(id_author).then(res => {
            console.log(res);
            let slidesFinal: JSX.Element[] = []; // Explicitly type slidesFinal as an array of JSX.Element
            let contadorSlides = 0;
            for (let el of res) {
                console.log(el);
                // Since slidesFinal is an array of JSX.Element, you should directly push new elements into it
                slidesFinal.push(<img src={`/images/sculptures/${el.file_name}`} alt={`${el.id_index}`} />);
                console.log(slides);
                contadorSlides++;
            }
            setSlides(slidesFinal);

        }).catch(console.error);
        let combo = await API.getSculptorsCombo().then(e => {
            console.log(e);
            setComboSculp(e)

        }).catch(console.error)
        setLoading(false);
        console.log(slides);
    };




    return (
        <>
            <div className='page-sculptures '>
        <div className="main">
            <div className="d1"></div>
            <div className="d2"></div>
            <div className="d3"></div>
            <div className="d4"></div>
        </div >
            {loading == true ?

                <div className='loader-background' >

                    <div className="loader d-flex justify-content-center">
                        <p>{loading ? 'Loading Sculptures' : ''}</p>
                    </div>

                </div>
                : <>


                    <div className='slide-cesar'>


                        <div className={sidebar == false ? "header-cesar " : "header-cesar side-expanded-background"} >
                            <p data-aos="fade-left" data-aos-duration="2000" >Sculptures are one of the most realistic ways we have for visualizing someone, just like Cesar bust there have been many others throughout history, below you will see a list of them. Clicking on Cesar bust you you will have access to search filters.</p>
                            <img src={cesar} className="logo-header-cesar" onClick={e => setSidebar(!sidebar)} data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="1500" />
                            <div className='combo-sidebar '>
                                <p >Author:</p>
                                {sidebar == true && loading == false && comboSculp.length > 1 ?
                                    <DropdownList
                                        defaultValue=""
                                        data={comboSculp.length > 0 ? comboSculp : ['']}
                                        dataKey='id'
                                        textField='name'
                                        value={author}
                                        onChange={e => callApis(e.id, e.name)}
                                    />
                                    : <></>}
                            </div>
                        </div>
                        <div className="dropdown-mobile">
                            <div className='combo-sidebar col-12 '>
                                <p >Author:</p>  <DropdownList
                                    defaultValue=""
                                    data={comboSculp.length > 0 ? comboSculp : ['']}
                                    dataKey='id'
                                    textField='name'
                                    value={author}
                                    onChange={e => callApis(e.id, e.name)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='page-sculp'>
                        <div className='carousel' data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="1500">


                            {slides && loading == false ?

                                <div  >
                                    <div className="button-right" onClick={e => nextImage(1)}></div>
                                    <div className="button-left" onClick={e => nextImage(2)}></div>
                                    <p className='culpTitle'>{author}</p>
                                    <div className="slider-container">
                                        <Slider {...settings}>

                                            {slides}
                                        </Slider>
                                    </div>
                                </div>
                                : <></>}
                        </div>
                    </div>



                </>}
                </div>

        </>
    )
}

export default SculpPage;