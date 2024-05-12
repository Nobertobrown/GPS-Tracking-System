import { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    setLoading(true);
    console.log(e);
  };

  return (
    <div>
      <div className="mx-auto space-y-14 max-w-4xl">
        <div className="text-center space-y-4">
          <h1>Registration Portal</h1>
        </div>

        <div className="rounded-md bg-white shadow-md p-4">
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
                name={`email`}
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
                mandatory={true}
                type="number"
                name={`age`}
                label="Age"
                placeholder="Your age in years"
                className="w-full"
                min="1"
              />
            </div>

            <Button type="submit" text="Add member" loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
};
