import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const requestRide = async (pickup: string, destination: string) => {
  const response = await axios.post(`${BASE_URL}/ride/request`, {
    pickup,
    destination
  });
  return response.data;
};

export const triggerSafetyEvent = async (tripId: string, eventType: string) => {
  const response = await axios.post(`${BASE_URL}/ride/safety-event`, {
    tripId,
    eventType
  });
  return response.data;
};

export const getAlertStatus = async (tripId?: string) => {
  const url = tripId
    ? `${BASE_URL}/ride/status?tripId=${tripId}`
    : `${BASE_URL}/ride/status`;
  const response = await axios.get(url);
  return response.data;
};
