Phan A
c1
| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                       | Cuộn theo trang?         | Use case                                      |
| ---------- | ------------------------- | --------------------------------------- | ------------------------ | --------------------------------------------- |
| `static`   | Có                        | Vị trí mặc định                         | Có                       | Layout bình thường                            |
| `relative` | Có                        | Chính vị trí ban đầu của nó             | Có                       | Dịch chuyển nhẹ phần tử, làm mốc cho absolute |
| `absolute` | Không                     | Parent gần nhất có position khác static | Không cố định theo trang | Badge, popup, icon nổi                        |
| `fixed`    | Không                     | Viewport (màn hình trình duyệt)         | Không                    | Header cố định, nút scroll top                |
| `sticky`   | Có                        | Parent/container khi scroll             | Sticky sau khi chạm top  | Sidebar sticky, menu sticky                   |

Khi nào absolute tham chiếu body?

Khi không có parent nào có position khác static.

Khi nào tham chiếu parent?

Khi phần tử cha gần nhất có:
position: relative;
position: absolute;
position: fixed;
position: sticky;
Nearest positioned ancestor là gì?

Là phần tử cha gần nhất có position khác static.
absolute sẽ lấy phần tử đó làm mốc để căn vị trí.

c2
trường hợp 1:
.container {
    display: flex;
}

.item {
    flex: 1;
}
| Item | Item | Item | Item |
trường hợp 2
| Item | Item |
| Item | Item |
| Item | Item |
trường hợp 3
Item                Item                Item
trường hợp 4
| 200px | flexible content | 200px |
trường hợp 5
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 |

PHẦN C — SUY LUẬN
Câu C1 — Flexbox vs Grid
| Tình huống         | Dùng gì?          | Giải thích            |
| ------------------ | ----------------- | --------------------- |
| Navbar ngang       | Flexbox           | Một chiều ngang       |
| Lưới ảnh Instagram | Grid              | Layout nhiều hàng/cột |
| Blog + sidebar     | Grid              | Chia layout 2 chiều   |
| Footer 4 cột       | Grid hoặc Flexbox | Grid dễ chia cột đều  |
| Product card       | Flexbox           | Sắp xếp dọc linh hoạt |
Câu 2
Lỗi 1 — Card không đều chiều cao
Nguyên nhân

Nội dung mỗi card dài ngắn khác nhau nên nút bị lệch.

Sửa
.card {
    display: flex;
    flex-direction: column;
}

.card .btn {
    margin-top: auto;
}
Giải thích

margin-top: auto đẩy nút xuống đáy card.

Lỗi 2 — Không căn giữa
Nguyên nhân

Thiếu:

justify-content
align-items
Sửa
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
Lỗi 3 — Sidebar bị co lại
Nguyên nhân

Flexbox tự co item khi thiếu chỗ.

Sửa
.sidebar {
    width: 250px;
    flex-shrink: 0;
}
flex-shrink: 0 ngăn sidebar bị co.
positioning.html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Positioning Playground</title>
    <link rel="stylesheet" href="positioning.css">
</head>
<body>

<header>
    <div class="logo">MyShop</div>
    <nav>
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
    </nav>
</header>

<div class="container">

    <aside class="sidebar">
        <h3>Sidebar</h3>
        <p>Sticky sidebar</p>
    </aside>

    <main>
        <div class="card">
            <div class="badge">HOT</div>
            <img src="https://via.placeholder.com/300x200">
            <h2>Product</h2>
            <p>Sample description</p>
        </div>

        <div class="content">
            <p>Scroll xuống để test...</p>
            <p style="height:1500px;"></p>
        </div>
    </main>

</div>

<button class="scroll-top">↑</button>

</body>
</html>