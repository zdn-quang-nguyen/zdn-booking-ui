import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="body-3 mx-auto flex w-fit items-center justify-between gap-3 py-4 font-medium lg:gap-5 xl:gap-10">
      <Link className="text-natural-700 hover:text-natural-400" href="/owner">
        Kênh chủ sân
      </Link>
      <Link className="text-natural-700 hover:text-natural-400" href="#">
        {'Thông báo (12)'}
      </Link>
      <Link
        className="text-natural-700 hover:text-natural-400"
        href="/user-booking"
      >
        Đặt chỗ
      </Link>
      <Link className="text-natural-700 hover:text-natural-400" href="/profile">
        <Image
          src="/images/avt.png"
          className="rounded-xl"
          alt="avatar"
          width={44}
          height={44}
        />
      </Link>
    </div>
  );
};

export default Navbar;
