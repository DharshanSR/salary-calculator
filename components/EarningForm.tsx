import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBasicSalary, addEarning, addDeduction } from '../redux/salarySlice';
import resetImage from '../public/_Link.png';
import Image from 'next/image';

// Interface definitions for earnings and deductions
interface Earning {
    name: string;
    amount: number;
    epfApplicable: boolean;
}

interface Deduction {
    name: string;
    amount: number;
}

const EarningsForm = () => {
    const dispatch = useDispatch();
    const [basicSalary, setBasicSalaryState] = useState<number>(0);
    const [earnings, setEarnings] = useState<Earning[]>([{ name: '', amount: 0, epfApplicable: false }]);
    const [deductions, setDeductions] = useState<Deduction[]>([{ name: '', amount: 0 }]);

    const handleBasicSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const salary = Math.max(0, Number(e.target.value)); // Ensure non-negative
        setBasicSalaryState(salary);
        dispatch(setBasicSalary(salary));
    };

    const handleEarningChange = (index: number, field: keyof Earning, value: string | number | boolean) => {
        const newEarnings = [...earnings];
        if (field === 'amount') {
            newEarnings[index].amount = Math.max(0, Number(value)); // Ensure non-negative amount
        } else if (field === 'name') {
            newEarnings[index].name = value as string;
        } else if (field === 'epfApplicable') {
            newEarnings[index].epfApplicable = value as boolean;
        }
        setEarnings(newEarnings);
    };


    const handleDeductionChange = (index: number, field: keyof Deduction, value: string | number) => {
        const newDeductions = [...deductions];
        if (field === 'amount') {
            newDeductions[index].amount = Math.max(0, Number(value)); // Ensure non-negative amount
        } else if (field === 'name') {
            newDeductions[index].name = value as string;
        }
        setDeductions(newDeductions);
    };

    const handleAddEarning = (index: number) => {
        const earning = earnings[index];
        if (earning.name && earning.amount > 0) {
            dispatch(addEarning(earning));
            const newEarnings = [...earnings];
            newEarnings[index] = { name: '', amount: 0, epfApplicable: false };
            setEarnings(newEarnings);
        }
    };

    const handleAddDeduction = (index: number) => {
        const deduction = deductions[index];
        if (deduction.name && deduction.amount > 0) {
            dispatch(addDeduction(deduction));
            const newDeductions = [...deductions];
            newDeductions[index] = { name: '', amount: 0 };
            setDeductions(newDeductions);
        }
    };

    const handleAddNewEarning = () => {
        setEarnings([...earnings, { name: '', amount: 0, epfApplicable: false }]);
    };

    const handleAddNewDeduction = () => {
        setDeductions([...deductions, { name: '', amount: 0 }]);
    };

    const handleClearEarning = (index: number) => {
        if (earnings.length > 1) {
            const newEarnings = earnings.filter((_, i) => i !== index);
            setEarnings(newEarnings);
        } else {
            setEarnings([{ name: '', amount: 0, epfApplicable: false }]);
        }
    };

    const handleClearDeduction = (index: number) => {
        if (deductions.length > 1) {
            const newDeductions = deductions.filter((_, i) => i !== index);
            setDeductions(newDeductions);
        } else {
            setDeductions([{ name: '', amount: 0 }]);
        }
    };

    const handleResetForm = () => {
        setBasicSalaryState(0);
        setEarnings([{ name: '', amount: 0, epfApplicable: false }]);
        setDeductions([{ name: '', amount: 0 }]);
    };

    return (
        <div style={{
            width: '680px',
            height: '616px',
            position: 'absolute',
            top: '142px',
            left: '128px',
            padding: '20px',
            borderWidth: '0px 0px 0px 0px',
            borderStyle: 'solid',
            borderColor: '#E0E0E0',
            borderRadius: '10px',
            backgroundColor: '#E0E0E0',
        }}>
            <h2 className="w-52 h-8 absolute top-40 left-36 font-bold text-lg leading-8 tracking-tighter text-black">
                Calculate Your Salary
            </h2>

            <button
                className="absolute left-4 top-36 w-[67px] h-[40px] p-[8px 0px 8px 0px] gap-10 rounded-[4px 0px 0px 0px] opacity-0 flex items-center justify-center bg-transparent border-none cursor-pointer"
                onClick={handleResetForm}
            >
                <Image src={resetImage} alt="Reset" width={24} height={24} />
            </button>

            <h4>Basic Salary</h4>
            <input
                type="number"
                value={basicSalary}
                onChange={handleBasicSalaryChange}
                placeholder="Enter Basic Salary"
                className="w-400 h-56 px-15 py-12 border border-solid border-gray-300 rounded-tl-[4px] rounded-bl-[0px] opacity-0 ml-10"
                min="0"
            />


            <h4 className="w-68 h-24 font-inter font-semibold text-base leading-24 tracking-tighter">
                Earnings
            </h4>

            <p className="w-248 h-20 font-inter font-normal text-xs leading-20 text-right bg-gray-600 text-gray-300">
                This includes Allowance, Fixed Allowance, Bonus, and more.
            </p>
            {earnings.map((earning, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={earning.name}
                        onChange={(e) => handleEarningChange(index, 'name', e.target.value)}
                        placeholder="Earning Name"
                        className="flex-1 mr-4 py-2 px-3 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        value={earning.amount}
                        onChange={(e) => handleEarningChange(index, 'amount', e.target.value)}
                        placeholder="Earning Amount"
                        className="w-136 h-48 p-3 gap-2 rounded-tl-lg border-t-0 border-r-0 border-b-0 border-l border-solid border-gray-300 opacity-0 bg-white"
                        min="0"
                    />
                    <button onClick={() => handleClearEarning(index)} style={{ marginRight: '10px' }}>✖</button>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="checkbox"
                            checked={earning.epfApplicable}
                            onChange={(e) => handleEarningChange(index, 'epfApplicable', e.target.checked)}
                            style={{ marginLeft: '5px' }}
                        />
                        EPF / ETF
                    </label>
                    <button onClick={() => handleAddEarning(index)} style={{ marginLeft: '10px' }}>Add</button>
                </div>
            ))}
            <p onClick={handleAddNewEarning} style={{ cursor: 'pointer', color: 'blue' }}>+ Add new Allowance</p>

            <hr className="w-632 h-0 absolute top-558 left-152 opacity-0 border-none" />

            <h4>Deductions</h4>
            <p>Salary Advances, Loan Deductions, and more.</p>
            {deductions.map((deduction, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={deduction.name}
                        onChange={(e) => handleDeductionChange(index, 'name', e.target.value)}
                        placeholder="Deduction Name"
                        className="flex-1 mr-2 py-2 px-3 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        value={deduction.amount}
                        onChange={(e) => handleDeductionChange(index, 'amount', e.target.value)}
                        placeholder="Deduction Amount"
                        className="w-36 py-2 px-3 border border-gray-300 rounded"
                        min="0"
                    />
                    <button onClick={() => handleClearDeduction(index)} style={{ marginRight: '10px' }}>✖</button>
                    <button onClick={() => handleAddDeduction(index)} style={{ marginLeft: '10px' }}>Add</button>
                </div>
            ))}
            <p onClick={handleAddNewDeduction} style={{ cursor: 'pointer', color: 'blue' }}>+ Add new Deduction</p>
        </div>
    );
};

export default EarningsForm;
