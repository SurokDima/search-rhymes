"use client";

import { Combobox, Loader, MantineSize, TextInput, rem, useCombobox } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";

export type AutocompleteProps = {
  selectFirstOption?: boolean;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  size?: MantineSize;
  fetchOptions: (query: string) => Promise<string[]>;
  onError?: (error: Error) => void;
  renderOption?: (value: string) => Promise<JSX.Element>;
  onChange?: (value: string) => void;
};

export const AsyncAutocomplete: FC<AutocompleteProps> = ({
  selectFirstOption,
  placeholder,
  label,
  fetchOptions: getOptions,
  defaultValue,
  size,
  onChange,
  renderOption = (value) => value,
  onError,
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | null>(null);
  const [value, setValue] = useState(defaultValue ?? "");
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchOptions = useDebouncedCallback((query: string) => {
    setLoading(true);
    setError(null);

    getOptions(query)
      .then((result) => {
        setData(result);
        setEmpty(result.length === 0);
      })
      .catch((error) => {
        if (error.message === "Request aborted") return;
        setError(error);
        onError?.(error);
      })
      .finally(() => setLoading(false));
  }, 500);

  const options = (data || []).map((item) => (
    <Combobox.Option value={item} key={item} active={value === item}>
      {renderOption(item)}
    </Combobox.Option>
  ));

  useEffect(() => {
    if (!selectFirstOption) return;
    // we need to wait for options to render before we can select first one
    combobox.selectFirstOption();
  }, [combobox, value, selectFirstOption]);

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        onChange?.(optionValue);
        combobox.closeDropdown();
      }}
      width="target"
      size={size}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label={label}
          size={size}
          placeholder={placeholder}
          value={value}
          error={error ? "Failed to fetch options" : false}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            fetchOptions(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
            if (data === null) {
              fetchOptions(value);
            }
          }}
          className="w-full"
          onBlur={() => combobox.closeDropdown()}
          leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          rightSection={loading ? <Loader size={18} /> : undefined}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={data === null || !!error} style={{ zIndex: 9999999 }}>
        <Combobox.Options>
          {options}
          {empty && <Combobox.Empty>No results found</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

// export type UseAutocompleteHookProps = {
//   fetchOptions: (query: string) => Promise<string[]>;
//   onError?: (error: Error) => void;
//   onChange?: (value: string) => void;
// };

// export const useAutocomplete = ({
//   fetchOptions: getOptions,
//   onError,
//   onChange,
// }: UseAutocompleteHookProps) => {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//   });

//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState<string[] | null>(null);
//   const [value, setValue] = useState("");
//   const [isEmpty, setIsEmpty] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchOptions = useDebouncedCallback((query: string) => {
//     setLoading(true);
//     setError(null);

//     getOptions(query)
//       .then((result) => {
//         setData(result);
//         setIsEmpty(result.length === 0);
//       })
//       .catch((error) => {
//         if (error.message === "Request aborted") return;
//         setError(error);
//         onError?.(error);
//       })
//       .finally(() => setLoading(false));
//   }, 500);

//   const handleChange = (optionValue: string) => {
//     setValue(optionValue);
//     onChange?.(optionValue);
//     combobox.closeDropdown();
//   };

//   return { options: data, loading, error, isEmpty, value, handleChange };
// };
