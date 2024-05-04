export default function calculatePersonalIncomeTax(salary, dependents, insurance) {
    // Mức lương cơ sở và mức lương tối đa để đóng BHXH, BHYT, BHTN
    const baseSalary = 1100000;
    const maxInsuranceSalary = 36000000;

    // Tính các khoản bảo hiểm và giảm trừ
    let socialInsurance = Math.min(salary, maxInsuranceSalary) * 0.08;
    let healthInsurance = Math.min(salary, maxInsuranceSalary) * 0.015;
    let unemploymentInsurance = Math.min(salary, maxInsuranceSalary) * 0.01;
    let totalInsurance = socialInsurance + healthInsurance + unemploymentInsurance * 0.04 + insurance;
    let personalDeduction = baseSalary;
    let dependentDeduction = dependents * 4400000;

    // Tính thu nhập chịu thuế
    let taxableIncome = salary - totalInsurance - personalDeduction - dependentDeduction;

    // Kiểm tra nếu thu nhập chịu thuế âm (dưới mức không đóng thuế)
    if (taxableIncome <= 0) {
        return 0;
    }

    // Tính thuế theo bảng thuế
    let tax = 0;
    if (taxableIncome <= 5000000) {
        tax = taxableIncome * 0.05;
    } else if (taxableIncome <= 10000000) {
        tax = taxableIncome * 0.1 - 250000;
    } else if (taxableIncome <= 18000000) {
        tax = taxableIncome * 0.15 - 750000;
    } else if (taxableIncome <= 32000000) {
        tax = taxableIncome * 0.2 - 1650000;
    } else if (taxableIncome <= 52000000) {
        tax = taxableIncome * 0.25 - 3250000;
    } else if (taxableIncome <= 80000000) {
        tax = taxableIncome * 0.3 - 5850000;
    } else {
        tax = taxableIncome * 0.35 - 9850000;
    }

    return Math.round(tax);
}

// Example usage
let salary = 10000000; // Example salary is 10,000,000 VND
let dependents = 0; // Example 0 dependent
let tax = calculatePersonalIncomeTax(salary, dependents);
console.log("Personal Income Tax: ", tax);

