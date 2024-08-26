import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reserveAPI from "../../api/api";
import { headers } from "../../data/data.json";
import { SearchBar } from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import Popover from "../../components/common/Popover";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const CustomerTable = () => {
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCustomerList = async () => {
      setLoading(true)
      try {
        const args = {
          method: "GET",
          route: "/customer",
        };

        const res = await reserveAPI(args);

        if (res && res.customers) {
          setCustomerList(res.customers);
        }
      } catch (error) {
        console.error("Error fetching customer list:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchCustomerList();
  }, []);

  return (
    <>
      {!loading && customerList.length < 1 ? (
        <div className="flex items-center min-h-[70vh] text-center justify-center">
          <div className="space-y-4">
            <h1>No customers found!</h1>
            <p>
              It looks like you haven&rsquo;t registered any customers yet.
              Register new customers to view them here.
            </p>
            <div>
              <Link to={"/"}>
                <Button
                  text="Register Customer"
                  className="max-w-max mx-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto space-y-14 max-w-4xl">
          <div className="text-center space-y-4">
            <h1>List of Customers</h1>
          </div>

          <div className="p-5 mx-auto bg-white rounded-md shadow-md max-w-6xl">
            <div className="grid items-center grid-cols-1 xl:grid-cols-2 gap-3 mb-5">
              <h2>Customers</h2>
              <SearchBar />
            </div>

            <div className="overflow-x-auto -mx-5">
              <table className="w-full whitespace-nowrap border-b">
                <thead className="text-left bg-slate-100 text-slate-500">
                  <tr className="border-y border-slate-200">
                    {headers.map((heading, idx) => {
                      return (
                        <th
                          key={idx}
                          className="px-3.5 py-2.5 font-semibold capitalize"
                        >
                          {heading}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y border-slate-200">
                  {customerList.map((customer, idx) => (
                    <tr key={idx}>
                      {/* <td className="px-3.5 py-2.5">
                        {idx < 10 ? `0${idx + 1}` : idx + 1}
                      </td> */}
                      <td className="px-3.5 py-2.5 capitalize">
                        {customer.name}
                      </td>
                      <td className="px-3.5 py-2.5">{customer.email}</td>
                      <td className="px-3.5 py-2.5 capitalize">
                        {customer.address}
                      </td>
                      <td className="px-3.5 py-2.5">{customer.nationalId}</td>
                      <td className="px-3.5 py-2.5">{customer.age}</td>
                      <td className="px-3.5 py-2.5">{customer.phoneNo}</td>
                      <td className="px-3.5 py-2.5">
                        <Popover id={customer._id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-center mt-5 md:flex-row">
              <div className="mb-4 grow md:mb-0">
                <p className="text-slate-500">
                  Showing <b>10</b> of <b>19</b> Results
                </p>
              </div>
              <ul className="flex flex-wrap items-center gap-2 shrink-0">
                <li>
                  <a
                    href="#!"
                    className="inline-flex items-center justify-center h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 text-slate-500 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-500 [&.active]:text-blue-500 [&.active]:bg-blue-50 [&.active]:border-blue-50 [&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 [&.disabled]:cursor-auto"
                  >
                    <IoChevronBackOutline className="mr-1" />
                    Prev
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="inline-flex items-center justify-center size-8 transition-all duration-150 ease-linear border rounded border-slate-200 text-slate-500 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-500 [&.active]:text-blue-500 [&.active]:bg-blue-50 [&.active]:border-blue-50 [&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 [&.disabled]:cursor-auto"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="inline-flex items-center justify-center size-8 transition-all duration-150 ease-linear border rounded border-slate-200 text-slate-500 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-500 [&.active]:text-blue-500 [&.active]:bg-blue-50 [&.active]:border-blue-50 [&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 [&.disabled]:cursor-auto active"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="inline-flex items-center justify-center size-8 transition-all duration-150 ease-linear border rounded border-slate-200 text-slate-500 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-500 [&.active]:text-blue-500 [&.active]:bg-blue-50 [&.active]:border-blue-50 [&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 [&.disabled]:cursor-auto"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    className="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 focus:bg-blue-50 dark:focus:bg-blue-500/10 focus:text-blue-500 dark:focus:text-blue-500 [&.active]:text-blue-500 dark:[&.active]:text-blue-500 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-500/10 [&.active]:border-blue-50 dark:[&.active]:border-blue-500/10 [&.active]:hover:text-blue-700 dark:[&.active]:hover:text-blue-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto"
                  >
                    Next
                    <IoChevronForwardOutline className="ml-1" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerTable;
