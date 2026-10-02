# Nghiên cứu trực tiếp: personal brand, motion và dẫn chuyện bằng scroll

Ngày kiểm tra: 02/10/2026. Mục tiêu: một portfolio AI Engineer × Creative Builder để người xem nhớ Huy, hiểu đóng góp cá nhân và đủ tin tưởng để chủ động liên hệ. Ưu tiên đọc bằng scroll; tương tác sâu là tùy chọn.

## Phương pháp và giới hạn

- Đã mở website thật bằng Chromium, kiểm tra 1440×900 và 390×844, chờ trang qua giai đoạn tải, cuộn nhiều vị trí, lưu ảnh và trạng thái DOM/video/transform. Mobile là emulation, không phải kiểm tra thiết bị vật lý.
- Chromium không nhận CA proxy qua kho chứng chỉ mặc định. Các bản kiểm tra cuối dùng `route.fetch`/`route.fulfill` qua proxy kế thừa; Node xác thực TLS bằng CA của môi trường. Không dùng tắt TLS cho bộ chứng cứ cuối. Cách chuyển tiếp này có thể thay đổi tốc độ tải; không dùng thời gian tải trong nghiên cứu này làm benchmark performance của website tham khảo.
- Google và DuckDuckGo trả trang thử thách bot. Bing có kết quả nhưng độ bám truy vấn kém; không lấy snippet làm bằng chứng giao diện. Các nhận xét dưới đây dựa trên website trực tiếp.
- `*.png` trong thư mục `references` là ảnh chụp website tham khảo, không phải hình do Image Gen tạo và không phải artwork để tái sử dụng trên portfolio.
- Không suy ra chuyển động từ một ảnh. Những kết luận motion dùng chuỗi ảnh sau thao tác và, khi có, giá trị transform/video thay đổi.

## 1. Dennis Snellenberg — identity rõ, vai trò ngắn, proof hiện sớm

URL: https://dennissnellenberg.com/

**Đã quan sát:** desktop mở bằng chân dung lớn nền xám, tên sans khổng lồ chạy ngang, vai trò “Freelance Designer & Developer” chỉ hai dòng. Sau hero là tuyên bố ngắn, rồi danh sách dự án với vai trò đặt cùng hàng tên. Footer đen có một CTA tròn rõ. Tổng hệ màu gần đơn sắc, màu xanh chỉ xuất hiện ở CTA.

**Motion thật:** tên thay đổi vị trí ngang theo thời gian. Desktop dùng scroll được điều khiển bằng transform: `window.scrollY` vẫn 0 trong khi header lần lượt có matrix translateY −48, −96…; khi phát nhiều wheel events đã đi được qua intro, work và footer. Đây không phải native document scroll. Mobile chuyển thành cuộn dọc thông thường, ảnh dự án hiển thị ngay phía trên tên và role; không cần hover để thấy ảnh.

**Nên lấy:** một hình chủ đạo thay vì 6 motif cùng tranh nhau; tên và vai trò đọc được ngay; proof đặt gần nhãn đóng góp; desktop có thể cô đọng nhưng mobile phải đưa ảnh chứng cứ ra sẵn. Chân dung thật giúp personal brand cụ thể hơn logo/ảnh AI đơn thuần.

**Không nên lấy nguyên:** marquee cắt tên, forced smooth-scroll, website phụ thuộc hover để xem preview trên desktop. Huy cần tên đọc trọn và nội dung rõ kể cả người chỉ cuộn nhanh. Màu đơn sắc của Dennis không có nghĩa portfolio phải thiếu màu; màu nên tập trung trong sản phẩm/outputs.

Chứng cứ: [desktop hero](references/dennis/1440-step0.png), [desktop work](references/dennis/1440-deep2.png), [desktop contact](references/dennis/1440-deep4.png), [mobile hero](references/dennis/390-step0.png), [mobile work](references/dennis/390-step2.png). Dữ liệu: `references/dennis/{1440,390}-observations.json`, `deep-observations.json`.

## 2. Rauno Freiberg — card/deck transformation và thư viện craft

URL: https://rauno.me/ ; trang craft: https://rauno.me/craft

**Đã quan sát:** homepage hiện tại là chuỗi poster ngang nền xám nhạt, mỗi poster chữ đen lớn và hình tròn vàng/cam. Một thước progress tối giản nằm trên cùng. Poster đầu mô tả tên, nghề, Vercel và Devouring Details trong một câu. Khi cuộn dọc desktop, dải poster chạy ngang và thu nhỏ: từ `scale(.882353)` sang `translateX(-650px) scale(.817353)`, rồi `translateX(-1300px) scale(.687353)`, cuối cùng scale .6. Đây là ví dụ rõ về việc giữ cùng một vật thể nhưng đổi framing theo scroll.

**Mobile:** homepage hiển thị deck thu nhỏ `scale(.3)` nằm giữa màn hình, nhiều khoảng trống; vertical wheel trong emulation không tiến qua poster. Không suy ra touch gesture hỏng vì chưa kiểm tra swipe thật. Tuy vậy, trải nghiệm đọc dọc đơn giản không phải cơ chế chính của trang này.

**Craft:** desktop có ba cột media specimen, mobile chuyển một cột. Mỗi mục có tên, ngày và link “View Production”, “View Prototype” hoặc “Read Essay” khi phù hợp. Browser ghi nhận 68 video nodes; một số video tiến thời gian khi trong viewport và pause khi ra ngoài. Ví dụ `history.mp4` tiến 5.77→7.70s, rồi dừng 7.93s. Một số video vẫn có hình mờ trong ảnh chụp; không xác nhận nội dung chi tiết của những clip đó chỉ từ metadata.

**Nên lấy:** card ban đầu trở thành một cảnh lớn bằng cách thay framing, thay vì fade-out rồi xuất hiện một section không liên quan. Gallery cá nhân phải là những mẫu kỹ năng cụ thể, có tên và link giải thích, có phân biệt prototype/production. Đây là nơi tốt cho những module như image-to-editable slides, image/video editing và các thử nghiệm AI.

**Không nên lấy nguyên:** horizontal deck làm trục đọc chính trên mọi thiết bị; màu huỳnh quang; gallery quá nhiều video tự phát; mọi clip chỉ được hiểu sau click. Huy nên có 3–6 specimen chọn lọc, mobile có poster rõ và lời giải thích riêng.

Chứng cứ: [desktop poster đầu](references/rauno/1440-step0.png), [deck sau scroll](references/rauno/1440-step2.png), [mobile deck](references/rauno/390-step0.png), [craft desktop](references/rauno/craft-1440-step0.png), [craft mobile](references/rauno/craft-390-step0.png). Dữ liệu: `references/rauno/*-observations.json`.

## 3. Devouring Details — motion trở thành nội dung, bằng chứng đứng cạnh lời hứa

URL: https://devouringdetails.com/ . Cùng tác giả với Rauno; đây là một website sản phẩm riêng, không phải hai nguồn độc lập về hiệu quả kinh doanh.

**Đã quan sát:** trang nền trắng, chữ sans đen lớn, một chấm/cạnh cam duy nhất tạo nhận diện. Mở đầu đặt hai ý cạnh nhau: vấn đề về cảm giác tương tác và lời giải sản phẩm. Demo lớn ngay sau copy; có chú thích “All footage is recorded of React components”. Bên dưới lần lượt giải thích platform, trình bày giao diện bên trong, proof/testimonials, người tạo và cấu trúc nội dung. Hai cột desktop chuyển một cột mobile. Text không bị ép vào ảnh video.

**Motion và điều khiển:** thước bên trái + vạch cam ngang màn hình theo vị trí đọc tạo dấu hiệu đang ở đâu. Trang có 22 video nodes; các clip quan sát trong mẫu đều đang pause và hiện nút play, do đó không gọi chúng là autoplay. Mobile vẫn cho xem poster với nút play và caption rõ. Tại một số vị trí vạch/CTA cam nằm ngang text, là một trade-off cần tránh khi chuyển sang Huy.

**Nên lấy:** demo giải thích được chính lời hứa ở đoạn liền trước; phân biệt footage của sản phẩm với video minh họa; tiết lộ quy trình đủ cụ thể để người xem tin vào tác giả. Với Huy, mỗi case cần câu “What I changed” và một mẫu chứng cứ đứng cạnh, không để kỹ thuật mạnh nằm sâu 3 lần click.

**Không nên lấy nguyên:** copy dài mang tính khóa học; testimonial/company logo không có quyền sử dụng hoặc không chứng minh quan hệ của Huy; thước/CTA băng qua nội dung mobile.

Chứng cứ: [desktop đầu trang](references/devouring-details/1440-step0.png), [demo và giải thích](references/devouring-details/1440-step3.png), [mobile đầu trang](references/devouring-details/390-step0.png), [mobile proof](references/devouring-details/390-step3.png). Dữ liệu: `references/devouring-details/{1440,390}-observations.json`.

## 4. Apple AirPods Pro — một thông điệp cho mỗi cảnh, media có chủ đích

URL: https://www.apple.com/airpods-pro/ . Trang kiểm tra hiển thị AirPods Pro 3; `/iphone-17-pro/` chuyển về overview iPhone nên không dùng URL đó như case storytelling.

**Đã quan sát:** hero là close-up sản phẩm lớn trên nền trung tính, tên nhỏ hơn một lợi ích chính viết rất lớn. Scroll đưa người xem qua highlight reel, “Take a closer look”, rồi một cảnh riêng cho “Intelligent noise control”. Bố cục không lặp mọi section giống nhau: scene vật thể → scene con người → danh sách chi tiết → scene vòng sóng bao quanh headline. Local nav xuất hiện cố định sau khi rời global navigation.

**Motion thật:** hero là video tự chạy có nút pause nhìn thấy. Desktop dùng `/anim/hero/large.mp4`, mobile dùng `/anim/hero/small.mp4`; bố cục mobile có framing riêng, không chỉ scale toàn cảnh desktop. Video hero dừng khi ra khỏi viewport: desktop giữ `currentTime=1.893238` ở các scroll sau, `paused=true`; mobile giữ 4.545277s tương tự. Vòng sáng ở cảnh noise control là một scene motion khác có nút pause. Không gọi hero video này là scroll-scrub vì bằng chứng quan sát cho thấy thời gian tự chạy.

**Nên lấy:** section headline nói lợi ích người dùng, không phải danh sách công nghệ; một scene một trọng tâm; cùng đối tượng/ý tưởng được nhìn ở nhiều mức; mobile được biên đạo riêng; pause offscreen và giảm video tải trước.

**Chuyển sang Huy:** thay “LLM + MCP pipeline” ở headline bằng “Your day, brought into focus.” rồi cho email/calendar hội tụ thành brief có nguồn tham chiếu. Vai trò kỹ thuật/PIC xuất hiện thành nhãn và một câu ngắn ngay bên cạnh. Đối với Creative: hình tham khảo → bản mô tả visual DNA → 3 output giữ cùng chất thiết kế. Với Slide: ảnh phẳng → lớp đối tượng editable, có badge In development.

**Không nên lấy nguyên:** lượng media và chiều dài trang của một tập đoàn; hero đợi video mới hiểu; tuyên bố “best” hay metric không có bằng chứng; giấu khả năng quan trọng trong carousel. Mọi capability của Huy phải lộ ra bằng cuộn dọc, carousel chỉ thêm chi tiết.

Chứng cứ: [desktop hero](references/apple-airpods/1440-step0.png), [highlight người dùng](references/apple-airpods/1440-step2.png), [mobile hero](references/apple-airpods/390-step0.png), [mobile noise-control](references/apple-airpods/390-step4.png). Dữ liệu: `references/apple-airpods/{1440,390}-observations.json`.

## 5. Linear — mỹ thuật công nghệ gắn với giao diện có thể hiểu

URL: https://linear.app/ . Đã kiểm tra bởi nhánh audit motion trong cùng phiên, sau đó đọc lại screenshot ở đây.

**Đã quan sát:** nền gần đen, heading nói rõ loại sản phẩm và nhóm dùng, một câu giải thích nhỏ ngay sau. Giao diện workflow thật được đặt dưới heading, có issue, activity, agent status; màu chỉ dùng cho trạng thái cụ thể. Scroll tiếp nối product UI → logo/proof → tuyên bố lớn → các diagram chức năng ngắn. Desktop và mobile đều mở bằng nội dung đọc được ngay. Mobile crop product UI và chữ bên trong khá nhỏ.

**Nên lấy:** technology aesthetic đến từ hình thức của hệ thống thật, không cần dán cube/particle vào mọi section. Tương phản chữ rõ, visual grammar nhất quán, mỗi graphic chứng minh một khả năng. Với Huy, daily brief hoặc editable slide là chủ thể hấp dẫn hơn một khối kính không nói lên chức năng.

**Không nên lấy nguyên:** một bản clone marketing SaaS, màn hình dashboard mini không đọc được trên điện thoại, logo khách hàng như social proof khi Huy không có quan hệ trực tiếp. Đây là reference về clarity và evidence, không phải bằng chứng cho kỹ thuật scroll-morph phức tạp.

Chứng cứ: [desktop](references/linear-desktop.png), [scroll 1](references/linear-scroll-1.png), [scroll 2](references/linear-scroll-2.png), [mobile](references/linear-mobile.png), [mobile scroll](references/linear-mobile-scroll.png). Dữ liệu: `references/linear-inspection.json`.

## Những nguồn không được tính là đã review hoàn chỉnh

- https://lusion.co/ trả HTTP 200, có thấy phần intro 3D nhưng bộ chụp tiếp theo timeout; chỉ có `lusion-loading-limited.png`. Không kết luận về toàn bộ narrative/mobile/motion.
- https://activetheory.net/ trả HTML 200, chưa có bộ quan sát UI hoàn chỉnh. Không dùng source HTML để mô tả motion.
- https://bruno-simon.com/ chưa có chứng cứ render đủ trong phiên này. Không tuyên bố đã chơi trải nghiệm hoặc đã test mobile.

## Kết luận thiết kế cho lần sửa tiếp theo

### Một motif cá nhân + chứng cứ sản phẩm thật

Năm reference không chứng minh rằng thêm nhiều hiệu ứng sẽ tốt hơn. Chúng cho thấy sự nhất quán: Dennis dành màn đầu cho con người; Apple gắn mỗi cảnh với một lợi ích; Linear dùng chính sản phẩm làm artwork; Rauno cho thấy craft bằng specimen cụ thể. Với Huy, một hệ hình ảnh nên bắt đầu từ **hai nhánh của Nekomata hội tụ để biến đầu vào thành kết quả**, thay vì thêm nhiều bộ lá/collage/ribbon/cube độc lập.

Hướng đề xuất: graphite/pearl làm nền, dusty plum và amber dùng hạn chế ở selection/state/đường dẫn. Màu giàu hơn nằm trong những output sáng tạo. Chữ sans đương đại và một kiểu mono nhỏ cho chú giải kỹ thuật; không để serif nặng + food + botanical trở thành nhận diện chính, vì tổ hợp đó đang thiên về editorial/menu design hơn AI Engineer × Creative Builder.

### Nhịp kể chuyện bằng một lần cuộn dọc

1. **0–1 viewport — Identity + range:** tên đọc được đầy đủ, “AI Engineer × Creative Builder”, một câu nói rõ làm gì, Vulcan Labs và ba preview đã lộ. Một orbit ngắn đủ gây nhớ, không đòi người xem chọn card mới tiếp tục.
2. **1–2 viewport — Card trở thành cảnh:** card được chọn mặc định dịch vào tâm, thẳng lại, mở khung thành visual case; các card còn lại thu về chỉ mục. Cùng asset/geometry tiếp tục tồn tại để mắt hiểu mối liên hệ. Cho phép click chọn khác, nhưng scroll tiếp vẫn có tuyến mặc định.
3. **2–3 viewport — Creative evidence:** input refs → JSONL visual DNA → guidelines → một bộ output cùng ngôn ngữ. Một câu công nhận pipeline poster có trước; Huy port menu và tạo phương pháp được team áp dụng tiếp. Có “Contributor / Released”.
4. **3–4 viewport — Agent evidence:** email/calendar hội tụ thành context và daily brief. Một thông tin được highlight trong brief rồi nối lại nguồn. “AI pipeline PIC / Released”. Không diễn cảnh gửi email hoặc sửa lịch chưa xác nhận.
5. **4–5 viewport — Editable output:** slide ảnh tách thành text/image/shape layers, kéo một đối tượng tự diễn 1 lần rồi dừng. “Main PIC / In development”. Đây là concept animation, không giả làm app đã release.
6. **5–6 viewport — Breadth with receipts:** case vision/audio cũ và 3–6 creative modules, mỗi thẻ có một câu giá trị và role. Deep-link mở thêm thông tin, nhưng overview đã đầy đủ.
7. **Cuối — Person + contact:** chân dung đáng tin, cách làm việc và email/LinkedIn rõ. Nekomata trở lại để khép mạch nhớ, không cần thêm một logo mới.

### Yêu cầu khi dựng motion và hình

- Chỉ một chuyển đổi lớn diễn ra trong một viewport; chữ cốt lõi ổn định để đọc.
- Motion phải thể hiện quan hệ **input → decision → output**, không chỉ làm card bay/xoay chung chung.
- Desktop có thể dùng một vùng sticky ngắn cho card mở thành scene; mobile giữ cuộn dọc, giảm góc quay và cung cấp framing riêng như Apple.
- Hình gen dùng cho reference specimens/output samples hoặc background có mục đích. UI, label, JSONL, role, status và metrics phải là HTML/SVG đọc được và sửa được. Không gen screenshot công ty rồi trình bày như bằng chứng thật.
- Remotion phù hợp các phim giải thích 6–12 giây: DNA propagation, context-to-brief, image-to-editable. Website scroll choreography vẫn dùng DOM/CSS/Motion; không nhúng cả website thành video. Poster đầu đã phải giải thích được nội dung nếu clip chưa phát.
- Mỗi cảnh cần xác định trước trạng thái entry / middle / exit, nội dung cần người xem nhớ, fallback reduced-motion và bố cục mobile. Một moodboard đẹp chưa phải storyboard có thể triển khai.
