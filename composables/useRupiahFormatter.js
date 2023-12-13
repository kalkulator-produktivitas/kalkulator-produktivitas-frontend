export default function useRupiahFormatter(price) {
    // From price number 200000 to Rp200.000
    let priceStr = Math.abs(price).toString();
    let rupiah = ""
    for (let i = priceStr.length - 1; i >= 0; i--) {
        rupiah += priceStr[i]
        let j = i - priceStr.length
        if (i !== 0 && j % 3 === 0) {
            rupiah += "."
        }
    }
    // Reverse
    let strArr = rupiah.split("");
    rupiah = "";
    for (let i = strArr.length - 1; i >= 0; i--) {
        rupiah += strArr[i]
    }
    rupiah = "Rp" + rupiah
    if (price < 0) {
        rupiah = "-" + rupiah
    }

    return rupiah
}