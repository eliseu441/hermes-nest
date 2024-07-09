import { useState, useEffect } from "react";
import API from '../../api/getData/getData'
import 'react-widgets/styles.css';
import DataTable from "./Utils/table"

interface BuildContentResponse {
    descriptions: { description: string; title: string }[];
    images: { path_name: string }[];
}
interface BuildingTable {
    id: number,
    build: string,
    country: string,
    year: number
}
function SculpPage() {
    const [dataBuildings, setDataBuildings] = useState<BuildingTable[]>([]);
    const [changeModal, setChangeModal] = useState(false);
    const [loading, setLoading] = useState<number>(0); // Para armazenar um número
    const [description, setDescription] = useState<string>(''); // Para armazenar uma string
    const [title, setTitle] = useState<string>(''); // Para armazenar uma string
    const [imagesModal, setImagesModal] = useState<JSX.Element[]>([]); // Para armazenar um array de elementos JSX

    useEffect(() => {

        callApis()


    }, []);

    const callApis = async () => {

        setLoading(1)
        const res = await API.getBuildTable();
        setDataBuildings(res);

        setLoading(0)


    }
    const changeContent = async (e: boolean) => {
        setChangeModal(e)
    }


    const handleRowId = async (rowId: number) => {

        console.log('ID :', rowId);


    }







    return (
        <>
            {loading == 1 || loading == 2 ?
                <div className='loader-background' >

                    <div className="loader d-flex justify-content-center">
                        <p>{loading == 1 ? 'Loading Buildings Table' : loading == 2 ? 'Loading Build Content' : ''}</p>
                    </div>

                </div>
                : <></>}




            <div className='page-build '>
                {dataBuildings.length > 0 ?
                    //<Table dataDetails={dataBuildings} columnsDetails={columns} classTable={"tabelaLista"} searchBar='sim' />

                    <div >
                        <div className="container mx-auto py-10">
                            <DataTable dataBuildings={dataBuildings} onRowClick={handleRowId} />
                        </div>
                    </div>
                    :
                    <div >
                    </div>}



            </div>

            <div className="modal fade " id="modalBuildings" aria-labelledby="modalBuildingLabel" aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable .modal-xl ">


                    <div className="modal-content">
                        <div className="modal-header  ">
                            <div className='col-11 d-flex  justify-content-center p-0 m-0'>
                                <p className="modal-title " id="modalBuildingLabel">{title !== '' ? title : ''}</p>
                            </div>
                            <button type="button" className="btn-close" id="closeCircuito" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="col-11 d-flex justify-content-center swtch-content p-2  ">
                            <input id="checkbox_toggle" name="check" type="checkbox" className="check"
                                onChange={(e) => changeContent(e.target.checked)}   >
                            </input>

                            <div className="checkbox">
                                <label className="slide" htmlFor="checkbox_toggle ">
                                    <label className="toggle" htmlFor="checkbox_toggle"></label>
                                    <label className="text" htmlFor="checkbox_toggle" >History</label>
                                    <label className="text" htmlFor="checkbox_toggle">Images</label>
                                </label>
                            </div>
                        </div>
                        <div className={changeModal == false ? 'modal-body p-1 modal-body p-1 background' : 'modal-body p-1 modal-body p-1'}>


                            <div className={changeModal == false && loading == 0 ? 'build-information' : 'display-none'}>
                                <p>{description !== '' ? description : 'loading description...'}</p>
                            </div>
                            <div className={changeModal == true ? 'img-modal' : 'display-none'}>
                                {imagesModal ? imagesModal : <></>}
                            </div>

                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}



export default SculpPage;