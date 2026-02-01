import { Controller, type Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

type Option = {
  label: string;
  value: string;
};

type RHFSelectProps = {
  name: string;
  label: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
};

const RHFSelect = ({
  name,
  label,
  control,
  options,
  placeholder,
}: RHFSelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="max-w-full">
          <h3 className="text-black text-sm mb-0.5 ml-0.5">{label}</h3>

          <Select value={field.value || ""} onValueChange={field.onChange}>
            <SelectTrigger
              className={fieldState.invalid ? "border-red-500" : ""}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default RHFSelect;
