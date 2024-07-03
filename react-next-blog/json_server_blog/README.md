# JSON Server for blog
This is blog server api for Digi Dinos company training

## Getting started
Install 

```
npm install
```

Install JSON Server 

```
npm install -g json-server
```

Start blog Server

```bash
json-server --watch db.json
```

Now if you go to [http://localhost:3000/blogs/1](http://localhost:3000/blogs/1), you'll get

```json
{
    "id": 1,
    "title": "Phà Vàm Cống dừng hoạt động từ ngày 30/6",
    "des": "Hơn một tháng sau khi cầu dây văng thứ hai bắc qua sông Hậu thông xe, phà Vàm Cống kết thúc nhiệm vụ 100 năm.",
    "detail": "Ngày 27/6, ông Nguyễn Phúc Nguyên - Trưởng bến phà Vàm Cống (An Giang - Đồng Tháp) cho biết, đơn vị đã nhận được quyết định của Tổng cục Đường bộ về việc dừng hoạt động bến phà này vào 9h ngày 30/6. ổng cục Đường bộ yêu cầu thông báo rộng rãi về thời gian kết thúc nhiệm vụ của bến phà, tổ chức phân luồng để người tham gia giao thông biết. Cục Quản lý Đường bộ IV được phân công làm việc với Tổng công ty Đầu tư phát triển và Quản lý dự án hạ tầng giao thông Cửu Long để bảo đảm giao thông an toàn, thông suốt trên cầu Vàm Cống và các tuyến kết nối...Bến phà Vàm Cống đã hoạt động khoảng 100 năm, có 170 nhân sự, 10 chiếc phà. Khi cầu thông xe, đơn vị đã chấm dứt hợp đồng lao động thời vụ với 50 người. 50 nhân viên cùng 5 chiếc phà được chuyển đến phục vụ ở các bến khác tại miền Tây.Hơn tháng qua, mỗi ngày bến phà Vàm Cống có 2-3 chiếc chở 4.000 - 5.000 xe máy và khoảng 100 ôtô. \"Sắp tới, 70 người cùng 5 chiếc phà còn lại tiếp tục được điều đến các bến trong khu vực\", ông Nguyên nói.",
    "category": 0,
    "public": false,
    "data_pubblic": "2019-06-28",
    "position": [1],
    "thumbs": "https://i-vnexpress.vnecdn.net/2019/06/27/pha-Vam-Cong-7303-1561651034.jpg"
}
```

## Routes

Based on the previous `db.json` file, here are all the default routes. You can also add [other routes](#add-custom-routes) using `--routes`.

### Plural routes

```
GET    /blogs
GET    /blogs/1
POST   /blogs
PUT    /blogs/1
PATCH  /blogs/1
DELETE /blogs/1
```

See also:
* [You can read more json server at here](https://github.com/typicode/json-server)
* [You can read more Digi Dinos company at here](http://digidinos.com/)
