import { ref } from 'vue';

export default function useRupiahFormatter() {
    // From price number 200000 to Rp200.000
    const rupiahFormatter = (price: number) => {
        let priceStr: string = Math.abs(price).toString();
        let rupiah: string = ""
        for (let i = priceStr.length - 1; i >= 0; i--) {
            rupiah += priceStr[i]
            let j: number = i - priceStr.length
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
        rupiah = "Rp " + rupiah
        if (price < 0) {
            rupiah = "-" + rupiah
        }

        return rupiah
    }
    return { rupiahFormatter }
}