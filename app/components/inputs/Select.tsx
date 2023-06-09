'use client';

import ReactSelect from 'react-select';

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  disabled,
}: SelectProps) {
  return (
    <div className='z-[100] flex flex-col gap-y-2'>
      <label
        className='
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        '
      >
        {label}
      </label>
      <ReactSelect
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        isMulti
        options={options}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        classNames={{
          control: () => 'text-sm',
        }}
      />
    </div>
  );
}
