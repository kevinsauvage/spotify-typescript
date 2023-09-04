import { enpointBaseUrl, fetchHelper } from '.';

const expointTrack = `${enpointBaseUrl}/tracks`;
const endpointAudioAnalysis = `${enpointBaseUrl}/audio-analysis`;
const endpointAudioFeatures = `${enpointBaseUrl}/audio-features`;

export const getTrack = async (id: string) => fetchHelper(`${expointTrack}/${id}`);
export const getAudioAnalysis = async (id: string) => fetchHelper(`${endpointAudioAnalysis}/${id}`);
export const getAudioFeatures = async (id: string) => fetchHelper(`${endpointAudioFeatures}/${id}`);
