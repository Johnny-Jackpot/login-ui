'use client';

import {FormEvent, useEffect, useState} from "react";
import axios from "axios";

export default function MockToggle({
  initialMock
}: { initialMock: boolean }) {
  const [mock, setMock] = useState(initialMock);
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    debugger;
    const target = e.target as HTMLInputElement;
    axios.post('/api/mock-qencode-api', {
      mock: target.checked
    }).then(response => {
      setMock(response.data.mock);
    });
  }

  return (
    <div className='fixed right-6 bottom-6 text-lg text-orange-700 font-bold '>
      <label htmlFor="mock" className='pr-2'>Mock API response if no credentials:</label>
      <input id='mock' type="checkbox" checked={mock} onChange={handleChange} className='w-5 h-5 cursor-pointer'/>
    </div>
  );
}
