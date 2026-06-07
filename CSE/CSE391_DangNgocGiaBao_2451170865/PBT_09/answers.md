PHẦN A — KIỂM TRA ĐỌC HIỂU
Câu A1 — DOM Tree
1. DOM Tree
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        └── li.todo-item.completed
            └── "Learn CSS"
2. Query Selectors
// Chọn thẻ h1
document.querySelector("h1");

// Chọn input trong form
document.querySelector("#todoForm input");

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");

// Chọn link đang active
document.querySelector("nav .active");

// Chọn li đầu tiên trong #todoList
document.querySelector("#todoList li");

// Chọn tất cả a bên trong nav
document.querySelectorAll("nav a");
Câu A2 — innerHTML vs textContent
Khác nhau
| innerHTML       | textContent      |
| --------------- | ---------------- |
| Đọc/ghi HTML    | Chỉ đọc/ghi text |
| Parse HTML tags | Không parse HTML |
| Có thể gây XSS  | An toàn hơn      |
| Chậm hơn        | Nhanh hơn        |
Ví dụ dùng
innerHTML
document.querySelector("#app").innerHTML =
    "<h1>Hello</h1>";

→ Tạo thẻ HTML thật.

textContent
document.querySelector("#app").textContent =
    "<h1>Hello</h1>";

→ Hiển thị nguyên text:

<h1>Hello</h1>
Vì sao innerHTML gây XSS?

Vì user có thể inject JavaScript độc hại vào HTML.

Ví dụ:

const userInput =
    '<img src=x onerror="alert(`Hacked!`)">';

document.querySelector("#result").innerHTML =
    userInput;

→ Browser render HTML → chạy onerror.

Cách sửa an toàn
const userInput =
    document.querySelector("#search").value;

document.querySelector("#result").textContent =
    userInput;
Câu A3 — Event Bubbling
Khi click button

Output:

BUTTON
INNER
OUTER

Giải thích:

Event nổi bọt từ:

button → inner → outer
Nếu dùng stopPropagation()
e.stopPropagation();

Output:

BUTTON

Vì event không bubble lên cha nữa.