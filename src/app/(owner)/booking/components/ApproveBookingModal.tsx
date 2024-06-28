//

import DatePickerComponent from '@/components/common/DatePickerComponent';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import AccentButton from '@/components/common/components/AccentButton';
import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styles from './styles/ApproveBookingModal.module.scss';
import { useState } from 'react';
import SuggestBooking from './SuggestBooking';

interface Props {
  booking: any;
  onCancel: () => void;
}

function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  const countryCode = '84';
  const mainNumber = digits;

  const formattedNumber = `(+${countryCode}) ${mainNumber.slice(0, 3)} ${mainNumber.slice(3, 6)} ${mainNumber.slice(6)}`;

  return formattedNumber;
}

const ApproveBookingModal: React.FC<Props> = ({ onCancel, booking }) => {
  const [isWarning, setIsWarning] = useState<boolean>(true);

  return (
    <div className={`${styles.modalContainer}`}>
      <div className="flex flex-row items-center justify-between py-6">
        <span className="body-1 font-bold text-natural-700">Duyệt đặt chỗ</span>
        <button className="hover:text-accent-600" onClick={onCancel}>
          <CloseOutlined style={{ fontSize: '24px' }} className="hover-spin" />
        </button>
      </div>
      <div className="mt-3 flex flex-col gap-8">
        <div className="gap flex flex-col gap-2">
          <span className="body-3 font-bold text-natural-700">
            Sân bóng Vạn Phúc
          </span>
          <p className="body-5 text-natural-500">
            12 Nguyễn Thị Nhung, Hiệp Bình Phước, Thủ Đức, Tp. Hồ Chí Minh
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-col justify-between gap-3 sm:flex-row sm:items-center ${isWarning ? styles.warning : ''}`}
          >
            <div className="flex flex-col gap-3">
              <span className="body-4 font-medium text-natural-700">Sân</span>
              <Input
                readOnly
                value={8}
                type="text"
                className="body-4 text-natural-700"
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="body-4 font-medium text-natural-700">Ngày</span>
              <DatePickerComponent
                defaultValue={booking.startTime ? booking.startTime : null}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="body-4 font-medium text-natural-700">
                Khung giờ
              </span>
              <RangePickerComponent
                defaultValue={
                  booking.startTime
                    ? [booking.startTime, booking.endTime]
                    : undefined
                }
                disabled={true}
              />
            </div>
          </div>
          {isWarning && (
            <p className="body-4 font-medium text-alerts-red">
              Sân và khung giờ đều full
            </p>
          )}
        </div>
        {isWarning && <SuggestBooking booking={booking} />}
      </div>
      <div className="flex flex-row items-center justify-between py-6">
        <div>
          <div className="flex flex-row gap-2">
            <span className="body-4 font-medium text-natural-700">Đặt sân</span>
            <p className="body-3 font-bold text-natural-700">
              {booking.fullName ? booking.fullName : 'Nguyễn Văn Quang'}
            </p>
          </div>
          <span className="body-3 font-bold text-accent-600">
            {booking.phone
              ? formatPhoneNumber(booking.phone)
              : '(+84) 965 724 322'}
          </span>
        </div>
        <div className={`flex flex-row gap-3 ${styles.customBtn}`}>
          <AccentButton
            // disabled={isWarning}
            key={0}
            label={'Hủy đặt chỗ'}
            value={'rejected'}
            isActive={false}
            onClick={onCancel}
          />

          <AccentButton
            disabled={isWarning}
            key={1}
            label={'Xác nhận'}
            value={'accepted'}
            isActive={true}
            onClick={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveBookingModal;
