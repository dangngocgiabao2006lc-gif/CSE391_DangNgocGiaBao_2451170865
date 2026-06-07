# 📋 PBT06 — Answers

## PHẦN A — ĐỌC HIỂU

### A1 — Grid System

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 12 | 12 | 12 |
| Box layout | 4 hàng × 1 cột | 2 hàng × 2 cột | 1 hàng × 4 cột |

`col-md-6` nghĩa là: Khi màn hình ≥768px, cột chiếm 6/12 = 50% width. Không cần `col-sm-12` vì mặc định col sẽ chiếm full width trên mobile (<768px).

### A2 — Utilities & Components

1. `d-none d-md-block`: Ẩn trên mobile, hiện trên tablet+.
2. 5 spacing utilities:
   - `mt-3`: margin-top 1rem
   - `mb-auto`: margin-bottom tự động
   - `px-4`: padding trái phải 1.5rem
   - `py-2`: padding trên dưới 0.5rem
   - `ms-3`: margin-left 1rem
3. `.container`: cố định max-width + padding; `.container-fluid`: full-width; `.container-md`: max-width ≥768px

## PHẦN C — Phân tích

### C1 — Tùy biến Bootstrap

Để đổi `$primary` sang `#E63946`:
1. Cần source SCSS của Bootstrap.
2. Sửa `_variables.scss` → `$primary: #E63946;`
3. Compile SCSS → CSS → sử dụng.
- Không override trực tiếp `.btn-primary` vì sẽ mất lợi ích variable, dễ lỗi khi upgrade.

### C2 — So sánh với CSS thuần

- Navbar + Product card CSS thuần: ~50-70 dòng CSS, Bootstrap chỉ dùng 3-5 class.
- Phát triển nhanh hơn, maintain dễ hơn, responsive sẵn.
- Khi nào dùng Bootstrap: cần triển khai nhanh, nhiều component, responsive sẵn.
- Khi nào không dùng: dự án rất nhỏ, cần tối ưu cực kỳ nhẹ, muốn CSS tùy biến cao.