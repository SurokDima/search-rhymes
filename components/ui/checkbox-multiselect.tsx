import { Checkbox, CheckboxGroup, Stack, Text } from "@mantine/core";
import { get } from "lodash-es";
import { ReactNode } from "react";
import { Control, Controller, FieldErrors, FieldPath, FieldValues } from "react-hook-form";

type Item = {
  label: ReactNode;
  value: string;
};

export type CheckboxMultiSelectFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  items: readonly Item[];
  control: Control<TFieldValues, TName>;
  errors: FieldErrors<TFieldValues>;
  name: TName;
  label?: string;
};

export function CheckboxMultiselectFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ items, control, name, label, errors }: CheckboxMultiSelectFormFieldProps<TFieldValues, TName>) {
  const error = get(errors, name);

  return (
    <Stack gap="md" w="min-content">
      <Text>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <CheckboxGroup onChange={onChange} value={value}>
              <Stack gap="sm">
                {items.map((item) => (
                  <Checkbox
                    key={item.value}
                    label={item.label}
                    // onChange={(event) => {
                    //   const checked = event.target.checked;
                    //   const values = value ?? ([] as string[]);

                    //   if (checked) {
                    //     onChange(unique([...values, item.value]));
                    //   } else {
                    //     onChange(values.filter((v) => v !== item.value));
                    //   }
                    // }}
                    // checked={(value as string[]).includes(item.value)}
                    value={item.value}
                  />
                ))}
              </Stack>
            </CheckboxGroup>
          );
        }}
      />
      {!!error?.message && (
        <Text c="red" size="xs">
          {error.message as string}
        </Text>
      )}
    </Stack>
  );
}
