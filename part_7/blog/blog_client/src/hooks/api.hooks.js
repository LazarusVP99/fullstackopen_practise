import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { NotificationContext } from '../context/notification.context';

const baseUrl = directory => `/api/${directory}`;

export const useGetAllDataQuery = (key, options) => {
  const { showNotification } = useContext(NotificationContext);
  const queryFn = async () => (await axios.get(baseUrl(key))).data;

  const { data, isLoading } = useQuery({
    queryKey: [key],
    queryFn,
    refetchInterval: 5000,
    onError: error => {
      showNotification('error', error.response.data.error);
    },
    ...options,
  });

  return { data, isLoading };
};

export const useGetDataQuery = (key, id, options) => {
  const { showNotification } = useContext(NotificationContext);
  const queryFn = async () => (await axios.get(baseUrl(`${key}/${id}`))).data;

  const { data, isLoading } = useQuery({
    queryKey: [key, id],
    queryFn,
    onError: error => {
      showNotification('error', error.response.data.error);
    },
    enabled: !!id,
    ...options,
  });

  return { data, isLoading };
};
