import { Controller, type Control } from "react-hook-form";
import { Input } from "../../../components/ui/input";
type RHFInputProps = {
  name: string;
  level: string;
  control: Control<any>;
  placeholder?: string;
  type?: "text" | "number";
};
const RHFInput = ({
  name,
  level,
  control,
  placeholder,
  type = "text",
}: RHFInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <h3 className="text-black text-sm mb-0.5 ml-0.5">{level}</h3>
          <Input
            {...field}
            type={type}
            value={field.value || ""}
            placeholder={placeholder}
            className={fieldState.invalid ? "border-red-500" : ""}
          />
          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState?.error?.message}</p>
          )}
        </div>
      )}
    />
  );
};
export default RHFInput;
