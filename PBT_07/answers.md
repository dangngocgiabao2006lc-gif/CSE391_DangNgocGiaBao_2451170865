# A1
// Đoạn 1
console.log(x);
var x = 5;
// Output: undefined

// Đoạn 2
console.log(y);
let y = 10;
// Output: ReferenceError

// Đoạn 3
const z = 15;
z = 20;
console.log(z);
// Output: TypeError

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
// Output: [1,2,3,4]

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);

// Output:
// Trong block: 2
// Ngoài block: 1
# A2
typeof null              // "object"
typeof undefined         // "undefined"
typeof NaN               // "number"
"5" + 3                  // "53"
"5" - 3                  // 2
"5" * "3"                // 15
true + true              // 2
[] + []                  // ""
[] + {}                  // "[object Object]"
{} + []                  // 0
"5" + 3 dùng nối chuỗi
"5" - 3 ép kiểu sang số để tính toán
# A3
5 == "5"                 // true
5 === "5"                // false
null == undefined        // true
null === undefined       // false
NaN == NaN               // false
0 == false               // true
0 === false              // false
"" == false              // true
Kết luận

Nên dùng === vì:

So sánh cả giá trị và kiểu dữ liệu
Tránh ép kiểu ngoài ý muốn
# A4
Các giá trị falsy
false
0
-0
0n
""
null
undefined
NaN
Kết quả
if ("0") console.log("A"); // In
if ("") console.log("B"); // Không
if ([]) console.log("C"); // In
if ({}) console.log("D"); // In
if (null) console.log("E"); // Không
if (0) console.log("F"); // Không
if (-1) console.log("G"); // In
if (" ") console.log("H"); // In
# A5
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
PHẦN C1 — Debug
Lỗi và cách sửa
1. Thiếu ;
return "Phần trăm giảm không hợp lệ";
2. giaBan là string
const gia = tinhGiaGiamGia(100000, 20);
3. Dùng = thay vì ===

Sai:

if (giaSauGiam = 0)

Đúng:

if (giaSauGiam === 0)
4. setTimeout dùng var

Sai:

for (var i = 0; i < 5; i++)

Đúng:

for (let i = 0; i < 5; i++)
5. Thiếu kiểm tra kiểu dữ liệu
if (isNaN(giaBan))
6. Thiếu format tiền

Nên dùng:

gia.toLocaleString("vi-VN")
c2
Phân tích bài toán
Input

Danh sách món ăn gồm:

Tên món
Giá
Số lượng
Quy tắc
Tổng > 500k → giảm 10%
Tổng > 1 triệu → giảm 15%
Thứ 4 → giảm thêm 5%
VAT = 8%
Tip = 5% (nếu có)