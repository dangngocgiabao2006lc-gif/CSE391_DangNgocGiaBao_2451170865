Câu A1
type="text" → Ô nhập văn bản thông thường → Không có validation tự động → Dùng nhập họ tên khách hàng.
type="email" → Ô nhập email → Tự kiểm tra định dạng email có chứa @ và domain → Dùng cho đăng ký tài khoản E-Commerce.
type="password" → Ô nhập bị ẩn ký tự → Có thể kết hợp minlength, pattern để kiểm tra độ mạnh mật khẩu → Dùng cho đăng nhập hoặc đăng ký.
type="number" → Ô nhập số có nút tăng giảm → Kiểm tra giá trị số, min, max → Dùng nhập số lượng sản phẩm.
type="date" → Hiển thị lịch chọn ngày → Kiểm tra dữ liệu đúng kiểu ngày → Dùng chọn ngày sinh hoặc ngày giao hàng.
type="tel" → Ô nhập số điện thoại → Có thể dùng pattern để kiểm tra định dạng → Dùng nhập số điện thoại khách hàng.
type="url" → Ô nhập địa chỉ website → Tự kiểm tra đúng định dạng URL → Dùng nhập website cửa hàng hoặc link sản phẩm.
type="checkbox" → Ô tick chọn → Có thể dùng required → Dùng xác nhận đồng ý điều khoản.
type="radio" → Chọn một trong nhiều lựa chọn → Các radio cùng name chỉ chọn được 1 → Dùng chọn phương thức thanh toán.
type="range" → Thanh kéo giá trị → Kiểm tra theo min/max/step → Dùng chọn mức độ hài lòng hoặc thời gian giao hàng.

Câu A2
Dự đoán kết quả validation
Trường hợp 1
<input type="text" required value="">
Dự đoán

Form không submit được.

Giải thích

Thuộc tính required yêu cầu người dùng bắt buộc phải nhập dữ liệu.
Input đang để trống (value="") nên browser sẽ hiển thị thông báo lỗi validation.

Kết quả thực tế

Khi bấm Submit:

Browser chặn submit form
Hiển thị thông báo:
Please fill out this field.
Con trỏ tự focus vào ô input.
Trường hợp 2
<input type="email" value="abc">
Dự đoán

Form không submit được.

Giải thích

type="email" yêu cầu dữ liệu đúng định dạng email.
Giá trị "abc" không chứa @ và tên miền nên không hợp lệ.

Kết quả thực tế

Khi bấm Submit:

Browser chặn submit form
Hiển thị thông báo dạng:
Please include an '@' in the email address.
Trường hợp 3
<input type="number" min="1" max="10" value="15">
Dự đoán

Form không submit được.

Giải thích

Input chỉ cho phép giá trị từ 1 đến 10.
Giá trị hiện tại là 15, vượt quá max="10" nên validation thất bại.

Kết quả thực tế

Khi bấm Submit:

Browser chặn submit
Hiển thị thông báo tương tự:
Value must be less than or equal to 10.
Trường hợp 4
<input type="text" pattern="[0-9]{10}" value="abc123">
Dự đoán

Form không submit được.

Giải thích

Regex:

[0-9]{10}

nghĩa là:

[0-9] → chữ số từ 0 đến 9
{10} → đúng 10 ký tự số

Giá trị "abc123":

chứa chữ cái
không đủ 10 chữ số

nên không đúng pattern.

Kết quả thực tế

Khi bấm Submit:

Browser chặn submit
Hiển thị thông báo dạng:
Please match the requested format.
Trường hợp 5
<input type="password" minlength="8" value="123">
Dự đoán

Form không submit được.

Giải thích

minlength="8" yêu cầu ít nhất 8 ký tự.
Giá trị "123" chỉ có 3 ký tự nên validation thất bại.

Kết quả thực tế

Khi bấm Submit:

Browser chặn submit
Hiển thị thông báo tương tự:
Please lengthen this text to 8 characters or more.

câu A3
1. Tại sao <label for="email"> quan trọng cho screen reader?

<label> giúp screen reader biết input dùng để nhập thông tin gì.

Ví dụ:

<label for="email">Email</label>
<input type="email" id="email">

Screen reader sẽ đọc:

Email, edit text

Ngoài ra, click vào label sẽ focus vào input tương ứng, giúp thao tác dễ hơn.

2. Khi nào dùng <fieldset> + <legend>?

Dùng để nhóm các trường liên quan trong form.

Ví dụ:

<fieldset>
    <legend>Thông tin giao hàng</legend>

    <input type="text">
    <input type="text">
</fieldset>

Lợi ích:

Form rõ ràng hơn
Hỗ trợ accessibility
Screen reader hiểu đây là nhóm thông tin liên quan
3. aria-label dùng khi nào?

Dùng khi phần tử không có text hiển thị nhưng vẫn cần mô tả cho screen reader.

Ví dụ:

<button aria-label="Tìm kiếm">
    🔍
</button>
Tại sao không nên dùng aria-label khi đã có <label>?

Vì sẽ gây trùng lặp thông tin.

Ví dụ:

<label for="email">Email</label>
<input id="email" aria-label="Email">

Screen reader có thể đọc hai lần, gây khó chịu cho người dùng.

câu A4
1. loading="lazy" trên <img> là gì?

loading="lazy" giúp trì hoãn tải ảnh cho đến khi ảnh gần xuất hiện trên màn hình.

Ví dụ:

<img src="product.jpg" loading="lazy">
Nó cải thiện gì?
Tăng tốc độ tải trang
Giảm băng thông
Giảm tài nguyên trình duyệt
Khi nào KHÔNG nên dùng?

Không nên dùng cho:

Logo chính
Hero banner
Ảnh đầu trang quan trọng

Vì các ảnh này cần hiển thị ngay.

2. Tại sao nên cung cấp nhiều <source> trong <video>?

Mỗi trình duyệt hỗ trợ định dạng video khác nhau.

Ví dụ:

<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
</video>

Nếu browser không hỗ trợ mp4 thì có thể dùng webm.

3 format video phổ biến
MP4
WebM
OGG
3. Thuộc tính alt dùng để làm gì?

alt mô tả nội dung ảnh cho:

Người dùng screen reader
Khi ảnh lỗi không tải được
SEO
Alt cho ảnh sản phẩm iPhone 16
alt="iPhone 16 Pro Max màu Titan 256GB"
Alt cho ảnh decorative
alt=""
Alt cho biểu đồ doanh thu Q1/2026
alt="Biểu đồ doanh thu quý 1 năm 2026 tăng 20 phần trăm so với quý trước"

câu A5
Khi nào dùng <img>?

Dùng khi ảnh đơn giản, không cần chú thích.

Ví dụ thực tế
Logo website
Avatar người dùng

Ví dụ:

<img src="logo.png" alt="Logo cửa hàng">
Khi nào dùng <figure>?

Dùng khi ảnh cần caption hoặc mang ý nghĩa nội dung.

Ví dụ thực tế
Ảnh sản phẩm
Biểu đồ thống kê

Ví dụ:

<figure>
    <img src="iphone.jpg" alt="iPhone 16 Pro Max">
    <figcaption>
        iPhone 16 Pro Max — 25.990.000đ
    </figcaption>
</figure>

PHẦN C — PHÂN TÍCH & SUY LUẬN
câu C1
Lỗi 1

Dòng 2 — Input “Tên” không có <label for="">, vi phạm accessibility.

Sửa
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>
Lỗi 2

Dòng 2 — Input “Tên” không có name.

Sửa
<input type="text" id="name" name="name" required>
Lỗi 3

Dòng 4 — Input email không có label.

Sửa
<label for="email">Email:</label>
<input type="email" id="email" name="email" required placeholder="Email của bạn">
Lỗi 4

Dòng 6 — Password không có label và không có validation.

Sửa
<label for="password">Mật khẩu:</label>

<input
type="password"
id="password"
name="password"
required
minlength="8"
>
Lỗi 5

Dòng 7 — Ô nhập lại mật khẩu không có label.

Sửa
<label for="confirmPassword">
Nhập lại mật khẩu:
</label>

<input
type="password"
id="confirmPassword"
name="confirmPassword"
required
>
Lỗi 6

Dòng 9 — Phone dùng type="text" thay vì type="tel".

Sửa
<label for="phone">Phone:</label>

<input
type="tel"
id="phone"
name="phone"
pattern="[0-9]{10}"
required
>
Lỗi 7

Dòng 11 — Select không có label.

Sửa
<label for="city">Thành phố:</label>

<select id="city" name="city">
    <option>Hà Nội</option>
    <option>TP.HCM</option>
</select>
Lỗi 8

Dòng 16 — “Tôi đồng ý điều khoản” không có checkbox.

Sửa
<label>
    <input type="checkbox" required>
    Tôi đồng ý điều khoản
</label>

câu C2
1. Regex pattern cho CMND/CCCD và Số tài khoản
CMND/CCCD — đúng 12 chữ số
pattern="[0-9]{12}"
Số tài khoản — từ 10 đến 15 chữ số
pattern="[0-9]{10,15}"
Giải thích regex
[0-9]     → chữ số từ 0 đến 9
{12}      → đúng 12 ký tự số
{10,15}   → từ 10 đến 15 ký tự số
2. HTML5 validation có đủ an toàn cho ứng dụng ngân hàng chưa?

Không đủ an toàn.

HTML5 validation chỉ hoạt động phía frontend (trình duyệt).
Người dùng có thể:

Tắt JavaScript
Chỉnh sửa HTML bằng DevTools
Gửi request giả bằng Postman

Vì vậy backend vẫn phải validate lại toàn bộ dữ liệu để đảm bảo an toàn.

3. 3 loại validation HTML5 KHÔNG THỂ làm được
1. So sánh confirm password

HTML không thể kiểm tra hai input có giống nhau hay không.

2. Kiểm tra email đã tồn tại trong database

Cần backend hoặc API xử lý.

3. Xác thực OTP/SMS

Cần server gửi và kiểm tra mã xác nhận.

4. 2 rủi ro nếu chỉ validate Frontend
1. Người dùng bypass validation

Có thể gửi dữ liệu sai hoặc dữ liệu độc hại lên server.

2. Tấn công bảo mật

Ví dụ:

SQL Injection
XSS
Spam dữ liệu

Nếu backend không validate lại thì hệ thống dễ bị khai thác.