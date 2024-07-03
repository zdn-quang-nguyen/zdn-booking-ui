import React from 'react';

interface ScheduleTableProps {
  bookingResponse: BookingResponse;
  labelColumns: {
    label: string;
    start: number;
    end: number;
  }[];
  labelRows: string[];
}

const ScheduleTable = (props: ScheduleTableProps) => {
  const { bookingResponse, labelColumns, labelRows } = props;
  console.log('ScheduleTable', bookingResponse, labelColumns, labelRows);
  return (
    <div>
      <table className="overflow-x-scroll">
        <thead>
          <tr className="min-h-10">
            <th className="absolute min-h-10 min-w-24"></th>
            <th
              className="min-w-24"
              style={{
                border: 'none',
              }}
            ></th>
            {labelColumns.map((labelColumn) => (
              <th
                className="body-3 min-w-48 font-medium"
                key={labelColumn.label}
              >
                {labelColumn.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labelRows.map((labelRow) => (
            <tr key={labelRow}>
              <td className="body-3 absolute w-24 truncate bg-white font-medium">
                {labelRow}
              </td>
              <td
                className="min-w-24 border-none"
                style={{
                  border: 'none',
                }}
              ></td>
              {labelColumns.map((labelColumn) => {
                // const booking = isTimeSlotBooked(
                //   labelColumn.start,
                //   labelColumn.end,
                //   date,
                // );
                return (
                  <td>a</td>
                  // <td
                  //   key={labelColumn.label + startWeek.toDateString()}
                  //   className={
                  //     isPastSlot(date, column.label.split('-')[1])
                  //       ? styles.pastSlot
                  //       : status === CheckStatus.UNCHECKED_BOOKING && booking
                  //         ? styles.checkedBooking
                  //         : status === CheckStatus.CHECKED_BOOKING && !booking
                  //           ? styles.uncheckedBooking
                  //           : ''
                  //   }
                  // >
                  //   <Tooltip
                  //     title={
                  //       booking ? (
                  //         <>
                  //           <div className="font-bold">Name:</div>
                  //           <div>{booking.fullName}</div>
                  //           <div className="font-bold">Phone:</div>
                  //           <div>{booking.phone}</div>
                  //           <div className="font-bold">Start:</div>
                  //           <div>
                  //             {new Date(booking.startTime).toLocaleString()}
                  //           </div>
                  //           <div className="font-bold">End:</div>
                  //           <div>
                  //             {new Date(booking.endTime).toLocaleString()}
                  //           </div>
                  //         </>
                  //       ) : (
                  //         ''
                  //       )
                  //     }
                  //     color={'green'}
                  //     key={'green'}
                  //   >
                  //     <input
                  //       data-id={booking?.id}
                  //       data-date={date}
                  //       data-time={column.label}
                  //       type="checkbox"
                  //       defaultChecked={!!booking}
                  //       onChange={(e) => handleCheckboxChange(e)}
                  //       disabled={
                  //         isPastSlot(date, column.label.split('-')[1]) ||
                  //         (status === CheckStatus.UNCHECKED_BOOKING &&
                  //           !!booking) ||
                  //         (status === CheckStatus.CHECKED_BOOKING && !booking)
                  //       }
                  //     />
                  //   </Tooltip>
                  // </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
