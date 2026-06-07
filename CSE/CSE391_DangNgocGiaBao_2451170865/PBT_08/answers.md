# PHẦN A

## Câu A1

### Function Declaration
```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
}
Function Expression
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
};
Arrow Function
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return {
        thue,
        thuc_nhan: luong - thue
    };
};
Hoisting
Function Declaration được hoisting hoàn toàn
Function Expression và Arrow Function không được hoisting đầy đủ

Ví dụ:

hello();

function hello() {
    console.log("OK");
}
test();

const test = () => {
    console.log("Lỗi");
}
Câu A2
Đoạn 1

Output:

1
2
3
2
2
Đoạn 2

Output:

var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
Giải thích
var dùng chung 1 biến
let tạo scope riêng cho mỗi vòng lặp
Câu A3
const nums = [1,2,3,4,5,6,7,8,9,10];

nums.filter(x => x % 2 === 0);

nums.map(x => x * 3);

nums.reduce((sum, x) => sum + x, 0);

nums.find(x => x > 7);

nums.some(x => x > 10);

nums.every(x => x > 0);

nums.map(x => `Số ${x} là ${x % 2 === 0 ? "chẵn" : "lẻ"}`);

[...nums].reverse();
Câu A4
Output
iPhone 16 25990000 8 Titan
specs is not defined
23990000
true
25990000
16
Giải thích
Spread chỉ copy shallow copy
Object con vẫn tham chiếu cùng bộ nhớ
PHẦN C
Câu C1
Refactor
const processOrders = orders =>
    orders
        .filter(o => o.status === "completed" && o.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);

c2
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }
};