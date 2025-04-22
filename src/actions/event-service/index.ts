'use server';

import { instance } from '../instance';

export type EventResponseType = {
  title: string;
  eventUuid: string;
  thumbnailUrl: string;
};

export type DetailEventResponseType = {
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  startDate: Date;
  endDate: Date;
  policy: string;
  status: string;
};

export type EventProductsType = {
  productCode: number;
};

export const getEvents = async (
  page: number,
  size: number,
): Promise<EventResponseType[]> => {
  try {
    const response = await instance.get<{ content: EventResponseType[] }>(
      `/events?status=ONGOING&page=${page}&size=${size}`,
      {
        requireAuth: false,
        revalidate: 60 * 60 * 24,
      },
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const getDetailEvent = async (
  eventUuid: string,
): Promise<DetailEventResponseType> => {
  try {
    const response = await instance.get<DetailEventResponseType>(
      `/events/${eventUuid}`,
      {
        requireAuth: false,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEventProducts = async (
  eventUuid: string,
): Promise<EventProductsType[]> => {
  try {
    const response = await instance.get<{ content: EventProductsType[] }>(
      `/events/${eventUuid}/products?size=50&page=0`,
      {
        requireAuth: false,
      },
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};
