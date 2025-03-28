import Search from "@/assets/search-copy.svg";
import AddOrder from "../popup-table/order-table/add-order";

const NoOrder = () => {
  return (
    <section className="flex flex-col items-center h-full w-full justify-center">
      <div className="flex justify-center items-center">
        <img src={Search} alt="search image" className="w-80 h-96" />
      </div>

      <AddOrder />
      <h1 className="text-6xl text-neutral-600 pt-16">No Orders</h1>
      <p className="text-neutral-400">click on add order</p>
    </section>
  );
};

export default NoOrder;
