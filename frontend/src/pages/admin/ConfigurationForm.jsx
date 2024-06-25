import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import reserveAPI from "../../api/api";

const ConfigurationForm = () => {
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
        method: "PUT",
        route: "/product",
        data: formValues,
      });

      if (res) {
        toast.success("Limit was updated successfully!");
        navigate("/products");
      }
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto space-y-14 max-w-4xl">
      <div className="text-center space-y-4">
        <h1>Configurations</h1>
      </div>

      <div className="rounded-md bg-white shadow-md p-5">
        <form className="space-y-4" onSubmit={register}>
          <div className="grid gap-4">
            <Input
              type="number"
              name="limit"
              label="Limit"
              required
              mandatory={true}
              placeholder="20"
            />
          </div>

          <Button type="submit" text="Update" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default ConfigurationForm;
