import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBasicSalary } from '../redux/salarySlice';
import EarningsForm from '../components/EarningForm';
import SalarySummary from '../components/SalarySummary';

const Home = () => {
  const dispatch = useDispatch();
  const [basicSalary, setBasicSalaryState] = useState(0);

  const handleBasicSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const salary = Number(e.target.value);
    setBasicSalaryState(salary);
    dispatch(setBasicSalary(salary));
  };

  return (
    <div>
      <EarningsForm />
      <SalarySummary />
    </div>
  );
};

export default Home;
