import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import reserveAPI from "../../api/api";
import { headers } from "../../data/data.json";
import { SearchBar } from "../../components/common/SearchBar";
import Button from "../../components/common/Button";
import Popover from "../../components/common/Popover";

const CustomerTable = () => {
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    const fetchCustomerList = async () => {
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
      }
    };

    fetchCustomerList();
  }, []);

  return (
    <>
      {customerList.length < 1 ? (
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
        <div className="p-5 mx-auto bg-white rounded-md shadow-md max-w-6xl">
          <div className="grid items-center grid-cols-1 xl:grid-cols-2 gap-3 mb-5">
            <h2>Customers</h2>
            <SearchBar />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
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
                    <td className="px-3.5 py-2.5">
                      {idx < 10 ? `0${idx + 1}` : idx + 1}
                    </td>
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
                      <Popover id={customer._id}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerTable;
