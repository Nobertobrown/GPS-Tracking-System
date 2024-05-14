import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import reserveAPI from "../../api/api"

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);

    formData.forEach((value, key) => {
      if (value !== "") {
        formValues[key] = value.toLocaleLowerCase();
      }
    });

    try {
      const res = await reserveAPI({
        method: "POST",
        route: "/customer",
        data: formValues,
      });

      if (res && res.customer) {
        toast.success("Customer created successfully!");
        navigate("/customers");
      }
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto space-y-14 max-w-4xl">
        <div className="text-center space-y-4">
          <h1>Registration Portal</h1>
        </div>

        <div className="rounded-md bg-white shadow-md p-5">
          <form className="space-y-4" onSubmit={register}>
            <div className="grid lg:grid-cols-2 gap-4">
              <Input
                name="name"
                label="Name"
                required
                mandatory={true}
                placeholder="John Doe"
              />

              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
              />

              <Input
                type="number"
                name="nida"
                label="National ID"
                required
                mandatory={true}
                placeholder="19720202654560000456"
              />

              <Input
                required
                label="Phone Number"
                type="tel"
                name="phoneNo"
                placeholder="+255123456789"
              />

              <Input
                required
                mandatory={true}
                type="number"
                name="age"
                label="Age"
                placeholder="Your age in years"
                className="w-full"
                min="1"
              />

              <Input
                name="address"
                label="Physical Address"
                required
                mandatory={true}
                placeholder="123 Main St"
              />
            </div>

            <Button type="submit" text="Add member" loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;