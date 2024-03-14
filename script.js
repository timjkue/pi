function* generateDigitsOfPi() {
    let q = 1n;
    let r = 180n;
    let t = 60n;
    let i = 2n;
    while (true) {
        let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n);
        yield Number(digit);
        let u = i * 3n;
        u = (u + 1n) * 3n * (u + 2n);
        r = u * 10n * (q * (i * 5n - 2n) + r - t * digit);
        q *= 10n * i * (i++ * 2n - 1n);
        t *= u;
    }
}

function findPiDigit() {
    let inputNumber = document.getElementById("inputNumber").value;
    const resultDiv = document.getElementById("result");
    const iter = generateDigitsOfPi();
    let digits = "";
    let count = 0;
    let found = false;
    let buffer = "";

    while (!found) {
        const digit = iter.next().value;
        buffer += digit;
        if (buffer.length > inputNumber.length + 10) {
            buffer = buffer.slice(-(inputNumber.length + 10));
        }
        if (buffer.slice(0, -5).includes(inputNumber)) {
            found = true;
            const startIndex = buffer.indexOf(inputNumber);
            let before = "";
            let after = buffer.slice(startIndex + inputNumber.length, startIndex + inputNumber.length + 5) + "...";
            if(count >= 10){
                before = "..." + buffer.slice(startIndex - 5, startIndex);
            }
            else{
                before = buffer.slice(0, startIndex).replace(/(\d)(\d)/, '$1.$2');
            }
            if(before == "3"){
                before = "3.";
            }
            if(inputNumber == 3){
                after = "." + after;
            }
            else if(before == ""){
                inputNumber = inputNumber.replace(/(\d)(\d)/, '$1.$2');
            }
            digits += `<span class="gray">${before}</span><span class="black">${inputNumber}</span><span class="gray">${after}</span>`;
        }
        count++;
        if (count > 10000) break;
    }

    resultDiv.innerHTML = `Position (After "."): ${count-6}<br>${digits}`;
}
