"use client";
import React, { useState, useEffect } from "react";
import API from '../../api/getData/getData'
import { DropdownList } from 'react-widgets';
import 'react-widgets/styles.css';

import napoleon from '/img/sidebar_napoleao.png';

interface PageProps {
    // props aqui caso necessario
}

const PaintPage: React.FC<PageProps> = () => {
    const [indexes, setIndexes] = useState<number[]>([8, 7, 6, 5, 4, 3]);
    const [sidebar, setSidebar] = useState<boolean>(false);
    const [comboAuthor, setComboAuthor] = useState<any[]>([]);
    const [paints, setPaints] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        callApis(1)
    }, []);

    const callApis = async (id_author: number): Promise<void> => {
        setLoading(true);
        setPage(1); // Reset page to 1 before API calls
        const pageIndexes: number[][] = [
            [8, 9, 7, 6, 5, 4],
            [7, 8, 9, 7, 6, 5],
            [6, 7, 8, 9, 7, 6],
            [5, 6, 7, 8, 9, 7],
            [4, 5, 6, 7, 8, 9],
            [3, 4, 5, 6, 7, 8],
        ];

        if (page >= 0 && page <= pageIndexes.length + 1) {
            const newIndexValues = pageIndexes[page - 1];
            for (let i = 0; i < indexes.length; i++) {
                setIndexes(newIndexValues)
            }
        }
        let paints = await API.getAllArts(id_author).then(e => {
            console.log(e)
            setPaints(e)

        }).catch(console.error)
        let combo = await API.getPaintersCombo().then(e => {
            console.log(e)
            setComboAuthor(e)

        }).catch(console.error)

        setLoading(false);
    };






    const changePage = async (side: number) => {
        if (page > 1 && page < paints.length && side == 1) {
            await setPage(page - 1)


            const arrayIndexes = [
                [4, 5, 6, 7, 8, 9],
                [5, 6, 7, 8, 9, 3],
                [6, 7, 8, 9, 4, 3],
                [7, 8, 9, 5, 4, 3],
                [8, 9, 6, 5, 4, 3],
                [8, 7, 6, 5, 4, 3],


            ];

            const pageIndexes = arrayIndexes.reverse();

            if (page >= 2 && page <= pageIndexes.length + 1) {
                const newIndexValues = pageIndexes[page - 1];

                for (let i = 0; i < pageIndexes.length; i++) {
                    setIndexes(newIndexValues);
                }
            }




        } if (page > -1 && page < paints.length - 1 && side == 2) {
            await setPage(page + 1);
            const pageIndexes = [
                [8, 9, 7, 6, 5, 4],
                [7, 8, 9, 7, 6, 5],
                [6, 7, 8, 9, 7, 6],
                [5, 6, 7, 8, 9, 7],
                [4, 5, 6, 7, 8, 9],
                [3, 4, 5, 6, 7, 8],
            ];

            if (page >= 0 && page <= pageIndexes.length + 1) {
                const newIndexValues = pageIndexes[page - 1];
                for (let i = 0; i < indexes.length; i++) {
                    setIndexes(newIndexValues)
                }
            }

        }
    }

    return (
        <>


{loading == true ?
                <div className='loader-background' >
                    <div className="loader d-flex justify-content-center">
                    <p>Loading Images</p>
                    </div>

                </div>
                : <></>
            }
            <div className='paint-page '>

                <img src={napoleon} alt="." width='100' className={sidebar == false ? "logo-sidebar-authors" : "logo-sidebar-authors logo-expanded"} onClick={e => setSidebar(!sidebar)} />

                <div className={sidebar == false ? "sidebar-authors-border" : "sidebar-authors-border side-expanded-background-paint"}>
                </div>
                <div className={sidebar == false ? "sidebar-authors" : "sidebar-authors side-expanded"}>
                    <div className='choose-author'>
                        <p>author    </p>
                        {sidebar == true ?
                            <DropdownList
                                defaultValue="SANDRO BOTICELLI"
                                data={comboAuthor ? comboAuthor : ['']}
                                dataKey='id'
                                textField='name'
                                onChange={e => callApis(e.id)}
                            />
                            : <></>}
                    </div>
                </div>
                <div className="row col-12 d-flex justify-content-center">
                    <div className='dropdown-mobile col-7'>
                        <DropdownList
                            defaultValue="SANDRO BOTICELLI"
                            data={comboAuthor ? comboAuthor : ['']}
                            dataKey='id'
                            textField='name'
                            onChange={e => callApis(e.id)}
                        />
                    </div>


                    <div className="book-cover">
                        <div className="book">
                            <label htmlFor="page-1" className="book__page page-1 page_format" onClick={e => changePage(1)}>
                                <div className="page__content">
                                    <h2 className="page__content-author mt-4">PICTURE BOOK BY:<br></br> {paints.length > 1 ? paints[0].name : 'SANDRO BOTICELLI'}</h2>

                                    <p className="page__content-credits">
                                        Instructions:
                                        <span className='mt-4'>2- Click on book sheet to see the next image</span>
                                        <span className='mt-2'>3- you can filter artists by clicking on napoleon</span>
                                    </p>
                                </div>
                            </label>





                            {paints[1] ? <label className={page > 1 ? "book__page page-2 next-page" : "book__page page-2"} style={{ zIndex: indexes[1] }} >
                                <div className={page < 2 ? "book__page-front2 page_format" : "book__page-front page_format prev-page"}>
                                    <div>
                                        <img src={paints.length > 2 ? `/images/paintings/${paints[0].file_name}` : ''} width='100' className='book-img' />
                                        <p className="book-author">{paints.length > 2 ? `${paints[0].paint_name}` : ''}</p>
                                    </div>
                                </div>
                                <div className="book__page-back2 page_format">
                                    <div>
                                        <img src={paints.length > 2 ? `/images/paintings/${paints[1].file_name}` : ''} width='100' className='book-img col-12' />
                                        <p className="book-author">{paints.length > 2 ? `${paints[1].paint_name}` : ''}</p>
                                    </div>

                                </div>
                            </label> : <></>}
                            <label className={page > 2 ? "book__page page-2 next-page" : "book__page page-2"} style={{ zIndex: indexes[2] }} >
                                <div className={page < 3 ? "book__page-front2 page_format" : "book__page-front page_format prev-page"}>
                                    <div>
                                        <img src={paints.length > 2 ? `/images/paintings/${paints[2].file_name}` : ''} width='100' className='book-img col-12' />
                                        <p className="book-author">{paints.length > 2 ? `${paints[2].paint_name}` : ''}</p>
                                    </div>
                                </div>
                                <div className="book__page-back2 page_format">
                                    <div>
                                        <img src={paints.length > 2 ? `/images/paintings/${paints[3].file_name}` : ''} width='100' className='book-img col-12' />
                                        <p className="book-author">{paints.length > 2 ? `${paints[3].paint_name}` : ''}</p>
                                    </div>

                                </div>
                            </label>: <></>
                            {paints[5] ? <label className={page > 3 ? "book__page page-2 next-page" : "book__page page-2"} style={{ zIndex: indexes[3] }} >
                                <div className={page < 4 ? "book__page-front2 page_format" : "book__page-front page_format prev-page"}>
                                    <div>
                                        <img src={paints.length > 2 ? `/images/paintings/${paints[4].file_name}` : ''} width='100' className='book-img col-12' />
                                        <p className="book-author">{paints.length > 2 ? `${paints[4].paint_name}` : ''}</p>
                                    </div>
                                </div>
                                <div className="book__page-back2 page_format">
                                    <div>
                                        <img src={paints.length > 2 ? `/images/paintings/${paints[5].file_name}` : ''} width='100' className='book-img col-12' />
                                        <p className="book-author">{paints.length > 2 ? `${paints[5].paint_name}` : ''}</p>
                                    </div>

                                </div>
                            </label> : <></>}








                            <label htmlFor="page-5" onClick={e => changePage(2)} className="book__page page-3 page_format" style={{ zIndex: -1 }}>
                                <p className="page__content-credits">

                                    <span className='m-3'>At the moment these are all the paintings we have relating to this artist.</span>
                                </p>
                            </label>




                        </div>



                    </div>
                </div>
            </div>

        </>
    )
}

export default PaintPage;