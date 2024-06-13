import { Button, DatePicker } from "antd";
import Test from "./test";
import Calendar from "@/components/calendar/Calendar";
import Pagination from "@/components/pagination/Pagination";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Calendar />
      {/* <Pagination /> */}
    </main>
  );
}
