import { getNotifications } from '@/libs/api/notification.api';
import { useEffect, useState } from 'react';

export type NotificationFilterType = {
  page?: number;
  size?: number;
};
const useFetchNotifications = ({
  page = 1,
  size = 6,
}: NotificationFilterType) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await getNotifications({
          page,
          size,
        });
        setTotalPage(response.totalPage);
        setNotifications(response.data);
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [page, size]);

  return { notifications, isLoading, error, totalPage };
};
export default useFetchNotifications;
