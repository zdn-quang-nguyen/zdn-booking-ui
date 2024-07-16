//
'use client';

import DatePickerComponent from '@/components/common/DatePickerComponent';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import AccentButton from '@/components/common/components/AccentButton';
import { CloseOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import styles from './styles/ApproveBookingModal.module.scss';
import { use, useEffect, useState } from 'react';
import SuggestBooking from './SuggestBooking';
import moment from 'moment';
import {
  updateBooking as callUpdate,
  getAvailableField,
} from '../../apis/booking.api';
import { mutate } from 'swr';
interface Props {
  booking: any;
  onCancel: () => void;
}

function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '').slice(1);

  const mainNumber = digits;

  const formattedNumber = `${0} ${mainNumber.slice(0, 3)} ${mainNumber.slice(3, 6)} ${mainNumber.slice(6)}`;

  return formattedNumber;
}

const ApproveBookingModal: React.FC<Props> = ({ onCancel, booking }) => {
  const [updateBooking, setUpdateBooking] = useState(booking);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fields, setFields] = useState<any[]>([]);

  const handleClick = (value: any) => {
    setUpdateBooking((prevState: any) => {
      return {
        ...prevState,
        fieldId: value[0],
      };
    });

    setUpdateBooking((prevState: any) => ({
      ...prevState,
      field: {
        ...prevState.field,
        name: value[1],
      },
    }));

    setIsWarning(false);
  };

  const acceptBooking = async () => {
    setIsLoading(true);
    const data = {
      fieldId: updateBooking.fieldId,
      status: 'accepted',
    };
    const res = await callUpdate(data, updateBooking.id);
    if (res.statusCode === 200) {
      setIsLoading(false);
      onCancel();
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/booking/owner?'),
      );
      message.success(res.message);
    } else {
      message.error(res.message);
      setIsLoading(false);
      onCancel();
    }
  };

  const rejectBooking = async () => {
    setIsLoading(true);
    const data = {
      status: 'rejected',
    };
    const res = await callUpdate(data, updateBooking.id);
    if (res.statusCode === 200) {
      setIsLoading(false);
      onCancel();
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/booking/owner?'),
      );
      message.success(res.message);
    } else {
      message.error(res.message);
      setIsLoading(false);
      onCancel();
    }
  };

  useEffect(() => {
    const fetchFields = async () => {
      const res = await getAvailableField(
        booking.field.sportField.id,
        booking.startTime,
        booking.endTime,
      ).then((res) => res.data);
      let flag: boolean = false;

      res.forEach((field: any) => {
        if (field.id === booking.fieldId) {
          flag = true;
        }
      });
      if (flag) {
        setIsWarning(false);
        setIsLoading(false);
      } else {
        setIsWarning(true);
        setIsLoading(false);
        setFields(res);
      }
    };

    fetchFields();
  }, []);

  return (
    <div className={`${styles.modalContainer}`}>
      <div className="flex flex-row items-center justify-between py-6">
        <span className="body-1 font-bold text-natural-700">Duyệt đặt chỗ</span>
        <button className="hover:text-accent-600" onClick={onCancel}>
          <CloseOutlined style={{ fontSize: '24px' }} className="hover-spin" />
        </button>
      </div>
      <div className="mb-10 mt-3 flex flex-col gap-8">
        <div className="gap flex flex-col gap-2">
          <span className="body-3 font-bold text-natural-700">
            {updateBooking?.field?.sportField?.name}
          </span>
          <p className="body-5 text-natural-500">
            {updateBooking?.field?.sportField?.location?.addressDetail
              ? updateBooking?.field?.sportField?.location?.addressDetail
              : 'Chưa cập nhật'}
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
                value={updateBooking?.field?.name}
                type="text"
                className="body-4 text-natural-700"
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="body-4 font-medium text-natural-700">Ngày</span>
              <DatePickerComponent
                defaultValue={
                  updateBooking.startTime
                    ? moment(updateBooking.startTime)
                        .local()
                        .format('DD/MM/YYYY')
                    : undefined
                }
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="body-4 font-medium text-natural-700">
                Khung giờ
              </span>
              <RangePickerComponent
                defaultValue={
                  updateBooking.startTime
                    ? [
                        moment(booking.startTime).local().format('HH:mm'),
                        moment(booking.endTime).local().format('HH:mm'),
                      ]
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
        {isWarning && (
          <SuggestBooking
            booking={updateBooking}
            fields={fields}
            startTime={updateBooking.startTime}
            endTime={updateBooking.endTime}
            onClick={handleClick}
          />
        )}
      </div>
      <div className="flex flex-row items-center justify-between py-6">
        <div>
          <div className="flex flex-row gap-2">
            <span className="body-4 font-medium text-natural-700">Đặt sân</span>
            <p className="body-3 font-bold text-natural-700">
              {updateBooking.fullName
                ? updateBooking.fullName
                : 'Nguyễn Văn Quang'}
            </p>
          </div>
          <span className="body-3 font-bold text-accent-600">
            {updateBooking.phone
              ? formatPhoneNumber(updateBooking.phone)
              : 'Đang cập nhật'}
          </span>
        </div>
        <div className={`flex flex-row gap-3 ${styles.customBtn}`}>
          <AccentButton
            disabled={isLoading}
            key={0}
            label={'Hủy đặt chỗ'}
            value={'rejected'}
            isActive={false}
            onClick={rejectBooking}
          />

          <AccentButton
            disabled={isWarning || isLoading}
            key={1}
            label={'Xác nhận'}
            value={'accepted'}
            isActive={true}
            onClick={acceptBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default ApproveBookingModal;
