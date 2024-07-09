import API from '../Api';
class pageEdit {
    getPaintersCombo = async () => {

        try {
            const response = await API.get(`/getPaintersCombo`);

            if (response.status === 200) {
                const data = response.data;
                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }

    };
    getAllArts = async (id:number) => {

        try {
            const response = await API.get(`/getAllArts/${id}`);

            if (response.status === 200) {
                const data = response.data;
                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }

    };
    getBuildTable = async () => {

        try {
            const response = await API.get(`/getBuildTable`);

            if (response.status === 200) {
                const data = response.data;
                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }

    };
    getBuildingDetails = async (id_build:number) => {

        try {
            const response = await API.get(`/getBuildingDetails/${id_build}`);

            if (response.status === 200) {
                const data = response.data;
                return data;
            }

            return [];

        } catch (err) {
            throw err;
        }

    };
    
    

}

export default new pageEdit();