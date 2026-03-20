import axios from 'axios';

const API_URL = 'http://localhost:3000/api/vesselInfos';

export interface IVesselData {
    nationality: string;
    portOfRegistry: string;
    vessel: string;
    cargo: string;
    port: string;
    portOfLoading: string;
    portOfDischarge: string;
    blWeight: string;
    blDate: Date;
    vesselArrived: Date;
    vesselBerthed: Date;
    initialSurveyCommenced: Date;
    initialSurveyCompleted: Date;
    operationCommenced: Date;
    operationCompleted: Date;
    finalSurveyCommenced: Date;
    finalSurveyCompleted: Date;
}

export interface IVesselResponse {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export type IVessel = IVesselData & IVesselResponse;

class VesselService {
    // Récupérer tous les navires
    async getAllVessels(): Promise<IVessel[]> {
        try {
            const response = await axios.get<IVessel[]>(API_URL);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Récupérer un navire par son ID
    async getVesselById(id: string): Promise<IVessel> {
        try {
            const response = await axios.get<IVessel>(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Créer un nouveau navire
    async createVessel(vesselData: IVesselData): Promise<IVessel> {
        try {
            const response = await axios.post<{ message: string; vessel: IVessel }>(API_URL, vesselData);
            return response.data.vessel;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Mettre à jour un navire
    async updateVessel(id: string, vesselData: Partial<IVesselData>): Promise<IVessel> {
        try {
            const response = await axios.put<{ message: string; vessel: IVessel }>(`${API_URL}/${id}`, vesselData);
            return response.data.vessel;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Supprimer un navire
    async deleteVessel(id: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Rechercher des navires par nom
    async searchVessels(vesselName: string): Promise<IVessel[]> {
        try {
            const response = await axios.get<IVessel[]>(`${API_URL}/search/${vesselName}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Gestion des erreurs
    private handleError(error: any): Error {
        if (axios.isAxiosError(error)) {
            // Erreur de validation ou erreur serveur
            const message = error.response?.data?.message || error.message;
            const errors = error.response?.data?.errors;

            if (errors) {
                return new Error(`${message}: ${errors.join(', ')}`);
            }
            return new Error(message);
        }
        return new Error('Une erreur inattendue est survenue');
    }
}

export const vesselService = new VesselService();
