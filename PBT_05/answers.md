Câu A1 — Viewport & Mobile-First
1. Thẻ viewport chuẩn
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Giải thích
width=device-width
→ Chiều rộng website bằng đúng chiều rộng thiết bị.
initial-scale=1.0
→ Mức zoom ban đầu là 100%.
2. Nếu thiếu viewport

iPhone sẽ giả lập website theo kích thước desktop khoảng 980px.

Kết quả:

Chữ rất nhỏ
Website bị thu nhỏ
Responsive không hoạt động đúng
3. Mobile-First vs Desktop-First
Mobile-First

CSS mặc định cho mobile trước.

.box{
    width:100%;
}

@media (min-width:768px){
    .box{
        width:50%;
    }
}
Ưu điểm
Tối ưu mobile
Hiệu năng tốt hơn
Responsive dễ quản lý
Desktop-First

CSS mặc định cho desktop trước.

.box{
    width:50%;
}

@media (max-width:768px){
    .box{
        width:100%;
    }
}
Nhược điểm
CSS phức tạp hơn
Mobile phải override nhiều
Câu A2 — Breakpoints
Breakpoint	Kích thước	Thiết bị	Grid sản phẩm
Mobile	<576px	Điện thoại	1 cột
Small	≥576px	Điện thoại lớn	2 cột
Tablet	≥768px	iPad	2-3 cột
Laptop	≥992px	Laptop	3-4 cột
Desktop	≥1200px	Màn hình lớn	4-5 cột
Câu A3 — Media Queries
Chiều rộng màn hình	.container width
375px	100%
600px	540px
800px	720px
1000px	960px
1400px	1140px
Câu A4 — SCSS Basics
1. Variables
$primary-color: blue;

body{
    color:$primary-color;
}

Dùng để lưu màu, font, spacing.

2. Nesting
.card{

    h2{
        color:red;
    }

    p{
        color:gray;
    }
}

Giúp code gọn hơn.

3. Mixins
@mixin flex-center{
    display:flex;
    justify-content:center;
    align-items:center;
}

.box{
    @include flex-center;
}

Tái sử dụng code.

4. Extend
.button{
    padding:10px;
}

.primary-btn{
    @extend .button;
    background:blue;
}

Kế thừa CSS.

Tại sao browser không đọc được SCSS?

Vì SCSS không phải CSS thuần.

Phải compile SCSS → CSS bằng Sass.

Ví dụ:

sass style.scss style.css
PHẦN C — PHÂN TÍCH
Câu C1 — Phân tích trang web Shopee
1. Mobile 375px
Menu đổi thành hamburger
Sản phẩm hiển thị 2 cột
Một số banner bị ẩn
Font nhỏ hơn
2. Tablet 768px
Menu ngang
Grid khoảng 3 cột
Banner hiển thị nhiều hơn
3. Desktop 1440px
Header đầy đủ
Grid 5-6 cột
Sidebar hiện đầy đủ
Font lớn hơn
Media Queries tìm thấy
@media (max-width:768px)
@media (min-width:1200px)
Câu C2 — Responsive Strategy
Mobile
HEADER
HERO
FORM
GRID 1 CỘT
MAP
FOOTER
Ẩn bớt ảnh
Form nằm trên grid
Tablet
HEADER
HERO
GRID 2 CỘT
FORM
MAP
FOOTER
Desktop
HEADER
HERO
GRID 3 CỘT + SIDEBAR
FORM + MAP SONG SONG
FOOTER
CSS Skeleton
.container{
    display:grid;
    grid-template-columns:1fr;
    gap:20px;
}

.gallery{
    display:grid;
    grid-template-columns:1fr;
}

@media (min-width:768px){

    .gallery{
        grid-template-columns:repeat(2,1fr);
    }
}

@media (min-width:1024px){

    .container{
        grid-template-columns:2fr 1fr;
    }

    .gallery{
        grid-template-columns:repeat(3,1fr);
    }
}