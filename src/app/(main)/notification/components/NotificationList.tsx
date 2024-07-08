'use client';

import useFetchNotifications from '@/hooks/useNotifications';
import {
  addTimezone,
  cn,
  groupNotificationsByDay,
  timeAgo,
} from '@/libs/utils';
import { Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const NotificationList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = searchParams.get('page') ?? 1;
  const size = 6;

  const { isLoading, notifications, totalPage } = useFetchNotifications({
    page: Number(page),
    size,
  });

  if (!notifications) {
    return null;
  }
  const groupedNotifications: Record<string, NotificationType[]> =
    groupNotificationsByDay(notifications);
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}` as any);
  };
  return (
    <div>
      {isLoading ? (
        <span className="body-3 font-normal text-natural-400">
          Vui lòng chờ ...
        </span>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {groupedNotifications &&
              Object.entries(groupedNotifications).map(
                ([date, notifications]) => (
                  <div key={date} className="flex flex-col gap-5">
                    <span className="body-2 font-bold text-natural-700">
                      {date}
                    </span>
                    <div className="flex flex-col gap-6">
                      {notifications.map((notification) => (
                        <section key={notification.id}>
                          <div className="flex items-center gap-5">
                            <h4
                              className={cn(
                                'body-4 truncate font-bold',
                                notification.isRead && 'text-natural-400',
                              )}
                            >
                              {notification.title}
                            </h4>
                            <span className="truncate text-xs text-primary-600">
                              {timeAgo(
                                addTimezone(new Date(notification.updatedAt)),
                              )}
                            </span>
                          </div>
                          <div>
                            <span className="truncate text-xs text-natural-500">
                              {notification.description}
                            </span>
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                ),
              )}
          </div>
          <div className="mt-8 flex items-center justify-center">
            <Pagination
              defaultCurrent={+page}
              total={totalPage * size}
              pageSize={size}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default NotificationList;
