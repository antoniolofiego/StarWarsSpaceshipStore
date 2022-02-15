import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const defaultToastMessage = {
  loading: 'Loading...',
  success: 'Data fetched successfully',
  error: (err) =>
    err?.response?.data?.msg ?? 'Something is wrong, please try again',
};

export const useWithToast = (
  swr,
  { runCondition = true, ...customMessages } = {}
) => {
  const { data, error } = swr;

  const toastStatus = useRef(data ? 'done' : 'idle');

  const toastMessage = {
    ...defaultToastMessage,
    ...customMessages,
  };

  useEffect(() => {
    if (!runCondition) return;
    if (error) {
      if (toastStatus.current === 'done') return;
      toast.error(toastMessage.error, {
        id: toastStatus.current,
      });
      toastStatus.current = 'done';
    } else if (data) {
      if (toastStatus.current === 'done') return;
      toast.success(toastMessage.success, {
        id: toastStatus.current,
      });
      toastStatus.current = 'done';
    } else {
      toastStatus.current = toast.loading(toastMessage.loading);
    }

    return () => {
      toast.dismiss(toastStatus.current);
    };
  }, [
    swr,
    data,
    error,
    runCondition,
    toastMessage.error,
    toastMessage.loading,
    toastMessage.success,
  ]);

  return { ...swr, isLoading: data ? false : true };
};
