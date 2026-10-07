import axios from "axios";
import type { CreateJobApplication, JobApplication } from "../types/JobApplication";

// URL til backend API-endepunkt
const endpoint = "http://localhost:5100/api/JobApplications"

// Henter alle søknader fra databasen
const getAllApplications = async (): Promise<JobApplication[]> => {
    const response = await axios.get(endpoint);
    return response.data;
}

// Henter basert på id
const getApplicationById = async (id: number): Promise<JobApplication> => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
}

// Oppretter jobbsøknad
const createApplication = async (application: CreateJobApplication): Promise<JobApplication> => {
    const response = await axios.post(endpoint, application);

    // Backend returnerer den lagrede søknaden, inludert id som databasen har generert
    return response.data;
}

const deleteApplication = async (id: number): Promise<void> => {
    await axios.delete(`${endpoint}/${id}`);
}

// Endrer en eksisterende søknad
const updateApplication = async (application: JobApplication): Promise<void> => {
    await axios.put(`${endpoint}/${application.id}`, application)
}


export default { getAllApplications, getApplicationById, createApplication, deleteApplication, updateApplication }