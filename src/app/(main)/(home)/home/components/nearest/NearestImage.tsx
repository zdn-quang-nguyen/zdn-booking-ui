import { DEFAULT_IMAGES } from '@/constants/constant';
import Image from 'next/image';
import Link from 'next/link';

type NearestImageProps = {
  sportField: SportField;
};
const NearestImage = ({ sportField }: NearestImageProps) => {
  const img = sportField.sportFieldImages?.[0]?.url ?? DEFAULT_IMAGES[0];
  return (
    <Link
      href={`/field-reservation/${sportField.id}`}
      className="group relative mx-auto block h-card-md w-full cursor-pointer overflow-hidden rounded-large"
    >
      <Image src={img} alt={sportField.name} fill />
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-primary-600/55 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <div className="rounded-full bg-white p-4">
          <Image
            src="/icons/external-link-primary.svg"
            alt="location icon"
            width={20}
            height={20}
          />
        </div>
        <div
          title={sportField.name ?? 'Đang cập nhật'}
          className="body-4 absolute bottom-6 flex w-[85%] flex-row justify-between gap-1 truncate rounded-large bg-white px-3 py-2 text-center font-medium text-primary-600 xl:gap-2"
        >
          <p className="flex-grow overflow-hidden">
            {sportField.name ?? 'Đang cập nhật'}
          </p>
          {sportField.distanceMeters && (
            <p className="body-4 flex items-center justify-center gap-1 xl:gap-2">
              <p className="">|</p>
              {sportField.distanceMeters
                ? `${Math.round((sportField.distanceMeters / 1000) * 100) / 100} km`
                : 'Chưa cập nhật'}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
export default NearestImage;
