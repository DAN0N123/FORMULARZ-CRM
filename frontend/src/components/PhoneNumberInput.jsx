import { useState } from 'react';

export default function PhoneNumberInput() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters from the input
    const cleanedValue = value.replace(/\D/g, '').slice(0, 9);

    // Group the numbers into chunks of 3 and separate with spaces or dashes
    const formattedValue = cleanedValue.replace(/(\d{3})(?=\d)/g, '$1 ');

    return formattedValue.trim(); // Trim in case there's an extra space at the end
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const formattedValue = formatPhoneNumber(value);
    setPhoneNumber(formattedValue);
  };

  return (
    <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
      <label htmlFor="phone">Numer telefonu:</label>
      <input
        type="text"
        id="phone"
        value={phoneNumber}
        onChange={handleInputChange}
        className="p-1 w-[7rem] rounded-lg focus:outline-none border-[1px] border-[#CCCCCC] text-center"
      />
    </div>
  );
}
