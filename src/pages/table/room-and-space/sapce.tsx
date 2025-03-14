import { SpaceTable } from "@/components/table/space-table";
import { useEffect, useState } from "react";
import { spacecolumns } from "@/components/columns/space-columns";
import { UseGetSpaceQuery } from "@/queries/table/space-table/get-spaces-query";
import { useDebounce } from "@/hooks/debounce";
import { useDebounceValue } from "@/store/debounce-store";

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
    <div className="flex">
      <div className="w-full space-y-6 p-8">
        <div className="">
          <h1 className="text-xl">Space</h1>
          <p className="text-sm text-gray-600">
            View and manage all your spaces
          </p>
        </div>

        <SpaceTable columns={spacecolumns} data={allSpaces} />
      </div>
    </div>
  );
};

export default Space;
