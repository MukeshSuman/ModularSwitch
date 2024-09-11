import React, { useState } from 'react';
import { modularItems } from '../../constants';
// type ComponentName = 'Socket' | 'TouchFan' | 'Touch4Switch' | 'Touch2Switch' | 'Switch2' | 'MiniMCB' | 'Switch' | 'Indicator';

interface ComponentFormData {
  componentName: string;
  label: string;
}

interface ComponentFormProps {
  onSubmit: (data: ComponentFormData) => void;
}

const ComponentForm: React.FC<ComponentFormProps> = ({ onSubmit }) => {
  const [componentName, setComponentName] = useState<string>('Socket');
  const [label, setLabel] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ componentName, label });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="componentName" className="block text-sm font-medium text-gray-700">Component Type</label>
        <select
          id="componentName"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value as string)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {modularItems.map((option) => {
            return <option value={option.name}>{option.name}</option>
          })}
        </select>
      </div>
      <div>
        <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
        Submit
      </button>
    </form>
  );
};

export default ComponentForm;