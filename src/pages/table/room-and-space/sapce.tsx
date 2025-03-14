import { SpaceTable } from "@/components/table/space-table";
import { useEffect, useState } from "react";
import { spacecolumns } from "@/components/columns/space-columns";
import { UseGetSpaceQuery } from "@/queries/table/space-table/get.spaces.query";
import { useDebounce } from "@/hooks/debounce";
import { useDebounceValue } from "@/store/debounce-store";
import AppLayout from "@/layout/dashboard-layout";

const Space = () => {
  const { debounceSpaceValue } = useDebounceValue((state) => ({
    debounceSpaceValue: state.debounceSpaceValue,
  }));

  const debounceSearchSpace = useDebounce(debounceSpaceValue, 750);

  const [allSpaces, setAllSpaces] = useState([]);

  const { data: spaces } = UseGetSpaceQuery({ search: debounceSearchSpace });

  useEffect(() => {
    if (spaces) {
      setAllSpaces(spaces.data);
    }
  }, [spaces]);

  return (
    <AppLayout className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-xl text-neutral-700">Spaces</h1>
        <p className="text-neutral-400">View and manage all your spaces</p>
      </div>
      <SpaceTable columns={spacecolumns} data={allSpaces} />
    </AppLayout>
  );
};

export default Space;
