import { Controller, type Control } from "react-hook-form";
import { Input } from "../../../components/ui/input";
type RHFInputProps = {
  name: string;
  control: Control<any>;
  placeholder?: string;
};
const RHFInput = ({ name, control, placeholder }: RHFInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Input
            {...field}
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
