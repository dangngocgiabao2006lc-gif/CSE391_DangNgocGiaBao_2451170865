PHẦN A — KIỂM TRA ĐỌC HIỂU
A1
thứ tự output
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
Giải thích

Code đồng bộ (Sync) chạy trước:

console.log("1 - Start");
console.log("4 - End");

Output:

1 - Start
4 - End
Microtask Queue

Hai Promise được đưa vào Microtask Queue:

Promise.resolve().then(...)
Promise.resolve().then(...)

Microtask luôn được thực thi trước Macrotask.

Output:

3 - Promise
6 - Promise 2

Trong Promise thứ hai:

setTimeout(() => console.log("7 - Nested timeout"), 0);

Timeout này được thêm vào Macrotask Queue.

Macrotask Queue

Các timeout:

setTimeout(...0ms)      // số 2
setTimeout(...100ms)    // số 5
setTimeout(...0ms)      // số 7

Timeout số 2 được đăng ký trước nên chạy trước:

2 - Timeout 0ms

Tiếp theo:

7 - Nested timeout

Cuối cùng sau khoảng 100ms:

5 - Timeout 100ms
Event Loop
Call Stack
    ↓
Microtask Queue
(Promise, queueMicrotask)

    ↓

Macrotask Queue
(setTimeout, setInterval, DOM Events)

Nguyên tắc:

1. Chạy hết Sync code
2. Chạy toàn bộ Microtask
3. Chạy 1 Macrotask
4. Lặp lại
Câu A2 (5đ) – Fetch API
1. await fetch(...)
const response = await fetch(url);

fetch() trả về:

Promise<Response>

Ví dụ:

Promise {
   <pending>
}

Cần await để đợi Promise hoàn thành và lấy được đối tượng Response.

Không dùng await:

const response = fetch(url);

thì:

response.then(...)

mới dùng được.

2. response.ok
if (!response.ok)

response.ok:

true  => status 200-299
false => status ngoài khoảng này

Ví dụ:

Status	Ý nghĩa
404	Not Found
500	Internal Server Error
403	Forbidden

Khi gặp các mã này:

response.ok === false
3. response.json()
const data = await response.json();

response.json() cũng trả về Promise.

Promise<Object>

Do trình duyệt cần:

đọc body
parse JSON
chuyển thành object JS

nên phải dùng thêm:

await
4. try...catch bắt lỗi gì?
Bắt được
Network Error
Không có internet
DNS lỗi
Server không phản hồi

Ví dụ:

fetch("abc.xyz")

→ catch chạy.

JSON Parse Error
await response.json()

Nếu dữ liệu không phải JSON hợp lệ:

SyntaxError

→ catch chạy.

Error tự throw
throw new Error("HTTP 404");

→ catch chạy.

Không tự bắt 404 hoặc 500
fetch(...)

vẫn resolve thành công.

Ví dụ:

404
500
403

không nhảy vào catch.

Phải tự kiểm tra:

if (!response.ok) {
    throw new Error(...)
}
Câu A3 (5đ) – Promise States
Sơ đồ Promise
            Promise
               |
            Pending
           /       \
          /         \
 Fulfilled       Rejected
(resolve)         (reject)
Callback Hell là gì?

Là tình trạng callback lồng nhiều tầng khiến code:

khó đọc
khó bảo trì
khó debug
Ví dụ Callback Hell
login(user, function(userData) {

    getProfile(userData.id, function(profile) {

        getPosts(profile.id, function(posts) {

            getComments(posts[0].id, function(comments) {

                console.log(comments);

            });

        });

    });

});
Refactor bằng Async/Await
async function loadData() {
    try {
        const userData = await login();

        const profile = await getProfile(userData.id);

        const posts = await getPosts(profile.id);

        const comments = await getComments(posts[0].id);

        console.log(comments);

    } catch (error) {
        console.error(error);
    }
}
Ưu điểm
✔ Code thẳng hàng
✔ Dễ đọc
✔ Dễ debug
✔ Dễ xử lý lỗi bằng try/catch
# sCâu C1 (10đ) — Error Handling Strategy

Khi xây dựng ứng dụng E-Commerce, việc xử lý lỗi rất quan trọng để đảm bảo trải nghiệm người dùng không bị gián đoạn.

1. Network Errors (Mất mạng giữa chừng)
Nguyên nhân
Mất kết nối Internet
WiFi bị ngắt
DNS lỗi
Server không thể truy cập
Cách xử lý
Hiển thị thông báo thân thiện cho người dùng
Cho phép nhấn nút "Thử lại"
Tự động retry một số lần
Ví dụ
async function getProducts() {
    try {
        const response = await fetch(
            "https://api.example.com/products"
        );

        const data = await response.json();

        return data;
    } catch (error) {
        alert("Không thể kết nối Internet. Vui lòng thử lại.");
        return [];
    }
}
2. API Errors
a. 404 Not Found

API hoặc tài nguyên không tồn tại.

Ví dụ:

GET /products/99999

Server trả:

404 Not Found

Xử lý:

if (response.status === 404) {
    throw new Error("Sản phẩm không tồn tại");
}
b. 500 Internal Server Error

Lỗi từ phía server.

Xử lý:

if (response.status === 500) {
    throw new Error("Máy chủ đang gặp sự cố");
}

Hiển thị:

Hệ thống đang bảo trì, vui lòng thử lại sau.
c. 429 Too Many Requests

Gửi quá nhiều request trong thời gian ngắn.

Xử lý:

if (response.status === 429) {
    throw new Error("Quá nhiều yêu cầu, vui lòng đợi");
}

Hiển thị:

Bạn thao tác quá nhanh, vui lòng thử lại sau vài giây.
Ví dụ tổng hợp
async function getData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}
3. Timeout (> 10 giây)

Nếu API phản hồi quá chậm, người dùng sẽ nghĩ ứng dụng bị treo.

Hàm fetchWithTimeout()
async function fetchWithTimeout(url, ms = 10000) {

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, ms);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        return response;

    } catch (error) {

        if (error.name === "AbortError") {
            throw new Error("Request timeout");
        }

        throw error;
    }
}
Sử dụng
try {

    const response = await fetchWithTimeout(
        "https://api.example.com/products",
        10000
    );

} catch(error) {
    console.error(error.message);
}
4. Retry Logic (Thử lại 3 lần)

Khi gặp lỗi mạng tạm thời, hệ thống nên tự động thử lại.

Hàm fetchWithRetry()
async function fetchWithRetry(url, maxRetries = 3) {

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response;

        } catch (error) {

            console.log(
                `Lần ${attempt} thất bại`
            );

            if (attempt === maxRetries) {
                throw error;
            }
        }
    }
}
Sử dụng
try {

    const response = await fetchWithRetry(
        "https://api.example.com/products",
        3
    );

    const data = await response.json();

    console.log(data);

} catch(error) {

    console.error(
        "Không thể lấy dữ liệu sau 3 lần thử"
    );
}
Kết luận

Chiến lược xử lý lỗi trong E-Commerce gồm:

Network Error → Thông báo mất kết nối + Retry
404 → Báo dữ liệu không tồn tại
500 → Thông báo lỗi hệ thống
429 → Giảm tần suất request
Timeout → Hủy request sau 10 giây
Retry → Tự động thử lại tối đa 3 lần
# Câu C2 (10 điểm) — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any
Method	Khi nào resolve?	Khi nào reject?	Use Case
Promise.all()	Tất cả Promise thành công	Chỉ cần 1 Promise lỗi	Load dữ liệu bắt buộc
Promise.allSettled()	Tất cả Promise hoàn thành	Không reject	Dashboard nhiều API
Promise.race()	Promise đầu tiên hoàn thành	Promise đầu tiên bị lỗi	Timeout request
Promise.any()	Promise đầu tiên thành công	Tất cả Promise lỗi	Nhiều server dự phòng
1. Promise.all()
Đặc điểm
Chờ tất cả Promise thành công
Chỉ cần 1 Promise lỗi → reject ngay
Ví dụ thực tế

Trang sản phẩm cần:

Thông tin sản phẩm
Giá
Tồn kho

Nếu thiếu một phần thì không thể hiển thị.

async function loadProductPage() {

    try {

        const [
            product,
            price,
            stock
        ] = await Promise.all([

            fetch("/product/1")
                .then(r => r.json()),

            fetch("/price/1")
                .then(r => r.json()),

            fetch("/stock/1")
                .then(r => r.json())
        ]);

        console.log(product);
        console.log(price);
        console.log(stock);

    } catch(error) {

        console.error(
            "Không thể tải trang sản phẩm"
        );
    }
}
2. Promise.allSettled()
Đặc điểm
Chờ tất cả Promise hoàn thành
Không bị dừng khi có lỗi
Ví dụ thực tế

Dashboard gồm:

Weather
News
Users

Một widget lỗi không ảnh hưởng widget khác.

async function loadDashboard() {

    const results =
        await Promise.allSettled([

            fetch("/weather")
                .then(r => r.json()),

            fetch("/news")
                .then(r => r.json()),

            fetch("/users")
                .then(r => r.json())
        ]);

    results.forEach(result => {

        if (result.status === "fulfilled") {

            console.log(result.value);

        } else {

            console.error(result.reason);
        }
    });
}
3. Promise.race()
Đặc điểm
Promise nào hoàn thành trước sẽ quyết định kết quả
Ví dụ thực tế

Tạo timeout cho fetch.

function fetchTimeout(url) {

    return Promise.race([

        fetch(url),

        new Promise((_, reject) =>

            setTimeout(() => {
                reject(
                    new Error("Timeout")
                );
            }, 5000)
        )
    ]);
}
Sử dụng
try {

    const response =
        await fetchTimeout("/products");

} catch(error) {

    console.error(error.message);
}
4. Promise.any()
Đặc điểm
Promise đầu tiên thành công sẽ được dùng
Chỉ reject khi tất cả đều lỗi
Ví dụ thực tế

Dữ liệu được lưu ở nhiều server dự phòng.

async function getData() {

    try {

        const data = await Promise.any([

            fetch("https://server1.com/data")
                .then(r => r.json()),

            fetch("https://server2.com/data")
                .then(r => r.json()),

            fetch("https://server3.com/data")
                .then(r => r.json())
        ]);

        console.log(data);

    } catch(error) {

        console.error(
            "Tất cả server đều lỗi"
        );
    }
}
Kết luận
Promise.all() → Dùng khi tất cả dữ liệu đều bắt buộc.
Promise.allSettled() → Dùng cho Dashboard hoặc nhiều widget độc lập.
Promise.race() → Dùng để tạo Timeout hoặc lấy kết quả nhanh nhất.
Promise.any() → Dùng khi có nhiều nguồn dữ liệu dự phòng, chỉ cần một nguồn hoạt động.