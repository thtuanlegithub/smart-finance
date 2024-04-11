export const MILLION = 1e6;

export const taxBrackets = [
    { min: 0 * MILLION, max: 5 * MILLION, rate: 0.05, deduction: 0 * MILLION },
    { min: 5 * MILLION, max: 10 * MILLION, rate: 0.1, deduction: 0.25 * MILLION },
    { min: 10 * MILLION, max: 18 * MILLION, rate: 0.15, deduction: 0.75 * MILLION },
    { min: 18 * MILLION, max: 32 * MILLION, rate: 0.2, deduction: 1.65 * MILLION },
    { min: 32 * MILLION, max: 52 * MILLION, rate: 0.25, deduction: 3.25 * MILLION },
    { min: 52 * MILLION, max: 80 * MILLION, rate: 0.3, deduction: 5.85 * MILLION },
    { min: 80 * MILLION, max: Infinity, rate: 0.35, deduction: 9.85 * MILLION }
];

export default function calculateTax(income) {
    for (let bracket of taxBrackets) {
        if (income > bracket.min && income <= bracket.max) {
            return income * bracket.rate - bracket.deduction;
        }
    }
}