# Chat Smith / Vulcan Labs — kiểm chứng sản phẩm và hình ảnh công khai

Ngày nghiên cứu: **02/10/2026**. Nghiên cứu trực tiếp website, Apple lookup API, HTML App Store, version history và hình ảnh do các nguồn chính thức phục vụ. Không dùng GitHub/community làm bằng chứng thay cho nguồn chính thức.

## 1. Trạng thái truy cập thực tế

- `https://vulcanlabs.co/`: HTTP 200; đọc HTML và xem screenshot trình duyệt đầy đủ.
- `https://apps.apple.com/us/app/chat-smith-ai-chatbot-agent/id1559479889`: HTTP 200; đọc description, version history, metadata; xem trang và toàn bộ 10 screenshot iPhone từ API.
- `https://itunes.apple.com/lookup?id=1559479889&country=us`: HTTP 200; lưu nguyên JSON và bản trích thông tin.
- `https://chatsmith.io/`, `/design-studio`, `/design-studio/menu`: HTTP 200 bằng curl với browser User-Agent và browser capture. Python urllib request đầu tiên không có browser User-Agent trả 403; không phải domain bị proxy chặn toàn bộ.
- Chromium ban đầu báo `ERR_CERT_AUTHORITY_INVALID` vì private trust store thiếu proxy CA. Capture cuối dùng Playwright route → Python urllib với CA bundle cấu hình sẵn và proxy kế thừa, **TLS vẫn được kiểm chứng**, không dùng `ignore_https_errors`.
- Chat Smith render được giao diện và public template gallery nhưng hiện modal **“Verifying you’re human…”**. Đã giữ nguyên modal trong screenshot, không vượt xác minh, không đăng nhập hoặc chạy generation. Vì vậy quan sát UI/template là có thật; thử end-to-end generation chưa được thực hiện.
- Google HTTP search response chỉ trả trang redirect/fallback, không có kết quả dùng được trong lần fetch này. Không suy diễn search snippets.

`access.json` ghi lần fetch đầu; `chatsmith-headers.txt` xác nhận lần curl HTTP 200; `browser-observations.json` ghi URL/status và số ảnh tải được. Network environment tại thời điểm nghiên cứu báo unrestricted/enforced; blocker còn lại là website verification và browser trust store, không phải thiếu allowlist.

## 2. Official source chain

**Chat Smith là domain chính thức đã được kiểm chứng.** Vulcan homepage đặt link “Visit Chat Smith” tới `https://chatsmith.io/`. Apple lookup `sellerUrl` là `https://chatsmith.io/home`; mô tả App Store cũng ghi dùng mobile/web tại chatsmith.io. Không còn cần mô tả đây là URL chỉ tìm được từ cộng đồng.

Nguồn:

- [Vulcan Labs](https://vulcanlabs.co/)
- [App Store US](https://apps.apple.com/us/app/chat-smith-ai-chatbot-agent/id1559479889)
- [Apple lookup API](https://itunes.apple.com/lookup?id=1559479889&country=us)
- [Chat Smith](https://chatsmith.io/)
- [Design Studio](https://chatsmith.io/design-studio)
- [Menu category](https://chatsmith.io/design-studio/menu)

Apple hiện liệt kê seller `CHAT SMITH OPCO PTE. LTD`, developer `Chat Smith OpCo`. Vulcan gọi Chat Smith là flagship product trên website. Không tự suy ra cấu trúc pháp nhân, employment hay tác giả cá nhân từ seller field.

## 3. Các điều đã xác nhận và giới hạn

| Chủ đề | Bằng chứng chính thức quan sát được | Điều có thể nói | Điều chưa được chứng minh |
| --- | --- | --- | --- |
| Daily Smith | App Store version `8.260518.2`, `<time datetime="2026-05-20">`: “Let Daily Smith Agent handle the chaos — summarize emails, prep meetings, highlight what matters.” | Daily Smith Agent là tính năng được release notes công khai nhắc tới; tóm tắt email, chuẩn bị meeting, nêu thông tin quan trọng. | MCP/data flow/PIC là thông tin Huy trực tiếp cung cấp; source này không chứng minh code/ownership của Huy. |
| Creative/Design Studio | Giao diện web title **Design Studio**; chips **Logo, Poster, Flyer, Menu, Business Card, Social Content**; gallery có các ảnh thật đang được phục vụ công khai. Menu page có prompt “Share your business name, items, prices and color preferences”, controls Ratio/Industry/Style và Remix. | Chat Smith có suite tạo thiết kế, có menu và nhiều loại ấn phẩm. Có thể link ra sản phẩm thật để củng cố ngữ cảnh. | Không chứng minh mỗi template do Huy làm, được generate bởi phiên bản pipeline nào, hay mức tăng quality. Không đổi contributor thành PIC. |
| Logo / Calendar | App Store description có AI Logo Design và Calendar Smith Agent (“plan events, schedule meetings, and set reminders with a simple prompt”). | Đây là khả năng marketing chính thức ở cấp sản phẩm. | **Không gán Calendar write actions cho Daily Smith hoặc cho phần Huy làm**; user chưa xác nhận các hành động gửi mail/sửa lịch. |
| Slide Design | User nói mình PIC chính và sản phẩm chưa release. Design Studio SEO có từ “presentations” chung; UI gallery quan sát không có mục Slide Design. | Portfolio giữ **In development** và chỉ dùng sơ đồ/demo concept phù hợp công khai. | Từ “presentations” trong SEO không chứng minh Slide Design đã phát hành. |
| Employer/product scale | Vulcan công khai Chat Smith, nhiều app, download/rating numbers. | Có thể nói Huy đang làm tại Vulcan Labs theo user, đặt link đến nguồn công ty/sản phẩm. | Không biến download/rating của toàn sản phẩm/công ty thành metric thành tựu cá nhân. |

Phân biệt tên: user gọi **Creative Studio**; public web đang dùng **Design Studio**. Cách ghi portfolio rõ nhất: **“Creative AI · Chat Smith Design Studio”**, và giải thích tên nội bộ/người dùng nếu cần. Không tự giả định mọi phiên bản iOS/web dùng chung nhãn.

## 4. App Store: mô tả, release notes và screenshots

Lookup tại thời điểm đọc:

- Tên: **Chat Smith: AI Chatbot & Agent**.
- Version: **9.260928.1**.
- Current release: **2026-10-02T00:35:42Z**.
- Release notes mới nhất: refresh giao diện, light/dark theme và model update. Đây là thông tin cấp sản phẩm.
- Description nói AI image generation, writing, deep research, virtual assistant, realtime search, email generation, homework, summarization, translation, keyboard, grammar, resume/CV và mobile-web sync. Chỉ cần trích phần liên quan portfolio, không biến homepage Huy thành danh sách toàn bộ app.

Release notes đặc biệt liên quan:

- **20/05/2026 — 8.260518.2:** Daily Smith Agent: summarize emails, prep meetings, highlight what matters.
- **25/09/2026 — 8.260921.1:** AI Logo Design.
- **02/10/2026 — 9.260928.1:** refreshed app look/light-dark themes.

Đã xem tất cả 10 ảnh iPhone do lookup trả về. Chủ đề lần lượt: top models; image generation; homework; task/code; deep research; assignment writing; realtime search; voice mode; sync devices; grammar. Phần lớn hình là phone UI màu đen trên nền mint/teal, headline nói lợi ích, một nhiệm vụ mỗi ảnh. **Bộ screenshot này không trực tiếp minh họa Daily Smith hoặc menu pipeline của Huy.** Screenshot hiện tại cũng có model labels cũ hơn description; không nên coi screenshot là snapshot đồng nhất của release mới nhất.

[Trang App Store đã capture](app-store-desktop.png) · [Contact sheet 10 ảnh chính thức](apple-official-screenshots.png). Contact sheet là browser-rendered research sheet, không phải screenshot nguyên trang; HTML kèm theo giữ đúng URL từng ảnh.

## 5. Quan sát hình ảnh thật của Design Studio

[Menu UI](menu-studio-desktop.png) giữ nguyên verification overlay. [Contact sheet 15 menu template công khai](official-menu-templates.png) được browser render từ **những URL ảnh thực tế gallery đã phục vụ**, không tải remote media xuống để lách hạn chế hiển thị. HTML kèm theo ghi nguồn từng ảnh. Đây là template examples của sản phẩm, không phải Huy-authored outputs đã được xác thực.

Các thiết kế nhìn thấy có **nhiều ngôn ngữ thị giác**:

- Beer/cocktail menu dùng serif mảnh, nền cam cháy hoặc cream, hàng giá có khoảng trống sạch.
- Fast-food menu dùng red/yellow, type đậm, pill chia nhóm và ảnh món ăn.
- Café menu xanh rêu/cream với illustration ly café.
- Brasserie dùng blue/coral, checkerboard, các panel nhóm món rõ.
- Bakery dùng nền brown, ảnh pastry lớn, labels giá.
- Catering burgundy với ảnh buffet và package blocks.
- Salon/nail price lists dùng pink hoặc beige, ảnh chân dung/bàn tay.

**Hệ quả cho portfolio:** bộ ảnh botanical nhà hàng duy nhất của bản trước thu hẹp câu chuyện sai mức độ. Giá trị nổi bật của Huy là nghiên cứu cách giữ một design language mạch lạc theo reference, rồi áp dụng được qua nhiều use case. Visual nên cho thấy **coherence trong từng thiết kế + variation giữa những thiết kế**, không đồng nhất mọi sản phẩm thành một aesthetic của portfolio.

Không lấy việc các template đẹp làm bằng chứng định lượng pipeline mới tốt hơn. Trước/sau hoặc quality uplift cần bộ output thật cùng brief/model/điều kiện và xác nhận có thể công khai. Nếu chưa có, dùng motion explanation có nhãn conceptual, giải thích decision và adoption thay vì dựng giả benchmark.

## 6. Personal attribution — chỉ từ lời Huy trong session

Các nguồn chính thức kể trên không liệt kê Huy hay pipeline details. Content đúng với user:

- Daily Smith: PIC thiết kế AI pipeline và data flow; tập trung LLM/agent reasoning/tools. Email/calendar qua MCP/provider integrations; tạo daily priorities/context và follow-up conversation. Không xác nhận gửi email/sửa lịch.
- Creative: **contributor**, đồng nghiệp xây poster pipeline trước; Huy port pipeline sang menu; nghiên cứu và thiết kế lại phương pháp ảnh reference/DNA → descriptive JSONL → generation guidelines, thay vì phối những trục design độc lập. Người làm poster sau đó áp dụng phương pháp này cho poster/flyer/business-card/social. Chỉ diễn đạt qualitative quality improvement do user báo, không tự thêm metric.
- Slide Design: PIC chính; chưa release; image-to-editable module thuộc scope user nêu.

Copy có thể dùng:

> **I turn visual taste into repeatable AI workflows.**
>
> At Vulcan Labs, I build the reasoning behind AI assistants and the pipelines behind creative tools. For Chat Smith’s design workflows, I researched a reference-driven visual DNA approach—first for menus, then adopted by the team across other formats.

Dòng scope/credit trong case:

> **My contribution:** Menu pipeline adaptation and visual-DNA method research. **Team context:** Built on an existing poster pipeline; the original pipeline owner later adopted the method across additional formats.

Proof flow gợi ý: public product context/link → exact personal decision → conceptual method animation → adoption across formats → honest evidence limits. Không bắt người xem click case study mới hiểu Huy đã đóng góp gì.

## 7. Artifacts

- `apple-lookup.json`: nguyên API response; `apple-extracted.json`: relevant fields.
- `app-store.html` / `app-store-text.txt`: nguồn có release history và timestamp.
- `vulcanlabs.html` / `vulcanlabs-text.txt`: homepage/company product linkage.
- `chatsmith.html` / `chatsmith-text.txt`: SSR public content.
- `*-browser-text.txt`, `*-browser-images.json`, `browser-observations.json`: observed rendering + image sources.
- `app-store-desktop.png`, `vulcanlabs-desktop.png`, `chatsmith-home-{desktop,mobile}.png`, `creative-studio-desktop.png`, `menu-studio-desktop.png`: browser captures.
- `apple-official-screenshots.{html,png}`, `official-menu-templates.{html,png}`: source-linked browser-rendered research contact sheets.

A screenshot of an official public template is a reference artifact. It is not a claim that Huy personally created the template, and it is not automatically a portfolio production asset.
