export default function calculatePersonalIncomeTax(salary, dependents, socialInsurance) {
    // Calculate taxable income
    let taxableIncome = salary - socialInsurance * 12 - 11 * 1000000 - dependents * 400000;

    // Calculate tax based on tax brackets
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

    if (tax > 0) {
        return Math.round(tax);
    }
    return '0';
}

