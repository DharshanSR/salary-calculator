import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SalarySummary = () => {
    const { basicSalary, earnings, deductions } = useSelector((state: RootState) => state.salary);

    // Calculate total earnings excluding deductions
    const totalEarnings = earnings.reduce((total, earning) => total + earning.amount, basicSalary);

    // Calculate total earnings for EPF purposes
    const totalEarningsForEPF = basicSalary + earnings.filter(e => e.epfApplicable).reduce((total, earning) => total + earning.amount, 0);

    // Calculate total deductions
    const totalDeductions = deductions.reduce((total, deduction) => total + deduction.amount, 0);

    // Calculate gross earnings (excluding deductions)
    const grossEarnings = totalEarnings - totalDeductions;

    // Calculate gross salary for EPF purposes
    const grossSalaryForEPF = totalEarningsForEPF - totalDeductions;

    // Calculate employee EPF
    const employeeEPF = grossSalaryForEPF * 0.08;

    // Calculate employer EPF and ETF
    const employerEPF = grossSalaryForEPF * 0.12;
    const employerETF = grossSalaryForEPF * 0.03;

    // Calculate APIT (Assuming 18% tax and a constant deduction)
    const APIT = (grossEarnings * 0.18) - 25500;

    // Calculate net salary
    const netSalary = grossEarnings - employeeEPF - APIT;

    // Calculate cost to company
    const costToCompany = grossEarnings + employerEPF + employerETF;

    return (
        <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            width: '480px',
            height: '614px',
            position: 'absolute', // Added relative positioning
            top: '142px',
            left: '832px',
            borderWidth: '2px 2px 2px 2px',
            borderStyle: 'solid',
            borderColor: '#E0E0E0',
            marginLeft: '40px'
        }}>
            <h4 className="w-[110px] h-[32px] absolute top-[24px] left-[24px] font-inter font-bold text-[40px] leading-[32px] tracking-[-0.02px]">
                Your Salary
            </h4>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginTop: '60px' }}> {/* Added margin-top */}
                <p><strong>Items</strong></p>
                <p><strong>Amount</strong></p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0.5' }}>
                <p>Basic Salary</p>
                <p>{basicSalary.toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0.5' }}>
                <p>Gross Earnings</p>
                <p>{grossEarnings.toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0.5' }}>
                <p>Gross Deduction</p>
                <p>- {totalDeductions.toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0.5' }}>
                <p>Employee EPF (8%)</p>
                <p>- {employeeEPF.toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0.5' }}>
                <p>APIT</p>
                <p>- {APIT.toFixed(2)}</p>
            </div>
            <div style={{ width: '480px', display: 'flex', justifyContent: 'space-between', border: '2px solid #000', borderRadius: '5px', marginTop: '20px', lineHeight: '0.5', backgroundColor: '#f9f9f9' }}>
                <p><strong>Net Salary (Take Home)</strong></p>
                <p><strong>{netSalary.toFixed(2)}</strong></p>
            </div>
            <hr style={{ margin: '20px 0' }} />
            <div>
                <p style={{ marginBottom: '10px', color: '#666' }}><strong>Contribution from the Employer</strong></p>
                <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0.5' }}>
                    <p>Employer EPF (12%)</p>
                    <p>{employerEPF.toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0.5' }}>
                    <p>Employer ETF (3%)</p>
                    <p>{employerETF.toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', lineHeight: '0.5' }}>
                    <p><strong>CTC (Cost to Company)</strong></p>
                    <p><strong>{costToCompany.toFixed(2)}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default SalarySummary;
