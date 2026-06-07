PHẦN A — KIỂM TRA ĐỌC HIỂU
câu A1
1. Inline CSS
Ví dụ
<p style="color: red;">
    Hello World
</p>
Ưu điểm
Nhanh
Viết trực tiếp trên element
Độ ưu tiên cao
Nhược điểm
Khó bảo trì
Lặp code
Không tái sử dụng
Khi dùng
Test nhanh
Override tạm thời
2. Internal CSS
Ví dụ
<head>

    <style>

        p {
            color: blue;
        }

    </style>

</head>
Ưu điểm
Dễ quản lý trong 1 file
Không cần file CSS riêng
Nhược điểm
Không tái sử dụng cho nhiều trang
HTML dài hơn
Khi dùng
Demo
Landing page nhỏ
3. External CSS
Ví dụ
<link rel="stylesheet" href="style.css">
style.css
p {
    color: green;
}
Ưu điểm
Chuẩn thực tế
Dễ bảo trì
Tái sử dụng nhiều trang
Nhược điểm
Cần file riêng
Khi dùng
Dự án thật
Website nhiều trang
Câu hỏi thêm — CSS nào thắng?
Thứ tự ưu tiên
Inline > Internal > External
Giải thích

CSS hoạt động theo:

Cascade
Specificity
Source order

Inline CSS có độ ưu tiên cao nhất vì viết trực tiếp trên element.

câu A2
1.
h1
Chọn
ShopTLU
2.
.price
Chọn
25.990.000đ
45.990.000đ
3.
#app header
Chọn toàn bộ nội dung trong header
ShopTLU
Home
Products
About
4.
nav a:first-child
Chọn
Home
5.
.product.featured h2
Chọn
MacBook Pro
6.
article > p
Chọn
25.990.000đ
Mô tả sản phẩm...

45.990.000đ
Mô tả sản phẩm...
7.
a[href="/"]
Chọn
Home
8.
.top-bar.dark h1
Chọn
ShopTLU
selectors_test.html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Selectors Test</title>

    <style>

        h1 {
            color: red;
        }

        .price {
            color: blue;
        }

        nav a:first-child {
            font-weight: bold;
        }

        .product.featured h2 {
            background: yellow;
        }

    </style>

</head>

<body>

    <div id="app">

        <header class="top-bar dark">

            <h1>ShopTLU</h1>

            <nav>

                <a href="/" class="active">
                    Home
                </a>

                <a href="/products">
                    Products
                </a>

                <a href="/about">
                    About
                </a>

            </nav>

        </header>

        <main>

            <article class="product">

                <h2>iPhone 16</h2>

                <p class="price">
                    25.990.000đ
                </p>

                <p>
                    Mô tả sản phẩm...
                </p>

            </article>

            <article class="product featured">

                <h2>MacBook Pro</h2>

                <p class="price">
                    45.990.000đ
                </p>

                <p>
                    Mô tả sản phẩm...
                </p>

            </article>

        </main>

    </div>

</body>

</html>

câu A3
Trường hợp 1 — content-box
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
Tính toán
width = 400px

padding:
20px trái + 20px phải = 40px

border:
5px trái + 5px phải = 10px
Chiều rộng thực tế
400 + 40 + 10 = 450px
Không gian chiếm trên trang
450 + 10 + 10 = 470px
Trường hợp 2 — border-box
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
Tính toán
Chiều rộng thực tế
400px
Content thực tế
400 - 40 - 10 = 350px
Không gian chiếm trên trang
400 + 20 = 420px
Trường hợp 3 — Margin Collapse
.box-a {
    margin-bottom: 25px;
}

.box-b {
    margin-top: 40px;
}
Khoảng cách thực tế
40px
Giải thích

Margin dọc không cộng lại.
Browser lấy margin lớn hơn.

Nâng cao
.box-a {
    margin-bottom: -10px;
}

.box-b {
    margin-top: 40px;
}
Khoảng cách
30px
Giải thích
40 + (-10) = 30

PHẦN C — DEBUG & SUY LUẬN
c1
.container {
    width: 960px;
    margin: 0 auto;
}

.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}

.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
1. Tính chiều rộng thực tế
Sidebar
width = 300px

padding trái + phải = 20 + 20 = 40px

border trái + phải = 1 + 1 = 2px

=> Tổng = 342px
Content
width = 660px

padding trái + phải = 30 + 30 = 60px

border trái + phải = 1 + 1 = 2px

=> Tổng = 722px
Tổng chiều rộng
342 + 722 = 1064px
2. Giải thích tại sao layout bị vỡ

Container chỉ rộng:

960px

Nhưng tổng chiều rộng thực tế của:

sidebar
content

là:

1064px

lớn hơn container nên phần .content bị đẩy xuống dòng mới.

3. Hai cách sửa
Cách 1 — Dùng border-box
* {
    box-sizing: border-box;
}
Giải thích

Khi dùng:

box-sizing: border-box;

thì:

width đã bao gồm padding + border

nên tổng width không vượt quá 960px.

Cách 2 — Giảm width thủ công
Sidebar
300 - 40 - 2 = 258px
Content
660 - 60 - 2 = 598px
CSS sửa
.sidebar {
    width: 258px;
}

.content {
    width: 598px;
}
debug_layout.html
<!DOCTYPE html>
<html lang="vi">

<head>

    <meta charset="UTF-8">

    <title>Debug Layout</title>

    <link rel="stylesheet" href="debug_layout.css">

</head>

<body>

    <div class="container">

        <div class="sidebar">
            Sidebar
        </div>

        <div class="content">
            Content
        </div>

    </div>

</body>

</html>
debug_layout.css
* {
    box-sizing: border-box;
}

.container {

    width: 960px;

    margin: 0 auto;

    border: 2px solid black;
}

.sidebar {

    width: 300px;

    padding: 20px;

    border: 1px solid #ccc;

    float: left;

    background-color: lightblue;
}

.content {

    width: 660px;

    padding: 30px;

    border: 1px solid #ccc;

    float: left;

    background-color: lightgreen;
}
c2
body {
    font-size: 16px;
    color: #333;
}

.container {
    font-size: 14px;
}

.card {
    color: blue;
}

.card .title {
    font-size: 20px;
}

.card p {
    color: inherit;
}

#featured .title {
    color: red;
}

.highlight {
    color: green !important;
}

Và HTML:

<body>

    <div class="container">

        <div class="card" id="featured">

            <h2 class="title highlight">
                Sản phẩm A
            </h2>

            <p>
                Mô tả sản phẩm
            </p>

        </div>

        <div class="card">

            <h2 class="title">
                Sản phẩm B
            </h2>

            <p class="highlight">
                Mô tả sản phẩm B
            </p>

        </div>

    </div>

</body>
1. "Sản phẩm A"
Font-size
20px
Vì
.card .title {
    font-size: 20px;
}
Color
green
Vì
.highlight {
    color: green !important;
}

!important thắng rule:

#featured .title {
    color: red;
}
2. "Mô tả sản phẩm"
Color
blue
Vì

.card có:

.card {
    color: blue;
}

và:

.card p {
    color: inherit;
}

inherit lấy màu từ .card.

3. "Sản phẩm B"
Font-size
20px
Vì
.card .title {
    font-size: 20px;
}
Color
blue
Vì

Không có rule riêng nên kế thừa từ:

.card {
    color: blue;
}
4. "Mô tả sản phẩm B"
Color
green
Vì

p có class:

class="highlight"

nên áp dụng:

.highlight {
    color: green !important;
}

!important override màu xanh dương từ .card.

# Bài B3 — Specificity Battle

## 1. Danh sách 10 rules + specificity

| Rule | Selector | Specificity |
|---|---|---|
| 1 | p | (0,0,1) |
| 2 | .text | (0,1,0) |
| 3 | .highlight | (0,1,0) |
| 4 | p.text | (0,1,1) |
| 5 | p.highlight | (0,1,1) |
| 6 | .text.highlight | (0,2,0) |
| 7 | body p | (0,0,2) |
| 8 | #demo | (1,0,0) |
| 9 | p#demo | (1,0,1) |
| 10 | body p#demo.text.highlight | (1,2,2) |

---

## 2. Element cuối cùng có màu gì?

Màu cuối cùng là:

gold

Vì Rule 10 có specificity cao nhất:

(1,2,2)

---

## 3. Screenshot kết quả

Chụp màn hình trình duyệt hiển thị chữ "Hello World" màu gold.

---

## 4. Nếu đổi thứ tự rules thì sao?

- Nếu specificity khác nhau:
  => Không ảnh hưởng

- Nếu specificity bằng nhau:
  => Rule viết sau sẽ thắng

Ví dụ:
.text và .highlight cùng specificity (0,1,0)

Rule nào nằm dưới sẽ được áp dụng.