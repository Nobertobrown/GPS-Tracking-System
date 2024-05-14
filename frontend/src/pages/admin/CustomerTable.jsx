import { useEffect, useState } from "react";
import reserveAPI from "../../api/api";
import { SearchBar } from "../../components/common/SearchBar";

const CustomerTable = () => {
  const [customerList, setCustomerList] = useState([]);
  const headers = [
    "#",
    "name",
    "email",
    "address",
    "NIDA",
    "age",
    "Phone Number",
  ];

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
    <div className="p-5 mx-auto bg-white rounded-md shadow-md max-w-6xl">
      <div className="grid items-center grid-cols-1 gap-3 mb-5">
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
                <td className="px-3.5 py-2.5">{customer.name}</td>
                <td className="px-3.5 py-2.5">{customer.email}</td>
                <td className="px-3.5 py-2.5">{customer.address}</td>
                <td className="px-3.5 py-2.5">{customer.nationalId}</td>
                <td className="px-3.5 py-2.5">{customer.age}</td>
                <td className="px-3.5 py-2.5">{customer.phoneNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
