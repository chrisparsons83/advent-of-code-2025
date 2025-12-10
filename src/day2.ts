const input = '119-210,907313-1048019,7272640820-7272795557,6315717352-6315818282,42-65,2234869-2439411,1474-2883,33023-53147,1-15,6151-14081,3068-5955,65808-128089,518490556-518593948,3535333552-3535383752,7340190-7548414,547-889,34283147-34389716,44361695-44519217,607492-669180,7071078-7183353,67-115,969-1469,3636264326-3636424525,762682710-762831570,827113-906870,205757-331544,290-523,86343460-86510016,5536957-5589517,132876-197570,676083-793651,23-41,17920-31734,440069-593347';
const ranges = input.split(',').map(part => {
    const [start, end] = part.split('-').map(num => parseInt(num, 10));
    return { start, end };
});

let invalidTotal = 0;

for (const { start, end } of ranges) {
    for (let num = start; num <= end; num++) {
        // Convert into string
        const strNum = num.toString();
        // If the number is not an even number of digits, skip it
        if (strNum.length % 2 !== 0) {
            continue;
        }

        // Check if the first half matches the second half
        const halfLength = strNum.length / 2;
        const firstHalf = strNum.slice(0, halfLength);
        const secondHalf = strNum.slice(halfLength);

        if (firstHalf === secondHalf) {
            invalidTotal += num;
        }
    }
}

console.log(invalidTotal);

let invalidTotalV2 = 0;

for (const { start, end } of ranges) {
    for (let num = start; num <= end; num++) {
        // Convert into string
        const strNum = num.toString();

        for (let lenCheck = 1; lenCheck <= Math.floor(strNum.length / 2); lenCheck++) {
            // if the length of the string is not divisible by lenCheck, skip it
            if (strNum.length % lenCheck !== 0) {
                continue;
            }

            // Loop through the string in chunks of lenCheck and see if they all match
            let allMatch = true;
            const firstChunk = strNum.slice(0, lenCheck);
            for (let i = lenCheck; i < strNum.length; i += lenCheck) {
                const chunk = strNum.slice(i, i + lenCheck);
                if (chunk !== firstChunk) {
                    allMatch = false;
                    break;
                }
            }
            
            if (allMatch) {
                invalidTotalV2 += num;
                break; // No need to check further lengths
            }
        }
    }
}

console.log(invalidTotalV2);