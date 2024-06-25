import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import reserveAPI from "../../api/api";

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

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
        route: "/product",
        data: formValues,
      });

      if (res && res.product) {
        toast.success("Product created successfully!");
        // navigate("/customers");
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
        <h1>Product Registration</h1>
      </div>

      <div className="rounded-md bg-white shadow-md p-5">
        <form className="space-y-4" onSubmit={register}>
          <div className="grid lg:grid-cols-2 gap-4">
            <Input
              name="uuid"
              label="UUID"
              required
              mandatory={true}
              placeholder="AD323D"
            />

            <Input
              type="number"
              name="volume"
              label="Volume"
              required
              mandatory={true}
              placeholder="20"
            />
          </div>

          <Button type="submit" text="Register" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
