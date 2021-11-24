export function toInt(n: string) {
    return parseInt(n);
}

export function isNDigitNumber(value: string, n: number) {
    const regex = new RegExp(`^[0-9]{${n}}$`);
    return !! value.match(regex);
}

export function isBetween(value: string, min: number, max: number) {
    return min <= toInt(value) && toInt(value) <= max;
}

export function multiply(numbers: number[]) {
    let result = 1;
    numbers.forEach(number => result *= number);
    return result;
}
