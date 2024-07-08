import { getUnreadNotificationsCount } from '@/libs/api/notification.api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export type NotificationFilterType = {
  page?: number;
  size?: number;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const useUnreadNotificationCount = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await getUnreadNotificationsCount();

        if (response) {
          setCount(+response);
        }
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    let eventSource: EventSource;
    if (userId) {
      eventSource = new EventSource(
        `${API_HOST}/notification/events?userId=${session?.user?.id}`,
      );
      eventSource.onmessage = ({ data }) => {
        setCount((prev) => prev + 1);
      };
    }
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [userId]);

  return { count, setCount, isLoading, error };
};
export default useUnreadNotificationCount;
