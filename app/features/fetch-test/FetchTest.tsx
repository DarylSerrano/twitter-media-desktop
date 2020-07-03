import React, { useEffect, useState } from 'react';

type Response = {
  status: number;
  data: string;
};

const FetchTest = () => {
  const [resposeData, setResposeData] = useState<Response | null>(null);

  async function fetchUserData() {
    const response = await fetch('http://localhost:4200/api/test');
    setResposeData((await response.json()) as Response);
  }

  useEffect(() => {
    fetchUserData();
  });

  if (!resposeData) {
    return <p>Wait</p>;
  }

  return <p>{JSON.stringify(resposeData)}</p>;
};

export default FetchTest;
