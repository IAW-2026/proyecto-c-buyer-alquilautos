"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/components/shared/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function ReservasPagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />;
}
